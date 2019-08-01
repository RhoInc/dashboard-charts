import customizeTooltips from './onResize/customizeTooltips';
import addBarClick from './onResize/addBarClick';
import sortLegend from './onResize/sortLegend';
import customizeLegendLabels from './onResize/customizeLegendLabels';

export default function onResize() {
    customizeTooltips.call(this);
    addBarClick.call(this);
    sortLegend.call(this);
    customizeLegendLabels.call(this);
}
