import defineStatusSet from '../../util/defineStatusSet';

export default function onInit() {
    defineStatusSet.call(
        this,
        this.config.population_col,
        this.config.population_order_col,
        this.config.population_color_col
    );
    this.config.colors.reverse(); // reverse colors to match reversed legend order
    this.config.legend.order.reverse(); // reverse legend order to reverse order of bars

    //Check for population supersets.
    const supersets = d3
        .set(this.raw_data.map(d => d[this.config.population_superset_col]))
        .values()
        .filter(value => this.config.color_dom.indexOf(value) > -1);
    if (supersets.length) this.config.marks[0].arrange = 'nested';
}
