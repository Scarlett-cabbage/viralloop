// 内容详情页
import { router } from '../router.js';
import { growthPlan } from '../data.js';
import { renderNavbar, renderFooter, renderTag, renderAIExplain } from '../components.js';

export function renderContentDetail(container, params) {
    renderNavbar(container, 'content');

    const dayIndex = parseInt(params.day || '1') - 1;
    const day = growthPlan[dayIndex] || growthPlan[0];
    const prevDay = dayIndex > 0 ? growthPlan[dayIndex - 1] : null;
    const nextDay = dayIndex < growthPlan.length - 1 ? growthPlan[dayIndex + 1] : null;
    const dailyGrowth = day.followers - (prevDay ? prevDay.followers : 0);

    const page = document.createElement('div');
    page.className = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8';

    page.innerHTML = `
        <!-- 面包屑 -->
        <div class="flex items-center gap-2 text-sm text-lv-brown/40 mb-6 fade-in">
            <span class="cursor-pointer hover:text-dior-gold transition-colors" id="back-plan">增长计划</span>
            <i class="ri-arrow-right-s-line"></i>
            <span class="text-lv-brown font-medium">Day ${day.day} · ${day.title}</span>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
            <!-- 左侧主内容 -->
            <div class="lg:col-span-2 space-y-6">
                <!-- 内容卡片 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 overflow-hidden fade-in fade-in-delay-1">
                    <div class="bg-gradient-to-r from-lv-brown to-lv-brown-dark p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-dior-gold/20 flex items-center justify-center">
                                <span class="text-lg">📝</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-cream font-semibold">Day ${day.day}</span>
                                    ${renderTag(day.tag)}
                                </div>
                                <span class="text-cream/40 text-xs">${day.date} · ${day.contentType}</span>
                            </div>
                        </div>
                        <h2 class="text-xl font-bold text-cream leading-relaxed">${day.contentTitle}</h2>
                    </div>
                    <div class="p-6">
                        <h3 class="font-semibold text-lv-brown mb-3 flex items-center gap-2">
                            <i class="ri-file-text-line text-dior-gold"></i>内容预览
                        </h3>
                        <div class="bg-cream/50 rounded-lg p-4 text-sm text-lv-brown/70 leading-relaxed space-y-3">
                            ${generateContentPreview(day)}
                        </div>
                    </div>
                </div>

                <!-- 今日任务 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-6 fade-in fade-in-delay-2">
                    <h3 class="font-semibold text-lv-brown mb-4 flex items-center gap-2">
                        <i class="ri-checkbox-circle-line text-dior-gold"></i>今日任务清单
                    </h3>
                    <div class="space-y-3">
                        ${day.tasks.map((t, i) => `
                            <div class="flex items-center gap-3 p-3 rounded-lg bg-cream/30 hover:bg-cream/60 transition-colors">
                                <div class="w-6 h-6 rounded-full ${day.status === 'completed' || day.status === 'active' ? 'bg-green-500' : 'bg-lv-brown/10'} flex items-center justify-center flex-shrink-0">
                                    <i class="ri-check-line text-white text-xs"></i>
                                </div>
                                <span class="text-sm text-lv-brown/70">${t}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${renderAIExplain(day.aiExplain)}

                <!-- 导航按钮 -->
                <div class="flex items-center justify-between">
                    ${prevDay ? `<button class="btn-secondary text-sm" id="prev-day"><i class="ri-arrow-left-line"></i>Day ${prevDay.day}</button>` : '<div></div>'}
                    ${nextDay ? `<button class="btn-primary text-sm" id="next-day">Day ${nextDay.day}<i class="ri-arrow-right-line"></i></button>` : `<button class="btn-primary text-sm" id="go-distribution">查看分发策略<i class="ri-arrow-right-line"></i></button>`}
                </div>
            </div>

            <!-- 右侧数据面板 -->
            <div class="space-y-6 fade-in fade-in-delay-3">
                <!-- 数据概览 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                    <h3 class="font-semibold text-lv-brown mb-4 text-sm flex items-center gap-2">
                        <i class="ri-bar-chart-2-line text-dior-gold"></i>内容数据
                    </h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.views.toLocaleString()}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">浏览量</div>
                        </div>
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.likes.toLocaleString()}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">点赞数</div>
                        </div>
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.comments}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">评论数</div>
                        </div>
                        <div class="bg-cream/50 rounded-lg p-3 text-center">
                            <div class="text-xl font-bold text-lv-brown">${day.shares}</div>
                            <div class="text-xs text-lv-brown/40 mt-1">分享数</div>
                        </div>
                    </div>
                </div>

                <!-- 粉丝变化 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                    <h3 class="font-semibold text-lv-brown mb-4 text-sm flex items-center gap-2">
                        <i class="ri-user-heart-line text-dior-gold"></i>粉丝变化
                    </h3>
                    <div class="text-center py-4">
                        <div class="text-3xl font-bold text-lv-brown">${day.followers.toLocaleString()}</div>
                        <div class="text-sm text-lv-brown/40 mt-1">累计粉丝</div>
                        <div class="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full ${dailyGrowth > 100 ? 'bg-green-50 text-green-600' : 'bg-cream text-lv-brown/50'}">
                            <i class="ri-arrow-up-s-fill"></i>
                            <span class="text-sm font-medium">+${dailyGrowth} 今日新增</span>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-dior-gold/8">
                        <div class="flex items-center justify-between text-xs text-lv-brown/40 mb-2">
                            <span>目标进度</span>
                            <span>${day.followers}/1000</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-fill" style="width: ${Math.min(day.followers / 10, 100)}%"></div>
                        </div>
                    </div>
                </div>

                <!-- 互动率分析 -->
                <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                    <h3 class="font-semibold text-lv-brown mb-4 text-sm flex items-center gap-2">
                        <i class="ri-pulse-line text-dior-gold"></i>互动率分析
                    </h3>
                    <div class="space-y-3">
                        ${[
                            { label: '点赞率', value: ((day.likes / day.views) * 100).toFixed(1) + '%', bar: (day.likes / day.views) * 100 * 5 },
                            { label: '评论率', value: ((day.comments / day.views) * 100).toFixed(1) + '%', bar: (day.comments / day.views) * 100 * 20 },
                            { label: '分享率', value: ((day.shares / day.views) * 100).toFixed(1) + '%', bar: (day.shares / day.views) * 100 * 30 },
                        ].map(m => `
                            <div>
                                <div class="flex items-center justify-between text-xs mb-1">
                                    <span class="text-lv-brown/50">${m.label}</span>
                                    <span class="font-medium text-lv-brown">${m.value}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-bar-fill" style="width: ${Math.min(m.bar, 100)}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 快速操作 -->
                <div class="bg-lv-brown rounded-xl p-5">
                    <h3 class="font-semibold text-cream mb-3 text-sm flex items-center gap-2">
                        <i class="ri-flashlight-line text-dior-gold"></i>快速操作
                    </h3>
                    <div class="space-y-2">
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-dist-btn">
                            <i class="ri-share-forward-line text-dior-gold"></i>查看分发策略
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-analytics-btn">
                            <i class="ri-bar-chart-2-line text-dior-gold"></i>数据分析
                        </button>
                        <button class="w-full text-left text-sm text-cream/60 hover:text-cream py-2 px-3 rounded-lg hover:bg-lv-brown-light/50 transition-colors flex items-center gap-2" id="go-review-btn">
                            <i class="ri-brain-line text-dior-gold"></i>智能复盘
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(page);
    renderFooter(container);

    // 绑定事件
    page.querySelector('#back-plan').addEventListener('click', () => router.navigate('/plan'));
    if (prevDay) page.querySelector('#prev-day').addEventListener('click', () => router.navigate(`/content?day=${prevDay.day}`));
    if (nextDay) {
        page.querySelector('#next-day').addEventListener('click', () => router.navigate(`/content?day=${nextDay.day}`));
    } else {
        const goDistBtn = page.querySelector('#go-distribution');
        if (goDistBtn) goDistBtn.addEventListener('click', () => router.navigate('/distribution'));
    }
    page.querySelector('#go-dist-btn').addEventListener('click', () => router.navigate('/distribution'));
    page.querySelector('#go-analytics-btn').addEventListener('click', () => router.navigate('/analytics'));
    page.querySelector('#go-review-btn').addEventListener('click', () => router.navigate('/review'));
}

function generateContentPreview(day) {
    const previews = {
        1: `<p>👋 大家好！我是小美，一个刚毕业的普通女生。</p>
            <p>从今天开始，我要在小红书上分享我发现的那些<strong>平价好物</strong>——月薪3000也能用出高级感！</p>
            <p>我会用最真实的方式测评每一款产品，不恰饭、不滤镜，只说真话。</p>
            <p>如果你也是追求性价比的姐妹，记得关注我哦～ 💕</p>
            <p class="text-dior-gold font-medium">#平价好物 #真实测评 #学生党必看 #美妆新人</p>`,
        2: `<p>💰 月薪3000的姐妹看过来！这5款水乳真的绝了！</p>
            <p><strong>1. 珂润面霜 ¥89</strong> —— 敏感肌救星，用了3个月零过敏</p>
            <p><strong>2. 悦诗风吟绿茶水乳 ¥69</strong> —— 控油一整天，油皮亲妈</p>
            <p><strong>3. 至本特安修护乳 ¥79</strong> —— 成分党最爱，修护屏障一把好手</p>
            <p><strong>4. 薇诺娜舒敏保湿水 ¥98</strong> —— 换季必备，镇定退红</p>
            <p><strong>5. 肌研极润面霜 ¥59</strong> —— 便宜大碗，保湿力拉满</p>
            <p>第3款真的是我的年度爱用！用完一瓶又回购了两瓶 😍</p>`,
        3: `<p>🤯 被骗了3年！这些大牌平替居然只要29.9？！</p>
            <p>【视频脚本】</p>
            <p>开头（0-3秒）：震惊脸 + "我居然被骗了3年！"</p>
            <p>正文：逐一对比大牌和平替的成分、质地、效果</p>
            <p>高潮：盲测环节，闺蜜分不出哪个是大牌</p>
            <p>结尾：总结省钱金额 "一共帮你省了2000块！"</p>
            <p class="text-dior-gold font-medium">🔥 预测：该内容具有高传播潜力</p>`,
        4: `<p>💄 2026春夏必入的10支口红色号！附真人试色</p>
            <p>从日常通勤到约会聚会，一篇搞定所有场景！</p>
            <p>🌸 日常温柔系：#豆沙粉 #奶茶色 #裸粉色</p>
            <p>🔥 气场全开系：#正红色 #姨妈色 #酒红色</p>
            <p>🌈 多巴胺系：#蜜桃橘 #西柚色 #玫瑰豆沙</p>
            <p>💡 隐藏宝藏：#焦糖棕（黄皮显白天花板！）</p>
            <p>每支都附上了真人试色图，黄皮白皮都能找到适合自己的～</p>`,
        5: `<p>🔥🔥🔥 全网都在抢的"多巴胺腮红"到底值不值？</p>
            <p>【视频脚本】</p>
            <p>Hook（0-3秒）："花了500块买了全网最火的5款多巴胺腮红！"</p>
            <p>测评维度：显色度 / 持久度 / 适合肤色 / 性价比</p>
            <p>惊喜发现：最便宜的那款居然是最好用的！</p>
            <p>互动引导："你们最想看哪款的详细测评？评论区告诉我！"</p>
            <p class="text-dior-gold font-medium">🔥 爆款预测：92%概率进入热门推荐</p>`,
        6: `<p>🎨 你们催的"多巴胺妆容"教程来了！</p>
            <p>【视频脚本】</p>
            <p>开头：展示最终妆效 + "手残党也能学会！"</p>
            <p>步骤拆解：底妆→眼影→腮红→唇妆，每步都有特写</p>
            <p>关键技巧：腮红位置决定了整个妆容的氛围感</p>
            <p>对比环节：同一个人，多巴胺妆 vs 日常妆</p>
            <p>彩蛋：用Day5测评的平价腮红完成整个妆容</p>`,
        7: `<p>🎉 从0到1000粉！7天我做对了什么？</p>
            <p>完整复盘我的增长之路：</p>
            <p><strong>Day 1-2：</strong>冷启动期，建立人设，测试内容方向</p>
            <p><strong>Day 3：</strong>第一个转折点！视频内容带来了突破</p>
            <p><strong>Day 5：</strong>爆发日！单条内容涨粉300+</p>
            <p><strong>Day 7：</strong>千粉达成！开启直播新阶段</p>
            <p>最重要的3个经验：</p>
            <p>1. 视频 > 图文（互动率高2.3倍）</p>
            <p>2. 蹭热点但要有自己的角度</p>
            <p>3. 评论区互动是涨粉的隐藏武器</p>`,
    };
    return previews[day.day] || previews[1];
}
