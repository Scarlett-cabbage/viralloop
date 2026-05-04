// 增长结果页 - 游戏通关式震撼展示
import { router } from '../router.js';
import { followerGrowthData, growthPlan, milestones, personaData, topContents, costAnalysis, growthKeyNodes, achievementBadges, growthSummary } from '../data.js';
import { renderNavbar, renderBreadcrumb, renderFooter, renderAIExplain } from '../components.js';
import { drawLineChart } from '../charts.js';

export function renderResults(container) {
    renderNavbar(container, 'results');
    renderBreadcrumb(container, 'results');

    const page = document.createElement('div');
    page.className = 'results-page';

    page.innerHTML = `
        <!-- ====== 第一屏：通关庆祝大横幅 ====== -->
        <section class="result-hero-section relative overflow-hidden">
            <div class="result-hero-bg"></div>
            <div class="result-particles" id="particles-container"></div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <!-- 通关徽章 -->
                <div class="text-center mb-8 fade-in">
                    <div class="result-trophy-ring mx-auto mb-6">
                        <div class="result-trophy-inner">
                            <span class="text-6xl sm:text-7xl result-trophy-bounce">🏆</span>
                        </div>
                    </div>
                    <div class="inline-flex items-center gap-2 bg-dior-gold/15 border border-dior-gold/25 rounded-full px-5 py-2 mb-5">
                        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span class="text-dior-gold text-sm font-bold tracking-wide">MISSION COMPLETE</span>
                    </div>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-cream leading-tight mb-4">
                        从 <span class="result-counter-hero" data-target="0">0</span> 到 <span class="text-dior-gold result-counter-hero" data-target="1024">0</span> 粉
                    </h1>
                    <p class="text-cream/50 text-lg sm:text-xl mb-2">7天增长闭环 · AI全程驱动 · 超额完成目标</p>
                    <p class="text-dior-gold/70 text-sm font-medium">目标达成率 <span class="text-dior-gold font-black text-lg">102.4%</span></p>
                </div>

                <!-- 核心数据大卡片 -->
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto fade-in fade-in-delay-1">
                    <div class="result-hero-stat">
                        <div class="result-hero-stat-icon"><i class="ri-user-heart-line"></i></div>
                        <div class="result-hero-stat-value result-counter" data-target="1024">0</div>
                        <div class="result-hero-stat-label">总粉丝</div>
                    </div>
                    <div class="result-hero-stat">
                        <div class="result-hero-stat-icon"><i class="ri-eye-line"></i></div>
                        <div class="result-hero-stat-value">10.8<span class="text-base">万</span></div>
                        <div class="result-hero-stat-label">总曝光</div>
                    </div>
                    <div class="result-hero-stat">
                        <div class="result-hero-stat-icon"><i class="ri-heart-pulse-line"></i></div>
                        <div class="result-hero-stat-value">6.3<span class="text-base">%</span></div>
                        <div class="result-hero-stat-label">互动率</div>
                    </div>
                    <div class="result-hero-stat">
                        <div class="result-hero-stat-icon"><i class="ri-fire-line"></i></div>
                        <div class="result-hero-stat-value">42.8<span class="text-base">%</span></div>
                        <div class="result-hero-stat-label">爆款率</div>
                    </div>
                    <div class="result-hero-stat col-span-2 lg:col-span-1">
                        <div class="result-hero-stat-icon"><i class="ri-robot-2-line"></i></div>
                        <div class="result-hero-stat-value result-counter" data-target="92">0</div>
                        <div class="result-hero-stat-label">AI评分</div>
                    </div>
                </div>
            </div>
            <!-- 波浪分割 -->
            <div class="result-wave-divider">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#FCF5E2"/>
                </svg>
            </div>
        </section>

        <!-- ====== 第二屏：增长曲线（重点大图表） ====== -->
        <section class="bg-cream py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 fade-in">
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-3">
                        <i class="ri-line-chart-line text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-bold">核心数据</span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-black text-lv-brown mb-2">粉丝增长曲线</h2>
                    <p class="text-lv-brown/45 text-sm">从0到1000+的J型增长轨迹，关键节点清晰可见</p>
                </div>

                <!-- 大图表卡片 -->
                <div class="result-chart-card fade-in fade-in-delay-1">
                    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div class="flex items-center gap-3">
                            <h3 class="font-bold text-lv-brown text-lg flex items-center gap-2">
                                <i class="ri-line-chart-line text-dior-gold"></i>7天增长全景
                            </h3>
                            <span class="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-bold">↑ 超额完成</span>
                        </div>
                        <div class="flex items-center gap-4 text-xs text-lv-brown/40">
                            <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-dior-gold rounded"></span>粉丝数</span>
                            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-red-400"></span>爆发点</span>
                            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-400"></span>优化点</span>
                        </div>
                    </div>
                    <div class="relative">
                        <canvas id="result-main-chart" style="width:100%;height:380px;"></canvas>
                    </div>
                    <!-- 关键节点标注 -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-dior-gold/8">
                        ${growthKeyNodes.filter(n => n.type !== 'normal').map(node => `
                            <div class="result-key-node ${node.type}">
                                <div class="result-key-node-dot ${node.type}"></div>
                                <div>
                                    <div class="text-xs font-bold text-lv-brown">${node.event}</div>
                                    <div class="text-xs text-lv-brown/40">${node.label} · ${node.followers}粉</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 每日增长柱状图 -->
                <div class="grid lg:grid-cols-7 gap-3 mt-8">
                    ${growthPlan.map((day, i) => {
                        const dailyGrowth = day.followers - (i > 0 ? growthPlan[i-1].followers : 0);
                        const maxGrowth = 368;
                        const barHeight = Math.max((dailyGrowth / maxGrowth) * 100, 8);
                        const isExplosion = day.day === 5;
                        const isHot = dailyGrowth > 150;
                        return `
                            <div class="result-daily-bar fade-in fade-in-delay-${Math.min(i+1, 5)} ${isExplosion ? 'explosion' : ''}">
                                <div class="result-daily-bar-top">
                                    <span class="text-xs font-black ${isHot ? 'text-green-600' : 'text-lv-brown'}">+${dailyGrowth}</span>
                                    ${isExplosion ? '<span class="text-xs">🔥</span>' : ''}
                                </div>
                                <div class="result-daily-bar-track">
                                    <div class="result-daily-bar-fill ${isExplosion ? 'explosion' : isHot ? 'hot' : ''}" style="height: ${barHeight}%"></div>
                                </div>
                                <div class="result-daily-bar-label">Day ${day.day}</div>
                                <div class="text-xs text-lv-brown/30 mt-0.5">${day.followers}粉</div>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${renderAIExplain('增长曲线呈现典型的"J型增长"模式：前期缓慢积累（Day1-2），Day3 AI介入优化后加速增长，Day5命中热点实现爆发（单日+368粉，占总增长36%）。这验证了"AI策略优化 × 内容质量 × 热点趋势"三重叠加的增长模型。')}
            </div>
        </section>

        <!-- ====== 第三屏：Top3 爆款内容展示 ====== -->
        <section class="result-top-section py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 fade-in">
                    <div class="inline-flex items-center gap-2 bg-dior-gold/15 border border-dior-gold/20 rounded-full px-4 py-1.5 mb-3">
                        <i class="ri-fire-line text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-bold">爆款内容</span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-black text-cream mb-2">Top 3 爆款内容</h2>
                    <p class="text-cream/45 text-sm">AI策略驱动下的高表现内容</p>
                </div>

                <div class="grid lg:grid-cols-3 gap-6" id="top-contents-grid"></div>
            </div>
        </section>

        <!-- ====== 第四屏：成本分析 ====== -->
        <section class="bg-cream py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 fade-in">
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-3">
                        <i class="ri-money-cny-circle-line text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-bold">成本分析</span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-black text-lv-brown mb-2">零成本增长奇迹</h2>
                    <p class="text-lv-brown/45 text-sm">AI驱动的纯内容增长，无需任何付费投放</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- 左侧：核心成本指标 -->
                    <div class="space-y-4 fade-in fade-in-delay-1">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="result-cost-card highlight">
                                <div class="result-cost-icon"><i class="ri-money-cny-circle-line text-2xl"></i></div>
                                <div class="text-3xl font-black text-lv-brown mt-2">${costAnalysis.costPerFollower}</div>
                                <div class="text-xs text-lv-brown/40 mt-1">单粉成本</div>
                                <div class="text-xs text-green-600 font-bold mt-1">${costAnalysis.costLabel}</div>
                            </div>
                            <div class="result-cost-card highlight">
                                <div class="result-cost-icon"><i class="ri-funds-line text-2xl"></i></div>
                                <div class="text-3xl font-black text-lv-brown mt-2">${costAnalysis.roi}</div>
                                <div class="text-xs text-lv-brown/40 mt-1">ROI</div>
                                <div class="text-xs text-green-600 font-bold mt-1">${costAnalysis.roiLabel}</div>
                            </div>
                            <div class="result-cost-card">
                                <div class="result-cost-icon"><i class="ri-time-line text-2xl"></i></div>
                                <div class="text-xl font-bold text-lv-brown mt-2">${costAnalysis.timeCost}</div>
                                <div class="text-xs text-lv-brown/40 mt-1">日均时间投入</div>
                            </div>
                            <div class="result-cost-card">
                                <div class="result-cost-icon"><i class="ri-robot-2-line text-2xl"></i></div>
                                <div class="text-xl font-bold text-lv-brown mt-2">${costAnalysis.aiSavedHours}<span class="text-sm">h</span></div>
                                <div class="text-xs text-lv-brown/40 mt-1">AI节省工时</div>
                            </div>
                        </div>
                        <!-- 成本明细 -->
                        <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                            <h4 class="font-bold text-lv-brown text-sm mb-3 flex items-center gap-2">
                                <i class="ri-file-list-3-line text-dior-gold"></i>成本明细
                            </h4>
                            <div class="space-y-2">
                                ${costAnalysis.breakdown.map(item => `
                                    <div class="flex items-center justify-between py-2 border-b border-dior-gold/5 last:border-0">
                                        <span class="text-sm text-lv-brown/60">${item.item}</span>
                                        <div class="flex items-center gap-3">
                                            <span class="text-sm font-bold text-lv-brown">${item.cost}</span>
                                            <span class="text-xs text-lv-brown/30">${item.note}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- 右侧：传统 vs AI 对比 -->
                    <div class="fade-in fade-in-delay-2">
                        <div class="result-cost-compare">
                            <div class="result-cost-compare-header">
                                <h4 class="font-bold text-cream text-sm flex items-center gap-2">
                                    <i class="ri-scales-3-line text-dior-gold"></i>传统方式 vs AI驱动
                                </h4>
                            </div>
                            <div class="p-6 space-y-6">
                                <!-- 传统方式 -->
                                <div class="result-compare-row before">
                                    <div class="flex items-center gap-3 mb-3">
                                        <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                            <i class="ri-close-circle-line text-red-400"></i>
                                        </div>
                                        <span class="font-bold text-lv-brown/50 text-sm">传统方式</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-3">
                                        <div class="text-center p-3 bg-red-50/50 rounded-lg">
                                            <div class="text-lg font-bold text-red-400">${costAnalysis.comparison.traditional.cost}</div>
                                            <div class="text-xs text-lv-brown/30 mt-1">投放费用</div>
                                        </div>
                                        <div class="text-center p-3 bg-red-50/50 rounded-lg">
                                            <div class="text-lg font-bold text-red-400">${costAnalysis.comparison.traditional.time}</div>
                                            <div class="text-xs text-lv-brown/30 mt-1">所需时间</div>
                                        </div>
                                        <div class="text-center p-3 bg-red-50/50 rounded-lg">
                                            <div class="text-lg font-bold text-red-400">${costAnalysis.comparison.traditional.followers}</div>
                                            <div class="text-xs text-lv-brown/30 mt-1">预期粉丝</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- VS分割 -->
                                <div class="flex items-center gap-4">
                                    <div class="flex-1 h-px bg-dior-gold/10"></div>
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center text-white font-black text-sm shadow-lg">VS</div>
                                    <div class="flex-1 h-px bg-dior-gold/10"></div>
                                </div>

                                <!-- AI驱动 -->
                                <div class="result-compare-row after">
                                    <div class="flex items-center gap-3 mb-3">
                                        <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                                            <i class="ri-check-double-line text-green-500"></i>
                                        </div>
                                        <span class="font-bold text-green-700 text-sm">AI驱动（ViralLoop）</span>
                                        <span class="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">推荐</span>
                                    </div>
                                    <div class="grid grid-cols-3 gap-3">
                                        <div class="text-center p-3 bg-green-50/50 rounded-lg border border-green-100">
                                            <div class="text-lg font-bold text-green-600">${costAnalysis.comparison.withAI.cost}</div>
                                            <div class="text-xs text-lv-brown/30 mt-1">投放费用</div>
                                        </div>
                                        <div class="text-center p-3 bg-green-50/50 rounded-lg border border-green-100">
                                            <div class="text-lg font-bold text-green-600">${costAnalysis.comparison.withAI.time}</div>
                                            <div class="text-xs text-lv-brown/30 mt-1">所需时间</div>
                                        </div>
                                        <div class="text-center p-3 bg-green-50/50 rounded-lg border border-green-100">
                                            <div class="text-lg font-bold text-green-600">${costAnalysis.comparison.withAI.followers}</div>
                                            <div class="text-xs text-lv-brown/30 mt-1">实际粉丝</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ====== 第五屏：成就徽章墙 ====== -->
        <section class="bg-white py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 fade-in">
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-3">
                        <i class="ri-medal-line text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-bold">成就解锁</span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-black text-lv-brown mb-2">成就徽章墙</h2>
                    <p class="text-lv-brown/45 text-sm">7天增长之旅中解锁的全部成就</p>
                </div>
                <div class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-4" id="badges-grid"></div>
            </div>
        </section>

        <!-- ====== 第六屏：总结文案 + CTA ====== -->
        <section class="result-summary-section py-16 sm:py-24">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="fade-in">
                    <div class="text-5xl sm:text-6xl mb-6 result-trophy-bounce">🌟</div>
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-cream leading-tight mb-6">
                        AI帮助普通人<br><span class="shimmer-text">拥有增长系统</span>
                    </h2>
                    <p class="text-cream/55 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
                        不需要专业团队，不需要付费投放，不需要运营经验。<br>
                        ViralLoop 让每一个普通创作者，都能拥有专业级的增长能力。
                    </p>
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 border border-dior-gold/20 rounded-full px-5 py-2 mb-10">
                        <i class="ri-double-quotes-l text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-sm font-medium">从内容创作到数据调优，AI全程陪跑</span>
                    </div>

                    <!-- 总结数据 -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
                        <div class="result-summary-stat">
                            <div class="text-2xl sm:text-3xl font-black text-dior-gold">${growthSummary.totalContents}</div>
                            <div class="text-xs text-cream/40 mt-1">内容发布</div>
                        </div>
                        <div class="result-summary-stat">
                            <div class="text-2xl sm:text-3xl font-black text-dior-gold">${growthSummary.peakDailyGrowth}</div>
                            <div class="text-xs text-cream/40 mt-1">单日最高涨粉</div>
                        </div>
                        <div class="result-summary-stat">
                            <div class="text-2xl sm:text-3xl font-black text-dior-gold">${growthSummary.bestContentType}</div>
                            <div class="text-xs text-cream/40 mt-1">最佳内容类型</div>
                        </div>
                        <div class="result-summary-stat">
                            <div class="text-2xl sm:text-3xl font-black text-dior-gold">${growthSummary.bestTiming}</div>
                            <div class="text-xs text-cream/40 mt-1">最佳发布时段</div>
                        </div>
                    </div>

                    <!-- 下一阶段 -->
                    <div class="bg-lv-brown-light/30 border border-dior-gold/10 rounded-2xl p-8 max-w-2xl mx-auto mb-10">
                        <h3 class="font-bold text-cream text-lg mb-4 flex items-center justify-center gap-2">
                            <i class="ri-road-map-line text-dior-gold"></i>下一阶段目标
                        </h3>
                        <div class="grid sm:grid-cols-3 gap-4">
                            <div class="text-center p-4 bg-lv-brown-dark/30 rounded-xl">
                                <div class="text-2xl font-black text-dior-gold">5,000</div>
                                <div class="text-xs text-cream/40 mt-1">粉丝突破</div>
                                <div class="text-xs text-cream/25 mt-0.5">预计14天</div>
                            </div>
                            <div class="text-center p-4 bg-lv-brown-dark/30 rounded-xl">
                                <div class="text-2xl font-black text-dior-gold">品牌合作</div>
                                <div class="text-xs text-cream/40 mt-1">开通资格</div>
                                <div class="text-xs text-cream/25 mt-0.5">预计21天</div>
                            </div>
                            <div class="text-center p-4 bg-lv-brown-dark/30 rounded-xl">
                                <div class="text-2xl font-black text-dior-gold">首次变现</div>
                                <div class="text-xs text-cream/40 mt-1">商业化启动</div>
                                <div class="text-xs text-cream/25 mt-0.5">预计30天</div>
                            </div>
                        </div>
                    </div>

                    <!-- CTA按钮 -->
                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <button class="btn-primary text-lg px-10 py-4 shadow-lg" id="restart-btn">
                            <i class="ri-restart-line"></i>返回增长计划
                        </button>
                        <button class="btn-secondary text-lg px-10 py-4 border-cream/20 text-cream/70 hover:text-cream hover:border-cream/40" id="back-review-btn">
                            <i class="ri-brain-line"></i>查看智能复盘
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;

    container.appendChild(page);
    renderFooter(container);

    // ====== 渲染Top3爆款内容卡片 ======
    const topGrid = page.querySelector('#top-contents-grid');
    topContents.forEach((content, i) => {
        const card = document.createElement('div');
        card.className = `result-top-card rank-${content.rank} fade-in fade-in-delay-${i + 1}`;
        const rankColors = ['from-yellow-400 to-yellow-600', 'from-gray-300 to-gray-500', 'from-amber-600 to-amber-800'];
        const rankLabels = ['🥇 冠军', '🥈 亚军', '🥉 季军'];
        card.innerHTML = `
            <div class="result-top-card-rank">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br ${rankColors[i]} flex items-center justify-center text-white font-black text-lg shadow-lg">
                    ${content.rank}
                </div>
                <span class="text-xs font-bold text-cream/70 mt-1">${rankLabels[i]}</span>
            </div>
            <div class="result-top-card-body">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs bg-cream/10 text-cream/50 px-2 py-0.5 rounded">Day ${content.day}</span>
                    <span class="text-xs bg-cream/10 text-cream/50 px-2 py-0.5 rounded">${content.type}</span>
                    <span class="result-grade-badge grade-${content.grade.toLowerCase().replace('+', '-plus')}">${content.grade}</span>
                </div>
                <h3 class="font-bold text-cream text-sm leading-relaxed mb-3 min-h-[40px]">${content.title}</h3>
                <div class="grid grid-cols-2 gap-2 mb-3">
                    <div class="result-top-metric">
                        <i class="ri-eye-line text-dior-gold/60"></i>
                        <span>${(content.views / 1000).toFixed(1)}K</span>
                    </div>
                    <div class="result-top-metric">
                        <i class="ri-heart-line text-red-400/60"></i>
                        <span>${content.likes.toLocaleString()}</span>
                    </div>
                    <div class="result-top-metric">
                        <i class="ri-chat-3-line text-blue-400/60"></i>
                        <span>${content.comments}</span>
                    </div>
                    <div class="result-top-metric">
                        <i class="ri-user-add-line text-green-400/60"></i>
                        <span>+${content.followers}</span>
                    </div>
                </div>
                <div class="flex flex-wrap gap-1 mb-3">
                    ${content.tags.map(t => `<span class="text-xs bg-dior-gold/10 text-dior-gold/70 px-2 py-0.5 rounded">${t}</span>`).join('')}
                </div>
                <div class="pt-3 border-t border-cream/10">
                    <div class="flex items-start gap-2">
                        <i class="ri-sparkling-2-fill text-dior-gold text-xs mt-0.5 flex-shrink-0"></i>
                        <span class="text-xs text-cream/50 leading-relaxed">${content.highlight}</span>
                    </div>
                </div>
            </div>
        `;
        topGrid.appendChild(card);
    });

    // ====== 渲染成就徽章 ======
    const badgesGrid = page.querySelector('#badges-grid');
    achievementBadges.forEach((badge, i) => {
        const el = document.createElement('div');
        el.className = `result-badge fade-in fade-in-delay-${Math.min(i % 5 + 1, 5)} ${badge.unlocked ? 'unlocked' : 'locked'}`;
        el.innerHTML = `
            <div class="result-badge-emoji">${badge.emoji}</div>
            <div class="result-badge-label">${badge.label}</div>
            <div class="result-badge-desc">${badge.desc}</div>
            ${badge.unlocked ? `<div class="result-badge-day">Day ${badge.day}</div>` : ''}
        `;
        badgesGrid.appendChild(el);
    });

    // ====== 绘制主图表 ======
    requestAnimationFrame(() => {
        const chartCanvas = page.querySelector('#result-main-chart');
        if (chartCanvas) {
            drawResultChart(chartCanvas);
        }
    });

    // ====== 粒子效果 ======
    createParticles(page.querySelector('#particles-container'));

    // ====== 数字滚动动画 ======
    animateCounters(page);

    // ====== 绑定事件 ======
    page.querySelector('#restart-btn').addEventListener('click', () => router.navigate('/plan'));
    page.querySelector('#back-review-btn').addEventListener('click', () => router.navigate('/review'));
}

// 绘制带关键节点标注的增长曲线
function drawResultChart(canvas) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const values = followerGrowthData.values;
    const labels = followerGrowthData.labels;
    const padding = { top: 40, right: 30, bottom: 50, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
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
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(val.toLocaleString(), padding.left - 10, y + 4);
    }

    // 目标线（1000粉）
    const targetY = padding.top + chartH - (1000 / maxVal) * chartH;
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, targetY);
    ctx.lineTo(width - padding.right, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('🎯 目标: 1,000粉', width - padding.right - 110, targetY - 8);

    // X轴标签
    ctx.fillStyle = 'rgba(89, 47, 35, 0.4)';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
        const x = padding.left + (chartW / (labels.length - 1)) * i;
        ctx.fillText(label, x, height - 12);
    });

    // 数据点坐标
    const points = values.map((v, i) => ({
        x: padding.left + (chartW / (values.length - 1)) * i,
        y: padding.top + chartH - (v / maxVal) * chartH,
    }));

    // 面积填充
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(169, 149, 99, 0.25)');
    gradient.addColorStop(0.5, 'rgba(169, 149, 99, 0.08)');
    gradient.addColorStop(1, 'rgba(169, 149, 99, 0.01)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fill();

    // 折线
    ctx.strokeStyle = '#A99563';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const xc = (points[i - 1].x + points[i].x) / 2;
        const yc = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();

    // 数据点 + 关键节点标注
    const keyNodes = { 3: { color: '#3b82f6', label: '🔄 AI优化' }, 5: { color: '#ef4444', label: '🔥 爆发' }, 7: { color: '#4ade80', label: '🎉 达成' } };
    points.forEach((p, i) => {
        const dayNum = i;
        const isKey = keyNodes[dayNum + 1] || (i === 0);

        // 外圈
        if (isKey || i === 0) {
            const nodeColor = i === 0 ? 'rgba(89, 47, 35, 0.3)' : keyNodes[dayNum + 1]?.color || '#A99563';
            ctx.fillStyle = nodeColor;
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        // 点
        ctx.fillStyle = 'white';
        ctx.strokeStyle = isKey && i > 0 ? (keyNodes[dayNum + 1]?.color || '#A99563') : '#A99563';
        ctx.lineWidth = isKey ? 3 : 2.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isKey ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 数值
        ctx.fillStyle = 'rgba(89, 47, 35, 0.75)';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(values[i].toLocaleString(), p.x, p.y - (isKey ? 20 : 14));

        // 关键节点标签
        if (keyNodes[dayNum + 1]) {
            const node = keyNodes[dayNum + 1];
            ctx.fillStyle = node.color;
            ctx.font = 'bold 10px Inter';
            ctx.fillText(node.label, p.x, p.y + 22);
        }
    });
}

// 粒子效果
function createParticles(container) {
    if (!container) return;
    const emojis = ['✨', '🎉', '🎊', '⭐', '💫', '🌟', '🏆', '🔥'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'result-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.fontSize = (12 + Math.random() * 16) + 'px';
        container.appendChild(particle);
    }
}

// 数字滚动动画
function animateCounters(page) {
    const counters = page.querySelectorAll('.result-counter');
    const heroCounters = page.querySelectorAll('.result-counter-hero');

    const animateValue = (el, target, duration = 2000) => {
        let start = 0;
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
    heroCounters.forEach(c => {
        const target = parseInt(c.dataset.target);
        setTimeout(() => animateValue(c, target, 2500), 500);
    });
}
