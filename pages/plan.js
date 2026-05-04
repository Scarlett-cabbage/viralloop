// 增长计划页 - 重构版（支持人设驱动的动态内容 + 全局状态同步）
import { router } from '../router.js';
import { aiQuickActions } from '../data.js';
import { renderNavbar, renderBreadcrumb, renderNextStep, renderFooter, renderTag, renderAIExplain } from '../components.js';
import { drawLineChart } from '../charts.js';
import { globalState } from '../state.js';

let selectedDayIndex = 0;

export function renderPlan(container) {
    // 从全局状态获取数据
    const growthPlan = globalState.getPlan();
    const followerGrowthData = globalState.getFollowerData();
    const persona = globalState.getPersona();

    renderNavbar(container, 'plan');
    renderBreadcrumb(container, 'plan');

    const page = document.createElement('div');
    page.className = 'plan-workspace';

    page.innerHTML = `
        <!-- 顶部工作台标题栏（合并人设信息） -->
        <div class="plan-topbar">
            <div class="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between h-11">
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2 bg-dior-gold/10 rounded-full px-3 py-1">
                        <i class="ri-robot-2-line text-dior-gold text-xs"></i>
                        <span class="text-dior-gold text-xs font-semibold">AI 创作工作台</span>
                    </div>
                    ${persona ? `
                        <span class="text-lv-brown/20">|</span>
                        <span class="text-lg leading-none">${persona.emoji || '👩‍🎨'}</span>
                        <span class="text-xs font-medium text-lv-brown/60">${persona.name || '内容创作者'}</span>
                        <button class="text-xs text-dior-gold/60 hover:text-dior-gold transition-colors" id="change-persona-btn">
                            <i class="ri-edit-line text-[10px]"></i>
                        </button>
                    ` : ''}
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2 text-xs text-lv-brown/40">
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                        <span class="hidden sm:inline text-[11px]">AI辅助已开启</span>
                    </div>
                    <div class="flex items-center gap-2 bg-white rounded-lg border border-dior-gold/15 px-2.5 py-1">
                        <div class="w-16 h-1.5 bg-dior-gold/10 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-dior-gold to-green-500 rounded-full" style="width:100%"></div>
                        </div>
                        <span class="text-xs font-bold text-dior-gold">7/7</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主体：左右分栏 -->
        <div class="plan-split-layout">
            <div class="plan-left-panel" id="plan-left-panel">
                <div class="plan-left-header">
                    <h2 class="text-sm font-bold text-lv-brown flex items-center gap-2">
                        <i class="ri-calendar-line text-dior-gold text-sm"></i>7天增长计划
                    </h2>
                    <span class="text-xs text-lv-brown/30">0 → ${growthPlan[growthPlan.length - 1]?.followers?.toLocaleString() || '1,024'} 粉</span>
                </div>
                <div class="plan-mini-chart">
                    <canvas id="plan-mini-chart-canvas" style="width:100%;height:72px;"></canvas>
                </div>
                <div class="plan-day-list" id="plan-day-list"></div>
                <div class="plan-left-footer">
                    <button class="btn-secondary text-xs py-2 px-3" id="back-dashboard-btn">
                        <i class="ri-arrow-left-line"></i>驾驶舱
                    </button>
                    <button class="btn-primary text-xs py-2 px-3" id="go-create-btn">
                        开始创作<i class="ri-arrow-right-line"></i>
                    </button>
                </div>
            </div>
            <div class="plan-right-panel" id="plan-right-panel"></div>
        </div>
    `;

    container.appendChild(page);

    renderDayList(page, growthPlan);
    renderEditor(page, selectedDayIndex, growthPlan);

    requestAnimationFrame(() => {
        const miniCanvas = page.querySelector('#plan-mini-chart-canvas');
        if (miniCanvas) {
            drawLineChart(miniCanvas, null, {
                labels: followerGrowthData.labels,
                values: followerGrowthData.values,
                color: '#A99563',
                fillColor: 'rgba(169, 149, 99, 0.1)',
                showDots: true,
                showLabels: false,
                showGrid: false,
                showValues: false,
            });
        }
    });

    page.querySelector('#back-dashboard-btn').addEventListener('click', () => router.navigate('/'));
    page.querySelector('#go-create-btn').addEventListener('click', () => {
        const day = growthPlan[selectedDayIndex];
        router.navigate(`/create?day=${day.day}`);
    });

    const changePersonaBtn = page.querySelector('#change-persona-btn');
    if (changePersonaBtn) {
        changePersonaBtn.addEventListener('click', () => router.navigate('/persona'));
    }
}

function renderDayList(page, growthPlan) {
    const list = page.querySelector('#plan-day-list');
    list.innerHTML = '';

    growthPlan.forEach((day, i) => {
        const isSelected = i === selectedDayIndex;
        const dailyGrowth = i > 0 ? day.followers - growthPlan[i - 1].followers : day.followers;
        const isExplosion = dailyGrowth > 200;

        const card = document.createElement('div');
        card.className = `plan-day-card ${isSelected ? 'selected' : ''} ${isExplosion ? 'explosion' : ''}`;
        card.innerHTML = `
            <div class="pdc-left">
                <div class="pdc-day-badge ${day.status === 'active' ? 'active' : ''}">D${day.day}</div>
            </div>
            <div class="pdc-center">
                <div class="pdc-title-row">
                    <span class="pdc-title">${day.contentTitle.replace(/[「」]/g, '').slice(0, 24)}${day.contentTitle.length > 26 ? '...' : ''}</span>
                </div>
                <div class="pdc-meta">
                    <span class="pdc-type">${day.contentType}</span>
                    ${renderTag(day.tag)}
                    ${isExplosion ? '<span class="text-xs text-red-500 font-bold flex items-center gap-0.5"><i class="ri-fire-fill text-[10px]"></i>爆发</span>' : ''}
                </div>
            </div>
            <div class="pdc-right">
                <div class="pdc-followers ${isExplosion ? 'text-green-600' : ''}">${day.followers}</div>
                <div class="pdc-followers-label">粉丝</div>
                <div class="pdc-growth">+${dailyGrowth}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            selectedDayIndex = i;
            renderDayList(page, growthPlan);
            renderEditor(page, i, growthPlan);
        });

        list.appendChild(card);
    });
}

function renderEditor(page, index, growthPlan) {
    const panel = page.querySelector('#plan-right-panel');
    const day = growthPlan[index];
    const editorData = globalState.getEditorData(day.day);
    const dailyGrowth = index > 0 ? day.followers - growthPlan[index - 1].followers : day.followers;
    const isExplosion = dailyGrowth > 200;

    if (!editorData) {
        panel.innerHTML = '<div class="flex items-center justify-center h-full text-lv-brown/30">暂无内容数据</div>';
        return;
    }

    panel.innerHTML = `
        <div class="editor-header">
            <div class="editor-header-left">
                <div class="flex items-center gap-3 mb-1">
                    <div class="editor-day-badge ${day.status === 'active' ? 'active' : ''}">
                        <span class="text-[10px] font-semibold opacity-70">DAY</span>
                        <span class="text-xl font-black leading-none">${day.day}</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <h2 class="text-lg font-black text-lv-brown">${day.title}</h2>
                            ${renderTag(day.tag)}
                            ${isExplosion ? '<span class="inline-flex items-center gap-1 text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-semibold"><i class="ri-fire-fill"></i>爆发</span>' : ''}
                        </div>
                        <p class="text-xs text-lv-brown/40 mt-0.5">${day.date} · ${day.contentType} · 预计浏览 ${day.views >= 10000 ? (day.views / 10000).toFixed(1) + '万' : day.views} · 涨粉 +${dailyGrowth}</p>
                    </div>
                </div>
            </div>
            <div class="editor-header-right">
                <button class="editor-view-detail-btn" id="editor-view-detail">
                    <i class="ri-external-link-line"></i>详情
                </button>
            </div>
        </div>

        <div class="editor-quick-actions" id="editor-quick-actions">
            ${aiQuickActions.map(a => `
                <button class="editor-quick-btn" data-action="${a.id}" title="${a.desc}">
                    <span class="text-base">${a.icon}</span>
                    <span class="text-xs font-semibold">${a.label}</span>
                </button>
            `).join('')}
        </div>

        <div class="editor-main-area">
            <div class="editor-content-area" id="editor-content-area">
                <div class="editor-block" data-section="title">
                    <div class="editor-block-label">
                        <i class="ri-heading text-dior-gold"></i>
                        <span>标题</span>
                        <span class="editor-block-hint">点击编辑</span>
                    </div>
                    <div class="editor-field editor-title-field" contenteditable="true" data-field="title" id="editor-title">${editorData.title}</div>
                </div>

                <div class="editor-block" data-section="hook">
                    <div class="editor-block-label">
                        <i class="ri-flashlight-line text-dior-gold"></i>
                        <span>开头Hook</span>
                        <span class="editor-block-hint">点击编辑</span>
                    </div>
                    <div class="editor-field editor-hook-field" contenteditable="true" data-field="hook" id="editor-hook">${editorData.hook}</div>
                </div>

                <div class="editor-block" data-section="body">
                    <div class="editor-block-label">
                        <i class="ri-file-text-line text-dior-gold"></i>
                        <span>正文内容</span>
                        <span class="editor-block-hint">点击编辑</span>
                    </div>
                    <div class="editor-field editor-body-field" contenteditable="true" data-field="body" id="editor-body">${editorData.body.replace(/\n/g, '<br>')}</div>
                </div>

                <div class="editor-block" data-section="cta">
                    <div class="editor-block-label">
                        <i class="ri-megaphone-line text-dior-gold"></i>
                        <span>结尾CTA</span>
                        <span class="editor-block-hint">点击编辑</span>
                    </div>
                    <div class="editor-field editor-cta-field" contenteditable="true" data-field="cta" id="editor-cta">${editorData.cta}</div>
                </div>

                <div class="editor-ai-explain">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-5 h-5 rounded-md bg-dior-gold/15 flex items-center justify-center">
                            <i class="ri-robot-2-line text-dior-gold text-[10px]"></i>
                        </div>
                        <span class="text-xs font-bold text-dior-gold">Why this · AI决策解释</span>
                    </div>
                    <p class="text-xs text-lv-brown/55 leading-relaxed">${day.aiExplain}</p>
                </div>
            </div>

            <div class="editor-ai-panel" id="editor-ai-panel">
                <div class="ai-panel-header">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center">
                            <i class="ri-robot-2-line text-white text-xs"></i>
                        </div>
                        <span class="text-sm font-bold text-lv-brown">AI 助手</span>
                    </div>
                    <span class="ai-panel-status">
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                        <span class="text-[10px] text-green-600">实时分析中</span>
                    </span>
                </div>

                <div class="ai-panel-section">
                    <div class="ai-panel-section-title">
                        <i class="ri-bar-chart-2-line text-dior-gold text-xs"></i>
                        <span>数据预测</span>
                    </div>
                    <div class="ai-predict-grid">
                        <div class="ai-predict-item">
                            <span class="ai-predict-value">${day.views >= 10000 ? (day.views / 10000).toFixed(1) + '万' : day.views}</span>
                            <span class="ai-predict-label">预计浏览</span>
                        </div>
                        <div class="ai-predict-item">
                            <span class="ai-predict-value">${day.likes}</span>
                            <span class="ai-predict-label">预计点赞</span>
                        </div>
                        <div class="ai-predict-item">
                            <span class="ai-predict-value text-green-600">+${dailyGrowth}</span>
                            <span class="ai-predict-label">预计涨粉</span>
                        </div>
                        <div class="ai-predict-item">
                            <span class="ai-predict-value">${day.tag === 'hot' ? '85%' : day.tag === 'risk' ? '25%' : '50%'}</span>
                            <span class="ai-predict-label">爆款概率</span>
                        </div>
                    </div>
                </div>

                <div class="ai-panel-section">
                    <div class="ai-panel-section-title">
                        <i class="ri-checkbox-circle-line text-dior-gold text-xs"></i>
                        <span>当日任务</span>
                    </div>
                    <div class="ai-task-list">
                        ${day.tasks.map(t => `
                            <div class="ai-task-item">
                                <i class="ri-checkbox-circle-fill text-green-500 text-sm flex-shrink-0"></i>
                                <span class="text-xs text-lv-brown/60">${t}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    bindEditorEvents(page, day, growthPlan);
}

function bindEditorEvents(page, day, growthPlan) {
    const detailBtn = page.querySelector('#editor-view-detail');
    if (detailBtn) {
        detailBtn.addEventListener('click', () => router.navigate(`/create?day=${day.day}`));
    }

    // 编辑字段 - 双向同步到全局状态
    const fields = page.querySelectorAll('.editor-field');
    fields.forEach(field => {
        field.addEventListener('input', () => {
            const fieldName = field.dataset.field;
            const value = field.innerText;
            // 同步到全局状态
            globalState.updateEditorField(day.day, fieldName, value);
        });

        field.addEventListener('focus', () => {
            page.querySelectorAll('.editor-block').forEach(b => b.classList.remove('editing'));
            field.closest('.editor-block').classList.add('editing');
        });

        field.addEventListener('blur', () => {
            field.closest('.editor-block').classList.remove('editing');
        });
    });

    const quickBtns = page.querySelectorAll('.editor-quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            btn.classList.add('processing');
            btn.innerHTML = '<div class="loading-dots" style="transform:scale(0.5)"><span></span><span></span><span></span></div>';
            setTimeout(() => {
                btn.classList.remove('processing');
                const originalAction = aiQuickActions.find(a => a.id === action);
                if (originalAction) {
                    btn.innerHTML = `<span class="text-base">${originalAction.icon}</span><span class="text-xs font-semibold">${originalAction.label}</span>`;
                }
                const allFields = page.querySelectorAll('.editor-field');
                allFields.forEach(f => {
                    f.classList.add('field-updated');
                    setTimeout(() => f.classList.remove('field-updated'), 1000);
                });
                showToast(page, `${originalAction ? originalAction.icon : '✨'} ${originalAction ? originalAction.label : '优化'}完成！`);
            }, 1200);
        });
    });
}

function showToast(page, message) {
    const existing = page.querySelector('.editor-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'editor-toast';
    toast.innerHTML = `<i class="ri-check-double-line text-green-500"></i><span>${message}</span>`;
    page.querySelector('.plan-right-panel').appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}