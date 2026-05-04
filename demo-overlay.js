// ViralLoop 演示模式UI覆盖层
// 全屏沉浸式演示界面 - 有剧情、有节奏、有高潮
import { demoEngine, PHASE_DATA, PHASE_ORDER, DEMO_PHASES } from './demo-story.js';
import { drawLineChart } from './charts.js';

// 数字滚动动画
function animateNumber(el, target, duration = 1200, prefix = '', suffix = '') {
    const start = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
    const diff = target - start;
    const startTime = performance.now();
    function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + diff * eased);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// 高光提示消息
const HIGHLIGHT_MESSAGES = {
    problem: { icon: '⚠️', text: 'AI发现问题', color: '#ef4444' },
    ai_analyzing: { icon: '🔍', text: '正在分析数据...', color: '#3b82f6' },
    ai_fixing: { icon: '🔧', text: '正在优化策略', color: '#A99563' },
    growing: { icon: '📈', text: '增长拐点已到来', color: '#22c55e' },
    explosion: { icon: '🔥', text: '爆款内容出现！', color: '#ff6b35' },
    stable: { icon: '✅', text: 'AI持续优化中', color: '#A99563' },
    milestone: { icon: '🎉', text: '千粉里程碑达成！', color: '#fbbf24' },
    finale: { icon: '🏆', text: 'AI让普通人拥有增长系统', color: '#A99563' },
};

export function launchDemoStory() {
    // 创建全屏覆盖层
    const overlay = document.createElement('div');
    overlay.id = 'demo-story-overlay';
    overlay.className = 'demo-overlay';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // 渲染初始UI
    overlay.innerHTML = buildOverlayHTML();

    // 绑定控制按钮
    bindControls(overlay);

    // 监听阶段变化
    const unsubPhase = demoEngine.on('phase-change', ({ phase, data }) => {
        renderPhase(overlay, phase, data);
    });

    const unsubComplete = demoEngine.on('complete', () => {
        showFinale(overlay);
    });

    // 存储清理函数
    overlay._cleanup = () => {
        unsubPhase();
        unsubComplete();
        demoEngine.stop();
        document.body.style.overflow = '';
    };

    // 启动引擎
    setTimeout(() => {
        overlay.classList.add('active');
        demoEngine.start();
    }, 100);
}

function buildOverlayHTML() {
    return `
        <div class="demo-overlay-inner">
            <!-- 顶部控制栏 -->
            <div class="demo-topbar">
                <div class="demo-topbar-left">
                    <div class="demo-logo">
                        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-dior-gold to-yellow-600 flex items-center justify-center">
                            <i class="ri-rocket-2-fill text-white text-xs"></i>
                        </div>
                        <span class="text-sm font-bold text-cream/90">Viral<span class="shimmer-text">Loop</span></span>
                        <span class="demo-mode-badge">DEMO</span>
                    </div>
                </div>
                <div class="demo-topbar-center">
                    <div class="demo-progress-track" id="demo-progress-track">
                        ${PHASE_ORDER.map((_, i) => `<div class="demo-progress-dot" data-index="${i}"></div>`).join('')}
                        <div class="demo-progress-line"><div class="demo-progress-line-fill" id="demo-progress-fill"></div></div>
                    </div>
                </div>
                <div class="demo-topbar-right">
                    <button class="demo-ctrl-btn" id="demo-btn-pause" title="暂停"><i class="ri-pause-fill"></i></button>
                    <button class="demo-ctrl-btn" id="demo-btn-skip" title="跳过"><i class="ri-skip-forward-fill"></i></button>
                    <button class="demo-ctrl-btn demo-ctrl-close" id="demo-btn-close" title="退出"><i class="ri-close-line"></i></button>
                </div>
            </div>

            <!-- Day指示器 -->
            <div class="demo-day-indicator" id="demo-day-indicator">
                <span class="demo-day-label" id="demo-day-label">准备开始</span>
            </div>

            <!-- 主内容区 -->
            <div class="demo-main-content" id="demo-main-content">
                <div class="demo-loading">
                    <div class="demo-loading-ring"></div>
                    <p class="text-cream/60 text-sm mt-4">正在加载增长故事...</p>
                </div>
            </div>

            <!-- 高光提示 -->
            <div class="demo-highlight-toast" id="demo-highlight-toast"></div>

            <!-- 底部数据条 -->
            <div class="demo-bottom-bar" id="demo-bottom-bar">
                <div class="demo-stat-item">
                    <i class="ri-user-heart-line text-dior-gold"></i>
                    <div>
                        <div class="demo-stat-value" id="demo-stat-followers">0</div>
                        <div class="demo-stat-label">粉丝</div>
                    </div>
                </div>
                <div class="demo-stat-item">
                    <i class="ri-eye-line text-dior-gold"></i>
                    <div>
                        <div class="demo-stat-value" id="demo-stat-views">0</div>
                        <div class="demo-stat-label">总浏览</div>
                    </div>
                </div>
                <div class="demo-stat-item">
                    <i class="ri-heart-3-line text-dior-gold"></i>
                    <div>
                        <div class="demo-stat-value" id="demo-stat-likes">0</div>
                        <div class="demo-stat-label">总点赞</div>
                    </div>
                </div>
                <div class="demo-stat-item demo-stat-chart">
                    <canvas id="demo-mini-chart" style="width:180px;height:50px;"></canvas>
                </div>
            </div>
        </div>
    `;
}

function bindControls(overlay) {
    overlay.querySelector('#demo-btn-pause').addEventListener('click', () => {
        const btn = overlay.querySelector('#demo-btn-pause');
        if (demoEngine.isPaused) {
            demoEngine.resume();
            btn.innerHTML = '<i class="ri-pause-fill"></i>';
            btn.title = '暂停';
        } else {
            demoEngine.pause();
            btn.innerHTML = '<i class="ri-play-fill"></i>';
            btn.title = '播放';
        }
    });

    overlay.querySelector('#demo-btn-skip').addEventListener('click', () => {
        demoEngine.skip();
    });

    overlay.querySelector('#demo-btn-close').addEventListener('click', () => {
        closeDemoOverlay(overlay);
    });

    // ESC键退出
    const escHandler = (e) => {
        if (e.key === 'Escape') closeDemoOverlay(overlay);
    };
    document.addEventListener('keydown', escHandler);
    overlay._escHandler = escHandler;
}

function closeDemoOverlay(overlay) {
    overlay.classList.remove('active');
    overlay.classList.add('closing');
    if (overlay._cleanup) overlay._cleanup();
    if (overlay._escHandler) document.removeEventListener('keydown', overlay._escHandler);
    setTimeout(() => {
        overlay.remove();
    }, 500);
}

// 渲染各阶段内容
function renderPhase(overlay, phase, data) {
    const mainContent = overlay.querySelector('#demo-main-content');
    const dayIndicator = overlay.querySelector('#demo-day-label');

    // 更新Day指示器
    dayIndicator.textContent = data.label;
    dayIndicator.className = 'demo-day-label';
    if (data.highlight === 'explosion') dayIndicator.classList.add('explosion');
    if (data.highlight === 'milestone') dayIndicator.classList.add('milestone');

    // 更新进度条
    updateProgress(overlay, demoEngine.getProgress());

    // 更新底部数据（带动画）
    updateBottomStats(overlay, data);

    // 显示高光提示
    if (data.highlight && HIGHLIGHT_MESSAGES[data.highlight]) {
        showHighlightToast(overlay, HIGHLIGHT_MESSAGES[data.highlight]);
    }

    // 渲染主内容区
    mainContent.classList.add('demo-content-exit');
    setTimeout(() => {
        mainContent.classList.remove('demo-content-exit');
        mainContent.classList.add('demo-content-enter');
        mainContent.innerHTML = buildPhaseContent(phase, data);
        // 触发内部动画
        requestAnimationFrame(() => triggerPhaseAnimations(mainContent, phase, data));
        setTimeout(() => mainContent.classList.remove('demo-content-enter'), 600);
    }, 300);
}

function buildPhaseContent(phase, data) {
    switch (phase) {
        case DEMO_PHASES.INTRO:
            return buildIntroContent(data);
        case DEMO_PHASES.DAY1:
        case DEMO_PHASES.DAY2:
            return buildDayContent(data);
        case DEMO_PHASES.DAY3_PROBLEM:
            return buildProblemContent(data);
        case DEMO_PHASES.DAY3_AI_DETECT:
            return buildAIDetectContent(data);
        case DEMO_PHASES.DAY3_AI_FIX:
            return buildAIFixContent(data);
        case DEMO_PHASES.DAY4_GROWTH:
        case DEMO_PHASES.DAY6_STABLE:
            return buildGrowthContent(data);
        case DEMO_PHASES.DAY5_EXPLOSION:
            return buildExplosionContent(data);
        case DEMO_PHASES.DAY7_MILESTONE:
            return buildMilestoneContent(data);
        case DEMO_PHASES.FINALE:
            return buildFinaleContent(data);
        default:
            return '';
    }
}

// ========== 各阶段内容构建 ==========

function buildIntroContent(data) {
    return `
        <div class="demo-intro-scene">
            <div class="demo-intro-ring">
                <div class="demo-intro-ring-inner">
                    <span class="text-5xl">🚀</span>
                </div>
            </div>
            <h1 class="demo-intro-title">${data.title}</h1>
            <p class="demo-intro-subtitle">${data.subtitle}</p>
            <div class="demo-intro-steps">
                <div class="demo-intro-step"><span class="demo-step-num">01</span><span>人设定制</span></div>
                <div class="demo-intro-arrow"><i class="ri-arrow-right-line"></i></div>
                <div class="demo-intro-step"><span class="demo-step-num">02</span><span>内容创作</span></div>
                <div class="demo-intro-arrow"><i class="ri-arrow-right-line"></i></div>
                <div class="demo-intro-step"><span class="demo-step-num">03</span><span>AI优化</span></div>
                <div class="demo-intro-arrow"><i class="ri-arrow-right-line"></i></div>
                <div class="demo-intro-step highlight"><span class="demo-step-num">🎯</span><span>1000粉</span></div>
            </div>
        </div>
    `;
}

function buildDayContent(data) {
    return `
        <div class="demo-day-scene">
            <div class="demo-scene-header">
                <div class="demo-scene-badge day${data.day}">Day ${data.day}</div>
                <div>
                    <h2 class="demo-scene-title">${data.title}</h2>
                    <p class="demo-scene-subtitle">${data.subtitle}</p>
                </div>
            </div>
            <div class="demo-content-card">
                <div class="demo-content-card-header">
                    <span class="demo-content-type">${data.contentType}</span>
                    <span class="demo-content-status">已发布</span>
                </div>
                <h3 class="demo-content-title">${data.contentTitle}</h3>
                <div class="demo-content-metrics">
                    <div class="demo-metric"><i class="ri-eye-line"></i><span class="demo-metric-val" data-target="${data.views}">0</span><span class="demo-metric-label">浏览</span></div>
                    <div class="demo-metric"><i class="ri-heart-3-line"></i><span class="demo-metric-val" data-target="${data.likes}">0</span><span class="demo-metric-label">点赞</span></div>
                    <div class="demo-metric"><i class="ri-chat-3-line"></i><span class="demo-metric-val" data-target="${data.comments}">0</span><span class="demo-metric-label">评论</span></div>
                    <div class="demo-metric"><i class="ri-user-add-line"></i><span class="demo-metric-val followers" data-target="${data.followers}">0</span><span class="demo-metric-label">涨粉</span></div>
                </div>
            </div>
            <div class="demo-day-insight">
                <i class="ri-robot-2-line text-dior-gold"></i>
                <span>数据表现${data.day === 1 ? '正常，冷启动期需要耐心' : '平稳，需要寻找突破口'}</span>
            </div>
        </div>
    `;
}

function buildProblemContent(data) {
    return `
        <div class="demo-problem-scene">
            <div class="demo-scene-header">
                <div class="demo-scene-badge problem">Day ${data.day}</div>
                <div>
                    <h2 class="demo-scene-title">${data.title}</h2>
                    <p class="demo-scene-subtitle">${data.subtitle}</p>
                </div>
            </div>
            <div class="demo-content-card problem">
                <div class="demo-content-card-header">
                    <span class="demo-content-type">${data.contentType}</span>
                    <span class="demo-content-status problem">⚠️ 表现不佳</span>
                </div>
                <h3 class="demo-content-title">${data.contentTitle}</h3>
                <div class="demo-content-metrics">
                    <div class="demo-metric problem"><i class="ri-eye-line"></i><span class="demo-metric-val" data-target="${data.views}">0</span><span class="demo-metric-label">浏览 ↓</span></div>
                    <div class="demo-metric problem"><i class="ri-heart-3-line"></i><span class="demo-metric-val" data-target="${data.likes}">0</span><span class="demo-metric-label">点赞 ↓</span></div>
                    <div class="demo-metric problem"><i class="ri-user-add-line"></i><span class="demo-metric-val" data-target="3">0</span><span class="demo-metric-label">涨粉 ↓</span></div>
                </div>
            </div>
            <div class="demo-problem-list">
                <div class="demo-problem-header"><i class="ri-alarm-warning-line"></i>AI检测到以下问题</div>
                ${data.problems.map((p, i) => `
                    <div class="demo-problem-item" style="animation-delay: ${0.3 + i * 0.2}s">
                        <i class="${p.icon}"></i>
                        <span>${p.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function buildAIDetectContent(data) {
    return `
        <div class="demo-ai-scene">
            <div class="demo-ai-analyzing">
                <div class="demo-ai-brain">
                    <div class="demo-ai-brain-ring"></div>
                    <i class="ri-brain-line text-3xl text-dior-gold"></i>
                </div>
                <h2 class="demo-scene-title mt-6">${data.title}</h2>
                <p class="demo-scene-subtitle">${data.subtitle}</p>
            </div>
            <div class="demo-ai-score-card">
                <div class="demo-ai-score-ring" style="--score: ${data.analysis.score}">
                    <div class="demo-ai-score-inner">
                        <span class="demo-ai-score-num">${data.analysis.score}</span>
                        <span class="demo-ai-score-label">内容评分</span>
                    </div>
                </div>
                <div class="demo-ai-issues">
                    ${data.analysis.issues.map((issue, i) => `
                        <div class="demo-ai-issue" style="animation-delay: ${0.8 + i * 0.3}s">
                            <span class="demo-issue-severity ${issue.severity}">${issue.severity === 'high' ? '严重' : '中等'}</span>
                            <div>
                                <div class="demo-issue-title">${issue.title}</div>
                                <div class="demo-issue-detail">${issue.detail}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function buildAIFixContent(data) {
    return `
        <div class="demo-fix-scene">
            <div class="demo-scene-header">
                <div class="demo-scene-badge ai">AI</div>
                <div>
                    <h2 class="demo-scene-title">${data.title}</h2>
                    <p class="demo-scene-subtitle">${data.subtitle}</p>
                </div>
            </div>
            <div class="demo-optimizations">
                ${data.optimizations.map((opt, i) => `
                    <div class="demo-opt-card" style="animation-delay: ${i * 0.4}s">
                        <div class="demo-opt-header">
                            <span class="demo-opt-dimension">${opt.dimension}</span>
                            <span class="demo-opt-improvement">${opt.improvement}</span>
                        </div>
                        <div class="demo-opt-compare">
                            <div class="demo-opt-before">
                                <span class="demo-opt-label">优化前</span>
                                <p>${opt.before}</p>
                            </div>
                            <div class="demo-opt-arrow"><i class="ri-arrow-right-line"></i></div>
                            <div class="demo-opt-after">
                                <span class="demo-opt-label">优化后</span>
                                <p>${opt.after}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function buildGrowthContent(data) {
    const isDay6 = data.day === 6;
    return `
        <div class="demo-growth-scene">
            <div class="demo-scene-header">
                <div class="demo-scene-badge growth">Day ${data.day}</div>
                <div>
                    <h2 class="demo-scene-title">${data.title}</h2>
                    <p class="demo-scene-subtitle">${data.subtitle}</p>
                </div>
            </div>
            <div class="demo-content-card growth">
                <div class="demo-content-card-header">
                    <span class="demo-content-type">${data.contentType}</span>
                    <span class="demo-content-status growth">📈 ${isDay6 ? '持续增长' : '快速增长'}</span>
                </div>
                <h3 class="demo-content-title">${data.contentTitle}</h3>
                <div class="demo-content-metrics">
                    <div class="demo-metric growth"><i class="ri-eye-line"></i><span class="demo-metric-val" data-target="${data.views}">0</span><span class="demo-metric-label">浏览</span></div>
                    <div class="demo-metric growth"><i class="ri-heart-3-line"></i><span class="demo-metric-val" data-target="${data.likes}">0</span><span class="demo-metric-label">点赞</span></div>
                    <div class="demo-metric growth"><i class="ri-chat-3-line"></i><span class="demo-metric-val" data-target="${data.comments}">0</span><span class="demo-metric-label">评论</span></div>
                    <div class="demo-metric growth"><i class="ri-user-add-line"></i><span class="demo-metric-val followers" data-target="${data.followers - (isDay6 ? 538 : 18)}">0</span><span class="demo-metric-label">涨粉</span></div>
                </div>
            </div>
            <div class="demo-day-insight growth">
                <i class="ri-robot-2-line text-green-400"></i>
                <span>${isDay6 ? 'AI建议：乘胜追击发布续集内容，保持增长势头' : 'AI优化生效！内容互动率提升320%，继续保持'}</span>
            </div>
        </div>
    `;
}

function buildExplosionContent(data) {
    return `
        <div class="demo-explosion-scene">
            <div class="demo-explosion-badge">🔥 爆款诞生</div>
            <div class="demo-scene-header">
                <div class="demo-scene-badge explosion">Day ${data.day}</div>
                <div>
                    <h2 class="demo-scene-title explosion">${data.title}</h2>
                    <p class="demo-scene-subtitle">${data.subtitle}</p>
                </div>
            </div>
            <div class="demo-content-card explosion">
                <div class="demo-content-card-header">
                    <span class="demo-content-type">${data.contentType}</span>
                    <span class="demo-content-status explosion">🔥 爆款</span>
                </div>
                <h3 class="demo-content-title">${data.contentTitle}</h3>
                <div class="demo-content-metrics">
                    <div class="demo-metric explosion"><i class="ri-eye-line"></i><span class="demo-metric-val" data-target="${data.views}">0</span><span class="demo-metric-label">浏览</span></div>
                    <div class="demo-metric explosion"><i class="ri-heart-3-line"></i><span class="demo-metric-val" data-target="${data.likes}">0</span><span class="demo-metric-label">点赞</span></div>
                    <div class="demo-metric explosion"><i class="ri-chat-3-line"></i><span class="demo-metric-val" data-target="${data.comments}">0</span><span class="demo-metric-label">评论</span></div>
                    <div class="demo-metric explosion"><i class="ri-share-forward-line"></i><span class="demo-metric-val" data-target="${data.shares}">0</span><span class="demo-metric-label">分享</span></div>
                    <div class="demo-metric explosion highlight"><i class="ri-user-add-line"></i><span class="demo-metric-val followers" data-target="400">0</span><span class="demo-metric-label">涨粉</span></div>
                </div>
            </div>
        </div>
    `;
}

function buildMilestoneContent(data) {
    return `
        <div class="demo-milestone-scene">
            <div class="demo-milestone-celebration">
                <div class="demo-milestone-ring">
                    <div class="demo-milestone-ring-inner">
                        <span class="text-5xl">🏆</span>
                    </div>
                </div>
                <h2 class="demo-milestone-title">1000+ 粉丝达成！</h2>
                <p class="demo-milestone-subtitle">7天 · 7条内容 · 从0到1024</p>
            </div>
            <div class="demo-content-card milestone">
                <div class="demo-content-card-header">
                    <span class="demo-content-type">${data.contentType}</span>
                    <span class="demo-content-status milestone">🎉 里程碑</span>
                </div>
                <h3 class="demo-content-title">${data.contentTitle}</h3>
                <div class="demo-content-metrics">
                    <div class="demo-metric milestone"><i class="ri-eye-line"></i><span class="demo-metric-val" data-target="${data.views}">0</span><span class="demo-metric-label">浏览</span></div>
                    <div class="demo-metric milestone"><i class="ri-heart-3-line"></i><span class="demo-metric-val" data-target="${data.likes}">0</span><span class="demo-metric-label">点赞</span></div>
                    <div class="demo-metric milestone"><i class="ri-user-add-line"></i><span class="demo-metric-val followers" data-target="212">0</span><span class="demo-metric-label">涨粉</span></div>
                </div>
            </div>
        </div>
    `;
}

function buildFinaleContent(data) {
    return `
        <div class="demo-finale-scene">
            <div class="demo-finale-header">
                <h1 class="demo-finale-title">AI让普通人拥有增长系统</h1>
                <p class="demo-finale-subtitle">7天 · 7条内容 · 1024粉丝 · 9.5万浏览</p>
            </div>
            <div class="demo-finale-chart">
                <h3 class="demo-finale-section-title"><i class="ri-line-chart-line"></i>粉丝增长曲线</h3>
                <canvas id="demo-finale-chart" style="width:100%;height:200px;"></canvas>
            </div>
            <div class="demo-finale-top3">
                <h3 class="demo-finale-section-title"><i class="ri-fire-line"></i>Top 3 爆款内容</h3>
                <div class="demo-finale-top-list">
                    ${data.topContent.map((c, i) => `
                        <div class="demo-finale-top-item" style="animation-delay: ${0.3 + i * 0.2}s">
                            <span class="demo-finale-rank rank-${i + 1}">${i + 1}</span>
                            <div class="demo-finale-top-info">
                                <div class="demo-finale-top-title">Day${c.day} · ${c.title}</div>
                                <div class="demo-finale-top-stats">
                                    <span><i class="ri-eye-line"></i>${c.views >= 10000 ? (c.views / 10000).toFixed(1) + '万' : c.views}</span>
                                    <span><i class="ri-user-add-line"></i>+${c.followers}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="demo-finale-actions">
                <button class="demo-finale-btn primary" id="demo-restart-btn"><i class="ri-restart-line"></i>重新播放</button>
                <button class="demo-finale-btn secondary" id="demo-explore-btn"><i class="ri-compass-3-line"></i>探索产品</button>
            </div>
        </div>
    `;
}

// ========== 动画触发 ==========

function triggerPhaseAnimations(container, phase, data) {
    // 数字滚动动画
    container.querySelectorAll('.demo-metric-val').forEach(el => {
        const target = parseInt(el.dataset.target) || 0;
        animateNumber(el, target, 1500);
    });

    // Finale图表
    if (phase === DEMO_PHASES.FINALE) {
        setTimeout(() => {
            const canvas = container.querySelector('#demo-finale-chart');
            if (canvas) {
                drawLineChart(canvas, null, {
                    labels: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
                    values: [5, 15, 18, 138, 538, 767, 1024],
                    color: '#A99563',
                    fillColor: 'rgba(169, 149, 99, 0.2)',
                    showValues: true,
                });
            }
        }, 400);

        // 绑定结束按钮
        setTimeout(() => {
            const restartBtn = container.querySelector('#demo-restart-btn');
            const exploreBtn = container.querySelector('#demo-explore-btn');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    demoEngine.restart();
                });
            }
            if (exploreBtn) {
                exploreBtn.addEventListener('click', () => {
                    const overlay = document.querySelector('#demo-story-overlay');
                    if (overlay) closeDemoOverlay(overlay);
                });
            }
        }, 100);
    }
}

// ========== 辅助函数 ==========

function updateProgress(overlay, progress) {
    const fill = overlay.querySelector('#demo-progress-fill');
    if (fill) {
        fill.style.width = `${progress.percent}%`;
    }
    overlay.querySelectorAll('.demo-progress-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i <= progress.current - 1);
        dot.classList.toggle('current', i === progress.current - 1);
    });
}

function updateBottomStats(overlay, data) {
    // 累计数据
    const allPhases = PHASE_ORDER.slice(0, demoEngine.currentPhaseIndex + 1);
    let totalViews = 0, totalLikes = 0;
    allPhases.forEach(p => {
        const pd = PHASE_DATA[p];
        if (pd.views) totalViews += pd.views;
        if (pd.likes) totalLikes += pd.likes;
    });

    const fEl = overlay.querySelector('#demo-stat-followers');
    const vEl = overlay.querySelector('#demo-stat-views');
    const lEl = overlay.querySelector('#demo-stat-likes');
    if (fEl) animateNumber(fEl, data.followers || 0, 1200);
    if (vEl) animateNumber(vEl, totalViews, 1200);
    if (lEl) animateNumber(lEl, totalLikes, 1200);

    // 更新迷你图表
    updateMiniChart(overlay);
}

function updateMiniChart(overlay) {
    const canvas = overlay.querySelector('#demo-mini-chart');
    if (!canvas) return;
    const idx = demoEngine.currentPhaseIndex;
    const followerHistory = [];
    for (let i = 0; i <= idx && i < PHASE_ORDER.length; i++) {
        const pd = PHASE_DATA[PHASE_ORDER[i]];
        if (pd.followers !== undefined) followerHistory.push(pd.followers);
    }
    if (followerHistory.length < 2) return;
    drawLineChart(canvas, null, {
        labels: followerHistory.map((_, i) => ''),
        values: followerHistory,
        color: '#A99563',
        fillColor: 'rgba(169, 149, 99, 0.3)',
        showDots: false,
        showLabels: false,
        showGrid: false,
        showValues: false,
    });
}

function showHighlightToast(overlay, msg) {
    const toast = overlay.querySelector('#demo-highlight-toast');
    if (!toast) return;
    toast.innerHTML = `<span class="demo-toast-icon" style="color:${msg.color}">${msg.icon}</span><span>${msg.text}</span>`;
    toast.style.borderColor = msg.color + '40';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function showFinale(overlay) {
    // 已在phase-change中处理
}
