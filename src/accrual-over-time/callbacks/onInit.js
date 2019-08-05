import defineStatusSet from '../../util/defineStatusSet';

export default function onInit() {
    defineStatusSet.call(
        this,
        this.config.population_col,
        this.config.population_order_col,
        this.config.population_color_col
    );
}
