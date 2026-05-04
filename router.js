// ViralLoop 路由管理模块
// 增强版SPA路由系统 - 支持页面过渡动画和路径感知

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.previousRoute = null;
        this.app = null;
        this.onRouteChange = null;
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    init(appElement) {
        this.app = appElement;
    }

    register(path, renderFn) {
        this.routes[path] = renderFn;
    }

    navigate(path) {
        window.location.hash = path;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, queryString] = hash.split('?');
        const params = {};
        
        if (queryString) {
            queryString.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                params[key] = decodeURIComponent(value);
            });
        }

        // 查找匹配的路由
        let matchedRoute = null;
        let routeParams = { ...params };

        for (const routePath in this.routes) {
            if (routePath === path) {
                matchedRoute = routePath;
                break;
            }
            const routeParts = routePath.split('/');
            const pathParts = path.split('/');
            if (routeParts.length === pathParts.length) {
                let match = true;
                for (let i = 0; i < routeParts.length; i++) {
                    if (routeParts[i].startsWith(':')) {
                        routeParams[routeParts[i].slice(1)] = pathParts[i];
                    } else if (routeParts[i] !== pathParts[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    matchedRoute = routePath;
                    break;
                }
            }
        }

        if (matchedRoute && this.routes[matchedRoute]) {
            this.previousRoute = this.currentRoute;
            this.currentRoute = path;
            if (this.app) {
                // 页面退出动画
                this.app.classList.add('page-exit');
                setTimeout(() => {
                    this.app.innerHTML = '';
                    this.app.classList.remove('page-exit');
                    this.app.classList.add('page-enter');
                    this.routes[matchedRoute](this.app, routeParams);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    setTimeout(() => {
                        this.app.classList.remove('page-enter');
                    }, 400);
                    if (this.onRouteChange) {
                        this.onRouteChange(path, this.previousRoute);
                    }
                }, 200);
            }
        } else {
            this.navigate('/');
        }
    }

    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }

    // 获取当前路由的页面key（用于导航高亮）
    getActivePageKey() {
        const path = this.getCurrentPath().split('?')[0];
        const keyMap = {
            '/': 'dashboard',
            '/persona': 'persona',
            '/plan': 'plan',
            '/content': 'create',
            '/create': 'create',
            '/analytics': 'analytics',
            '/review': 'review',
            '/results': 'results',
        };
        return keyMap[path] || '';
    }
}

export const router = new Router();
