// 数据分析页 - 深色BI仪表盘风格 + 真实数据接入能力
import { router } from '../router.js';
import {
    contentPerformance, followerGrowthData, growthPlan,
    analyticsKPI, viewsVsConversion, contentTypeAnalysis,
    userActiveHours, contentStructureAnalysis, aiInsights
} from '../data.js';
import {
    renderFooter, renderDarkNavbar, renderDarkBreadcrumb, renderNextStep
} from '../components.js';
import {
    drawDarkLineChart, drawDarkBarChart,
    drawDarkDualAxisChart, drawDarkHorizontalBar
} from '../charts.js';
import {
    syncService, PLATFORMS, ConnectionStatus, DataMode,
    getConnectionStatusInfo, formatLastSync
} from '../data-service.js';

// 自动刷新定时器（已移除）

export function renderAnalytics(container) {
    // 深色全屏容器
    const wrapper = document.createElement('div');
    wrapper.className = 'dark-dashboard';

    container.appendChild(wrapper);
    renderDarkNavbar(wrapper, 'analytics');
    renderDarkBreadcrumb(wrapper, 'analytics');

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = `
        <div class="max-w-[1440px] mx-auto px-6 py-5" id="analytics-content">
            <!-- 页面头部 + 精简状态栏 -->
            <div class="flex items-center justify-between mb-5 fade-in">
                <div>
                    <h1 class="text-xl font-bold text-cream/90 mb-1 flex items-center gap-3">
                        <i class="ri-dashboard-3-line text-dior-gold"></i>
                        增长数据仪表盘
                        <span class="text-xs font-normal text-cream/25 bg-cream/5 px-2.5 py-1 rounded-md">7天周期</span>
                    </h1>
                    <p class="text-xs text-cream/30">全维度数据监控 · AI驱动增长决策</p>
                </div>
                <div class="flex items-center gap-4">
                    <!-- 精简的数据状态指示 -->
                    <div class="flex items-center gap-3 text-xs text-cream/35 bg-cream/[0.03] border border-cream/[0.06] rounded-lg px-3 py-1.5">
                        <span class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span>Demo模式</span>
                        </span>
                        <span class="w-px h-3 bg-cream/10"></span>
                        <span class="flex items-center gap-1.5 cursor-pointer hover:text-cream/50 transition-colors" id="dcb-settings-btn" title="数据源设置">
                            <i class="ri-settings-3-line"></i>
                            <span>数据源</span>
                        </span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="dark-btn-secondary text-xs" id="back-plan-btn"><i class="ri-arrow-left-s-line"></i>增长计划</button>
                        <button class="dark-btn-primary text-xs" id="go-review-btn"><i class="ri-brain-line"></i>智能复盘</button>
                    </div>
                </div>
            </div>

            <!-- KPI仪表盘 -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5" id="kpi-section"></div>

            <!-- 图表区域：主图 + 侧边指标 -->
            <div class="grid lg:grid-cols-3 gap-4 mb-5">
                <!-- 粉丝增长曲线 -->
                <div class="lg:col-span-2 dark-chart-panel fade-in fade-in-delay-1">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-4 rounded-full bg-dior-gold"></div>
                            <h3 class="text-sm font-semibold text-cream/80">粉丝增长趋势</h3>
                        </div>
                        <div class="flex items-center gap-3 text-xs">
                            <span class="flex items-center gap-1.5 text-cream/30">
                                <span class="w-3 h-0.5 bg-dior-gold rounded"></span>累计粉丝
                            </span>
                        </div>
                    </div>
                    <canvas id="dark-follower-chart" style="width:100%;height:260px;"></canvas>
                </div>

                <!-- 右侧指标面板 -->
                <div class="space-y-4">
                    <!-- 转粉率环形图 -->
                    <div class="dark-chart-panel fade-in fade-in-delay-2">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="w-1 h-4 rounded-full bg-green-400"></div>
                            <h3 class="text-sm font-semibold text-cream/80">核心转化指标</h3>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="text-center">
                                <div class="ring-progress mx-auto mb-2">
                                    <svg width="72" height="72" viewBox="0 0 80 80">
                                        <circle class="ring-bg" cx="40" cy="40" r="32" fill="none" stroke-width="6"/>
                                        <circle class="ring-fill" cx="40" cy="40" r="32" fill="none" stroke-width="6"
                                            stroke-dasharray="201" stroke-dashoffset="193.4" id="ring-conversion"/>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="text-base font-bold text-cream/90 counter-value">3.8%</span>
                                    </div>
                                </div>
                                <div class="text-xs text-cream/40">转粉率</div>
                                <div class="text-xs text-green-400 mt-0.5">↑ 1.2%</div>
                            </div>
                            <div class="text-center">
                                <div class="ring-progress mx-auto mb-2">
                                    <svg width="72" height="72" viewBox="0 0 80 80">
                                        <circle class="ring-bg" cx="40" cy="40" r="32" fill="none" stroke-width="6"/>
                                        <circle class="ring-fill" cx="40" cy="40" r="32" fill="none" stroke-width="6"
                                            stroke-dasharray="201" stroke-dashoffset="115" id="ring-viral" style="stroke: #ff8a65;"/>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <span class="text-base font-bold text-cream/90 counter-value">42.8%</span>
                                    </div>
                                </div>
                                <div class="text-xs text-cream/40">爆款率</div>
                                <div class="text-xs text-green-400 mt-0.5">↑ 15.3%</div>
                            </div>
                        </div>
                    </div>

                    <!-- 内容类型分布 -->
                    <div class="dark-chart-panel fade-in fade-in-delay-3">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="w-1 h-4 rounded-full bg-purple-400"></div>
                            <h3 class="text-sm font-semibold text-cream/80">内容类型效果</h3>
                        </div>
                        <div class="space-y-3" id="content-type-bars"></div>
                    </div>
                </div>
            </div>

            <!-- 双图表行：播放量对比 + 活跃时段 -->
            <div class="grid lg:grid-cols-2 gap-4 mb-5">
                <div class="dark-chart-panel fade-in fade-in-delay-2">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-4 rounded-full bg-dior-gold"></div>
                            <h3 class="text-sm font-semibold text-cream/80">播放量 vs 转粉率</h3>
                        </div>
                        <span class="text-xs text-cream/20">双轴对比</span>
                    </div>
                    <canvas id="dark-dual-chart" style="width:100%;height:240px;"></canvas>
                </div>

                <div class="dark-chart-panel fade-in fade-in-delay-3">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-4 rounded-full bg-blue-400"></div>
                            <h3 class="text-sm font-semibold text-cream/80">用户活跃时段</h3>
                        </div>
                        <span class="text-xs text-cream/20">活跃度指数</span>
                    </div>
                    <canvas id="dark-active-chart" style="width:100%;height:240px;"></canvas>
                </div>
            </div>

            <!-- 内容表现排行榜 -->
            <div class="dark-chart-panel mb-5 fade-in fade-in-delay-3">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <div class="w-1 h-4 rounded-full bg-dior-gold"></div>
                        <h3 class="text-sm font-semibold text-cream/80">内容表现排行</h3>
                    </div>
                    <span class="text-xs text-cream/20">按播放量排序</span>
                </div>
                <div class="overflow-x-auto">
                    <table class="dark-table">
                        <thead>
                            <tr>
                                <th style="width:40px">#</th>
                                <th>内容标题</th>
                                <th style="width:70px">类型</th>
                                <th style="width:90px;text-align:right">播放量</th>
                                <th style="width:70px;text-align:right">点赞</th>
                                <th style="width:70px;text-align:right">转粉</th>
                                <th style="width:80px;text-align:right">互动率</th>
                                <th style="width:70px;text-align:center">标签</th>
                            </tr>
                        </thead>
                        <tbody id="dark-ranking-table"></tbody>
                    </table>
                </div>
            </div>

            <!-- 内容结构 + AI洞察 并排 -->
            <div class="grid lg:grid-cols-2 gap-4 mb-5">
                <!-- 内容结构效果 -->
                <div class="dark-chart-panel fade-in fade-in-delay-4">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <div class="w-1 h-4 rounded-full bg-yellow-400"></div>
                            <h3 class="text-sm font-semibold text-cream/80">内容结构效果</h3>
                        </div>
                        <span class="text-xs text-cream/20">AI评分</span>
                    </div>
                    <div class="grid grid-cols-2 gap-3" id="structure-cards"></div>
                </div>

                <!-- AI洞察 -->
                <div class="dark-chart-panel fade-in fade-in-delay-4">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-1 h-4 rounded-full bg-dior-gold"></div>
                        <h3 class="text-sm font-semibold text-cream/80">AI 增长洞察</h3>
                        <span class="text-xs text-cream/20 ml-auto">可执行建议</span>
                    </div>
                    <div class="space-y-3" id="ai-insights-grid"></div>
                </div>
            </div>

            <!-- 底部导航 -->
            <div class="flex items-center justify-between pt-2 pb-6">
                <button class="dark-btn-secondary text-sm" id="back-plan-btn-2"><i class="ri-arrow-left-line"></i>增长计划</button>
                <button class="dark-btn-primary text-sm" id="go-review-btn-2"><i class="ri-brain-line"></i>查看智能复盘<i class="ri-arrow-right-line"></i></button>
            </div>
        </div>
    `;

    wrapper.appendChild(contentDiv);

    // 页脚（深色版）
    const footer = document.createElement('div');
    footer.className = 'border-t border-cream/5 py-6 text-center';
    footer.style.background = '#3d1f17';
    footer.innerHTML = `
        <p class="text-xs text-cream/20 mb-2">ViralLoop · AI驱动的增长闭环引擎</p>
        <p>由 <a href="https://with.woa.com/" style="color: #8A2BE2;" target="_blank">With</a> 通过自然语言生成</p>
    `;
    wrapper.appendChild(footer);

    // ========== 渲染动态内容 ==========
    renderKPICards(wrapper);
    renderContentTypeBars(wrapper);
    renderRankingTable(wrapper);
    renderStructureCards(wrapper);
    renderAIInsights(wrapper);

    requestAnimationFrame(() => {
        drawCharts(wrapper);
    });

    bindEvents(wrapper);
}

// ========== KPI卡片 ==========
function renderKPICards(wrapper) {
    const kpiSection = wrapper.querySelector('#kpi-section');
    const kpis = [
        {
            label: '当前粉丝数',
            value: '1,024',
            sub: `+${analyticsKPI.todayNew} 今日新增`,
            subColor: 'text-green-400',
            icon: 'ri-user-heart-line',
            iconBg: 'from-dior-gold/20 to-dior-gold/5',
            trend: analyticsKPI.todayNewRate,
        },
        {
            label: '转粉率',
            value: analyticsKPI.conversionRate,
            sub: `较昨日 ${analyticsKPI.conversionRateTrend}`,
            subColor: 'text-green-400',
            icon: 'ri-exchange-funds-line',
            iconBg: 'from-green-500/20 to-green-500/5',
            trend: analyticsKPI.conversionRateTrend,
        },
        {
            label: '爆款率',
            value: analyticsKPI.viralRate,
            sub: `较行业均值 ${analyticsKPI.viralRateTrend}`,
            subColor: 'text-orange-400',
            icon: 'ri-fire-line',
            iconBg: 'from-orange-500/20 to-orange-500/5',
            trend: analyticsKPI.viralRateTrend,
        },
        {
            label: '平均互动率',
            value: analyticsKPI.avgEngagement,
            sub: `较行业均值 ${analyticsKPI.engagementTrend}`,
            subColor: 'text-blue-400',
            icon: 'ri-heart-pulse-line',
            iconBg: 'from-blue-500/20 to-blue-500/5',
            trend: analyticsKPI.engagementTrend,
        },
    ];

    kpis.forEach((kpi, i) => {
        const card = document.createElement('div');
        card.className = `dark-kpi-card fade-in fade-in-delay-${i + 1}`;
        card.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="w-9 h-9 rounded-lg bg-gradient-to-br ${kpi.iconBg} flex items-center justify-center">
                    <i class="${kpi.icon} text-dior-gold text-base"></i>
                </div>
                <div class="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full">
                    <i class="ri-arrow-up-s-fill text-green-400 text-xs"></i>
                    <span class="text-xs text-green-400 font-medium">${kpi.trend}</span>
                </div>
            </div>
            <div class="text-2xl font-black text-cream/95 counter-value mb-1">${kpi.value}</div>
            <div class="text-xs text-cream/35 font-medium mb-1.5">${kpi.label}</div>
            <div class="text-xs ${kpi.subColor} font-medium flex items-center gap-1">
                <i class="ri-arrow-up-s-fill text-xs"></i>${kpi.sub}
            </div>
        `;
        kpiSection.appendChild(card);
    });
}

function renderContentTypeBars(wrapper) {
    const container = wrapper.querySelector('#content-type-bars');
    contentTypeAnalysis.forEach(item => {
        const maxViews = Math.max(...contentTypeAnalysis.map(c => c.avgViews));
        const barWidth = (item.avgViews / maxViews) * 100;
        const el = document.createElement('div');
        el.innerHTML = `
            <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs text-cream/60 font-medium">${item.type}</span>
                <span class="text-xs text-cream/40">${item.count}条 · 爆款率 ${item.viralRate}</span>
            </div>
            <div class="dark-progress">
                <div class="dark-progress-fill" style="width: ${barWidth}%; background: linear-gradient(90deg, ${item.color}, ${item.color}80);"></div>
            </div>
            <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-cream/25">均播 ${item.avgViews.toLocaleString()}</span>
                <span class="text-xs text-cream/25">均赞 ${item.avgLikes.toLocaleString()}</span>
            </div>
        `;
        container.appendChild(el);
    });
}

function renderRankingTable(wrapper) {
    const tbody = wrapper.querySelector('#dark-ranking-table');
    const sorted = [...growthPlan].sort((a, b) => b.views - a.views);
    sorted.forEach((day, i) => {
        const engRate = ((day.likes + day.comments + day.shares) / day.views * 100).toFixed(1);
        const dailyGrowth = day.followers - (day.day > 1 ? growthPlan[day.day - 2].followers : 0);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                ${i < 3
                    ? `<span class="w-6 h-6 rounded-md bg-gradient-to-br from-dior-gold to-yellow-600 text-white inline-flex items-center justify-center text-xs font-bold">${i + 1}</span>`
                    : `<span class="text-cream/25 text-xs">${i + 1}</span>`
                }
            </td>
            <td>
                <div class="flex items-center gap-2 max-w-xs">
                    <span class="text-cream/80 font-medium truncate">${day.contentTitle.slice(0, 35)}${day.contentTitle.length > 35 ? '...' : ''}</span>
                </div>
            </td>
            <td><span class="text-xs text-cream/40 bg-cream/5 px-2 py-0.5 rounded">${day.contentType}</span></td>
            <td style="text-align:right"><span class="font-semibold text-cream/80">${day.views.toLocaleString()}</span></td>
            <td style="text-align:right"><span class="text-cream/60">${day.likes.toLocaleString()}</span></td>
            <td style="text-align:right"><span class="${dailyGrowth > 100 ? 'text-green-400 font-semibold' : 'text-cream/60'}">+${dailyGrowth}</span></td>
            <td style="text-align:right"><span class="${parseFloat(engRate) > 5 ? 'text-green-400' : 'text-cream/50'} font-medium">${engRate}%</span></td>
            <td style="text-align:center">${day.tag === 'hot' ? '<span class="dark-tag-hot">🔥 爆款</span>' : '<span class="dark-tag-normal">稳定</span>'}</td>
        `;
        tr.addEventListener('click', () => router.navigate(`/content?day=${day.day}`));
        tbody.appendChild(tr);
    });
}

function renderStructureCards(wrapper) {
    const container = wrapper.querySelector('#structure-cards');
    const sortedStructures = [...contentStructureAnalysis].sort((a, b) => b.score - a.score);
    sortedStructures.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'bg-gradient-to-br from-cream/[0.04] to-transparent border border-cream/[0.06] rounded-xl p-4 hover:border-dior-gold/20 transition-all';
        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold ${i === 0 ? 'text-dior-gold' : 'text-cream/50'}">#${i + 1}</span>
                <div class="flex items-center gap-1 ${item.score >= 90 ? 'bg-green-500/10 text-green-400' : 'bg-cream/5 text-cream/40'} px-2 py-0.5 rounded-full">
                    <span class="text-xs font-bold">${item.score}</span>
                    <span class="text-xs">分</span>
                </div>
            </div>
            <h4 class="text-sm font-semibold text-cream/80 mb-2">「${item.structure}」</h4>
            <div class="space-y-1.5 text-xs">
                <div class="flex justify-between">
                    <span class="text-cream/30">使用次数</span>
                    <span class="text-cream/60">${item.usage}次</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-cream/30">均播放量</span>
                    <span class="text-cream/60">${item.avgViews.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-cream/30">互动率</span>
                    <span class="${parseFloat(item.avgEngagement) > 6 ? 'text-green-400' : 'text-cream/60'}">${item.avgEngagement}</span>
                </div>
            </div>
            <div class="mt-3 pt-3 border-t border-cream/5">
                <p class="text-xs text-cream/25 italic truncate">${item.example}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderAIInsights(wrapper) {
    const grid = wrapper.querySelector('#ai-insights-grid');
    aiInsights.forEach((insight, i) => {
        const card = document.createElement('div');
        card.className = 'bg-cream/[0.03] border border-cream/[0.06] rounded-lg p-3 hover:border-dior-gold/15 transition-all';
        card.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i class="${insight.icon} text-dior-gold text-sm"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-sm font-semibold text-cream/85 truncate">${insight.title}</h4>
                        <span class="text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${insight.impact === '高' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'} font-medium">${insight.impact}影响</span>
                    </div>
                    <p class="text-xs text-cream/35 leading-relaxed mb-2">${insight.detail}</p>
                    <div class="flex items-center gap-1.5 text-xs">
                        <i class="ri-lightbulb-flash-line text-dior-gold"></i>
                        <span class="text-cream/50">${insight.recommendation}</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function drawCharts(wrapper) {
    const followerCanvas = wrapper.querySelector('#dark-follower-chart');
    if (followerCanvas) {
        drawDarkLineChart(followerCanvas, null, {
            labels: followerGrowthData.labels,
            values: followerGrowthData.values,
            color: '#A99563',
            fillColor: 'rgba(169, 149, 99, 0.2)',
            showValues: true,
        });
    }

    const dualCanvas = wrapper.querySelector('#dark-dual-chart');
    if (dualCanvas) {
        drawDarkDualAxisChart(dualCanvas, {
            labels: viewsVsConversion.labels,
            barValues: viewsVsConversion.views,
            lineValues: viewsVsConversion.conversionRate,
            barColor: '#A99563',
            lineColor: '#4ade80',
            barLabel: '播放量',
            lineLabel: '转粉率(%)',
        });
    }

    const activeCanvas = wrapper.querySelector('#dark-active-chart');
    if (activeCanvas) {
        drawDarkHorizontalBar(activeCanvas, {
            labels: userActiveHours.labels,
            values: userActiveHours.activity,
            color: '#A99563',
            highlightIndices: [7, 8],
        });
    }
}

function bindEvents(wrapper) {
    const backBtns = wrapper.querySelectorAll('#back-plan-btn, #back-plan-btn-2');
    backBtns.forEach(btn => btn.addEventListener('click', () => router.navigate('/plan')));

    const reviewBtns = wrapper.querySelectorAll('#go-review-btn, #go-review-btn-2');
    reviewBtns.forEach(btn => btn.addEventListener('click', () => router.navigate('/review')));

    // 设置按钮（模拟弹窗）
    const settingsBtn = wrapper.querySelector('#dcb-settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showSettingsModal(wrapper);
        });
    }
}

// ========== 自动刷新 ==========
// (已移除 - 不再需要自动刷新显示)

// ========== 设置弹窗 ==========
function showSettingsModal(wrapper) {
    const existing = wrapper.querySelector('.settings-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'settings-modal-overlay';
    overlay.innerHTML = `
        <div class="settings-modal">
            <div class="settings-modal-header">
                <div class="flex items-center gap-2">
                    <i class="ri-settings-3-line text-dior-gold"></i>
                    <span class="text-base font-bold text-cream/90">数据源配置</span>
                </div>
                <button class="settings-close-btn" id="settings-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="settings-modal-body">
                <div class="settings-section">
                    <h4 class="text-sm font-semibold text-cream/70 mb-3">平台连接管理</h4>
                    ${Object.keys(PLATFORMS).map(pid => {
                        const p = PLATFORMS[pid];
                        const info = getConnectionStatusInfo(pid);
                        const connected = syncService.isConnected(pid);
                        return `
                            <div class="settings-platform-row">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-cream/5 flex items-center justify-center">
                                        <i class="${p.icon} text-lg" style="color:${p.color === '#000000' ? 'rgba(252,245,226,0.6)' : p.color}"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm font-semibold text-cream/80">${p.name}</div>
                                        <div class="text-xs text-cream/30">${p.apiType} · 刷新间隔 ${p.refreshInterval / 60000}min</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="flex items-center gap-1.5 text-xs ${info.color}">
                                        ${info.icon} ${info.label}
                                    </span>
                                    <button class="settings-action-btn ${connected ? 'disconnect' : 'connect'}" data-platform="${pid}">
                                        ${connected ? '断开' : '授权连接'}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="settings-section">
                    <h4 class="text-sm font-semibold text-cream/70 mb-3">数据同步设置</h4>
                    <div class="settings-option-row">
                        <span class="text-xs text-cream/50">自动同步间隔</span>
                        <span class="text-xs text-cream/70 font-medium">每 5 分钟</span>
                    </div>
                    <div class="settings-option-row">
                        <span class="text-xs text-cream/50">前端刷新频率</span>
                        <span class="text-xs text-cream/70 font-medium">每 30 秒</span>
                    </div>
                    <div class="settings-option-row">
                        <span class="text-xs text-cream/50">数据缓存策略</span>
                        <span class="text-xs text-cream/70 font-medium">增量更新 + 本地缓存</span>
                    </div>
                    <div class="settings-option-row">
                        <span class="text-xs text-cream/50">Webhook支持</span>
                        <span class="text-xs text-cream/70 font-medium">抖音（已启用）</span>
                    </div>
                </div>
                <div class="settings-section">
                    <h4 class="text-sm font-semibold text-cream/70 mb-3">同步历史</h4>
                    <div class="settings-sync-history">
                        ${syncService.syncHistory.length > 0
                            ? syncService.syncHistory.slice(0, 5).map(h => `
                                <div class="settings-history-item">
                                    <span class="text-xs text-cream/40">${new Date(h.timestamp).toLocaleTimeString()}</span>
                                    <span class="text-xs text-cream/60">${PLATFORMS[h.platform]?.name || h.platform}</span>
                                    <span class="text-xs text-cream/40">${h.action}</span>
                                </div>
                            `).join('')
                            : '<div class="text-xs text-cream/25 text-center py-4">暂无同步记录</div>'
                        }
                    </div>
                </div>
            </div>
        </div>
    `;

    wrapper.appendChild(overlay);

    // 关闭
    overlay.querySelector('#settings-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    // 连接/断开按钮
    overlay.querySelectorAll('.settings-action-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pid = btn.dataset.platform;
            if (syncService.isConnected(pid)) {
                syncService.disconnectPlatform(pid);
            } else {
                btn.textContent = '连接中...';
                btn.disabled = true;
                await syncService.initiateOAuth(pid);
            }
            overlay.remove();
            showSettingsModal(wrapper);
        });
    });
}