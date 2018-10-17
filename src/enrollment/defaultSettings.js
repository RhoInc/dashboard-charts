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
    height: 500,

    y: {
        column: null, // set in syncSettings
        type: 'linear',
        behavior: 'firstfilter',
        label: ''
    },
    x: {
        column: null, // set in syncSettings
        type: 'time',
        label: '',
        format: '%b-%y'
    },
    marks: [
        {
            type: 'line',
            per: [], // set in syncSettings
            summarizeY: 'sum',
            tooltip: '$y'
        }
    ],
    date_format: '%Y-%m-%d',
    color_by: null, // set in syncSettings
    colors: ['#2b8cbe', '#a6bddb'],
    legend: {
        label: ''
    }
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.column = settings.date;
    settings.y.column = settings.number_participants;
    settings.marks[0].per[0] = settings.status;
    settings.color_by = settings.status;

    return settings;
}

export function syncControlInputs(settings) {
    const defaultControls = [];

    if (settings.site_filter) {
        defaultControls.push({
            type: 'subsetter',
            value_col: settings.site_name,
            label: 'Site',
            require: true
        });
    }

    return defaultControls;
}
