import attachVariables from '../../util/attachVariables';
import captureFilters from '../../util/captureFilters';
import captureListingVariables from '../../util/captureListingVariables';
import useCategoryAbbreviation from './onInit/useCategoryAbbreviation';
import definePopulationSet from './onInit/definePopulationSet';
import checkFilters from './onInit/checkFilters';
import defineSupersets from './onInit/defineSupersets';

export default function onInit() {
    attachVariables.call(this); // attach an array of data variables to chart object
    captureFilters.call(this); // check for data properties prefixed "filter:"
    captureListingVariables.call(this); // check for data properties prefixed "listing:"
    useCategoryAbbreviation.call(this); // use abbreviated category variable if present in data
    definePopulationSet.call(this); // define population set with population name, order, and color
    checkFilters.call(this); // remove any filter variables with the same discrete values the y-axis variable contains
    defineSupersets.call(this); // check for population superset, e.g. Screened is a superset of Randomized, and set the bar arrangement to nested accordingly
}
