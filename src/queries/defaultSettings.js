export const rendererSpecificSettings = {};

export const webchartsSettings = {
    resizable: false,
    width: 350,
    height: 500,

    y: {
        type: 'linear',
        behavior: 'firstfilter'
    },
    x: {
        column: 'site_name',
        type: 'ordinal',
        label: ''
        //    "domain": ["Boston", "MUSC", "UCLA", "Pittsburgh", "Houston", "Michigan", "HSS", "Georgetown"]
    },
    marks: [
        {
            arrange: 'stacked',
            split: 'query_status',
            type: 'bar',
            per: ['site_name'],
            summarizeY: 'percent',
            tooltip: '$y'
        }
    ],
    color_by: 'query_status',
    colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
    legend: {
        label: '',
        order: ['Resolved', 'Outstanding <= 90 days', 'Outstanding > 90 days']
    }
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {}

export function syncControlInputs(settings) {
    const defaultControls = [
        {
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        }
    ];

    return defaultControls;
}
