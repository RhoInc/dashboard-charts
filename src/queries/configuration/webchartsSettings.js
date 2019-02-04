export default function webchartsSettings() {
    return {
        y: {
            type: 'linear',
            behavior: 'firstfilter',
            format: '1d'
        },
        x: {
            column: null, // set in syncSettings
            type: 'ordinal',
            label: ''
        },
        marks: [
            {
                arrange: 'stacked',
                split: null, // set in syncSettings
                type: 'bar',
                per: [], // set in syncSettings
                summarizeY: 'percent',
                tooltip: '$y'
            }
        ],
        color_by: null, // set in syncSettings
        color_dom: [
            'Resolved',
            'Outstanding <= 90 days',
            'Outstanding > 90 days'
        ], // set in ../callbacks/onInit
        colors: [
            '#66c2a5',
            '#fecc5c',
            '#e34a33'
        ], // set in ../callbacks/onInit
        legend: {
            label: '',
            order: [
                'Resolved',
                'Outstanding <= 90 days',
                'Outstanding > 90 days'
            ] // set in ../callbacks/onInit
        },
        resizable: false,
        width: 500,
        height: 350,
        margin: {
            left: 50
        },
    };
}
