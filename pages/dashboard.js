// 首页（Dashboard）- 产品认知 + 增长驾驶舱
// 让用户3秒内理解：这是什么产品 + 能帮我做什么
import { router } from '../router.js';
import { followerGrowthData, growthPlan, personaData, growthSummary } from '../data.js';
import { renderNavbar, renderFooter } from '../components.js';
import { drawLineChart } from '../charts.js';
import { launchDemoStory } from '../demo-overlay.js';
import { globalState } from '../state.js';
import {
    syncService, PLATFORMS, ConnectionStatus, DataMode,
    getConnectionStatusInfo, formatLastSync
} from '../data-service.js';

export function renderDashboard(container) {
    renderNavbar(container, 'dashboard');

    const page = document.createElement('div');
    page.className = 'min-h-screen';

    // 当前进度计算
    const currentDay = 7;
    const currentFollowers = followerGrowthData.values[followerGrowthData.values.length - 1];
    const todayGrowth = followerGrowthData.dailyIncrease[followerGrowthData.dailyIncrease.length - 1];
    const completionRate = ((currentFollowers / 1000) * 100).toFixed(1);

    page.innerHTML = `
        <!-- ===== 1️⃣ Hero区（深色沉浸式） ===== -->
        <div class="dash-hero-section relative overflow-hidden">
            <!-- 深棕渐变背景 + 光晕层 -->
            <div class="dash-hero-bg"></div>
            <div class="dash-hero-glow"></div>

            <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style="min-height: 520px; padding-top: 80px; padding-bottom: 80px;">
                <!-- 顶部小标签 -->
                <div class="hero-badge inline-flex items-center gap-2 bg-dior-gold/12 border border-dior-gold/20 rounded-full px-5 py-2 mb-8">
                    <i class="ri-sparkling-2-fill text-dior-gold text-sm"></i>
                    <span class="text-dior-gold text-xs font-semibold tracking-wide">AI驱动 · 爆款增长引擎</span>
                </div>

                <!-- 主标题 -->
                <h1 class="hero-title text-center">
                    把流量密码，变成<br>普通人的日常能力
                </h1>

                <!-- 副标题 -->
                <p class="hero-subtitle text-center">
                    AI自动拆解爆款内容与增长路径，让每一个KOC都能持续涨粉
                </p>

                <!-- CTA按钮组 -->
                <div class="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button class="hero-cta-primary" id="hero-cta-main">
                        <i class="ri-rocket-2-fill"></i>
                        <span>开始我的涨粉计划</span>
                    </button>
                    <button class="hero-cta-secondary" id="hero-cta-demo-story">
                        <span class="hero-cta-play-icon">▶</span>
                        <span>观看增长演示</span>
                    </button>
                </div>
            </div>

            <!-- 装饰元素 -->
            <div class="absolute top-24 left-[8%] w-2.5 h-2.5 rounded-full bg-dior-gold/15 hero-particle" style="animation-delay: 0s;"></div>
            <div class="absolute top-36 right-[12%] w-2 h-2 rounded-full bg-dior-gold/10 hero-particle" style="animation-delay: 1.2s;"></div>
            <div class="absolute bottom-28 left-[18%] w-1.5 h-1.5 rounded-full bg-dior-gold/12 hero-particle" style="animation-delay: 2.4s;"></div>
            <div class="absolute top-48 left-[30%] w-1.5 h-1.5 rounded-full bg-cream/8 hero-particle" style="animation-delay: 0.8s;"></div>
            <div class="absolute bottom-36 right-[22%] w-2 h-2 rounded-full bg-dior-gold/8 hero-particle" style="animation-delay: 1.8s;"></div>

            <!-- 底部渐变过渡 -->
            <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent z-10 pointer-events-none"></div>
        </div>

        <!-- ===== 🔌 数据接入状态面板 ===== -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-8">
            <div class="dash-data-connection-panel bg-white rounded-2xl border border-dior-gold/10 shadow-lg shadow-dior-gold/5 overflow-hidden fade-in">
                <!-- 面板头部 -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-dior-gold/8 bg-gradient-to-r from-cream/80 to-white">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                            <i class="ri-link text-dior-gold text-lg"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-lv-brown">数据接入中心</h3>
                            <p class="text-xs text-lv-brown/40">连接你的社交平台账号，获取真实数据驱动增长</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="dash-data-mode-badge" id="dash-data-mode">
                            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            <span class="text-xs font-medium text-lv-brown/60">Demo数据</span>
                        </div>
                        <div class="dash-last-update text-xs text-lv-brown/40 flex items-center gap-1.5" id="dash-last-update">
                            <i class="ri-time-line text-dior-gold/50"></i>
                            <span>Last updated: <strong id="dash-update-time">刚刚</strong></span>
                        </div>
                    </div>
                </div>
                <!-- 平台连接卡片 -->
                <div class="grid sm:grid-cols-2 gap-4 p-6" id="dash-platform-cards"></div>
            </div>
        </div>

        <!-- ===== 2️⃣ 产品能力介绍 ===== -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="text-center mb-10 fade-in">
                <h2 class="text-2xl font-bold text-lv-brown mb-2">三大核心能力</h2>
                <p class="text-sm text-lv-brown/50">AI全流程赋能，让增长不再靠运气</p>
            </div>
            <div class="grid md:grid-cols-3 gap-6 mb-12">
                <div class="dash-capability-card fade-in fade-in-delay-1">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 flex items-center justify-center mb-4">
                        <i class="ri-magic-line text-purple-500 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-lv-brown text-lg mb-2">AI内容生成</h3>
                    <p class="text-sm text-lv-brown/50 leading-relaxed">基于账号人设和热点趋势，自动生成高潜力爆款内容，标题、正文、标签一键搞定</p>
                </div>
                <div class="dash-capability-card fade-in fade-in-delay-2">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center mb-4">
                        <i class="ri-route-line text-blue-500 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-lv-brown text-lg mb-2">智能分发策略</h3>
                    <p class="text-sm text-lv-brown/50 leading-relaxed">多平台最优发布时间、话题标签、内容格式的AI推荐，最大化每条内容的曝光效率</p>
                </div>
                <div class="dash-capability-card fade-in fade-in-delay-3">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center mb-4">
                        <i class="ri-settings-4-line text-green-500 text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-lv-brown text-lg mb-2">自动数据调优</h3>
                    <p class="text-sm text-lv-brown/50 leading-relaxed">实时监控内容表现，AI自动诊断问题并给出优化方案，持续迭代增长策略</p>
                </div>
            </div>

            <!-- ===== 3️⃣ 增长流程展示 ===== -->
            <div class="bg-white rounded-2xl border border-dior-gold/10 p-8 mb-12 fade-in">
                <div class="text-center mb-8">
                    <h2 class="text-xl font-bold text-lv-brown mb-2">完整增长闭环</h2>
                    <p class="text-sm text-lv-brown/50">6步完成从0到1000粉的蜕变</p>
                </div>
                <div class="dash-flow-container">
                    <div class="dash-flow-track"></div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative" id="flow-steps"></div>
                </div>
            </div>

            <!-- ===== 4️⃣ 当前用户状态 ===== -->
            <div class="mb-8 fade-in">
                <div class="flex items-center gap-2 mb-6">
                    <i class="ri-dashboard-3-line text-dior-gold text-lg"></i>
                    <h2 class="text-xl font-bold text-lv-brown">我的增长状态</h2>
                    <span class="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">进行中</span>
                </div>

                <!-- 进度横幅 -->
                <div class="vl-progress-banner mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center flex-shrink-0">
                            <i class="ri-rocket-2-fill text-white text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-lg font-bold text-lv-brown">第${currentDay}天增长计划</span>
                                <span class="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">🎉 目标达成</span>
                            </div>
                            <p class="text-sm text-lv-brown/50">目标：7天从0到1000粉丝 · 完成率 ${completionRate}%</p>
                            <div class="mt-2 flex items-center gap-3">
                                <div class="flex-1 h-2 bg-dior-gold/10 rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-dior-gold to-green-500 rounded-full transition-all duration-1000" style="width: ${Math.min(completionRate, 100)}%"></div>
                                </div>
                                <span class="text-xs font-bold text-dior-gold">${currentFollowers}/1000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 核心数据卡片 -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="stat-card">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-lv-brown/50 font-medium">总粉丝数</span>
                            <i class="ri-user-heart-line text-dior-gold"></i>
                        </div>
                        <div class="text-2xl font-bold text-lv-brown">${currentFollowers.toLocaleString()}</div>
                        <div class="flex items-center gap-1 mt-1">
                            <i class="ri-arrow-up-s-fill text-green-500 text-sm"></i>
                            <span class="text-xs text-green-600 font-medium">+${todayGrowth} 今日</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-lv-brown/50 font-medium">互动率</span>
                            <i class="ri-heart-pulse-line text-dior-gold"></i>
                        </div>
                        <div class="text-2xl font-bold text-lv-brown">6.3%</div>
                        <div class="flex items-center gap-1 mt-1">
                            <i class="ri-arrow-up-s-fill text-green-500 text-sm"></i>
                            <span class="text-xs text-green-600 font-medium">高于行业均值</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-lv-brown/50 font-medium">爆款率</span>
                            <i class="ri-fire-line text-dior-gold"></i>
                        </div>
                        <div class="text-2xl font-bold text-lv-brown">42.8%</div>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="text-xs text-dior-gold font-medium">🔥 3条爆款</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-lv-brown/50 font-medium">AI优化</span>
                            <i class="ri-robot-2-line text-dior-gold"></i>
                        </div>
                        <div class="text-2xl font-bold text-lv-brown">23</div>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="text-xs text-lv-brown/40 font-medium">累计优化建议</span>
                        </div>
                    </div>
                </div>

                <!-- 两列：增长曲线 + 快速入口 -->
                <div class="grid lg:grid-cols-3 gap-6 mb-6">
                    <div class="lg:col-span-2 bg-white rounded-xl border border-dior-gold/10 p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-bold text-lv-brown flex items-center gap-2">
                                <i class="ri-line-chart-line text-dior-gold"></i>7天增长曲线
                            </h3>
                            <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">↑ 超额完成</span>
                        </div>
                        <canvas id="dashboard-chart" style="width:100%;height:240px;"></canvas>
                    </div>

                    <div class="space-y-4">
                        <div class="bg-gradient-to-br from-lv-brown to-lv-brown-dark rounded-xl p-5 text-cream">
                            <h3 class="font-bold text-cream mb-3 flex items-center gap-2">
                                <i class="ri-compass-3-line text-dior-gold"></i>继续行动
                            </h3>
                            <div class="space-y-2">
                                <button class="w-full text-left text-sm text-cream/80 hover:text-cream py-3 px-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-all flex items-center gap-3 group" id="dash-go-plan">
                                    <div class="w-8 h-8 rounded-lg bg-dior-gold/20 flex items-center justify-center group-hover:bg-dior-gold/30 transition-colors">
                                        <i class="ri-calendar-line text-dior-gold"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold">继续增长计划</div>
                                        <div class="text-xs text-cream/40">Day7 · 里程碑达成</div>
                                    </div>
                                    <i class="ri-arrow-right-s-line ml-auto text-cream/30"></i>
                                </button>
                                <button class="w-full text-left text-sm text-cream/80 hover:text-cream py-3 px-4 rounded-lg bg-cream/5 hover:bg-cream/10 transition-all flex items-center gap-3 group" id="dash-go-results">
                                    <div class="w-8 h-8 rounded-lg bg-dior-gold/20 flex items-center justify-center group-hover:bg-dior-gold/30 transition-colors">
                                        <i class="ri-trophy-line text-dior-gold"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold">查看增长结果</div>
                                        <div class="text-xs text-cream/40">7天成果总结</div>
                                    </div>
                                    <i class="ri-arrow-right-s-line ml-auto text-cream/30"></i>
                                </button>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                            <h3 class="font-bold text-lv-brown mb-3 text-sm flex items-center gap-2">
                                <i class="ri-user-star-line text-dior-gold"></i>当前人设
                            </h3>
                            <div class="flex items-center gap-3 mb-3">
                                <span class="text-3xl">${personaData.avatar}</span>
                                <div>
                                    <div class="font-bold text-lv-brown">${personaData.nickname}</div>
                                    <div class="text-xs text-lv-brown/40">${personaData.platform} · ${personaData.niche}</div>
                                </div>
                            </div>
                            <button class="w-full text-xs text-dior-gold bg-dior-gold/5 hover:bg-dior-gold/10 py-2 rounded-lg transition-colors font-medium" id="dash-go-persona">
                                <i class="ri-edit-line mr-1"></i>修改人设
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 最近内容表现 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6">
                    <h3 class="font-bold text-lv-brown mb-4 flex items-center gap-2">
                        <i class="ri-file-list-3-line text-dior-gold"></i>最近内容表现
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-dior-gold/8">
                                    <th class="text-left py-3 px-2 text-xs text-lv-brown/40 font-medium">Day</th>
                                    <th class="text-left py-3 px-2 text-xs text-lv-brown/40 font-medium">内容标题</th>
                                    <th class="text-right py-3 px-2 text-xs text-lv-brown/40 font-medium">浏览</th>
                                    <th class="text-right py-3 px-2 text-xs text-lv-brown/40 font-medium">点赞</th>
                                    <th class="text-right py-3 px-2 text-xs text-lv-brown/40 font-medium">涨粉</th>
                                    <th class="text-center py-3 px-2 text-xs text-lv-brown/40 font-medium">状态</th>
                                </tr>
                            </thead>
                            <tbody id="content-table-body"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(page);

    // 渲染数据接入平台卡片
    renderDashPlatformCards(page);

    // 渲染增长流程步骤
    const flowSteps = page.querySelector('#flow-steps');
    const steps = [
        { icon: 'ri-user-star-line', label: '人设定制', desc: '选择方向', path: '/persona', color: 'from-pink-500/15 to-rose-500/10' },
        { icon: 'ri-file-text-line', label: '内容生成', desc: 'AI创作', path: '/create', color: 'from-purple-500/15 to-violet-500/10' },
        { icon: 'ri-send-plane-line', label: '智能发布', desc: '最优时机', path: '/plan', color: 'from-blue-500/15 to-indigo-500/10' },
        { icon: 'ri-bar-chart-2-line', label: '数据分析', desc: '全维度监控', path: '/analytics', color: 'from-green-500/15 to-emerald-500/10' },
        { icon: 'ri-brain-line', label: '智能复盘', desc: 'AI诊断', path: '/review', color: 'from-orange-500/15 to-amber-500/10' },
        { icon: 'ri-trophy-line', label: '增长提升', desc: '持续优化', path: '/results', color: 'from-dior-gold/15 to-yellow-600/10' },
    ];
    steps.forEach((step, i) => {
        const el = document.createElement('div');
        el.className = 'dash-flow-step cursor-pointer group';
        el.innerHTML = `
            <div class="relative flex flex-col items-center text-center">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <i class="${step.icon} text-dior-gold text-xl"></i>
                </div>
                <div class="font-bold text-lv-brown text-sm mb-0.5">${step.label}</div>
                <div class="text-xs text-lv-brown/40">${step.desc}</div>
                ${i < steps.length - 1 ? '<div class="dash-flow-arrow hidden lg:block"><i class="ri-arrow-right-line text-dior-gold/30"></i></div>' : ''}
            </div>
        `;
        el.addEventListener('click', () => router.navigate(step.path));
        flowSteps.appendChild(el);
    });

    // 渲染内容表格
    const tableBody = page.querySelector('#content-table-body');
    growthPlan.forEach((day, i) => {
        const dailyGrowth = i > 0 ? day.followers - growthPlan[i - 1].followers : day.followers;
        const isHot = dailyGrowth > 150;
        const tr = document.createElement('tr');
        tr.className = 'border-b border-dior-gold/5 hover:bg-cream/30 cursor-pointer transition-colors';
        tr.innerHTML = `
            <td class="py-3 px-2 font-bold text-lv-brown">D${day.day}</td>
            <td class="py-3 px-2 text-lv-brown/70 max-w-[200px] truncate">${day.contentTitle.replace(/[「」]/g, '')}</td>
            <td class="py-3 px-2 text-right text-lv-brown/60">${day.views >= 10000 ? (day.views / 10000).toFixed(1) + '万' : day.views}</td>
            <td class="py-3 px-2 text-right text-lv-brown/60">${day.likes}</td>
            <td class="py-3 px-2 text-right ${isHot ? 'text-green-600 font-bold' : 'text-lv-brown/60'}">+${dailyGrowth}</td>
            <td class="py-3 px-2 text-center">${isHot ? '<span class="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold">🔥 爆款</span>' : '<span class="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">✓ 完成</span>'}</td>
        `;
        tr.addEventListener('click', () => router.navigate(`/create?day=${day.day}`));
        tableBody.appendChild(tr);
    });

    renderFooter(page);

    // 绘制图表
    requestAnimationFrame(() => {
        const chartCanvas = page.querySelector('#dashboard-chart');
        if (chartCanvas) {
            drawLineChart(chartCanvas, null, {
                labels: followerGrowthData.labels,
                values: followerGrowthData.values,
                color: '#A99563',
                fillColor: 'rgba(169, 149, 99, 0.15)',
                showValues: true,
            });
        }
    });

    // 绑定事件
    // Hero CTA：判断是否已有人设
    page.querySelector('#hero-cta-main').addEventListener('click', () => {
        const personaId = globalState.getPersonaId();
        if (personaId) {
            router.navigate('/plan');
        } else {
            router.navigate('/persona');
        }
    });
    page.querySelector('#hero-cta-demo-story').addEventListener('click', () => launchDemoStory());
    page.querySelector('#dash-go-plan').addEventListener('click', () => router.navigate('/plan'));
    page.querySelector('#dash-go-results').addEventListener('click', () => router.navigate('/results'));
    page.querySelector('#dash-go-persona').addEventListener('click', () => router.navigate('/persona'));

    // 启动数据面板自动刷新
    startDashDataRefresh(page);
}

// ========== 数据接入平台卡片渲染 ==========
function renderDashPlatformCards(page) {
    const container = page.querySelector('#dash-platform-cards');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(PLATFORMS).forEach(pid => {
        const platform = PLATFORMS[pid];
        const statusInfo = getConnectionStatusInfo(pid);
        const connected = syncService.isConnected(pid);
        const syncing = syncService.isSyncing(pid);
        const lastSync = formatLastSync(pid);

        const card = document.createElement('div');
        card.className = `dash-platform-card ${connected ? 'connected' : ''} ${syncing ? 'syncing' : ''}`;
        card.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl ${connected ? 'bg-green-50' : 'bg-cream/80'} flex items-center justify-center transition-colors">
                        <i class="${platform.icon} text-2xl" style="color:${platform.color === '#000000' ? '#592f23' : platform.color}"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-lv-brown">${platform.name}</span>
                            <span class="dash-conn-status ${connected ? 'connected' : syncing ? 'syncing' : 'disconnected'}">
                                ${statusInfo.icon} ${statusInfo.label}
                            </span>
                        </div>
                        <div class="text-xs text-lv-brown/40 mt-0.5">${platform.apiType} · ${connected ? `上次同步: ${lastSync}` : '未授权'}</div>
                    </div>
                </div>
                ${connected
                    ? `<button class="dash-disconnect-btn" data-platform="${pid}" title="断开连接">
                        <i class="ri-link-unlink text-sm"></i>
                       </button>`
                    : `<button class="dash-connect-btn" data-platform="${pid}">
                        <i class="ri-link"></i>连接账号
                       </button>`
                }
            </div>
            ${connected ? `
                <div class="mt-3 pt-3 border-t border-dior-gold/8">
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <div class="text-sm font-bold text-lv-brown">${pid === 'xiaohongshu' ? '7' : '0'}</div>
                            <div class="text-xs text-lv-brown/30">已同步内容</div>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-lv-brown">${pid === 'xiaohongshu' ? '1,024' : '0'}</div>
                            <div class="text-xs text-lv-brown/30">粉丝数</div>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-green-600">${pid === 'xiaohongshu' ? '5min' : '--'}</div>
                            <div class="text-xs text-lv-brown/30">刷新间隔</div>
                        </div>
                    </div>
                </div>
            ` : `
                <div class="mt-3 pt-3 border-t border-dior-gold/8">
                    <div class="flex items-center gap-2 text-xs text-lv-brown/40">
                        <i class="ri-shield-check-line text-dior-gold/50"></i>
                        <span>OAuth 2.0 安全授权 · 仅读取公开数据 · 随时可断开</span>
                    </div>
                </div>
            `}
        `;
        container.appendChild(card);
    });

    // 绑定连接按钮
    container.querySelectorAll('.dash-connect-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const pid = btn.dataset.platform;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i>授权中...';
            btn.disabled = true;
            btn.classList.add('connecting');
            try {
                await syncService.initiateOAuth(pid);
                renderDashPlatformCards(page);
                updateDashDataMode(page);
            } catch (err) {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.classList.remove('connecting');
            }
        });
    });

    // 绑定断开按钮
    container.querySelectorAll('.dash-disconnect-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pid = btn.dataset.platform;
            syncService.disconnectPlatform(pid);
            renderDashPlatformCards(page);
            updateDashDataMode(page);
        });
    });
}

// ========== 数据模式更新 ==========
function updateDashDataMode(page) {
    const modeEl = page.querySelector('#dash-data-mode');
    if (!modeEl) return;
    const anyConnected = Object.keys(PLATFORMS).some(pid => syncService.isConnected(pid));
    if (anyConnected) {
        modeEl.innerHTML = `
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-xs font-medium text-green-700">已连接 · 实时数据</span>
        `;
    } else {
        modeEl.innerHTML = `
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span class="text-xs font-medium text-lv-brown/60">Demo数据</span>
        `;
    }
}

// ========== 自动刷新时间显示 ==========
let dashRefreshTimer = null;
function startDashDataRefresh(page) {
    if (dashRefreshTimer) clearInterval(dashRefreshTimer);
    dashRefreshTimer = setInterval(() => {
        const timeEl = page.querySelector('#dash-update-time');
        if (timeEl) {
            const xhsSync = formatLastSync('xiaohongshu');
            timeEl.textContent = syncService.isConnected('xiaohongshu') ? xhsSync : '未同步';
        }
    }, 10000);
}