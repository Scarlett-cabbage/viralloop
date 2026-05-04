// ViralLoop 数据接入服务模块
// 三层架构：数据来源层 → 数据接入层 → AI分析层
// 支持模拟数据模式（Demo）和真实API接入模式（Connected）

// ========== 1️⃣ 数据来源层（Data Source Layer）==========

// 支持的平台配置
export const PLATFORMS = {
    xiaohongshu: {
        id: 'xiaohongshu',
        name: '小红书',
        icon: 'ri-book-2-line',
        color: '#ff2442',
        apiType: 'OAuth 2.0',
        apiEndpoint: 'https://open.xiaohongshu.com/api/v1',
        scopes: ['user.profile', 'content.read', 'analytics.read'],
        refreshInterval: 300000, // 5分钟
        webhookSupport: false,
    },
    douyin: {
        id: 'douyin',
        name: '抖音',
        icon: 'ri-tiktok-line',
        color: '#000000',
        apiType: 'OAuth 2.0',
        apiEndpoint: 'https://open.douyin.com/api/v2',
        scopes: ['user.info', 'video.data', 'fans.data'],
        refreshInterval: 300000,
        webhookSupport: true,
    },
};

// 统一数据结构
export class ContentMetrics {
    constructor(data = {}) {
        this.content_id = data.content_id || '';
        this.publish_time = data.publish_time || new Date().toISOString();
        this.platform = data.platform || 'xiaohongshu';
        this.title = data.title || '';
        this.views = data.views || 0;
        this.likes = data.likes || 0;
        this.comments = data.comments || 0;
        this.shares = data.shares || 0;
        this.followers_gained = data.followers_gained || 0;
        this.engagement_rate = data.engagement_rate || 0;
        this.timestamp = data.timestamp || Date.now();
    }
}

// ========== 2️⃣ 数据接入层（Data Ingestion Layer）==========

// 连接状态枚举
export const ConnectionStatus = {
    CONNECTED: 'connected',     // 🟢 已连接
    SYNCING: 'syncing',         // 🟡 同步中
    DISCONNECTED: 'disconnected', // 🔴 未授权
    ERROR: 'error',             // ⚠️ 错误
};

// 数据模式
export const DataMode = {
    DEMO: 'demo',       // 模拟数据
    LIVE: 'live',       // 实时数据
};

class DataSyncService {
    constructor() {
        this.mode = DataMode.DEMO; // 默认Demo模式
        this.connections = {};     // 平台连接状态
        this.cache = new Map();    // 数据缓存
        this.lastSync = {};        // 上次同步时间
        this.listeners = [];       // 数据更新监听器
        this.pollingTimers = {};   // 轮询定时器
        this.syncHistory = [];     // 同步历史记录
        this._driftCounter = 0;    // 数据漂移计数器（模拟实时变化）
        this._snapshotHistory = []; // 数据快照历史（用于趋势追踪）
        this._autoRefreshTimer = null; // 前端自动刷新定时器
        this._startTime = Date.now(); // 服务启动时间

        // 初始化平台连接状态
        Object.keys(PLATFORMS).forEach(pid => {
            this.connections[pid] = {
                status: ConnectionStatus.DISCONNECTED,
                lastSync: null,
                error: null,
                tokenExpiry: null,
            };
        });

        // Demo模式下自动"连接"小红书
        this._initDemoMode();
    }

    // 初始化Demo模式
    _initDemoMode() {
        this.connections.xiaohongshu = {
            status: ConnectionStatus.CONNECTED,
            lastSync: new Date(Date.now() - 120000), // 2分钟前
            error: null,
            tokenExpiry: new Date(Date.now() + 86400000),
        };
        this.connections.douyin = {
            status: ConnectionStatus.DISCONNECTED,
            lastSync: null,
            error: null,
            tokenExpiry: null,
        };
    }

    // ===== OAuth授权模块 =====

    // 发起OAuth授权
    async initiateOAuth(platformId) {
        const platform = PLATFORMS[platformId];
        if (!platform) throw new Error(`不支持的平台: ${platformId}`);

        // 模拟OAuth流程
        this.connections[platformId].status = ConnectionStatus.SYNCING;
        this._notifyListeners('auth_start', { platform: platformId });

        return new Promise((resolve) => {
            setTimeout(() => {
                this.connections[platformId] = {
                    status: ConnectionStatus.CONNECTED,
                    lastSync: new Date(),
                    error: null,
                    tokenExpiry: new Date(Date.now() + 86400000),
                };
                this._notifyListeners('auth_success', { platform: platformId });
                this._addSyncHistory(platformId, 'OAuth授权成功');
                resolve({ success: true, platform: platformId });
            }, 2000);
        });
    }

    // 断开连接
    disconnectPlatform(platformId) {
        this.connections[platformId] = {
            status: ConnectionStatus.DISCONNECTED,
            lastSync: null,
            error: null,
            tokenExpiry: null,
        };
        this.stopPolling(platformId);
        this._notifyListeners('disconnected', { platform: platformId });
    }

    // ===== API请求调度器 =====

    // 拉取内容数据（模拟）
    async fetchContentMetrics(platformId, contentIds = []) {
        const conn = this.connections[platformId];
        if (conn.status !== ConnectionStatus.CONNECTED) {
            throw new Error(`平台 ${platformId} 未连接`);
        }

        conn.status = ConnectionStatus.SYNCING;
        this._notifyListeners('sync_start', { platform: platformId });

        return new Promise((resolve) => {
            // 模拟API延迟
            const delay = 800 + Math.random() * 1200;
            setTimeout(() => {
                this._driftCounter++;
                const metrics = this._generateMockMetrics(platformId);
                
                // 缓存数据
                metrics.forEach(m => {
                    this.cache.set(`${platformId}:${m.content_id}`, m);
                });

                // 保存快照（最多保留20条）
                this._snapshotHistory.push({
                    timestamp: Date.now(),
                    platform: platformId,
                    totalViews: metrics.reduce((s, m) => s + m.views, 0),
                    totalLikes: metrics.reduce((s, m) => s + m.likes, 0),
                    totalFollowers: metrics.reduce((s, m) => s + m.followers_gained, 0),
                });
                if (this._snapshotHistory.length > 20) this._snapshotHistory.shift();

                conn.status = ConnectionStatus.CONNECTED;
                conn.lastSync = new Date();
                this.lastSync[platformId] = Date.now();

                this._addSyncHistory(platformId, `同步${metrics.length}条内容数据`);
                this._notifyListeners('sync_complete', { platform: platformId, data: metrics });

                resolve(metrics);
            }, delay);
        });
    }

    // 获取账号概览数据
    async fetchAccountOverview(platformId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    platform: platformId,
                    followers: 1024 + Math.floor(Math.random() * 20),
                    following: 156,
                    totalPosts: 7,
                    totalViews: 108420 + Math.floor(Math.random() * 500),
                    totalLikes: 5193 + Math.floor(Math.random() * 50),
                    avgEngagement: (6.3 + (Math.random() * 0.4 - 0.2)).toFixed(1) + '%',
                    timestamp: Date.now(),
                });
            }, 600);
        });
    }

    // ===== 数据标准化处理器 =====

    _generateMockMetrics(platformId) {
        const baseData = [
            { content_id: 'c001', title: '大家好！我是小美', views: 580, likes: 45, comments: 8, shares: 3, followers_gained: 12 },
            { content_id: 'c002', title: '月薪3000也能用的5款神仙水乳', views: 2340, likes: 156, comments: 42, shares: 18, followers_gained: 26 },
            { content_id: 'c003', title: '被骗了3年！这些大牌平替', views: 8900, likes: 423, comments: 89, shares: 56, followers_gained: 89 },
            { content_id: 'c004', title: '2026春夏必入的10支口红色号', views: 5600, likes: 312, comments: 67, shares: 34, followers_gained: 88 },
            { content_id: 'c005', title: '全网都在抢的多巴胺腮红', views: 45000, likes: 2156, comments: 456, shares: 289, followers_gained: 368 },
            { content_id: 'c006', title: '多巴胺妆容教程来了', views: 28000, likes: 1234, comments: 278, shares: 156, followers_gained: 229 },
            { content_id: 'c007', title: '从0到1000粉！7天复盘', views: 18000, likes: 867, comments: 198, shares: 123, followers_gained: 212 },
        ];

        // 基于漂移计数器产生渐进式数据变化（模拟真实数据增长）
        const drift = this._driftCounter;
        return baseData.map(d => {
            // 每次同步，数据都会有微小的正向增长（模拟真实场景）
            const viewGrowth = Math.floor(d.views * 0.002 * drift + Math.random() * d.views * 0.01);
            const likeGrowth = Math.floor(d.likes * 0.001 * drift + Math.random() * d.likes * 0.005);
            const commentGrowth = Math.floor(Math.random() * 2 * (1 + drift * 0.1));
            const shareGrowth = Math.floor(Math.random() * 1.5 * (1 + drift * 0.05));

            return new ContentMetrics({
                ...d,
                platform: platformId,
                publish_time: new Date(2026, 3, 20 + parseInt(d.content_id.slice(-1))).toISOString(),
                views: d.views + viewGrowth,
                likes: d.likes + likeGrowth,
                comments: d.comments + commentGrowth,
                shares: d.shares + shareGrowth,
                engagement_rate: parseFloat(((d.likes + likeGrowth + d.comments + commentGrowth + d.shares + shareGrowth) / (d.views + viewGrowth) * 100).toFixed(2)),
                timestamp: Date.now(),
            });
        });
    }

    // ===== 轮询机制 =====

    startPolling(platformId, intervalMs = 30000) {
        this.stopPolling(platformId);
        
        const poll = async () => {
            try {
                await this.fetchContentMetrics(platformId);
            } catch (e) {
                console.warn(`轮询失败 [${platformId}]:`, e.message);
            }
        };

        // 立即执行一次
        poll();
        this.pollingTimers[platformId] = setInterval(poll, intervalMs);
    }

    stopPolling(platformId) {
        if (this.pollingTimers[platformId]) {
            clearInterval(this.pollingTimers[platformId]);
            delete this.pollingTimers[platformId];
        }
    }

    // ===== 实时统计数据（供仪表盘使用） =====

    getRealtimeStats() {
        const allData = this.getAllCachedData('xiaohongshu');
        if (allData.length === 0) {
            return {
                totalViews: 108420,
                totalLikes: 5193,
                totalComments: 1038,
                totalShares: 623,
                totalFollowers: 1024,
                avgEngagement: 6.3,
                contentCount: 7,
                lastUpdate: this.getLastSyncTime('xiaohongshu'),
                dataAge: this.getTimeSinceLastSync('xiaohongshu'),
            };
        }
        const totalViews = allData.reduce((s, m) => s + m.views, 0);
        const totalLikes = allData.reduce((s, m) => s + m.likes, 0);
        const totalComments = allData.reduce((s, m) => s + m.comments, 0);
        const totalShares = allData.reduce((s, m) => s + m.shares, 0);
        const totalFollowers = allData.reduce((s, m) => s + m.followers_gained, 0);
        const avgEngagement = totalViews > 0 ? ((totalLikes + totalComments + totalShares) / totalViews * 100) : 0;

        return {
            totalViews,
            totalLikes,
            totalComments,
            totalShares,
            totalFollowers,
            avgEngagement: parseFloat(avgEngagement.toFixed(1)),
            contentCount: allData.length,
            lastUpdate: this.getLastSyncTime('xiaohongshu'),
            dataAge: this.getTimeSinceLastSync('xiaohongshu'),
        };
    }

    // 获取数据快照历史（用于迷你趋势图）
    getSnapshotHistory() {
        return this._snapshotHistory;
    }

    // 获取服务运行时长
    getUptime() {
        const diff = Date.now() - this._startTime;
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        if (mins > 0) return `${mins}分${secs}秒`;
        return `${secs}秒`;
    }

    // ===== 前端自动刷新控制 =====

    startAutoRefresh(intervalMs = 30000, callback = null) {
        this.stopAutoRefresh();
        this._autoRefreshTimer = setInterval(async () => {
            // 自动同步所有已连接平台
            for (const pid of Object.keys(PLATFORMS)) {
                if (this.isConnected(pid)) {
                    try {
                        await this.fetchContentMetrics(pid);
                    } catch (e) {
                        console.warn(`自动刷新失败 [${pid}]:`, e.message);
                    }
                }
            }
            if (callback) callback(this.getRealtimeStats());
        }, intervalMs);
    }

    stopAutoRefresh() {
        if (this._autoRefreshTimer) {
            clearInterval(this._autoRefreshTimer);
            this._autoRefreshTimer = null;
        }
    }

    // ===== 事件监听 =====

    onDataUpdate(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    _notifyListeners(event, data) {
        this.listeners.forEach(cb => cb(event, data));
    }

    // ===== 同步历史 =====

    _addSyncHistory(platformId, action) {
        this.syncHistory.unshift({
            platform: platformId,
            action,
            timestamp: new Date(),
        });
        if (this.syncHistory.length > 50) this.syncHistory.pop();
    }

    // ===== 工具方法 =====

    getConnectionStatus(platformId) {
        return this.connections[platformId]?.status || ConnectionStatus.DISCONNECTED;
    }

    getLastSyncTime(platformId) {
        return this.connections[platformId]?.lastSync;
    }

    getTimeSinceLastSync(platformId) {
        const lastSync = this.getLastSyncTime(platformId);
        if (!lastSync) return '从未同步';
        const diff = Date.now() - lastSync.getTime();
        if (diff < 60000) return `${Math.floor(diff / 1000)}秒前`;
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        return `${Math.floor(diff / 3600000)}小时前`;
    }

    isConnected(platformId) {
        return this.connections[platformId]?.status === ConnectionStatus.CONNECTED;
    }

    isSyncing(platformId) {
        return this.connections[platformId]?.status === ConnectionStatus.SYNCING;
    }

    getDataMode() {
        return this.mode;
    }

    getDataModeLabel() {
        return this.mode === DataMode.LIVE ? '实时数据（Connected）' : '模拟数据（Demo）';
    }

    getDataModeIcon() {
        return this.mode === DataMode.LIVE ? '🟢' : '🔵';
    }

    getCachedData(platformId, contentId) {
        return this.cache.get(`${platformId}:${contentId}`);
    }

    getAllCachedData(platformId) {
        const results = [];
        this.cache.forEach((v, k) => {
            if (k.startsWith(platformId + ':')) results.push(v);
        });
        return results;
    }
}

// ========== 3️⃣ AI分析层（AI Insight Layer）==========

class AIAnalysisEngine {
    constructor(syncService) {
        this.syncService = syncService;
    }

    // 内容表现评估
    evaluateContent(metrics) {
        const score = this._calculateScore(metrics);
        let verdict, level;
        if (score >= 90) { verdict = '🔥 爆款'; level = 'excellent'; }
        else if (score >= 75) { verdict = '✅ 优秀'; level = 'good'; }
        else if (score >= 60) { verdict = '📊 正常'; level = 'normal'; }
        else { verdict = '⚠️ 待优化'; level = 'low'; }

        return { score, verdict, level };
    }

    // 问题诊断
    diagnoseIssues(metrics) {
        const issues = [];
        const engRate = (metrics.likes + metrics.comments + metrics.shares) / metrics.views * 100;

        if (engRate < 3) {
            issues.push({
                type: 'low_engagement',
                severity: 'high',
                title: '互动率偏低',
                detail: `当前互动率 ${engRate.toFixed(1)}%，低于行业均值3%`,
                suggestion: '建议在内容中增加互动引导，如提问、投票等',
            });
        }

        if (metrics.views > 5000 && metrics.followers_gained / metrics.views < 0.005) {
            issues.push({
                type: 'low_conversion',
                severity: 'medium',
                title: '转粉率偏低',
                detail: `高曝光但转粉率仅 ${(metrics.followers_gained / metrics.views * 100).toFixed(2)}%`,
                suggestion: '建议强化CTA引导，在内容结尾增加关注理由',
            });
        }

        if (metrics.comments < metrics.likes * 0.05) {
            issues.push({
                type: 'low_comments',
                severity: 'low',
                title: '评论互动不足',
                detail: '评论数远低于点赞数，说明内容缺乏讨论性',
                suggestion: '建议在内容中植入争议性话题或选择题',
            });
        }

        return issues;
    }

    // 生成优化建议
    generateSuggestions(metrics, historicalData = []) {
        const suggestions = [];
        const engRate = (metrics.likes + metrics.comments + metrics.shares) / metrics.views * 100;

        if (engRate > 5) {
            suggestions.push({
                type: 'positive',
                icon: 'ri-thumb-up-line',
                text: `互动率 ${engRate.toFixed(1)}% 表现优秀，建议保持当前内容风格`,
            });
        }

        if (metrics.views > 10000) {
            suggestions.push({
                type: 'opportunity',
                icon: 'ri-lightbulb-line',
                text: '高曝光内容，建议趁热打铁发布续集或相关内容',
            });
        }

        suggestions.push({
            type: 'timing',
            icon: 'ri-time-line',
            text: '数据显示20:00-22:00发布效果最佳，建议固定此时段',
        });

        return suggestions;
    }

    _calculateScore(metrics) {
        const viewScore = Math.min(metrics.views / 50000 * 40, 40);
        const engScore = Math.min(((metrics.likes + metrics.comments + metrics.shares) / Math.max(metrics.views, 1)) * 100 * 6, 35);
        const followScore = Math.min(metrics.followers_gained / 400 * 25, 25);
        return Math.round(viewScore + engScore + followScore);
    }
}

// ========== 导出单例 ==========

export const syncService = new DataSyncService();
export const aiEngine = new AIAnalysisEngine(syncService);

// 便捷方法
export function getConnectionStatusInfo(platformId) {
    const status = syncService.getConnectionStatus(platformId);
    const statusMap = {
        [ConnectionStatus.CONNECTED]: { icon: '🟢', label: '已连接', color: 'text-green-400', bgColor: 'bg-green-500/10' },
        [ConnectionStatus.SYNCING]: { icon: '🟡', label: '同步中', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
        [ConnectionStatus.DISCONNECTED]: { icon: '🔴', label: '未授权', color: 'text-red-400', bgColor: 'bg-red-500/10' },
        [ConnectionStatus.ERROR]: { icon: '⚠️', label: '错误', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    };
    return statusMap[status] || statusMap[ConnectionStatus.DISCONNECTED];
}

export function formatLastSync(platformId) {
    return syncService.getTimeSinceLastSync(platformId);
}

// 便捷方法：渲染数据来源标签HTML
export function renderDataSourceTag(isConnected = false) {
    if (isConnected) {
        return `<span class="data-source-tag connected"><span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span> Live</span>`;
    }
    return `<span class="data-source-tag">Demo</span>`;
}

// 便捷方法：渲染同步状态指示器HTML
export function renderSyncStatusIndicator(platformId) {
    const status = syncService.getConnectionStatus(platformId);
    const info = getConnectionStatusInfo(platformId);
    const lastSync = formatLastSync(platformId);
    return `
        <div class="sync-status-indicator">
            <span class="sync-dot ${status}">${info.icon}</span>
            <span class="sync-label">${info.label}</span>
            ${status === ConnectionStatus.CONNECTED ? `<span class="sync-time">${lastSync}</span>` : ''}
        </div>
    `;
}