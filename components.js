// ViralLoop 公共组件模块 - 重构版
// 统一导航体系 + 面包屑 + 页面头部 + 下一步引导
import { router } from './router.js';
import { followerGrowthData, personaData } from './data.js';

// ========== 导航项配置（新六大模块） ==========
const NAV_ITEMS = [
    { key: 'dashboard', icon: 'ri-dashboard-3-line', label: '首页', path: '/' },
    { key: 'persona', icon: 'ri-user-star-line', label: '人设定制', path: '/persona' },
    { key: 'plan', icon: 'ri-calendar-line', label: '增长计划', path: '/plan' },
    { key: 'create', icon: 'ri-edit-box-line', label: '内容创作', path: '/create' },
    { key: 'analytics', icon: 'ri-bar-chart-2-line', label: '数据分析', path: '/analytics' },
    { key: 'review', icon: 'ri-brain-line', label: '智能复盘', path: '/review' },
    { key: 'results', icon: 'ri-trophy-line', label: '增长结果', path: '/results' },
];

// ========== 页面配置（标题、说明、面包屑） ==========
export const PAGE_CONFIG = {
    dashboard: {
        title: '增长驾驶舱',
        subtitle: '全局概览你的增长状态，快速了解当前进度',
        icon: 'ri-dashboard-3-line',
        breadcrumb: [{ label: '首页', path: '/' }],
    },
    persona: {
        title: '人设定制',
        subtitle: '选择你的内容定位，AI将为你生成专属增长路径',
        icon: 'ri-user-star-line',
        breadcrumb: [{ label: '首页', path: '/' }, { label: '人设定制' }],
    },
    plan: {
        title: '增长计划',
        subtitle: '7天增长路线图，每日任务与内容规划',
        icon: 'ri-calendar-line',
        breadcrumb: [{ label: '首页', path: '/' }, { label: '增长计划' }],
    },
    create: {
        title: '内容创作',
        subtitle: 'AI辅助内容编辑，实时优化建议',
        icon: 'ri-edit-box-line',
        breadcrumb: [{ label: '首页', path: '/' }, { label: '增长计划', path: '/plan' }, { label: '内容创作' }],
    },
    analytics: {
        title: '数据分析',
        subtitle: '全维度数据监控，AI驱动增长决策',
        icon: 'ri-bar-chart-2-line',
        breadcrumb: [{ label: '首页', path: '/' }, { label: '数据分析' }],
    },
    review: {
        title: '智能复盘',
        subtitle: '深度分析内容表现，给出精准策略建议',
        icon: 'ri-brain-line',
        breadcrumb: [{ label: '首页', path: '/' }, { label: '智能复盘' }],
    },
    results: {
        title: '增长结果',
        subtitle: '7天增长成果展示，里程碑达成回顾',
        icon: 'ri-trophy-line',
        breadcrumb: [{ label: '首页', path: '/' }, { label: '增长结果' }],
    },
};

// ========== 用户动线（下一步引导配置） ==========
export const NEXT_STEP_CONFIG = {
    dashboard: { label: '定制我的人设', icon: 'ri-user-star-line', path: '/persona' },
    persona: { label: '查看增长计划', icon: 'ri-calendar-line', path: '/plan' },
    plan: { label: '开始创作内容', icon: 'ri-edit-box-line', path: '/create' },
    create: { label: '查看数据分析', icon: 'ri-bar-chart-2-line', path: '/analytics' },
    analytics: { label: '查看智能复盘', icon: 'ri-brain-line', path: '/review' },
    review: { label: '查看增长结果', icon: 'ri-trophy-line', path: '/results' },
    results: { label: '返回增长计划', icon: 'ri-restart-line', path: '/plan' },
};

// ========== 统一顶部导航栏（浅色主题） ==========
export function renderNavbar(container, activePage = '') {
    const nav = document.createElement('nav');
    nav.className = 'vl-navbar sticky top-0 z-50 glass nav-global';
    nav.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-14">
                <div class="flex items-center gap-3 cursor-pointer flex-shrink-0" id="nav-logo">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center">
                        <i class="ri-rocket-2-fill text-white text-sm"></i>
                    </div>
                    <span class="text-base font-bold text-lv-brown hidden sm:inline">Viral<span class="gradient-text">Loop</span></span>
                </div>
                <div class="hidden lg:flex items-center gap-0.5 overflow-x-auto nav-tabs-wrapper" id="nav-links">
                    ${NAV_ITEMS.map(item => `
                        <span class="nav-link ${activePage === item.key ? 'active' : ''}" data-page="${item.key}" data-path="${item.path}">
                            <i class="${item.icon} mr-1 text-xs"></i>${item.label}
                        </span>
                    `).join('')}
                </div>
                <div class="flex items-center gap-3 flex-shrink-0">
                    <div class="nav-user-btn hidden sm:flex items-center gap-2 cursor-pointer" id="nav-user-btn">
                        <span class="text-xl">${personaData.avatar}</span>
                        <span class="text-sm font-medium text-lv-brown/70">${personaData.nickname}</span>
                    </div>
                    <button class="lg:hidden text-lv-brown p-1" id="mobile-menu-btn">
                        <i class="ri-menu-3-line text-xl"></i>
                    </button>
                </div>
            </div>
            <div class="hidden lg:hidden pb-3" id="mobile-menu">
                <div class="flex flex-col gap-1">
                    ${NAV_ITEMS.map(item => `
                        <span class="nav-link ${activePage === item.key ? 'active' : ''}" data-page="${item.key}" data-path="${item.path}">
                            <i class="${item.icon} mr-1"></i>${item.label}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    container.prepend(nav);

    // 绑定事件
    nav.querySelector('#nav-logo').addEventListener('click', () => router.navigate('/'));
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const path = link.dataset.path;
            router.navigate(path);
        });
    });
    const mobileBtn = nav.querySelector('#mobile-menu-btn');
    const mobileMenu = nav.querySelector('#mobile-menu');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ========== 深色主题导航栏 ==========
export function renderDarkNavbar(container, activePage = '') {
    const nav = document.createElement('nav');
    nav.className = 'dark-nav-global sticky top-0 z-50';
    nav.innerHTML = `
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6">
            <div class="flex items-center justify-between h-14">
                <div class="flex items-center gap-3 cursor-pointer flex-shrink-0" id="dark-nav-logo">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center">
                        <i class="ri-rocket-2-fill text-white text-sm"></i>
                    </div>
                    <span class="text-base font-bold text-cream/90 hidden sm:inline">Viral<span class="shimmer-text">Loop</span></span>
                </div>
                <div class="hidden lg:flex items-center gap-0.5 overflow-x-auto" id="dark-nav-links">
                    ${NAV_ITEMS.map(item => `
                        <span class="dark-nav-link ${activePage === item.key ? 'active' : ''}" data-page="${item.key}" data-path="${item.path}">
                            <i class="${item.icon} mr-1 text-xs"></i>${item.label}
                        </span>
                    `).join('')}
                </div>
                <div class="flex items-center gap-3 flex-shrink-0">
                    <div class="flex items-center gap-2 mr-2">
                        <div class="pulse-dot"></div>
                        <span class="text-xs text-green-400/70 font-medium hidden sm:inline">实时同步</span>
                    </div>
                    <div class="dark-nav-user-btn hidden sm:flex items-center gap-2 cursor-pointer" id="dark-nav-user-btn">
                        <span class="text-xl">${personaData.avatar}</span>
                        <span class="text-sm font-medium text-cream/60">${personaData.nickname}</span>
                    </div>
                    <button class="lg:hidden text-cream/60 p-1" id="dark-mobile-menu-btn">
                        <i class="ri-menu-3-line text-xl"></i>
                    </button>
                </div>
            </div>
            <div class="hidden lg:hidden pb-3" id="dark-mobile-menu">
                <div class="flex flex-col gap-1">
                    ${NAV_ITEMS.map(item => `
                        <span class="dark-nav-link ${activePage === item.key ? 'active' : ''}" data-page="${item.key}" data-path="${item.path}">
                            <i class="${item.icon} mr-1"></i>${item.label}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    container.prepend(nav);

    nav.querySelector('#dark-nav-logo').addEventListener('click', () => router.navigate('/'));
    nav.querySelectorAll('.dark-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const path = link.dataset.path;
            router.navigate(path);
        });
    });
    const mobileBtn = nav.querySelector('#dark-mobile-menu-btn');
    const mobileMenu = nav.querySelector('#dark-mobile-menu');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ========== 面包屑导航 ==========
export function renderBreadcrumb(container, pageKey, extraItems = []) {
    const config = PAGE_CONFIG[pageKey];
    if (!config) return;

    const items = [...config.breadcrumb, ...extraItems];
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'vl-breadcrumb fade-in';
    breadcrumb.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div class="flex items-center gap-2 text-sm">
                ${items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    if (isLast) {
                        return `<span class="vl-breadcrumb-current">${item.label}</span>`;
                    }
                    return `
                        <span class="vl-breadcrumb-link" data-path="${item.path || '/'}">${item.label}</span>
                        <i class="ri-arrow-right-s-line text-lv-brown/20 text-xs"></i>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    container.appendChild(breadcrumb);

    // 绑定面包屑点击
    breadcrumb.querySelectorAll('.vl-breadcrumb-link').forEach(link => {
        link.addEventListener('click', () => {
            router.navigate(link.dataset.path);
        });
    });
}

// ========== 深色面包屑 ==========
export function renderDarkBreadcrumb(container, pageKey, extraItems = []) {
    const config = PAGE_CONFIG[pageKey];
    if (!config) return;

    const items = [...config.breadcrumb, ...extraItems];
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'vl-breadcrumb-dark fade-in';
    breadcrumb.innerHTML = `
        <div class="max-w-[1440px] mx-auto px-6 py-3">
            <div class="flex items-center gap-2 text-sm">
                ${items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    if (isLast) {
                        return `<span class="text-cream/60 font-medium">${item.label}</span>`;
                    }
                    return `
                        <span class="text-cream/30 hover:text-dior-gold cursor-pointer transition-colors" data-path="${item.path || '/'}">${item.label}</span>
                        <i class="ri-arrow-right-s-line text-cream/15 text-xs"></i>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    container.appendChild(breadcrumb);

    breadcrumb.querySelectorAll('[data-path]').forEach(link => {
        link.addEventListener('click', () => {
            router.navigate(link.dataset.path);
        });
    });
}

// ========== 统一页面头部 ==========
export function renderPageHeader(container, pageKey, statusText = '') {
    const config = PAGE_CONFIG[pageKey];
    if (!config) return;

    const header = document.createElement('div');
    header.className = 'vl-page-header fade-in';
    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-lv-brown flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-dior-gold/15 to-dior-gold/5 flex items-center justify-center">
                            <i class="${config.icon} text-dior-gold text-lg"></i>
                        </div>
                        ${config.title}
                    </h1>
                    <p class="text-lv-brown/50 text-sm mt-1 ml-[52px]">${config.subtitle}</p>
                </div>
                ${statusText ? `
                    <div class="vl-status-badge">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-xs font-medium text-lv-brown/60">${statusText}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    container.appendChild(header);
}

// ========== 深色页面头部 ==========
export function renderDarkPageHeader(container, pageKey, statusText = '') {
    const config = PAGE_CONFIG[pageKey];
    if (!config) return;

    const header = document.createElement('div');
    header.className = 'vl-page-header-dark fade-in';
    header.innerHTML = `
        <div class="max-w-[1440px] mx-auto px-6 py-5">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-xl font-bold text-cream/90 flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-dior-gold/20 to-dior-gold/5 flex items-center justify-center">
                            <i class="${config.icon} text-dior-gold text-lg"></i>
                        </div>
                        ${config.title}
                    </h1>
                    <p class="text-cream/30 text-sm mt-1 ml-[52px]">${config.subtitle}</p>
                </div>
                ${statusText ? `
                    <div class="flex items-center gap-2 bg-cream/5 px-3 py-1.5 rounded-full">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span class="text-xs font-medium text-cream/50">${statusText}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    container.appendChild(header);
}

// ========== 下一步行动按钮 ==========
export function renderNextStep(container, pageKey, isDark = false) {
    const config = NEXT_STEP_CONFIG[pageKey];
    if (!config) return;

    // 获取上一步配置
    const pageOrder = ['dashboard', 'persona', 'plan', 'create', 'analytics', 'review', 'results'];
    const currentIndex = pageOrder.indexOf(pageKey);
    const prevKey = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
    const prevConfig = prevKey ? {
        label: PAGE_CONFIG[prevKey]?.title || '',
        path: NAV_ITEMS.find(n => n.key === prevKey)?.path || '/',
    } : null;

    const wrapper = document.createElement('div');
    wrapper.className = `vl-next-step ${isDark ? 'dark' : ''} fade-in`;
    wrapper.innerHTML = `
        <div class="${isDark ? 'max-w-[1440px]' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="vl-next-step-inner ${isDark ? 'dark' : ''}">
                <div class="flex items-center justify-between">
                    ${prevConfig ? `
                        <button class="${isDark ? 'dark-btn-secondary' : 'btn-secondary'} text-sm vl-prev-btn" data-path="${prevConfig.path}">
                            <i class="ri-arrow-left-line"></i>${prevConfig.label}
                        </button>
                    ` : '<div></div>'}
                    <div class="flex items-center gap-3">
                        <span class="text-xs ${isDark ? 'text-cream/30' : 'text-lv-brown/30'}">下一步</span>
                        <button class="${isDark ? 'dark-btn-primary' : 'btn-primary'} text-sm vl-next-btn" data-path="${config.path}">
                            <i class="${config.icon}"></i>${config.label}<i class="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.appendChild(wrapper);

    // 绑定事件
    const nextBtn = wrapper.querySelector('.vl-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => router.navigate(config.path));
    const prevBtn = wrapper.querySelector('.vl-prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => router.navigate(prevBtn.dataset.path));
}

// ========== 增长仪表盘组件 ==========
export function renderDashboard(container, compact = false) {
    const latestData = followerGrowthData;
    const currentFollowers = latestData.values[latestData.values.length - 1];
    const todayGrowth = latestData.dailyIncrease[latestData.dailyIncrease.length - 1];
    const growthRate = ((todayGrowth / (currentFollowers - todayGrowth)) * 100).toFixed(1);

    const wrapper = document.createElement('div');
    wrapper.className = compact ? 'mb-6' : 'mb-8';
    wrapper.innerHTML = `
        <div class="${compact ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="stat-card">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-lv-brown/50 font-medium">总粉丝数</span>
                        <i class="ri-user-heart-line text-dior-gold"></i>
                    </div>
                    <div class="text-2xl font-bold text-lv-brown number-roll">${currentFollowers.toLocaleString()}</div>
                    <div class="flex items-center gap-1 mt-1">
                        <i class="ri-arrow-up-s-fill text-green-500 text-sm"></i>
                        <span class="text-xs text-green-600 font-medium">+${todayGrowth} 今日</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-lv-brown/50 font-medium">增长率</span>
                        <i class="ri-line-chart-line text-dior-gold"></i>
                    </div>
                    <div class="text-2xl font-bold text-lv-brown number-roll">${growthRate}%</div>
                    <div class="flex items-center gap-1 mt-1">
                        <i class="ri-arrow-up-s-fill text-green-500 text-sm"></i>
                        <span class="text-xs text-green-600 font-medium">持续增长中</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-lv-brown/50 font-medium">内容互动率</span>
                        <i class="ri-heart-pulse-line text-dior-gold"></i>
                    </div>
                    <div class="text-2xl font-bold text-lv-brown number-roll">6.3%</div>
                    <div class="flex items-center gap-1 mt-1">
                        <i class="ri-arrow-up-s-fill text-green-500 text-sm"></i>
                        <span class="text-xs text-green-600 font-medium">高于行业均值</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-lv-brown/50 font-medium">AI优化次数</span>
                        <i class="ri-robot-2-line text-dior-gold"></i>
                    </div>
                    <div class="text-2xl font-bold text-lv-brown number-roll">23</div>
                    <div class="flex items-center gap-1 mt-1">
                        <span class="text-xs text-lv-brown/40 font-medium">累计优化建议</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.appendChild(wrapper);
}

// ========== AI决策解释组件 ==========
export function renderAIExplain(text) {
    return `<div class="ai-explain"><p class="text-sm text-lv-brown/70 leading-relaxed">${text}</p></div>`;
}

// ========== 爆款标签组件 ==========
export function renderTag(type) {
    const tags = {
        hot: '<span class="tag-hot">🔥 高潜力</span>',
        risk: '<span class="tag-risk">⚠️ 风险</span>',
        normal: '<span class="tag-normal">📊 稳定</span>',
    };
    return tags[type] || tags.normal;
}

// ========== 页脚组件 ==========
export function renderFooter(container) {
    const footer = document.createElement('footer');
    footer.className = 'py-8 mt-12';
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex items-center justify-center gap-2 mb-4">
                <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center">
                    <i class="ri-rocket-2-fill text-white text-sm"></i>
                </div>
                <span class="font-bold text-lv-brown">Viral<span class="gradient-text">Loop</span></span>
            </div>
            <p class="text-sm text-lv-brown/40 mb-2">AI驱动的增长闭环引擎 · 让每个人都能成为爆款创作者</p>
            <p>由 <a href="https://with.woa.com/" style="color: #8A2BE2;" target="_blank">With</a> 通过自然语言生成</p>
        </div>
    `;
    container.appendChild(footer);
}

// ========== 加载动画组件 ==========
export function renderLoading(text = 'AI正在分析中') {
    return `
        <div class="flex flex-col items-center justify-center py-20">
            <div class="loading-dots mb-4">
                <span></span><span></span><span></span>
            </div>
            <p class="text-sm text-lv-brown/50">${text}</p>
        </div>
    `;
}

// ========== 进度指示器 ==========
export function renderProgress(current, total) {
    const percent = (current / total) * 100;
    return `
        <div class="flex items-center gap-3">
            <div class="progress-bar flex-1">
                <div class="progress-bar-fill" style="width: ${percent}%"></div>
            </div>
            <span class="text-xs text-lv-brown/50 font-medium">${current}/${total}</span>
        </div>
    `;
}

// ========== 数据连接状态徽章组件 ==========
export function renderDataConnectionBadge(platformId, compact = false) {
    // 延迟导入避免循环依赖
    const badge = document.createElement('div');
    badge.className = `data-conn-badge ${compact ? 'compact' : ''}`;
    badge.innerHTML = `
        <span class="dcb-dot" id="dcb-dot-${platformId}"></span>
        <span class="dcb-label" id="dcb-label-${platformId}">检测中...</span>
    `;
    // 异步更新状态
    import('./data-service.js').then(({ syncService, getConnectionStatusInfo, formatLastSync }) => {
        const info = getConnectionStatusInfo(platformId);
        const connected = syncService.isConnected(platformId);
        const dot = badge.querySelector(`#dcb-dot-${platformId}`);
        const label = badge.querySelector(`#dcb-label-${platformId}`);
        if (dot) {
            dot.className = `dcb-dot ${connected ? 'connected' : 'disconnected'}`;
            dot.textContent = info.icon;
        }
        if (label) {
            label.textContent = connected ? `已连接 · ${formatLastSync(platformId)}` : '未连接';
            label.className = `dcb-label ${connected ? 'text-green-600' : 'text-lv-brown/40'}`;
        }
    });
    return badge;
}

// ========== 人设上下文条组件（页面顶部显示当前人设） ==========
export function renderPersonaContextBar(container) {
    // 延迟导入避免循环依赖
    import('./state.js').then(({ globalState }) => {
        const persona = globalState.getPersona();
        if (!persona) return;

        const bar = document.createElement('div');
        bar.className = 'persona-context-bar fade-in';
        bar.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between py-2">
                    <div class="flex items-center gap-3">
                        <span class="text-lg">${persona.emoji || '👤'}</span>
                        <div>
                            <span class="text-xs font-semibold text-lv-brown/70">当前人设：</span>
                            <span class="text-xs font-bold text-dior-gold">${persona.name}</span>
                        </div>
                        <div class="flex items-center gap-1.5 ml-2">
                            ${(persona.tags || []).slice(0, 3).map(t =>
                                `<span class="text-[10px] bg-dior-gold/8 text-dior-gold px-2 py-0.5 rounded-full">${t}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <button class="text-xs text-dior-gold/60 hover:text-dior-gold transition-colors flex items-center gap-1 persona-ctx-edit-btn">
                        <i class="ri-edit-line"></i>修改
                    </button>
                </div>
            </div>
        `;

        // 插入到导航栏之后
        const nav = container.querySelector('nav');
        if (nav && nav.nextSibling) {
            container.insertBefore(bar, nav.nextSibling);
        } else {
            container.appendChild(bar);
        }

        // 绑定修改按钮
        bar.querySelector('.persona-ctx-edit-btn')?.addEventListener('click', () => {
            router.navigate('/persona');
        });
    });
}

// ========== 紧凑型同步状态条组件 ==========
export function renderCompactSyncBar(container, isDark = false) {
    import('./data-service.js').then(({ syncService, PLATFORMS, getConnectionStatusInfo, formatLastSync }) => {
        const bar = document.createElement('div');
        bar.className = `compact-sync-bar ${isDark ? 'dark' : ''} fade-in`;
        
        const platforms = Object.keys(PLATFORMS).map(pid => {
            const p = PLATFORMS[pid];
            const info = getConnectionStatusInfo(pid);
            const connected = syncService.isConnected(pid);
            return `
                <div class="csb-platform">
                    <span class="csb-dot">${info.icon}</span>
                    <i class="${p.icon} csb-icon" style="color:${p.color === '#000000' ? (isDark ? 'rgba(252,245,226,0.6)' : '#592f23') : p.color}"></i>
                    <span class="csb-name">${p.name}</span>
                    <span class="csb-status">${connected ? formatLastSync(pid) : '未连接'}</span>
                </div>
            `;
        }).join('');

        const modeLabel = syncService.getDataMode() === 'live' ? '实时数据' : 'Demo数据';
        const modeIcon = syncService.getDataMode() === 'live' ? '🟢' : '🔵';

        bar.innerHTML = `
            <div class="${isDark ? 'max-w-[1440px]' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between py-1.5">
                    <div class="flex items-center gap-4">
                        <span class="csb-mode">${modeIcon} ${modeLabel}</span>
                        <div class="csb-divider"></div>
                        ${platforms}
                    </div>
                    <div class="csb-update">
                        <i class="ri-time-line"></i>
                        <span>Last updated: ${formatLastSync('xiaohongshu')}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(bar);
    });
}