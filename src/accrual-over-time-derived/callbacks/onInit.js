import attachVariables from '../../util/attachVariables';
import addVariables from './onInit/addVariables';
import captureFilters from '../../util/captureFilters';
import defineStatusSet from '../../util/defineStatusSet';
import deriveData from './onInit/deriveData';

export default function onInit() {
    attachVariables.call(this); // attach an array of data variables to chart object
    addVariables.call(this);
    captureFilters.call(this);
    defineStatusSet.call(
        this,
        this.config.population_col,
        this.config.population_order_col,
        this.config.population_color_col
    );
    deriveData.call(this);
}
