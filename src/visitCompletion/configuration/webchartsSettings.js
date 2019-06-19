export default function webchartsSettings() {
    return {
        x: {
            label: '',
            type: 'ordinal',
            column: null // set in ./syncSettings
        },
        y: {
            label: '',
            type: 'linear',
            column: null, // set in ./syncSettings
            behavior: 'flex',
            domain: [0, null]
        },
        marks: [
            {
                type: 'bar',
                per: [], // set in syncSettings
                summarizeY: 'count',
                tooltip: null, // set in ./syncSettings
                split: null, // set in ./syncSettings
                arrange: 'stacked'
            }
        ],
        color_by: null, // set in ./syncSettings
        color_dom: null, // set in ../callbacks/onInit
        colors: null, // set in ./syncSettings
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
