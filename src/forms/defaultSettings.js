export const rendererSpecificSettings = {
    site_name: 'site_name',
    form_status: 'form_status',

    // Options
    y_toggle: true
};

export const webchartsSettings = {
    resizable: false,
    width: 350,
    height: 500,

    y: {
        type: 'linear',
        behavior: 'firstfilter'
    },
    x: {
        column: null, // set in syncSettings
        type: 'ordinal',
        label: ''
        //      "domain": ["Boston", "MUSC", "UCLA", "Pittsburgh", "Houston", "Michigan", "HSS", "Georgetown"]
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
    colors: ['rgb(102,194,165)', '#fecc5c', '#e34a33'],
    legend: {
        label: '',
        order: ['Received', 'Outstanding <= 90 days', 'Outstanding > 90 days']
    }
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.column = settings.site_name;
    settings.marks[0].split = settings.form_status;
    settings.marks[0].per[0] = settings.site_name;
    settings.color_by = settings.form_status;

    return settings;
}

export function syncControlInputs(settings) {
    const defaultControls = [];

    if (settings.y_toggle) {
        defaultControls.push({
            label: '',
            type: 'radio',
            option: 'marks[0].summarizeY',
            values: ['percent', 'count'],
            relabels: ['%', 'N']
        });
    }

    return defaultControls;
}
