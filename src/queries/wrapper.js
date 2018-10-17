//settings
import defaultSettings, { syncSettings, syncControlInputs } from './defaultSettings';

//webcharts
import { createControls, createChart } from 'webcharts';

//chart callbacks
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDataTransform from './onDataTransform';
import onDraw from './onDraw';
import onResize from './onResize';

export default function queries(element, settings) {
    //settings
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    const syncedSettings = syncSettings(mergedSettings);
    const syncedControlInputs = syncControlInputs(syncedSettings);
    const controls = createControls(element, { location: 'top', inputs: syncedControlInputs });
    const chart = createChart(element, syncedSettings, controls);

    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDataTransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    console.log(chart);

    return chart;
}
