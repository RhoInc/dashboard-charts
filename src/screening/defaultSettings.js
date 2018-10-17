export const rendererSpecificSettings = {
    //required variables
    site_name: 'site_name',
    status: 'status',

    // Options
    site_filter: false,
};

export const webchartsSettings = {
    colors: ["#2b8cbe","#a6bddb" ],
    resizable: false,
    width: 350,
    height: 500,

    "y":{
    "label":"",
    "type":"ordinal",
    "column": null, // set in syncSettings
  },
  "x":{
    "label":"",
    "type":"linear",
    "column": null, // set in syncSettings
    "behavior": "firstfilter",
    "domain": [0, null]
  },
  "marks":[
    { "arrange":"nested",
      "split": null, // set in syncSettings
      "type":"bar",
      "per": [], // set in syncSettings
      "attributes": {"fill-opacity": 0.8},
      "summarizeX": "count",
      "tooltip": '' // set in syncSettings status
    }

],
  "color_by": null, // set in syncSettings
  color_dom: ['Randomized', 'Screened'],
  legend: {
    label: '',
      order: ['Randomized', 'Screened']
  },
 //margin: {left: 110},
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.column = settings.status;
    settings.y.column = settings.site_name;
    settings.marks[0].split = settings.status;
    settings.marks[0].per[0] = settings. site_name;
    settings.marks[0].tooltip = '[' + settings.status + ']: $x';
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
