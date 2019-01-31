export default function webchartsSettings() {
    return {
        x: {
            column: null, // set in ./syncSettings
            type: 'ordinal',
            label: ''
        },
        y: {
            type: 'linear',
            behavior: 'firstfilter'
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
        colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
        legend: {
            label: '',
            order: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days']
        },
        margin: {
            left: 50
        },
        resizable: false,
        width: 500,
        height: 350
    };
}
