import defineStatusSet from '../../../util/defineStatusSet';

export default function definePopulationSet() {
    //Define population set and update color domain, colors, and legend order.
    defineStatusSet.call(
        this,
        this.config.population_col,
        this.config.population_order_col,
        this.config.population_color_col
    );
    if (this.variables.includes(this.config.population_color_col)) this.config.colors.reverse(); // reverse colors to match reversed legend order
    this.config.legend.order.reverse(); // reverse legend order to reverse order of bars
}
