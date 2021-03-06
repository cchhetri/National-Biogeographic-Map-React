import React from 'react'
import { BarLoader } from 'react-spinners'
import L from 'leaflet'
import AccordionChart from '../Charts/AccordionChart'
import './AnalysisPackages.scss'
import withSharedAnalysisCharacteristics from './AnalysisPackage'
import AppConfig from '../config'

const SB_URL = 'https://www.sciencebase.gov/catalog/item/582a1819e4b01fad8726554a?format=json'

let sb_properties = {
    'title': 'NVCS Hierarchy by Pixel'
}

const HBP_URL = AppConfig.REACT_APP_BIS_API + '/api/v1/nvcs/hierarchy_by_point'

const layers = [
     {
        title: 'Class',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'class',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=class'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d1b8ade4b0236b68f6b88e'

    },
     {
        title: 'Subclass',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'subclass',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=subclass'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d2b96ce4b0236b68f84d9f'

    },
     {
        title: 'Formation',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'formation',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=formation'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d1ba7ae4b0236b68f6b8a3'

    },
     {
        title: 'Division',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'division',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=division'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d2ba5ae4b0236b68f84db5'

    },
     {
        title: 'Macrogroup',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'macrogroup',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=macrogroup'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d1bad8e4b0236b68f6b8a5'

    },
     {
        title: 'Group',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'group',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=group'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d2bab6e4b0236b68f84dba'

    },
     {
        title: 'Ecological System',
        titlePrefix: 'GAP Landcover 2011 ',
        layer: L.tileLayer.wms(
            'https://www.sciencebase.gov/geoserver/nvcs/wms',
            {
                format: 'image/png',
                layers: 'ecological_system',
                opacity: .5,
                transparent: true
            }
        ),
        legend: {
            imageUrl: 'https://www.sciencebase.gov/geoserver/nvcs/wms?service=wms&request=GetLegendGraphic&format=image%2Fpng&layer=ecological_system'
        },
        timeEnabled: true,
        checked: false,
        sb_item: '58d1bb47e4b0236b68f6b8a7'

    }

]
class NVCSHierarchyByPixelPackage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layersOpen: false,
            charts: {
                pixelHierarchy: { id: '', config: {}, data: null }
            },
            enabledLayer: null,
            result: null
        }

        this.print = this.print.bind(this)
        this.fetch = this.fetch.bind(this)
        this.createUniqueBapContents = this.createUniqueBapContents.bind(this)
        this.getCharts = this.getCharts.bind(this)

    }

    componentDidMount() {
        this.props.onRef(this)
        this.fetch()
        if (this.props.initBap) {
            // do any initlizing here
        }
    }

    componentDidUpdate(prevProps) {
        // simple objects wont be the same bit the json representation should be
        if (JSON.stringify(prevProps.point) !== JSON.stringify(this.props.point)) {
            this.fetch()
        }
        if (this.state.result) {
            this.props.setBapJson(this.state.result)
        }
        this.props.setShareState({})
    }

    componentWillReceiveProps(props) {
        if (props.layers) {
            let enabledLayer = Object.keys(props.layers).find((key) => {
                return props.layers[key].checked
            })
            if (enabledLayer && this.state.charts.pixelHierarchy.data) {

                let match = this.state.charts.pixelHierarchy.data.find((d) => {
                    return Object.keys(d)[0].includes(props.layers[enabledLayer].title)
                })
                if (match) {
                    this.setState({
                        enabledLayer: Object.keys(match)[0]
                    })
                }
            }
            else {
                this.setState({
                    enabledLayer: null
                })
            }
        }
    }


    fetch() {
        const lat = this.props.point.lat
        const lng = this.props.point.lng
        if (!lat || !lng) return

        this.setState({
            loading: true,
            error: false
        })
        fetch(HBP_URL + '?lat=' + lat + '&lng=' + lng)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.setBapJson(result)
                    if (result && result.hits && result.hits.hits.length) {
                        const hbpData = result.hits.hits[0]['_source']['properties']
                        const charts = this.getCharts({ pixelHierarchy: hbpData })
                        this.setState({
                            loading: false,
                            charts: charts,
                            result: result
                        })
                        this.props.isEnabled(true)
                        this.props.canOpen(true)

                    } else {
                        this.setState({
                            loading: false,
                            charts: {
                                pixelHierarchy: { id: '', config: {}, data: null }
                            },
                            result: result
                        })
                        this.props.isEnabled(false)
                        this.props.canOpen(false)
                    }
                },
                (error) => {
                    this.setState({
                        error,
                        loading: false
                    })
                }
            )
    }

    getCharts(datas) {
        if (!datas || !datas.pixelHierarchy) return { pixelHierarchy: { id: '', config: {}, data: null } }
        datas = datas.pixelHierarchy
        const chartId = 'HBPAccordian'
        const chartTitle = 'NVCS Hierarchy by Pixel'
        const chartConfig = {
            margins: { left: 20, right: 20, top: 20, bottom: 125 },
            chart: { title: chartTitle, subtitle: '' },
        }
        let data = []
        const prefixes = [
            'ecosystem_',
            'group_',
            'macrogroup_',
            'division_',
            'formation_',
            'subclass_',
            'class_'
        ]

        for (let prefix of prefixes) {
            let title = `${datas[`${prefix}type`]} ${datas[`${prefix}code`]} ${datas[`${prefix}title`]}`
            let content = datas[`${prefix}description`]
            let obj = {}
            obj[title] = content
            data.push(obj)

        }
        data.reverse()
        return {
            pixelHierarchy: { id: chartId, config: chartConfig, data: data }
        }
    }


    print() {
        if (this.state.charts.pixelHierarchy.data && this.props.isOpen) {
            let content = []
            for (let entry of this.state.charts.pixelHierarchy.data) {
                let key = Object.keys(entry)[0]
                content.push({ text: key, style: 'sbPropertiesTitle', margin: [5, 5, 0, 5] })
                content.push({ text: entry[key], style: 'sbProperties', margin: [10, 5, 0, 5] })
            }
            let report = [
                { stack: this.props.getSBItemForPrint() },
                { text: this.state.charts.pixelHierarchy.config.chart.title, style: 'chartTitle', margin: [5, 2, 5, 10] },
                { stack: content }
            ]
            return report
        }
    }

    createUniqueBapContents() {
        return (
            <div>
                {this.props.getAnalysisLayers()}
                {this.props.handleBapError(this.state.error)}
                <div className="chartsDiv">
                    <AccordionChart
                        onRef={ref => (this.AccordionChart = ref)}
                        data={this.state.charts.pixelHierarchy.data}
                        id={this.state.charts.pixelHierarchy.id}
                        config={this.state.charts.pixelHierarchy.config}
                        highlight={this.state.enabledLayer}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <BarLoader width={'100%'} color={'white'} loading={this.state.loading} />
                {this.props.getBapContents(this.createUniqueBapContents)}
            </div>

        )
    }

}
const NVCSHierarchyByPixel = withSharedAnalysisCharacteristics(NVCSHierarchyByPixelPackage, layers, sb_properties, SB_URL, true)

export default NVCSHierarchyByPixel
