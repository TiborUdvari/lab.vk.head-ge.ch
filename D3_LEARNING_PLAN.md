# D3.js — 3-Day Learning Sprint

Prep for sessions `session-d3-1` (29.04.26) and `session-d3-2` (13.05.26).

## Goals before Wednesday

By the end of three days you should be able to **explain and demo, without notes**:

1. **Why D3 exists** — and specifically, why a student who already knows Observable Plot should care.
2. **The data join** (`selection.data().join(...)`) — the single mental model the whole library hangs off.
3. **Scales + axes + margin convention** — how to put a coordinate system on an SVG.
4. **Transitions** — how the data join + transitions produce animation between states for free.
5. **One "non-Plot" form** — radial OR hierarchical (you'll pick on Day 3).

If you can write a bar chart, a scatter from CSV, and a "click to switch between two datasets with animated transition" from a blank page without copy-paste, you can teach D3-1.

## Mental model to internalize first

Three sentences that, once they're true for you, make everything click:

- **D3 is not a chart library.** It's a collection of small utilities (selections, scales, shapes, hierarchies) you compose to manipulate SVG/DOM with data. Plot is the chart library — built on top of D3.
- **Selections are jQuery for SVG, with a data superpower.** `selection.data(array).join("rect")` says: "make sure there's exactly one `<rect>` per item in this array." Add items → new rects appear. Remove items → rects leave. Same items, new values → existing rects update.
- **Everything else is plumbing.** Scales map data-space to pixel-space. Axes are pre-built selections that read scales. Generators (`d3.line`, `d3.arc`) turn data into SVG `d=""` strings. Transitions animate any attribute change.

If a tutorial spends 10 minutes on `.enter().append().attr().attr().attr()` and never says "selection" or "join", it's pre-2022 — keep it as background but don't model your teaching on it.

## Resources (use these, in this order)

**Primary** (read these end-to-end):

- **d3js.org** — the new site. Start with [What is D3?](https://d3js.org/what-is-d3) and [Getting Started](https://d3js.org/getting-started). Then dip into module pages as you build (`d3-selection`, `d3-scale`, `d3-shape`, `d3-transition`, `d3-hierarchy`).
- **d3indepth.com** — Peter Cook's free book. Modern syntax, well-organized, short chapters. Read: *Selections*, *Joining data*, *Scales*, *Shapes (path generators)*, *Transitions*. Skip the rest for now.
- **Amelia Wattenberger — "[How to learn D3.js](https://wattenberger.com/blog/d3)"** and "[D3 interactive cheat sheet](https://wattenberger.com/blog/d3-interactive-charts)". Best modern explainer of `.join()`.

**For inspiration / "what's possible":**

- **observablehq.com/@d3/gallery** — official gallery, every entry has source code.
- **d3-graph-gallery.com** — bigger, but uses the legacy `.enter().append()` pattern. Treat as visual reference, not as code template.

**Skip** (for now): Curran Kelleher's freeCodeCamp video (2018 syntax), Bostock's "Let's Make a Bar Chart" (good historically, syntax is dated), anything labeled "D3 v3/v4/v5".

**Setup** for examples (stays consistent with the rest of your repo):

```html
<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
  // ...
</script>
```

This matches your existing `<script type="module">` style and avoids a build step.

## Day 1 — Selections and the data join (≈3h)

This is the day that matters most. If only one day sticks, make it this one.

**Read (~45 min):** d3js.org "What is D3?" → d3indepth.com *Selections* + *Joining data* → Wattenberger "How to learn D3.js" intro section.

**Build, in order** (write each in its own `examples/d3-XX/index.html`):

1. **`d3-selection-basics`** *(15 min)* — On an existing static HTML page with a `<ul>` of items, use `d3.selectAll("li")` to change their color, then to set each `<li>`'s text from an array. Goal: realize `d3.selectAll` is `document.querySelectorAll` with a chainable API.

2. **`d3-circles-static`** *(30 min)* — An empty `<svg width="600" height="200">`. First, append 5 `<circle>` elements by writing 5 lines. Then refactor to one statement: `svg.selectAll("circle").data([10, 30, 50, 80, 120]).join("circle").attr("cx", d => d).attr("cy", 100).attr("r", 8)`. Goal: see that one line produces the same DOM. The "aha" of data-driven DOM.

3. **`d3-circles-rerandomize`** *(45 min)* — Same SVG, but a button regenerates the array with a *different length each time* (3 to 12 items). Use the **three-arg join** to make this visible:

   ```js
   svg.selectAll("circle")
     .data(data, d => d.id)              // key function
     .join(
       enter => enter.append("circle").attr("fill", "limegreen"),
       update => update.attr("fill", "steelblue"),
       exit   => exit.attr("fill", "tomato").remove()
     )
     .attr("cx", d => d.x)
     .attr("cy", 100)
     .attr("r", 8);
   ```

   Goal: physically see enter/update/exit. Try removing the key function and observe the difference. **This is the example you'll re-explain on Day 1 of the course.**

4. **`d3-bar-chart-hardcoded`** *(45 min)* — Hardcoded `[{name:"A", value:30}, ...]`. Use `d3.scaleBand()` for x, `d3.scaleLinear()` for y. **No axes, no margins yet** — just bars positioned by scales. Goal: feel scales as `domain → range` mappings. Notice the "y is upside down" trick: `.range([height, 0])`.

End-of-day check: can you write `circles-rerandomize` from blank without looking? If yes, Day 1 done.

## Day 2 — Real charts: axes, margins, CSV (≈3h)

**Read (~30 min):** d3indepth.com *Scales* (re-read), *Axes*, *Loading and parsing data*. Wattenberger's "Margin convention" section.

**Build:**

5. **`d3-bar-chart-full`** *(45 min)* — Take your Day 1 bar chart, add the **margin convention**:

   ```js
   const margin = {top: 20, right: 20, bottom: 30, left: 40};
   const width  = 600 - margin.left - margin.right;
   const height = 300 - margin.top  - margin.bottom;
   const svg = d3.select("#chart").append("svg")
     .attr("width",  width  + margin.left + margin.right)
     .attr("height", height + margin.top  + margin.bottom)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);
   ```

   Add `d3.axisBottom(xScale)` and `d3.axisLeft(yScale)`. Goal: this is the boilerplate that opens 90% of D3 examples — own it.

6. **`d3-scatter-from-csv`** *(45 min)* — Load one of your existing CSVs (`/assets/simpsons/simpsons_episodes.csv` is perfect: imdb_rating vs us_viewers_in_millions, color by season). Use `d3.csv()` with a row-converter to coerce numbers. Goal: get from "data on disk" to "dots on screen" in under 50 lines.

7. **`d3-line-from-csv`** *(45 min)* — Time series: same CSV, average rating per season → a line. Use `d3.line()` generator + `d3.timeParse` if needed (or just season number on x). Goal: meet the *path generator* pattern — generators turn data into `d` strings, you append a single `<path>`.

8. **`d3-toggle-datasets`** *(45 min)* — Two arrays of bar data, a button toggles between them. Add `.transition().duration(750)` before the attribute setters. Goal: see why the data join + transitions are the killer combo. **This is the example that previews D3-2.**

End-of-day check: can you build a scatter from a CSV from a blank page in 20 minutes? Day 2 done.

## Day 3 — One "non-Plot" form + previewing D3-2 (≈2-3h)

Pick **one** of two paths based on what excites you. You'll teach the other in D3-2 or as inspiration.

**Path A — Radial** (closest to "expressive poster" output):

**Read (~30 min):** d3indepth.com *Shapes* (focus on `d3.arc`, `d3.pie`).

9a. **`d3-radial-bar`** *(1h)* — Same data as your bar chart, but bars are radial: angle from `scaleBand` over `[0, 2π]`, length from `scaleRadial`. Use `d3.arc()`. Goal: realize "radial" is just polar coordinates + arc generator — no new concepts.

10a. **`d3-arc-pie`** *(45 min)* — `d3.pie()` to compute angles, `d3.arc()` to render. Donut chart. Add labels. Goal: meet the *layout* pattern — a layout function takes data and returns enriched data with `startAngle`/`endAngle`/etc., the generator renders it.

**Path B — Hierarchy** (closest to "info-rich editorial"):

**Read (~30 min):** d3indepth.com *Hierarchies* (overview), d3js.org `d3-hierarchy` module page.

9b. **`d3-treemap`** *(1h)* — Take any nested JSON (you can build one from Simpsons: seasons → episodes). `d3.hierarchy(root).sum(d => d.value)` → `d3.treemap().size([w, h])(root)` → render rects. Goal: same "layout enriches data → render with selection" pattern as `pie`.

10b. **`d3-circle-pack`** *(45 min)* — Same hierarchy, `d3.pack()` instead. Goal: realize most "fancy" D3 layouts are *the same three lines* with a different layout function.

End-of-day: you have a bar chart, scatter, line, transitioning bars, and one radial-or-hierarchical piece. That's the full surface area of both course sessions in your hands.

## What to deliberately not learn yet

- `d3.zoom`, `d3.drag`, `d3.brush` — interaction modules. Mention only in D3-2 if there's time.
- `d3.geo` / projections — out of scope for these two sessions.
- Force simulation (`d3.forceSimulation`) — *aperçu* only in D3-2. You don't need to build with it. Show one demo.
- React + D3 patterns — irrelevant for vanilla HTML class.
- v4/v5 enter/exit syntax — recognize it when students google something old, but don't teach it.

## Common traps to know about (you'll get questions on these)

- **"Why is my y-axis upside down?"** SVG y grows downward. `.range([height, 0])` is the fix.
- **"My axis is cut off."** Forgot the margin convention `<g transform>`.
- **"My update doesn't animate."** Forgot `.transition()` *before* `.attr()`, or applied it on the joined selection but not on the merged result.
- **"My circles all stack on each other."** Forgot a key function in `.data(arr, keyFn)`, so the join matches by index.
- **"`d3` is undefined."** UMD vs ESM import confusion. Stick to the ESM import above.
- **Tutorials with `.enter().append("rect").merge(rects).attr(...)`** — same idea, older API. `.join("rect")` is the modern shorthand.

## When to come back

After Day 2, ping me even if you haven't finished Day 3 — once you've written `d3-toggle-datasets` we have enough shared vocabulary to lock the course outline (D3-1 ↔ D3-2 split, the design challenge brief, the dataset choice). Day 3 examples can inform what you assign as the design challenge but aren't blockers for planning.
