// ===== REVIEW TAB =====

// Add review-specific styles
const reviewStyles = document.createElement('style');
reviewStyles.textContent = `
    .review-example {
        background: #1a2332;
        border: 1px solid #334155;
        border-radius: 8px;
        padding: 12px 16px;
        margin: 8px 0;
    }
    .example-problem {
        color: #94a3b8;
        font-size: 0.88rem;
        margin-bottom: 6px;
    }
    .example-solution {
        color: #e2e8f0;
        font-size: 0.9rem;
        line-height: 1.6;
    }
    .example-solution strong {
        color: #10b981;
    }
    .review-diagram {
        margin: 12px 0;
        background: #0f172a;
        border-radius: 10px;
        padding: 8px;
        text-align: center;
    }
    .review-diagram canvas {
        width: 100%;
        max-width: 500px;
        height: 220px;
        display: block;
        margin: 0 auto;
    }
`;
document.head.appendChild(reviewStyles);

const REVIEW_TOPICS = {
    // ==================== ALGEBRA TOPICS ====================
    1: {
        title: "Linear Equations & Inequalities",
        content: `
<div class="review-topic">
    <h3>Solving Linear Equations</h3>
    <div class="review-def">A linear equation has the form <strong>ax + b = c</strong> where x appears only to the first power.</div>
    <h4>Steps to Solve</h4>
    <ul>
        <li>Distribute to clear parentheses</li>
        <li>Combine like terms on each side</li>
        <li>Move variable terms to one side, constants to the other</li>
        <li>Divide both sides by the coefficient of x</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Slope</h3>
    <div class="review-formula">slope = m = (y₂ − y₁) / (x₂ − x₁) = rise / run</div>
    <h4>Slope-Intercept Form</h4>
    <div class="review-formula">y = mx + b</div>
    <ul>
        <li><strong>m</strong> = slope (rate of change)</li>
        <li><strong>b</strong> = y-intercept (where the line crosses the y-axis)</li>
    </ul>
    <h4>Point-Slope Form</h4>
    <div class="review-formula">y − y₁ = m(x − x₁)</div>
    <h4>Standard Form</h4>
    <div class="review-formula">Ax + By = C</div>
    <h4>Special Slopes</h4>
    <ul>
        <li>Horizontal line: m = 0 (equation: y = b)</li>
        <li>Vertical line: m is undefined (equation: x = a)</li>
        <li>Parallel lines: same slope</li>
        <li>Perpendicular lines: slopes are negative reciprocals (m₁ · m₂ = −1)</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Inequalities</h3>
    <div class="review-def"><strong>"At most"</strong> means ≤ &nbsp;&nbsp;|&nbsp;&nbsp; <strong>"At least"</strong> means ≥</div>
    <div class="review-def"><strong>"Less than"</strong> means < &nbsp;&nbsp;|&nbsp;&nbsp; <strong>"Greater than"</strong> means ></div>
    <ul>
        <li>Solve like equations, but <strong>flip the inequality sign when multiplying or dividing by a negative number</strong></li>
        <li>Open circle ○ for < or > &nbsp;|&nbsp; Closed circle ● for ≤ or ≥</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Systems of Equations</h3>
    <h4>Substitution</h4>
    <p>Solve one equation for a variable, substitute into the other.</p>
    <h4>Elimination</h4>
    <p>Add or subtract equations to eliminate a variable.</p>
    <div class="review-def">A solution to a system is an ordered pair (x, y) that satisfies both equations.</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Solve: 3(x − 4) + 2 = 17</div>
        <div class="example-solution">3x − 12 + 2 = 17<br>3x − 10 = 17<br>3x = 27<br>x = <strong>9</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Find the slope of the line through (2, 5) and (6, 13).</div>
        <div class="example-solution">m = (13 − 5)/(6 − 2) = 8/4 = <strong>2</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Solve the system: y = 2x + 1 and 3x + y = 16</div>
        <div class="example-solution">Substitute y = 2x + 1 into the second equation:<br>3x + (2x + 1) = 16<br>5x + 1 = 16<br>5x = 15 → x = 3<br>y = 2(3) + 1 = 7<br>Solution: <strong>(3, 7)</strong></div>
    </div>
</div>`
    },

    2: {
        title: "Polynomials & Quadratics",
        content: `
<div class="review-topic">
    <h3>Polynomial Basics</h3>
    <div class="review-def">The <strong>degree</strong> of a polynomial is the highest power of the variable.</div>
    <ul>
        <li>Constant: degree 0 &nbsp;|&nbsp; Linear: degree 1 &nbsp;|&nbsp; Quadratic: degree 2 &nbsp;|&nbsp; Cubic: degree 3</li>
        <li><strong>Like terms</strong> have the same variable raised to the same power</li>
        <li>Add/subtract polynomials by combining like terms</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Multiplying Polynomials</h3>
    <h4>FOIL (for two binomials)</h4>
    <div class="review-formula">(a + b)(c + d) = ac + ad + bc + bd</div>
    <p>First · Outer · Inner · Last</p>
    <h4>Special Products</h4>
    <div class="review-formula">(a + b)² = a² + 2ab + b²</div>
    <div class="review-formula">(a − b)² = a² − 2ab + b²</div>
    <div class="review-formula">(a + b)(a − b) = a² − b²</div>
</div>

<div class="review-topic">
    <h3>Factoring</h3>
    <h4>Always check for a GCF first</h4>
    <div class="review-formula">GCF: ab + ac = a(b + c)</div>
    <h4>Difference of Squares</h4>
    <div class="review-formula">a² − b² = (a + b)(a − b)</div>
    <h4>Trinomial Factoring (x² + bx + c)</h4>
    <p>Find two numbers that multiply to c and add to b.</p>
    <div class="review-formula">x² + bx + c = (x + p)(x + q) where p · q = c and p + q = b</div>
    <h4>Trinomial Factoring (ax² + bx + c, a ≠ 1)</h4>
    <p>Find two numbers that multiply to ac and add to b, then factor by grouping.</p>
</div>

<div class="review-topic">
    <h3>Solving Quadratic Equations</h3>
    <h4>Quadratic Formula</h4>
    <div class="review-formula">x = (−b ± √(b² − 4ac)) / 2a</div>
    <h4>Discriminant: b² − 4ac</h4>
    <ul>
        <li>Positive → 2 real solutions</li>
        <li>Zero → 1 real solution</li>
        <li>Negative → no real solutions</li>
    </ul>
    <h4>Factoring Method</h4>
    <p>Set equation = 0, factor, set each factor = 0.</p>
    <h4>Square Root Method</h4>
    <div class="review-formula">x² = k → x = ±√k</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Expand: (3x + 4)(2x − 5)</div>
        <div class="example-solution">= 6x² − 15x + 8x − 20<br>= <strong>6x² − 7x − 20</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Factor: x² + 5x − 14</div>
        <div class="example-solution">Find two numbers that multiply to −14 and add to 5: 7 and −2<br>= <strong>(x + 7)(x − 2)</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Solve using the quadratic formula: 2x² − 3x − 5 = 0</div>
        <div class="example-solution">a = 2, b = −3, c = −5<br>x = (3 ± √(9 + 40)) / 4 = (3 ± √49) / 4 = (3 ± 7) / 4<br>x = 10/4 = 5/2 or x = −4/4 = −1<br>x = <strong>5/2 or −1</strong></div>
    </div>
</div>`
    },

    3: {
        title: "Rational Expressions & Proportions",
        content: `
<div class="review-topic">
    <h3>Rational Expressions</h3>
    <div class="review-def">A <strong>rational expression</strong> is a fraction where the numerator and/or denominator are polynomials.</div>
    <h4>Domain Restrictions</h4>
    <p>The denominator cannot equal zero. Set the denominator = 0 and solve to find excluded values.</p>
    <h4>Simplifying</h4>
    <p>Factor numerator and denominator completely, then cancel common factors.</p>
    <div class="review-formula">Example: (x² − 9)/(x + 3) = (x+3)(x−3)/(x+3) = x − 3</div>
</div>

<div class="review-topic">
    <h3>Operations with Rational Expressions</h3>
    <h4>Multiplying</h4>
    <div class="review-formula">(a/b) · (c/d) = ac / bd &nbsp;&nbsp; (cancel common factors first)</div>
    <h4>Dividing</h4>
    <div class="review-formula">(a/b) ÷ (c/d) = (a/b) · (d/c)</div>
    <h4>Adding/Subtracting</h4>
    <p>Find a common denominator, combine numerators.</p>
    <div class="review-formula">a/b ± c/d = (ad ± bc) / bd</div>
</div>

<div class="review-topic">
    <h3>Proportions</h3>
    <div class="review-def">A <strong>proportion</strong> states that two ratios are equal: a/b = c/d</div>
    <h4>Cross Multiplication</h4>
    <div class="review-formula">If a/b = c/d, then ad = bc</div>
    <h4>Direct Variation</h4>
    <div class="review-formula">y = kx &nbsp;&nbsp; (k is the constant of variation)</div>
    <h4>Inverse Variation</h4>
    <div class="review-formula">y = k/x &nbsp;&nbsp; or &nbsp;&nbsp; xy = k</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Simplify: (x² − 4) / (x² + 4x + 4)</div>
        <div class="example-solution">Factor: (x + 2)(x − 2) / (x + 2)²<br>Cancel (x + 2):<br>= <strong>(x − 2) / (x + 2)</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Solve the proportion: 5/8 = x/24</div>
        <div class="example-solution">Cross multiply: 5 × 24 = 8x<br>120 = 8x<br>x = <strong>15</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">If y varies directly with x and y = 12 when x = 4, find y when x = 7.</div>
        <div class="example-solution">k = y/x = 12/4 = 3<br>y = 3x → y = 3(7) = <strong>21</strong></div>
    </div>
</div>`
    },

    4: {
        title: "Exponents, Roots & Scientific Notation",
        content: `
<div class="review-topic">
    <h3>Exponent Rules</h3>
    <div class="review-formula">Product Rule: aᵐ · aⁿ = aᵐ⁺ⁿ</div>
    <div class="review-formula">Quotient Rule: aᵐ / aⁿ = aᵐ⁻ⁿ</div>
    <div class="review-formula">Power Rule: (aᵐ)ⁿ = aᵐⁿ</div>
    <div class="review-formula">Power of a Product: (ab)ⁿ = aⁿbⁿ</div>
    <div class="review-formula">Power of a Quotient: (a/b)ⁿ = aⁿ/bⁿ</div>
    <div class="review-formula">Zero Exponent: a⁰ = 1 (a ≠ 0)</div>
    <div class="review-formula">Negative Exponent: a⁻ⁿ = 1/aⁿ</div>
</div>

<div class="review-topic">
    <h3>Square Roots & Radicals</h3>
    <div class="review-formula">√(ab) = √a · √b</div>
    <div class="review-formula">√(a/b) = √a / √b</div>
    <div class="review-formula">√(a²) = |a|</div>
    <h4>Simplifying Radicals</h4>
    <p>Find the largest perfect square factor.</p>
    <div class="review-formula">√50 = √(25 · 2) = 5√2</div>
    <div class="review-formula">√72 = √(36 · 2) = 6√2</div>
    <h4>Perfect Squares to Know</h4>
    <p>1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225</p>
    <h4>Rationalizing the Denominator</h4>
    <div class="review-formula">a/√b = (a√b)/b</div>
</div>

<div class="review-topic">
    <h3>Scientific Notation</h3>
    <div class="review-formula">a × 10ⁿ where 1 ≤ a < 10</div>
    <ul>
        <li>Large numbers → positive exponent: 5,400,000 = 5.4 × 10⁶</li>
        <li>Small numbers → negative exponent: 0.0032 = 3.2 × 10⁻³</li>
    </ul>
    <h4>Operations</h4>
    <div class="review-formula">Multiply: (a × 10ᵐ)(b × 10ⁿ) = ab × 10ᵐ⁺ⁿ</div>
    <div class="review-formula">Divide: (a × 10ᵐ)/(b × 10ⁿ) = (a/b) × 10ᵐ⁻ⁿ</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Simplify: (2x³)⁴ · x⁻²</div>
        <div class="example-solution">(2x³)⁴ = 2⁴ · x¹² = 16x¹²<br>16x¹² · x⁻² = 16x¹⁰<br>= <strong>16x¹⁰</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Simplify: √128</div>
        <div class="example-solution">√128 = √(64 · 2) = 8√2<br>= <strong>8√2</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Multiply: (3.2 × 10⁴)(2.0 × 10³)</div>
        <div class="example-solution">3.2 × 2.0 = 6.4<br>10⁴ × 10³ = 10⁷<br>= <strong>6.4 × 10⁷</strong></div>
    </div>
</div>`
    },

    5: {
        title: "Functions & Representations",
        content: `
<div class="review-topic">
    <h3>Function Basics</h3>
    <div class="review-def">A <strong>function</strong> is a relation where each input has exactly one output.</div>
    <div class="review-def"><strong>Vertical Line Test:</strong> A graph is a function if no vertical line crosses it more than once.</div>
    <h4>Function Notation</h4>
    <div class="review-formula">f(x) means "the output of function f when the input is x"</div>
    <div class="review-formula">f(3) means "substitute 3 for every x"</div>
</div>

<div class="review-topic">
    <h3>Domain & Range</h3>
    <div class="review-def"><strong>Domain:</strong> the set of all valid inputs (x-values)</div>
    <div class="review-def"><strong>Range:</strong> the set of all possible outputs (y-values)</div>
    <h4>Common Restrictions on Domain</h4>
    <ul>
        <li>Denominators ≠ 0</li>
        <li>Values under even radicals ≥ 0</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Function Operations</h3>
    <div class="review-formula">(f + g)(x) = f(x) + g(x)</div>
    <div class="review-formula">(f − g)(x) = f(x) − g(x)</div>
    <div class="review-formula">(f · g)(x) = f(x) · g(x)</div>
    <div class="review-formula">(f/g)(x) = f(x) / g(x), g(x) ≠ 0</div>
    <h4>Composition</h4>
    <div class="review-formula">(f ∘ g)(x) = f(g(x)) — plug g(x) into f</div>
</div>

<div class="review-topic">
    <h3>Inverse Functions</h3>
    <div class="review-def">f⁻¹(x) "undoes" what f(x) does. If f(a) = b, then f⁻¹(b) = a.</div>
    <h4>Finding an Inverse</h4>
    <ul>
        <li>Replace f(x) with y</li>
        <li>Swap x and y</li>
        <li>Solve for y</li>
    </ul>
    <div class="review-def"><strong>Horizontal Line Test:</strong> A function has an inverse function if no horizontal line crosses its graph more than once.</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">If f(x) = 3x² − 2x + 1, find f(−2).</div>
        <div class="example-solution">f(−2) = 3(−2)² − 2(−2) + 1<br>= 3(4) + 4 + 1<br>= 12 + 4 + 1 = <strong>17</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">If f(x) = 2x + 3 and g(x) = x², find (f ∘ g)(4).</div>
        <div class="example-solution">g(4) = 4² = 16<br>f(g(4)) = f(16) = 2(16) + 3 = 35<br>(f ∘ g)(4) = <strong>35</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Find the inverse of f(x) = (x − 5)/3.</div>
        <div class="example-solution">y = (x − 5)/3<br>Swap x and y: x = (y − 5)/3<br>3x = y − 5<br>y = 3x + 5<br>f⁻¹(x) = <strong>3x + 5</strong></div>
    </div>
</div>`
    },

    6: {
        title: "Data, Probability & Statistics",
        content: `
<div class="review-topic">
    <h3>Measures of Central Tendency</h3>
    <div class="review-formula">Mean = sum of all values / number of values</div>
    <div class="review-def"><strong>Median:</strong> the middle value when data is ordered. If even count, average the two middle values.</div>
    <div class="review-def"><strong>Mode:</strong> the value that appears most often.</div>
</div>

<div class="review-topic">
    <h3>Probability</h3>
    <div class="review-formula">P(event) = favorable outcomes / total outcomes</div>
    <div class="review-formula">0 ≤ P(event) ≤ 1</div>
    <div class="review-formula">P(not A) = 1 − P(A)</div>
    <h4>Compound Events</h4>
    <div class="review-formula">Independent events: P(A and B) = P(A) · P(B)</div>
    <div class="review-formula">Mutually exclusive: P(A or B) = P(A) + P(B)</div>
    <div class="review-formula">General: P(A or B) = P(A) + P(B) − P(A and B)</div>
</div>

<div class="review-topic">
    <h3>Counting Principles</h3>
    <div class="review-formula">Permutations (order matters): P(n, r) = n! / (n − r)!</div>
    <div class="review-formula">Combinations (order doesn't matter): C(n, r) = n! / (r!(n − r)!)</div>
    <div class="review-formula">Fundamental counting principle: if there are m ways to do one thing and n ways to do another, there are m · n ways to do both.</div>
</div>

<div class="review-topic">
    <h3>Data Interpretation</h3>
    <div class="review-def"><strong>Range:</strong> maximum − minimum</div>
    <div class="review-def"><strong>Quartiles:</strong> Q1 (25th percentile), Q2 (median), Q3 (75th percentile)</div>
    <div class="review-def"><strong>IQR:</strong> Q3 − Q1 (interquartile range)</div>
    <div class="review-def"><strong>Outlier:</strong> a data point more than 1.5 × IQR below Q1 or above Q3</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Find the mean, median, and mode of: 4, 7, 2, 7, 9, 3, 7</div>
        <div class="example-solution">Mean = (4+7+2+7+9+3+7)/7 = 39/7 ≈ <strong>5.57</strong><br>Ordered: 2, 3, 4, 7, 7, 7, 9 → Median = <strong>7</strong><br>Mode = <strong>7</strong> (appears 3 times)</div>
    </div>
    <div class="review-example">
        <div class="example-problem">A bag has 5 red, 3 blue, and 2 green marbles. What is the probability of drawing red then blue (without replacement)?</div>
        <div class="example-solution">P(red first) = 5/10 = 1/2<br>P(blue second) = 3/9 = 1/3<br>P(red then blue) = (1/2)(1/3) = <strong>1/6</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">How many ways can you choose 3 students from a group of 8?</div>
        <div class="example-solution">C(8,3) = 8! / (3! · 5!)<br>= (8 × 7 × 6) / (3 × 2 × 1)<br>= 336 / 6 = <strong>56</strong></div>
    </div>
</div>`
    },

    // ==================== GEOMETRY TOPICS ====================
    7: {
        title: "Angles & Lines",
        content: `
<div class="review-topic">
    <h3>Angle Types</h3>
    <div class="review-def"><strong>Acute:</strong> less than 90° &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Right:</strong> exactly 90° &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Obtuse:</strong> between 90° and 180°</div>
    <div class="review-def"><strong>Straight angle:</strong> exactly 180° &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Reflex:</strong> between 180° and 360°</div>
</div>

<div class="review-topic">
    <h3>Angle Pairs</h3>
    <div class="review-def"><strong>Complementary angles:</strong> two angles that add to 90°</div>
    <div class="review-def"><strong>Supplementary angles:</strong> two angles that add to 180°</div>
    <div class="review-def"><strong>Vertical angles:</strong> formed by two intersecting lines, opposite each other. Always congruent.</div>
    <div class="review-def"><strong>Linear pair:</strong> two adjacent angles that form a straight line (supplementary).</div>
    <div class="review-diagram"><canvas id="reviewCanvas-7a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Parallel Lines Cut by a Transversal</h3>
    <p>When a transversal crosses two parallel lines, it creates 8 angles:</p>
    <div class="review-diagram"><canvas id="reviewCanvas-7b"></canvas></div>
    <h4>Congruent Angle Pairs (equal to each other)</h4>
    <ul>
        <li><strong>Corresponding angles</strong> (same position at each intersection): ∠1=∠5, ∠2=∠6, ∠3=∠7, ∠4=∠8</li>
        <li><strong>Alternate interior angles</strong> (opposite sides, between the lines): ∠3=∠6, ∠4=∠5</li>
        <li><strong>Alternate exterior angles</strong> (opposite sides, outside the lines): ∠1=∠8, ∠2=∠7</li>
    </ul>
    <h4>Supplementary Angle Pairs (add to 180°)</h4>
    <ul>
        <li><strong>Co-interior / same-side interior angles</strong> (same side, between the lines): ∠3+∠5=180°, ∠4+∠6=180°</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Two angles are complementary. One angle is 3 times the other. Find both angles.</div>
        <div class="example-solution">Let the smaller angle = x, then the larger = 3x<br>x + 3x = 90°<br>4x = 90° → x = 22.5°<br>Angles: <strong>22.5° and 67.5°</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Two parallel lines are cut by a transversal. ∠2 = 65°. Find ∠3, ∠5, and ∠6.</div>
        <div class="example-solution">∠3 is supplementary to ∠2 (linear pair): ∠3 = 180° − 65° = <strong>115°</strong><br>∠6 is corresponding to ∠2: ∠6 = <strong>65°</strong><br>∠5 is supplementary to ∠6: ∠5 = 180° − 65° = <strong>115°</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Vertical angles: one measures (4x + 10)°, the other (6x − 20)°. Find x.</div>
        <div class="example-solution">Vertical angles are congruent:<br>4x + 10 = 6x − 20<br>30 = 2x → x = <strong>15</strong><br>Each angle = 4(15) + 10 = <strong>70°</strong></div>
    </div>
</div>`
    },

    8: {
        title: "Triangles & Congruence",
        content: `
<div class="review-topic">
    <h3>Triangle Angle Sum</h3>
    <div class="review-formula">The three interior angles of a triangle always add to 180°.</div>
    <h4>Exterior Angle Theorem</h4>
    <div class="review-formula">An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.</div>
    <div class="review-diagram"><canvas id="reviewCanvas-8b"></canvas></div>
</div>

<div class="review-topic">
    <h3>Triangle Types</h3>
    <h4>By Sides</h4>
    <div class="review-def"><strong>Equilateral:</strong> all 3 sides equal (all angles = 60°)</div>
    <div class="review-def"><strong>Isosceles:</strong> at least 2 sides equal (base angles are congruent)</div>
    <div class="review-def"><strong>Scalene:</strong> no sides equal</div>
    <h4>By Angles</h4>
    <div class="review-def"><strong>Acute:</strong> all angles < 90° &nbsp;|&nbsp; <strong>Right:</strong> one angle = 90° &nbsp;|&nbsp; <strong>Obtuse:</strong> one angle > 90°</div>
    <div class="review-diagram"><canvas id="reviewCanvas-8a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Triangle Congruence Postulates</h3>
    <div class="review-def"><strong>SSS</strong> — three pairs of congruent sides</div>
    <div class="review-def"><strong>SAS</strong> — two sides and the included angle</div>
    <div class="review-def"><strong>ASA</strong> — two angles and the included side</div>
    <div class="review-def"><strong>AAS</strong> — two angles and a non-included side</div>
    <div class="review-def"><strong>HL</strong> — hypotenuse and a leg (right triangles only)</div>
    <h4>NOT Valid</h4>
    <ul>
        <li><strong>SSA (or ASS)</strong> — does not prove congruence (ambiguous case)</li>
        <li><strong>AAA</strong> — proves similarity, not congruence</li>
    </ul>
</div>

<div class="review-topic">
    <h3>CPCTC</h3>
    <div class="review-def"><strong>Corresponding Parts of Congruent Triangles are Congruent.</strong> Once you prove two triangles congruent, all their corresponding parts are congruent.</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">A triangle has angles measuring 48° and 67°. Find the third angle.</div>
        <div class="example-solution">Sum of angles = 180°<br>Third angle = 180° − 48° − 67° = <strong>65°</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">An exterior angle of a triangle is 130°. One of the non-adjacent interior angles is 55°. Find the other non-adjacent interior angle.</div>
        <div class="example-solution">Exterior angle = sum of two non-adjacent interior angles<br>130° = 55° + x<br>x = <strong>75°</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Which congruence postulate proves △ABC ≅ △DEF if AB = DE, ∠B = ∠E, and BC = EF?</div>
        <div class="example-solution">Two sides and the included angle are congruent.<br>This is <strong>SAS</strong> (Side-Angle-Side).</div>
    </div>
</div>`
    },

    9: {
        title: "Pythagorean Theorem & Trigonometry",
        content: `
<div class="review-topic">
    <h3>Pythagorean Theorem</h3>
    <div class="review-formula">a² + b² = c²</div>
    <p>Where c is the hypotenuse (longest side, opposite the right angle) and a, b are the legs.</p>
    <div class="review-diagram"><canvas id="reviewCanvas-9a"></canvas></div>
    <h4>Common Pythagorean Triples</h4>
    <p>3-4-5 &nbsp;|&nbsp; 5-12-13 &nbsp;|&nbsp; 8-15-17 &nbsp;|&nbsp; 7-24-25</p>
    <p>And their multiples: 6-8-10, 9-12-15, 10-24-26, etc.</p>
    <h4>Converse</h4>
    <ul>
        <li>If a² + b² = c² → right triangle</li>
        <li>If a² + b² > c² → acute triangle</li>
        <li>If a² + b² < c² → obtuse triangle</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Right Triangle Trigonometry (SOH-CAH-TOA)</h3>
    <div class="review-formula">sin θ = Opposite / Hypotenuse</div>
    <div class="review-formula">cos θ = Adjacent / Hypotenuse</div>
    <div class="review-formula">tan θ = Opposite / Adjacent</div>
    <div class="review-diagram"><canvas id="reviewCanvas-9b"></canvas></div>
    <h4>Inverse Trig Functions</h4>
    <p>Used to find an angle when you know the sides:</p>
    <div class="review-formula">θ = sin⁻¹(opp/hyp) &nbsp;|&nbsp; θ = cos⁻¹(adj/hyp) &nbsp;|&nbsp; θ = tan⁻¹(opp/adj)</div>
</div>

<div class="review-topic">
    <h3>Special Right Triangles</h3>
    <h4>45-45-90 Triangle</h4>
    <div class="review-formula">Legs: x, x &nbsp;&nbsp; Hypotenuse: x√2</div>
    <h4>30-60-90 Triangle</h4>
    <div class="review-formula">Short leg: x &nbsp;&nbsp; Long leg: x√3 &nbsp;&nbsp; Hypotenuse: 2x</div>
    <div class="review-diagram"><canvas id="reviewCanvas-9c"></canvas></div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">A right triangle has legs of 6 and 8. Find the hypotenuse.</div>
        <div class="example-solution">c² = 6² + 8² = 36 + 64 = 100<br>c = √100 = <strong>10</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">In a right triangle, the hypotenuse is 13 and one leg is 5. Find the other leg.</div>
        <div class="example-solution">a² + 5² = 13²<br>a² + 25 = 169<br>a² = 144 → a = <strong>12</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">A 30-60-90 triangle has a short leg of 7. Find the long leg and hypotenuse.</div>
        <div class="example-solution">Short leg = x = 7<br>Long leg = x√3 = <strong>7√3 ≈ 12.12</strong><br>Hypotenuse = 2x = <strong>14</strong></div>
    </div>
</div>`
    },

    10: {
        title: "Similar Triangles",
        content: `
<div class="review-topic">
    <h3>Similarity</h3>
    <div class="review-def">Two figures are <strong>similar</strong> if they have the same shape but not necessarily the same size. Corresponding angles are congruent and corresponding sides are proportional.</div>
    <h4>Similarity Postulates</h4>
    <div class="review-def"><strong>AA</strong> — two pairs of congruent angles (most common)</div>
    <div class="review-def"><strong>SSS~</strong> — all three pairs of sides are proportional</div>
    <div class="review-def"><strong>SAS~</strong> — two pairs of proportional sides with congruent included angle</div>
</div>

<div class="review-topic">
    <h3>Scale Factor & Proportions</h3>
    <div class="review-formula">Scale factor = side of one triangle / corresponding side of the other</div>
    <div class="review-formula">If scale factor = k, then:
  Ratio of perimeters = k
  Ratio of areas = k²</div>
    <h4>Setting Up Proportions</h4>
    <p>Match corresponding sides and cross multiply:</p>
    <div class="review-formula">AB/DE = BC/EF = AC/DF</div>
    <div class="review-diagram"><canvas id="reviewCanvas-10a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Triangle Proportionality Theorem</h3>
    <div class="review-def">If a line is parallel to one side of a triangle and intersects the other two sides, it divides them proportionally.</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">△ABC ~ △DEF with AB = 6, DE = 9, and BC = 10. Find EF.</div>
        <div class="example-solution">Scale factor: DE/AB = 9/6 = 3/2<br>EF/BC = 3/2 → EF/10 = 3/2<br>EF = 10 × 3/2 = <strong>15</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Two similar triangles have a scale factor of 2:5. If the area of the smaller is 20 cm², find the area of the larger.</div>
        <div class="example-solution">Ratio of areas = k² = (2/5)² = 4/25<br>20/A = 4/25<br>A = 20 × 25/4 = <strong>125 cm²</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">A 6-foot person casts a 4-foot shadow. A tree casts a 20-foot shadow. How tall is the tree?</div>
        <div class="example-solution">Similar triangles: height/shadow = height/shadow<br>6/4 = h/20<br>h = 6 × 20/4 = <strong>30 feet</strong></div>
    </div>
</div>`
    },

    11: {
        title: "Quadrilaterals & Polygons",
        content: `
<div class="review-topic">
    <h3>Polygon Angle Formulas</h3>
    <div class="review-formula">Sum of interior angles = (n − 2) × 180°</div>
    <div class="review-formula">Each interior angle (regular polygon) = (n − 2) × 180° / n</div>
    <div class="review-formula">Sum of exterior angles = 360° (always)</div>
    <div class="review-formula">Each exterior angle (regular polygon) = 360° / n</div>
    <p>where n = number of sides</p>
</div>

<div class="review-topic">
    <h3>Quadrilateral Hierarchy</h3>
    <div class="review-def"><strong>Parallelogram:</strong> both pairs of opposite sides are parallel and congruent. Opposite angles are congruent. Diagonals bisect each other.<br><em style="color:#94a3b8;">Example: a leaning bookshelf shape — opposite sides equal and parallel, but angles aren't 90°.</em></div>
    <div class="review-def"><strong>Rectangle:</strong> a parallelogram with four right angles. Diagonals are congruent.<br><em style="color:#94a3b8;">Example: a door, a phone screen, a sheet of paper.</em></div>
    <div class="review-def"><strong>Rhombus:</strong> a parallelogram with four congruent sides. Diagonals are perpendicular and bisect the angles.<br><em style="color:#94a3b8;">Example: a diamond shape on a playing card — all sides equal, but not all angles 90°.</em></div>
    <div class="review-def"><strong>Square:</strong> both a rectangle and a rhombus. Four congruent sides and four right angles.<br><em style="color:#94a3b8;">Example: a checkerboard tile, a sticky note — all sides equal AND all angles 90°.</em></div>
    <div class="review-def"><strong>Trapezoid:</strong> exactly one pair of parallel sides (the bases). Legs are the non-parallel sides.<br><em style="color:#94a3b8;">Example: a bucket seen from the side — the top and bottom are parallel but different lengths, the sides angle inward.</em></div>
    <div class="review-def"><strong>Isosceles Trapezoid:</strong> a trapezoid with congruent legs. Base angles are congruent. Diagonals are congruent.<br><em style="color:#94a3b8;">Example: a symmetric lampshade shape — the two non-parallel sides are the same length.</em></div>
    <div class="review-def"><strong>Kite:</strong> two pairs of consecutive congruent sides. One pair of opposite angles are congruent. Diagonals are perpendicular.<br><em style="color:#94a3b8;">Example: an actual flying kite — two short sides next to each other, two long sides next to each other.</em></div>
    <div class="review-diagram"><canvas id="reviewCanvas-11a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Proving a Quadrilateral is a Parallelogram</h3>
    <p>Any one of these is sufficient:</p>
    <ul>
        <li>Both pairs of opposite sides are parallel</li>
        <li>Both pairs of opposite sides are congruent</li>
        <li>Both pairs of opposite angles are congruent</li>
        <li>One pair of opposite sides is both parallel and congruent</li>
        <li>Diagonals bisect each other</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Find the sum of interior angles of a regular octagon (8 sides).</div>
        <div class="example-solution">Sum = (n − 2) × 180° = (8 − 2) × 180° = 6 × 180° = <strong>1080°</strong><br>Each angle = 1080° / 8 = <strong>135°</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">A parallelogram has consecutive angles of (3x + 10)° and (5x − 30)°. Find x.</div>
        <div class="example-solution">Consecutive angles in a parallelogram are supplementary:<br>3x + 10 + 5x − 30 = 180<br>8x − 20 = 180<br>8x = 200 → x = <strong>25</strong><br>Angles: 85° and 95°</div>
    </div>
    <div class="review-example">
        <div class="example-problem">How many sides does a regular polygon have if each exterior angle is 40°?</div>
        <div class="example-solution">Each exterior angle = 360°/n<br>40 = 360/n<br>n = 360/40 = <strong>9 sides</strong></div>
    </div>
</div>`
    },

    12: {
        title: "Circles",
        content: `
<div class="review-topic">
    <h3>Basic Circle Formulas</h3>
    <div class="review-formula">Circumference: C = 2πr = πd</div>
    <div class="review-formula">Area: A = πr²</div>
    <div class="review-def"><strong>Radius (r):</strong> distance from center to edge &nbsp;|&nbsp; <strong>Diameter (d):</strong> d = 2r</div>
</div>

<div class="review-topic">
    <h3>Circle Vocabulary</h3>
    <div class="review-def"><strong>Chord:</strong> a segment with both endpoints on the circle</div>
    <div class="review-def"><strong>Secant:</strong> a line that intersects a circle at two points</div>
    <div class="review-def"><strong>Tangent:</strong> a line that touches the circle at exactly one point. A tangent is perpendicular to the radius at the point of tangency.</div>
    <div class="review-def"><strong>Arc:</strong> a portion of the circle's circumference</div>
    <div class="review-def"><strong>Sector:</strong> a "pie slice" region bounded by two radii and an arc</div>
    <div class="review-diagram"><canvas id="reviewCanvas-12a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Arc Length & Sector Area</h3>
    <div class="review-formula">Arc length = (θ/360) × 2πr</div>
    <div class="review-formula">Sector area = (θ/360) × πr²</div>
    <p>where θ is the central angle in degrees</p>
</div>

<div class="review-topic">
    <h3>Circle Angle Relationships</h3>
    <div class="review-formula">Central angle = intercepted arc</div>
    <div class="review-formula">Inscribed angle = ½ × intercepted arc</div>
    <div class="review-def">An inscribed angle in a semicircle is always 90°.</div>
    <div class="review-diagram"><canvas id="reviewCanvas-12b"></canvas></div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">A circle has a radius of 10 cm. Find its circumference and area.</div>
        <div class="example-solution">C = 2π(10) = 20π ≈ <strong>62.83 cm</strong><br>A = π(10)² = 100π ≈ <strong>314.16 cm²</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Find the arc length of a 72° arc on a circle with radius 5.</div>
        <div class="example-solution">Arc length = (72/360) × 2π(5)<br>= (1/5) × 10π<br>= 2π ≈ <strong>6.28 units</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">A central angle is 80°. What is the inscribed angle that intercepts the same arc?</div>
        <div class="example-solution">Inscribed angle = ½ × intercepted arc<br>The central angle equals the intercepted arc = 80°<br>Inscribed angle = ½ × 80° = <strong>40°</strong></div>
    </div>
</div>`
    },

    13: {
        title: "Area, Perimeter & Volume",
        content: `
<div class="review-topic">
    <h3>2D Area Formulas</h3>
    <div class="review-formula">Rectangle: A = lw</div>
    <div class="review-formula">Triangle: A = ½bh</div>
    <div class="review-formula">Parallelogram: A = bh</div>
    <div class="review-formula">Trapezoid: A = ½(b₁ + b₂)h</div>
    <div class="review-formula">Rhombus/Kite: A = ½d₁d₂ (d₁, d₂ are the diagonals)</div>
    <div class="review-formula">Circle: A = πr²</div>
    <div class="review-formula">Regular polygon: A = ½ × apothem × perimeter</div>
    <div class="review-diagram"><canvas id="reviewCanvas-13a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Perimeter Formulas</h3>
    <div class="review-formula">Rectangle: P = 2l + 2w</div>
    <div class="review-formula">Square: P = 4s</div>
    <div class="review-formula">Triangle: P = a + b + c</div>
    <div class="review-formula">Circle (Circumference): C = 2πr = πd</div>
</div>

<div class="review-topic">
    <h3>3D Volume Formulas</h3>
    <div class="review-formula">Rectangular Prism: V = lwh</div>
    <div class="review-formula">Cube: V = s³</div>
    <div class="review-formula">Cylinder: V = πr²h</div>
    <div class="review-formula">Cone: V = ⅓πr²h</div>
    <div class="review-formula">Pyramid: V = ⅓Bh (B = area of base)</div>
    <div class="review-formula">Sphere: V = ⁴⁄₃πr³</div>
    <div class="review-diagram"><canvas id="reviewCanvas-13b"></canvas></div>
</div>

<div class="review-topic">
    <h3>Surface Area Formulas</h3>
    <div class="review-formula">Rectangular Prism: SA = 2lw + 2lh + 2wh</div>
    <div class="review-formula">Cube: SA = 6s²</div>
    <div class="review-formula">Cylinder: SA = 2πr² + 2πrh</div>
    <div class="review-formula">Cone: SA = πr² + πrl (l = slant height)</div>
    <div class="review-formula">Sphere: SA = 4πr²</div>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">A trapezoid has bases of 12 and 8, and a height of 5. Find its area.</div>
        <div class="example-solution">A = ½(b₁ + b₂)h = ½(12 + 8)(5)<br>= ½(20)(5) = <strong>50 square units</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Find the volume of a cylinder with radius 4 and height 10.</div>
        <div class="example-solution">V = πr²h = π(4)²(10)<br>= π(16)(10) = 160π ≈ <strong>502.65 cubic units</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">A cone has radius 3 and height 7. Find its volume.</div>
        <div class="example-solution">V = ⅓πr²h = ⅓π(3)²(7)<br>= ⅓π(9)(7) = 21π ≈ <strong>65.97 cubic units</strong></div>
    </div>
</div>`
    },

    14: {
        title: "Coordinate Geometry",
        content: `
<div class="review-topic">
    <h3>Core Formulas</h3>
    <h4>Distance Formula</h4>
    <div class="review-formula">d = √((x₂ − x₁)² + (y₂ − y₁)²)</div>
    <h4>Midpoint Formula</h4>
    <div class="review-formula">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</div>
    <h4>Slope Formula</h4>
    <div class="review-formula">m = (y₂ − y₁) / (x₂ − x₁)</div>
    <div class="review-diagram"><canvas id="reviewCanvas-14a"></canvas></div>
</div>

<div class="review-topic">
    <h3>Equations of Lines</h3>
    <div class="review-formula">Slope-intercept: y = mx + b</div>
    <div class="review-formula">Point-slope: y − y₁ = m(x − x₁)</div>
    <div class="review-formula">Standard: Ax + By = C</div>
    <h4>Special Lines</h4>
    <ul>
        <li>Horizontal line through (a, b): y = b (slope = 0)</li>
        <li>Vertical line through (a, b): x = a (slope undefined)</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Parallel & Perpendicular Lines</h3>
    <div class="review-formula">Parallel lines have equal slopes: m₁ = m₂</div>
    <div class="review-formula">Perpendicular lines have negative reciprocal slopes: m₁ · m₂ = −1</div>
    <div class="review-diagram"><canvas id="reviewCanvas-14b"></canvas></div>
</div>

<div class="review-topic">
    <h3>Coordinate Geometry in Proofs</h3>
    <p>Common strategies:</p>
    <ul>
        <li>Use distance formula to show sides are congruent</li>
        <li>Use slope to show lines are parallel or perpendicular</li>
        <li>Use midpoint to show diagonals bisect each other</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Find the distance between (1, 3) and (7, 11).</div>
        <div class="example-solution">d = √((7−1)² + (11−3)²)<br>= √(36 + 64) = √100 = <strong>10</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Find the midpoint of (−4, 6) and (8, −2).</div>
        <div class="example-solution">M = ((−4+8)/2, (6+(−2))/2)<br>= (4/2, 4/2) = <strong>(2, 2)</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Line 1 has slope 3/4. What is the slope of a line perpendicular to it?</div>
        <div class="example-solution">Perpendicular slopes are negative reciprocals:<br>m₂ = −1/m₁ = −1/(3/4) = <strong>−4/3</strong></div>
    </div>
</div>`
    },

    15: {
        title: "Transformations",
        content: `
<div class="review-topic">
    <h3>Types of Transformations</h3>
    <div class="review-def"><strong>Translation (slide):</strong> moves every point the same distance in the same direction.</div>
    <div class="review-formula">(x, y) → (x + a, y + b)</div>
    <div class="review-def"><strong>Reflection (flip):</strong> mirrors a figure over a line of reflection.</div>
    <div class="review-formula">Over x-axis: (x, y) → (x, −y)</div>
    <div class="review-formula">Over y-axis: (x, y) → (−x, y)</div>
    <div class="review-formula">Over y = x: (x, y) → (y, x)</div>
    <div class="review-formula">Over y = −x: (x, y) → (−y, −x)</div>
</div>

<div class="review-topic">
    <h3>Rotations About the Origin</h3>
    <div class="review-formula">90° counterclockwise: (x, y) → (−y, x)</div>
    <div class="review-formula">180°: (x, y) → (−x, −y)</div>
    <div class="review-formula">270° counterclockwise (or 90° clockwise): (x, y) → (y, −x)</div>
</div>

<div class="review-topic">
    <h3>Dilation</h3>
    <div class="review-def"><strong>Dilation:</strong> enlarges or reduces a figure by a scale factor k from a center point.</div>
    <div class="review-formula">Center at origin: (x, y) → (kx, ky)</div>
    <ul>
        <li>k > 1: enlargement</li>
        <li>0 < k < 1: reduction</li>
        <li>k = 1: no change</li>
    </ul>
</div>

<div class="review-topic">
    <h3>Rigid vs. Non-Rigid</h3>
    <div class="review-def"><strong>Rigid transformations</strong> (isometries) preserve size and shape: translations, reflections, rotations.</div>
    <div class="review-def"><strong>Non-rigid transformations</strong> change size but preserve shape: dilations.</div>
    <div class="review-def">A <strong>congruence transformation</strong> maps a figure to a congruent figure (rigid). A <strong>similarity transformation</strong> maps a figure to a similar figure (rigid + dilation).</div>
</div>

<div class="review-diagram"><canvas id="reviewCanvas-15a"></canvas></div>

<div class="review-topic">
    <h3>Worked Examples</h3>
    <div class="review-example">
        <div class="example-problem">Translate the point (3, −2) by the vector ⟨−5, 4⟩.</div>
        <div class="example-solution">(x + a, y + b) = (3 + (−5), −2 + 4) = <strong>(−2, 2)</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Reflect the point (4, −7) over the y-axis.</div>
        <div class="example-solution">(x, y) → (−x, y)<br>(4, −7) → <strong>(−4, −7)</strong></div>
    </div>
    <div class="review-example">
        <div class="example-problem">Rotate the point (2, 5) by 90° counterclockwise about the origin.</div>
        <div class="example-solution">(x, y) → (−y, x)<br>(2, 5) → <strong>(−5, 2)</strong></div>
    </div>
</div>`
    }
};

// ===== Canvas Drawing Helpers =====

function setupReviewCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
}

// ===== Topic 7: Angles & Lines =====

function drawReviewDiagram7a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const cy = h * 0.55;

    // === Complementary angles (left side) ===
    const cx1 = w * 0.25;
    const r = Math.min(w * 0.18, h * 0.35);

    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Complementary (90°)', cx1, 20);

    // Horizontal arm (going left from vertex)
    ctx.beginPath();
    ctx.moveTo(cx1, cy);
    ctx.lineTo(cx1 + r, cy);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Vertical arm (going up)
    ctx.beginPath();
    ctx.moveTo(cx1, cy);
    ctx.lineTo(cx1, cy - r);
    ctx.stroke();

    // Dividing ray at 55° from horizontal
    const compDeg = 55;
    const compRad = compDeg * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx1, cy);
    ctx.lineTo(cx1 + Math.cos(compRad) * r * 0.85, cy - Math.sin(compRad) * r * 0.85);
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Right angle square at corner
    const sq = 10;
    ctx.beginPath();
    ctx.moveTo(cx1 + sq, cy);
    ctx.lineTo(cx1 + sq, cy - sq);
    ctx.lineTo(cx1, cy - sq);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Arc for lower angle (0° to 55°)
    ctx.beginPath();
    ctx.arc(cx1, cy, 22, -compRad, 0);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Arc for upper angle (55° to 90°)
    ctx.beginPath();
    ctx.arc(cx1, cy, 28, -Math.PI/2, -compRad);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Labels
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('55°', cx1 + 32, cy - 6);
    ctx.fillStyle = '#10b981';
    ctx.fillText('35°', cx1 + 14, cy - 32);

    // === Supplementary angles (right side) ===
    const cx2 = w * 0.72;

    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Supplementary (180°)', cx2, 20);

    // Straight line
    ctx.beginPath();
    ctx.moveTo(cx2 - r, cy);
    ctx.lineTo(cx2 + r, cy);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Ray going up at 130° from the right arm
    const suppDeg = 50; // the smaller angle from the left
    const suppRad = suppDeg * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx2, cy);
    ctx.lineTo(cx2 - Math.cos(suppRad) * r * 0.9, cy - Math.sin(suppRad) * r * 0.9);
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arc for left angle (130°)
    ctx.beginPath();
    ctx.arc(cx2, cy, 25, -(Math.PI - suppRad), 0);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Arc for right angle (50°)
    ctx.beginPath();
    ctx.arc(cx2, cy, 30, -Math.PI, -(Math.PI - suppRad));
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Labels
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('130°', cx2 + 14, cy - 24);
    ctx.fillStyle = '#10b981';
    ctx.fillText('50°', cx2 - 38, cy - 20);
}

function drawReviewDiagram7b(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    // Parallel lines cut by a transversal
    const margin = 40;

    // Two parallel lines
    const y1 = h * 0.32, y2 = h * 0.68;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(margin, y1);
    ctx.lineTo(w - margin, y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(margin, y2);
    ctx.lineTo(w - margin, y2);
    ctx.stroke();

    // Line labels
    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.fillText('ℓ', margin - 12, y1 + 5);
    ctx.fillText('m', margin - 16, y2 + 5);

    // Parallel arrows on right
    ctx.fillText('▸▸', w - margin + 5, y1 + 5);
    ctx.fillText('▸▸', w - margin + 5, y2 + 5);

    // Transversal - line going from upper-left to lower-right
    // The transversal angle from horizontal: ~65°
    const tAngle = 65 * Math.PI / 180;
    const tLen = (y2 - y1) / Math.sin(tAngle); // length between intersections
    const xShift = (y2 - y1) / Math.tan(tAngle); // horizontal shift between intersections

    // Intersection points
    const ix1 = w * 0.42; // x of intersection with top line
    const ix2 = ix1 + xShift; // x of intersection with bottom line

    // Draw transversal extending beyond both lines
    const ext = 30;
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ix1 - ext * Math.cos(tAngle), y1 - ext * Math.sin(tAngle));
    ctx.lineTo(ix2 + ext * Math.cos(tAngle), y2 + ext * Math.sin(tAngle));
    ctx.stroke();

    // Transversal label
    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#a855f7';
    ctx.textAlign = 'left';
    ctx.fillText('t', ix1 - ext * Math.cos(tAngle) - 4, y1 - ext * Math.sin(tAngle) - 4);

    // Intersection dots
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.arc(ix1, y1, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(ix2, y2, 3, 0, Math.PI * 2); ctx.fill();

    // Label angles 1-8
    // At top intersection: angles numbered counterclockwise from upper-left
    // Standard numbering:
    // 1 = above line, left of transversal
    // 2 = above line, right of transversal
    // 3 = below line, left of transversal
    // 4 = below line, right of transversal
    // Same pattern at bottom: 5,6,7,8
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    const offset = 16;
    // Top intersection
    ctx.fillStyle = '#fbbf24'; ctx.fillText('1', ix1 - offset, y1 - 8);
    ctx.fillStyle = '#fbbf24'; ctx.fillText('2', ix1 + offset + 4, y1 - 8);
    ctx.fillStyle = '#10b981'; ctx.fillText('3', ix1 - offset - 4, y1 + 18);
    ctx.fillStyle = '#10b981'; ctx.fillText('4', ix1 + offset, y1 + 18);
    // Bottom intersection
    ctx.fillStyle = '#fbbf24'; ctx.fillText('5', ix2 - offset, y2 - 8);
    ctx.fillStyle = '#fbbf24'; ctx.fillText('6', ix2 + offset + 4, y2 - 8);
    ctx.fillStyle = '#10b981'; ctx.fillText('7', ix2 - offset - 4, y2 + 18);
    ctx.fillStyle = '#10b981'; ctx.fillText('8', ix2 + offset, y2 + 18);
}

// ===== Topic 8: Triangles =====

function drawReviewDiagram8a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const triW = w / 3;
    const topY = 45, botY = h - 35;

    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2.5;

    // Equilateral
    const eq_cx = triW * 0.5;
    const eq_side = Math.min(triW * 0.6, (botY - topY) * 0.8);
    const eq_h = eq_side * Math.sqrt(3) / 2;
    const eq_top = botY - eq_h;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Equilateral', eq_cx, 18);
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(eq_cx, eq_top);
    ctx.lineTo(eq_cx - eq_side / 2, botY);
    ctx.lineTo(eq_cx + eq_side / 2, botY);
    ctx.closePath();
    ctx.stroke();
    // Tick marks (all sides equal - single tick)
    drawTickMark(ctx, eq_cx - eq_side / 4, (eq_top + botY) / 2 - 2, -60);
    drawTickMark(ctx, eq_cx + eq_side / 4, (eq_top + botY) / 2 - 2, 60);
    drawTickMark(ctx, eq_cx, botY + 2, 0);
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('60°', eq_cx, eq_top + 22);

    // Isosceles
    const iso_cx = triW * 1.5;
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Isosceles', iso_cx, 18);
    ctx.strokeStyle = '#818cf8';
    const iso_top = topY + 5;
    const iso_base = eq_side * 0.7;
    ctx.beginPath();
    ctx.moveTo(iso_cx, iso_top);
    ctx.lineTo(iso_cx - iso_base / 2, botY);
    ctx.lineTo(iso_cx + iso_base / 2, botY);
    ctx.closePath();
    ctx.stroke();
    // Double tick on equal sides
    drawTickMark(ctx, iso_cx - iso_base / 4 - 2, (iso_top + botY) / 2, -72, 2);
    drawTickMark(ctx, iso_cx + iso_base / 4 + 2, (iso_top + botY) / 2, 72, 2);
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('2 equal sides', iso_cx, botY + 16);

    // Scalene
    const sc_cx = triW * 2.5;
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Scalene', sc_cx, 18);
    ctx.strokeStyle = '#a855f7';
    ctx.beginPath();
    ctx.moveTo(sc_cx - 15, topY + 10);
    ctx.lineTo(sc_cx - eq_side * 0.4, botY);
    ctx.lineTo(sc_cx + eq_side * 0.35, botY);
    ctx.closePath();
    ctx.stroke();
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('no equal sides', sc_cx, botY + 16);
}

function drawTickMark(ctx, x, y, angleDeg, count) {
    count = count || 1;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angleDeg * Math.PI / 180);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    const gap = 4;
    const startX = -(count - 1) * gap / 2;
    for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.moveTo(startX + i * gap, -5);
        ctx.lineTo(startX + i * gap, 5);
        ctx.stroke();
    }
    ctx.restore();
}

function drawReviewDiagram8b(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    // Exterior angle theorem
    // Triangle vertices
    const bx = w * 0.2, by = h * 0.72;
    const cx = w * 0.58, cy = h * 0.72;
    const ax = w * 0.38, ay = h * 0.18;
    const dx = w * 0.82, dy = h * 0.72; // extension point

    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Exterior Angle Theorem', w / 2, 16);

    // Triangle
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // Extension line from C
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(dx, dy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Angle arcs
    // Angle at B (interior) - angle between BA and BC
    const angB_to_A = Math.atan2(ay - by, ax - bx);
    const angB_to_C = Math.atan2(cy - by, cx - bx);
    ctx.beginPath();
    ctx.arc(bx, by, 20, angB_to_C, angB_to_A);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Angle at A (interior) - angle between AB and AC
    const angA_to_B = Math.atan2(by - ay, bx - ax);
    const angA_to_C = Math.atan2(cy - ay, cx - ax);
    ctx.beginPath();
    ctx.arc(ax, ay, 18, angA_to_C, angA_to_B);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Exterior angle at C - angle between CA (going up) and CD (extension going right)
    const angC_to_A = Math.atan2(ay - cy, ax - cx);
    const angC_to_D = Math.atan2(dy - cy, dx - cx); // = 0 since same y
    ctx.beginPath();
    ctx.arc(cx, cy, 22, angC_to_A, angC_to_D);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Angle labels
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText('a', bx + 28, by - 10);
    ctx.fillText('b', ax + 4, ay + 30);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px system-ui';
    ctx.fillText('c', cx + 24, cy - 14);

    // Vertex labels
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('A', ax - 2, ay - 8);
    ctx.fillText('B', bx - 12, by + 5);
    ctx.fillText('C', cx - 2, cy + 18);

    // Formula
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    ctx.fillText('Exterior angle c = a + b', w / 2, h - 8);
}

// ===== Topic 9: Pythagorean Theorem & Trig =====

function drawReviewDiagram9a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    // Right triangle with a, b, c labeled
    // Right angle at bottom-left
    const margin = 55;
    const bx = margin, by = h - 40;        // bottom-left (right angle vertex)
    const cx = w - margin - 20, cy = h - 40; // bottom-right
    const ax = margin, ay = 50;              // top-left

    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Pythagorean Theorem: a² + b² = c²', w / 2, 20);

    // Triangle
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // Right angle square at bottom-left
    const sq = 12;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + sq, by);
    ctx.lineTo(bx + sq, by - sq);
    ctx.lineTo(bx, by - sq);
    ctx.stroke();

    // Side labels
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('a', bx - 18, (ay + by) / 2);     // left side (vertical leg)
    ctx.fillText('b', (bx + cx) / 2, by + 24);      // bottom side (horizontal leg)
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('c', (ax + cx) / 2 + 18, (ay + cy) / 2 - 10); // hypotenuse
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('(hypotenuse)', (ax + cx) / 2 + 18, (ay + cy) / 2 + 6);
}

function drawReviewDiagram9b(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    // SOH-CAH-TOA triangle
    // Right angle at bottom-left, θ at bottom-right
    const margin = 65;
    const bx = margin, by = h - 45;        // bottom-left (right angle)
    const cx = w - margin, cy = h - 45;    // bottom-right (θ is here)
    const ax = margin, ay = 55;            // top-left

    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('SOH-CAH-TOA', w / 2, 18);

    // Triangle
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // Right angle square at bottom-left
    const sq = 12;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + sq, by);
    ctx.lineTo(bx + sq, by - sq);
    ctx.lineTo(bx, by - sq);
    ctx.stroke();

    // Theta arc at bottom-right (C)
    const angC_to_B = Math.PI; // points left along bottom
    const angC_to_A = Math.atan2(ay - cy, ax - cx); // points to top-left
    ctx.beginPath();
    ctx.arc(cx, cy, 28, angC_to_A, angC_to_B);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = 'bold 14px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('θ', cx - 38, cy - 10);

    // Side labels
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';

    // Opposite = left side (vertical, far from θ)
    ctx.fillStyle = '#a855f7';
    ctx.save();
    ctx.translate(bx - 14, (ay + by) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Opposite', 0, 0);
    ctx.restore();

    // Adjacent = bottom side (next to θ)
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Adjacent', (bx + cx) / 2, by + 22);

    // Hypotenuse = diagonal
    ctx.fillStyle = '#10b981';
    ctx.save();
    const hypMidX = (ax + cx) / 2;
    const hypMidY = (ay + cy) / 2;
    const hypAngle = Math.atan2(cy - ay, cx - ax);
    ctx.translate(hypMidX + 12, hypMidY - 12);
    ctx.rotate(hypAngle);
    ctx.fillText('Hypotenuse', 0, 0);
    ctx.restore();
}

function drawReviewDiagram9c(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const halfW = w / 2;
    const topY = 42, botY = h - 38;

    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';

    // ===== 45-45-90 (left side) =====
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('45-45-90', halfW * 0.5, 18);
    const s1 = Math.min(halfW * 0.5, (botY - topY) * 0.85);
    // Right angle at bottom-left
    const lx = halfW * 0.2, ly = botY;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx, ly - s1);       // top
    ctx.lineTo(lx, ly);             // bottom-left (right angle)
    ctx.lineTo(lx + s1, ly);        // bottom-right
    ctx.closePath();
    ctx.stroke();

    // Right angle square at bottom-left
    const sq = 8;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(lx + sq, ly);
    ctx.lineTo(lx + sq, ly - sq);
    ctx.lineTo(lx, ly - sq);
    ctx.stroke();

    // Side labels
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'right';
    ctx.fillText('x', lx - 8, ly - s1 / 2 + 4);      // left leg
    ctx.textAlign = 'center';
    ctx.fillText('x', lx + s1 / 2, ly + 16);           // bottom leg
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('x√2', lx + s1 / 2 + 14, ly - s1 / 2 - 6); // hypotenuse

    // Angle labels at the correct vertices
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('45°', lx + 20, ly - s1 + 16);       // top vertex
    ctx.fillText('45°', lx + s1 - 18, ly - 10);       // bottom-right vertex

    // ===== 30-60-90 (right side) =====
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('30-60-90', halfW * 1.5, 18);

    // Short leg is horizontal (bottom), long leg is vertical (left), hypotenuse is diagonal
    // Right angle at bottom-left
    const shortLeg = s1 * 0.5;
    const longLeg = shortLeg * Math.sqrt(3);
    const actualLong = Math.min(longLeg, (botY - topY) * 0.85);
    const actualShort = actualLong / Math.sqrt(3);

    const rx = halfW + halfW * 0.2, ry = botY;
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rx, ry - actualLong);           // top (30° angle here)
    ctx.lineTo(rx, ry);                         // bottom-left (right angle)
    ctx.lineTo(rx + actualShort * 2, ry);       // bottom-right (60° angle here)
    ctx.closePath();
    ctx.stroke();

    // Right angle square at bottom-left
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(rx + sq, ry);
    ctx.lineTo(rx + sq, ry - sq);
    ctx.lineTo(rx, ry - sq);
    ctx.stroke();

    // Side labels
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#818cf8';
    ctx.textAlign = 'right';
    ctx.fillText('x√3', rx - 8, ry - actualLong / 2 + 4); // long leg (vertical)
    ctx.textAlign = 'center';
    ctx.fillText('x', rx + actualShort, ry + 16);           // short leg (horizontal)
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('2x', rx + actualShort + 14, ry - actualLong / 2 - 6); // hypotenuse

    // Angle labels - 30° at top vertex (opposite short leg), 60° at bottom-right (opposite long leg)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui';
    ctx.fillText('30°', rx + 22, ry - actualLong + 16);     // top vertex
    ctx.fillText('60°', rx + actualShort * 2 - 22, ry - 10); // bottom-right vertex
}

// ===== Topic 10: Similar Triangles =====

function drawReviewDiagram10a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Similar Triangles (same angles, proportional sides)', w / 2, 18);

    // Smaller triangle
    const s_bx = 40, s_by = h - 30;
    const s_w = 90, s_h = 75;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(s_bx, s_by);
    ctx.lineTo(s_bx + s_w, s_by);
    ctx.lineTo(s_bx + s_w * 0.3, s_by - s_h);
    ctx.closePath();
    ctx.stroke();

    ctx.font = '12px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('3', s_bx + s_w / 2, s_by + 16);
    ctx.fillText('4', s_bx - 10, s_by - s_h / 2 + 6);
    ctx.fillText('5', s_bx + s_w * 0.7 + 10, s_by - s_h / 2);

    // Angle arcs on small triangle
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    const s_ax = s_bx + s_w * 0.3, s_ay = s_by - s_h;
    // Angle at bottom-left
    const s_bl_to_top = Math.atan2(s_ay - s_by, s_ax - s_bx);
    const s_bl_to_right = 0;
    ctx.beginPath();
    ctx.arc(s_bx, s_by, 12, s_bl_to_top, s_bl_to_right);
    ctx.stroke();
    // Angle at bottom-right
    const s_br_to_top = Math.atan2(s_ay - s_by, s_ax - (s_bx + s_w));
    ctx.beginPath();
    ctx.arc(s_bx + s_w, s_by, 12, Math.PI, s_br_to_top);
    ctx.stroke();

    // "~" symbol
    ctx.font = 'bold 20px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('~', w * 0.42, h / 2 + 5);

    // Larger triangle (scale factor 2)
    const l_bx = w * 0.48, l_by = h - 30;
    const l_w = 180, l_h = 150;
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(l_bx, l_by);
    ctx.lineTo(l_bx + l_w, l_by);
    ctx.lineTo(l_bx + l_w * 0.3, l_by - l_h);
    ctx.closePath();
    ctx.stroke();

    ctx.font = '12px system-ui';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('6', l_bx + l_w / 2, l_by + 16);
    ctx.fillText('8', l_bx - 10, l_by - l_h / 2 + 6);
    ctx.fillText('10', l_bx + l_w * 0.7 + 14, l_by - l_h / 2);

    // Angle arcs on large triangle (matching)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    const l_ax = l_bx + l_w * 0.3, l_ay = l_by - l_h;
    const l_bl_to_top = Math.atan2(l_ay - l_by, l_ax - l_bx);
    ctx.beginPath();
    ctx.arc(l_bx, l_by, 14, l_bl_to_top, 0);
    ctx.stroke();
    const l_br_to_top = Math.atan2(l_ay - l_by, l_ax - (l_bx + l_w));
    ctx.beginPath();
    ctx.arc(l_bx + l_w, l_by, 14, Math.PI, l_br_to_top);
    ctx.stroke();

    // Scale factor label
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    ctx.fillText('Scale factor = 2 (sides: 3→6, 4→8, 5→10)', w / 2, h - 6);
}

// ===== Topic 11: Quadrilaterals =====

function drawReviewDiagram11a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const shapes = [
        { name: 'Parallelogram', x: w * 0.17 },
        { name: 'Rectangle', x: w * 0.42 },
        { name: 'Rhombus', x: w * 0.65 },
        { name: 'Square', x: w * 0.87 }
    ];
    const sw = w * 0.18, sh = sw * 0.65;
    const cy = h * 0.48;

    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Quadrilateral Types', w / 2, 16);

    shapes.forEach((s, i) => {
        const cx = s.x;
        const colors = ['#38bdf8', '#818cf8', '#a855f7', '#10b981'];
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2.5;

        if (i === 0) {
            // Parallelogram (skewed)
            const skew = sw * 0.2;
            ctx.beginPath();
            ctx.moveTo(cx - sw / 2 + skew, cy - sh / 2);
            ctx.lineTo(cx + sw / 2 + skew, cy - sh / 2);
            ctx.lineTo(cx + sw / 2 - skew, cy + sh / 2);
            ctx.lineTo(cx - sw / 2 - skew, cy + sh / 2);
            ctx.closePath();
            ctx.stroke();
            // Parallel marks on top and bottom
            drawParallelMark(ctx, cx, cy - sh / 2, 0);
            drawParallelMark(ctx, cx, cy + sh / 2, 0);
        } else if (i === 1) {
            // Rectangle
            ctx.beginPath();
            ctx.rect(cx - sw / 2, cy - sh / 2, sw, sh);
            ctx.stroke();
            // Right angle marks at all corners
            const rsq = 6;
            [[cx - sw / 2, cy - sh / 2, 1, 1], [cx + sw / 2, cy - sh / 2, -1, 1],
             [cx - sw / 2, cy + sh / 2, 1, -1], [cx + sw / 2, cy + sh / 2, -1, -1]].forEach(([x, y, dx, dy]) => {
                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x + rsq * dx, y);
                ctx.lineTo(x + rsq * dx, y + rsq * dy);
                ctx.lineTo(x, y + rsq * dy);
                ctx.stroke();
            });
            ctx.strokeStyle = colors[i];
        } else if (i === 2) {
            // Rhombus (diamond shape)
            const dh = sh / 2 + 8;
            const dw = sw / 2 - 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy - dh);
            ctx.lineTo(cx + dw, cy);
            ctx.lineTo(cx, cy + dh);
            ctx.lineTo(cx - dw, cy);
            ctx.closePath();
            ctx.stroke();
            // Single tick on all 4 sides (all equal)
            drawTickMark(ctx, cx + dw / 2, cy - dh / 2, 55);
            drawTickMark(ctx, cx - dw / 2, cy - dh / 2, -55);
            drawTickMark(ctx, cx + dw / 2, cy + dh / 2, -55);
            drawTickMark(ctx, cx - dw / 2, cy + dh / 2, 55);
        } else {
            // Square
            const ss = sh * 0.8;
            ctx.beginPath();
            ctx.rect(cx - ss / 2, cy - ss / 2, ss, ss);
            ctx.stroke();
            // Right angle mark
            const rsq = 5;
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx - ss / 2 + rsq, cy - ss / 2);
            ctx.lineTo(cx - ss / 2 + rsq, cy - ss / 2 + rsq);
            ctx.lineTo(cx - ss / 2, cy - ss / 2 + rsq);
            ctx.stroke();
            // Tick marks on all sides
            drawTickMark(ctx, cx, cy - ss / 2, 0);
            drawTickMark(ctx, cx, cy + ss / 2, 0);
            drawTickMark(ctx, cx - ss / 2, cy, 90);
            drawTickMark(ctx, cx + ss / 2, cy, 90);
        }

        ctx.font = '10px system-ui';
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, cx, cy + sh / 2 + 24);
    });

    // Hierarchy
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('Parallelogram → Rectangle → Square ← Rhombus ← Parallelogram', w / 2, h - 6);
}

function drawParallelMark(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-4, -3);
    ctx.lineTo(0, 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(4, -3);
    ctx.lineTo(8, 3);
    ctx.stroke();
    ctx.restore();
}

// ===== Topic 12: Circles =====

function drawReviewDiagram12a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const cx = w * 0.45, cy = h * 0.5;
    const r = Math.min(w * 0.25, h * 0.35);

    ctx.font = 'bold 13px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Circle Parts', w / 2, 16);

    // Circle
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('center', cx + 2, cy + 14);

    // Radius (from center going upper-right)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    const rAngle = -Math.PI / 4;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(rAngle) * r, cy + Math.sin(rAngle) * r);
    ctx.stroke();
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#10b981';
    ctx.fillText('radius', cx + Math.cos(rAngle) * r * 0.5 + 14, cy + Math.sin(rAngle) * r * 0.5 + 2);

    // Diameter (horizontal through center)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx + r, cy);
    ctx.stroke();
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('diameter', cx, cy - 10);

    // Chord (does not pass through center)
    const chordAngle1 = Math.PI * 0.7, chordAngle2 = Math.PI * 1.4;
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(chordAngle1) * r, cy + Math.sin(chordAngle1) * r);
    ctx.lineTo(cx + Math.cos(chordAngle2) * r, cy + Math.sin(chordAngle2) * r);
    ctx.stroke();
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('chord', cx - r * 0.35, cy + r * 0.78);

    // Tangent line (vertical at right side of circle)
    const tx = cx + r, ty = cy;
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx, ty - r * 0.9);
    ctx.lineTo(tx, ty + r * 0.9);
    ctx.stroke();
    // Right angle at tangent point
    const sq = 7;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tx - sq, ty);
    ctx.lineTo(tx - sq, ty - sq);
    ctx.lineTo(tx, ty - sq);
    ctx.stroke();
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#818cf8';
    ctx.fillText('tangent', tx + 8, ty - r * 0.5);
}

function drawReviewDiagram12b(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const cx1 = w * 0.3, cx2 = w * 0.72;
    const cy1 = h * 0.55, cy2 = h * 0.55;
    const r = Math.min(w * 0.18, h * 0.32);

    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';

    // === Central Angle (left) ===
    ctx.fillText('Central Angle', cx1, 18);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(cx1, cy1, 3, 0, Math.PI * 2);
    ctx.fill();

    // Two radii forming central angle (80°)
    const ca1 = -Math.PI * 0.15, ca2 = -Math.PI * 0.6;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx1 + Math.cos(ca1) * r, cy1 + Math.sin(ca1) * r);
    ctx.lineTo(cx1, cy1);
    ctx.lineTo(cx1 + Math.cos(ca2) * r, cy1 + Math.sin(ca2) * r);
    ctx.stroke();

    // Arc indicator
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx1, cy1, 16, ca2, ca1);
    ctx.stroke();

    // Intercepted arc (thicker on circle)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx1, cy1, r, ca2, ca1);
    ctx.stroke();

    ctx.font = '11px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('80°', cx1 + 6, cy1 - 18);
    ctx.fillStyle = '#10b981';
    ctx.fillText('arc = 80°', cx1, 38);

    // === Inscribed Angle (right) ===
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Inscribed Angle', cx2, 18);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
    ctx.stroke();

    // Inscribed angle: vertex on circle, same intercepted arc
    const ia1 = -Math.PI * 0.15, ia2 = -Math.PI * 0.6;
    const iVertex = Math.PI * 0.55; // vertex on bottom of circle
    const vx = cx2 + Math.cos(iVertex) * r;
    const vy = cy2 + Math.sin(iVertex) * r;

    // Two chords from vertex to endpoints of arc
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx2 + Math.cos(ia1) * r, cy2 + Math.sin(ia1) * r);
    ctx.lineTo(vx, vy);
    ctx.lineTo(cx2 + Math.cos(ia2) * r, cy2 + Math.sin(ia2) * r);
    ctx.stroke();

    // Angle arc at vertex
    const vToA1 = Math.atan2(cy2 + Math.sin(ia1) * r - vy, cx2 + Math.cos(ia1) * r - vx);
    const vToA2 = Math.atan2(cy2 + Math.sin(ia2) * r - vy, cx2 + Math.cos(ia2) * r - vx);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(vx, vy, 14, vToA2, vToA1);
    ctx.stroke();

    // Same intercepted arc
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx2, cy2, r, ia2, ia1);
    ctx.stroke();

    // Vertex dot
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(vx, vy, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '11px system-ui';
    ctx.fillStyle = '#a855f7';
    ctx.fillText('40°', vx + 16, vy - 4);
    ctx.fillStyle = '#10b981';
    ctx.fillText('same arc = 80°', cx2, 38);
}

// ===== Topic 13: Area & Volume =====

function drawReviewDiagram13a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const shapes = [
        { name: 'Rectangle', x: w * 0.14 },
        { name: 'Triangle', x: w * 0.38 },
        { name: 'Parallelogram', x: w * 0.62 },
        { name: 'Trapezoid', x: w * 0.86 }
    ];
    const sw = w * 0.17, sh = 55;
    const cy = h * 0.48;

    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('2D Shapes & Formulas', w / 2, 16);

    // Rectangle
    let sx = shapes[0].x;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(sx - sw / 2, cy - sh / 2, sw, sh);
    ctx.stroke();
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('l', sx, cy - sh / 2 - 5);
    ctx.fillText('w', sx + sw / 2 + 8, cy);
    ctx.fillStyle = '#10b981';
    ctx.fillText('A = lw', sx, cy + sh / 2 + 18);

    // Triangle
    sx = shapes[1].x;
    const tBase = sw * 0.9, tH = sh;
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx - tBase / 2, cy + tH / 2);
    ctx.lineTo(sx + tBase / 2, cy + tH / 2);
    ctx.lineTo(sx + tBase * 0.1, cy - tH / 2);
    ctx.closePath();
    ctx.stroke();
    // Height dashed line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(sx + tBase * 0.1, cy - tH / 2);
    ctx.lineTo(sx + tBase * 0.1, cy + tH / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('b', sx, cy + tH / 2 + 12);
    ctx.fillText('h', sx + tBase * 0.1 + 10, cy);
    ctx.fillStyle = '#10b981';
    ctx.fillText('A = ½bh', sx, cy + tH / 2 + 26);

    // Parallelogram
    sx = shapes[2].x;
    const pSkew = 15;
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx - sw / 2 + pSkew, cy - sh / 2);
    ctx.lineTo(sx + sw / 2 + pSkew, cy - sh / 2);
    ctx.lineTo(sx + sw / 2 - pSkew, cy + sh / 2);
    ctx.lineTo(sx - sw / 2 - pSkew, cy + sh / 2);
    ctx.closePath();
    ctx.stroke();
    // Height dashed line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(sx - sw / 2 + pSkew, cy - sh / 2);
    ctx.lineTo(sx - sw / 2 + pSkew, cy + sh / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('b', sx, cy + sh / 2 + 12);
    ctx.fillText('h', sx - sw / 2 + pSkew - 10, cy);
    ctx.fillStyle = '#10b981';
    ctx.fillText('A = bh', sx, cy + sh / 2 + 26);

    // Trapezoid
    sx = shapes[3].x;
    const topW = sw * 0.5, botW = sw;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx - topW / 2, cy - sh / 2);
    ctx.lineTo(sx + topW / 2, cy - sh / 2);
    ctx.lineTo(sx + botW / 2, cy + sh / 2);
    ctx.lineTo(sx - botW / 2, cy + sh / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('b₁', sx, cy - sh / 2 - 5);
    ctx.fillText('b₂', sx, cy + sh / 2 + 12);
    ctx.fillText('h', sx + botW / 2 + 8, cy);
    ctx.fillStyle = '#10b981';
    ctx.fillText('A = ½(b₁+b₂)h', sx, cy + sh / 2 + 26);
}

function drawReviewDiagram13b(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('3D Shapes & Volumes', w / 2, 16);

    const cy = h * 0.5;

    // Rectangular prism
    const bx = w * 0.14;
    const bw = 50, bh2 = 40, bd = 20;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(bx - bw / 2, cy - bh2 / 2, bw, bh2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx - bw / 2, cy - bh2 / 2);
    ctx.lineTo(bx - bw / 2 + bd, cy - bh2 / 2 - bd * 0.6);
    ctx.lineTo(bx + bw / 2 + bd, cy - bh2 / 2 - bd * 0.6);
    ctx.lineTo(bx + bw / 2, cy - bh2 / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx + bw / 2, cy - bh2 / 2);
    ctx.lineTo(bx + bw / 2 + bd, cy - bh2 / 2 - bd * 0.6);
    ctx.lineTo(bx + bw / 2 + bd, cy + bh2 / 2 - bd * 0.6);
    ctx.lineTo(bx + bw / 2, cy + bh2 / 2);
    ctx.stroke();
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#10b981';
    ctx.fillText('V = lwh', bx + 5, cy + bh2 / 2 + 18);

    // Cylinder
    const cylX = w * 0.38, cylR = 28, cylH = 55;
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cylX, cy - cylH / 2 + 8, cylR, 10, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cylX, cy + cylH / 2 - 5, cylR, 10, 0, 0, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cylX - cylR, cy - cylH / 2 + 8); ctx.lineTo(cylX - cylR, cy + cylH / 2 - 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cylX + cylR, cy - cylH / 2 + 8); ctx.lineTo(cylX + cylR, cy + cylH / 2 - 5); ctx.stroke();
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('r', cylX + 5, cy - cylH / 2 + 6);
    ctx.fillText('h', cylX + cylR + 10, cy);
    ctx.fillStyle = '#10b981';
    ctx.fillText('V = πr²h', cylX, cy + cylH / 2 + 16);

    // Cone
    const coneX = w * 0.62, coneR = 28, coneH = 60;
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(coneX, cy + coneH / 2 - 8, coneR, 10, 0, 0, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.setLineDash([3, 3]);
    ctx.ellipse(coneX, cy + coneH / 2 - 8, coneR, 10, 0, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(coneX - coneR, cy + coneH / 2 - 8);
    ctx.lineTo(coneX, cy - coneH / 2 + 5);
    ctx.lineTo(coneX + coneR, cy + coneH / 2 - 8);
    ctx.stroke();
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#10b981';
    ctx.fillText('V = ⅓πr²h', coneX, cy + coneH / 2 + 14);

    // Sphere
    const sphX = w * 0.86, sphR = 30;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(sphX, cy, sphR, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.setLineDash([3, 3]);
    ctx.ellipse(sphX, cy, sphR, 10, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    // Radius line
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(sphX, cy); ctx.lineTo(sphX + sphR, cy); ctx.stroke();
    ctx.font = '10px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('r', sphX + sphR / 2, cy - 6);
    ctx.fillStyle = '#10b981';
    ctx.fillText('V = ⁴⁄₃πr³', sphX, cy + sphR + 18);
}

// ===== Topic 14: Coordinate Geometry =====

function drawReviewDiagram14a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    const margin = 45;
    const ox = margin + 10, oy = h - margin;
    const axW = w - margin * 2, axH = h - margin * 1.5;

    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Distance & Midpoint', w / 2, 16);

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + axW, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy - axH); ctx.stroke();

    // Light grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    const gridStep = axW / 8;
    for (let i = 1; i <= 8; i++) {
        ctx.beginPath(); ctx.moveTo(ox + i * gridStep, oy); ctx.lineTo(ox + i * gridStep, oy - axH); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox, oy - i * gridStep); ctx.lineTo(ox + axW, oy - i * gridStep); ctx.stroke();
    }

    // Two points
    const p1x = ox + 2 * gridStep, p1y = oy - 2 * gridStep;
    const p2x = ox + 6 * gridStep, p2y = oy - 6 * gridStep;

    // Right triangle dashed lines showing dx, dy
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Distance line (hypotenuse)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();

    // Points
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(p1x, p1y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(p2x, p2y, 5, 0, Math.PI * 2); ctx.fill();

    // Midpoint
    const mx = (p1x + p2x) / 2, my = (p1y + p2y) / 2;
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(mx, my, 4, 0, Math.PI * 2); ctx.fill();

    // Labels
    ctx.font = '11px system-ui';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('(x₁, y₁)', p1x - 5, p1y + 18);
    ctx.fillText('(x₂, y₂)', p2x + 8, p2y + 4);
    ctx.fillStyle = '#10b981';
    ctx.fillText('midpoint', mx + 6, my - 8);

    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('Δx', (p1x + p2x) / 2, p1y + 16);
    ctx.fillText('Δy', p2x + 16, (p1y + p2y) / 2);
}

function drawReviewDiagram14b(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Parallel & Perpendicular Lines', w / 2, 16);

    const halfW = w / 2;

    // === Parallel lines (left side) ===
    ctx.font = 'bold 11px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Parallel', halfW * 0.5, 38);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(30, h * 0.75);
    ctx.lineTo(halfW - 20, h * 0.3);
    ctx.stroke();

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(60, h * 0.85);
    ctx.lineTo(halfW + 10, h * 0.4);
    ctx.stroke();

    ctx.font = '11px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.fillText('m = 2/3', halfW - 30, h * 0.3 - 5);
    ctx.fillStyle = '#a855f7';
    ctx.fillText('m = 2/3', halfW, h * 0.4 - 5);
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText('m₁ = m₂', halfW * 0.5, h - 12);

    // === Perpendicular lines (right side) ===
    ctx.font = 'bold 11px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Perpendicular', halfW * 1.5, 38);

    const pcx = halfW * 1.5, pcy = h * 0.55;
    // Line 1: slope 3/4 (rise 3, run 4)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pcx - 70, pcy + 52.5);
    ctx.lineTo(pcx + 70, pcy - 52.5);
    ctx.stroke();

    // Line 2: slope -4/3 (perpendicular)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pcx - 50, pcy - 66.7);
    ctx.lineTo(pcx + 50, pcy + 66.7);
    ctx.stroke();

    // Right angle square at intersection
    const sq = 8;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pcx + sq, pcy - sq * 0.75);
    ctx.lineTo(pcx + sq + sq * 0.75, pcy + sq * 0.15);
    ctx.lineTo(pcx + sq * 0.75, pcy + sq * 0.9);
    ctx.stroke();

    ctx.font = '11px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.fillText('m = 3/4', pcx + 50, pcy - 50);
    ctx.fillStyle = '#10b981';
    ctx.fillText('m = −4/3', pcx + 40, pcy + 55);
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText('m₁ · m₂ = −1', halfW * 1.5, h - 12);
}

// ===== Topic 15: Transformations =====

function drawReviewDiagram15a(canvas) {
    const { ctx, w, h } = setupReviewCanvas(canvas);
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Transformations', w / 2, 16);

    const thirdW = w / 3;

    // === Translation ===
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.fillText('Translation', thirdW * 0.5, 36);

    const tOrig = [
        [thirdW * 0.15, h * 0.42],
        [thirdW * 0.15, h * 0.72],
        [thirdW * 0.55, h * 0.72],
        [thirdW * 0.55, h * 0.42]
    ];
    const tShift = 32, tShiftY = -22;
    // Original
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    tOrig.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.stroke();
    // Translated
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    tOrig.forEach((p, i) => i === 0 ? ctx.moveTo(p[0] + tShift, p[1] + tShiftY) : ctx.lineTo(p[0] + tShift, p[1] + tShiftY));
    ctx.closePath();
    ctx.stroke();
    // Arrow
    const arrowStartX = tOrig[3][0] + 4, arrowStartY = tOrig[3][1] + 2;
    const arrowEndX = tOrig[3][0] + tShift - 4, arrowEndY = tOrig[3][1] + tShiftY - 2;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(arrowStartX, arrowStartY);
    ctx.lineTo(arrowEndX, arrowEndY);
    ctx.stroke();
    // Arrowhead
    const aAngle = Math.atan2(arrowEndY - arrowStartY, arrowEndX - arrowStartX);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(arrowEndX, arrowEndY);
    ctx.lineTo(arrowEndX - 8 * Math.cos(aAngle - 0.4), arrowEndY - 8 * Math.sin(aAngle - 0.4));
    ctx.lineTo(arrowEndX - 8 * Math.cos(aAngle + 0.4), arrowEndY - 8 * Math.sin(aAngle + 0.4));
    ctx.fill();

    // === Reflection ===
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Reflection', thirdW * 1.5, 36);

    // Mirror line (vertical)
    const mirrorX = thirdW * 1.5;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(mirrorX, h * 0.3);
    ctx.lineTo(mirrorX, h * 0.85);
    ctx.stroke();
    ctx.setLineDash([]);

    // Original triangle (left of mirror)
    const rTri = [
        [mirrorX - 50, h * 0.45],
        [mirrorX - 15, h * 0.45],
        [mirrorX - 30, h * 0.72]
    ];
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    rTri.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.stroke();

    // Reflected triangle (right of mirror)
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    rTri.forEach((p, i) => {
        const rx = mirrorX + (mirrorX - p[0]);
        i === 0 ? ctx.moveTo(rx, p[1]) : ctx.lineTo(rx, p[1]);
    });
    ctx.closePath();
    ctx.stroke();

    // === Rotation ===
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('90° Rotation', thirdW * 2.5, 36);

    const rotCx = thirdW * 2.5, rotCy = h * 0.58;
    // Original L-shape
    const lShape = [
        [rotCx + 5, rotCy - 35],
        [rotCx + 5, rotCy + 10],
        [rotCx + 35, rotCy + 10],
        [rotCx + 35, rotCy + 3],
        [rotCx + 12, rotCy + 3],
        [rotCx + 12, rotCy - 35]
    ];
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    lShape.forEach((p, i) => i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.stroke();

    // Rotated L-shape (90° CCW: (x,y) -> (-y,x) relative to center)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    lShape.forEach((p, i) => {
        const dx = p[0] - rotCx, dy = p[1] - rotCy;
        const rx = rotCx + (-dy), ry = rotCy + dx;
        i === 0 ? ctx.moveTo(rx, ry) : ctx.lineTo(rx, ry);
    });
    ctx.closePath();
    ctx.stroke();

    // Center point
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(rotCx, rotCy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Curved arrow indicating rotation
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rotCx, rotCy, 18, -Math.PI * 0.35, Math.PI * 0.15, false);
    ctx.stroke();
    // Arrowhead on curved arrow
    const curveEndAngle = Math.PI * 0.15;
    const curveEndX = rotCx + 18 * Math.cos(curveEndAngle);
    const curveEndY = rotCy + 18 * Math.sin(curveEndAngle);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(curveEndX, curveEndY);
    ctx.lineTo(curveEndX - 5, curveEndY - 6);
    ctx.lineTo(curveEndX + 5, curveEndY - 4);
    ctx.fill();
}

// ===== Init function =====

function initReviewCanvases(num) {
    setTimeout(() => {
        const drawFunctions = {
            '7a': drawReviewDiagram7a,
            '7b': drawReviewDiagram7b,
            '8a': drawReviewDiagram8a,
            '8b': drawReviewDiagram8b,
            '9a': drawReviewDiagram9a,
            '9b': drawReviewDiagram9b,
            '9c': drawReviewDiagram9c,
            '10a': drawReviewDiagram10a,
            '11a': drawReviewDiagram11a,
            '12a': drawReviewDiagram12a,
            '12b': drawReviewDiagram12b,
            '13a': drawReviewDiagram13a,
            '13b': drawReviewDiagram13b,
            '14a': drawReviewDiagram14a,
            '14b': drawReviewDiagram14b,
            '15a': drawReviewDiagram15a
        };

        Object.keys(drawFunctions).forEach(key => {
            if (key.startsWith(String(num))) {
                const canvas = document.getElementById('reviewCanvas-' + key);
                if (canvas) {
                    drawFunctions[key](canvas);
                }
            }
        });
    }, 50);
}

// ===== Navigation =====

function showReviewIndex() {
    document.getElementById('reviewIndex').style.display = '';
    document.getElementById('reviewContent').style.display = 'none';
}

function showReviewTopic(num) {
    const topic = REVIEW_TOPICS[num];
    if (!topic) return;
    document.getElementById('reviewIndex').style.display = 'none';
    document.getElementById('reviewContent').style.display = '';
    document.getElementById('reviewTopicContent').innerHTML =
        '<h2 style="color:#38bdf8; font-size:1.3rem; margin-bottom:16px;">' + topic.title + '</h2>' +
        topic.content;
    document.getElementById('reviewContent').scrollTop = 0;
    window.scrollTo(0, 0);

    if (num >= 7 && num <= 15) {
        initReviewCanvases(num);
    }
}
