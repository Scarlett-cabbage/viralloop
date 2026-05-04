// ViralLoop 全局状态管理模块
// 实现人设 → 增长计划 → 内容创作的数据同步（Single Source of Truth）

import { personaTemplates, growthPlan as defaultGrowthPlan, contentEditorData as defaultEditorData, followerGrowthData as defaultFollowerData } from './data.js';
import { generatePlanForPersona } from './persona-plans.js';

class GlobalState {
    constructor() {
        // 当前选中的人设
        this._persona = null;
        this._personaId = null;

        // 增长计划数据（7天）
        this._plan = [...defaultGrowthPlan];

        // 内容编辑器数据（可编辑）
        this._editorData = JSON.parse(JSON.stringify(defaultEditorData));

        // 粉丝增长数据
        this._followerData = JSON.parse(JSON.stringify(defaultFollowerData));

        // 监听器
        this._listeners = {};

        // 初始化默认人设（平价美妆测评官）
        this._persona = {
            id: 'beauty-reviewer',
            name: '平价美妆测评官',
            emoji: '💄',
            description: '专注平价美妆测评，帮学生党和打工人找到最值的好物',
            tags: ['美妆', '测评', '平价'],
            platforms: ['小红书', '抖音'],
            audience: '18-28岁追求性价比的年轻女性',
            contentDirections: ['平价好物横评对比', '大牌平替揭秘', '月度爱用物分享'],
            styleAdvice: '亲切真实、不做作，像闺蜜聊天一样分享',
        };
    }

    // ========== 人设管理 ==========

    getPersona() {
        return this._persona;
    }

    getPersonaId() {
        return this._personaId;
    }

    /**
     * 设置人设并自动生成对应的增长计划
     * @param {string} personaId - 人设模板ID 或 'custom'
     * @param {object} customData - 自定义人设数据（仅当personaId='custom'时使用）
     */
    setPersona(personaId, customData = null) {
        if (personaId === 'custom' && customData) {
            this._persona = customData;
            this._personaId = 'custom';
        } else {
            const template = personaTemplates.find(t => t.id === personaId);
            if (template) {
                this._persona = { ...template };
                this._personaId = personaId;
            }
        }

        // 根据人设生成新的增长计划
        this._generatePlanFromPersona();

        // 通知所有监听器
        this._emit('persona-changed', this._persona);
        this._emit('plan-changed', this._plan);
        this._emit('editor-changed', this._editorData);
    }

    // ========== 增长计划管理 ==========

    getPlan() {
        return this._plan;
    }

    getPlanDay(dayNum) {
        return this._plan.find(d => d.day === dayNum);
    }

    getFollowerData() {
        return this._followerData;
    }

    // ========== 编辑器数据管理 ==========

    getEditorData(dayNum) {
        return this._editorData[dayNum];
    }

    getAllEditorData() {
        return this._editorData;
    }

    /**
     * 更新编辑器数据（双向同步）
     * @param {number} dayNum - 天数
     * @param {string} field - 字段名 (title/hook/body/cta)
     * @param {string} value - 新值
     */
    updateEditorField(dayNum, field, value) {
        if (!this._editorData[dayNum]) return;
        this._editorData[dayNum][field] = value;

        // 同步到增长计划的标题
        if (field === 'title') {
            const planDay = this._plan.find(d => d.day === dayNum);
            if (planDay) {
                planDay.contentTitle = `「${value}」`;
            }
        }

        this._emit('editor-field-changed', { day: dayNum, field, value });
        this._emit('plan-changed', this._plan);
    }

    // ========== 内部方法 ==========

    _generatePlanFromPersona() {
        if (!this._persona) return;

        const generated = generatePlanForPersona(this._personaId || 'beauty-reviewer', this._persona);

        if (generated) {
            this._plan = generated.plan;
            this._editorData = generated.editorData;
            this._followerData = generated.followerData;
        }
    }

    // ========== 事件系统 ==========

    on(event, callback) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
        return () => {
            this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
        };
    }

    _emit(event, data) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(cb => cb(data));
        }
    }
}

// 导出单例
export const globalState = new GlobalState();
