window.lcjsSmallView = window.devicePixelRatio >= 2
if (!window.__lcjsDebugOverlay) {
    window.__lcjsDebugOverlay = document.createElement('div')
    window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
    const attach = () => { if (document.body && !window.__lcjsDebugOverlay.parentNode) document.body.appendChild(window.__lcjsDebugOverlay) }
    attach()
    setInterval(() => {
        attach()
        window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + window.lcjsSmallView
    }, 500)
}
/*
 * LightningChartJS example that shows the creation of a Pie Chart.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, PieChartTypes, SliceLabelFormatters, Themes } = lcjs

const pieType = window.innerWidth > 599 ? PieChartTypes.LabelsOnSides : PieChartTypes.LabelsInsideSlices

const pie = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .Pie({
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    return t && window.lcjsSmallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.lcjsSmallView ? lcjs.htmlTextRenderer : undefined,
        type: pieType,
    })
    .setTitle('Project Time Division')
    .setMultipleSliceExplosion(true)

// ----- User defined data -----
const data = [
    {
        name: 'Planning',
        value: 40,
    },
    {
        name: 'Development',
        value: 120,
    },
    {
        name: 'Testing',
        value: 60,
    },
    {
        name: 'Review',
        value: 24,
    },
    {
        name: 'Bug Fixing',
        value: 90,
    },
]

// ----- Create Slices -----
const slices = data.map((item) => pie.addSlice(item.name, item.value))

// Specify function which generates text for Slice Labels(LabelFormatter).

pie.setLabelFormatter(SliceLabelFormatters.NamePlusRelativeValue)
