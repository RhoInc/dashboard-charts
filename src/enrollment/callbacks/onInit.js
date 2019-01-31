export default function onInit() {
    //Define population order.
    const populations = d3.set(this.raw_data.map(d => `${d[this.config.population_col]}:|:${d[this.config.population_order_col]}`))
        .values()
        .sort((a,b) => {
            const aSplit = a.split(':|:');
            const bSplit = b.split(':|:');
            const aPopulation = aSplit[0];
            const bPopulation = bSplit[0];
            const aOrder = parseInt(aSplit[1]);
            const bOrder = parseInt(bSplit[1]);
            const comparison = !isNaN(aOrder) && !isNaN(bOrder)
                ? bOrder - aOrder // ensures grouped/nested bars are drawn logically
                : aPopulation < bPopulation ? -1 : 1;

            return comparison;
        })
        .map(value => value.split(':|:')[0]);
    this.config.color_dom = populations.slice();
    this.config.colors = this.config.colors.slice(0, populations.length).reverse();
    this.config.legend.order = populations.slice();

    //Check for population supersets.
    const supersets = d3.set(this.raw_data.map(d => d[this.config.population_superset_col]))
        .values()
        .filter(value => populations.indexOf(value) > -1);
    if (supersets.length)
        this.config.marks[0].arrange = 'nested';
}
