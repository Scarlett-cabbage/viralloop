// ViralLoop 自动演示模式引擎（Demo Story Mode）
// 状态机驱动的7天增长全过程自动播放

export const DEMO_PHASES = {
    IDLE: 'idle',
    INTRO: 'intro',
    DAY1: 'day1',
    DAY2: 'day2',
    DAY3_PROBLEM: 'day3_problem',
    DAY3_AI_DETECT: 'day3_ai_detect',
    DAY3_AI_FIX: 'day3_ai_fix',
    DAY4_GROWTH: 'day4_growth',
    DAY5_EXPLOSION: 'day5_explosion',
    DAY6_STABLE: 'day6_stable',
    DAY7_MILESTONE: 'day7_milestone',
    FINALE: 'finale',
};

// 每个阶段的数据定义
export const PHASE_DATA = {
    [DEMO_PHASES.INTRO]: {
        label: '开场',
        day: 0,
        duration: 3000,
        title: '7天增长挑战',
        subtitle: '从0粉丝到1000+，AI全程驱动',
        followers: 0,
        views: 0,
        likes: 0,
        highlight: null,
        page: 'dashboard',
    },
    [DEMO_PHASES.DAY1]: {
        label: 'Day 1 · 冷启动',
        day: 1,
        duration: 4000,
        title: '账号初建 · 第一条内容发布',
        subtitle: '建立人设，发布自我介绍',
        followers: 5,
        views: 300,
        likes: 12,
        comments: 3,
        shares: 1,
        contentTitle: '大家好！我是小美，一个平价美妆测评博主',
        contentType: '图文',
        highlight: null,
        page: 'plan',
    },
    [DEMO_PHASES.DAY2]: {
        label: 'Day 2 · 内容试探',
        day: 2,
        duration: 4000,
        title: '第二条内容 · 数据平平',
        subtitle: '发布干货内容，数据表现一般',
        followers: 15,
        views: 500,
        likes: 28,
        comments: 5,
        shares: 2,
        contentTitle: '月薪3000也能用的5款神仙水乳',
        contentType: '图文',
        highlight: null,
        page: 'plan',
    },
    [DEMO_PHASES.DAY3_PROBLEM]: {
        label: 'Day 3 · 遇到瓶颈',
        day: 3,
        duration: 4500,
        title: '数据下滑 · 内容表现不佳',
        subtitle: '播放量下降，转粉率极低',
        followers: 18,
        views: 280,
        likes: 15,
        comments: 2,
        shares: 0,
        contentTitle: '被骗了3年！这些大牌平替居然只要29.9',
        contentType: '视频',
        highlight: 'problem',
        page: 'analytics',
        problems: [
            { icon: 'ri-alarm-warning-line', text: '开头3秒留存率仅12%，远低于行业均值35%' },
            { icon: 'ri-emotion-sad-line', text: '内容缺乏情绪共鸣，用户划走率高达88%' },
            { icon: 'ri-user-unfollow-line', text: '转粉率0.3%，低于健康值2%' },
        ],
    },
    [DEMO_PHASES.DAY3_AI_DETECT]: {
        label: 'Day 3 · AI诊断',
        day: 3,
        duration: 5000,
        title: 'AI正在分析问题...',
        subtitle: '深度诊断内容表现，定位核心问题',
        followers: 18,
        views: 280,
        likes: 15,
        highlight: 'ai_analyzing',
        page: 'review',
        analysis: {
            score: 32,
            issues: [
                { severity: 'high', title: '开头Hook缺乏冲击力', detail: '标题过于平淡，缺少数字和情绪词' },
                { severity: 'high', title: '内容节奏拖沓', detail: '前10秒无有效信息，用户注意力流失' },
                { severity: 'medium', title: '缺少互动引导', detail: '结尾无CTA，评论区互动率极低' },
            ],
        },
    },
    [DEMO_PHASES.DAY3_AI_FIX]: {
        label: 'Day 3 · AI优化',
        day: 3,
        duration: 5500,
        title: 'AI自动优化策略',
        subtitle: '修改标题、强化Hook、增加评论引导',
        followers: 18,
        views: 280,
        likes: 15,
        highlight: 'ai_fixing',
        page: 'review',
        optimizations: [
            {
                dimension: '标题优化',
                before: '被骗了3年！这些大牌平替居然只要29.9',
                after: '🤯 花了5000块测评！这5款29.9平替吊打大牌',
                improvement: '+180% 点击率',
            },
            {
                dimension: 'Hook强化',
                before: '今天给大家分享一些平替好物...',
                after: '我花了5000块买了10款大牌，又花了200块买了平替，结果...',
                improvement: '+250% 3秒留存',
            },
            {
                dimension: '互动引导',
                before: '（无CTA）',
                after: '你们最想看哪款的详细对比？评论区告诉我！前10名送同款！',
                improvement: '+320% 评论率',
            },
        ],
    },
    [DEMO_PHASES.DAY4_GROWTH]: {
        label: 'Day 4 · 增长起飞',
        day: 4,
        duration: 4500,
        title: '优化生效 · 数据快速上升',
        subtitle: 'AI优化后的内容开始爆发',
        followers: 138,
        views: 3000,
        likes: 186,
        comments: 42,
        shares: 23,
        contentTitle: '2026春夏必入的10支口红色号！附真人试色',
        contentType: '图文',
        highlight: 'growing',
        page: 'analytics',
    },
    [DEMO_PHASES.DAY5_EXPLOSION]: {
        label: 'Day 5 · 爆款诞生 🔥',
        day: 5,
        duration: 5000,
        title: '爆款内容出现！数据飙升',
        subtitle: '单条内容涨粉400+，进入热门推荐',
        followers: 538,
        views: 45000,
        likes: 2156,
        comments: 456,
        shares: 289,
        contentTitle: '全网都在抢的"多巴胺腮红"到底值不值？',
        contentType: '视频',
        highlight: 'explosion',
        page: 'analytics',
    },
    [DEMO_PHASES.DAY6_STABLE]: {
        label: 'Day 6 · 持续增长',
        day: 6,
        duration: 4000,
        title: 'AI持续优化 · 增长趋稳',
        subtitle: '乘胜追击，发布续集内容',
        followers: 767,
        views: 28000,
        likes: 1234,
        comments: 278,
        shares: 156,
        contentTitle: '你们催的"多巴胺妆容"教程来了！',
        contentType: '视频',
        highlight: 'stable',
        page: 'analytics',
    },
    [DEMO_PHASES.DAY7_MILESTONE]: {
        label: 'Day 7 · 千粉达成 🎉',
        day: 7,
        duration: 4500,
        title: '里程碑达成！突破1000粉丝',
        subtitle: '7天完成从0到1000的蜕变',
        followers: 1024,
        views: 18000,
        likes: 867,
        comments: 198,
        shares: 123,
        contentTitle: '从0到1000粉！7天我做对了什么？',
        contentType: '视频',
        highlight: 'milestone',
        page: 'results',
    },
    [DEMO_PHASES.FINALE]: {
        label: '增长总结',
        day: 7,
        duration: 0,
        title: 'AI让普通人拥有增长系统',
        subtitle: '7天 · 7条内容 · 1024粉丝',
        followers: 1024,
        views: 94780,
        likes: 4488,
        highlight: 'finale',
        page: 'results',
        topContent: [
            { day: 5, title: '全网都在抢的"多巴胺腮红"到底值不值？', views: 45000, followers: 400 },
            { day: 6, title: '你们催的"多巴胺妆容"教程来了！', views: 28000, followers: 229 },
            { day: 7, title: '从0到1000粉！7天我做对了什么？', views: 18000, followers: 212 },
        ],
    },
};

// 阶段顺序
export const PHASE_ORDER = [
    DEMO_PHASES.INTRO,
    DEMO_PHASES.DAY1,
    DEMO_PHASES.DAY2,
    DEMO_PHASES.DAY3_PROBLEM,
    DEMO_PHASES.DAY3_AI_DETECT,
    DEMO_PHASES.DAY3_AI_FIX,
    DEMO_PHASES.DAY4_GROWTH,
    DEMO_PHASES.DAY5_EXPLOSION,
    DEMO_PHASES.DAY6_STABLE,
    DEMO_PHASES.DAY7_MILESTONE,
    DEMO_PHASES.FINALE,
];

// 演示引擎类
export class DemoStoryEngine {
    constructor() {
        this.currentPhaseIndex = -1;
        this.isPlaying = false;
        this.isPaused = false;
        this.timer = null;
        this.listeners = [];
        this.onPhaseChange = null;
        this.onComplete = null;
        this.onHighlight = null;
    }

    start() {
        this.currentPhaseIndex = -1;
        this.isPlaying = true;
        this.isPaused = false;
        this._next();
    }

    pause() {
        this.isPaused = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this._emit('paused');
    }

    resume() {
        if (!this.isPaused) return;
        this.isPaused = false;
        const phase = this.getCurrentPhase();
        if (phase) {
            const data = PHASE_DATA[phase];
            // 恢复时使用剩余时间的一半（简化处理）
            this.timer = setTimeout(() => this._next(), data.duration / 2);
        }
        this._emit('resumed');
    }

    skip() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this._next();
    }

    stop() {
        this.isPlaying = false;
        this.isPaused = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.currentPhaseIndex = -1;
        this._emit('stopped');
    }

    restart() {
        this.stop();
        setTimeout(() => this.start(), 300);
    }

    getCurrentPhase() {
        if (this.currentPhaseIndex < 0 || this.currentPhaseIndex >= PHASE_ORDER.length) return null;
        return PHASE_ORDER[this.currentPhaseIndex];
    }

    getCurrentPhaseData() {
        const phase = this.getCurrentPhase();
        return phase ? PHASE_DATA[phase] : null;
    }

    getProgress() {
        return {
            current: this.currentPhaseIndex + 1,
            total: PHASE_ORDER.length,
            percent: ((this.currentPhaseIndex + 1) / PHASE_ORDER.length) * 100,
        };
    }

    _next() {
        this.currentPhaseIndex++;
        if (this.currentPhaseIndex >= PHASE_ORDER.length) {
            this.isPlaying = false;
            this._emit('complete');
            if (this.onComplete) this.onComplete();
            return;
        }

        const phase = PHASE_ORDER[this.currentPhaseIndex];
        const data = PHASE_DATA[phase];

        this._emit('phase-change', { phase, data, index: this.currentPhaseIndex });
        if (this.onPhaseChange) this.onPhaseChange(phase, data);

        if (data.highlight) {
            this._emit('highlight', { type: data.highlight, data });
            if (this.onHighlight) this.onHighlight(data.highlight, data);
        }

        // 自动推进到下一阶段（finale不自动推进）
        if (data.duration > 0 && !this.isPaused) {
            this.timer = setTimeout(() => this._next(), data.duration);
        }
    }

    on(event, callback) {
        this.listeners.push({ event, callback });
        return () => {
            this.listeners = this.listeners.filter(l => !(l.event === event && l.callback === callback));
        };
    }

    _emit(event, data) {
        this.listeners.filter(l => l.event === event).forEach(l => l.callback(data));
    }
}

// 导出单例
export const demoEngine = new DemoStoryEngine();
