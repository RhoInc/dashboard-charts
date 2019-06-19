export default function webchartsSettings() {
    return {
        x: {
            column: null, // set in ./syncSettings
            type: 'ordinal',
            label: ''
        },
        y: {
            type: 'linear',
            behavior: 'firstfilter',
            format: '1d'
        },
        marks: [
            {
                arrange: 'stacked',
                split: null, // set in ./syncSettings
                type: 'bar',
                per: [], // set in ./syncSettings
                summarizeY: 'percent',
                tooltip: '$y'
            }
        ],
        color_by: null, // set in ./syncSettings
        color_dom: null, // set in ../callbacks/onInit
        colors: null, // set in ../callbacks/onInit
        legend: {
            label: '',
            order: null // set in ../callbacks/onInit
        },
        resizable: false,
        width: 500,
        height: 350,
        margin: {
            left: 50
        }
    };
}
