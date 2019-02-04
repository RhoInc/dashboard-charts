export default function webchartsSettings() {
    return {
        x: {
            type: 'linear',
            label: '',
            column: null, // set in ./syncSettings
            domain: [0, null],
            behavior: 'flex',
            format: '1d'
        },
        y: {
            type: 'ordinal',
            label: '',
            column: null // set in ./syncSettings
        },
        marks: [
            {
                type: 'bar',
                per: [], // set in ./syncSettings
                summarizeX: 'count',
                tooltip: null, // set in ./syncSettings
                split: null, // set in ./syncSettings
                arrange: 'grouped'
            }
        ],
        color_by: null, // set in ./syncSettings
        color_dom: ['Screened', 'Randomized'], // set in ../callbacks/onInit
        colors: ['#a6bddb', '#3690c0', '#034e7b'], // set in ../callbacks/onInit
        legend: {
            label: '',
            order: ['Screened', 'Randomized'] // set in ../callbacks/onInit
        },
        resizable: false,
        width: 500,
        height: 350,
        margin: {}
    };
}
