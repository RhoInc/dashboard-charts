import addVariables from './onInit/addVariables';
import captureFilters from '../../util/captureFilters';
import defineStatusSet from '../../util/defineStatusSet';

export default function onInit() {
    addVariables.call(this);
    captureFilters.call(this);
    defineStatusSet.call(
        this,
        this.config.population_col,
        this.config.population_order_col,
        this.config.population_color_col
    );
}
