/*
 * LightningChartJS example that shows the creation of a Pie Chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, PieChartTypes, LegendBoxBuilders, SliceLabelFormatters, Themes } = lcjs

const pieType = window.innerWidth > 599 ? PieChartTypes.LabelsOnSides : PieChartTypes.LabelsInsideSlices

const pie = lightningChart()
    .Pie({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
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

// ----- Add LegendBox -----
pie.addLegendBox(LegendBoxBuilders.VerticalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.3,
    })
    .add(pie)
