import customizeTooltips from './onResize/customizeTooltips';
import sortLegend from './onResize/sortLegend';
import customizeLegendLabels from './onResize/customizeLegendLabels';

export default function onResize() {
    customizeTooltips.call(this);
    sortLegend.call(this);
    customizeLegendLabels.call(this);
}
