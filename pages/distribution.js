// 分发策略页
import { router } from '../router.js';
import { distributionStrategy } from '../data.js';
import { renderNavbar, renderDashboard, renderFooter, renderAIExplain } from '../components.js';

export function renderDistribution(container) {
    renderNavbar(container, 'distribution');
    renderDashboard(container);

    const page = document.createElement('div');
    page.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6';

    page.innerHTML = `
        <div class="mb-8 fade-in">
            <h1 class="text-2xl font-bold text-lv-brown mb-1">智能分发策略</h1>
            <p class="text-lv-brown/50 text-sm">AI根据内容特征和平台算法，为你制定最优分发方案</p>
        </div>

        ${renderAIExplain('分发策略基于各平台的用户活跃时段、内容偏好和算法权重综合计算。小红书作为主阵地，图文+视频双轨并行效果最佳；抖音作为辅助渠道复用视频内容；微博用于话题引流；B站做长尾布局。建议将80%精力投入小红书。')}

        <!-- 平台策略卡片 -->
        <div class="grid lg:grid-cols-2 gap-6 mb-8" id="platform-cards"></div>

        <!-- 发布时间热力图 -->
        <div class="bg-white rounded-xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-3">
            <h3 class="font-semibold text-lv-brown mb-4 flex items-center gap-2">
                <i class="ri-time-line text-dior-gold"></i>最佳发布时间分析
            </h3>
            <div class="overflow-x-auto">
                <div class="min-w-[600px]" id="heatmap-container"></div>
            </div>
            <div class="flex items-center gap-4 mt-4 text-xs text-lv-brown/40">
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-dior-gold/10"></span>低活跃</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-dior-gold/40"></span>中活跃</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-dior-gold/70"></span>高活跃</span>
                <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-dior-gold"></span>最佳时段</span>
            </div>
        </div>

        <!-- 话题标签推荐 -->
        <div class="bg-white rounded-xl border border-dior-gold/10 p-6 mb-8 fade-in fade-in-delay-4">
            <h3 class="font-semibold text-lv-brown mb-4 flex items-center gap-2">
                <i class="ri-hashtag text-dior-gold"></i>热门话题标签推荐
            </h3>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" id="hashtag-grid"></div>
        </div>

        <!-- 底部导航 -->
        <div class="flex items-center justify-between">
            <button class="btn-secondary text-sm" id="back-plan-btn"><i class="ri-arrow-left-line"></i>增长计划</button>
            <button class="btn-primary text-sm" id="go-analytics-btn">数据分析<i class="ri-arrow-right-line"></i></button>
        </div>
    `;

    container.appendChild(page);
    renderFooter(container);

    // 渲染平台卡片
    const platformCards = page.querySelector('#platform-cards');
    distributionStrategy.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = `bg-white rounded-xl border border-dior-gold/10 p-6 card-hover fade-in fade-in-delay-${i + 1}`;
        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                        <i class="${p.icon} text-dior-gold text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lv-brown">${p.platform}</h3>
                        <span class="text-xs ${p.priority === '主阵地' ? 'text-dior-gold font-semibold' : 'text-lv-brown/40'}">${p.priority}</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold ${p.score >= 80 ? 'text-green-600' : p.score >= 60 ? 'text-dior-gold' : 'text-lv-brown/40'}">${p.score}</div>
                    <div class="text-xs text-lv-brown/40">匹配度</div>
                </div>
            </div>
            <div class="space-y-3 mb-4">
                <div class="flex items-center gap-2 text-sm">
                    <i class="ri-time-line text-dior-gold/60 text-xs"></i>
                    <span class="text-lv-brown/50">最佳时段：</span>
                    <span class="text-lv-brown font-medium">${p.timing}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <i class="ri-file-list-line text-dior-gold/60 text-xs"></i>
                    <span class="text-lv-brown/50">内容格式：</span>
                    <span class="text-lv-brown font-medium">${p.format}</span>
                </div>
            </div>
            <div class="flex flex-wrap gap-1.5 mb-4">
                ${p.hashtags.map(h => `<span class="text-xs bg-cream px-2 py-0.5 rounded text-dior-gold">${h}</span>`).join('')}
            </div>
            <div class="pt-3 border-t border-dior-gold/8">
                <div class="flex items-start gap-2">
                    <i class="ri-robot-2-line text-dior-gold text-sm mt-0.5 flex-shrink-0"></i>
                    <p class="text-xs text-lv-brown/50 leading-relaxed">${p.reason}</p>
                </div>
            </div>
            <div class="mt-3">
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${p.score}%"></div>
                </div>
            </div>
        `;
        platformCards.appendChild(card);
    });

    // 渲染热力图
    const heatmapContainer = page.querySelector('#heatmap-container');
    renderHeatmap(heatmapContainer);

    // 渲染话题标签
    const hashtagGrid = page.querySelector('#hashtag-grid');
    const hashtags = [
        { tag: '#平价好物', heat: 98, trend: 'up' },
        { tag: '#美妆测评', heat: 92, trend: 'up' },
        { tag: '#多巴胺妆容', heat: 96, trend: 'up' },
        { tag: '#学生党必看', heat: 85, trend: 'stable' },
        { tag: '#口红试色', heat: 78, trend: 'up' },
        { tag: '#护肤分享', heat: 82, trend: 'stable' },
        { tag: '#平替推荐', heat: 90, trend: 'up' },
        { tag: '#化妆教程', heat: 88, trend: 'up' },
        { tag: '#好物分享', heat: 75, trend: 'stable' },
    ];
    hashtags.forEach(h => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-3 bg-cream/30 rounded-lg hover:bg-cream/60 transition-colors';
        item.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-dior-gold">${h.tag}</span>
                ${h.trend === 'up' ? '<i class="ri-arrow-up-s-fill text-green-500 text-xs"></i>' : '<i class="ri-subtract-line text-lv-brown/30 text-xs"></i>'}
            </div>
            <div class="flex items-center gap-2">
                <div class="w-16 h-1.5 bg-dior-gold/10 rounded-full overflow-hidden">
                    <div class="h-full bg-dior-gold rounded-full" style="width: ${h.heat}%"></div>
                </div>
                <span class="text-xs text-lv-brown/40 w-8 text-right">${h.heat}</span>
            </div>
        `;
        hashtagGrid.appendChild(item);
    });

    // 绑定事件
    page.querySelector('#back-plan-btn').addEventListener('click', () => router.navigate('/plan'));
    page.querySelector('#go-analytics-btn').addEventListener('click', () => router.navigate('/analytics'));
}

function renderHeatmap(container) {
    const hours = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    // 活跃度数据 (0-1)
    const data = [
        [0.1, 0.2, 0.4, 0.7, 0.3, 0.2, 0.5, 0.8, 0.6],
        [0.1, 0.2, 0.3, 0.6, 0.3, 0.2, 0.5, 0.9, 0.7],
        [0.1, 0.3, 0.5, 0.8, 0.4, 0.3, 0.6, 0.9, 0.6],
        [0.1, 0.2, 0.4, 0.7, 0.3, 0.2, 0.5, 0.8, 0.5],
        [0.2, 0.3, 0.5, 0.8, 0.4, 0.3, 0.7, 1.0, 0.8],
        [0.3, 0.4, 0.6, 0.7, 0.5, 0.4, 0.6, 0.9, 0.7],
        [0.3, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 1.0, 0.8],
    ];

    let html = '<div class="grid gap-1">';
    // 头部
    html += '<div class="grid gap-1" style="grid-template-columns: 40px repeat(9, 1fr);">';
    html += '<div></div>';
    hours.forEach(h => {
        html += `<div class="text-xs text-lv-brown/30 text-center py-1">${h}</div>`;
    });
    html += '</div>';

    days.forEach((day, di) => {
        html += '<div class="grid gap-1" style="grid-template-columns: 40px repeat(9, 1fr);">';
        html += `<div class="text-xs text-lv-brown/40 flex items-center">${day}</div>`;
        data[di].forEach(val => {
            const opacity = Math.max(0.08, val);
            html += `<div class="h-8 rounded" style="background: rgba(169, 149, 99, ${opacity})" title="活跃度: ${(val * 100).toFixed(0)}%"></div>`;
        });
        html += '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
}
