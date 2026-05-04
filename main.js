// ViralLoop 主入口文件 - 重构版
import { router } from './router.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderPlan } from './pages/plan.js';
import { renderCreate } from './pages/create.js';
import { renderAnalytics } from './pages/analytics.js';
import { renderReview } from './pages/review.js';
import { renderResults } from './pages/results.js';
import { renderPersona } from './pages/persona.js';

// 初始化应用
function initApp() {
    const app = document.getElementById('app');
    if (!app) return;

    // 初始化路由
    router.init(app);

    // 注册路由（新六大模块）
    router.register('/', (container) => renderDashboard(container));
    router.register('/persona', (container) => renderPersona(container));
    router.register('/plan', (container) => renderPlan(container));
    router.register('/create', (container, params) => renderCreate(container, params));
    router.register('/content', (container, params) => renderCreate(container, params)); // 兼容旧路由
    router.register('/analytics', (container) => renderAnalytics(container));
    router.register('/review', (container) => renderReview(container));
    router.register('/results', (container) => renderResults(container));

    // 处理初始路由
    router.handleRoute();
}

// 启动
document.addEventListener('DOMContentLoaded', initApp);
if (document.readyState !== 'loading') {
    initApp();
}