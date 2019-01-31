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
        color_dom: ['Completed', 'Expected', 'Overdue', 'Missed'], // derived in ../callbacks/onInit
        color_by: null, // set in ./syncSettings
        colors: ['#4daf4a', '#377eb8', '#ff7f00', '#e41a1c', '#999999', '#999999'],
        legend: {
            label: '',
            order: null, // set in ../callbacks/onInit
            color_dom: [
                'Completed',
                'Expected',
                'Overdue',
                'Missed' // derived in ../callbacks/onInit
            ]
        },
        margin: {
            left: 50
        },
        width: 500,
        height: 350,
        resizable: false
    };
}
