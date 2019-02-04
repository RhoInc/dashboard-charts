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
        color_dom: ['Completed', 'Expected', 'Overdue', 'Missed', 'Terminated'], // set in ../callbacks/onInit
        colors: ['#4daf4a', '#377eb8', '#ff7f00', '#e41a1c', '#999999'], // set in ./syncSettings
        legend: {
            label: '',
            order: [
                'Completed',
                'Expected',
                'Overdue',
                'Missed',
                'Terminated' // set in ../callbacks/onInit
            ]
        },
        resizable: false,
        width: 500,
        height: 350,
        margin: {
            left: 50
        }
    };
}
