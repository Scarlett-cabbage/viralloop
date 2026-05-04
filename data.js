// ViralLoop 模拟数据模块
// 所有Demo数据集中管理

// 图片资源
export const IMAGES = {
    dashboard: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/fb3a8e50-675d-41a2-beb0-d2b81b116581/image_1776755190_2_3.jpg',
    creator: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/a958e91b-e585-48f3-8f25-13707a497f62/image_1776755198_1_1.jpg',
    aiBot: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/f6094422-d836-47f9-a7b4-be9c8550e8bf/image_1776755206_1_1.jpg',
};

// 用户Persona数据
export const personaData = {
    nickname: '小美爱分享',
    platform: '小红书',
    niche: '美妆护肤',
    style: '真实测评 + 干货分享',
    targetAudience: '18-28岁女性，关注平价好物',
    tone: '亲切、真实、有趣',
    avatar: '👩‍🎨',
};

// 人设模板库（Persona Builder）
export const personaTemplates = [
    {
        id: 'worker-voice',
        name: '打工人嘴替',
        emoji: '😤',
        description: '替千万打工人说出心里话，用犀利吐槽引发共鸣',
        tags: ['情绪表达', '毒舌', '共鸣'],
        platforms: ['小红书', '抖音'],
        audience: '20-30岁职场人，对工作有吐槽欲望',
        popularity: 96,
        gradient: 'from-red-500/15 to-orange-500/10',
        contentDirections: ['职场奇葩事吐槽', '打工人日常段子', '离职/跳槽经验分享'],
        styleAdvice: '犀利但不刻薄，吐槽中带着温暖，让人笑着笑着就哭了',
    },
    {
        id: 'elegant-life',
        name: '精致生活分享者',
        emoji: '✨',
        description: '分享高品质生活方式，从穿搭到家居，打造精致日常',
        tags: ['精致', '生活方式', '审美'],
        platforms: ['小红书', '抖音'],
        audience: '22-35岁追求品质生活的女性',
        popularity: 91,
        gradient: 'from-pink-500/15 to-rose-500/10',
        contentDirections: ['每日穿搭OOTD', '家居好物分享', '精致早餐/下午茶'],
        styleAdvice: '温柔优雅、有品味，用画面感传递生活美学',
    },
    {
        id: 'side-hustle',
        name: '副业搞钱达人',
        emoji: '💰',
        description: '分享副业赚钱方法和实操经验，帮助普通人开启第二收入',
        tags: ['搞钱', '副业', '干货'],
        platforms: ['小红书', '抖音', 'B站'],
        audience: '22-35岁想增加收入的上班族/学生',
        popularity: 94,
        gradient: 'from-yellow-500/15 to-amber-500/10',
        contentDirections: ['副业项目实操分享', '月入过万经验复盘', '零成本创业指南'],
        styleAdvice: '真实不画饼，用数据说话，分享可复制的方法论',
    },
    {
        id: 'emotion-healer',
        name: '情感疗愈博主',
        emoji: '🌸',
        description: '用温暖的文字和声音治愈每一个疲惫的灵魂',
        tags: ['治愈', '温柔', '情感'],
        platforms: ['小红书', '抖音'],
        audience: '18-30岁需要情感慰藉的年轻人',
        popularity: 88,
        gradient: 'from-purple-500/15 to-violet-500/10',
        contentDirections: ['深夜治愈文案', '情感故事分享', '自我成长感悟'],
        styleAdvice: '温柔细腻、有共情力，像一个懂你的朋友在耳边轻声说话',
    },
    {
        id: 'career-mentor',
        name: '职场成长导师',
        emoji: '💼',
        description: '分享职场晋升秘籍、沟通技巧和个人成长方法论',
        tags: ['职场', '成长', '干货'],
        platforms: ['小红书', 'B站', '抖音'],
        audience: '22-35岁职场新人和中层管理者',
        popularity: 87,
        gradient: 'from-blue-500/15 to-indigo-500/10',
        contentDirections: ['职场沟通话术', '面试/晋升技巧', '高效工作方法'],
        styleAdvice: '专业可信、逻辑清晰，用案例和方法论说话',
    },
    {
        id: 'funny-roaster',
        name: '搞笑吐槽达人',
        emoji: '😂',
        description: '用幽默的方式解读生活，让人在笑声中获得快乐',
        tags: ['搞笑', '吐槽', '段子'],
        platforms: ['抖音', 'B站', '小红书'],
        audience: '18-30岁喜欢轻松内容的年轻人',
        popularity: 93,
        gradient: 'from-green-500/15 to-emerald-500/10',
        contentDirections: ['生活趣事吐槽', '热点事件搞笑解读', '情景短剧/段子'],
        styleAdvice: '幽默但不低俗，吐槽有梗有料，让人忍不住转发',
    },
    {
        id: 'discipline-blogger',
        name: '自律打卡博主',
        emoji: '🏃',
        description: '记录自律生活，用行动力感染每一个想改变的人',
        tags: ['自律', '打卡', '正能量'],
        platforms: ['小红书', '抖音'],
        audience: '18-30岁想养成好习惯的年轻人',
        popularity: 85,
        gradient: 'from-teal-500/15 to-cyan-500/10',
        contentDirections: ['早起/运动打卡', '学习计划分享', '习惯养成方法'],
        styleAdvice: '积极向上、真实不装，展示过程而非只秀结果',
    },
    {
        id: 'ai-tools',
        name: 'AI工具分享博主',
        emoji: '🤖',
        description: '分享最新AI工具和使用技巧，帮助普通人用AI提效',
        tags: ['AI', '效率', '工具'],
        platforms: ['小红书', 'B站', '抖音'],
        audience: '20-40岁对AI感兴趣的职场人/学生',
        popularity: 97,
        gradient: 'from-violet-500/15 to-purple-500/10',
        contentDirections: ['AI工具测评', 'AI提效实操教程', 'AI行业趋势解读'],
        styleAdvice: '通俗易懂、实操为主，让小白也能快速上手',
    },
    {
        id: 'beauty-reviewer',
        name: '平价美妆测评官',
        emoji: '💄',
        description: '专注平价美妆测评，帮学生党和打工人找到最值的好物',
        tags: ['美妆', '测评', '平价'],
        platforms: ['小红书', '抖音'],
        audience: '18-28岁追求性价比的年轻女性',
        popularity: 90,
        gradient: 'from-rose-500/15 to-pink-500/10',
        contentDirections: ['平价好物横评对比', '大牌平替揭秘', '月度爱用物分享'],
        styleAdvice: '亲切真实、不做作，像闺蜜聊天一样分享',
    },
    {
        id: 'food-explorer',
        name: '美食探店达人',
        emoji: '🍜',
        description: '探索城市美食地图，用镜头记录每一口幸福',
        tags: ['美食', '探店', '生活'],
        platforms: ['小红书', '抖音', '大众点评'],
        audience: '20-35岁热爱美食的城市青年',
        popularity: 89,
        gradient: 'from-orange-500/15 to-red-500/10',
        contentDirections: ['隐藏美食探店', '人均XX元吃遍XX', '美食制作教程'],
        styleAdvice: '有烟火气、接地气，用食物传递生活的温度',
    },
    {
        id: 'knowledge-creator',
        name: '知识科普博主',
        emoji: '📚',
        description: '把复杂知识讲得简单有趣，让学习变成一种享受',
        tags: ['知识', '科普', '学习'],
        platforms: ['B站', '小红书', '抖音'],
        audience: '18-35岁有求知欲的年轻人',
        popularity: 86,
        gradient: 'from-sky-500/15 to-blue-500/10',
        contentDirections: ['冷知识科普', '读书笔记分享', '行业深度解析'],
        styleAdvice: '深入浅出、有趣不枯燥，用故事和类比让知识活起来',
    },
    {
        id: 'fitness-coach',
        name: '健身蜕变博主',
        emoji: '💪',
        description: '分享健身蜕变过程和训练方法，激励更多人动起来',
        tags: ['健身', '蜕变', '运动'],
        platforms: ['小红书', '抖音', 'B站'],
        audience: '20-35岁想改善身材的男女',
        popularity: 84,
        gradient: 'from-lime-500/15 to-green-500/10',
        contentDirections: ['训练计划分享', '饮食搭配指南', '身材对比蜕变'],
        styleAdvice: '热血正能量、专业可信，用自身蜕变激励他人',
    },
];

// 7天增长计划数据
export const growthPlan = [
    {
        day: 1,
        date: '2026-04-21',
        title: '账号冷启动',
        status: 'completed',
        tasks: ['发布首条自我介绍笔记', '完善个人主页信息', '关注50个同领域账号'],
        contentTitle: '「大家好！我是小美，一个专注平价好物的真实测评博主」',
        contentType: '图文笔记',
        tag: 'normal',
        followers: 12,
        likes: 45,
        comments: 8,
        shares: 3,
        views: 580,
        aiExplain: '冷启动阶段，首条笔记以自我介绍建立人设，同时通过互动行为激活账号权重。算法会在前3天给予新账号一定的流量扶持。',
    },
    {
        day: 2,
        date: '2026-04-22',
        title: '内容测试期',
        status: 'completed',
        tasks: ['发布第一篇测评笔记', '回复所有评论', '参与3个热门话题讨论'],
        contentTitle: '「月薪3000也能用的5款神仙水乳！第3款绝了」',
        contentType: '图文笔记',
        tag: 'hot',
        followers: 38,
        likes: 156,
        comments: 42,
        shares: 18,
        views: 2340,
        aiExplain: '标题采用"月薪+数字+悬念"公式，精准击中目标用户痛点。数据显示该类标题CTR比普通标题高47%。评论区互动率达到2.8%，超过行业均值。',
    },
    {
        day: 3,
        date: '2026-04-23',
        title: '流量突破日',
        status: 'completed',
        tasks: ['发布视频笔记', '蹭热点话题', '与3位博主互动'],
        contentTitle: '「被骗了3年！这些大牌平替居然只要29.9？！」',
        contentType: '视频笔记',
        tag: 'hot',
        followers: 127,
        likes: 423,
        comments: 89,
        shares: 56,
        views: 8900,
        aiExplain: '视频内容结合"揭秘+平替"双热点，触发平台推荐算法。进入小红书发现页推荐池，获得8900次曝光。粉丝增长率达234%，标志着账号进入增长期。',
    },
    {
        day: 4,
        date: '2026-04-24',
        title: '稳定输出期',
        status: 'completed',
        tasks: ['发布合集类笔记', '建立粉丝群', '策划互动活动'],
        contentTitle: '「2026春夏必入的10支口红色号！附真人试色」',
        contentType: '图文笔记',
        tag: 'normal',
        followers: 215,
        likes: 312,
        comments: 67,
        shares: 34,
        views: 5600,
        aiExplain: '合集类内容收藏率高，有利于长尾流量。虽然单日增长放缓，但内容质量分提升至87分，为后续爆发积累势能。建议保持日更节奏。',
    },
    {
        day: 5,
        date: '2026-04-25',
        title: '🔥 爆发日',
        status: 'completed',
        tasks: ['发布爆款预设内容', '全平台分发', '实时监控数据'],
        contentTitle: '「全网都在抢的"多巴胺腮红"到底值不值？我花了500块帮你们试了」',
        contentType: '视频笔记',
        tag: 'hot',
        followers: 583,
        likes: 2156,
        comments: 456,
        shares: 289,
        views: 45000,
        aiExplain: '🔥 爆款命中！该内容触发平台"优质内容加速"机制，进入全站热门推荐。关键成功因素：1)蹭到"多巴胺"趋势热点 2)标题制造好奇心缺口 3)视频前3秒留存率达92%。单日涨粉368人，是前4天总和的1.7倍。',
    },
    {
        day: 6,
        date: '2026-04-26',
        title: '热度延续期',
        status: 'completed',
        tasks: ['发布爆款续集', '引导粉丝互动', '开启直播预告'],
        contentTitle: '「你们催的"多巴胺妆容"教程来了！手残党也能学会」',
        contentType: '视频笔记',
        tag: 'hot',
        followers: 812,
        likes: 1234,
        comments: 278,
        shares: 156,
        views: 28000,
        aiExplain: '趁热打铁发布续集内容，利用Day5爆款的长尾流量。粉丝主动在评论区催更，说明账号已建立初步粘性。建议在Day7进行直播，将公域流量转化为私域。',
    },
    {
        day: 7,
        date: '2026-04-27',
        title: '里程碑达成',
        status: 'active',
        tasks: ['首场直播', '发布总结笔记', '粉丝福利活动'],
        contentTitle: '「从0到1000粉！7天我做对了什么？（附完整复盘）」',
        contentType: '图文+直播',
        tag: 'hot',
        followers: 1024,
        likes: 867,
        comments: 198,
        shares: 123,
        views: 18000,
        aiExplain: '🎉 里程碑达成！7天累计粉丝突破1000。复盘笔记本身也是高价值内容，预计将持续带来长尾流量。直播转化率预估12%，建议后续保持每周2次直播节奏。',
    },
];

// 每日粉丝增长数据（用于图表）
export const followerGrowthData = {
    labels: ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    values: [0, 12, 38, 127, 215, 583, 812, 1024],
    dailyIncrease: [0, 12, 26, 89, 88, 368, 229, 212],
};

// 内容表现数据
export const contentPerformance = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    likes: [45, 156, 423, 312, 2156, 1234, 867],
    comments: [8, 42, 89, 67, 456, 278, 198],
    shares: [3, 18, 56, 34, 289, 156, 123],
    views: [580, 2340, 8900, 5600, 45000, 28000, 18000],
};

// 分发策略数据
export const distributionStrategy = [
    {
        platform: '小红书',
        icon: 'ri-book-2-line',
        priority: '主阵地',
        timing: '12:00-13:00 / 20:00-22:00',
        format: '图文+视频',
        hashtags: ['#平价好物', '#美妆测评', '#学生党必看', '#多巴胺妆容'],
        score: 95,
        reason: '目标用户浓度最高，算法对新账号友好，图文+视频双轨并行效果最佳',
    },
    {
        platform: '抖音',
        icon: 'ri-tiktok-line',
        priority: '辅助渠道',
        timing: '18:00-20:00',
        format: '短视频',
        hashtags: ['#美妆', '#平价好物推荐', '#化妆教程'],
        score: 72,
        reason: '视频内容可复用，但竞争激烈，建议作为内容分发的补充渠道',
    },
    {
        platform: '微博',
        icon: 'ri-weibo-line',
        priority: '话题引流',
        timing: '10:00-11:00',
        format: '图文+话题',
        hashtags: ['#美妆好物分享', '#平价彩妆'],
        score: 58,
        reason: '适合蹭热点话题引流，但转化率较低，优先级排在小红书和抖音之后',
    },
    {
        platform: 'B站',
        icon: 'ri-bilibili-line',
        priority: '长尾布局',
        timing: '周末发布',
        format: '中长视频',
        hashtags: ['美妆测评', '平价好物'],
        score: 45,
        reason: '适合深度测评内容，用户粘性高但起量慢，建议作为长期布局渠道',
    },
];

// 智能复盘数据
export const reviewData = {
    overallScore: 92,
    overallGrade: 'A',
    gradeLabel: '优秀',
    reachExpectation: true,
    expectationDetail: '7天增长1,024粉丝，超额完成1,000粉目标（完成率102.4%）',
    highlights: [
        { label: '内容质量', score: 88, trend: 'up', detail: '视频内容表现优于图文，建议增加视频比例至60%' },
        { label: '发布时机', score: 95, trend: 'up', detail: '晚间8-10点发布效果最佳，午间次之' },
        { label: '互动率', score: 85, trend: 'up', detail: '评论回复率100%，但回复速度可提升至30分钟内' },
        { label: '标题优化', score: 90, trend: 'up', detail: '"数字+悬念+痛点"公式命中率最高' },
        { label: '话题选择', score: 96, trend: 'up', detail: '成功捕捉"多巴胺"趋势，建议持续关注平台热点' },
    ],
    // 问题拆解（核心模块）
    problemBreakdown: [
        {
            id: 'hook',
            icon: 'ri-flashlight-line',
            title: '开头吸引力不足',
            subtitle: '前3秒流失率偏高',
            severity: 'high',
            metric: '前3秒留存率',
            currentValue: '68%',
            targetValue: '85%',
            gap: '-17%',
            analysis: '7条内容中有3条前3秒留存率低于70%，主要集中在图文笔记。视频笔记平均前3秒留存率达82%，但Day1的自我介绍视频仅为55%。',
            rootCause: '开头缺乏"钩子"设计，直接进入正题导致用户快速划走。图文笔记首图吸引力不足，缺少视觉冲击。',
            affectedDays: [1, 4],
        },
        {
            id: 'interaction',
            icon: 'ri-chat-smile-2-line',
            title: '评论互动深度不足',
            subtitle: '评论区缺乏深度讨论',
            severity: 'medium',
            metric: '评论互动率',
            currentValue: '2.8%',
            targetValue: '5.0%',
            gap: '-2.2%',
            analysis: '虽然评论回复率达100%，但多数回复为简单感谢，未能引导深度讨论。Day5爆款内容评论区自发讨论率达12%，说明内容本身可以激发互动。',
            rootCause: '缺乏主动引导互动的"钩子"设计，如提问、投票、争议性观点等。回复话术过于模板化，未能延续对话。',
            affectedDays: [1, 2, 4],
        },
        {
            id: 'rhythm',
            icon: 'ri-rhythm-line',
            title: '内容节奏不均匀',
            subtitle: '信息密度波动大',
            severity: 'low',
            metric: '完播率',
            currentValue: '45%',
            targetValue: '60%',
            gap: '-15%',
            analysis: 'Day3和Day5的视频完播率分别为62%和71%，表现优秀。但Day4的图文合集完播率仅28%，信息量过大导致用户中途退出。',
            rootCause: '合集类内容缺乏节奏设计，10个产品平铺直叙。缺少"高潮点"和"休息点"的交替，用户注意力无法持续。',
            affectedDays: [4],
        },
    ],
    // 用户行为洞察
    userBehavior: {
        // 用户退出点分析（视频时间轴）
        exitPoints: [
            { segment: '0-3秒', exitRate: 32, label: '开头', color: '#ef4444' },
            { segment: '3-10秒', exitRate: 15, label: '铺垫', color: '#f97316' },
            { segment: '10-30秒', exitRate: 12, label: '正文前段', color: '#eab308' },
            { segment: '30-60秒', exitRate: 18, label: '正文中段', color: '#f97316' },
            { segment: '60-90秒', exitRate: 8, label: '高潮段', color: '#22c55e' },
            { segment: '90秒+', exitRate: 15, label: '结尾', color: '#eab308' },
        ],
        // 互动高峰段
        interactionPeaks: [
            { segment: '产品展示段', interactionRate: 8.2, type: '点赞高峰', icon: 'ri-heart-fill', color: '#ef4444' },
            { segment: '价格揭晓段', interactionRate: 12.5, type: '评论高峰', icon: 'ri-chat-3-fill', color: '#3b82f6' },
            { segment: '对比测评段', interactionRate: 9.8, type: '收藏高峰', icon: 'ri-bookmark-fill', color: '#eab308' },
            { segment: '结尾总结段', interactionRate: 6.3, type: '分享高峰', icon: 'ri-share-forward-fill', color: '#22c55e' },
        ],
        // 用户画像洞察
        audienceInsights: [
            { label: '18-24岁女性', percentage: 42, trend: 'up' },
            { label: '25-30岁女性', percentage: 28, trend: 'stable' },
            { label: '一二线城市', percentage: 65, trend: 'up' },
            { label: '学生群体', percentage: 35, trend: 'up' },
        ],
    },
    // 优化建议（最关键 - 下一条内容调整方案）
    optimizationPlan: {
        hookOptimization: {
            title: '开头优化方案',
            icon: 'ri-movie-2-line',
            before: '直接介绍产品："今天给大家分享几款好用的水乳"',
            after: '制造悬念钩子："月薪3000的我，居然找到了和SK-II一模一样的平替？！"',
            techniques: [
                { name: '数字冲击法', example: '"花了500块帮你们试了20款..."', effectiveness: 92 },
                { name: '反差悬念法', example: '"被骗了3年才发现..."', effectiveness: 88 },
                { name: '痛点共鸣法', example: '"学生党看过来！"', effectiveness: 78 },
            ],
            expectedImprovement: '前3秒留存率预计提升至82%（+14%）',
        },
        rhythmOptimization: {
            title: '内容节奏优化',
            icon: 'ri-equalizer-line',
            before: '平铺直叙：产品A→产品B→产品C→...→总结',
            after: '波浪节奏：钩子→痛点→产品1(高潮)→过渡→产品2(高潮)→互动点→总结',
            structure: [
                { phase: '钩子', duration: '0-3秒', energy: 95, desc: '制造悬念/冲突' },
                { phase: '痛点', duration: '3-8秒', energy: 70, desc: '引发共鸣' },
                { phase: '高潮1', duration: '8-25秒', energy: 90, desc: '核心产品展示' },
                { phase: '过渡', duration: '25-35秒', energy: 50, desc: '轻松过渡/小互动' },
                { phase: '高潮2', duration: '35-55秒', energy: 85, desc: '对比/测评' },
                { phase: '互动点', duration: '55-65秒', energy: 75, desc: '提问/投票引导' },
                { phase: '总结', duration: '65-80秒', energy: 60, desc: '总结+关注引导' },
            ],
            expectedImprovement: '完播率预计提升至58%（+13%）',
        },
        interactionOptimization: {
            title: '互动点植入方案',
            icon: 'ri-question-answer-line',
            before: '结尾统一问："你们觉得怎么样？"',
            after: '全程多点植入互动触发器',
            interactionPoints: [
                { position: '开头', type: '悬念提问', example: '"你们猜这个多少钱？答案在评论区"', expectedEffect: '评论率+45%' },
                { position: '中段', type: '选择投票', example: '"A款和B款你们选哪个？评论区告诉我"', expectedEffect: '评论率+60%' },
                { position: '结尾', type: '行动号召', example: '"想看XX测评的扣1，想看XX的扣2"', expectedEffect: '评论率+80%' },
                { position: '评论区', type: '置顶互动', example: '置顶自己的提问评论，引导讨论', expectedEffect: '评论深度+120%' },
            ],
            expectedImprovement: '评论互动率预计提升至5.2%（+2.4%）',
        },
    },
    suggestions: [
        { priority: 'high', text: '增加视频内容比例至60%，视频平均互动率是图文的2.3倍', category: '内容格式' },
        { priority: 'high', text: '在评论区主动发起话题讨论，提升评论区活跃度', category: '互动策略' },
        { priority: 'high', text: '优化视频前3秒钩子设计，采用"数字冲击法"或"反差悬念法"', category: '开头优化' },
        { priority: 'medium', text: '尝试与同量级博主互推，预计可带来15-20%额外曝光', category: '分发策略' },
        { priority: 'medium', text: '建立内容日历，保持稳定的更新频率（建议日更）', category: '内容规划' },
        { priority: 'medium', text: '在内容中段加入互动触发点，如选择题、投票等', category: '互动设计' },
        { priority: 'low', text: '考虑开通小红书薯店，为后续变现做准备', category: '变现布局' },
    ],
    keyInsights: [
        '爆款内容的核心要素：热点趋势 × 好奇心缺口 × 高质量视觉',
        '粉丝增长的关键转折点出现在Day3和Day5，均与视频内容相关',
        '评论区互动是提升内容权重的最有效手段',
        '账号已建立"平价美妆测评"的清晰人设，建议持续深耕',
    ],
    // 内容逐条评分
    contentGrades: [
        { day: 1, title: '自我介绍笔记', grade: 'C', score: 62, verdict: '未达预期', reason: '开头平淡，缺乏记忆点' },
        { day: 2, title: '5款神仙水乳测评', grade: 'B+', score: 78, verdict: '符合预期', reason: '标题公式有效，但图文形式限制了传播' },
        { day: 3, title: '大牌平替揭秘', grade: 'A', score: 91, verdict: '超出预期', reason: '视频+热点双重加持，进入推荐池' },
        { day: 4, title: '口红色号合集', grade: 'B', score: 72, verdict: '略低预期', reason: '合集内容过长，完播率偏低' },
        { day: 5, title: '多巴胺腮红测评', grade: 'A+', score: 98, verdict: '爆款', reason: '🔥 完美命中热点+好奇心缺口' },
        { day: 6, title: '多巴胺妆容教程', grade: 'A', score: 89, verdict: '超出预期', reason: '续集策略成功，粉丝粘性强' },
        { day: 7, title: '7天复盘总结', grade: 'A-', score: 85, verdict: '符合预期', reason: '复盘内容有长尾价值' },
    ],
};

// 调优对比数据
export const comparisonData = {
    before: {
        label: '优化前（Day 1-2）',
        metrics: {
            avgViews: 1460,
            avgLikes: 100,
            avgComments: 25,
            avgShares: 10,
            engagementRate: '1.8%',
            followerGrowth: 19,
            conversionRate: '1.3%',
        },
        strategy: '纯图文内容，标题较平淡，发布时间不固定',
    },
    after: {
        label: '优化后（Day 5-7）',
        metrics: {
            avgViews: 30333,
            avgLikes: 1419,
            avgComments: 310,
            avgShares: 189,
            engagementRate: '6.3%',
            followerGrowth: 270,
            conversionRate: '3.8%',
        },
        strategy: '视频为主+热点结合，标题公式化，固定黄金时段发布',
    },
    improvements: [
        { metric: '平均浏览量', change: '+1977%', direction: 'up', icon: 'ri-eye-line', before: '1,460', after: '30,333' },
        { metric: '转粉率', change: '+192%', direction: 'up', icon: 'ri-user-add-line', before: '1.3%', after: '3.8%' },
        { metric: '互动率', change: '+250%', direction: 'up', icon: 'ri-heart-pulse-line', before: '1.8%', after: '6.3%' },
        { metric: '日均涨粉', change: '+1321%', direction: 'up', icon: 'ri-rocket-2-line', before: '19', after: '270' },
    ],
    // 内容标题对比
    contentComparison: [
        {
            dimension: '标题',
            before: { text: '分享几款好用的水乳推荐', score: 35 },
            after: { text: '月薪3000也能用的5款神仙水乳！第3款绝了', score: 92 },
            improvement: '标题CTR提升 +47%',
        },
        {
            dimension: '内容结构',
            before: { text: '平铺直叙，逐个介绍产品', score: 28 },
            after: { text: '钩子→痛点→高潮→互动→总结 波浪节奏', score: 88 },
            improvement: '完播率提升 +35%',
        },
        {
            dimension: '内容格式',
            before: { text: '纯图文笔记，静态图片', score: 40 },
            after: { text: '短视频为主(60%)，图文辅助(40%)', score: 95 },
            improvement: '互动率提升 2.3倍',
        },
    ],
    // 粉丝增长对比（日维度）
    followerGrowthComparison: {
        beforeDays: ['Day 1', 'Day 2'],
        beforeValues: [12, 26],
        afterDays: ['Day 5', 'Day 6', 'Day 7'],
        afterValues: [368, 229, 212],
    },
    // AI优化流程
    aiOptimizationFlow: [
        { step: 1, icon: 'ri-search-eye-line', title: 'AI识别问题', desc: '分析前2天数据，发现图文内容互动率低、标题吸引力不足、发布时间不稳定', color: '#ef4444' },
        { step: 2, icon: 'ri-settings-4-line', title: '自动优化', desc: '切换视频格式、应用标题公式、锁定黄金时段20:00-22:00、追踪热点话题', color: '#A99563' },
        { step: 3, icon: 'ri-rocket-2-line', title: '带来增长拐点', desc: 'Day5单日涨粉368人，爆款命中率从0%提升至66.7%，实现指数级增长', color: '#4ade80' },
    ],
};

// Landing页特性数据
export const features = [
    {
        icon: 'ri-magic-line',
        title: 'AI内容生成',
        desc: '基于账号人设和热点趋势，自动生成高潜力爆款内容，标题、正文、标签一键搞定',
    },
    {
        icon: 'ri-route-line',
        title: '智能分发策略',
        desc: '多平台最优发布时间、话题标签、内容格式的AI推荐，最大化每条内容的曝光效率',
    },
    {
        icon: 'ri-line-chart-line',
        title: '实时数据追踪',
        desc: '全维度数据监控面板，粉丝增长、互动率、内容表现一目了然',
    },
    {
        icon: 'ri-brain-line',
        title: 'AI智能复盘',
        desc: '每日自动分析内容表现，给出可执行的优化建议，持续迭代增长策略',
    },
    {
        icon: 'ri-flashlight-line',
        title: '爆款预测引擎',
        desc: '基于平台算法模型，提前预判内容爆发潜力，标记🔥高潜力内容',
    },
    {
        icon: 'ri-user-star-line',
        title: 'Persona智能建模',
        desc: '输入基础信息，AI自动生成最优账号人设，包括定位、风格、目标受众画像',
    },
];

// 增长里程碑
export const milestones = [
    { followers: 0, label: '起点', day: 0 },
    { followers: 100, label: '破百', day: 3 },
    { followers: 500, label: '小有名气', day: 5 },
    { followers: 1000, label: '🎉 千粉达成', day: 7 },
];

// ========== 数据分析页专用数据 ==========

// 核心增长指标
export const analyticsKPI = {
    currentFollowers: 1024,
    todayNew: 212,
    todayNewRate: '+26.1%',
    conversionRate: '3.8%',       // 转粉率 = 新增粉丝 / 总浏览量
    conversionRateTrend: '+1.2%',
    viralRate: '42.8%',           // 爆款率 = 爆款内容数 / 总内容数
    viralRateTrend: '+15.3%',
    avgEngagement: '6.3%',
    engagementTrend: '+2.1%',
    totalViews: 108420,
    totalLikes: 5193,
    totalComments: 1138,
    totalShares: 679,
};

// 播放量 vs 转粉率对比数据
export const viewsVsConversion = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    views: [580, 2340, 8900, 5600, 45000, 28000, 18000],
    conversionRate: [2.1, 1.1, 1.0, 1.6, 0.8, 0.8, 1.2],  // 转粉率%
    newFollowers: [12, 26, 89, 88, 368, 229, 212],
};

// 内容类型分析
export const contentTypeAnalysis = [
    { type: '视频笔记', count: 3, avgViews: 27300, avgLikes: 1271, avgConversion: '1.2%', viralRate: '66.7%', color: '#A99563' },
    { type: '图文笔记', count: 3, avgViews: 2840, avgLikes: 171, avgConversion: '1.8%', viralRate: '33.3%', color: '#c4ad78' },
    { type: '图文+直播', count: 1, avgViews: 18000, avgLikes: 867, avgConversion: '1.2%', viralRate: '100%', color: '#8a7a50' },
];

// 用户活跃时段分析
export const userActiveHours = {
    labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '0:00'],
    activity: [5, 12, 25, 58, 32, 28, 45, 92, 85, 35],  // 活跃度指数(0-100)
    engagement: [2.1, 3.2, 4.5, 5.8, 3.9, 3.5, 5.2, 8.1, 7.6, 4.2], // 互动率%
};

// 内容结构效果分析
export const contentStructureAnalysis = [
    { structure: '数字+悬念+痛点', usage: 3, avgViews: 18580, avgEngagement: '7.2%', score: 96, example: '「月薪3000也能用的5款神仙水乳！」' },
    { structure: '揭秘+反转', usage: 1, avgViews: 8900, avgEngagement: '6.4%', score: 88, example: '「被骗了3年！这些大牌平替...」' },
    { structure: '热点+测评', usage: 2, avgViews: 36500, avgEngagement: '8.1%', score: 98, example: '「全网都在抢的多巴胺腮红...」' },
    { structure: '合集+实用', usage: 1, avgViews: 5600, avgEngagement: '4.8%', score: 72, example: '「2026春夏必入的10支口红色号」' },
];

// AI洞察数据
export const aiInsights = [
    {
        icon: 'ri-video-line',
        category: '内容类型洞察',
        title: '视频内容涨粉效率是图文的4.8倍',
        detail: '视频笔记平均单条涨粉219人，图文笔记平均单条涨粉46人。视频的前3秒留存率与最终涨粉数呈强正相关（r=0.87）。',
        impact: '高',
        recommendation: '将视频内容比例提升至70%，重点优化前3秒钩子',
    },
    {
        icon: 'ri-time-line',
        category: '发布时段洞察',
        title: '晚间20:00-22:00是黄金发布窗口',
        detail: '该时段用户活跃度达峰值92，互动率8.1%，是全天均值的2.3倍。午间12:00-13:00为次优时段，活跃度58。',
        impact: '高',
        recommendation: '固定在20:00发布主力内容，12:00发布补充内容',
    },
    {
        icon: 'ri-layout-masonry-line',
        category: '内容结构洞察',
        title: '「热点+测评」结构爆款率最高达98分',
        detail: '该结构平均浏览量36,500，互动率8.1%，远超其他结构。「数字+悬念+痛点」结构次之，得分96分，但使用频率最高。',
        impact: '中',
        recommendation: '每周至少2条「热点+测评」结构内容，持续追踪平台趋势',
    },
    {
        icon: 'ri-user-heart-line',
        category: '粉丝行为洞察',
        title: '评论互动用户的转粉率是普通用户的3.2倍',
        detail: '在评论区互动过的用户中，38%最终关注了账号。而仅浏览的用户转粉率仅为1.2%。快速回复（<30min）可进一步提升转粉率至42%。',
        impact: '高',
        recommendation: '建立评论区快速回复机制，优先回复提问类评论',
    },
];

// ========== 增长结果页专用数据 ==========

// Top3 爆款内容
export const topContents = [
    {
        rank: 1,
        day: 5,
        title: '全网都在抢的"多巴胺腮红"到底值不值？我花了500块帮你们试了',
        type: '视频笔记',
        emoji: '🔥',
        views: 45000,
        likes: 2156,
        comments: 456,
        shares: 289,
        followers: 368,
        engagementRate: '6.4%',
        grade: 'A+',
        score: 98,
        highlight: '单日涨粉368人，进入全站热门推荐',
        tags: ['#多巴胺腮红', '#美妆测评', '#平价好物'],
    },
    {
        rank: 2,
        day: 6,
        title: '你们催的"多巴胺妆容"教程来了！手残党也能学会',
        type: '视频笔记',
        emoji: '✨',
        views: 28000,
        likes: 1234,
        comments: 278,
        shares: 156,
        followers: 229,
        engagementRate: '5.9%',
        grade: 'A',
        score: 89,
        highlight: '续集策略成功，粉丝粘性强',
        tags: ['#多巴胺妆容', '#化妆教程', '#手残党'],
    },
    {
        rank: 3,
        day: 3,
        title: '被骗了3年！这些大牌平替居然只要29.9？！',
        type: '视频笔记',
        emoji: '💡',
        views: 8900,
        likes: 423,
        comments: 89,
        shares: 56,
        followers: 89,
        engagementRate: '6.4%',
        grade: 'A',
        score: 91,
        highlight: '首个破万曝光内容，进入推荐池',
        tags: ['#大牌平替', '#省钱攻略', '#美妆'],
    },
];

// 成本分析数据
export const costAnalysis = {
    totalCost: 0,
    totalFollowers: 1024,
    costPerFollower: '¥0',
    costLabel: '零成本获客',
    roi: '∞',
    roiLabel: '纯内容驱动，无付费投放',
    timeCost: '约2小时/天',
    timeCostLabel: '平均每日内容制作时间',
    aiSavedHours: 35,
    aiSavedLabel: 'AI累计节省工时（小时）',
    breakdown: [
        { item: '付费投放', cost: '¥0', note: '100%自然流量' },
        { item: '工具费用', cost: '¥0', note: 'AI Agent免费使用' },
        { item: '内容制作', cost: '¥0', note: '手机拍摄+AI辅助' },
        { item: '时间投入', cost: '~14小时', note: '7天 × 2小时/天' },
    ],
    comparison: {
        traditional: { cost: '¥3,000-5,000', time: '30天+', followers: '500-800' },
        withAI: { cost: '¥0', time: '7天', followers: '1,024' },
    },
};

// 增长关键节点
export const growthKeyNodes = [
    { day: 0, followers: 0, label: '起点', event: '账号创建', type: 'start' },
    { day: 1, followers: 12, label: 'Day 1', event: '冷启动', type: 'normal' },
    { day: 2, followers: 38, label: 'Day 2', event: '内容测试', type: 'normal' },
    { day: 3, followers: 127, label: 'Day 3', event: '🔄 AI优化介入', type: 'optimize', desc: 'AI识别图文效果不佳，切换视频策略' },
    { day: 4, followers: 215, label: 'Day 4', event: '势能积累', type: 'normal' },
    { day: 5, followers: 583, label: 'Day 5', event: '🔥 爆发拐点', type: 'explosion', desc: '热点+视频策略命中，单日涨粉368' },
    { day: 6, followers: 812, label: 'Day 6', event: '热度延续', type: 'hot' },
    { day: 7, followers: 1024, label: 'Day 7', event: '🎉 千粉达成', type: 'milestone', desc: '7天目标超额完成，达成率102.4%' },
];

// 成就徽章系统
export const achievementBadges = [
    { emoji: '🚀', label: '冷启动先锋', desc: '完成首日全部任务', unlocked: true, day: 1 },
    { emoji: '📝', label: '内容创作者', desc: '累计发布7条内容', unlocked: true, day: 7 },
    { emoji: '🔥', label: '爆款制造机', desc: '单条内容涨粉300+', unlocked: true, day: 5 },
    { emoji: '🎯', label: '千粉里程碑', desc: '7天内突破1000粉', unlocked: true, day: 7 },
    { emoji: '💬', label: '互动达人', desc: '评论回复率100%', unlocked: true, day: 3 },
    { emoji: '📈', label: '连续增长王', desc: '连续7天粉丝正增长', unlocked: true, day: 7 },
    { emoji: '🧠', label: 'AI协作大师', desc: '采纳AI建议超过20条', unlocked: true, day: 6 },
    { emoji: '⭐', label: '满分优等生', desc: 'AI综合评分超90', unlocked: true, day: 7 },
    { emoji: '🏆', label: '增长黑客', desc: '完成全部增长闭环', unlocked: true, day: 7 },
];

// ========== 内容创作工作区数据 ==========

// 每天的可编辑内容结构
export const contentEditorData = {
    1: {
        title: '大家好！我是小美，一个专注平价好物的真实测评博主',
        hook: '👋 大家好！我是小美，一个刚毕业的普通女生。从今天开始，我要在小红书上分享我发现的那些平价好物——月薪3000也能用出高级感！',
        body: '我会用最真实的方式测评每一款产品，不恰饭、不滤镜，只说真话。\n\n作为一个刚毕业的打工人，我深知每一分钱都来之不易。所以我的测评标准只有一个：性价比！\n\n接下来我会分享：\n• 百元以内的护肤好物\n• 学生党也能入手的彩妆\n• 被低估的国货宝藏',
        cta: '如果你也是追求性价比的姐妹，记得关注我哦～ 💕 评论区告诉我你最想看什么品类的测评！',
        tags: ['情绪共鸣', '人设建立'],
        structure: ['Hook（自我介绍）', '价值主张', '内容预告', 'CTA（关注引导）'],
    },
    2: {
        title: '月薪3000也能用的5款神仙水乳！第3款绝了',
        hook: '💰 月薪3000的姐妹看过来！今天分享5款我用了3个月以上的水乳，每一款都是真金白银买的，绝对真实测评！',
        body: '1. 珂润面霜 ¥89 —— 敏感肌救星，用了3个月零过敏\n2. 悦诗风吟绿茶水乳 ¥69 —— 控油一整天，油皮亲妈\n3. 至本特安修护乳 ¥79 —— 成分党最爱，修护屏障一把好手\n4. 薇诺娜舒敏保湿水 ¥98 —— 换季必备，镇定退红\n5. 肌研极润面霜 ¥59 —— 便宜大碗，保湿力拉满\n\n第3款真的是我的年度爱用！用完一瓶又回购了两瓶 😍',
        cta: '姐妹们你们用过哪款？评论区分享你的平价爱用物！觉得有用的话记得点赞收藏～',
        tags: ['干货分享', '痛点击中'],
        structure: ['Hook（痛点切入）', '产品逐一介绍', '个人推荐', 'CTA（互动引导）'],
    },
    3: {
        title: '被骗了3年！这些大牌平替居然只要29.9？！',
        hook: '🤯 被骗了3年！我居然花了大几千买的护肤品，居然有29.9的平替？！今天就来扒一扒那些大牌不想让你知道的秘密！',
        body: '【视频脚本】\n\n开头（0-3秒）：震惊脸 + "我居然被骗了3年！"\n\n正文：逐一对比大牌和平替的成分、质地、效果\n• SK-II神仙水 vs 某国货精华水（成分相似度87%）\n• 兰蔻小黑瓶 vs 某平替精华（核心成分一致）\n• 雅诗兰黛眼霜 vs 某国货眼霜（质地几乎一样）\n\n高潮：盲测环节，闺蜜分不出哪个是大牌\n\n结尾：总结省钱金额 "一共帮你省了2000块！"',
        cta: '你们还想看什么产品的平替？评论区告诉我！记得关注我，下期更精彩～ 🔥',
        tags: ['情绪共鸣', '热点追踪'],
        structure: ['Hook（震惊反转）', '对比展示', '盲测高潮', 'CTA（评论引导）'],
    },
    4: {
        title: '2026春夏必入的10支口红色号！附真人试色',
        hook: '💄 春夏换季，你的口红也该换新了！今天一次性给你们试色10支最火的春夏口红，从日常到约会全覆盖！',
        body: '🌸 日常温柔系：\n• #豆沙粉 —— 素颜也能涂的温柔色\n• #奶茶色 —— 通勤百搭不出错\n• #裸粉色 —— 黄皮友好的气质色\n\n🔥 气场全开系：\n• #正红色 —— 面试约会必备\n• #姨妈色 —— 秋冬也能用的经典\n• #酒红色 —— 高级感拉满\n\n🌈 多巴胺系：\n• #蜜桃橘 —— 今年最火的元气色\n• #西柚色 —— 显白又减龄\n• #玫瑰豆沙 —— 温柔又有气质\n\n💡 隐藏宝藏：#焦糖棕（黄皮显白天花板！）',
        cta: '每支都附上了真人试色图，黄皮白皮都能找到适合自己的～ 你最想入手哪支？评论区告诉我！',
        tags: ['干货分享', '合集沉淀'],
        structure: ['Hook（季节切入）', '分类展示', '重点推荐', 'CTA（选择互动）'],
    },
    5: {
        title: '全网都在抢的"多巴胺腮红"到底值不值？我花了500块帮你们试了',
        hook: '🔥 全网都在抢的"多巴胺腮红"到底值不值？我花了500块买了5款最火的，帮你们一个个试！省得你们踩雷！',
        body: '【视频脚本】\n\nHook（0-3秒）："花了500块买了全网最火的5款多巴胺腮红！"\n\n测评维度：\n• 显色度 ⭐⭐⭐⭐⭐\n• 持久度 ⭐⭐⭐⭐\n• 适合肤色 —— 黄皮/白皮分别试色\n• 性价比 —— 价格vs效果\n\n惊喜发现：最便宜的那款居然是最好用的！只要39.9！\n\n对比环节：5款腮红上脸对比，差距一目了然\n\n总结：如果只能买一款，我推荐第3款！',
        cta: '你们最想看哪款的详细测评？评论区告诉我！觉得有用记得点赞收藏，你的支持是我最大的动力 ❤️',
        tags: ['热点追踪', '情绪共鸣'],
        structure: ['Hook（好奇心缺口）', '多维度测评', '惊喜反转', 'CTA（评论引导）'],
    },
    6: {
        title: '你们催的"多巴胺妆容"教程来了！手残党也能学会',
        hook: '🎨 你们在评论区催了800遍的"多巴胺妆容"教程终于来了！而且我保证，手残党也能学会！',
        body: '【视频脚本】\n\n开头：展示最终妆效 + "手残党也能学会！"\n\n步骤拆解：\n1️⃣ 底妆：轻薄水润底妆打底\n2️⃣ 眼影：多巴胺配色三步法\n3️⃣ 腮红：位置决定了整个妆容的氛围感\n4️⃣ 唇妆：叠涂技巧让嘴唇更立体\n\n关键技巧：腮红位置决定了整个妆容的氛围感\n\n对比环节：同一个人，多巴胺妆 vs 日常妆\n\n彩蛋：用Day5测评的平价腮红完成整个妆容',
        cta: '学会了吗？拍照@我看看你们的多巴胺妆容！下期想看什么教程？评论区点菜～ 🎨',
        tags: ['粉丝互动', '系列延续'],
        structure: ['Hook（回应粉丝）', '步骤拆解', '对比展示', 'CTA（UGC引导）'],
    },
    7: {
        title: '从0到1000粉！7天我做对了什么？（附完整复盘）',
        hook: '🎉 7天，从0到1000粉！作为一个普通人，我是怎么做到的？今天把所有经验毫无保留地分享给你们！',
        body: '完整复盘我的增长之路：\n\nDay 1-2：冷启动期\n• 建立人设，测试内容方向\n• 关键动作：完善主页+互动激活\n\nDay 3：第一个转折点！\n• 视频内容带来了突破\n• 从图文切换到视频，互动率翻倍\n\nDay 5：爆发日！\n• 单条内容涨粉300+\n• 秘诀：热点+好奇心缺口+高质量视频\n\nDay 7：千粉达成！\n• 开启直播新阶段\n\n最重要的3个经验：\n1. 视频 > 图文（互动率高2.3倍）\n2. 蹭热点但要有自己的角度\n3. 评论区互动是涨粉的隐藏武器',
        cta: '如果你也想从0开始做自媒体，记得关注我！接下来我会分享更多增长干货 💪 评论区告诉我你现在有多少粉丝？',
        tags: ['干货分享', '里程碑'],
        structure: ['Hook（成就展示）', '时间线复盘', '经验总结', 'CTA（关注引导）'],
    },
};

// AI实时建议数据（根据Day动态变化）
export const aiSuggestions = {
    1: [
        { id: 's1-1', type: 'title', icon: 'ri-edit-line', label: '优化标题', suggestion: '建议改为："月薪3000的我，决定在小红书记录真实生活"——增加收入标签更容易引发共鸣', applied: false },
        { id: 's1-2', type: 'hook', icon: 'ri-flashlight-line', label: '强化开头3秒', suggestion: '开头加入具体数字："毕业1年，月薪3000，但我找到了让生活精致的秘密"——数字+悬念更抓人', applied: false },
        { id: 's1-3', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '在正文中加入提问："你们觉得100块以内能买到好用的护肤品吗？"——引导评论讨论', applied: false },
        { id: 's1-4', type: 'cta', icon: 'ri-user-add-line', label: '强化转粉', suggestion: 'CTA改为："关注我，每周帮你省下一顿火锅钱 🍲"——具象化关注价值', applied: false },
    ],
    2: [
        { id: 's2-1', type: 'title', icon: 'ri-edit-line', label: '优化标题', suggestion: '标题末尾加"（第3款回购了5次）"——具体数字增加可信度和好奇心', applied: false },
        { id: 's2-2', type: 'hook', icon: 'ri-flashlight-line', label: '强化开头3秒', suggestion: '开头改为："如果你的护肤预算不超过100块，这篇一定要看完！"——直接锁定目标人群', applied: false },
        { id: 's2-3', type: 'body', icon: 'ri-rhythm-line', label: '调整节奏', suggestion: '每款产品后加一句个人感受，如"用完脸滑得像剥了壳的鸡蛋"——增加生动感和记忆点', applied: false },
        { id: 's2-4', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '在第3款后插入："猜猜这款多少钱？答案在评论区！"——制造互动钩子', applied: false },
    ],
    3: [
        { id: 's3-1', type: 'hook', icon: 'ri-flashlight-line', label: '强化开头3秒', suggestion: '视频开头直接展示对比结果："左边800块，右边29.9，你能分出来吗？"——视觉冲击+悬念', applied: false },
        { id: 's3-2', type: 'body', icon: 'ri-emotion-line', label: '增强情绪', suggestion: '在揭示价格时加入夸张反应："等等...这个才29.9？！我的800块白花了？！"——情绪共鸣', applied: false },
        { id: 's3-3', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '盲测前让观众先猜："你们觉得哪个是大牌？评论区投票！"——提升参与感', applied: false },
        { id: 's3-4', type: 'cta', icon: 'ri-user-add-line', label: '强化转粉', suggestion: '结尾加："关注我，我帮你把智商税一个个扒出来 🔍"——建立持续关注的理由', applied: false },
    ],
    4: [
        { id: 's4-1', type: 'title', icon: 'ri-edit-line', label: '优化标题', suggestion: '改为"2026春夏口红色号天花板！第7支黄皮闭眼入"——加入肤色标签精准触达', applied: false },
        { id: 's4-2', type: 'body', icon: 'ri-rhythm-line', label: '调整节奏', suggestion: '10支太多容易疲劳，建议精选5支+5支快速过，重点推荐3支——波浪节奏更抓人', applied: false },
        { id: 's4-3', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '每个色系后加投票："温柔系 vs 气场系，你是哪一派？"——制造阵营对立', applied: false },
        { id: 's4-4', type: 'cta', icon: 'ri-user-add-line', label: '强化转粉', suggestion: '结尾预告："下期出这10支的详细试色对比视频，关注不迷路！"——预告下期锁粉', applied: false },
    ],
    5: [
        { id: 's5-1', type: 'hook', icon: 'ri-flashlight-line', label: '强化开头3秒', suggestion: '开头直接展示最惊艳的上脸效果："这个颜色也太绝了吧？！而且只要39.9！"——结果前置', applied: false },
        { id: 's5-2', type: 'body', icon: 'ri-emotion-line', label: '增强情绪', suggestion: '在发现最便宜那款最好用时，加入真实反应："等等...不是吧？！39.9的居然吊打200块的？！"', applied: false },
        { id: 's5-3', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '测评前让观众猜："你们猜5款里哪款最好用？猜对的评论区抽奖送同款！"——抽奖+互动', applied: false },
        { id: 's5-4', type: 'cta', icon: 'ri-user-add-line', label: '强化转粉', suggestion: '结尾加："想看更多省钱测评？关注我，每周帮你避雷+种草！"——明确关注价值', applied: false },
    ],
    6: [
        { id: 's6-1', type: 'hook', icon: 'ri-flashlight-line', label: '强化开头3秒', suggestion: '开头先展示完成妆效的惊艳对比："看到最后的对比你会惊呆的！"——结果悬念', applied: false },
        { id: 's6-2', type: 'body', icon: 'ri-rhythm-line', label: '调整节奏', suggestion: '每个步骤后加"小tips"环节，如"腮红打在苹果肌偏上的位置，减龄10岁！"——增加干货密度', applied: false },
        { id: 's6-3', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '教程结束后加："学会了扣1，没学会扣2，我出详细版！"——简单互动门槛低', applied: false },
        { id: 's6-4', type: 'cta', icon: 'ri-user-add-line', label: '强化转粉', suggestion: '彩蛋后加："用了Day5推荐的39.9腮红，效果居然这么好！链接在主页"——引流到主页', applied: false },
    ],
    7: [
        { id: 's7-1', type: 'hook', icon: 'ri-flashlight-line', label: '强化开头3秒', suggestion: '开头用数据冲击："7天，0粉丝到1024粉丝，0投放，纯靠内容！"——数字+反差', applied: false },
        { id: 's7-2', type: 'body', icon: 'ri-emotion-line', label: '增强情绪', suggestion: '在Day5爆发段加入真实心情："那天晚上看着涨粉通知停不下来，我激动得睡不着觉"——真实感', applied: false },
        { id: 's7-3', type: 'interaction', icon: 'ri-chat-smile-2-line', label: '增加互动点', suggestion: '在经验总结后加："你觉得最重要的是哪一条？评论区投票！"——引导深度讨论', applied: false },
        { id: 's7-4', type: 'cta', icon: 'ri-user-add-line', label: '强化转粉', suggestion: '结尾加："接下来的目标是1万粉！想和我一起成长的姐妹，关注+评论打卡！"——共同成长感', applied: false },
    ],
};

// AI快捷操作
export const aiQuickActions = [
    { id: 'optimize-all', icon: '✨', label: '一键优化全文', desc: 'AI重写标题+开头+CTA', color: 'from-dior-gold to-yellow-600' },
    { id: 'viral-version', icon: '🔥', label: '生成爆款版本', desc: '用爆款公式重构内容', color: 'from-red-500 to-orange-500' },
    { id: 'boost-follow', icon: '🎯', label: '强化转粉能力', desc: '优化关注引导话术', color: 'from-blue-500 to-cyan-500' },
    { id: 'add-comment', icon: '💬', label: '增加评论引导', desc: '植入互动触发点', color: 'from-green-500 to-emerald-500' },
];

// 增长总结数据
export const growthSummary = {
    totalFollowers: 1024,
    totalViews: 108420,
    totalLikes: 5193,
    totalComments: 1138,
    totalShares: 679,
    totalContents: 7,
    avgDailyGrowth: 146,
    peakDailyGrowth: 368,
    peakDay: 5,
    completionRate: '102.4%',
    aiScore: 92,
    viralRate: '42.8%',
    avgEngagement: '6.3%',
    bestContentType: '视频笔记',
    bestStructure: '热点+测评',
    bestTiming: '20:00-22:00',
};
