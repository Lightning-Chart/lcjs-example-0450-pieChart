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
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
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
