export const rendererSpecificSettings = {
    //required variables
    site_name: 'site_name',
    // not using these yet    date: 'date',
    status: 'status',
    number_participants: 'number_participants',

    // Options
    site_filter: true
};

export const webchartsSettings = {
    resizable: false,
    width: 350,
    height: 500,

    x: {
        label: '',
        type: 'ordinal',
        column: 'visit_name',
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
        column: 'visit_status',
        behavior: 'flex',
        domain: [0, null]
    },
    marks: [
        {
            arrange: 'stacked',
            split: 'visit_status',
            type: 'bar',
            per: ['visit_name'],
            attributes: { 'fill-opacity': 0.8 },
            summarizeY: 'count',
            tooltip: '[visit_status]: $y'
        }
    ],
    color_dom: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed'],
    color_by: 'visit_status',
    colors: ['rgb(102,194,165)', 'rgb(43,131,186)', '#fecc5c', '#E87F00', 'red', '#9933ff'],
    legend: {
        label: '',
        order: ['In Window', 'Expected', 'Out of Window', 'Overdue', 'Missed']
    }
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
  return settings;
}

export function syncControlInputs(settings) {

    const defaultControls =
        [
            {
                type: 'subsetter',
                value_col: 'site_name',
                label: 'Site',
                require: true
            },
            {
                label: '',
                type: 'radio',
                option: 'marks[0].summarizeY',
                values: ['percent', 'count'],
                relabels: ['%', 'N']
            }
        ];
    return defaultControls;
}
