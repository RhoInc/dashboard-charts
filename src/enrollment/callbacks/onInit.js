import captureFilters from '../../util/captureFilters';
import defineStatusSet from '../../util/defineStatusSet';
import defineSupersets from './onInit/defineSupersets';

export default function onInit() {
    captureFilters.call(this);
    defineStatusSet.call(
        this,
        this.config.population_col,
        this.config.population_order_col,
        this.config.population_color_col
    );
    this.config.colors.reverse(); // reverse colors to match reversed legend order
    this.config.legend.order.reverse(); // reverse legend order to reverse order of bars

    //Check for population supersets.
    defineSupersets.call(this);
}
