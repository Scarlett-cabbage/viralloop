// 个人主页 - Profile Page
import { router } from '../router.js';
import { personaData, growthSummary, followerGrowthData, growthPlan, topContents } from '../data.js';
import { renderNavbar, renderFooter, drawLineChart } from '../components.js';

export function renderProfile(container) {
    renderNavbar(container, 'profile');

    const page = document.createElement('div');
    page.className = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8';

    // 计算数据
    const totalContents = growthPlan.length;
    const viralContents = growthPlan.filter(d => d.tag === 'hot').length;
    const recentGrowth = followerGrowthData.dailyIncrease.slice(-7);
    const avgDailyGrowth = Math.round(recentGrowth.reduce((a, b) => a + b, 0) / recentGrowth.length);

    page.innerHTML = `
        <!-- 页面标题 -->
        <div class="mb-8 fade-in">
            <div class="inline-flex items-center gap-2 bg-dior-gold/10 rounded-full px-4 py-1.5 mb-4">
                <i class="ri-user-star-line text-dior-gold text-sm"></i>
                <span class="text-dior-gold text-xs font-medium">个人中心</span>
            </div>
            <h1 class="text-2xl font-bold text-lv-brown mb-1">我的主页</h1>
            <p class="text-lv-brown/50 text-sm">查看你的账号数据和增长概况</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
            <!-- 左侧：用户信息卡片 -->
            <div class="lg:col-span-1 space-y-6">
                <!-- 用户基本信息 -->
                <div class="bg-white rounded-2xl border border-dior-gold/10 overflow-hidden fade-in fade-in-delay-1">
                    <div class="bg-gradient-to-br from-lv-brown to-lv-brown-dark p-6 text-center relative overflow-hidden">
                        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 50% 30%, rgba(169,149,99,0.4) 0%, transparent 60%);"></div>
                        <div class="relative z-10">
                            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-dior-gold/30 to-dior-gold/10 flex items-center justify-center mx-auto mb-4 border-4 border-dior-gold/20">
                                <span class="text-5xl">${personaData.avatar}</span>
                            </div>
                            <h2 class="text-xl font-bold text-cream mb-1">${personaData.nickname}</h2>
                            <p class="text-cream/50 text-sm">@xiaomei_share</p>
                            <div class="flex items-center justify-center gap-2 mt-3">
                                <span class="text-xs bg-dior-gold/20 text-dior-gold px-3 py-1 rounded-full font-medium">${personaData.niche}</span>
                                <span class="text-xs bg-cream/10 text-cream/60 px-3 py-1 rounded-full">${personaData.platform}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 space-y-3">
                        <div class="flex items-center justify-between py-2 border-b border-dior-gold/8">
                            <span class="text-sm text-lv-brown/50 flex items-center gap-2"><i class="ri-palette-line text-dior-gold/60"></i>风格</span>
                            <span class="text-sm font-medium text-lv-brown">${personaData.style}</span>
                        </div>
                        <div class="flex items-center justify-between py-2 border-b border-dior-gold/8">
                            <span class="text-sm text-lv-brown/50 flex items-center gap-2"><i class="ri-emotion-happy-line text-dior-gold/60"></i>语气</span>
                            <span class="text-sm font-medium text-lv-brown">${personaData.tone}</span>
                        </div>
                        <div class="py-2">
                            <span class="text-sm text-lv-brown/50 flex items-center gap-2 mb-1"><i class="ri-focus-3-line text-dior-gold/60"></i>目标受众</span>
                            <span class="text-sm text-lv-brown">${personaData.targetAudience}</span>
                        </div>
                    </div>
                </div>

                <!-- AI评分 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-5 fade-in fade-in-delay-2">
                    <div class="flex items-center gap-2 mb-4">
                        <i class="ri-robot-2-line text-dior-gold"></i>
                        <span class="text-sm font-bold text-lv-brown">AI综合评分</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="relative w-20 h-20">
                            <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(169,149,99,0.1)" stroke-width="6"/>
                                <circle cx="40" cy="40" r="32" fill="none" stroke="#A99563" stroke-width="6"
                                    stroke-dasharray="201" stroke-dashoffset="${201 - (201 * 92 / 100)}" stroke-linecap="round"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-2xl font-black text-dior-gold">92</span>
                            </div>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-lv-brown mb-1">优秀 · A级</div>
                            <p class="text-xs text-lv-brown/40 leading-relaxed">账号人设清晰，内容策略精准，增长势头强劲</p>
                        </div>
                    </div>
                </div>

                <!-- 快速操作 -->
                <div class="bg-lv-brown rounded-xl p-5 fade-in fade-in-delay-3">
                    <h3 class="font-semibold text-cream mb-3 text-sm flex items-center gap-2">
                        <i class="ri-flashlight-line text-dior-gold"></i>快速操作
                    </h3>
                    <div class="space-y-2">
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2.5 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-plan-btn">
                            <i class="ri-calendar-line text-dior-gold"></i>查看增长计划
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2.5 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-analytics-btn">
                            <i class="ri-bar-chart-2-line text-dior-gold"></i>数据分析
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2.5 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-review-btn">
                            <i class="ri-brain-line text-dior-gold"></i>智能复盘
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2.5 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-results-btn">
                            <i class="ri-trophy-line text-dior-gold"></i>增长结果
                        </button>
                    </div>
                </div>
            </div>

            <!-- 右侧：数据概览 -->
            <div class="lg:col-span-2 space-y-6">
                <!-- 核心数据概览 -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 fade-in fade-in-delay-1">
                    <div class="stat-card text-center">
                        <div class="text-dior-gold mb-2"><i class="ri-user-heart-line text-xl"></i></div>
                        <div class="text-2xl font-black text-lv-brown">${growthSummary.totalFollowers.toLocaleString()}</div>
                        <div class="text-xs text-lv-brown/40 mt-1">当前粉丝</div>
                        <div class="text-xs text-green-600 font-medium mt-1">↑ +${avgDailyGrowth}/天</div>
                    </div>
                    <div class="stat-card text-center">
                        <div class="text-dior-gold mb-2"><i class="ri-file-text-line text-xl"></i></div>
                        <div class="text-2xl font-black text-lv-brown">${totalContents}</div>
                        <div class="text-xs text-lv-brown/40 mt-1">发布内容</div>
                        <div class="text-xs text-lv-brown/30 mt-1">7天周期</div>
                    </div>
                    <div class="stat-card text-center">
                        <div class="text-dior-gold mb-2"><i class="ri-fire-line text-xl"></i></div>
                        <div class="text-2xl font-black text-lv-brown">${viralContents}</div>
                        <div class="text-xs text-lv-brown/40 mt-1">爆款内容</div>
                        <div class="text-xs text-green-600 font-medium mt-1">爆款率 ${growthSummary.viralRate}</div>
                    </div>
                    <div class="stat-card text-center">
                        <div class="text-dior-gold mb-2"><i class="ri-heart-pulse-line text-xl"></i></div>
                        <div class="text-2xl font-black text-lv-brown">${growthSummary.avgEngagement}</div>
                        <div class="text-xs text-lv-brown/40 mt-1">互动率</div>
                        <div class="text-xs text-green-600 font-medium mt-1">高于行业均值</div>
                    </div>
                </div>

                <!-- 7天增长曲线 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-2">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-bold text-lv-brown flex items-center gap-2">
                            <i class="ri-line-chart-line text-dior-gold"></i>最近7天增长趋势
                        </h3>
                        <span class="text-xs text-lv-brown/30">粉丝数</span>
                    </div>
                    <canvas id="profile-growth-chart" style="width:100%;height:240px;"></canvas>
                </div>

                <!-- 我的内容列表 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-3">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-bold text-lv-brown flex items-center gap-2">
                            <i class="ri-file-list-3-line text-dior-gold"></i>我的内容
                        </h3>
                        <button class="text-xs text-dior-gold hover:text-dior-gold/80 font-medium transition-colors" id="view-all-content">
                            查看全部 <i class="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                    <div class="space-y-3" id="content-list"></div>
                </div>

                <!-- 爆款内容 Top3 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-bold text-lv-brown flex items-center gap-2">
                            <i class="ri-fire-line text-dior-gold"></i>爆款内容 Top 3
                        </h3>
                    </div>
                    <div class="space-y-3" id="top-content-list"></div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(page);
    renderFooter(container);

    // 渲染内容列表
    const contentList = page.querySelector('#content-list');
    growthPlan.slice().reverse().forEach((day, i) => {
        if (i >= 5) return; // 只显示最近5条
        const dailyGrowth = day.followers - (day.day > 1 ? growthPlan[day.day - 2].followers : 0);
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 p-3 rounded-lg hover:bg-cream/50 transition-colors cursor-pointer group';
        item.innerHTML = `
            <div class="w-10 h-10 rounded-lg ${day.tag === 'hot' ? 'bg-gradient-to-br from-red-400 to-orange-400' : 'bg-gradient-to-br from-dior-gold/20 to-dior-gold/10'} flex items-center justify-center flex-shrink-0">
                <span class="text-sm ${day.tag === 'hot' ? 'text-white' : 'text-dior-gold'} font-bold">D${day.day}</span>
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-lv-brown truncate group-hover:text-dior-gold transition-colors">${day.contentTitle.slice(1, -1)}</div>
                <div class="flex items-center gap-3 text-xs text-lv-brown/40 mt-1">
                    <span>${day.contentType}</span>
                    <span>${day.date}</span>
                    <span class="flex items-center gap-0.5"><i class="ri-eye-line"></i>${day.views.toLocaleString()}</span>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <div class="text-sm font-bold ${dailyGrowth > 100 ? 'text-green-600' : 'text-lv-brown'}">+${dailyGrowth}</div>
                <div class="text-xs text-lv-brown/30">粉丝</div>
            </div>
            <i class="ri-arrow-right-s-line text-lv-brown/20 group-hover:text-dior-gold transition-colors"></i>
        `;
        item.addEventListener('click', () => router.navigate(`/content?day=${day.day}`));
        contentList.appendChild(item);
    });

    // 渲染Top3爆款
    const topList = page.querySelector('#top-content-list');
    topContents.forEach((content, i) => {
        const rankColors = ['bg-gradient-to-br from-yellow-400 to-yellow-600', 'bg-gradient-to-br from-gray-300 to-gray-500', 'bg-gradient-to-br from-amber-600 to-amber-800'];
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 p-3 rounded-lg hover:bg-cream/50 transition-colors cursor-pointer group';
        item.innerHTML = `
            <div class="w-8 h-8 rounded-full ${rankColors[i]} flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">${content.rank}</span>
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-lv-brown truncate group-hover:text-dior-gold transition-colors">${content.title}</div>
                <div class="flex items-center gap-3 text-xs text-lv-brown/40 mt-1">
                    <span>Day ${content.day}</span>
                    <span class="flex items-center gap-0.5"><i class="ri-eye-line"></i>${(content.views / 1000).toFixed(1)}K</span>
                    <span class="flex items-center gap-0.5"><i class="ri-heart-line"></i>${content.likes.toLocaleString()}</span>
                    <span class="flex items-center gap-0.5"><i class="ri-user-add-line"></i>+${content.followers}</span>
                </div>
            </div>
            <span class="text-xs font-bold ${content.grade === 'A+' ? 'text-dior-gold bg-dior-gold/10' : 'text-green-600 bg-green-50'} px-2 py-0.5 rounded">${content.grade}</span>
        `;
        item.addEventListener('click', () => router.navigate(`/content?day=${content.day}`));
        topList.appendChild(item);
    });

    // 绘制增长图表
    requestAnimationFrame(() => {
        const chartCanvas = page.querySelector('#profile-growth-chart');
        if (chartCanvas) {
            drawLineChart(chartCanvas, null, {
                labels: followerGrowthData.labels,
                values: followerGrowthData.values,
                color: '#A99563',
                fillColor: 'rgba(169, 149, 99, 0.1)',
                showValues: true,
                showDots: true,
            });
        }
    });

    // 绑定事件
    page.querySelector('#go-plan-btn').addEventListener('click', () => router.navigate('/plan'));
    page.querySelector('#go-analytics-btn').addEventListener('click', () => router.navigate('/analytics'));
    page.querySelector('#go-review-btn').addEventListener('click', () => router.navigate('/review'));
    page.querySelector('#go-results-btn').addEventListener('click', () => router.navigate('/results'));
    page.querySelector('#view-all-content').addEventListener('click', () => router.navigate('/plan'));
}
