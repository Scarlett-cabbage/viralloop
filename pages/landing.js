// Landing页 - 产品介绍
import { router } from '../router.js';
import { features, IMAGES, followerGrowthData, milestones } from '../data.js';
import { renderFooter, drawLineChart } from '../components.js';

export function renderLanding(container) {
    const page = document.createElement('div');
    page.className = 'min-h-screen';

    // Hero区域
    page.innerHTML = `
        <!-- 顶部导航 -->
        <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-dior-gold/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center">
                            <i class="ri-rocket-2-fill text-white text-lg"></i>
                        </div>
                        <span class="text-lg font-bold text-lv-brown">Viral<span class="gradient-text">Loop</span></span>
                    </div>
                    <div class="flex items-center gap-4">
                        <a href="#features" class="text-sm text-lv-brown/60 hover:text-dior-gold transition-colors hidden sm:block">功能特性</a>
                        <a href="#how-it-works" class="text-sm text-lv-brown/60 hover:text-dior-gold transition-colors hidden sm:block">工作原理</a>
                        <button class="btn-primary text-sm" id="landing-cta-top">
                            <i class="ri-play-circle-line"></i>立即体验
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="relative pt-24 pb-16 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-lv-brown via-lv-brown-dark to-lv-brown"></div>
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, rgba(169,149,99,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(169,149,99,0.2) 0%, transparent 50%);"></div>
            
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                    <div class="fade-in">
                        <div class="inline-flex items-center gap-2 bg-dior-gold/10 border border-dior-gold/20 rounded-full px-4 py-1.5 mb-6">
                            <span class="w-2 h-2 rounded-full bg-dior-gold animate-pulse"></span>
                            <span class="text-dior-gold text-xs font-medium">AI驱动 · 全自动增长闭环</span>
                        </div>
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-cream leading-tight mb-6">
                            从<span class="gradient-text">0</span>到<span class="gradient-text">1000</span>粉
                            <br>AI帮你<span class="text-dior-gold">自动增长</span>
                        </h1>
                        <p class="text-cream/60 text-lg mb-8 leading-relaxed max-w-lg">
                            ViralLoop 是面向普通KOC的AI增长闭环Agent系统，通过<strong class="text-cream/80">内容生成 × 分发策略 × 数据调优</strong>，7天实现账号冷启动到千粉突破。
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <button class="btn-primary text-base px-8 py-3.5" id="landing-cta-main">
                                <i class="ri-rocket-line"></i>开始增长之旅
                            </button>
                            <button class="btn-secondary text-base px-8 py-3.5 border-cream/20 text-cream/70 hover:text-cream hover:border-cream/40" id="landing-demo">
                                <i class="ri-play-line"></i>查看Demo
                            </button>
                        </div>
                        <div class="flex items-center gap-8 mt-10">
                            <div>
                                <div class="text-2xl font-bold text-dior-gold">7天</div>
                                <div class="text-xs text-cream/40">增长周期</div>
                            </div>
                            <div class="w-px h-10 bg-cream/10"></div>
                            <div>
                                <div class="text-2xl font-bold text-dior-gold">1000+</div>
                                <div class="text-xs text-cream/40">目标粉丝</div>
                            </div>
                            <div class="w-px h-10 bg-cream/10"></div>
                            <div>
                                <div class="text-2xl font-bold text-dior-gold">92%</div>
                                <div class="text-xs text-cream/40">成功率</div>
                            </div>
                        </div>
                    </div>
                    <div class="fade-in fade-in-delay-2 hidden lg:block">
                        <div class="relative">
                            <div class="absolute -inset-4 bg-gradient-to-r from-dior-gold/20 to-transparent rounded-2xl blur-xl"></div>
                            <div class="relative bg-lv-brown-light/50 rounded-2xl border border-dior-gold/10 p-6 backdrop-blur-sm">
                                <div class="flex items-center gap-2 mb-4">
                                    <div class="w-3 h-3 rounded-full bg-red-400/60"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-400/60"></div>
                                    <span class="text-cream/30 text-xs ml-2">ViralLoop Dashboard</span>
                                </div>
                                <div class="grid grid-cols-2 gap-3 mb-4">
                                    <div class="bg-lv-brown-dark/50 rounded-lg p-3">
                                        <div class="text-cream/40 text-xs mb-1">总粉丝</div>
                                        <div class="text-dior-gold text-xl font-bold">1,024</div>
                                        <div class="text-green-400 text-xs mt-1">↑ +212 今日</div>
                                    </div>
                                    <div class="bg-lv-brown-dark/50 rounded-lg p-3">
                                        <div class="text-cream/40 text-xs mb-1">互动率</div>
                                        <div class="text-dior-gold text-xl font-bold">6.3%</div>
                                        <div class="text-green-400 text-xs mt-1">↑ 高于均值</div>
                                    </div>
                                </div>
                                <div class="bg-lv-brown-dark/50 rounded-lg p-3">
                                    <div class="text-cream/40 text-xs mb-2">7天增长曲线</div>
                                    <canvas id="hero-chart" style="width:100%;height:140px;"></canvas>
                                </div>
                                <div class="mt-3 flex items-center gap-2">
                                    <div class="w-6 h-6 rounded-full bg-dior-gold/20 flex items-center justify-center">
                                        <i class="ri-robot-2-line text-dior-gold text-xs"></i>
                                    </div>
                                    <span class="text-cream/50 text-xs">AI建议：今日最佳发布时间 20:00，预计曝光 15,000+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 功能特性 -->
        <section id="features" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-4">
                        <i class="ri-sparkling-2-fill text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-medium">核心能力</span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-bold text-lv-brown mb-4">AI驱动的全链路增长引擎</h2>
                    <p class="text-lv-brown/50 max-w-2xl mx-auto">从内容创作到数据分析，ViralLoop 用AI自动化每一个增长环节</p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" id="features-grid"></div>
            </div>
        </section>

        <!-- 工作原理 -->
        <section id="how-it-works" class="py-20 bg-cream">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-4">
                        <i class="ri-flow-chart text-dior-gold text-sm"></i>
                        <span class="text-dior-gold text-xs font-medium">工作流程</span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-bold text-lv-brown mb-4">4步完成增长闭环</h2>
                    <p class="text-lv-brown/50 max-w-2xl mx-auto">简单4步，AI自动驱动你的账号增长</p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" id="steps-grid"></div>
            </div>
        </section>

        <!-- 增长数据展示 -->
        <section class="py-20 dark-section">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl sm:text-4xl font-bold text-cream mb-4">真实增长数据</h2>
                    <p class="text-cream/50 max-w-2xl mx-auto">基于AI策略优化，7天内实现从0到1000+粉丝的突破</p>
                </div>
                <div class="grid lg:grid-cols-2 gap-8">
                    <div class="bg-lv-brown-light/30 rounded-2xl border border-dior-gold/10 p-6">
                        <h3 class="text-cream font-semibold mb-4 flex items-center gap-2">
                            <i class="ri-line-chart-line text-dior-gold"></i>粉丝增长曲线
                        </h3>
                        <canvas id="growth-chart" style="width:100%;height:280px;"></canvas>
                    </div>
                    <div class="space-y-4" id="milestones-list"></div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-20 bg-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="bg-gradient-to-br from-lv-brown to-lv-brown-dark rounded-3xl p-12 relative overflow-hidden">
                    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 30% 50%, rgba(169,149,99,0.4) 0%, transparent 50%);"></div>
                    <div class="relative">
                        <h2 class="text-3xl sm:text-4xl font-bold text-cream mb-4">准备好开始你的增长之旅了吗？</h2>
                        <p class="text-cream/50 mb-8 max-w-lg mx-auto">只需3分钟设置，AI将为你量身定制7天增长计划</p>
                        <button class="btn-primary text-lg px-10 py-4" id="landing-cta-bottom">
                            <i class="ri-rocket-line"></i>立即开始
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;

    container.appendChild(page);

    // 渲染功能特性卡片
    const featuresGrid = page.querySelector('#features-grid');
    features.forEach((f, i) => {
        const card = document.createElement('div');
        card.className = `card-hover bg-cream/50 rounded-xl p-6 border border-dior-gold/8 fade-in fade-in-delay-${i % 5 + 1}`;
        card.innerHTML = `
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center mb-4">
                <i class="${f.icon} text-dior-gold text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-lv-brown mb-2">${f.title}</h3>
            <p class="text-sm text-lv-brown/55 leading-relaxed">${f.desc}</p>
        `;
        featuresGrid.appendChild(card);
    });

    // 渲染工作步骤
    const stepsGrid = page.querySelector('#steps-grid');
    const steps = [
        { num: '01', icon: 'ri-user-settings-line', title: '创建Persona', desc: '输入基础信息，AI自动生成最优账号人设和定位策略' },
        { num: '02', icon: 'ri-calendar-check-line', title: 'AI生成计划', desc: '基于人设和平台算法，自动生成7天增长计划和内容日历' },
        { num: '03', icon: 'ri-send-plane-line', title: '内容分发', desc: 'AI优化内容并在最佳时间自动分发到多个平台' },
        { num: '04', icon: 'ri-line-chart-line', title: '数据调优', desc: '实时监控数据，AI自动复盘并持续优化增长策略' },
    ];
    steps.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = `relative bg-white rounded-xl p-6 border border-dior-gold/10 card-hover fade-in fade-in-delay-${i + 1}`;
        card.innerHTML = `
            <div class="text-5xl font-black text-dior-gold/10 absolute top-4 right-4">${s.num}</div>
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lv-brown to-lv-brown-dark flex items-center justify-center mb-4">
                <i class="${s.icon} text-dior-gold text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-lv-brown mb-2">${s.title}</h3>
            <p class="text-sm text-lv-brown/55 leading-relaxed">${s.desc}</p>
            ${i < 3 ? '<div class="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-dior-gold/30 text-2xl z-10"><i class="ri-arrow-right-s-line"></i></div>' : ''}
        `;
        stepsGrid.appendChild(card);
    });

    // 渲染里程碑
    const milestonesList = page.querySelector('#milestones-list');
    milestones.forEach((m, i) => {
        const card = document.createElement('div');
        card.className = `bg-lv-brown-light/30 rounded-xl border border-dior-gold/10 p-5 flex items-center gap-4 fade-in fade-in-delay-${i + 1}`;
        card.innerHTML = `
            <div class="w-14 h-14 rounded-xl bg-dior-gold/10 flex items-center justify-center flex-shrink-0">
                <span class="text-dior-gold font-bold text-lg">${m.followers.toLocaleString()}</span>
            </div>
            <div class="flex-1">
                <div class="text-cream font-semibold">${m.label}</div>
                <div class="text-cream/40 text-sm">Day ${m.day}</div>
            </div>
            <div class="w-10 h-10 rounded-full ${i === milestones.length - 1 ? 'bg-dior-gold text-lv-brown' : 'bg-dior-gold/15 text-dior-gold'} flex items-center justify-center">
                <i class="${i === milestones.length - 1 ? 'ri-trophy-fill' : 'ri-check-line'} text-lg"></i>
            </div>
        `;
        milestonesList.appendChild(card);
    });

    // 渲染页脚
    renderFooter(page);

    // 绑定CTA按钮
    ['landing-cta-top', 'landing-cta-main', 'landing-cta-bottom'].forEach(id => {
        const btn = page.querySelector(`#${id}`);
        if (btn) btn.addEventListener('click', () => router.navigate('/persona'));
    });
    const demoBtn = page.querySelector('#landing-demo');
    if (demoBtn) demoBtn.addEventListener('click', () => router.navigate('/plan'));

    // 绘制Hero图表
    requestAnimationFrame(() => {
        const heroCanvas = page.querySelector('#hero-chart');
        if (heroCanvas) {
            drawLineChart(heroCanvas, null, {
                labels: followerGrowthData.labels,
                values: followerGrowthData.values,
                color: '#A99563',
                fillColor: 'rgba(169, 149, 99, 0.15)',
                showLabels: false,
                showGrid: false,
                showDots: true,
            });
        }
        const growthCanvas = page.querySelector('#growth-chart');
        if (growthCanvas) {
            drawLineChart(growthCanvas, null, {
                labels: followerGrowthData.labels,
                values: followerGrowthData.values,
                color: '#A99563',
                fillColor: 'rgba(169, 149, 99, 0.15)',
                showValues: true,
            });
        }
    });
}
