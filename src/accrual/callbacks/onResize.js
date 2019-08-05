import addTooltipsToYAxis from './onResize/addTooltipsToYAxis';
import customizeTooltips from './onResize/customizeTooltips';
import addBarClick from './onResize/addBarClick';
import sortLegend from './onResize/sortLegend';
import customizeLegendLabels from './onResize/customizeLegendLabels';

export default function onResize() {
    addTooltipsToYAxis.call(this);
    customizeTooltips.call(this);
    addBarClick.call(this);
    sortLegend.call(this);
    customizeLegendLabels.call(this);
}
