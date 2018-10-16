export const rendererSpecificSettings = {
    //required variables
    site_name: 'site_name',
    date: 'date',
    status: 'status',
    number_participants: 'number_participants',

    // Options
    site_filter: true
};

export const webchartsSettings = {
    resizable: false,
    width: 350,
    heught: 500,

    y: {
        column: 'number_participants',
        type: 'linear',
        behavior: 'firstfilter',
        label: ''
    },
    x: {
        column: 'date',
        type: 'time',
        label: '',
        format: '%b-%y'
    },
    marks: [
        {
            type: 'line',
            per: ['status'],
            summarizeY: 'sum',
            tooltip: '$y'
        }
    ],
    date_format: '%Y-%m-%d',
    color_by: 'status',
    colors: ['#2b8cbe', '#a6bddb'],
    legend: {
        label: ''
    }
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {}

export function syncControlInputs(settings) {
    console.log(settings);
    const defaultControls = [
        {
            type: 'subsetter',
            value_col: 'site_name',
            label: 'Site'
        }
    ];

    return defaultControls;
}
