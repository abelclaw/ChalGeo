// ===== REVIEW TAB =====

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
</div>

<div class="review-topic">
    <h3>Parallel Lines Cut by a Transversal</h3>
    <p>When a transversal crosses two parallel lines, it creates 8 angles with these relationships:</p>
    <h4>Congruent Angle Pairs</h4>
    <ul>
        <li><strong>Corresponding angles</strong> — same position at each intersection</li>
        <li><strong>Alternate interior angles</strong> — opposite sides, between the parallel lines</li>
        <li><strong>Alternate exterior angles</strong> — opposite sides, outside the parallel lines</li>
    </ul>
    <h4>Supplementary Angle Pairs</h4>
    <ul>
        <li><strong>Co-interior (same-side interior) angles</strong> — same side, between the lines → add to 180°</li>
    </ul>
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
</div>

<div class="review-topic">
    <h3>Triangle Types</h3>
    <h4>By Sides</h4>
    <div class="review-def"><strong>Equilateral:</strong> all 3 sides equal (all angles = 60°)</div>
    <div class="review-def"><strong>Isosceles:</strong> at least 2 sides equal (base angles are congruent)</div>
    <div class="review-def"><strong>Scalene:</strong> no sides equal</div>
    <h4>By Angles</h4>
    <div class="review-def"><strong>Acute:</strong> all angles < 90° &nbsp;|&nbsp; <strong>Right:</strong> one angle = 90° &nbsp;|&nbsp; <strong>Obtuse:</strong> one angle > 90°</div>
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
</div>`
    },

    9: {
        title: "Pythagorean Theorem & Trigonometry",
        content: `
<div class="review-topic">
    <h3>Pythagorean Theorem</h3>
    <div class="review-formula">a² + b² = c²</div>
    <p>Where c is the hypotenuse (longest side, opposite the right angle) and a, b are the legs.</p>
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
</div>

<div class="review-topic">
    <h3>Triangle Proportionality Theorem</h3>
    <div class="review-def">If a line is parallel to one side of a triangle and intersects the other two sides, it divides them proportionally.</div>
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
    <div class="review-def"><strong>Parallelogram:</strong> both pairs of opposite sides are parallel and congruent. Opposite angles are congruent. Diagonals bisect each other.</div>
    <div class="review-def"><strong>Rectangle:</strong> a parallelogram with four right angles. Diagonals are congruent.</div>
    <div class="review-def"><strong>Rhombus:</strong> a parallelogram with four congruent sides. Diagonals are perpendicular and bisect the angles.</div>
    <div class="review-def"><strong>Square:</strong> both a rectangle and a rhombus. Four congruent sides and four right angles.</div>
    <div class="review-def"><strong>Trapezoid:</strong> exactly one pair of parallel sides (the bases). Legs are the non-parallel sides.</div>
    <div class="review-def"><strong>Isosceles Trapezoid:</strong> a trapezoid with congruent legs. Base angles are congruent. Diagonals are congruent.</div>
    <div class="review-def"><strong>Kite:</strong> two pairs of consecutive congruent sides. One pair of opposite angles are congruent. Diagonals are perpendicular.</div>
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
</div>

<div class="review-topic">
    <h3>Surface Area Formulas</h3>
    <div class="review-formula">Rectangular Prism: SA = 2lw + 2lh + 2wh</div>
    <div class="review-formula">Cube: SA = 6s²</div>
    <div class="review-formula">Cylinder: SA = 2πr² + 2πrh</div>
    <div class="review-formula">Cone: SA = πr² + πrl (l = slant height)</div>
    <div class="review-formula">Sphere: SA = 4πr²</div>
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
</div>

<div class="review-topic">
    <h3>Coordinate Geometry in Proofs</h3>
    <p>Common strategies:</p>
    <ul>
        <li>Use distance formula to show sides are congruent</li>
        <li>Use slope to show lines are parallel or perpendicular</li>
        <li>Use midpoint to show diagonals bisect each other</li>
    </ul>
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
</div>`
    }
};

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
}
