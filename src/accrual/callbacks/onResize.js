import addTooltipsToYAxis from './onResize/addTooltipsToYAxis';
import customizeTooltips from './onResize/customizeTooltips';
import addBarClick from './onResize/addBarClick';
import sortLegend from './onResize/sortLegend';
import customizeLegendLabels from './onResize/customizeLegendLabels';

export default function onResize() {
    addTooltipsToYAxis.call(this); // add tooltips to the y-axis tick labels with the category_info variable, if present in data
    customizeTooltips.call(this); // customize the bar tooltips
    addBarClick.call(this); // add a click event listener to bars
    sortLegend.call(this); // sort legend according to population order
    customizeLegendLabels.call(this); // add population totals to legend item labels
}
