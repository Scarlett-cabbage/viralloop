// 内容创作页 - 重构版（全局状态同步 + 人设驱动内容）
import { router } from '../router.js';
import { renderNavbar, renderBreadcrumb, renderNextStep, renderFooter, renderTag, renderAIExplain, PAGE_CONFIG } from '../components.js';
import { globalState } from '../state.js';

export function renderCreate(container, params) {
    renderNavbar(container, 'create');

    // 从全局状态获取数据
    const growthPlan = globalState.getPlan();
    const dayIndex = parseInt(params.day || '1') - 1;
    const day = growthPlan[dayIndex] || growthPlan[0];
    const prevDay = dayIndex > 0 ? growthPlan[dayIndex - 1] : null;
    const nextDay = dayIndex < growthPlan.length - 1 ? growthPlan[dayIndex + 1] : null;
    const dailyGrowth = day.followers - (prevDay ? prevDay.followers : 0);
    const persona = globalState.getPersona();

    // 从全局状态获取编辑器数据
    const editorData = globalState.getEditorData(day.day);

    // 面包屑
    renderBreadcrumb(container, 'create', [{ label: `Day ${day.day}` }]);

    // 页面头部
    const header = document.createElement('div');
    header.className = 'vl-page-header fade-in';
    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-lv-brown flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                            <i class="ri-edit-box-line text-dior-gold text-lg"></i>
                        </div>
                        内容创作 · Day ${day.day}
                    </h1>
                    <p class="text-lv-brown/50 text-sm mt-1 ml-[52px]">${day.title} · ${day.contentType}${persona ? ` · ${persona.name}` : ''}</p>
                </div>
                <div class="vl-status-badge">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span class="text-xs font-medium text-lv-brown/60">Day ${day.day} ${day.status === 'active' ? '进行中' : '已完成'}</span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(header);

    const page = document.createElement('div');
    page.className = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6';

    page.innerHTML = `
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- 左侧主内容 -->
            <div class="lg:col-span-2 space-y-6">
                <!-- 内容编辑卡片（可编辑，双向同步） -->
                <div class="bg-white rounded-xl border border-dior-gold/10 overflow-hidden fade-in fade-in-delay-1">
                    <div class="bg-gradient-to-r from-lv-brown to-lv-brown-dark p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-dior-gold/20 flex items-center justify-center">
                                <span class="text-lg">${persona?.emoji || '📝'}</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-cream font-semibold">Day ${day.day}</span>
                                    ${renderTag(day.tag)}
                                </div>
                                <span class="text-cream/40 text-xs">${day.date} · ${day.contentType}</span>
                            </div>
                        </div>
                        <h2 class="text-xl font-bold text-cream leading-relaxed" id="create-title-display">${editorData ? editorData.title : day.contentTitle}</h2>
                    </div>
                    <div class="p-6 space-y-5">
                        <!-- 可编辑的Hook -->
                        <div class="create-edit-block">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="ri-flashlight-line text-dior-gold text-sm"></i>
                                <span class="text-sm font-semibold text-lv-brown">开头Hook</span>
                                <span class="text-xs text-lv-brown/30">（点击编辑，自动同步到增长计划）</span>
                            </div>
                            <div class="create-edit-field" contenteditable="true" data-field="hook" id="create-hook">${editorData ? editorData.hook : ''}</div>
                        </div>

                        <!-- 可编辑的正文 -->
                        <div class="create-edit-block">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="ri-file-text-line text-dior-gold text-sm"></i>
                                <span class="text-sm font-semibold text-lv-brown">正文内容</span>
                            </div>
                            <div class="create-edit-field create-body-field" contenteditable="true" data-field="body" id="create-body">${editorData ? editorData.body.replace(/\n/g, '<br>') : ''}</div>
                        </div>

                        <!-- 可编辑的CTA -->
                        <div class="create-edit-block">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="ri-megaphone-line text-dior-gold text-sm"></i>
                                <span class="text-sm font-semibold text-lv-brown">结尾CTA</span>
                            </div>
                            <div class="create-edit-field" contenteditable="true" data-field="cta" id="create-cta">${editorData ? editorData.cta : ''}</div>
                        </div>

                        <!-- 同步状态指示 -->
                        <div class="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg" id="sync-indicator" style="display:none;">
                            <i class="ri-check-double-line"></i>
                            <span>内容已同步到增长计划</span>
                        </div>
                    </div>
                </div>

                <!-- 今日任务 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-2">
                    <h3 class="font-semibold text-lv-brown mb-4 flex items-center gap-2">
                        <i class="ri-checkbox-circle-line text-dior-gold"></i>今日任务清单
                    </h3>
                    <div class="space-y-3">
                        ${day.tasks.map((t) => `
                            <div class="flex items-center gap-3 p-3 rounded-lg bg-cream/30 hover:bg-cream/60 transition-colors">
                                <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                    <i class="ri-check-line text-white text-xs"></i>
                                </div>
                                <span class="text-sm text-lv-brown/70">${t}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${renderAIExplain(day.aiExplain)}

                <!-- 导航按钮 -->
                <div class="flex items-center justify-between">
                    ${prevDay ? `<button class="btn-secondary text-sm" id="prev-day"><i class="ri-arrow-left-line"></i>Day ${prevDay.day}</button>` : '<div></div>'}
                    ${nextDay ? `<button class="btn-primary text-sm" id="next-day">Day ${nextDay.day}<i class="ri-arrow-right-line"></i></button>` : `<button class="btn-primary text-sm" id="go-analytics">查看数据分析<i class="ri-arrow-right-line"></i></button>`}
                </div>
            </div>

            <!-- 右侧数据面板 -->
            <div class="space-y-6 fade-in fade-in-delay-3">
                <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                    <h3 class="font-semibold text-lv-brown mb-4 text-sm flex items-center gap-2">
                        <i class="ri-bar-chart-2-line text-dior-gold"></i>内容数据
                    </h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.views.toLocaleString()}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">浏览量</div>
                        </div>
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.likes.toLocaleString()}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">点赞数</div>
                        </div>
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.comments}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">评论数</div>
                        </div>
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.shares}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">分享数</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                    <h3 class="font-semibold text-lv-brown mb-4 text-sm flex items-center gap-2">
                        <i class="ri-user-heart-line text-dior-gold"></i>粉丝变化
                    </h3>
                    <div class="text-center py-4">
                        <div class="text-3xl font-bold text-lv-brown">${day.followers.toLocaleString()}</div>
                        <div class="text-sm text-lv-brown/40 mt-1">累计粉丝</div>
                        <div class="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full ${dailyGrowth > 100 ? 'bg-green-50 text-green-600' : 'bg-cream text-lv-brown/50'}">
                            <i class="ri-arrow-up-s-fill"></i>
                            <span class="text-sm font-medium">+${dailyGrowth} 今日新增</span>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-dior-gold/8">
                        <div class="flex items-center justify-between text-xs text-lv-brown/40 mb-2">
                            <span>目标进度</span>
                            <span>${day.followers}/1000</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: ${Math.min(day.followers / 10, 100)}%"></div>
                        </div>
                    </div>
                </div>

                <!-- 快速操作 -->
                <div class="bg-lv-brown rounded-xl p-5">
                    <h3 class="font-semibold text-cream mb-3 text-sm flex items-center gap-2">
                        <i class="ri-flashlight-line text-dior-gold"></i>快速跳转
                    </h3>
                    <div class="space-y-2">
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-plan-btn">
                            <i class="ri-calendar-line text-dior-gold"></i>增长计划
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-analytics-btn">
                            <i class="ri-bar-chart-2-line text-dior-gold"></i>数据分析
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-review-btn">
                            <i class="ri-brain-line text-dior-gold"></i>智能复盘
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(page);

    // 下一步行动按钮
    renderNextStep(container, 'create');
    renderFooter(container);

    // 绑定编辑事件 - 双向同步
    const editFields = page.querySelectorAll('.create-edit-field');
    let syncTimer = null;
    editFields.forEach(field => {
        field.addEventListener('input', () => {
            const fieldName = field.dataset.field;
            const value = field.innerText;
            // 同步到全局状态
            globalState.updateEditorField(day.day, fieldName, value);

            // 显示同步指示器
            const indicator = page.querySelector('#sync-indicator');
            if (indicator) {
                indicator.style.display = 'flex';
                clearTimeout(syncTimer);
                syncTimer = setTimeout(() => {
                    indicator.style.display = 'none';
                }, 2000);
            }
        });

        field.addEventListener('focus', () => {
            field.closest('.create-edit-block').classList.add('editing');
        });
        field.addEventListener('blur', () => {
            field.closest('.create-edit-block').classList.remove('editing');
        });
    });

    // 绑定导航事件
    if (prevDay) page.querySelector('#prev-day').addEventListener('click', () => router.navigate(`/create?day=${prevDay.day}`));
    if (nextDay) {
        page.querySelector('#next-day').addEventListener('click', () => router.navigate(`/create?day=${nextDay.day}`));
    } else {
        const goBtn = page.querySelector('#go-analytics');
        if (goBtn) goBtn.addEventListener('click', () => router.navigate('/analytics'));
    }
    page.querySelector('#go-plan-btn').addEventListener('click', () => router.navigate('/plan'));
    page.querySelector('#go-analytics-btn').addEventListener('click', () => router.navigate('/analytics'));
    page.querySelector('#go-review-btn').addEventListener('click', () => router.navigate('/review'));
}
