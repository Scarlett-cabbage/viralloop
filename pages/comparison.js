// 调优对比页 - 高冲击力AI优化前后对比
import { router } from '../router.js';
import { comparisonData } from '../data.js';
import { renderNavbar, renderDashboard, renderFooter, renderAIExplain, drawLineChart } from '../components.js';

export function renderComparison(container) {
    renderNavbar(container, 'comparison');
    renderDashboard(container);

    const page = document.createElement('div');
    page.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6';

    const { before, after, improvements, contentComparison, followerGrowthComparison, aiOptimizationFlow } = comparisonData;

    page.innerHTML = `
        <!-- 页面标题 -->
        <div class="mb-8 fade-in">
            <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-4">
                <i class="ri-contrast-2-line text-dior-gold text-sm"></i>
                <span class="text-dior-gold text-xs font-medium">AI调优引擎 · 数据驱动增长</span>
            </div>
            <h1 class="text-2xl font-bold text-lv-brown mb-1">AI调优对比</h1>
            <p class="text-lv-brown/50 text-sm">AI识别问题 → 自动优化 → 带来增长拐点</p>
        </div>

        <!-- ====== AI优化流程横幅 ====== -->
        <div class="comp-flow-banner mb-8 fade-in fade-in-delay-1">
            <div class="comp-flow-bg"></div>
            <div class="relative z-10">
                <div class="flex items-center justify-center gap-2 mb-6">
                    <i class="ri-robot-2-line text-dior-gold text-lg"></i>
                    <span class="text-cream font-bold text-sm">AI优化路径</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center">
                    ${aiOptimizationFlow.map((step, i) => `
                        <div class="flex items-center ${i < 2 ? 'md:pr-4' : ''}">
                            <div class="comp-flow-step flex-1">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background: ${step.color}20; border: 1px solid ${step.color}30;">
                                        <i class="${step.icon}" style="color: ${step.color}; font-size: 18px;"></i>
                                    </div>
                                    <div>
                                        <div class="text-xs text-cream/40">Step ${step.step}</div>
                                        <div class="text-sm font-bold text-cream">${step.title}</div>
                                    </div>
                                </div>
                                <p class="text-xs text-cream/50 leading-relaxed">${step.desc}</p>
                            </div>
                            ${i < 2 ? `
                                <div class="hidden md:flex items-center justify-center w-12 flex-shrink-0">
                                    <div class="comp-flow-arrow">
                                        <i class="ri-arrow-right-line text-dior-gold text-lg"></i>
                                    </div>
                                </div>
                                <div class="md:hidden flex items-center justify-center py-2">
                                    <i class="ri-arrow-down-line text-dior-gold text-lg"></i>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- ====== 核心指标提升概览 ====== -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            ${improvements.map((imp, i) => `
                <div class="comp-metric-card fade-in fade-in-delay-${Math.min(i + 1, 5)}">
                    <div class="comp-metric-icon">
                        <i class="${imp.icon} text-dior-gold"></i>
                    </div>
                    <div class="text-xs text-lv-brown/45 mb-2 font-medium">${imp.metric}</div>
                    <div class="comp-metric-change">${imp.change}</div>
                    <div class="flex items-center justify-between mt-3 pt-3 border-t border-dior-gold/8">
                        <div class="text-center flex-1">
                            <div class="text-xs text-lv-brown/30">优化前</div>
                            <div class="text-sm font-bold text-lv-brown/40 mt-0.5">${imp.before}</div>
                        </div>
                        <div class="flex-shrink-0 mx-2">
                            <i class="ri-arrow-right-double-line text-green-500 text-sm"></i>
                        </div>
                        <div class="text-center flex-1">
                            <div class="text-xs text-green-600/70">优化后</div>
                            <div class="text-sm font-bold text-green-600 mt-0.5">${imp.after}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- ====== 左右对比：核心数据面板 ====== -->
        <div class="comp-versus-section mb-8 fade-in fade-in-delay-2">
            <div class="flex items-center justify-center gap-3 mb-6">
                <span class="text-sm font-semibold text-lv-brown/40">优化前</span>
                <div class="comp-vs-badge">VS</div>
                <span class="text-sm font-semibold text-green-600">优化后</span>
            </div>
            <div class="grid lg:grid-cols-2 gap-6 relative">
                <!-- 中间VS分割线 -->
                <div class="comp-vs-divider hidden lg:block"></div>

                <!-- 优化前 -->
                <div class="comp-before-panel">
                    <div class="comp-panel-badge before">
                        <i class="ri-history-line mr-1"></i>优化前
                    </div>
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-12 h-12 rounded-xl bg-lv-brown/5 flex items-center justify-center">
                            <i class="ri-history-line text-lv-brown/30 text-2xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lv-brown/60">${before.label}</h3>
                            <p class="text-xs text-lv-brown/30 mt-0.5">${before.strategy}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        ${renderBeforeMetric('浏览量', before.metrics.avgViews.toLocaleString(), 'ri-eye-line')}
                        ${renderBeforeMetric('点赞数', before.metrics.avgLikes.toLocaleString(), 'ri-heart-line')}
                        ${renderBeforeMetric('评论数', before.metrics.avgComments, 'ri-chat-3-line')}
                        ${renderBeforeMetric('分享数', before.metrics.avgShares, 'ri-share-forward-line')}
                        ${renderBeforeMetric('互动率', before.metrics.engagementRate, 'ri-heart-pulse-line')}
                        ${renderBeforeMetric('日均涨粉', before.metrics.followerGrowth, 'ri-user-add-line')}
                        ${renderBeforeMetric('转粉率', before.metrics.conversionRate, 'ri-exchange-line')}
                        ${renderBeforeMetric('爆款率', '0%', 'ri-fire-line')}
                    </div>
                    <!-- 日均涨粉柱状图 -->
                    <div class="mt-5 pt-4 border-t border-lv-brown/5">
                        <div class="text-xs text-lv-brown/30 mb-3 font-medium">日均涨粉趋势</div>
                        <div class="flex items-end gap-3 h-16">
                            ${followerGrowthComparison.beforeValues.map((v, i) => `
                                <div class="flex flex-col items-center gap-1 flex-1">
                                    <span class="text-xs text-lv-brown/30 font-medium">+${v}</span>
                                    <div class="w-full rounded-t bg-lv-brown/10" style="height: ${Math.max(v / 4, 4)}px;"></div>
                                    <span class="text-xs text-lv-brown/25">${followerGrowthComparison.beforeDays[i]}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- 优化后 -->
                <div class="comp-after-panel">
                    <div class="comp-panel-badge after">
                        <i class="ri-rocket-2-line mr-1"></i>优化后 ✨
                    </div>
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-dior-gold/15 to-green-500/10 flex items-center justify-center">
                            <i class="ri-rocket-2-line text-dior-gold text-2xl"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lv-brown">${after.label}</h3>
                            <p class="text-xs text-dior-gold mt-0.5">${after.strategy}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        ${renderAfterMetric('浏览量', after.metrics.avgViews.toLocaleString(), 'ri-eye-line', '+1977%')}
                        ${renderAfterMetric('点赞数', after.metrics.avgLikes.toLocaleString(), 'ri-heart-line', '+1319%')}
                        ${renderAfterMetric('评论数', after.metrics.avgComments, 'ri-chat-3-line', '+1140%')}
                        ${renderAfterMetric('分享数', after.metrics.avgShares, 'ri-share-forward-line', '+1790%')}
                        ${renderAfterMetric('互动率', after.metrics.engagementRate, 'ri-heart-pulse-line', '+250%')}
                        ${renderAfterMetric('日均涨粉', after.metrics.followerGrowth, 'ri-user-add-line', '+1321%')}
                        ${renderAfterMetric('转粉率', after.metrics.conversionRate, 'ri-exchange-line', '+192%')}
                        ${renderAfterMetric('爆款率', '66.7%', 'ri-fire-line', '从0到66.7%')}
                    </div>
                    <!-- 日均涨粉柱状图 -->
                    <div class="mt-5 pt-4 border-t border-green-500/10">
                        <div class="text-xs text-green-600/70 mb-3 font-medium">日均涨粉趋势</div>
                        <div class="flex items-end gap-3 h-16">
                            ${followerGrowthComparison.afterValues.map((v, i) => `
                                <div class="flex flex-col items-center gap-1 flex-1">
                                    <span class="text-xs text-green-600 font-bold">+${v}</span>
                                    <div class="w-full rounded-t comp-bar-after" style="height: ${Math.max(v / 5, 8)}px;"></div>
                                    <span class="text-xs text-lv-brown/40">${followerGrowthComparison.afterDays[i]}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ====== 内容维度逐项对比 ====== -->
        <div class="bg-white rounded-2xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-3">
            <div class="flex items-center gap-2 mb-6">
                <i class="ri-file-list-3-line text-dior-gold text-lg"></i>
                <h3 class="font-bold text-lv-brown">内容维度逐项对比</h3>
            </div>
            <div class="space-y-5" id="content-comparison-list">
                ${contentComparison.map((item, i) => `
                    <div class="comp-dimension-card">
                        <div class="flex items-center gap-2 mb-4">
                            <span class="comp-dimension-badge">${item.dimension}</span>
                            <span class="text-xs text-green-600 font-semibold ml-auto flex items-center gap-1">
                                <i class="ri-arrow-up-circle-fill"></i>${item.improvement}
                            </span>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4 items-stretch relative">
                            <!-- 优化前 -->
                            <div class="comp-dim-before">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xs font-bold text-red-400/70">✗ 优化前</span>
                                </div>
                                <p class="text-sm text-lv-brown/40 line-through leading-relaxed">${item.before.text}</p>
                                <div class="mt-3">
                                    <div class="flex items-center justify-between text-xs mb-1">
                                        <span class="text-lv-brown/30">效果评分</span>
                                        <span class="text-lv-brown/40 font-bold">${item.before.score}</span>
                                    </div>
                                    <div class="h-1.5 bg-lv-brown/5 rounded-full overflow-hidden">
                                        <div class="h-full bg-lv-brown/15 rounded-full" style="width: ${item.before.score}%"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- 箭头 -->
                            <div class="comp-dim-arrow-wrapper">
                                <div class="comp-dim-arrow">
                                    <i class="ri-arrow-right-line text-white text-sm"></i>
                                </div>
                            </div>
                            <!-- 优化后 -->
                            <div class="comp-dim-after">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-xs font-bold text-green-600">✓ 优化后</span>
                                </div>
                                <p class="text-sm text-lv-brown font-medium leading-relaxed">${item.after.text}</p>
                                <div class="mt-3">
                                    <div class="flex items-center justify-between text-xs mb-1">
                                        <span class="text-green-600/50">效果评分</span>
                                        <span class="text-green-600 font-bold">${item.after.score}</span>
                                    </div>
                                    <div class="h-1.5 bg-green-500/10 rounded-full overflow-hidden">
                                        <div class="h-full rounded-full comp-score-bar-after" style="width: ${item.after.score}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- ====== 增长曲线对比图 ====== -->
        <div class="bg-white rounded-2xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <i class="ri-line-chart-line text-dior-gold text-lg"></i>
                    <h3 class="font-bold text-lv-brown">粉丝增长曲线 · 优化拐点</h3>
                </div>
                <div class="flex items-center gap-4 text-xs">
                    <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-lv-brown/20 rounded"></span><span class="text-lv-brown/40">优化前</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-dior-gold rounded"></span><span class="text-lv-brown/40">优化后</span></span>
                </div>
            </div>
            <canvas id="comparison-growth-chart" style="width:100%;height:280px;"></canvas>
            <div class="flex items-center justify-center mt-4 gap-2">
                <div class="comp-inflection-badge">
                    <i class="ri-flashlight-line text-dior-gold mr-1"></i>
                    <span class="text-xs font-bold text-lv-brown">Day 3 · AI优化介入</span>
                    <span class="text-xs text-green-600 ml-2">→ 增长斜率提升 14.2倍</span>
                </div>
            </div>
        </div>

        <!-- ====== AI优化策略详解 ====== -->
        <div class="bg-white rounded-2xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-5">
            <div class="flex items-center gap-2 mb-6">
                <i class="ri-settings-4-line text-dior-gold text-lg"></i>
                <h3 class="font-bold text-lv-brown">AI优化策略详解</h3>
                <span class="text-xs text-lv-brown/30 ml-auto">共6项核心优化</span>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                ${[
                    { icon: 'ri-video-line', title: '内容格式升级', before: '纯图文内容', after: '视频为主(60%)+图文(40%)', impact: '互动率提升2.3倍', impactValue: 95 },
                    { icon: 'ri-text', title: '标题公式优化', before: '随意拟标题', after: '"数字+悬念+痛点"公式', impact: 'CTR提升47%', impactValue: 88 },
                    { icon: 'ri-time-line', title: '发布时间优化', before: '随机时间发布', after: '固定黄金时段(20:00-22:00)', impact: '初始曝光提升35%', impactValue: 78 },
                    { icon: 'ri-fire-line', title: '热点追踪', before: '无热点意识', after: '实时追踪平台趋势话题', impact: '爆款概率提升3倍', impactValue: 92 },
                    { icon: 'ri-chat-smile-2-line', title: '互动策略', before: '被动等评论', after: '主动引导+快速回复', impact: '评论率提升180%', impactValue: 82 },
                    { icon: 'ri-hashtag', title: '标签优化', before: '随意选标签', after: 'AI精选高热度标签组合', impact: '搜索曝光提升60%', impactValue: 70 },
                ].map(s => `
                    <div class="comp-strategy-card">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="w-8 h-8 rounded-lg bg-dior-gold/8 flex items-center justify-center">
                                <i class="${s.icon} text-dior-gold text-sm"></i>
                            </div>
                            <span class="font-semibold text-lv-brown text-sm">${s.title}</span>
                        </div>
                        <div class="space-y-2 text-xs mb-3">
                            <div class="flex items-start gap-2">
                                <span class="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                                <span class="text-lv-brown/35 line-through">${s.before}</span>
                            </div>
                            <div class="flex items-start gap-2">
                                <span class="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                                <span class="text-lv-brown/70 font-medium">${s.after}</span>
                            </div>
                        </div>
                        <div class="pt-2 border-t border-dior-gold/8">
                            <div class="flex items-center justify-between mb-1.5">
                                <span class="text-xs text-green-600 font-semibold">${s.impact}</span>
                                <span class="text-xs text-lv-brown/30">${s.impactValue}%</span>
                            </div>
                            <div class="h-1.5 bg-dior-gold/8 rounded-full overflow-hidden">
                                <div class="h-full rounded-full comp-impact-bar" style="width: ${s.impactValue}%"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- ====== AI总结 ====== -->
        ${renderAIExplain('调优对比显示，AI优化策略在所有关键指标上都实现了显著提升。最大的改进来自<strong>内容格式升级（视频化）</strong>和<strong>热点追踪能力</strong>，这两项优化共同贡献了约70%的增长提升。转粉率从1.3%提升至3.8%，日均涨粉从19人跃升至270人。关键拐点出现在Day5，单日涨粉368人，验证了"AI识别问题→自动优化→增长拐点"的闭环模型。建议在下一阶段继续深化视频内容策略，同时探索直播带来的增长机会。')}

        <!-- 底部导航 -->
        <div class="flex items-center justify-between mt-8">
            <button class="btn-secondary text-sm" id="back-review-btn"><i class="ri-arrow-left-line"></i>智能复盘</button>
            <button class="btn-primary text-sm" id="go-results-btn">查看增长结果<i class="ri-arrow-right-line"></i></button>
        </div>
    `;

    container.appendChild(page);
    renderFooter(container);

    // 绘制增长曲线对比图
    requestAnimationFrame(() => {
        const chartCanvas = page.querySelector('#comparison-growth-chart');
        if (chartCanvas) {
            drawComparisonChart(chartCanvas);
        }
    });

    // 启动数字动画
    animateCounters(page);

    // 绑定事件
    page.querySelector('#back-review-btn').addEventListener('click', () => router.navigate('/review'));
    page.querySelector('#go-results-btn').addEventListener('click', () => router.navigate('/results'));
}

// 优化前指标卡片
function renderBeforeMetric(label, value, icon) {
    return `
        <div class="comp-metric-before">
            <div class="flex items-center gap-1.5 mb-1">
                <i class="${icon} text-lv-brown/20 text-xs"></i>
                <span class="text-xs text-lv-brown/30">${label}</span>
            </div>
            <div class="text-base font-bold text-lv-brown/40">${value}</div>
        </div>
    `;
}

// 优化后指标卡片
function renderAfterMetric(label, value, icon, change) {
    return `
        <div class="comp-metric-after">
            <div class="flex items-center gap-1.5 mb-1">
                <i class="${icon} text-green-600/60 text-xs"></i>
                <span class="text-xs text-lv-brown/50">${label}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-base font-bold text-green-600">${value}</span>
                <span class="text-xs text-green-500 font-semibold bg-green-50 px-1.5 py-0.5 rounded">${change}</span>
            </div>
        </div>
    `;
}

// 增长曲线对比图
function drawComparisonChart(canvas) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const padding = { top: 30, right: 30, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const labels = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const actualValues = [0, 12, 38, 127, 215, 583, 812, 1024];
    // 模拟无AI优化的线性增长
    const noOptValues = [0, 12, 38, 55, 72, 90, 108, 126];

    const maxVal = 1200;

    // 网格线
    ctx.strokeStyle = 'rgba(89, 47, 35, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        const val = Math.round(maxVal - (maxVal / 5) * i);
        ctx.fillStyle = 'rgba(89, 47, 35, 0.35)';
        ctx.font = '11px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(val.toLocaleString(), padding.left - 8, y + 4);
    }

    // X轴标签
    ctx.fillStyle = 'rgba(89, 47, 35, 0.4)';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
        const x = padding.left + (chartW / (labels.length - 1)) * i;
        ctx.fillText(label, x, height - 10);
    });

    // 计算点坐标
    const getPoints = (values) => values.map((v, i) => ({
        x: padding.left + (chartW / (values.length - 1)) * i,
        y: padding.top + chartH - (v / maxVal) * chartH,
    }));

    const actualPoints = getPoints(actualValues);
    const noOptPoints = getPoints(noOptValues);

    // 绘制AI优化区域标记
    const day3X = padding.left + (chartW / 7) * 3;
    ctx.fillStyle = 'rgba(169, 149, 99, 0.04)';
    ctx.fillRect(day3X, padding.top, width - padding.right - day3X, chartH);

    // 绘制AI介入标记线
    ctx.strokeStyle = 'rgba(169, 149, 99, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(day3X, padding.top);
    ctx.lineTo(day3X, padding.top + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    // AI介入标签
    ctx.fillStyle = '#A99563';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ AI优化介入', day3X, padding.top - 8);

    // 无优化线（灰色虚线）
    ctx.strokeStyle = 'rgba(89, 47, 35, 0.15)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(noOptPoints[0].x, noOptPoints[0].y);
    for (let i = 1; i < noOptPoints.length; i++) {
        ctx.lineTo(noOptPoints[i].x, noOptPoints[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 实际增长线（面积填充）
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(169, 149, 99, 0.2)');
    gradient.addColorStop(1, 'rgba(169, 149, 99, 0.02)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(actualPoints[0].x, height - padding.bottom);
    actualPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(actualPoints[actualPoints.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fill();

    // 实际增长线
    ctx.strokeStyle = '#A99563';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(actualPoints[0].x, actualPoints[0].y);
    for (let i = 1; i < actualPoints.length; i++) {
        const xc = (actualPoints[i - 1].x + actualPoints[i].x) / 2;
        const yc = (actualPoints[i - 1].y + actualPoints[i].y) / 2;
        ctx.quadraticCurveTo(actualPoints[i - 1].x, actualPoints[i - 1].y, xc, yc);
    }
    ctx.lineTo(actualPoints[actualPoints.length - 1].x, actualPoints[actualPoints.length - 1].y);
    ctx.stroke();

    // 数据点
    actualPoints.forEach((p, i) => {
        const isKey = i === 5; // Day5 爆发点
        const radius = isKey ? 7 : 4.5;

        if (isKey) {
            // 爆发点光晕
            ctx.fillStyle = 'rgba(169, 149, 99, 0.15)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = 'white';
        ctx.strokeStyle = isKey ? '#ff6b35' : '#A99563';
        ctx.lineWidth = isKey ? 3 : 2.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 数值标签
        ctx.fillStyle = i >= 3 ? 'rgba(89, 47, 35, 0.8)' : 'rgba(89, 47, 35, 0.4)';
        ctx.font = i >= 3 ? 'bold 11px Inter' : '11px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(actualValues[i].toLocaleString(), p.x, p.y - (isKey ? 16 : 12));
    });

    // 差异标注（Day7处）
    const lastActual = actualPoints[actualPoints.length - 1];
    const lastNoOpt = noOptPoints[noOptPoints.length - 1];

    // 差异连线
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(lastActual.x + 10, lastActual.y);
    ctx.lineTo(lastActual.x + 10, lastNoOpt.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // 差异标签
    const midY = (lastActual.y + lastNoOpt.y) / 2;
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('+898', lastActual.x + 16, midY + 4);

    // 图例
    ctx.fillStyle = 'rgba(89, 47, 35, 0.15)';
    ctx.fillRect(width - padding.right - 140, padding.top - 5, 12, 2);
    ctx.fillStyle = 'rgba(89, 47, 35, 0.4)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('无AI优化（预估）', width - padding.right - 124, padding.top);

    ctx.fillStyle = '#A99563';
    ctx.fillRect(width - padding.right - 140, padding.top + 12, 12, 3);
    ctx.fillStyle = 'rgba(89, 47, 35, 0.6)';
    ctx.fillText('AI优化后（实际）', width - padding.right - 124, padding.top + 18);
}

// 数字动画
function animateCounters(page) {
    const counters = page.querySelectorAll('.comp-metric-change');
    counters.forEach(el => {
        const text = el.textContent;
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300);
    });
}
