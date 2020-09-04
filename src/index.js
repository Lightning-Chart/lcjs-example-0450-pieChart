/*
 * LightningChartJS example that shows the creation of a Pie Chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    PieChartTypes,
    LegendBoxBuilders,
    SliceLabelFormatters,
    SolidFillPalette,
    ColorPalettes,
    SolidFill,
    SolidLine,
    ColorRGBA,
    Themes
} = lcjs

const pieType = window.innerWidth > 599 ? PieChartTypes.LabelsOnSides : PieChartTypes.LabelsInsideSlices

const pie = lightningChart().Pie({
    // theme: Themes.dark 
    type: pieType
})
    .setTitle('Project Time Division')
    .setAnimationsEnabled(true)
    .setMultipleSliceExplosion(true)

// ----- User defined data -----
const data = [
    {
        name: 'Planning',
        value: 40
    },
    {
        name: 'Development',
        value: 120
    },
    {
        name: 'Testing',
        value: 60
    },
    {
        name: 'Review',
        value: 24
    },
    {
        name: 'Bug Fixing',
        value: 90
    }
]

// ----- Create Slices -----
const slices = data.map((item) => pie.addSlice(item.name, item.value))

// Specify function which generates text for Slice Labels(LabelFormatter).

pie.setLabelFormatter(SliceLabelFormatters.NamePlusRelativeValue)


// ----- Add LegendBox -----
pie.addLegendBox(LegendBoxBuilders.VerticalLegendBox)
    .setPosition({ x: 0, y: 0 })
    .setOrigin({ x: -1, y: -1 })
    .setMargin({ bottom: 5, left: 5 })
    .add(pie)

// ----- Create custom Palette for Pie (defines color of Slice filling) ----
const palette = SolidFillPalette(ColorPalettes.sector(180, 320, 0.7, 0.7), 5)

// --------- Create line around slices -----
const customStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(160, 160, 160) }), thickness: 2 })

pie.setSliceFillStyle(palette)
    .setSliceStrokeStyle(customStrokeStyle)
