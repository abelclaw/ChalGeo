// ===== GEOMETRY PROOFS PRACTICE =====
let geoInitialized = false;
let geoDifficulty = 'easy';
let geoStats = { correct: 0, wrong: 0, streak: 0 };
let geoCurrentProblem = null;
let geoAnswered = false;
let geoProofSelections = {}; // for multi-blank proofs

function setGeoDifficulty(d) {
    geoDifficulty = d;
    document.querySelectorAll('#tab-geometry .diff-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('geoDiff' + d.charAt(0).toUpperCase() + d.slice(1)).classList.add('active');
    nextGeoProblem();
}

function updateGeoUI() {
    document.getElementById('geoCorrect').textContent = geoStats.correct;
    document.getElementById('geoWrong').textContent = geoStats.wrong;
    document.getElementById('geoStreak').textContent = geoStats.streak;
    document.getElementById('geoStreakFill').style.width = Math.min(100, (geoStats.streak / 10) * 100) + '%';
}

function gpick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function gshuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}

// ============================================================
// DIAGRAM DRAWING
// ============================================================

function geoResizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.getContext('2d').scale(dpr, dpr);
    return { w: rect.width, h: rect.height };
}

// Draw two parallel lines cut by a transversal, labeling angles
function drawParallelLines(ctx, w, h, opts) {
    const { highlightAngles, angleLabels, showNumbers } = opts || {};
    const pad = 40;
    const lineLen = w - pad * 2;
    const y1 = h * 0.32, y2 = h * 0.68;
    const x1 = pad, x2 = w - pad;

    // Parallel lines
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y2); ctx.lineTo(x2, y2); ctx.stroke();

    // Parallel arrows
    const arrX = x1 + 30;
    ctx.fillStyle = '#94a3b8';
    for (const y of [y1, y2]) {
        ctx.beginPath();
        ctx.moveTo(arrX, y - 6); ctx.lineTo(arrX + 8, y); ctx.lineTo(arrX, y + 6);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(arrX + 10, y - 6); ctx.lineTo(arrX + 18, y); ctx.lineTo(arrX + 10, y + 6);
        ctx.fill();
    }

    // Line labels
    ctx.font = 'bold 14px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText('l', x1 - 10, y1);
    ctx.fillText('m', x1 - 10, y2);

    // Transversal
    const tAngle = opts?.transAngle || 0.45;
    const tLen = (y2 - y1 + 80) / Math.sin(tAngle);
    const tCx = w * 0.55;
    const tx1 = tCx - tLen * 0.5 * Math.cos(tAngle);
    const ty1 = (y1 + y2) / 2 - tLen * 0.5 * Math.sin(tAngle);
    const tx2 = tCx + tLen * 0.5 * Math.cos(tAngle);
    const ty2 = (y1 + y2) / 2 + tLen * 0.5 * Math.sin(tAngle);

    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(tx1, ty1); ctx.lineTo(tx2, ty2); ctx.stroke();

    ctx.font = 'bold 14px system-ui';
    ctx.fillStyle = '#818cf8';
    ctx.textAlign = 'left';
    ctx.fillText('t', tx1 + 4, ty1 - 6);

    // Find intersection points
    const intX1 = tCx - ((y1 + y2) / 2 - y1) / Math.tan(tAngle) * Math.cos(tAngle) / Math.sin(tAngle);
    // Simpler: intersection of transversal with each line
    const slope = Math.tan(tAngle);
    const tMidX = tCx, tMidY = (y1 + y2) / 2;
    const ix1 = tMidX + (y1 - tMidY) / slope;
    const ix2 = tMidX + (y2 - tMidY) / slope;

    // Intersection dots
    ctx.beginPath(); ctx.arc(ix1, y1, 4, 0, Math.PI * 2); ctx.fillStyle = '#f1f5f9'; ctx.fill();
    ctx.beginPath(); ctx.arc(ix2, y2, 4, 0, Math.PI * 2); ctx.fillStyle = '#f1f5f9'; ctx.fill();

    // Angle numbers at intersections
    // Compute sector bisector angles based on actual transversal angle
    // Rays at each intersection: 0 (right), tAngle (down-right along transversal), π (left), π+tAngle (up-left along transversal)
    // Sectors: angle1=upper-right, angle2=upper-left, angle3=lower-left, angle4=lower-right
    const tA = tAngle;
    const bisectors = [
        (3 * Math.PI + tA) / 2,  // angle 1: upper-right
        Math.PI + tA / 2,         // angle 2: upper-left
        (tA + Math.PI) / 2,       // angle 3: lower-left
        tA / 2,                    // angle 4: lower-right
    ];

    if (showNumbers) {
        const r = 20;
        const angles = [];
        for (let i = 0; i < 4; i++) {
            angles.push({ n: i + 1, x: ix1 + r * Math.cos(bisectors[i]), y: y1 + r * Math.sin(bisectors[i]) });
        }
        for (let i = 0; i < 4; i++) {
            angles.push({ n: i + 5, x: ix2 + r * Math.cos(bisectors[i]), y: y2 + r * Math.sin(bisectors[i]) });
        }
        ctx.font = 'bold 13px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        angles.forEach(a => {
            const isHL = highlightAngles && highlightAngles.includes(a.n);
            ctx.fillStyle = isHL ? '#fbbf24' : '#94a3b8';
            if (isHL) {
                ctx.beginPath();
                ctx.arc(a.x, a.y, 11, 0, Math.PI * 2);
                ctx.fillStyle = '#fbbf2430';
                ctx.fill();
                ctx.fillStyle = '#fbbf24';
            }
            ctx.fillText(a.n, a.x, a.y);
        });
    }

    // Custom angle labels
    if (angleLabels) {
        ctx.font = 'bold 14px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const r = 26;
        const positions = {};
        for (let i = 0; i < 4; i++) {
            positions[i + 1] = { x: ix1 + r * Math.cos(bisectors[i]), y: y1 + r * Math.sin(bisectors[i]) };
            positions[i + 5] = { x: ix2 + r * Math.cos(bisectors[i]), y: y2 + r * Math.sin(bisectors[i]) };
        }
        Object.entries(angleLabels).forEach(([n, label]) => {
            const p = positions[n];
            if (!p) return;
            ctx.fillStyle = '#fbbf24';
            ctx.fillText(label, p.x, p.y);
        });
    }
}

// Draw a triangle with optional tick marks and angle arcs
function drawGeoTriangle(ctx, w, h, opts) {
    const { vertices, labels, sides, tickMarks, angleMarks, highlightSide, congruenceMarks } = opts;
    // vertices: [{x,y}, {x,y}, {x,y}] in 0-1 coords
    const pts = vertices.map(v => ({ x: v.x * w, y: v.y * h }));

    // Fill
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
    ctx.fill();

    // Sides
    const sideList = [[0,1],[1,2],[2,0]];
    sideList.forEach(([i,j], idx) => {
        const isHL = highlightSide === idx;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = isHL ? '#fbbf24' : '#38bdf8';
        ctx.lineWidth = isHL ? 3.5 : 2.5;
        ctx.stroke();
    });

    // Tick marks for congruent sides
    if (tickMarks) {
        tickMarks.forEach(({ side, count }) => {
            const [i, j] = sideList[side];
            const mx = (pts[i].x + pts[j].x) / 2;
            const my = (pts[i].y + pts[j].y) / 2;
            const dx = pts[j].x - pts[i].x;
            const dy = pts[j].y - pts[i].y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const nx = -dy / len * 8;
            const ny = dx / len * 8;
            for (let t = 0; t < count; t++) {
                const offset = (t - (count - 1) / 2) * 6;
                const tx = mx + (dx / len) * offset;
                const ty = my + (dy / len) * offset;
                ctx.beginPath();
                ctx.moveTo(tx + nx, ty + ny);
                ctx.lineTo(tx - nx, ty - ny);
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
    }

    // Angle arcs
    if (angleMarks) {
        angleMarks.forEach(({ vertex, count, color }) => {
            const vi = vertex;
            const prev = (vi + 2) % 3;
            const next = (vi + 1) % 3;
            const a1 = Math.atan2(pts[prev].y - pts[vi].y, pts[prev].x - pts[vi].x);
            const a2 = Math.atan2(pts[next].y - pts[vi].y, pts[next].x - pts[vi].x);
            for (let t = 0; t < count; t++) {
                ctx.beginPath();
                ctx.arc(pts[vi].x, pts[vi].y, 16 + t * 5, a2, a1);
                ctx.strokeStyle = color || '#fbbf24';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
    }

    // Vertex labels
    if (labels) {
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        labels.forEach((label, i) => {
            // Offset label away from centroid
            const cx = (pts[0].x + pts[1].x + pts[2].x) / 3;
            const cy = (pts[0].y + pts[1].y + pts[2].y) / 3;
            const dx = pts[i].x - cx;
            const dy = pts[i].y - cy;
            const len = Math.sqrt(dx * dx + dy * dy);
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText(label, pts[i].x + (dx / len) * 20, pts[i].y + (dy / len) * 20);
        });
    }

    // Side labels
    if (sides) {
        ctx.font = '13px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        sides.forEach((label, idx) => {
            if (!label) return;
            const [i, j] = sideList[idx];
            const mx = (pts[i].x + pts[j].x) / 2;
            const my = (pts[i].y + pts[j].y) / 2;
            const dx = pts[j].x - pts[i].x;
            const dy = pts[j].y - pts[i].y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const nx = -dy / len * 14;
            const ny = dx / len * 14;
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(label, mx + nx, my + ny);
        });
    }
}

// Draw two triangles side by side for congruence
function drawTwoTriangles(ctx, w, h, opts) {
    const { labels1, labels2, tickMarks1, tickMarks2, angleMarks1, angleMarks2, rightAngle1, rightAngle2 } = opts;
    const v1 = [{ x: 0.08, y: 0.82 }, { x: 0.38, y: 0.82 }, { x: 0.2, y: 0.18 }];
    const v2 = [{ x: 0.58, y: 0.82 }, { x: 0.92, y: 0.82 }, { x: 0.72, y: 0.18 }];

    drawGeoTriangle(ctx, w, h, {
        vertices: v1, labels: labels1,
        tickMarks: tickMarks1, angleMarks: angleMarks1
    });
    drawGeoTriangle(ctx, w, h, {
        vertices: v2, labels: labels2,
        tickMarks: tickMarks2, angleMarks: angleMarks2
    });

    // Right angle markers - draw small square aligned with the two sides at the vertex
    function drawRightAngleMark(verts, vi) {
        const p = { x: verts[vi].x * w, y: verts[vi].y * h };
        const prev = (vi + 2) % 3, next = (vi + 1) % 3;
        const p1 = { x: verts[prev].x * w, y: verts[prev].y * h };
        const p2 = { x: verts[next].x * w, y: verts[next].y * h };
        // Unit vectors along each side
        const d1x = p1.x - p.x, d1y = p1.y - p.y;
        const len1 = Math.sqrt(d1x * d1x + d1y * d1y);
        const d2x = p2.x - p.x, d2y = p2.y - p.y;
        const len2 = Math.sqrt(d2x * d2x + d2y * d2y);
        const sq = 10;
        const u1x = d1x / len1 * sq, u1y = d1y / len1 * sq;
        const u2x = d2x / len2 * sq, u2y = d2y / len2 * sq;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x + u1x, p.y + u1y);
        ctx.lineTo(p.x + u1x + u2x, p.y + u1y + u2y);
        ctx.lineTo(p.x + u2x, p.y + u2y);
        ctx.stroke();
    }
    if (rightAngle1 !== undefined) drawRightAngleMark(v1, rightAngle1);
    if (rightAngle2 !== undefined) drawRightAngleMark(v2, rightAngle2);
}

// Draw isosceles triangle with base angles marked equal
function drawIsosceles(ctx, w, h, opts) {
    const { baseAngleLabel, vertexAngleLabel, sideLabel, baseLabel } = opts || {};
    const v = [{ x: 0.25, y: 0.85 }, { x: 0.75, y: 0.85 }, { x: 0.5, y: 0.12 }];
    drawGeoTriangle(ctx, w, h, {
        vertices: v,
        labels: ['B', 'C', 'A'],
        tickMarks: [{ side: 1, count: 1 }, { side: 2, count: 1 }],
        angleMarks: [
            { vertex: 0, count: 1, color: '#ef4444' },
            { vertex: 1, count: 1, color: '#ef4444' },
        ]
    });
    if (baseAngleLabel) {
        ctx.font = 'bold 13px system-ui';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        // Position labels toward the centroid of the triangle
        const cx = (v[0].x + v[1].x + v[2].x) / 3 * w;
        const cy = (v[0].y + v[1].y + v[2].y) / 3 * h;
        for (const vi of [0, 1]) {
            const px = v[vi].x * w, py = v[vi].y * h;
            const dx = cx - px, dy = cy - py;
            const len = Math.sqrt(dx * dx + dy * dy);
            ctx.fillText(baseAngleLabel, px + dx / len * 28, py + dy / len * 22);
        }
    }
    if (vertexAngleLabel) {
        ctx.font = 'bold 13px system-ui';
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'center';
        // Place label below the vertex angle arc, inside the triangle (toward centroid)
        const cy = (v[0].y + v[1].y + v[2].y) / 3;
        const offsetY = (cy > v[2].y) ? 32 : -20; // if centroid is below apex, go down; else up
        ctx.fillText(vertexAngleLabel, v[2].x * w, v[2].y * h + offsetY);
    }
}

// Draw angles on a straight line
function drawAnglesOnLine(ctx, w, h, opts) {
    const { angle1, angle2, labels } = opts;
    const y = h * 0.55;
    const cx = w * 0.5;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 40, y); ctx.stroke();

    // Ray going up
    const rayAngle = Math.PI * (angle1 / 180);
    const rayLen = 130;
    const rx = cx + rayLen * Math.cos(Math.PI - rayAngle);
    const ry = y - rayLen * Math.sin(Math.PI - rayAngle);
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(rx, ry); ctx.stroke();

    // Angle arcs
    ctx.beginPath();
    ctx.arc(cx, y, 30, -Math.PI, -(Math.PI - rayAngle));
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, y, 30, -(Math.PI - rayAngle), 0);
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5; ctx.stroke();

    // Labels - position at bisector of each angle arc
    // Canvas arc angles: -π = left, (rayAngle - π) = up along ray, 0 = right
    ctx.font = 'bold 14px system-ui';
    ctx.textBaseline = 'middle';
    if (labels) {
        const labelR = 48;
        // Left angle bisector: midpoint between -π and (rayAngle - π)
        const leftBisect = rayAngle / 2 - Math.PI;
        ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center';
        ctx.fillText(labels[0], cx + labelR * Math.cos(leftBisect), y + labelR * Math.sin(leftBisect));
        // Right angle bisector: midpoint between (rayAngle - π) and 0
        const rightBisect = (rayAngle - Math.PI) / 2;
        ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'center';
        ctx.fillText(labels[1], cx + labelR * Math.cos(rightBisect), y + labelR * Math.sin(rightBisect));
    }

    // Point label
    ctx.beginPath(); ctx.arc(cx, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f1f5f9'; ctx.fill();
}

// ============================================================
// PROOF TABLE RENDERING
// ============================================================

function renderProofTable(proof, blanks) {
    // proof: array of { statement, reason }
    // blanks: array of { row, col ('statement'|'reason'), options, correct }
    let html = '<table class="proof-table"><thead><tr><th></th><th>Statement</th><th>Reason</th></tr></thead><tbody>';
    proof.forEach((step, i) => {
        const sBlank = blanks.find(b => b.row === i && b.col === 'statement');
        const rBlank = blanks.find(b => b.row === i && b.col === 'reason');
        const sContent = sBlank
            ? `<span class="proof-blank" id="geoBlank_${i}_s" data-row="${i}" data-col="s">[?]</span>`
            : `<span>${step.statement}</span>`;
        const rContent = rBlank
            ? `<span class="proof-blank" id="geoBlank_${i}_r" data-row="${i}" data-col="r">[?]</span>`
            : `<span>${step.reason}</span>`;
        html += `<tr><td class="step-num-cell">${i + 1}.</td><td>${sContent}</td><td>${rContent}</td></tr>`;
    });
    html += '</tbody></table>';

    // Choice buttons for each blank
    blanks.forEach(b => {
        const id = `geoBlank_${b.row}_${b.col === 'statement' ? 's' : 'r'}`;
        html += `<div class="proof-choices" data-for="${id}">`;
        html += `<div class="proof-choices-label">Fill in step ${b.row + 1} ${b.col}:</div>`;
        const shuffled = gshuffle(b.options);
        shuffled.forEach(opt => {
            html += `<button class="proof-choice-btn" onclick="selectProofChoice('${id}', this, '${opt.replace(/'/g, "\\'")}')">${opt}</button>`;
        });
        html += '</div>';
    });
    return html;
}

function selectProofChoice(blankId, btn, value) {
    if (geoAnswered) return;
    const container = btn.parentElement;
    container.querySelectorAll('.proof-choice-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById(blankId).textContent = value;
    document.getElementById(blankId).classList.add('filled');
    geoProofSelections[blankId] = value;
}

// ============================================================
// MULTIPLE CHOICE RENDERING
// ============================================================

function renderMultipleChoice(choices) {
    let html = '<div class="geo-choices">';
    choices.forEach(c => {
        html += `<button class="geo-choice-btn" onclick="selectGeoChoice(this, '${c.replace(/'/g, "\\'")}')">${c}</button>`;
    });
    html += '</div>';
    return html;
}

function selectGeoChoice(btn, value) {
    if (geoAnswered) return;
    btn.parentElement.querySelectorAll('.geo-choice-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    geoProofSelections['mc'] = value;
}

// ============================================================
// PROBLEM GENERATORS
// ============================================================

// -- EASY PROBLEMS (definitions, basic angle relationships, identify postulates) --

const EASY_PROBLEMS = [
    // Definitions
    () => ({
        type: 'Definition',
        question: 'What does it mean for two triangles to be congruent?',
        format: 'mc',
        choices: gshuffle([
            'They have the same shape and size',
            'They have the same shape but different size',
            'They have the same perimeter',
            'They have the same area'
        ]),
        correct: 'They have the same shape and size',
        explanation: '<strong>Congruent</strong> means identical in shape and size. All corresponding sides and angles are equal.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }, { side: 1, count: 2 }, { side: 2, count: 3 }],
                tickMarks2: [{ side: 0, count: 1 }, { side: 1, count: 2 }, { side: 2, count: 3 }],
                angleMarks1: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }, { vertex: 2, count: 3 }],
                angleMarks2: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }, { vertex: 2, count: 3 }]
            });
        }
    }),
    () => ({
        type: 'Definition',
        question: 'What are supplementary angles?',
        format: 'mc',
        choices: gshuffle([
            'Two angles that add up to 180\u00B0',
            'Two angles that add up to 90\u00B0',
            'Two angles that are equal',
            'Two angles that add up to 360\u00B0'
        ]),
        correct: 'Two angles that add up to 180\u00B0',
        explanation: '<strong>Supplementary</strong> angles add up to 180\u00B0. They form a straight line when placed together.',
        drawDiagram: (ctx, w, h) => {
            drawAnglesOnLine(ctx, w, h, { angle1: 120, angle2: 60, labels: ['120\u00B0', '60\u00B0'] });
            ctx.font = '13px system-ui'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
            ctx.fillText('120\u00B0 + 60\u00B0 = 180\u00B0', w / 2, h - 20);
        }
    }),
    () => ({
        type: 'Definition',
        question: 'What are complementary angles?',
        format: 'mc',
        choices: gshuffle([
            'Two angles that add up to 90\u00B0',
            'Two angles that add up to 180\u00B0',
            'Two angles that are equal',
            'Two angles that are vertical'
        ]),
        correct: 'Two angles that add up to 90\u00B0',
        explanation: '<strong>Complementary</strong> angles add up to 90\u00B0.',
        drawDiagram: null
    }),
    () => ({
        type: 'Definition',
        question: 'What are vertical angles?',
        format: 'mc',
        choices: gshuffle([
            'Angles opposite each other when two lines cross',
            'Angles that are above each other',
            'Angles that add up to 90\u00B0',
            'Angles formed by parallel lines'
        ]),
        correct: 'Angles opposite each other when two lines cross',
        explanation: '<strong>Vertical angles</strong> are the pairs of opposite angles formed when two lines intersect. They are always equal.',
        drawDiagram: (ctx, w, h) => {
            const cx = w / 2, cy = h / 2;
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(cx - 120, cy - 80); ctx.lineTo(cx + 120, cy + 80); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx - 120, cy + 80); ctx.lineTo(cx + 120, cy - 80); ctx.stroke();
            // Line angles: atan2(80,120) ≈ 0.588 rad
            const lineAngle = Math.atan2(80, 120);
            const lr = 28;
            // 'a' labels in top and bottom sectors (vertical angles)
            ctx.font = 'bold 14px system-ui';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ef4444';
            ctx.fillText('a', cx + lr * Math.cos(-Math.PI / 2), cy + lr * Math.sin(-Math.PI / 2)); // top
            ctx.fillText('a', cx + lr * Math.cos(Math.PI / 2), cy + lr * Math.sin(Math.PI / 2));   // bottom
            // 'b' labels in left and right sectors (vertical angles)
            ctx.fillStyle = '#38bdf8';
            ctx.fillText('b', cx + lr * Math.cos(0), cy + lr * Math.sin(0));       // right
            ctx.fillText('b', cx + lr * Math.cos(Math.PI), cy + lr * Math.sin(Math.PI)); // left
            ctx.fillStyle = '#94a3b8'; ctx.font = '13px system-ui';
            ctx.fillText('Vertical angles are equal: a = a, b = b', cx, h - 16);
        }
    }),
    () => ({
        type: 'Definition',
        question: 'What is the Triangle Angle Sum Theorem?',
        format: 'mc',
        choices: gshuffle([
            'The angles of a triangle always add up to 180\u00B0',
            'The angles of a triangle always add up to 360\u00B0',
            'Two angles of a triangle are always equal',
            'The largest angle is always 90\u00B0'
        ]),
        correct: 'The angles of a triangle always add up to 180\u00B0',
        explanation: 'The three interior angles of any triangle always sum to <strong>180\u00B0</strong>.',
        drawDiagram: (ctx, w, h) => {
            drawGeoTriangle(ctx, w, h, {
                vertices: [{ x: 0.15, y: 0.82 }, { x: 0.85, y: 0.82 }, { x: 0.45, y: 0.15 }],
                labels: ['A', 'B', 'C'],
                angleMarks: [
                    { vertex: 0, count: 1, color: '#ef4444' },
                    { vertex: 1, count: 1, color: '#38bdf8' },
                    { vertex: 2, count: 1, color: '#fbbf24' }
                ]
            });
            ctx.font = 'bold 13px system-ui'; ctx.textAlign = 'center';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('\u2220A + \u2220B + \u2220C = 180\u00B0', w / 2, h - 10);
        }
    }),
    () => ({
        type: 'Definition',
        question: 'What does CPCTC stand for?',
        format: 'mc',
        choices: gshuffle([
            'Corresponding Parts of Congruent Triangles are Congruent',
            'Congruent Parts of Corresponding Triangles are Congruent',
            'Corresponding Points of Congruent Triangles are Collinear',
            'Congruent Parts Create Two Congruent shapes'
        ]),
        correct: 'Corresponding Parts of Congruent Triangles are Congruent',
        explanation: '<strong>CPCTC</strong>: once you prove two triangles are congruent, ALL their corresponding parts (sides and angles) are congruent.',
        drawDiagram: null
    }),
    // Angle relationships with parallel lines
    () => ({
        type: 'Parallel Lines',
        question: 'Lines l and m are parallel. Angles 1 and 5 are in the same position at each intersection. What are they called?',
        format: 'mc',
        choices: gshuffle(['Corresponding angles', 'Alternate interior angles', 'Alternate exterior angles', 'Co-interior angles']),
        correct: 'Corresponding angles',
        explanation: '<strong>Corresponding angles</strong> are in the same position at each intersection when a transversal crosses parallel lines. They are equal.',
        drawDiagram: (ctx, w, h) => { drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [1, 5] }); }
    }),
    () => ({
        type: 'Parallel Lines',
        question: 'Lines l and m are parallel. Angles 3 and 5 are between the parallel lines on opposite sides of the transversal. What are they called?',
        format: 'mc',
        choices: gshuffle(['Alternate interior angles', 'Corresponding angles', 'Co-interior angles', 'Vertical angles']),
        correct: 'Alternate interior angles',
        explanation: '<strong>Alternate interior angles</strong> are between the parallel lines on opposite sides of the transversal. They are equal.',
        drawDiagram: (ctx, w, h) => { drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [3, 5] }); }
    }),
    () => ({
        type: 'Parallel Lines',
        question: 'Lines l and m are parallel. Angles 3 and 6 are between the parallel lines on the same side of the transversal. What are they called?',
        format: 'mc',
        choices: gshuffle(['Co-interior (same-side interior) angles', 'Alternate interior angles', 'Corresponding angles', 'Vertical angles']),
        correct: 'Co-interior (same-side interior) angles',
        explanation: '<strong>Co-interior angles</strong> (also called same-side interior or consecutive interior) are between the parallel lines on the same side. They are supplementary (add to 180\u00B0).',
        drawDiagram: (ctx, w, h) => { drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [3, 6] }); }
    }),
    // Triangle angle sum calculations
    () => {
        const a = gpick([30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
        const b = gpick([30, 35, 40, 45, 50, 55, 60, 65]);
        const c = 180 - a - b;
        if (c <= 0) return EASY_PROBLEMS[9]();
        return {
            type: 'Triangle Angles',
            question: `In \u25B3ABC, \u2220A = ${a}\u00B0 and \u2220B = ${b}\u00B0. What is \u2220C?`,
            format: 'mc',
            choices: gshuffle([c + '\u00B0', (c + 10) + '\u00B0', (c - 10) + '\u00B0', (180 - a) + '\u00B0']),
            correct: c + '\u00B0',
            explanation: `\u2220C = 180\u00B0 \u2212 ${a}\u00B0 \u2212 ${b}\u00B0 = <strong>${c}\u00B0</strong>`,
            drawDiagram: (ctx, w, h) => {
                drawGeoTriangle(ctx, w, h, {
                    vertices: [{ x: 0.15, y: 0.82 }, { x: 0.85, y: 0.82 }, { x: 0.4, y: 0.15 }],
                    labels: ['A', 'B', 'C'],
                    angleMarks: [
                        { vertex: 0, count: 1, color: '#ef4444' },
                        { vertex: 1, count: 1, color: '#38bdf8' },
                        { vertex: 2, count: 1, color: '#fbbf24' }
                    ]
                });
                ctx.font = 'bold 13px system-ui';
                ctx.fillStyle = '#ef4444'; ctx.textAlign = 'left';
                ctx.fillText(a + '\u00B0', w * 0.2, h * 0.72);
                ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'right';
                ctx.fillText(b + '\u00B0', w * 0.78, h * 0.72);
                ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'center';
                ctx.fillText('?', w * 0.4, h * 0.28);
            }
        };
    },
    // Vertical angles calculation
    () => {
        const a = gpick([35, 42, 55, 63, 70, 78, 85, 110, 125, 140]);
        return {
            type: 'Vertical Angles',
            question: `Two lines intersect. One angle is ${a}\u00B0. What is the angle directly opposite it?`,
            format: 'mc',
            choices: gshuffle([a + '\u00B0', (180 - a) + '\u00B0', (90 - a > 0 ? 90 - a : 90 + a) + '\u00B0', (360 - a) + '\u00B0']),
            correct: a + '\u00B0',
            explanation: `Vertical angles are <strong>equal</strong>, so the opposite angle is also <strong>${a}\u00B0</strong>.`,
            drawDiagram: (ctx, w, h) => {
                const cx = w / 2, cy = h / 2;
                ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.moveTo(cx - 120, cy - 70); ctx.lineTo(cx + 120, cy + 70); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx - 120, cy + 70); ctx.lineTo(cx + 120, cy - 70); ctx.stroke();
                ctx.font = 'bold 15px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillStyle = '#ef4444'; ctx.fillText(a + '\u00B0', cx - 30, cy - 20);
                ctx.fillStyle = '#fbbf24'; ctx.fillText('?', cx + 30, cy + 20);
            }
        };
    },
    // Identify congruence postulate from diagram
    () => ({
        type: 'Congruence Postulate',
        question: 'Two sides and the included angle of one triangle are congruent to two sides and the included angle of another. Which postulate proves they are congruent?',
        format: 'mc',
        choices: gshuffle(['SAS', 'SSS', 'ASA', 'AAS']),
        correct: 'SAS',
        explanation: '<strong>SAS (Side-Angle-Side)</strong>: if two sides and the angle between them are congruent, the triangles are congruent.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }, { side: 2, count: 2 }],
                tickMarks2: [{ side: 0, count: 1 }, { side: 2, count: 2 }],
                angleMarks1: [{ vertex: 0, count: 1 }],
                angleMarks2: [{ vertex: 0, count: 1 }]
            });
            ctx.font = 'bold 13px system-ui'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
            ctx.fillText('Side-Angle-Side', w / 2, h - 10);
        }
    }),
    () => ({
        type: 'Congruence Postulate',
        question: 'All three sides of one triangle are congruent to all three sides of another. Which postulate proves congruence?',
        format: 'mc',
        choices: gshuffle(['SSS', 'SAS', 'ASA', 'HL']),
        correct: 'SSS',
        explanation: '<strong>SSS (Side-Side-Side)</strong>: if all three pairs of sides are congruent, the triangles are congruent.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }, { side: 1, count: 2 }, { side: 2, count: 3 }],
                tickMarks2: [{ side: 0, count: 1 }, { side: 1, count: 2 }, { side: 2, count: 3 }]
            });
        }
    }),
    () => ({
        type: 'Congruence Postulate',
        question: 'Two angles and the included side of one triangle are congruent to two angles and the included side of another. Which postulate?',
        format: 'mc',
        choices: gshuffle(['ASA', 'AAS', 'SAS', 'SSS']),
        correct: 'ASA',
        explanation: '<strong>ASA (Angle-Side-Angle)</strong>: two angles and the side between them.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }],
                tickMarks2: [{ side: 0, count: 1 }],
                angleMarks1: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }],
                angleMarks2: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }]
            });
        }
    }),
    // Isosceles triangle
    () => {
        const baseAngle = gpick([40, 45, 50, 55, 60, 65, 70, 75]);
        const vertex = 180 - 2 * baseAngle;
        return {
            type: 'Isosceles Triangle',
            question: `In isosceles \u25B3ABC, AB = AC and \u2220B = ${baseAngle}\u00B0. What is \u2220A (the vertex angle)?`,
            format: 'mc',
            choices: gshuffle([vertex + '\u00B0', baseAngle + '\u00B0', (180 - baseAngle) + '\u00B0', (2 * baseAngle) + '\u00B0']),
            correct: vertex + '\u00B0',
            explanation: `Base angles are equal, so \u2220C = ${baseAngle}\u00B0 too. \u2220A = 180\u00B0 \u2212 ${baseAngle}\u00B0 \u2212 ${baseAngle}\u00B0 = <strong>${vertex}\u00B0</strong>.`,
            drawDiagram: (ctx, w, h) => {
                drawIsosceles(ctx, w, h, { baseAngleLabel: baseAngle + '\u00B0', vertexAngleLabel: '?' });
            }
        };
    },

    // ========== PYTHAGOREAN THEOREM (Easy) ==========
    () => {
        const a = gpick([3, 5, 6, 8]);
        const b = gpick([4, 8, 8, 6]);
        const c = Math.sqrt(a * a + b * b);
        if (c !== Math.floor(c)) return EASY_PROBLEMS[EASY_PROBLEMS.length - 1]();
        return {
            type: 'Pythagorean Theorem',
            question: `A right triangle has legs of length ${a} and ${b}. What is the length of the hypotenuse?`,
            format: 'mc',
            choices: gshuffle([c.toString(), (a + b).toString(), (c + 1).toString(), (c - 1).toString()]),
            correct: c.toString(),
            explanation: `c\u00B2 = ${a}\u00B2 + ${b}\u00B2 = ${a*a} + ${b*b} = ${a*a+b*b}. c = \u221A${a*a+b*b} = <strong>${c}</strong>.`,
            drawDiagram: (ctx, w, h) => {
                drawGeoTriangle(ctx, w, h, {
                    vertices: [{ x: 0.15, y: 0.82 }, { x: 0.75, y: 0.82 }, { x: 0.15, y: 0.2 }],
                    labels: ['A', 'B', 'C'],
                    sides: [a.toString(), '?', b.toString()]
                });
                const sq = 10;
                ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
                ctx.strokeRect(0.15 * w, 0.82 * h - sq, sq, sq);
            }
        };
    },
    () => ({
        type: 'Pythagorean Theorem',
        question: 'Which of the following is a Pythagorean triple?',
        format: 'mc',
        choices: gshuffle(['3, 4, 5', '3, 5, 6', '4, 5, 7', '2, 4, 5']),
        correct: '3, 4, 5',
        explanation: '3\u00B2 + 4\u00B2 = 9 + 16 = 25 = 5\u00B2. So <strong>3, 4, 5</strong> is a Pythagorean triple.',
        drawDiagram: null
    }),
    () => ({
        type: 'Pythagorean Theorem',
        question: 'Which of these is also a Pythagorean triple?',
        format: 'mc',
        choices: gshuffle(['5, 12, 13', '5, 11, 13', '6, 10, 13', '7, 11, 13']),
        correct: '5, 12, 13',
        explanation: '5\u00B2 + 12\u00B2 = 25 + 144 = 169 = 13\u00B2. So <strong>5, 12, 13</strong> is a Pythagorean triple.',
        drawDiagram: null
    }),

    // ========== AREA & PERIMETER (Easy) ==========
    () => {
        const b = gpick([5, 6, 8, 10, 12]);
        const ht = gpick([3, 4, 5, 6, 7]);
        const area = 0.5 * b * ht;
        return {
            type: 'Area',
            question: `What is the area of a triangle with base ${b} and height ${ht}?`,
            format: 'mc',
            choices: gshuffle([area.toString(), (b * ht).toString(), (2 * area + 1).toString(), (area - 1).toString()]),
            correct: area.toString(),
            explanation: `Area = \u00BDbh = \u00BD \u00D7 ${b} \u00D7 ${ht} = <strong>${area}</strong>.`,
            drawDiagram: null
        };
    },
    () => {
        const l = gpick([5, 7, 8, 10, 12]);
        const w = gpick([3, 4, 5, 6, 9]);
        const area = l * w;
        const perim = 2 * (l + w);
        return {
            type: 'Area & Perimeter',
            question: `A rectangle has length ${l} and width ${w}. What is its area?`,
            format: 'mc',
            choices: gshuffle([area.toString(), perim.toString(), (area + l).toString(), (l + w).toString()]),
            correct: area.toString(),
            explanation: `Area = length \u00D7 width = ${l} \u00D7 ${w} = <strong>${area}</strong>.`,
            drawDiagram: null
        };
    },
    () => {
        const r = gpick([3, 4, 5, 7, 10]);
        const circ = '2\u03C0(' + r + ') = ' + (2 * r) + '\u03C0';
        const ans = (2 * r) + '\u03C0';
        return {
            type: 'Circles',
            question: `What is the circumference of a circle with radius ${r}? (Leave answer in terms of \u03C0)`,
            format: 'mc',
            choices: gshuffle([ans, (r * r) + '\u03C0', r + '\u03C0', (4 * r) + '\u03C0']),
            correct: ans,
            explanation: `C = 2\u03C0r = 2\u03C0(${r}) = <strong>${ans}</strong>.`,
            drawDiagram: null
        };
    },
    () => {
        const r = gpick([2, 3, 4, 5, 6]);
        const ans = (r * r) + '\u03C0';
        return {
            type: 'Circles',
            question: `What is the area of a circle with radius ${r}? (Leave answer in terms of \u03C0)`,
            format: 'mc',
            choices: gshuffle([ans, (2 * r) + '\u03C0', (r * r * 2) + '\u03C0', (r + r) + '\u03C0']),
            correct: ans,
            explanation: `A = \u03C0r\u00B2 = \u03C0(${r})\u00B2 = <strong>${ans}</strong>.`,
            drawDiagram: null
        };
    },

    // ========== COORDINATE GEOMETRY (Easy) ==========
    () => {
        const x1 = gpick([1, 2, 3]), y1 = gpick([1, 2, 4]);
        const x2 = gpick([5, 6, 7]), y2 = gpick([5, 6, 8]);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const ans = `(${mx}, ${my})`;
        return {
            type: 'Coordinate Geometry',
            question: `What is the midpoint of the segment from (${x1}, ${y1}) to (${x2}, ${y2})?`,
            format: 'mc',
            choices: gshuffle([ans, `(${x1 + x2}, ${y1 + y2})`, `(${mx + 1}, ${my})`, `(${mx}, ${my + 1})`]),
            correct: ans,
            explanation: `Midpoint = ((${x1}+${x2})/2, (${y1}+${y2})/2) = <strong>${ans}</strong>.`,
            drawDiagram: null
        };
    },
    () => {
        const rise = gpick([2, 3, 4, 6]);
        const run = gpick([1, 2, 3, 4]);
        const x1 = gpick([0, 1, 2]), y1 = gpick([0, 1, 3]);
        const x2 = x1 + run, y2 = y1 + rise;
        const slope = rise / run;
        const slopeStr = (rise % run === 0) ? slope.toString() : rise + '/' + run;
        return {
            type: 'Coordinate Geometry',
            question: `What is the slope of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})?`,
            format: 'mc',
            choices: gshuffle([slopeStr, run + '/' + rise, (-rise) + '/' + run, (rise + 1) + '/' + run]),
            correct: slopeStr,
            explanation: `Slope = (y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081) = (${y2}\u2212${y1})/(${x2}\u2212${x1}) = ${rise}/${run} = <strong>${slopeStr}</strong>.`,
            drawDiagram: null
        };
    },

    // ========== TRANSFORMATIONS (Easy) ==========
    () => ({
        type: 'Transformations',
        question: 'A figure is slid to a new position without rotating or flipping. What type of transformation is this?',
        format: 'mc',
        choices: gshuffle(['Translation', 'Rotation', 'Reflection', 'Dilation']),
        correct: 'Translation',
        explanation: 'A <strong>translation</strong> slides every point of a figure the same distance in the same direction.',
        drawDiagram: null
    }),
    () => ({
        type: 'Transformations',
        question: 'A figure is flipped over a line. What type of transformation is this?',
        format: 'mc',
        choices: gshuffle(['Reflection', 'Translation', 'Rotation', 'Dilation']),
        correct: 'Reflection',
        explanation: 'A <strong>reflection</strong> flips a figure over a line (the line of reflection), creating a mirror image.',
        drawDiagram: null
    }),
    () => ({
        type: 'Transformations',
        question: 'What are the coordinates of (3, 5) after reflection over the x-axis?',
        format: 'mc',
        choices: gshuffle(['(3, \u22125)', '(\u22123, 5)', '(\u22123, \u22125)', '(5, 3)']),
        correct: '(3, \u22125)',
        explanation: 'Reflecting over the x-axis negates the y-coordinate: (x, y) \u2192 (x, \u2212y). So (3, 5) \u2192 <strong>(3, \u22125)</strong>.',
        drawDiagram: null
    }),

    // ========== POLYGON ANGLES (Easy) ==========
    () => ({
        type: 'Polygon Angles',
        question: 'What is the sum of the interior angles of a quadrilateral?',
        format: 'mc',
        choices: gshuffle(['360\u00B0', '180\u00B0', '540\u00B0', '720\u00B0']),
        correct: '360\u00B0',
        explanation: 'Sum = (n \u2212 2) \u00D7 180\u00B0 = (4 \u2212 2) \u00D7 180\u00B0 = <strong>360\u00B0</strong>.',
        drawDiagram: null
    }),
    () => ({
        type: 'Polygon Angles',
        question: 'What is the sum of the interior angles of a pentagon (5 sides)?',
        format: 'mc',
        choices: gshuffle(['540\u00B0', '360\u00B0', '720\u00B0', '900\u00B0']),
        correct: '540\u00B0',
        explanation: 'Sum = (5 \u2212 2) \u00D7 180\u00B0 = 3 \u00D7 180\u00B0 = <strong>540\u00B0</strong>.',
        drawDiagram: null
    }),

    // ========== VOLUME (Easy) ==========
    () => {
        const l = gpick([3, 4, 5, 6]);
        const w = gpick([2, 3, 4, 5]);
        const ht = gpick([2, 3, 4, 7]);
        const vol = l * w * ht;
        return {
            type: 'Volume',
            question: `What is the volume of a rectangular prism with length ${l}, width ${w}, and height ${ht}?`,
            format: 'mc',
            choices: gshuffle([vol.toString(), (l * w + ht).toString(), (2 * (l * w + l * ht + w * ht)).toString(), (vol + l).toString()]),
            correct: vol.toString(),
            explanation: `V = lwh = ${l} \u00D7 ${w} \u00D7 ${ht} = <strong>${vol}</strong>.`,
            drawDiagram: null
        };
    },
];

// -- MEDIUM PROBLEMS (fill in proof steps, parallel line calculations, which postulate) --

const MEDIUM_PROBLEMS = [
    // Fill in missing reason in simple proof
    () => ({
        type: 'Proof: Missing Reason',
        question: 'Fill in the missing reason in this proof.',
        format: 'proof',
        proof: [
            { statement: '\u2220A and \u2220B are supplementary', reason: 'Given' },
            { statement: '\u2220A + \u2220B = 180\u00B0', reason: '[?]' },
            { statement: '\u2220A = 180\u00B0 \u2212 \u2220B', reason: 'Subtraction Property of Equality' },
        ],
        blanks: [{ row: 1, col: 'reason', options: ['Definition of supplementary angles', 'Vertical Angles Theorem', 'Definition of complementary angles', 'Linear Pair Postulate'], correct: 'Definition of supplementary angles' }],
        explanation: 'If two angles are <strong>supplementary</strong>, by definition they add up to 180\u00B0.',
        drawDiagram: (ctx, w, h) => {
            drawAnglesOnLine(ctx, w, h, { angle1: 130, angle2: 50, labels: ['\u2220A', '\u2220B'] });
        }
    }),
    () => ({
        type: 'Proof: Missing Reason',
        question: 'Fill in the missing reason.',
        format: 'proof',
        proof: [
            { statement: 'l \u2225 m, cut by transversal t', reason: 'Given' },
            { statement: '\u22201 \u2245 \u22205', reason: '[?]' },
        ],
        blanks: [{ row: 1, col: 'reason', options: ['Corresponding Angles Postulate', 'Alternate Interior Angles Theorem', 'Vertical Angles Theorem', 'Co-interior Angles Theorem'], correct: 'Corresponding Angles Postulate' }],
        explanation: 'Angles 1 and 5 are in <strong>corresponding</strong> positions, so they are congruent when lines are parallel.',
        drawDiagram: (ctx, w, h) => { drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [1, 5] }); }
    }),
    () => ({
        type: 'Proof: Missing Reason',
        question: 'Fill in the missing reason.',
        format: 'proof',
        proof: [
            { statement: 'l \u2225 m, cut by transversal t', reason: 'Given' },
            { statement: '\u22204 \u2245 \u22206', reason: '[?]' },
        ],
        blanks: [{ row: 1, col: 'reason', options: ['Alternate Interior Angles Theorem', 'Corresponding Angles Postulate', 'Co-interior Angles Theorem', 'Vertical Angles Theorem'], correct: 'Alternate Interior Angles Theorem' }],
        explanation: 'Angles 4 and 6 are <strong>alternate interior angles</strong> \u2014 between the parallel lines on opposite sides.',
        drawDiagram: (ctx, w, h) => { drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [4, 6] }); }
    }),
    // Parallel lines angle calculation
    () => {
        const a = gpick([52, 65, 70, 78, 85, 110, 115, 125, 130, 140]);
        return {
            type: 'Parallel Lines',
            question: `Lines l \u2225 m. If \u22201 = ${a}\u00B0, what is \u22207 (co-interior with \u22203, and \u22203 is vertical to \u22201)?`,
            format: 'mc',
            choices: gshuffle([
                (180 - a) + '\u00B0',
                a + '\u00B0',
                (90 - a > 0 ? 90 - a : 360 - a) + '\u00B0',
                (a + 20) + '\u00B0'
            ]),
            correct: (180 - a) + '\u00B0',
            explanation: `\u22203 = \u22201 = ${a}\u00B0 (vertical angles). \u22203 and \u22208 are co-interior, so \u22208 = 180\u00B0 \u2212 ${a}\u00B0 = ${180-a}\u00B0. \u22207 = \u22208's vertical = ${180-a}\u00B0.`,
            drawDiagram: (ctx, w, h) => {
                drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [1, 7], angleLabels: { 1: a + '\u00B0' } });
            }
        };
    },
    // Which congruence postulate from description
    () => ({
        type: 'Which Postulate?',
        question: 'You know: \u2220A \u2245 \u2220D, AB \u2245 DE, \u2220B \u2245 \u2220E. Which postulate proves \u25B3ABC \u2245 \u25B3DEF?',
        format: 'mc',
        choices: gshuffle(['ASA', 'SAS', 'AAS', 'SSS']),
        correct: 'ASA',
        explanation: 'The known side AB is between the two known angles A and B. That\u2019s <strong>ASA</strong>.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }], tickMarks2: [{ side: 0, count: 1 }],
                angleMarks1: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }],
                angleMarks2: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }]
            });
        }
    }),
    () => ({
        type: 'Which Postulate?',
        question: 'You know: \u2220A \u2245 \u2220D, \u2220B \u2245 \u2220E, BC \u2245 EF. The side is NOT between the angles. Which postulate?',
        format: 'mc',
        choices: gshuffle(['AAS', 'ASA', 'SAS', 'HL']),
        correct: 'AAS',
        explanation: 'Two angles and a non-included side: <strong>AAS (Angle-Angle-Side)</strong>.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 1, count: 1 }], tickMarks2: [{ side: 1, count: 1 }],
                angleMarks1: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }],
                angleMarks2: [{ vertex: 0, count: 1 }, { vertex: 1, count: 2 }]
            });
        }
    }),
    () => ({
        type: 'Which Postulate?',
        question: 'Both triangles are right triangles. The hypotenuses are congruent and one pair of legs are congruent. Which theorem?',
        format: 'mc',
        choices: gshuffle(['HL (Hypotenuse-Leg)', 'SAS', 'SSS', 'ASA']),
        correct: 'HL (Hypotenuse-Leg)',
        explanation: '<strong>HL</strong> works only for right triangles: congruent hypotenuse + one congruent leg.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 1, count: 2 }, { side: 2, count: 1 }],
                tickMarks2: [{ side: 1, count: 2 }, { side: 2, count: 1 }],
                rightAngle1: 0, rightAngle2: 0
            });
        }
    }),
    // Simple triangle congruence proof with one blank
    () => ({
        type: 'Proof: Triangle Congruence',
        question: 'Fill in the missing step to prove \u25B3ABC \u2245 \u25B3DBC.',
        format: 'proof',
        proof: [
            { statement: 'AB \u2245 DB', reason: 'Given' },
            { statement: 'BC \u2245 BC', reason: '[?]' },
            { statement: '\u2220ABC \u2245 \u2220DBC', reason: 'Given' },
            { statement: '\u25B3ABC \u2245 \u25B3DBC', reason: 'SAS' },
        ],
        blanks: [{ row: 1, col: 'reason', options: ['Reflexive Property', 'Given', 'CPCTC', 'Transitive Property'], correct: 'Reflexive Property' }],
        explanation: 'A segment is congruent to itself by the <strong>Reflexive Property</strong>. This shared side is key for many proofs.',
        drawDiagram: (ctx, w, h) => {
            const A = { x: 0.15, y: 0.2 };
            const B = { x: 0.5, y: 0.85 };
            const C = { x: 0.85, y: 0.5 };
            const D = { x: 0.15, y: 0.85 };
            // Triangle ABC
            drawGeoTriangle(ctx, w, h, {
                vertices: [A, B, C], labels: ['A', 'B', 'C'],
                tickMarks: [{ side: 0, count: 1 }], angleMarks: [{ vertex: 1, count: 1 }]
            });
            // Triangle DBC (shares BC)
            drawGeoTriangle(ctx, w, h, {
                vertices: [D, B, C], labels: ['D', '', ''],
                tickMarks: [{ side: 0, count: 1 }], angleMarks: [{ vertex: 1, count: 1 }]
            });
        }
    }),
    // Linear pair
    () => {
        const a = gpick([40, 55, 62, 73, 85, 95, 108, 120, 135, 148]);
        const b = 180 - a;
        return {
            type: 'Linear Pair',
            question: `\u2220A and \u2220B form a linear pair. If \u2220A = ${a}\u00B0, what is \u2220B?`,
            format: 'mc',
            choices: gshuffle([b + '\u00B0', a + '\u00B0', (360 - a) + '\u00B0', (90 + a > 180 ? a - 90 : 90 - a) + '\u00B0']),
            correct: b + '\u00B0',
            explanation: `A linear pair is supplementary. \u2220B = 180\u00B0 \u2212 ${a}\u00B0 = <strong>${b}\u00B0</strong>.`,
            drawDiagram: (ctx, w, h) => {
                drawAnglesOnLine(ctx, w, h, { angle1: a, angle2: b, labels: [a + '\u00B0', '?'] });
            }
        };
    },
    // Proof: isosceles base angles
    () => ({
        type: 'Proof: Missing Reason',
        question: 'Fill in the missing reason for the Isosceles Triangle Theorem.',
        format: 'proof',
        proof: [
            { statement: 'AB \u2245 AC (isosceles)', reason: 'Given' },
            { statement: 'Draw AD, the bisector of \u2220A', reason: 'Construction' },
            { statement: '\u2220BAD \u2245 \u2220CAD', reason: 'Definition of angle bisector' },
            { statement: 'AD \u2245 AD', reason: 'Reflexive Property' },
            { statement: '\u25B3ABD \u2245 \u25B3ACD', reason: '[?]' },
            { statement: '\u2220B \u2245 \u2220C', reason: 'CPCTC' },
        ],
        blanks: [{ row: 4, col: 'reason', options: ['SAS', 'SSS', 'ASA', 'AAS'], correct: 'SAS' }],
        explanation: 'We have AB\u2245AC (S), \u2220BAD\u2245\u2220CAD (A), AD\u2245AD (S). That\'s <strong>SAS</strong>.',
        drawDiagram: (ctx, w, h) => {
            drawIsosceles(ctx, w, h, {});
            // Draw angle bisector
            const v = [{ x: 0.25, y: 0.85 }, { x: 0.75, y: 0.85 }, { x: 0.5, y: 0.12 }];
            ctx.setLineDash([4, 3]); ctx.strokeStyle = '#94a3b880'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(v[2].x * w, v[2].y * h);
            ctx.lineTo((v[0].x + v[1].x) / 2 * w, v[0].y * h); ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '12px system-ui'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
            ctx.fillText('D', (v[0].x + v[1].x) / 2 * w, v[0].y * h + 14);
        }
    }),
    // Exterior angle theorem
    () => {
        const a = gpick([30, 35, 40, 45, 50, 55]);
        const b = gpick([40, 50, 55, 60, 65, 70, 75]);
        const ext = a + b;
        return {
            type: 'Exterior Angle',
            question: `In \u25B3ABC, the exterior angle at C equals the sum of the two non-adjacent interior angles. If \u2220A = ${a}\u00B0 and \u2220B = ${b}\u00B0, what is the exterior angle at C?`,
            format: 'mc',
            choices: gshuffle([ext + '\u00B0', (180 - ext) + '\u00B0', (180 - a) + '\u00B0', (a + b + 10) + '\u00B0']),
            correct: ext + '\u00B0',
            explanation: `Exterior angle = sum of remote interior angles = ${a}\u00B0 + ${b}\u00B0 = <strong>${ext}\u00B0</strong>.`,
            drawDiagram: (ctx, w, h) => {
                const pts = [{ x: 0.12, y: 0.78 }, { x: 0.68, y: 0.78 }, { x: 0.45, y: 0.18 }];
                drawGeoTriangle(ctx, w, h, {
                    vertices: pts, labels: ['A', 'B', 'C'],
                    angleMarks: [{ vertex: 0, count: 1, color: '#ef4444' }, { vertex: 1, count: 1, color: '#38bdf8' }]
                });
                // Extend side BC
                ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.moveTo(pts[1].x * w, pts[1].y * h); ctx.lineTo(w * 0.92, pts[1].y * h); ctx.stroke();
                // Exterior angle arc
                ctx.beginPath();
                const bx = pts[1].x * w, by = pts[1].y * h;
                ctx.arc(bx, by, 24, -Math.atan2(pts[1].y - pts[2].y, pts[2].x - pts[1].x) - Math.PI, 0);
                ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.font = 'bold 14px system-ui'; ctx.fillStyle = '#fbbf24';
                ctx.textAlign = 'left'; ctx.fillText('?', bx + 28, by - 14);
                ctx.font = 'bold 13px system-ui';
                ctx.fillStyle = '#ef4444'; ctx.textAlign = 'left'; ctx.fillText(a + '\u00B0', pts[0].x * w + 26, pts[0].y * h - 14);
                ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'right'; ctx.fillText(b + '\u00B0', pts[1].x * w - 30, pts[1].y * h - 14);
            }
        };
    },
    // Identify what's NOT a valid congruence shortcut
    () => ({
        type: 'Not Valid!',
        question: 'Which of the following is NOT a valid way to prove triangle congruence?',
        format: 'mc',
        choices: gshuffle(['SSA', 'SAS', 'ASA', 'SSS']),
        correct: 'SSA',
        explanation: '<strong>SSA (or ASS)</strong> is NOT valid! Two sides and a non-included angle can produce two different triangles (the ambiguous case).',
        drawDiagram: null
    }),
    // Properties of parallelogram
    () => ({
        type: 'Definition',
        question: 'In a parallelogram, what is always true about opposite angles?',
        format: 'mc',
        choices: gshuffle(['They are congruent', 'They are supplementary', 'They are complementary', 'They add up to 360\u00B0']),
        correct: 'They are congruent',
        explanation: 'In a parallelogram, <strong>opposite angles are congruent</strong> and consecutive angles are supplementary.',
        drawDiagram: (ctx, w, h) => {
            const offset = 50;
            const pts = [
                { x: w * 0.15 + offset, y: h * 0.7 },
                { x: w * 0.65 + offset, y: h * 0.7 },
                { x: w * 0.85 - offset, y: h * 0.3 },
                { x: w * 0.35 - offset, y: h * 0.3 },
            ];
            ctx.beginPath();
            pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.closePath();
            ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
            ctx.fill();
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5; ctx.stroke();
            ctx.font = 'bold 15px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            // Position labels toward the center of the parallelogram
            const pcx = (pts[0].x + pts[1].x + pts[2].x + pts[3].x) / 4;
            const pcy = (pts[0].y + pts[1].y + pts[2].y + pts[3].y) / 4;
            const labels = ['\u03B1', '\u03B2', '\u03B1', '\u03B2'];
            const colors = ['#ef4444', '#38bdf8', '#ef4444', '#38bdf8'];
            pts.forEach((p, i) => {
                const dx = pcx - p.x, dy = pcy - p.y;
                const len = Math.sqrt(dx * dx + dy * dy);
                ctx.fillStyle = colors[i];
                ctx.fillText(labels[i], p.x + dx / len * 22, p.y + dy / len * 22);
            });
        }
    }),
    // Midpoint theorem
    () => ({
        type: 'Proof: Missing Reason',
        question: 'Fill in the missing reason.',
        format: 'proof',
        proof: [
            { statement: 'M is the midpoint of AB', reason: 'Given' },
            { statement: 'AM \u2245 MB', reason: '[?]' },
        ],
        blanks: [{ row: 1, col: 'reason', options: ['Definition of midpoint', 'Reflexive Property', 'Segment Addition Postulate', 'Given'], correct: 'Definition of midpoint' }],
        explanation: 'A midpoint divides a segment into two congruent parts. That\u2019s the <strong>definition of midpoint</strong>.',
        drawDiagram: null
    }),
];

// -- HARD PROBLEMS (multi-step proofs, full proofs, complex reasoning) --

const HARD_PROBLEMS = [
    // Multi-blank proof: congruent triangles
    () => ({
        type: 'Proof: Two Missing Steps',
        question: 'Complete this proof that \u25B3ABD \u2245 \u25B3CBD.',
        format: 'proof',
        proof: [
            { statement: 'AB \u2245 CB', reason: 'Given' },
            { statement: '\u2220ABD \u2245 \u2220CBD', reason: 'Given' },
            { statement: 'BD \u2245 BD', reason: '[?]' },
            { statement: '\u25B3ABD \u2245 \u25B3CBD', reason: '[?]' },
        ],
        blanks: [
            { row: 2, col: 'reason', options: ['Reflexive Property', 'Given', 'CPCTC', 'Symmetric Property'], correct: 'Reflexive Property' },
            { row: 3, col: 'reason', options: ['SAS', 'SSS', 'ASA', 'AAS'], correct: 'SAS' }
        ],
        explanation: 'BD is shared (Reflexive). We have Side-Angle-Side \u2192 <strong>SAS</strong>.',
        drawDiagram: (ctx, w, h) => {
            const A = { x: 0.15, y: 0.15 }, B = { x: 0.5, y: 0.85 }, C = { x: 0.85, y: 0.15 }, D = { x: 0.5, y: 0.15 };
            drawGeoTriangle(ctx, w, h, { vertices: [A, B, D], labels: ['A', 'B', ''], tickMarks: [{ side: 0, count: 1 }], angleMarks: [{ vertex: 1, count: 1 }] });
            drawGeoTriangle(ctx, w, h, { vertices: [C, B, D], labels: ['C', '', 'D'], tickMarks: [{ side: 0, count: 1 }], angleMarks: [{ vertex: 1, count: 1 }] });
        }
    }),
    // Proof with CPCTC conclusion
    () => ({
        type: 'Proof: Using CPCTC',
        question: 'Complete the proof that \u2220A \u2245 \u2220D.',
        format: 'proof',
        proof: [
            { statement: 'AB \u2245 DE, BC \u2245 EF, AC \u2245 DF', reason: 'Given' },
            { statement: '\u25B3ABC \u2245 \u25B3DEF', reason: '[?]' },
            { statement: '\u2220A \u2245 \u2220D', reason: '[?]' },
        ],
        blanks: [
            { row: 1, col: 'reason', options: ['SSS', 'SAS', 'ASA', 'HL'], correct: 'SSS' },
            { row: 2, col: 'reason', options: ['CPCTC', 'Given', 'Reflexive Property', 'Vertical Angles'], correct: 'CPCTC' }
        ],
        explanation: 'Three pairs of sides \u2192 <strong>SSS</strong>. Then corresponding angles are congruent by <strong>CPCTC</strong>.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }, { side: 1, count: 2 }, { side: 2, count: 3 }],
                tickMarks2: [{ side: 0, count: 1 }, { side: 1, count: 2 }, { side: 2, count: 3 }]
            });
        }
    }),
    // Proof: parallel lines -> alternate interior -> triangle congruence
    () => ({
        type: 'Proof: Parallel Lines + Triangles',
        question: 'Given: AB \u2225 CD, and AC bisects BD at M. Prove \u25B3ABM \u2245 \u25B3DCM. Fill in the blanks.',
        format: 'proof',
        proof: [
            { statement: 'AB \u2225 CD', reason: 'Given' },
            { statement: '\u2220ABM \u2245 \u2220DCM', reason: '[?]' },
            { statement: 'M is the midpoint of BD', reason: 'Given (AC bisects BD)' },
            { statement: 'BM \u2245 DM', reason: 'Definition of midpoint' },
            { statement: '\u2220AMB \u2245 \u2220CMD', reason: '[?]' },
            { statement: '\u25B3ABM \u2245 \u25B3DCM', reason: 'ASA' },
        ],
        blanks: [
            { row: 1, col: 'reason', options: ['Alternate Interior Angles Theorem', 'Corresponding Angles Postulate', 'Co-interior Angles', 'CPCTC'], correct: 'Alternate Interior Angles Theorem' },
            { row: 4, col: 'reason', options: ['Vertical Angles Theorem', 'Alternate Interior Angles', 'Reflexive Property', 'Linear Pair'], correct: 'Vertical Angles Theorem' }
        ],
        explanation: 'AB\u2225CD gives alternate interior angles. Lines crossing at M give <strong>vertical angles</strong>. With the midpoint, it\u2019s ASA.',
        drawDiagram: (ctx, w, h) => {
            const A = { x: 0.1 * w, y: 0.25 * h }, B = { x: 0.45 * w, y: 0.25 * h };
            const C = { x: 0.9 * w, y: 0.75 * h }, D_ = { x: 0.55 * w, y: 0.75 * h };
            const M = { x: 0.5 * w, y: 0.5 * h };
            // Lines
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x + 40, A.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(D_.x - 40, C.y); ctx.lineTo(C.x, C.y); ctx.stroke();
            // Diagonals
            ctx.strokeStyle = '#818cf8'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(A.x + 20, A.y); ctx.lineTo(C.x - 20, C.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(D_.x, D_.y); ctx.stroke();
            // Labels
            ctx.font = 'bold 15px system-ui'; ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'center';
            ctx.fillText('A', A.x, A.y - 12); ctx.fillText('B', B.x, B.y - 12);
            ctx.fillText('C', C.x, C.y + 18); ctx.fillText('D', D_.x, D_.y + 18);
            ctx.fillText('M', M.x + 14, M.y - 8);
            ctx.beginPath(); ctx.arc(M.x, M.y, 4, 0, Math.PI * 2); ctx.fillStyle = '#fbbf24'; ctx.fill();
            // Parallel marks
            ctx.fillStyle = '#94a3b8'; ctx.font = '12px system-ui';
            ctx.fillText('\u2225', (A.x + B.x) / 2, A.y - 12);
            ctx.fillText('\u2225', (C.x + D_.x) / 2, C.y + 16);
        }
    }),
    // Hard: algebraic proof with angles
    () => {
        const x = gpick([20, 25, 30, 35]);
        const a1 = 3 * x + 10;
        const a2 = 5 * x - 30;
        return {
            type: 'Algebraic Proof',
            question: `Alternate interior angles: (3x + 10)\u00B0 and (5x \u2212 30)\u00B0. If the lines are parallel, find x.`,
            format: 'mc',
            choices: gshuffle([x.toString(), (x + 5).toString(), (x - 5).toString(), (x + 10).toString()]),
            correct: x.toString(),
            explanation: `Alternate interior angles are equal: 3x + 10 = 5x \u2212 30 \u2192 40 = 2x \u2192 <strong>x = ${x}</strong>.`,
            drawDiagram: (ctx, w, h) => {
                drawParallelLines(ctx, w, h, {
                    angleLabels: { 3: '(3x+10)\u00B0', 5: '(5x\u221230)\u00B0' },
                    highlightAngles: [3, 5]
                });
            }
        };
    },
    // Full proof: prove lines parallel from equal angles
    () => ({
        type: 'Proof: Lines Are Parallel',
        question: 'Complete the proof that l \u2225 m.',
        format: 'proof',
        proof: [
            { statement: '\u22201 \u2245 \u22205', reason: 'Given' },
            { statement: '\u22201 and \u22205 are corresponding angles', reason: 'Definition (same position at each intersection)' },
            { statement: 'l \u2225 m', reason: '[?]' },
        ],
        blanks: [{ row: 2, col: 'reason', options: ['Converse of Corresponding Angles Postulate', 'Corresponding Angles Postulate', 'Alternate Interior Angles Theorem', 'Given'], correct: 'Converse of Corresponding Angles Postulate' }],
        explanation: 'The <strong>converse</strong>: if corresponding angles are congruent, then the lines are parallel.',
        drawDiagram: (ctx, w, h) => { drawParallelLines(ctx, w, h, { showNumbers: true, highlightAngles: [1, 5] }); }
    }),
    // Proof: overlapping triangles
    () => ({
        type: 'Proof: Overlapping Triangles',
        question: 'Given: AE \u2245 BD, \u2220A \u2245 \u2220B, AC \u2245 BC. Prove \u25B3AEC \u2245 \u25B3BDC. Fill in the blanks.',
        format: 'proof',
        proof: [
            { statement: 'AC \u2245 BC', reason: 'Given' },
            { statement: '\u2220A \u2245 \u2220B', reason: 'Given' },
            { statement: 'AE \u2245 BD', reason: '[?]' },
            { statement: '\u25B3AEC \u2245 \u25B3BDC', reason: '[?]' },
        ],
        blanks: [
            { row: 2, col: 'reason', options: ['Given', 'CPCTC', 'Reflexive Property', 'Definition of midpoint'], correct: 'Given' },
            { row: 3, col: 'reason', options: ['SAS', 'SSS', 'ASA', 'AAS'], correct: 'SAS' }
        ],
        explanation: 'We have AC\u2245BC (S), \u2220A\u2245\u2220B (A), AE\u2245BD (S). The angle is between the sides \u2192 <strong>SAS</strong>.',
        drawDiagram: (ctx, w, h) => {
            const A = { x: 0.1, y: 0.82 }, B = { x: 0.9, y: 0.82 }, C = { x: 0.5, y: 0.12 };
            const D_ = { x: 0.34, y: 0.55 }, E = { x: 0.66, y: 0.55 };
            drawGeoTriangle(ctx, w, h, {
                vertices: [A, B, C], labels: ['A', 'B', 'C'],
                tickMarks: [{ side: 2, count: 2 }, { side: 1, count: 2 }],
                angleMarks: [{ vertex: 0, count: 1 }, { vertex: 1, count: 1 }]
            });
            // Points D and E
            ctx.setLineDash([4, 3]); ctx.strokeStyle = '#fbbf2480'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(A.x * w, A.y * h); ctx.lineTo(E.x * w, E.y * h); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(B.x * w, B.y * h); ctx.lineTo(D_.x * w, D_.y * h); ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = 'bold 14px system-ui'; ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'center';
            ctx.fillText('E', E.x * w + 14, E.y * h);
            ctx.fillText('D', D_.x * w - 14, D_.y * h);
        }
    }),
    // Prove angle bisector creates congruent triangles
    () => ({
        type: 'Proof: Angle Bisector',
        question: 'BD bisects \u2220ABC. BD \u22A5 AC. Prove \u25B3ABD \u2245 \u25B3CBD.',
        format: 'proof',
        proof: [
            { statement: 'BD bisects \u2220ABC', reason: 'Given' },
            { statement: '\u2220ABD \u2245 \u2220CBD', reason: '[?]' },
            { statement: 'BD \u22A5 AC', reason: 'Given' },
            { statement: '\u2220BDA \u2245 \u2220BDC (both 90\u00B0)', reason: 'Definition of perpendicular' },
            { statement: 'BD \u2245 BD', reason: 'Reflexive Property' },
            { statement: '\u25B3ABD \u2245 \u25B3CBD', reason: '[?]' },
        ],
        blanks: [
            { row: 1, col: 'reason', options: ['Definition of angle bisector', 'Given', 'CPCTC', 'Vertical Angles'], correct: 'Definition of angle bisector' },
            { row: 5, col: 'reason', options: ['ASA', 'SAS', 'AAS', 'SSS'], correct: 'ASA' }
        ],
        explanation: 'The bisector gives equal angles (A), we have the shared side BD (S), and the right angles (A). That\u2019s <strong>ASA</strong>.',
        drawDiagram: (ctx, w, h) => {
            const A = { x: 0.15, y: 0.8 }, C = { x: 0.85, y: 0.8 }, B = { x: 0.5, y: 0.1 }, D = { x: 0.5, y: 0.8 };
            drawGeoTriangle(ctx, w, h, {
                vertices: [A, C, B], labels: ['A', 'C', 'B'],
                angleMarks: [{ vertex: 2, count: 1, color: '#ef4444' }]
            });
            // Bisector BD
            ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.setLineDash([5, 3]);
            ctx.beginPath(); ctx.moveTo(B.x * w, B.y * h); ctx.lineTo(D.x * w, D.y * h); ctx.stroke();
            ctx.setLineDash([]);
            // Right angle marker
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
            const sq = 10;
            ctx.strokeRect(D.x * w - sq, D.y * h - sq, sq, sq);
            ctx.font = 'bold 14px system-ui'; ctx.fillStyle = '#fbbf24';
            ctx.textAlign = 'center'; ctx.fillText('D', D.x * w, D.y * h + 16);
        }
    }),
    // Algebraic: consecutive interior angles
    () => {
        const x = gpick([15, 20, 25, 30]);
        const a1 = 4 * x + 10;
        const a2 = 2 * x + 50;
        return {
            type: 'Algebraic Proof',
            question: `Co-interior angles: (4x + 10)\u00B0 and (2x + 50)\u00B0. Lines are parallel. Find x.`,
            format: 'mc',
            choices: gshuffle([x.toString(), (x + 5).toString(), (x - 5).toString(), (x * 2).toString()]),
            correct: x.toString(),
            explanation: `Co-interior angles are supplementary: (4x+10) + (2x+50) = 180 \u2192 6x + 60 = 180 \u2192 6x = 120 \u2192 <strong>x = ${x}</strong>.`,
            drawDiagram: (ctx, w, h) => {
                drawParallelLines(ctx, w, h, {
                    angleLabels: { 4: '(4x+10)\u00B0', 5: '(2x+50)\u00B0' },
                    highlightAngles: [4, 5]
                });
            }
        };
    },
    // Proof: transitive property
    () => ({
        type: 'Proof: Missing Steps',
        question: 'Given: \u2220A \u2245 \u2220B, \u2220B \u2245 \u2220C. Prove \u2220A \u2245 \u2220C.',
        format: 'proof',
        proof: [
            { statement: '\u2220A \u2245 \u2220B', reason: 'Given' },
            { statement: '\u2220B \u2245 \u2220C', reason: 'Given' },
            { statement: '\u2220A \u2245 \u2220C', reason: '[?]' },
        ],
        blanks: [{ row: 2, col: 'reason', options: ['Transitive Property', 'Reflexive Property', 'Symmetric Property', 'Substitution'], correct: 'Transitive Property' }],
        explanation: 'If A=B and B=C, then A=C. That\u2019s the <strong>Transitive Property</strong>.',
        drawDiagram: null
    }),
    // Prove a triangle is isosceles using congruence
    () => ({
        type: 'Proof: Show Isosceles',
        question: 'M is the midpoint of BC. AM \u22A5 BC. Prove \u25B3ABC is isosceles (AB \u2245 AC).',
        format: 'proof',
        proof: [
            { statement: 'M is the midpoint of BC', reason: 'Given' },
            { statement: 'BM \u2245 CM', reason: 'Definition of midpoint' },
            { statement: 'AM \u22A5 BC', reason: 'Given' },
            { statement: '\u2220AMB \u2245 \u2220AMC (both 90\u00B0)', reason: 'Definition of perpendicular' },
            { statement: 'AM \u2245 AM', reason: '[?]' },
            { statement: '\u25B3AMB \u2245 \u25B3AMC', reason: '[?]' },
            { statement: 'AB \u2245 AC', reason: 'CPCTC' },
        ],
        blanks: [
            { row: 4, col: 'reason', options: ['Reflexive Property', 'Given', 'CPCTC', 'Transitive Property'], correct: 'Reflexive Property' },
            { row: 5, col: 'reason', options: ['SAS', 'SSS', 'ASA', 'HL'], correct: 'SAS' }
        ],
        explanation: 'BM\u2245CM (S), right angles (A), AM\u2245AM (S) \u2192 SAS. Then AB\u2245AC by <strong>CPCTC</strong>, so \u25B3ABC is isosceles.',
        drawDiagram: (ctx, w, h) => {
            const B = { x: 0.15, y: 0.82 }, C = { x: 0.85, y: 0.82 }, A = { x: 0.5, y: 0.12 }, M = { x: 0.5, y: 0.82 };
            drawGeoTriangle(ctx, w, h, {
                vertices: [B, C, A], labels: ['B', 'C', 'A'],
                tickMarks: [{ side: 1, count: 2 }, { side: 2, count: 2 }]
            });
            // Perpendicular AM
            ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(A.x * w, A.y * h); ctx.lineTo(M.x * w, M.y * h); ctx.stroke();
            // Right angle marker
            const sq = 10;
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
            ctx.strokeRect(M.x * w - sq, M.y * h - sq, sq, sq);
            // Tick marks on BM and CM
            ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
            const bmx = (B.x + M.x) / 2 * w, bmy = M.y * h;
            ctx.beginPath(); ctx.moveTo(bmx, bmy - 6); ctx.lineTo(bmx, bmy + 6); ctx.stroke();
            const cmx = (C.x + M.x) / 2 * w;
            ctx.beginPath(); ctx.moveTo(cmx, bmy - 6); ctx.lineTo(cmx, bmy + 6); ctx.stroke();
            ctx.font = 'bold 14px system-ui'; ctx.fillStyle = '#fbbf24';
            ctx.textAlign = 'center'; ctx.fillText('M', M.x * w, M.y * h + 16);
        }
    }),
    // Exterior angle theorem proof
    () => ({
        type: 'Proof: Exterior Angle',
        question: 'Prove that an exterior angle of a triangle equals the sum of the two remote interior angles.',
        format: 'proof',
        proof: [
            { statement: '\u2220A + \u2220B + \u2220C = 180\u00B0', reason: 'Triangle Angle Sum Theorem' },
            { statement: '\u2220C + \u2220ACD = 180\u00B0', reason: '[?]' },
            { statement: '\u2220A + \u2220B + \u2220C = \u2220C + \u2220ACD', reason: 'Both equal 180\u00B0 (Transitive)' },
            { statement: '\u2220A + \u2220B = \u2220ACD', reason: '[?]' },
        ],
        blanks: [
            { row: 1, col: 'reason', options: ['Linear Pair Postulate', 'Vertical Angles', 'Triangle Angle Sum', 'CPCTC'], correct: 'Linear Pair Postulate' },
            { row: 3, col: 'reason', options: ['Subtraction Property of Equality', 'Addition Property', 'Reflexive Property', 'Substitution'], correct: 'Subtraction Property of Equality' }
        ],
        explanation: '\u2220C and \u2220ACD form a linear pair (180\u00B0). Set both sums equal, subtract \u2220C \u2192 exterior = remote interior angles.',
        drawDiagram: (ctx, w, h) => {
            const A = { x: 0.12, y: 0.75 }, B = { x: 0.55, y: 0.75 }, C = { x: 0.4, y: 0.18 };
            drawGeoTriangle(ctx, w, h, {
                vertices: [A, B, C], labels: ['A', 'B', 'C'],
                angleMarks: [{ vertex: 0, count: 1, color: '#ef4444' }, { vertex: 1, count: 1, color: '#38bdf8' }, { vertex: 2, count: 2, color: '#a855f7' }]
            });
            // Extend BC
            ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(B.x * w, B.y * h); ctx.lineTo(0.88 * w, B.y * h); ctx.stroke();
            ctx.font = 'bold 14px system-ui'; ctx.fillStyle = '#fbbf24';
            ctx.textAlign = 'left'; ctx.fillText('D', 0.88 * w + 4, B.y * h);
            // Exterior angle arc
            ctx.beginPath();
            ctx.arc(B.x * w, B.y * h, 22, -Math.atan2(B.y - C.y, C.x - B.x) - Math.PI, 0);
            ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.stroke();
            ctx.fillStyle = '#fbbf24'; ctx.fillText('\u2220ACD', B.x * w + 28, B.y * h - 16);
        }
    }),
    // Two-column proof: prove diagonals of parallelogram bisect each other
    () => ({
        type: 'Proof: Parallelogram Diagonals',
        question: 'ABCD is a parallelogram. Prove the diagonals bisect each other (AM \u2245 CM).',
        format: 'proof',
        proof: [
            { statement: 'ABCD is a parallelogram', reason: 'Given' },
            { statement: 'AB \u2225 CD and AB \u2245 CD', reason: 'Def. of parallelogram' },
            { statement: '\u2220ABM \u2245 \u2220CDM', reason: '[?]' },
            { statement: '\u2220AMB \u2245 \u2220CMD', reason: 'Vertical Angles Theorem' },
            { statement: '\u25B3ABM \u2245 \u25B3CDM', reason: '[?]' },
            { statement: 'AM \u2245 CM, BM \u2245 DM', reason: 'CPCTC' },
        ],
        blanks: [
            { row: 2, col: 'reason', options: ['Alternate Interior Angles Theorem', 'Corresponding Angles', 'CPCTC', 'Vertical Angles'], correct: 'Alternate Interior Angles Theorem' },
            { row: 4, col: 'reason', options: ['ASA', 'SAS', 'SSS', 'AAS'], correct: 'ASA' }
        ],
        explanation: 'AB\u2225CD gives alt. interior angles (A), AB\u2245CD (S), vertical angles (A) \u2192 <strong>ASA</strong>. Then CPCTC gives the bisection.',
        drawDiagram: (ctx, w, h) => {
            const offset = 40;
            const A = { x: w * 0.12 + offset, y: h * 0.72 }, B = { x: w * 0.62 + offset, y: h * 0.72 };
            const C = { x: w * 0.88 - offset, y: h * 0.28 }, D_ = { x: w * 0.38 - offset, y: h * 0.28 };
            const M = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.lineTo(C.x, C.y); ctx.lineTo(D_.x, D_.y); ctx.closePath(); ctx.stroke();
            // Diagonals
            ctx.strokeStyle = '#818cf880'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(C.x, C.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(D_.x, D_.y); ctx.stroke();
            // Labels
            ctx.font = 'bold 15px system-ui'; ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'center';
            ctx.fillText('A', A.x - 14, A.y + 6); ctx.fillText('B', B.x + 14, B.y + 6);
            ctx.fillText('C', C.x + 14, C.y - 6); ctx.fillText('D', D_.x - 14, D_.y - 6);
            ctx.fillStyle = '#fbbf24'; ctx.fillText('M', M.x + 12, M.y - 10);
            ctx.beginPath(); ctx.arc(M.x, M.y, 4, 0, Math.PI * 2); ctx.fillStyle = '#fbbf24'; ctx.fill();
        }
    }),
    // Missing STATEMENT in a proof
    () => ({
        type: 'Proof: Missing Statement',
        question: 'Fill in the missing statement.',
        format: 'proof',
        proof: [
            { statement: '\u2220A \u2245 \u2220D (alternate interior, AB \u2225 CD)', reason: 'Given / Alt. Int. Angles' },
            { statement: '[?]', reason: 'Vertical Angles Theorem' },
            { statement: '\u25B3AMB ~ \u25B3DMC', reason: 'AA Similarity' },
        ],
        blanks: [{ row: 1, col: 'statement', options: ['\u2220AMB \u2245 \u2220DMC', '\u2220ABM \u2245 \u2220DCM', 'AM \u2245 DM', 'AB \u2245 CD'], correct: '\u2220AMB \u2245 \u2220DMC' }],
        explanation: 'The vertical angles at M are \u2220AMB and \u2220DMC. With two pairs of angles, we get AA Similarity.',
        drawDiagram: null
    }),
    // Identify the error in a proof
    () => ({
        type: 'Find the Error',
        question: 'Which step has the WRONG reason? "Given: AB \u2245 DE, \u2220A \u2245 \u2220D, BC \u2245 EF. Prove: \u25B3ABC \u2245 \u25B3DEF."',
        format: 'mc',
        choices: gshuffle([
            'Step 4: \u25B3ABC \u2245 \u25B3DEF by ASA (should be SAS)',
            'Step 1: AB \u2245 DE by Given',
            'Step 2: \u2220A \u2245 \u2220D by Given',
            'Step 3: BC \u2245 EF by Given'
        ]),
        correct: 'Step 4: \u25B3ABC \u2245 \u25B3DEF by ASA (should be SAS)',
        explanation: 'We have Side (\u2245), Angle (\u2245), Side (\u2245) \u2014 but the angle is between the sides, so it\u2019s <strong>SAS</strong>, not ASA.',
        drawDiagram: (ctx, w, h) => {
            drawTwoTriangles(ctx, w, h, {
                labels1: ['A', 'B', 'C'], labels2: ['D', 'E', 'F'],
                tickMarks1: [{ side: 0, count: 1 }, { side: 1, count: 2 }],
                tickMarks2: [{ side: 0, count: 1 }, { side: 1, count: 2 }],
                angleMarks1: [{ vertex: 0, count: 1 }],
                angleMarks2: [{ vertex: 0, count: 1 }]
            });
        }
    }),
];

// ============================================================
// PROBLEM SELECTION & UI
// ============================================================

function nextGeoProblem() {
    geoAnswered = false;
    geoProofSelections = {};
    let pool;
    if (geoDifficulty === 'easy') pool = EASY_PROBLEMS;
    else if (geoDifficulty === 'medium') pool = MEDIUM_PROBLEMS;
    else pool = HARD_PROBLEMS;

    geoCurrentProblem = gpick(pool)();

    document.getElementById('geoProblemType').textContent = geoCurrentProblem.type;
    document.getElementById('geoProblemQuestion').textContent = geoCurrentProblem.question;
    document.getElementById('geoHint').textContent = '';
    document.getElementById('geoHint').classList.remove('visible');
    document.getElementById('geoExplanation').classList.remove('visible');
    document.getElementById('geoHintBtn').style.display = '';
    document.getElementById('geoNextBtn').style.display = 'none';
    document.getElementById('geoCheckBtn').style.display = '';
    document.getElementById('geoCheckBtn').disabled = false;

    // Diagram
    const canvas = document.getElementById('geoDiagramCanvas');
    if (geoCurrentProblem.drawDiagram) {
        canvas.style.display = 'block';
        requestAnimationFrame(() => {
            const { w, h } = geoResizeCanvas(canvas);
            const ctx = canvas.getContext('2d');
            geoCurrentProblem.drawDiagram(ctx, w, h);
        });
    } else {
        canvas.style.display = 'none';
    }

    // Answer area
    const area = document.getElementById('geoAnswerArea');
    if (geoCurrentProblem.format === 'mc') {
        area.innerHTML = renderMultipleChoice(geoCurrentProblem.choices);
    } else if (geoCurrentProblem.format === 'proof') {
        area.innerHTML = renderProofTable(geoCurrentProblem.proof, geoCurrentProblem.blanks);
    }

    // Hint
    if (geoCurrentProblem.hint) {
        document.getElementById('geoHint').textContent = geoCurrentProblem.hint;
    }
}

function checkGeoAnswer() {
    if (geoAnswered) return;

    const p = geoCurrentProblem;
    let allCorrect = true;

    if (p.format === 'mc') {
        const selected = geoProofSelections['mc'];
        if (!selected) return; // nothing selected
        allCorrect = selected === p.correct;
        // Highlight
        document.querySelectorAll('.geo-choice-btn').forEach(btn => {
            btn.classList.add('locked');
            if (btn.textContent === p.correct) btn.classList.add('correct');
            if (btn.classList.contains('selected') && btn.textContent !== p.correct) btn.classList.add('wrong');
        });
    } else if (p.format === 'proof') {
        // Check all blanks are filled
        let allFilled = true;
        p.blanks.forEach(b => {
            const id = `geoBlank_${b.row}_${b.col === 'statement' ? 's' : 'r'}`;
            if (!geoProofSelections[id]) allFilled = false;
        });
        if (!allFilled) return;

        p.blanks.forEach(b => {
            const id = `geoBlank_${b.row}_${b.col === 'statement' ? 's' : 'r'}`;
            const selected = geoProofSelections[id];
            const isRight = selected === b.correct;
            if (!isRight) allCorrect = false;
            const el = document.getElementById(id);
            el.classList.add(isRight ? 'blank-correct' : 'blank-wrong');
            if (!isRight) {
                el.textContent = b.correct;
                el.classList.add('blank-corrected');
            }
        });
        document.querySelectorAll('.proof-choice-btn').forEach(b => b.classList.add('locked'));
    }

    geoAnswered = true;

    if (allCorrect) {
        geoStats.correct++;
        geoStats.streak++;
    } else {
        geoStats.wrong++;
        geoStats.streak = 0;
    }

    document.getElementById('geoExplanation').innerHTML = geoCurrentProblem.explanation;
    document.getElementById('geoExplanation').classList.add('visible');
    document.getElementById('geoHintBtn').style.display = 'none';
    document.getElementById('geoNextBtn').style.display = '';
    document.getElementById('geoCheckBtn').style.display = 'none';
    updateGeoUI();
}

function showGeoHint() {
    document.getElementById('geoHint').classList.add('visible');
}

function skipGeoProblem() {
    geoStats.streak = 0;
    updateGeoUI();
    nextGeoProblem();
}
