// 人设定制页（Persona Builder）- 单页Stepper Flow重构
// 4步骤流程：选择模板 → 自定义补充 → AI生成 → 确认进入系统
import { router } from '../router.js';
import { personaTemplates } from '../data.js';
import { renderNavbar, renderFooter } from '../components.js';
import { globalState } from '../state.js';

// 当前步骤 (1-4)
let currentStep = 1;
// 选中的模板
let selectedTemplate = null;
let selectedTemplateData = null;
// 自定义补充数据
let customData = { interest: '', skill: '', goal: 'fans', platform: 'xiaohongshu', extra: '' };
// AI生成结果
let generatedPersona = null;

export function renderPersona(container) {
    // 重置状态
    currentStep = 1;
    selectedTemplate = null;
    selectedTemplateData = null;
    customData = { interest: '', skill: '', goal: 'fans', platform: 'xiaohongshu', extra: '' };
    generatedPersona = null;

    renderNavbar(container, 'persona');

    const page = document.createElement('div');
    page.className = 'persona-stepper-page';
    page.innerHTML = `
        <!-- 顶部进度条 -->
        <div class="stepper-header">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="stepper-progress-bar">
                    <div class="stepper-steps">
                        <div class="stepper-step active" data-step="1">
                            <div class="stepper-step-circle"><span>1</span></div>
                            <div class="stepper-step-label">选择人设模板</div>
                        </div>
                        <div class="stepper-connector"><div class="stepper-connector-fill" id="conn-1-2"></div></div>
                        <div class="stepper-step" data-step="2">
                            <div class="stepper-step-circle"><span>2</span></div>
                            <div class="stepper-step-label">自定义补充</div>
                        </div>
                        <div class="stepper-connector"><div class="stepper-connector-fill" id="conn-2-3"></div></div>
                        <div class="stepper-step" data-step="3">
                            <div class="stepper-step-circle"><span>3</span></div>
                            <div class="stepper-step-label">AI生成人设</div>
                        </div>
                        <div class="stepper-connector"><div class="stepper-connector-fill" id="conn-3-4"></div></div>
                        <div class="stepper-step" data-step="4">
                            <div class="stepper-step-circle"><span>4</span></div>
                            <div class="stepper-step-label">确认并进入</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 步骤内容区域 -->
        <div class="stepper-content-wrapper">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div id="stepper-content" class="stepper-content-area"></div>
            </div>
        </div>
    `;

    container.appendChild(page);
    renderFooter(container);

    // 渲染第一步
    renderStep(page);
}

function renderStep(page) {
    const contentArea = page.querySelector('#stepper-content');
    if (!contentArea) return;

    // 退出动画
    contentArea.classList.add('stepper-exit');
    setTimeout(() => {
        contentArea.innerHTML = '';
        contentArea.classList.remove('stepper-exit');
        contentArea.classList.add('stepper-enter');

        // 每次切换步骤时，立即滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'instant' });

        switch (currentStep) {
            case 1: renderStep1(contentArea); break;
            case 2: renderStep2(contentArea); break;
            case 3: renderStep3(contentArea); break;
            case 4: renderStep4(contentArea); break;
        }

        updateStepperUI(page);

        setTimeout(() => contentArea.classList.remove('stepper-enter'), 400);
    }, 200);
}

function updateStepperUI(page) {
    // 更新步骤圆圈状态
    page.querySelectorAll('.stepper-step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        if (stepNum === currentStep) step.classList.add('active');
        else if (stepNum < currentStep) step.classList.add('completed');
    });

    // 更新连接线
    for (let i = 1; i <= 3; i++) {
        const conn = page.querySelector(`#conn-${i}-${i + 1}`);
        if (conn) {
            conn.style.width = currentStep > i ? '100%' : '0%';
        }
    }
}

// ========== Step 1: 选择人设模板 ==========
function renderStep1(container) {
    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-lv-brown mb-2">选择你的人设方向</h2>
            <p class="text-sm text-lv-brown/50">每个模板都经过AI优化，选择最适合你的方向，快速开始增长之旅</p>
        </div>

        <!-- 模板卡片网格 -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8" id="template-grid"></div>

        <!-- 底部操作区 -->
        <div class="stepper-actions">
            <div></div>
            <button class="btn-primary text-sm stepper-next-btn" id="step1-next" disabled>
                下一步：自定义补充 <i class="ri-arrow-right-line"></i>
            </button>
        </div>
    `;

    // 渲染模板卡片
    const grid = container.querySelector('#template-grid');
    personaTemplates.forEach((tpl, idx) => {
        const card = document.createElement('div');
        card.className = `persona-template-card fade-in ${selectedTemplate === tpl.id ? 'selected' : ''}`;
        card.style.animationDelay = `${(idx % 4) * 0.08}s`;
        card.dataset.id = tpl.id;
        card.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${tpl.gradient} flex items-center justify-center text-2xl">
                    ${tpl.emoji}
                </div>
                <div class="flex items-center gap-1">
                    ${tpl.tags.slice(0, 2).map(t => `<span class="text-[10px] bg-dior-gold/8 text-dior-gold px-2 py-0.5 rounded-full font-medium">${t}</span>`).join('')}
                </div>
            </div>
            <h3 class="font-bold text-lv-brown text-sm mb-1">${tpl.name}</h3>
            <p class="text-xs text-lv-brown/50 mb-3 leading-relaxed line-clamp-2">${tpl.description}</p>
            <div class="flex items-center gap-2 mb-3">
                ${tpl.platforms.map(p => `<span class="text-[10px] bg-cream text-lv-brown/50 px-2 py-0.5 rounded">${p}</span>`).join('')}
            </div>
            <div class="pt-3 border-t border-dior-gold/8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1">
                        <i class="ri-fire-line text-dior-gold text-xs"></i>
                        <span class="text-[10px] text-dior-gold font-medium">热度 ${tpl.popularity}</span>
                    </div>
                    <div class="persona-select-indicator"><i class="ri-check-line"></i></div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            selectedTemplate = tpl.id;
            selectedTemplateData = tpl;
            // 预填自定义数据
            customData.interest = tpl.tags[0] || '';
            customData.skill = tpl.contentDirections?.[0]?.split('·')[0] || '';
            customData.platform = tpl.platforms.includes('小红书') ? 'xiaohongshu' : 'douyin';

            grid.querySelectorAll('.persona-template-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const nextBtn = container.querySelector('#step1-next');
            if (nextBtn) nextBtn.disabled = false;
        });

        grid.appendChild(card);
    });

    // 下一步按钮
    const nextBtn = container.querySelector('#step1-next');
    if (selectedTemplate) nextBtn.disabled = false;
    nextBtn.addEventListener('click', () => {
        if (!selectedTemplate) return;
        currentStep = 2;
        renderStep(container.closest('.persona-stepper-page'));
    });
}

// ========== Step 2: 自定义补充 ==========
function renderStep2(container) {
    const tpl = selectedTemplateData || personaTemplates[0];

    container.innerHTML = `
        <div class="grid lg:grid-cols-5 gap-8">
            <!-- 左侧表单 -->
            <div class="lg:col-span-3 space-y-6">
                <div class="text-left mb-2">
                    <h2 class="text-2xl font-bold text-lv-brown mb-2">补充你的个人信息</h2>
                    <p class="text-sm text-lv-brown/50">这些信息将帮助AI为你生成更精准的人设方案</p>
                </div>

                <div class="bg-white rounded-xl border border-dior-gold/10 p-6">
                    <div class="flex items-center gap-3 mb-5 pb-4 border-b border-dior-gold/8">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${tpl.gradient} flex items-center justify-center text-xl">${tpl.emoji}</div>
                        <div>
                            <div class="font-bold text-lv-brown">${tpl.name}</div>
                            <div class="text-xs text-lv-brown/40">已选择此模板作为基础</div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-lv-brown/70 mb-1.5">你的兴趣领域</label>
                            <input type="text" class="input-field" id="custom-interest" placeholder="例如：美妆、科技、健身、美食..." value="${customData.interest}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lv-brown/70 mb-1.5">你擅长什么</label>
                            <input type="text" class="input-field" id="custom-skill" placeholder="例如：写作、拍视频、产品测评、知识分享..." value="${customData.skill}">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lv-brown/70 mb-1.5">你的目标</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label class="flex items-center gap-3 p-3 rounded-lg border border-dior-gold/10 cursor-pointer hover:border-dior-gold/30 transition-colors custom-goal-option ${customData.goal === 'fans' ? 'border-dior-gold/40 bg-dior-gold/5' : ''}">
                                    <input type="radio" name="goal" value="fans" class="hidden" ${customData.goal === 'fans' ? 'checked' : ''}>
                                    <div class="w-5 h-5 rounded-full border-2 border-dior-gold/30 flex items-center justify-center custom-radio">
                                        <div class="w-2.5 h-2.5 rounded-full bg-dior-gold" style="opacity:${customData.goal === 'fans' ? '1' : '0'}"></div>
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-lv-brown">涨粉为主</div>
                                        <div class="text-xs text-lv-brown/40">快速积累粉丝</div>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 p-3 rounded-lg border border-dior-gold/10 cursor-pointer hover:border-dior-gold/30 transition-colors custom-goal-option ${customData.goal === 'money' ? 'border-dior-gold/40 bg-dior-gold/5' : ''}">
                                    <input type="radio" name="goal" value="money" class="hidden" ${customData.goal === 'money' ? 'checked' : ''}>
                                    <div class="w-5 h-5 rounded-full border-2 border-dior-gold/30 flex items-center justify-center custom-radio">
                                        <div class="w-2.5 h-2.5 rounded-full bg-dior-gold" style="opacity:${customData.goal === 'money' ? '1' : '0'}"></div>
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-lv-brown">变现为主</div>
                                        <div class="text-xs text-lv-brown/40">内容带货/接广告</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lv-brown/70 mb-1.5">目标平台</label>
                            <select class="input-field" id="custom-platform">
                                <option value="xiaohongshu" ${customData.platform === 'xiaohongshu' ? 'selected' : ''}>小红书</option>
                                <option value="douyin" ${customData.platform === 'douyin' ? 'selected' : ''}>抖音</option>
                                <option value="bilibili" ${customData.platform === 'bilibili' ? 'selected' : ''}>B站</option>
                                <option value="weibo" ${customData.platform === 'weibo' ? 'selected' : ''}>微博</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lv-brown/70 mb-1.5">补充说明（可选）</label>
                            <textarea class="input-field" rows="3" id="custom-extra" placeholder="任何你想让AI知道的信息...">${customData.extra}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧提示 -->
            <div class="lg:col-span-2">
                <div class="sticky top-24 space-y-4">
                    <div class="bg-gradient-to-br from-lv-brown to-lv-brown-dark rounded-xl p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="ri-lightbulb-flash-line text-dior-gold"></i>
                            <span class="text-sm font-semibold text-cream">AI会为你生成什么？</span>
                        </div>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-2 text-xs text-cream/60">
                                <i class="ri-check-double-line text-dior-gold mt-0.5 flex-shrink-0"></i>
                                专属人设名称和一句话定位
                            </li>
                            <li class="flex items-start gap-2 text-xs text-cream/60">
                                <i class="ri-check-double-line text-dior-gold mt-0.5 flex-shrink-0"></i>
                                3个精准内容方向建议
                            </li>
                            <li class="flex items-start gap-2 text-xs text-cream/60">
                                <i class="ri-check-double-line text-dior-gold mt-0.5 flex-shrink-0"></i>
                                风格定位和语气建议
                            </li>
                            <li class="flex items-start gap-2 text-xs text-cream/60">
                                <i class="ri-check-double-line text-dior-gold mt-0.5 flex-shrink-0"></i>
                                目标受众画像分析
                            </li>
                        </ul>
                    </div>
                    <div class="bg-white rounded-xl border border-dior-gold/10 p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="ri-question-line text-dior-gold"></i>
                            <span class="text-sm font-semibold text-lv-brown">不知道填什么？</span>
                        </div>
                        <p class="text-xs text-lv-brown/50 leading-relaxed">
                            没关系！这些信息都是可选的。AI会基于你选择的模板自动补全缺失信息，生成最优方案。
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部操作区 -->
        <div class="stepper-actions mt-8">
            <button class="btn-secondary text-sm" id="step2-prev">
                <i class="ri-arrow-left-line"></i> 上一步
            </button>
            <button class="btn-primary text-sm stepper-next-btn" id="step2-next">
                <i class="ri-magic-line"></i> 生成我的人设 <i class="ri-arrow-right-line"></i>
            </button>
        </div>
    `;

    // Radio按钮交互
    container.querySelectorAll('.custom-goal-option').forEach(opt => {
        opt.addEventListener('click', () => {
            container.querySelectorAll('.custom-goal-option').forEach(o => {
                o.classList.remove('border-dior-gold/40', 'bg-dior-gold/5');
                o.querySelector('.custom-radio div').style.opacity = '0';
            });
            opt.classList.add('border-dior-gold/40', 'bg-dior-gold/5');
            opt.querySelector('.custom-radio div').style.opacity = '1';
            customData.goal = opt.querySelector('input').value;
        });
    });

    // 保存输入数据
    const saveInputs = () => {
        customData.interest = container.querySelector('#custom-interest')?.value || '';
        customData.skill = container.querySelector('#custom-skill')?.value || '';
        customData.platform = container.querySelector('#custom-platform')?.value || 'xiaohongshu';
        customData.extra = container.querySelector('#custom-extra')?.value || '';
    };

    // 上一步
    container.querySelector('#step2-prev').addEventListener('click', () => {
        saveInputs();
        currentStep = 1;
        renderStep(container.closest('.persona-stepper-page'));
    });

    // 下一步（触发AI生成）
    container.querySelector('#step2-next').addEventListener('click', () => {
        saveInputs();
        currentStep = 3;
        renderStep(container.closest('.persona-stepper-page'));
    });
}

// ========== Step 3: AI生成人设 ==========
function renderStep3(container) {
    const tpl = selectedTemplateData || personaTemplates[0];
    const platformName = { xiaohongshu: '小红书', douyin: '抖音', bilibili: 'B站', weibo: '微博' }[customData.platform] || '小红书';

    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-lv-brown mb-2">AI正在生成你的专属人设</h2>
                <p class="text-sm text-lv-brown/50">基于你的选择和补充信息，AI正在为你量身定制最优方案</p>
            </div>

            <!-- AI生成动画 -->
            <div class="ai-generating-panel" id="ai-generating">
                <div class="ai-gen-animation">
                    <div class="ai-gen-ring"></div>
                    <div class="ai-gen-icon">
                        <i class="ri-brain-line text-dior-gold text-3xl"></i>
                    </div>
                </div>
                <div class="ai-gen-steps" id="ai-gen-steps">
                    <div class="ai-gen-step-item active" id="gen-step-1">
                        <i class="ri-loader-4-line ai-gen-spinner"></i>
                        <span>分析人设模板特征...</span>
                    </div>
                    <div class="ai-gen-step-item" id="gen-step-2">
                        <i class="ri-loader-4-line ai-gen-spinner"></i>
                        <span>匹配目标受众画像...</span>
                    </div>
                    <div class="ai-gen-step-item" id="gen-step-3">
                        <i class="ri-loader-4-line ai-gen-spinner"></i>
                        <span>生成内容方向建议...</span>
                    </div>
                    <div class="ai-gen-step-item" id="gen-step-4">
                        <i class="ri-loader-4-line ai-gen-spinner"></i>
                        <span>优化风格定位...</span>
                    </div>
                </div>
            </div>

            <!-- AI生成结果（初始隐藏） -->
            <div class="hidden" id="ai-result"></div>
        </div>
    `;

    // 模拟AI生成过程
    const steps = ['gen-step-1', 'gen-step-2', 'gen-step-3', 'gen-step-4'];
    let stepIdx = 0;

    const advanceStep = () => {
        if (stepIdx < steps.length) {
            const el = container.querySelector(`#${steps[stepIdx]}`);
            if (el) {
                el.classList.remove('active');
                el.classList.add('completed');
                el.querySelector('i').className = 'ri-check-line text-green-500';
            }
            stepIdx++;
            if (stepIdx < steps.length) {
                const next = container.querySelector(`#${steps[stepIdx]}`);
                if (next) next.classList.add('active');
            }
        }
    };

    setTimeout(advanceStep, 600);
    setTimeout(advanceStep, 1200);
    setTimeout(advanceStep, 1800);
    setTimeout(() => {
        advanceStep();
        // 生成结果
        const interest = customData.interest || tpl.tags[0] || '内容创作';
        const skill = customData.skill || '分享';

        generatedPersona = {
            id: selectedTemplate,
            name: tpl.name,
            emoji: tpl.emoji,
            description: tpl.description,
            tags: tpl.tags,
            platforms: customData.platform === 'xiaohongshu' ? ['小红书'] : [platformName],
            audience: tpl.audience,
            contentDirections: tpl.contentDirections || [`${interest}干货分享`, `${interest}实操教程`, `${interest}趋势解读`],
            styleAdvice: tpl.styleAdvice || '真实有趣、有价值，用通俗易懂的方式分享专业知识',
            gradient: tpl.gradient,
        };

        // 如果有自定义补充，融合进去
        if (customData.interest && customData.interest !== tpl.tags[0]) {
            generatedPersona.tags = [...new Set([...tpl.tags, customData.interest])].slice(0, 4);
        }
        if (customData.platform) {
            const allPlatforms = [...new Set([platformName, ...tpl.platforms])];
            generatedPersona.platforms = allPlatforms.slice(0, 3);
        }

        // 显示结果
        showGeneratedResult(container);
    }, 2400);
}

function showGeneratedResult(container) {
    const genPanel = container.querySelector('#ai-generating');
    const resultPanel = container.querySelector('#ai-result');
    if (!genPanel || !resultPanel) return;

    // AI生成完成后，滚动到页面顶部以展示完整结果
    window.scrollTo({ top: 0, behavior: 'instant' });

    genPanel.style.transition = 'opacity 0.3s, transform 0.3s';
    genPanel.style.opacity = '0';
    genPanel.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        genPanel.classList.add('hidden');
        resultPanel.classList.remove('hidden');
        resultPanel.classList.add('stepper-enter');

        const p = generatedPersona;
        resultPanel.innerHTML = `
            <!-- 成功提示 -->
            <div class="text-center mb-6">
                <div class="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
                    <i class="ri-check-double-line"></i>人设生成成功！
                </div>
            </div>

            <!-- 人设结果卡片 -->
            <div class="bg-white rounded-2xl border border-dior-gold/15 overflow-hidden mb-6">
                <div class="bg-gradient-to-r from-lv-brown to-lv-brown-dark p-8">
                    <div class="flex items-center gap-5">
                        <div class="w-20 h-20 rounded-2xl bg-dior-gold/20 flex items-center justify-center text-4xl flex-shrink-0">${p.emoji}</div>
                        <div>
                            <h3 class="text-2xl font-bold text-cream mb-1">${p.name}</h3>
                            <p class="text-cream/60 text-sm">${p.description}</p>
                            <div class="flex items-center gap-2 mt-3">
                                ${p.tags.map(t => `<span class="text-xs bg-dior-gold/15 text-dior-gold px-3 py-1 rounded-full font-medium">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-8">
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 class="font-semibold text-lv-brown mb-3 flex items-center gap-2">
                                <i class="ri-compass-3-line text-dior-gold"></i>内容方向（3条）
                            </h4>
                            <div class="space-y-2">
                                ${p.contentDirections.map((d, i) => `
                                    <div class="flex items-center gap-3 p-3 bg-cream/40 rounded-lg">
                                        <div class="w-7 h-7 rounded-lg bg-dior-gold/10 flex items-center justify-center flex-shrink-0">
                                            <span class="text-xs font-bold text-dior-gold">${i + 1}</span>
                                        </div>
                                        <span class="text-sm text-lv-brown/70">${d}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-lv-brown mb-3 flex items-center gap-2">
                                <i class="ri-palette-line text-dior-gold"></i>风格建议
                            </h4>
                            <div class="bg-cream/40 rounded-lg p-4 mb-4">
                                <p class="text-sm text-lv-brown/70 leading-relaxed">${p.styleAdvice}</p>
                            </div>
                            <h4 class="font-semibold text-lv-brown mb-3 flex items-center gap-2">
                                <i class="ri-team-line text-dior-gold"></i>目标受众
                            </h4>
                            <div class="bg-cream/40 rounded-lg p-4">
                                <p class="text-sm text-lv-brown/70">${p.audience}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 pt-4 border-t border-dior-gold/8">
                        <span class="text-xs text-lv-brown/40">适合平台：</span>
                        ${p.platforms.map(pl => `<span class="text-xs bg-cream text-lv-brown/60 px-3 py-1 rounded-full font-medium">${pl}</span>`).join('')}
                    </div>
                </div>
            </div>

            <!-- AI评分 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 mb-6">
                <div class="flex items-center gap-3 mb-4">
                    <i class="ri-robot-2-line text-dior-gold text-lg"></i>
                    <h4 class="font-semibold text-lv-brown">AI人设评估</h4>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div class="text-center p-4 bg-cream/30 rounded-xl">
                        <div class="text-2xl font-bold text-dior-gold mb-1">92</div>
                        <div class="text-xs text-lv-brown/40">人设清晰度</div>
                        <div class="progress-bar mt-2"><div class="progress-bar-fill" style="width: 92%"></div></div>
                    </div>
                    <div class="text-center p-4 bg-cream/30 rounded-xl">
                        <div class="text-2xl font-bold text-dior-gold mb-1">88</div>
                        <div class="text-xs text-lv-brown/40">受众匹配度</div>
                        <div class="progress-bar mt-2"><div class="progress-bar-fill" style="width: 88%"></div></div>
                    </div>
                    <div class="text-center p-4 bg-cream/30 rounded-xl">
                        <div class="text-2xl font-bold text-dior-gold mb-1">85</div>
                        <div class="text-xs text-lv-brown/40">增长潜力</div>
                        <div class="progress-bar mt-2"><div class="progress-bar-fill" style="width: 85%"></div></div>
                    </div>
                </div>
            </div>

            <!-- 底部操作区 -->
            <div class="stepper-actions">
                <button class="btn-secondary text-sm" id="step3-prev">
                    <i class="ri-arrow-left-line"></i> 重新选择
                </button>
                <button class="btn-primary text-sm stepper-next-btn" id="step3-next">
                    确认人设 <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        `;

        setTimeout(() => resultPanel.classList.remove('stepper-enter'), 400);

        // 绑定事件
        resultPanel.querySelector('#step3-prev').addEventListener('click', () => {
            currentStep = 1;
            renderStep(container.closest('.persona-stepper-page'));
        });
        resultPanel.querySelector('#step3-next').addEventListener('click', () => {
            currentStep = 4;
            renderStep(container.closest('.persona-stepper-page'));
        });
    }, 300);
}

// ========== Step 4: 确认并进入系统 ==========
function renderStep4(container) {
    const p = generatedPersona;
    if (!p) {
        currentStep = 1;
        renderStep(container.closest('.persona-stepper-page'));
        return;
    }

    container.innerHTML = `
        <div class="max-w-3xl mx-auto text-center">
            <div class="mb-8">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-4">
                    <i class="ri-check-double-line text-green-500 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-lv-brown mb-2">一切就绪！</h2>
                <p class="text-sm text-lv-brown/50">你的专属人设已生成，AI将基于此为你制定7天增长计划</p>
            </div>

            <!-- 人设摘要卡片 -->
            <div class="bg-gradient-to-r from-lv-brown to-lv-brown-dark rounded-2xl p-8 mb-8 text-left">
                <div class="flex items-center gap-5 mb-6">
                    <div class="w-16 h-16 rounded-2xl bg-dior-gold/20 flex items-center justify-center text-3xl flex-shrink-0">${p.emoji}</div>
                    <div>
                        <h3 class="text-xl font-bold text-cream">${p.name}</h3>
                        <p class="text-cream/50 text-sm mt-1">${p.description}</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-cream/5 rounded-xl p-4">
                        <div class="text-xs text-cream/40 mb-1">内容方向</div>
                        <div class="text-sm text-cream/80 font-medium">${p.contentDirections.length}个方向</div>
                    </div>
                    <div class="bg-cream/5 rounded-xl p-4">
                        <div class="text-xs text-cream/40 mb-1">目标平台</div>
                        <div class="text-sm text-cream/80 font-medium">${p.platforms.join(' / ')}</div>
                    </div>
                    <div class="bg-cream/5 rounded-xl p-4">
                        <div class="text-xs text-cream/40 mb-1">增长目标</div>
                        <div class="text-sm text-cream/80 font-medium">7天1000粉</div>
                    </div>
                </div>
            </div>

            <!-- 即将开始提示 -->
            <div class="bg-white rounded-xl border border-dior-gold/10 p-6 mb-8 text-left">
                <h4 class="font-semibold text-lv-brown mb-4 flex items-center gap-2">
                    <i class="ri-rocket-2-line text-dior-gold"></i>接下来会发生什么？
                </h4>
                <div class="grid sm:grid-cols-3 gap-4">
                    <div class="flex items-start gap-3 p-3 bg-cream/30 rounded-lg">
                        <div class="w-8 h-8 rounded-lg bg-dior-gold/10 flex items-center justify-center flex-shrink-0">
                            <span class="text-sm font-bold text-dior-gold">1</span>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-lv-brown">生成增长计划</div>
                            <div class="text-xs text-lv-brown/40">7天每日任务</div>
                        </div>
                    </div>
                    <div class="flex items-start gap-3 p-3 bg-cream/30 rounded-lg">
                        <div class="w-8 h-8 rounded-lg bg-dior-gold/10 flex items-center justify-center flex-shrink-0">
                            <span class="text-sm font-bold text-dior-gold">2</span>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-lv-brown">AI内容创作</div>
                            <div class="text-xs text-lv-brown/40">自动生成内容</div>
                        </div>
                    </div>
                    <div class="flex items-start gap-3 p-3 bg-cream/30 rounded-lg">
                        <div class="w-8 h-8 rounded-lg bg-dior-gold/10 flex items-center justify-center flex-shrink-0">
                            <span class="text-sm font-bold text-dior-gold">3</span>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-lv-brown">数据追踪</div>
                            <div class="text-xs text-lv-brown/40">实时监控增长</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA按钮 -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button class="btn-primary text-base py-4 px-10 stepper-final-btn" id="step4-start">
                    <i class="ri-rocket-2-line"></i> 开始我的增长计划
                </button>
                <button class="btn-secondary text-sm" id="step4-prev">
                    <i class="ri-arrow-left-line"></i> 返回修改
                </button>
            </div>
        </div>
    `;

    // 上一步
    container.querySelector('#step4-prev').addEventListener('click', () => {
        currentStep = 3;
        renderStep(container.closest('.persona-stepper-page'));
    });

    // 开始增长计划
    container.querySelector('#step4-start').addEventListener('click', () => {
        // 设置全局状态
        if (selectedTemplate) {
            globalState.setPersona(selectedTemplate);
        }

        // 跳转到增长计划页顶部
        router.navigate('/plan');
        // 确保滚动到顶部
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    });
}