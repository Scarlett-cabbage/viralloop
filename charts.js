// ViralLoop 图表绘制模块
// 所有Canvas图表绘制函数

// ========== 简易折线图 ==========
export function drawLineChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const {
        labels = [], values = [], color = '#A99563',
        fillColor = 'rgba(169, 149, 99, 0.1)', lineWidth = 2.5,
        showDots = true, showLabels = true, showGrid = true,
        showValues = false, areaFill = true,
    } = options;

    const padding = { top: 30, right: 20, bottom: 40, left: 50 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...values) * 1.15;

    if (showGrid) {
        ctx.strokeStyle = 'rgba(89, 47, 35, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            const val = Math.round(maxVal - (maxVal / 4) * i);
            ctx.fillStyle = 'rgba(89, 47, 35, 0.35)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(val.toLocaleString(), padding.left - 8, y + 4);
        }
    }

    if (showLabels && labels.length) {
        ctx.fillStyle = 'rgba(89, 47, 35, 0.4)';
        ctx.font = '11px Inter';
        ctx.textAlign = 'center';
        labels.forEach((label, i) => {
            const x = padding.left + (chartW / (labels.length - 1)) * i;
            ctx.fillText(label, x, height - 10);
        });
    }

    const points = values.map((v, i) => ({
        x: padding.left + (chartW / (values.length - 1)) * i,
        y: padding.top + chartH - ((v) / (maxVal)) * chartH,
    }));

    if (areaFill && points.length > 1) {
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, fillColor.replace('0.1', '0.25'));
        gradient.addColorStop(1, fillColor.replace('0.1', '0.02'));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding.bottom);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
        ctx.closePath();
        ctx.fill();
    }

    if (points.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const xc = (points[i - 1].x + points[i].x) / 2;
            const yc = (points[i - 1].y + points[i].y) / 2;
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
    }

    if (showDots) {
        points.forEach((p, i) => {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            if (showValues) {
                ctx.fillStyle = 'rgba(89, 47, 35, 0.7)';
                ctx.font = 'bold 11px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(values[i].toLocaleString(), p.x, p.y - 12);
            }
        });
    }
}

// ========== 柱状图 ==========
export function drawBarChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const { labels = [], datasets = [], showGrid = true, showLabels = true } = options;
    const padding = { top: 30, right: 20, bottom: 40, left: 50 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const allValues = datasets.flatMap(d => d.values);
    const maxVal = Math.max(...allValues) * 1.15;

    if (showGrid) {
        ctx.strokeStyle = 'rgba(89, 47, 35, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            const val = Math.round(maxVal - (maxVal / 4) * i);
            ctx.fillStyle = 'rgba(89, 47, 35, 0.35)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(val.toLocaleString(), padding.left - 8, y + 4);
        }
    }

    const groupWidth = chartW / labels.length;
    const barWidth = Math.min(groupWidth * 0.6 / datasets.length, 30);
    const totalBarWidth = barWidth * datasets.length;

    labels.forEach((label, i) => {
        const groupX = padding.left + groupWidth * i + groupWidth / 2;
        if (showLabels) {
            ctx.fillStyle = 'rgba(89, 47, 35, 0.4)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(label, groupX, height - 10);
        }
        datasets.forEach((dataset, di) => {
            const barX = groupX - totalBarWidth / 2 + barWidth * di;
            const barH = (dataset.values[i] / maxVal) * chartH;
            const barY = padding.top + chartH - barH;
            const gradient = ctx.createLinearGradient(barX, barY, barX, padding.top + chartH);
            gradient.addColorStop(0, dataset.color || '#A99563');
            gradient.addColorStop(1, (dataset.color || '#A99563') + '60');
            ctx.fillStyle = gradient;
            const radius = 3;
            ctx.beginPath();
            ctx.moveTo(barX + radius, barY);
            ctx.lineTo(barX + barWidth - radius, barY);
            ctx.quadraticCurveTo(barX + barWidth, barY, barX + barWidth, barY + radius);
            ctx.lineTo(barX + barWidth, padding.top + chartH);
            ctx.lineTo(barX, padding.top + chartH);
            ctx.lineTo(barX, barY + radius);
            ctx.quadraticCurveTo(barX, barY, barX + radius, barY);
            ctx.closePath();
            ctx.fill();
        });
    });
}

// ========== 深色折线图 ==========
export function drawDarkLineChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const {
        labels = [], values = [], color = '#A99563',
        fillColor = 'rgba(169, 149, 99, 0.15)', lineWidth = 2.5,
        showDots = true, showLabels = true, showGrid = true,
        showValues = false, areaFill = true,
    } = options;

    const padding = { top: 30, right: 20, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...values) * 1.15;

    if (showGrid) {
        ctx.strokeStyle = 'rgba(169, 149, 99, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            const val = Math.round(maxVal - (maxVal / 4) * i);
            ctx.fillStyle = 'rgba(252, 245, 226, 0.3)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(val.toLocaleString(), padding.left - 8, y + 4);
        }
    }

    if (showLabels && labels.length) {
        ctx.fillStyle = 'rgba(252, 245, 226, 0.35)';
        ctx.font = '11px Inter';
        ctx.textAlign = 'center';
        labels.forEach((label, i) => {
            const x = padding.left + (chartW / (labels.length - 1)) * i;
            ctx.fillText(label, x, height - 10);
        });
    }

    const points = values.map((v, i) => ({
        x: padding.left + (chartW / (values.length - 1)) * i,
        y: padding.top + chartH - ((v) / (maxVal)) * chartH,
    }));

    if (areaFill && points.length > 1) {
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, 'rgba(169, 149, 99, 0.01)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding.bottom);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
        ctx.closePath();
        ctx.fill();
    }

    if (points.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth + 4;
        ctx.globalAlpha = 0.15;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const xc = (points[i - 1].x + points[i].x) / 2;
            const yc = (points[i - 1].y + points[i].y) / 2;
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const xc = (points[i - 1].x + points[i].x) / 2;
            const yc = (points[i - 1].y + points[i].y) / 2;
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
    }

    if (showDots) {
        points.forEach((p, i) => {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#592f23';
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            if (showValues) {
                ctx.fillStyle = 'rgba(252, 245, 226, 0.8)';
                ctx.font = 'bold 11px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(values[i].toLocaleString(), p.x, p.y - 14);
            }
        });
    }
}

// ========== 深色柱状图 ==========
export function drawDarkBarChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const { labels = [], datasets = [], showGrid = true, showLabels = true } = options;
    const padding = { top: 30, right: 20, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const allValues = datasets.flatMap(d => d.values);
    const maxVal = Math.max(...allValues) * 1.15;

    if (showGrid) {
        ctx.strokeStyle = 'rgba(169, 149, 99, 0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            const val = Math.round(maxVal - (maxVal / 4) * i);
            ctx.fillStyle = 'rgba(252, 245, 226, 0.3)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(val.toLocaleString(), padding.left - 8, y + 4);
        }
    }

    const groupWidth = chartW / labels.length;
    const barWidth = Math.min(groupWidth * 0.6 / datasets.length, 30);
    const totalBarWidth = barWidth * datasets.length;

    labels.forEach((label, i) => {
        const groupX = padding.left + groupWidth * i + groupWidth / 2;
        if (showLabels) {
            ctx.fillStyle = 'rgba(252, 245, 226, 0.35)';
            ctx.font = '11px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(label, groupX, height - 10);
        }
        datasets.forEach((dataset, di) => {
            const barX = groupX - totalBarWidth / 2 + barWidth * di;
            const barH = (dataset.values[i] / maxVal) * chartH;
            const barY = padding.top + chartH - barH;
            const gradient = ctx.createLinearGradient(barX, barY, barX, padding.top + chartH);
            gradient.addColorStop(0, dataset.color || '#A99563');
            gradient.addColorStop(1, 'rgba(89, 47, 35, 0.8)');
            ctx.fillStyle = gradient;
            const radius = 3;
            ctx.beginPath();
            ctx.moveTo(barX + radius, barY);
            ctx.lineTo(barX + barWidth - radius, barY);
            ctx.quadraticCurveTo(barX + barWidth, barY, barX + barWidth, barY + radius);
            ctx.lineTo(barX + barWidth, padding.top + chartH);
            ctx.lineTo(barX, padding.top + chartH);
            ctx.lineTo(barX, barY + radius);
            ctx.quadraticCurveTo(barX, barY, barX + radius, barY);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = dataset.color || '#A99563';
            ctx.globalAlpha = 0.4;
            ctx.fillRect(barX, barY, barWidth, 2);
            ctx.globalAlpha = 1;
        });
    });
}

// ========== 深色双轴图 ==========
export function drawDarkDualAxisChart(canvas, options = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const {
        labels = [], barValues = [], lineValues = [],
        barColor = '#A99563', lineColor = '#4ade80',
        barLabel = '播放量', lineLabel = '转粉率',
    } = options;

    const padding = { top: 35, right: 60, bottom: 40, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxBar = Math.max(...barValues) * 1.15;
    const maxLine = Math.max(...lineValues) * 1.3;

    ctx.strokeStyle = 'rgba(169, 149, 99, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        const barVal = Math.round(maxBar - (maxBar / 4) * i);
        ctx.fillStyle = 'rgba(252, 245, 226, 0.3)';
        ctx.font = '11px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(barVal >= 1000 ? (barVal / 1000).toFixed(0) + 'K' : barVal, padding.left - 8, y + 4);
        const lineVal = (maxLine - (maxLine / 4) * i).toFixed(1);
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(74, 222, 128, 0.5)';
        ctx.fillText(lineVal + '%', width - padding.right + 8, y + 4);
    }

    ctx.fillStyle = 'rgba(252, 245, 226, 0.35)';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    const groupWidth = chartW / labels.length;
    labels.forEach((label, i) => {
        const x = padding.left + groupWidth * i + groupWidth / 2;
        ctx.fillText(label, x, height - 10);
    });

    const barWidth = Math.min(groupWidth * 0.5, 32);
    labels.forEach((label, i) => {
        const x = padding.left + groupWidth * i + groupWidth / 2 - barWidth / 2;
        const barH = (barValues[i] / maxBar) * chartH;
        const barY = padding.top + chartH - barH;
        const gradient = ctx.createLinearGradient(x, barY, x, padding.top + chartH);
        gradient.addColorStop(0, barColor);
        gradient.addColorStop(1, 'rgba(89, 47, 35, 0.8)');
        ctx.fillStyle = gradient;
        const r = 3;
        ctx.beginPath();
        ctx.moveTo(x + r, barY);
        ctx.lineTo(x + barWidth - r, barY);
        ctx.quadraticCurveTo(x + barWidth, barY, x + barWidth, barY + r);
        ctx.lineTo(x + barWidth, padding.top + chartH);
        ctx.lineTo(x, padding.top + chartH);
        ctx.lineTo(x, barY + r);
        ctx.quadraticCurveTo(x, barY, x + r, barY);
        ctx.closePath();
        ctx.fill();
    });

    const linePoints = lineValues.map((v, i) => ({
        x: padding.left + groupWidth * i + groupWidth / 2,
        y: padding.top + chartH - (v / maxLine) * chartH,
    }));

    if (linePoints.length > 1) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(linePoints[0].x, linePoints[0].y);
        for (let i = 1; i < linePoints.length; i++) {
            const xc = (linePoints[i - 1].x + linePoints[i].x) / 2;
            const yc = (linePoints[i - 1].y + linePoints[i].y) / 2;
            ctx.quadraticCurveTo(linePoints[i - 1].x, linePoints[i - 1].y, xc, yc);
        }
        ctx.lineTo(linePoints[linePoints.length - 1].x, linePoints[linePoints.length - 1].y);
        ctx.stroke();

        linePoints.forEach((p, i) => {
            ctx.fillStyle = '#592f23';
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
            ctx.font = 'bold 10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(lineValues[i].toFixed(1) + '%', p.x, p.y - 10);
        });
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(padding.left, 8, 12, 12);
    ctx.fillStyle = 'rgba(252, 245, 226, 0.5)';
    ctx.font = '11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(barLabel, padding.left + 16, 18);
    ctx.fillStyle = lineColor;
    ctx.fillRect(padding.left + 80, 8, 12, 12);
    ctx.fillStyle = 'rgba(252, 245, 226, 0.5)';
    ctx.fillText(lineLabel, padding.left + 96, 18);
}

// ========== 深色水平柱状图 ==========
export function drawDarkHorizontalBar(canvas, options = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const { labels = [], values = [], color = '#A99563', highlightIndices = [] } = options;
    const padding = { top: 10, right: 50, bottom: 10, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...values);
    const barHeight = Math.min(chartH / labels.length - 6, 20);

    labels.forEach((label, i) => {
        const y = padding.top + (chartH / labels.length) * i + (chartH / labels.length) / 2;
        const barW = (values[i] / maxVal) * chartW;
        const isHighlight = highlightIndices.includes(i);

        ctx.fillStyle = isHighlight ? '#A99563' : 'rgba(252, 245, 226, 0.4)';
        ctx.font = isHighlight ? 'bold 11px Inter' : '11px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(label, padding.left - 8, y + 4);

        ctx.fillStyle = 'rgba(169, 149, 99, 0.05)';
        ctx.beginPath();
        ctx.roundRect(padding.left, y - barHeight / 2, chartW, barHeight, 3);
        ctx.fill();

        const gradient = ctx.createLinearGradient(padding.left, 0, padding.left + barW, 0);
        gradient.addColorStop(0, isHighlight ? color : color + '60');
        gradient.addColorStop(1, isHighlight ? '#c4ad78' : color + '30');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(padding.left, y - barHeight / 2, barW, barHeight, 3);
        ctx.fill();

        ctx.fillStyle = isHighlight ? 'rgba(252, 245, 226, 0.9)' : 'rgba(252, 245, 226, 0.4)';
        ctx.font = isHighlight ? 'bold 11px Inter' : '11px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(values[i], padding.left + barW + 8, y + 4);
    });
}
