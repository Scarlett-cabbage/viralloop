// 智能复盘页 - AI策略分析控制台
import { router } from '../router.js';
import { reviewData } from '../data.js';
import { renderNavbar, renderBreadcrumb, renderNextStep, renderFooter, renderAIExplain } from '../components.js';

// 当前激活的Tab
let activeTab = 'overview';

export function renderReview(container) {
    renderNavbar(container, 'review');
    renderBreadcrumb(container, 'review');

    const page = document.createElement('div');
    page.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6';

    page.innerHTML = `
        <div class="mb-6 fade-in">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-3">
                        <i class="ri-brain-line text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-medium">AI策略分析引擎 · 深度复盘</span>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="ai-typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                    <span class="text-xs text-lv-brown/40">AI持续分析中</span>
                </div>
            </div>

            <!-- Tab导航 -->
            <div class="review-tabs" id="review-tabs">
                <div class="review-tab active" data-tab="overview">
                    <i class="ri-dashboard-3-line"></i>表现总结
                </div>
                <div class="review-tab" data-tab="problems">
                    <i class="ri-bug-line"></i>问题拆解
                    <span class="tab-badge">3</span>
                </div>
                <div class="review-tab" data-tab="behavior">
                    <i class="ri-user-search-line"></i>用户行为洞察
                </div>
                <div class="review-tab" data-tab="optimize">
                    <i class="ri-magic-line"></i>优化建议
                    <span class="tab-badge">核心</span>
                </div>
            </div>
        </div>

        <!-- Tab内容区 -->
        <div id="tab-content"></div>

        <!-- 底部导航 -->
        <div class="flex items-center justify-between mt-8 fade-in">
            <button class="btn-secondary text-sm" id="back-analytics-btn"><i class="ri-arrow-left-line"></i>数据分析</button>
            <div class="flex items-center gap-3">
                <span class="text-xs text-lv-brown/30">下一步</span>
                <button class="btn-primary text-sm" id="go-results-btn"><i class="ri-trophy-line"></i>查看增长结果<i class="ri-arrow-right-line"></i></button>
            </div>
        </div>
    `;

    container.appendChild(page);
    renderFooter(container);

    // 绑定Tab切换
    const tabs = page.querySelectorAll('.review-tab');
    const tabContent = page.querySelector('#tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeTab = tab.dataset.tab;
            renderTabContent(tabContent, activeTab);
        });
    });

    // 初始渲染
    renderTabContent(tabContent, activeTab);

    // 绑定导航
    page.querySelector('#back-analytics-btn').addEventListener('click', () => router.navigate('/analytics'));
    page.querySelector('#go-results-btn').addEventListener('click', () => router.navigate('/results'));
}

// ========== Tab内容渲染 ==========

function renderTabContent(container, tab) {
    container.innerHTML = '';
    container.className = 'fade-in';
    switch (tab) {
        case 'overview': renderOverviewTab(container); break;
        case 'problems': renderProblemsTab(container); break;
        case 'behavior': renderBehaviorTab(container); break;
        case 'optimize': renderOptimizeTab(container); break;
    }
}

// ========== 1. 表现总结Tab ==========
function renderOverviewTab(container) {
    container.innerHTML = `
        <!-- 总评大卡片 -->
        <div class="review-hero mb-8 fade-in">
            <div class="relative flex flex-col lg:flex-row items-center gap-8">
                <!-- 评分环 -->
                <div class="flex-shrink-0">
                    <div class="grade-ring" style="--score: ${reviewData.overallScore}">
                        <div class="grade-ring-inner">
                            <span class="text-3xl font-black text-dior-gold">${reviewData.overallGrade}</span>
                            <span class="text-xs text-cream/50">${reviewData.overallScore}/100</span>
                        </div>
                    </div>
                </div>
                <!-- 总评信息 -->
                <div class="flex-1 text-center lg:text-left">
                    <div class="flex items-center justify-center lg:justify-start gap-3 mb-3">
                        <h2 class="text-2xl font-black text-cream">整体表现：<span class="text-dior-gold">${reviewData.gradeLabel}</span></h2>
                        ${reviewData.reachExpectation
                            ? '<span class="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">✓ 超出预期</span>'
                            : '<span class="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full">✗ 未达预期</span>'
                        }
                    </div>
                    <p class="text-cream/50 text-sm mb-4">${reviewData.expectationDetail}</p>
                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                        ${reviewData.highlights.map(h => `
                            <div class="text-center">
                                <div class="text-lg font-bold text-dior-gold">${h.score}</div>
                                <div class="text-xs text-cream/40">${h.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
            <!-- 左侧：维度评分 + 内容评分表 -->
            <div class="lg:col-span-2 space-y-6">
                <!-- 维度评分详情 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-1">
                    <h3 class="font-semibold text-lv-brown mb-5 flex items-center gap-2">
                        <i class="ri-bar-chart-horizontal-line text-dior-gold"></i>五维能力评估
                    </h3>
                    <div class="space-y-4" id="dimension-scores"></div>
                </div>

                <!-- 内容逐条评分 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-2">
                    <h3 class="font-semibold text-lv-brown mb-5 flex items-center gap-2">
                        <i class="ri-file-list-3-line text-dior-gold"></i>内容逐条评分
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b border-dior-gold/8">
                                    <th class="text-left text-xs font-semibold text-lv-brown/40 pb-3 pr-4">Day</th>
                                    <th class="text-left text-xs font-semibold text-lv-brown/40 pb-3 pr-4">内容标题</th>
                                    <th class="text-center text-xs font-semibold text-lv-brown/40 pb-3 px-2">评分</th>
                                    <th class="text-center text-xs font-semibold text-lv-brown/40 pb-3 px-2">等级</th>
                                    <th class="text-left text-xs font-semibold text-lv-brown/40 pb-3 pl-4">判定</th>
                                </tr>
                            </thead>
                            <tbody id="content-grades-body"></tbody>
                        </table>
                    </div>
                </div>

                ${renderAIExplain('本次复盘基于7天共7条内容的全维度数据分析。AI模型综合评估了内容质量、发布时机、互动效果、标题优化和话题选择5个维度。总体表现优秀（92分），主要得益于Day5的爆款内容和持续的高互动率。建议切换到"问题拆解"Tab查看详细问题分析。')}
            </div>

            <!-- 右侧面板 -->
            <div class="space-y-6">
                <!-- 雷达图 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-5 fade-in fade-in-delay-2">
                    <h3 class="font-semibold text-lv-brown mb-4 text-sm flex items-center gap-2">
                        <i class="ri-radar-line text-dior-gold"></i>能力雷达图
                    </h3>
                    <div class="relative w-full aspect-square max-w-[280px] mx-auto">
                        <canvas id="radar-chart" style="width:100%;height:100%;"></canvas>
                    </div>
                </div>

                <!-- 关键洞察 -->
                <div class="bg-gradient-to-br from-lv-brown to-lv-brown-dark rounded-xl p-5 fade-in fade-in-delay-3">
                    <h3 class="font-semibold text-cream mb-4 text-sm flex items-center gap-2">
                        <i class="ri-lightbulb-flash-line text-dior-gold"></i>关键洞察
                    </h3>
                    <div class="space-y-3">
                        ${reviewData.keyInsights.map((insight, i) => `
                            <div class="flex items-start gap-3 p-3 rounded-lg bg-lv-brown-light/30">
                                <div class="w-5 h-5 rounded-full bg-dior-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span class="text-dior-gold text-xs font-bold">${i + 1}</span>
                                </div>
                                <p class="text-cream/60 text-xs leading-relaxed">${insight}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 快速操作 -->
                <div class="bg-lv-brown rounded-xl p-5 fade-in fade-in-delay-4">
                    <h3 class="font-semibold text-cream mb-3 text-sm">下一步</h3>
                    <div class="space-y-2">
                        <button class="w-full btn-primary text-sm justify-center" id="go-problems-tab">
                            <i class="ri-bug-line"></i>查看问题拆解
                        </button>
                        <button class="w-full btn-secondary text-sm justify-center border-cream/20 text-cream/60 hover:text-cream" id="go-optimize-tab">
                            <i class="ri-magic-line"></i>查看优化建议
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 渲染维度评分
    const dimensionScores = container.querySelector('#dimension-scores');
    reviewData.highlights.forEach((h, i) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4';
        item.innerHTML = `
            <div class="w-20 text-sm text-lv-brown/60 flex-shrink-0 font-medium">${h.label}</div>
            <div class="flex-1">
                <div class="progress-bar" style="height: 8px;">
                    <div class="progress-bar-fill" style="width: 0%; transition: width 1s ease-out ${i * 0.15}s;"></div>
                </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-sm font-bold text-lv-brown">${h.score}</span>
                <i class="ri-arrow-up-s-fill text-green-500 text-sm"></i>
            </div>
        `;
        item.title = h.detail;
        dimensionScores.appendChild(item);
        // 动画延迟填充
        requestAnimationFrame(() => {
            setTimeout(() => {
                item.querySelector('.progress-bar-fill').style.width = h.score + '%';
            }, 100);
        });
    });

    // 渲染内容评分表
    const gradesBody = container.querySelector('#content-grades-body');
    reviewData.contentGrades.forEach(g => {
        const gradeClass = g.grade === 'A+' ? 'grade-a-plus' : g.grade === 'A' || g.grade === 'A-' ? 'grade-a' : g.grade === 'B+' ? 'grade-b-plus' : g.grade === 'B' ? 'grade-b' : 'grade-c';
        const verdictColor = g.verdict === '爆款' ? 'text-red-500 font-bold' : g.verdict.includes('超出') ? 'text-green-600' : g.verdict.includes('符合') ? 'text-dior-gold' : 'text-red-400';
        const row = document.createElement('tr');
        row.className = 'border-b border-dior-gold/5 hover:bg-cream/30 transition-colors';
        row.innerHTML = `
            <td class="py-3 pr-4">
                <span class="text-sm font-bold text-lv-brown">Day ${g.day}</span>
            </td>
            <td class="py-3 pr-4">
                <div class="text-sm text-lv-brown/70 max-w-[200px] truncate">${g.title}</div>
                <div class="text-xs text-lv-brown/35 mt-0.5">${g.reason}</div>
            </td>
            <td class="py-3 px-2 text-center">
                <div class="w-full bg-cream/50 rounded-full h-1.5 mb-1">
                    <div class="h-full rounded-full ${g.score >= 90 ? 'bg-green-500' : g.score >= 75 ? 'bg-dior-gold' : 'bg-red-400'}" style="width: ${g.score}%"></div>
                </div>
                <span class="text-xs text-lv-brown/50">${g.score}</span>
            </td>
            <td class="py-3 px-2 text-center">
                <span class="grade-cell ${gradeClass}">${g.grade}</span>
            </td>
            <td class="py-3 pl-4">
                <span class="text-xs ${verdictColor}">${g.verdict === '爆款' ? '🔥 ' : ''}${g.verdict}</span>
            </td>
        `;
        gradesBody.appendChild(row);
    });

    // 绘制雷达图
    requestAnimationFrame(() => {
        const radarCanvas = container.querySelector('#radar-chart');
        if (radarCanvas) drawRadarChart(radarCanvas, reviewData.highlights);
    });

    // Tab内跳转按钮
    const goProblemsBtn = container.querySelector('#go-problems-tab');
    const goOptimizeBtn = container.querySelector('#go-optimize-tab');
    if (goProblemsBtn) {
        goProblemsBtn.addEventListener('click', () => {
            document.querySelector('[data-tab="problems"]').click();
        });
    }
    if (goOptimizeBtn) {
        goOptimizeBtn.addEventListener('click', () => {
            document.querySelector('[data-tab="optimize"]').click();
        });
    }
}

// ========== 2. 问题拆解Tab ==========
function renderProblemsTab(container) {
    const { problemBreakdown } = reviewData;

    container.innerHTML = `
        <div class="mb-6 fade-in">
            <div class="flex items-center gap-3 mb-2">
                <i class="ri-search-eye-line text-dior-gold text-xl"></i>
                <h2 class="text-lg font-bold text-lv-brown">AI问题诊断报告</h2>
            </div>
            <p class="text-sm text-lv-brown/50">AI像专家一样拆解每个问题的根因，并量化影响程度</p>
        </div>

        <!-- 问题概览 -->
        <div class="grid grid-cols-3 gap-4 mb-8 fade-in fade-in-delay-1">
            <div class="bg-red-50 rounded-xl border border-red-100 p-4 text-center">
                <div class="text-2xl font-black text-red-500">1</div>
                <div class="text-xs text-red-400 mt-1">高优先级</div>
            </div>
            <div class="bg-amber-50 rounded-xl border border-amber-100 p-4 text-center">
                <div class="text-2xl font-black text-amber-500">1</div>
                <div class="text-xs text-amber-400 mt-1">中优先级</div>
            </div>
            <div class="bg-blue-50 rounded-xl border border-blue-100 p-4 text-center">
                <div class="text-2xl font-black text-blue-500">1</div>
                <div class="text-xs text-blue-400 mt-1">低优先级</div>
            </div>
        </div>

        <!-- 问题卡片列表 -->
        <div class="space-y-5" id="problem-cards"></div>

        ${renderAIExplain('问题拆解基于7天内容数据的多维度交叉分析。AI识别出3个核心问题，按影响程度排序。点击每张卡片可展开查看详细的根因分析和影响范围。最关键的问题是"开头吸引力不足"，直接影响了32%的用户在前3秒流失。')}
    `;

    // 渲染问题卡片
    const problemCards = container.querySelector('#problem-cards');
    problemBreakdown.forEach((problem, idx) => {
        const card = document.createElement('div');
        card.className = `problem-card severity-${problem.severity} fade-in fade-in-delay-${idx + 2}`;
        card.innerHTML = `
            <!-- 卡片头部 -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                        <i class="${problem.icon} text-lv-brown text-lg"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lv-brown text-sm">${problem.title}</h4>
                        <p class="text-xs text-lv-brown/40">${problem.subtitle}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="severity-badge ${problem.severity}">${problem.severity === 'high' ? '🔴 高' : problem.severity === 'medium' ? '🟡 中' : '🔵 低'}</span>
                    <i class="ri-arrow-down-s-line text-lv-brown/30 transition-transform expand-icon"></i>
                </div>
            </div>

            <!-- 指标对比 -->
            <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="bg-cream/40 rounded-lg p-3 text-center">
                    <div class="text-xs text-lv-brown/40 mb-1">当前值</div>
                    <div class="text-lg font-bold ${problem.severity === 'high' ? 'text-red-500' : problem.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'}">${problem.currentValue}</div>
                </div>
                <div class="bg-cream/40 rounded-lg p-3 text-center">
                    <div class="text-xs text-lv-brown/40 mb-1">目标值</div>
                    <div class="text-lg font-bold text-green-600">${problem.targetValue}</div>
                </div>
                <div class="bg-cream/40 rounded-lg p-3 text-center">
                    <div class="text-xs text-lv-brown/40 mb-1">差距</div>
                    <div class="text-lg font-bold text-red-400">${problem.gap}</div>
                </div>
            </div>

            <!-- 可展开详情 -->
            <div class="problem-detail">
                <div class="pt-4 border-t border-dior-gold/8 space-y-4">
                    <!-- 数据分析 -->
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <i class="ri-bar-chart-2-line text-dior-gold text-sm"></i>
                            <span class="text-xs font-semibold text-lv-brown">数据分析</span>
                        </div>
                        <p class="text-xs text-lv-brown/60 leading-relaxed bg-cream/30 rounded-lg p-3">${problem.analysis}</p>
                    </div>
                    <!-- 根因分析 -->
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <i class="ri-focus-3-line text-red-400 text-sm"></i>
                            <span class="text-xs font-semibold text-lv-brown">根因分析</span>
                        </div>
                        <p class="text-xs text-lv-brown/60 leading-relaxed bg-red-50/50 rounded-lg p-3 border-l-2 border-red-300">${problem.rootCause}</p>
                    </div>
                    <!-- 影响范围 -->
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <i class="ri-calendar-event-line text-dior-gold text-sm"></i>
                            <span class="text-xs font-semibold text-lv-brown">受影响内容</span>
                        </div>
                        <div class="flex gap-2">
                            ${problem.affectedDays.map(d => `
                                <span class="text-xs bg-lv-brown/5 text-lv-brown/60 px-3 py-1 rounded-full font-medium">Day ${d}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 点击展开/收起
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
            const icon = card.querySelector('.expand-icon');
            icon.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : '';
        });

        problemCards.appendChild(card);
    });
}

// ========== 3. 用户行为洞察Tab ==========
function renderBehaviorTab(container) {
    const { userBehavior } = reviewData;

    container.innerHTML = `
        <div class="mb-6 fade-in">
            <div class="flex items-center gap-3 mb-2">
                <i class="ri-user-search-line text-dior-gold text-xl"></i>
                <h2 class="text-lg font-bold text-lv-brown">用户行为深度洞察</h2>
            </div>
            <p class="text-sm text-lv-brown/50">追踪用户在内容中的每一个行为节点，找到增长密码</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-6 mb-8">
            <!-- 用户退出点分析 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-1">
                <h3 class="font-semibold text-lv-brown mb-2 flex items-center gap-2">
                    <i class="ri-logout-circle-r-line text-red-400"></i>用户退出点分析
                </h3>
                <p class="text-xs text-lv-brown/40 mb-5">用户在哪个时间段选择离开？</p>
                <div class="space-y-3" id="exit-funnel"></div>
                <div class="mt-4 pt-4 border-t border-dior-gold/8">
                    <div class="flex items-start gap-2">
                        <i class="ri-robot-2-line text-dior-gold text-sm mt-0.5 flex-shrink-0"></i>
                        <p class="text-xs text-lv-brown/50 leading-relaxed">
                            <strong class="text-lv-brown/70">AI诊断：</strong>最大流失发生在<span class="text-red-500 font-semibold">前3秒（32%）</span>，
                            说明开头钩子设计不足。高潮段（60-90秒）流失率最低（8%），证明核心内容质量过关。
                        </p>
                    </div>
                </div>
            </div>

            <!-- 互动高峰段 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-2">
                <h3 class="font-semibold text-lv-brown mb-2 flex items-center gap-2">
                    <i class="ri-fire-line text-dior-gold"></i>互动高峰段分析
                </h3>
                <p class="text-xs text-lv-brown/40 mb-5">哪些内容段落最能激发用户互动？</p>
                <div class="space-y-3" id="interaction-peaks"></div>
                <div class="mt-4 pt-4 border-t border-dior-gold/8">
                    <div class="flex items-start gap-2">
                        <i class="ri-robot-2-line text-dior-gold text-sm mt-0.5 flex-shrink-0"></i>
                        <p class="text-xs text-lv-brown/50 leading-relaxed">
                            <strong class="text-lv-brown/70">AI诊断：</strong><span class="text-dior-gold font-semibold">价格揭晓段</span>
                            互动率最高（12.5%），用户对价格信息最敏感。建议在每条内容中设计"价格悬念→揭晓"的节奏。
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 用户画像洞察 -->
        <div class="bg-white rounded-xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-3">
            <h3 class="font-semibold text-lv-brown mb-5 flex items-center gap-2">
                <i class="ri-team-line text-dior-gold"></i>粉丝画像洞察
            </h3>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" id="audience-insights"></div>
        </div>

        <!-- 行为路径可视化 -->
        <div class="bg-gradient-to-br from-lv-brown to-lv-brown-dark rounded-xl p-6 mb-8 fade-in fade-in-delay-4">
            <h3 class="font-semibold text-cream mb-5 flex items-center gap-2">
                <i class="ri-route-line text-dior-gold"></i>用户行为路径
            </h3>
            <div class="flex items-center justify-between flex-wrap gap-y-4">
                ${[
                    { icon: 'ri-eye-line', label: '曝光', value: '108K', rate: '100%' },
                    { icon: 'ri-play-circle-line', label: '点击', value: '45K', rate: '41.7%' },
                    { icon: 'ri-time-line', label: '观看>3秒', value: '30.6K', rate: '68%' },
                    { icon: 'ri-heart-line', label: '互动', value: '7K', rate: '6.3%' },
                    { icon: 'ri-user-add-line', label: '关注', value: '1,024', rate: '0.95%' },
                ].map((step, i, arr) => `
                    <div class="flex items-center gap-3">
                        <div class="text-center">
                            <div class="w-12 h-12 rounded-xl bg-lv-brown-light/40 flex items-center justify-center mb-2">
                                <i class="${step.icon} text-dior-gold text-lg"></i>
                            </div>
                            <div class="text-sm font-bold text-cream">${step.value}</div>
                            <div class="text-xs text-cream/40">${step.label}</div>
                            <div class="text-xs text-dior-gold mt-0.5">${step.rate}</div>
                        </div>
                        ${i < arr.length - 1 ? '<i class="ri-arrow-right-line text-dior-gold/30 text-lg hidden sm:block"></i>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>

        ${renderAIExplain('用户行为数据揭示了一个清晰的优化路径：前3秒流失率32%是最大的增长瓶颈。如果能将前3秒留存率从68%提升到85%，预计每条内容可多获得约5,100次有效观看，按当前转粉率计算，每条内容可多涨粉48人。7天累计可多涨粉336人，增长提速33%。')}
    `;

    // 渲染退出漏斗
    const exitFunnel = container.querySelector('#exit-funnel');
    const maxExit = Math.max(...userBehavior.exitPoints.map(e => e.exitRate));
    userBehavior.exitPoints.forEach((point, i) => {
        const bar = document.createElement('div');
        const width = (point.exitRate / maxExit) * 100;
        bar.className = 'flex items-center gap-3';
        bar.innerHTML = `
            <div class="w-20 text-xs text-lv-brown/50 text-right flex-shrink-0">${point.segment}</div>
            <div class="flex-1">
                <div class="exit-funnel-bar" style="width: ${width}%; background: ${point.color}; opacity: 0; transition: all 0.6s ease ${i * 0.1}s;">
                    <span class="text-white text-xs font-bold">${point.exitRate}%</span>
                </div>
            </div>
            <div class="w-16 text-xs text-lv-brown/40 flex-shrink-0">${point.label}</div>
        `;
        exitFunnel.appendChild(bar);
        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.querySelector('.exit-funnel-bar').style.opacity = '1';
            }, 100);
        });
    });

    // 渲染互动高峰
    const peaksContainer = container.querySelector('#interaction-peaks');
    userBehavior.interactionPeaks.forEach(peak => {
        const card = document.createElement('div');
        card.className = 'peak-card flex items-center gap-4';
        card.innerHTML = `
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background: ${peak.color}15;">
                <i class="${peak.icon}" style="color: ${peak.color};"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-semibold text-lv-brown">${peak.segment}</span>
                    <span class="text-sm font-bold text-dior-gold">${peak.interactionRate}%</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-lv-brown/40">${peak.type}</span>
                    <div class="flex-1 h-1.5 bg-cream/50 rounded-full overflow-hidden">
                        <div class="h-full rounded-full" style="width: ${(peak.interactionRate / 15) * 100}%; background: ${peak.color};"></div>
                    </div>
                </div>
            </div>
        `;
        peaksContainer.appendChild(card);
    });

    // 渲染用户画像
    const audienceContainer = container.querySelector('#audience-insights');
    userBehavior.audienceInsights.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-cream/30 rounded-xl p-4 text-center';
        card.innerHTML = `
            <div class="text-2xl font-black text-lv-brown mb-1">${item.percentage}%</div>
            <div class="text-xs text-lv-brown/50 mb-2">${item.label}</div>
            <div class="flex items-center justify-center gap-1">
                ${item.trend === 'up'
                    ? '<i class="ri-arrow-up-s-fill text-green-500 text-sm"></i><span class="text-xs text-green-600">增长中</span>'
                    : '<i class="ri-subtract-line text-lv-brown/30 text-sm"></i><span class="text-xs text-lv-brown/40">稳定</span>'
                }
            </div>
        `;
        audienceContainer.appendChild(card);
    });
}

// ========== 4. 优化建议Tab（最关键） ==========
function renderOptimizeTab(container) {
    const { optimizationPlan, suggestions } = reviewData;

    container.innerHTML = `
        <div class="mb-6 fade-in">
            <div class="flex items-center gap-3 mb-2">
                <i class="ri-magic-line text-dior-gold text-xl"></i>
                <h2 class="text-lg font-bold text-lv-brown">AI优化方案</h2>
                <span class="bg-dior-gold text-white text-xs font-bold px-3 py-1 rounded-full">核心输出</span>
            </div>
            <p class="text-sm text-lv-brown/50">下一条内容应该如何调整？AI给出精确到每个环节的优化方案</p>
        </div>

        <!-- 三大优化方案 -->
        <div class="space-y-6 mb-8">
            <!-- 1. 开头优化 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-1">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                        <i class="${optimizationPlan.hookOptimization.icon} text-dior-gold text-lg"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lv-brown">${optimizationPlan.hookOptimization.title}</h3>
                        <p class="text-xs text-green-600 font-medium">${optimizationPlan.hookOptimization.expectedImprovement}</p>
                    </div>
                </div>

                <!-- 前后对比 -->
                <div class="optimize-compare mb-5">
                    <div class="optimize-before">
                        <div class="text-xs text-red-400 font-semibold mb-2 flex items-center gap-1">
                            <i class="ri-close-circle-line"></i>优化前
                        </div>
                        <p class="text-sm text-lv-brown/60 italic">"${optimizationPlan.hookOptimization.before}"</p>
                    </div>
                    <div class="optimize-arrow">
                        <i class="ri-arrow-right-line"></i>
                    </div>
                    <div class="optimize-after">
                        <div class="text-xs text-green-600 font-semibold mb-2 flex items-center gap-1">
                            <i class="ri-check-double-line"></i>优化后
                        </div>
                        <p class="text-sm text-lv-brown/80 font-medium">"${optimizationPlan.hookOptimization.after}"</p>
                    </div>
                </div>

                <!-- 技巧列表 -->
                <h4 class="text-xs font-semibold text-lv-brown/50 mb-3 flex items-center gap-1">
                    <i class="ri-tools-line text-dior-gold"></i>推荐开头技巧
                </h4>
                <div class="space-y-3">
                    ${optimizationPlan.hookOptimization.techniques.map(t => `
                        <div class="flex items-center gap-4 p-3 bg-cream/30 rounded-lg">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm font-semibold text-lv-brown">${t.name}</span>
                                    <span class="text-xs font-bold text-dior-gold">${t.effectiveness}%</span>
                                </div>
                                <p class="text-xs text-lv-brown/50 truncate">${t.example}</p>
                                <div class="technique-bar mt-2">
                                    <div class="technique-bar-fill" style="width: ${t.effectiveness}%"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 2. 内容节奏优化 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-2">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                        <i class="${optimizationPlan.rhythmOptimization.icon} text-dior-gold text-lg"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lv-brown">${optimizationPlan.rhythmOptimization.title}</h3>
                        <p class="text-xs text-green-600 font-medium">${optimizationPlan.rhythmOptimization.expectedImprovement}</p>
                    </div>
                </div>

                <!-- 前后对比 -->
                <div class="optimize-compare mb-5">
                    <div class="optimize-before">
                        <div class="text-xs text-red-400 font-semibold mb-2 flex items-center gap-1">
                            <i class="ri-close-circle-line"></i>优化前
                        </div>
                        <p class="text-xs text-lv-brown/60">${optimizationPlan.rhythmOptimization.before}</p>
                    </div>
                    <div class="optimize-arrow">
                        <i class="ri-arrow-right-line"></i>
                    </div>
                    <div class="optimize-after">
                        <div class="text-xs text-green-600 font-semibold mb-2 flex items-center gap-1">
                            <i class="ri-check-double-line"></i>优化后
                        </div>
                        <p class="text-xs text-lv-brown/80 font-medium">${optimizationPlan.rhythmOptimization.after}</p>
                    </div>
                </div>

                <!-- 节奏波形图 -->
                <h4 class="text-xs font-semibold text-lv-brown/50 mb-3 flex items-center gap-1">
                    <i class="ri-equalizer-line text-dior-gold"></i>推荐内容节奏波形
                </h4>
                <div class="rhythm-bar mb-3" id="rhythm-wave"></div>
                <div class="grid grid-cols-7 gap-1 text-center">
                    ${optimizationPlan.rhythmOptimization.structure.map(s => `
                        <div>
                            <div class="text-xs font-semibold text-lv-brown/70">${s.phase}</div>
                            <div class="text-xs text-lv-brown/30 mt-0.5">${s.duration}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 3. 互动点植入 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-3">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                        <i class="${optimizationPlan.interactionOptimization.icon} text-dior-gold text-lg"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lv-brown">${optimizationPlan.interactionOptimization.title}</h3>
                        <p class="text-xs text-green-600 font-medium">${optimizationPlan.interactionOptimization.expectedImprovement}</p>
                    </div>
                </div>

                <!-- 前后对比 -->
                <div class="optimize-compare mb-5">
                    <div class="optimize-before">
                        <div class="text-xs text-red-400 font-semibold mb-2 flex items-center gap-1">
                            <i class="ri-close-circle-line"></i>优化前
                        </div>
                        <p class="text-xs text-lv-brown/60">${optimizationPlan.interactionOptimization.before}</p>
                    </div>
                    <div class="optimize-arrow">
                        <i class="ri-arrow-right-line"></i>
                    </div>
                    <div class="optimize-after">
                        <div class="text-xs text-green-600 font-semibold mb-2 flex items-center gap-1">
                            <i class="ri-check-double-line"></i>优化后
                        </div>
                        <p class="text-xs text-lv-brown/80 font-medium">${optimizationPlan.interactionOptimization.after}</p>
                    </div>
                </div>

                <!-- 互动点列表 -->
                <h4 class="text-xs font-semibold text-lv-brown/50 mb-3 flex items-center gap-1">
                    <i class="ri-chat-check-line text-dior-gold"></i>互动触发点设计
                </h4>
                <div class="grid sm:grid-cols-2 gap-3">
                    ${optimizationPlan.interactionOptimization.interactionPoints.map(point => `
                        <div class="bg-cream/30 rounded-xl p-4 border border-transparent hover:border-dior-gold/15 transition-all hover:shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs font-bold text-dior-gold bg-dior-gold/10 px-2 py-0.5 rounded">${point.position}</span>
                                <span class="text-xs text-green-600 font-semibold">${point.expectedEffect}</span>
                            </div>
                            <div class="text-xs font-semibold text-lv-brown mb-1">${point.type}</div>
                            <p class="text-xs text-lv-brown/50 italic">"${point.example}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- 全部优化建议汇总 -->
        <div class="bg-white rounded-xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-4">
            <h3 class="font-semibold text-lv-brown mb-5 flex items-center gap-2">
                <i class="ri-todo-line text-dior-gold"></i>全部优化建议
            </h3>
            <div class="space-y-3" id="all-suggestions"></div>
        </div>

        ${renderAIExplain('以上优化方案基于7天数据的深度分析生成。三大优化方向（开头钩子、内容节奏、互动设计）预计可将整体互动率从6.3%提升至9.5%，日均涨粉从146人提升至220人。如果全部执行，下一个7天周期预计可达到3,000粉丝。建议优先执行"开头优化"，这是ROI最高的改进点。')}
    `;

    // 渲染节奏波形
    const rhythmWave = container.querySelector('#rhythm-wave');
    if (rhythmWave) {
        optimizationPlan.rhythmOptimization.structure.forEach(s => {
            const bar = document.createElement('div');
            bar.className = 'rhythm-bar-item';
            const hue = s.energy > 80 ? '45, 100%, 55%' : s.energy > 60 ? '38, 60%, 55%' : '30, 40%, 65%';
            bar.style.height = s.energy + '%';
            bar.style.background = `linear-gradient(to top, hsla(${hue}, 0.3), hsla(${hue}, 0.8))`;
            bar.innerHTML = `<div class="rhythm-tooltip">${s.phase}: ${s.desc} (能量${s.energy}%)</div>`;
            rhythmWave.appendChild(bar);
        });
    }

    // 渲染全部建议
    const suggestionsContainer = container.querySelector('#all-suggestions');
    suggestions.forEach(s => {
        const item = document.createElement('div');
        const priorityColors = {
            high: 'border-red-400 bg-red-50/50',
            medium: 'border-dior-gold bg-dior-gold/5',
            low: 'border-lv-brown/20 bg-cream/30',
        };
        const priorityLabels = {
            high: '🔴 高优先级',
            medium: '🟡 中优先级',
            low: '🔵 低优先级',
        };
        item.className = `flex items-start gap-3 p-4 rounded-lg ${priorityColors[s.priority]}`;
        item.style.borderLeftWidth = '3px';
        item.style.borderLeftStyle = 'solid';
        item.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-medium ${s.priority === 'high' ? 'text-red-500' : s.priority === 'medium' ? 'text-dior-gold' : 'text-lv-brown/40'}">${priorityLabels[s.priority]}</span>
                    <span class="text-xs bg-lv-brown/5 text-lv-brown/40 px-2 py-0.5 rounded">${s.category}</span>
                </div>
                <p class="text-sm text-lv-brown/70">${s.text}</p>
            </div>
        `;
        suggestionsContainer.appendChild(item);
    });
}

// ========== 雷达图绘制 ==========
function drawRadarChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(cx, cy) * 0.75;
    const n = data.length;

    // 背景网格
    for (let level = 1; level <= 4; level++) {
        const r = (radius / 4) * level;
        ctx.strokeStyle = 'rgba(169, 149, 99, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // 轴线
    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        ctx.strokeStyle = 'rgba(169, 149, 99, 0.1)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
        ctx.stroke();
    }

    // 数据区域
    ctx.fillStyle = 'rgba(169, 149, 99, 0.15)';
    ctx.strokeStyle = '#A99563';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((d, i) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const r = (d.score / 100) * radius;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 数据点和标签
    data.forEach((d, i) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const r = (d.score / 100) * radius;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        ctx.fillStyle = '#A99563';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        const labelR = radius + 20;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        ctx.fillStyle = 'rgba(89, 47, 35, 0.6)';
        ctx.font = '11px Inter, Noto Sans SC';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(d.label, lx, ly);
    });
}
