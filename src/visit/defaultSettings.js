export const rendererSpecificSettings = {
    //required variables
    site_name: 'site_name',
    visit_name: 'visit_name',
    visit_status: 'visit_status',
    visit_number: 'visit_number', // should be short

    // Options
    site_filter: true,
    y_toggle: true
};

export const webchartsSettings = {
    resizable: false,
    width: 350,
    height: 500,

    x: {
        label: '',
        type: 'ordinal',
        column: null, // set in syncSettings
        domain: [
            'SCRN',
            'RAND',
            'V2',
            'V3',
            'V4',
            'V5',
            'V6',
            'V7',
            'V8',
            'V9',
            'V10',
            'V11',
            'V12',
            'V13',
            'V14'
        ]
    },
    y: {
        label: '',
        type: 'linear',
        column: null, // set in syncSettings
        behavior: 'flex',
        domain: [0, null]
    },
    marks: [
        {
            arrange: 'stacked',
            split: null, // set in syncSettings
            type: 'bar',
            per: [], // set in syncSettings
            attributes: { 'fill-opacity': 0.8 },
            summarizeY: 'count',
            tooltip: null // set in syncSettings
        }
    ],
    color_dom: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed'],
    color_by: null, // set in syncSettings
    colors: ['rgb(102,194,165)', 'rgb(43,131,186)', '#fecc5c', '#E87F00', 'red', '#9933ff'],
    legend: {
        label: '',
        order: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed']
    }
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.column = settings.visit_name;
    settings.y.column = settings.visit_status;
    settings.marks[0].split = settings.visit_status;
    settings.marks[0].per[0] = settings.visit_name;
    settings.marks[0].tooltip = '[' + settings.visit_status + ']: $y';
    settings.color_by = settings.visit_status;

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
