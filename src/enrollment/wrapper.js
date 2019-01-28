//settings
import defaultSettings, { syncSettings, syncControlInputs } from './defaultSettings';

//webcharts
import { createControls, createChart } from 'webcharts';

//chart callbacks
import onResize from './onResize';

export default function enrollment(element, settings) {
    //settings
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    const syncedSettings = syncSettings(mergedSettings);
    const syncedControlInputs = syncControlInputs(syncedSettings);
    const controls = createControls(element, { location: 'right', inputs: syncedControlInputs });
    const chart = createChart(element, syncedSettings, controls);
    chart.settings = syncedSettings;
    chart.callbacks = {onResize};

    chart.on('resize', onResize);

    return chart;
}
