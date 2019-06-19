export default function webchartsSettings() {
    return {
        x: {
            type: 'time',
            column: null, // set in ./syncSettings
            label: '',
            format: '%b-%y'
        },
        y: {
            type: 'linear',
            column: null, // set in ./syncSettings
            label: '',
            behavior: 'firstfilter'
        },
        marks: [
            {
                type: 'line',
                per: [], // set in ./syncSettings
                summarizeY: 'sum',
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
        margin: {},
        date_format: '%Y-%m-%d'
    };
}
