export default function defineSupersets() {
    if (this.variables.includes(this.config.population_superset_col)) {
        this.supersets = d3
            .set(this.raw_data.map(d => d[this.config.population_superset_col]))
            .values()
            .filter(value => this.config.color_dom.indexOf(value) > -1)
            .map(superset => {
                return {
                    population: superset,
                    subsets: d3
                        .set(
                            this.raw_data
                                .filter(d => d[this.config.population_col] !== superset)
                                .map(d => d[this.config.population_col])
                        )
                        .values()
                };
            });

        // Nest bars if the data contain population supersets.
        this.config.marks[0].arrange = this.supersets.length ? 'nested' : 'grouped';

        // Sort supersets last if the data do not contain an ordinal population vairable.
        if (this.supersets.length && !this.variables.includes(this.config.population_order_col)) {
            const supersets = this.supersets.map(superset => superset.population);
            this.config.legend.order = this.config.legend.order.sort(
                (a, b) => (supersets.includes(a) ? 1 : supersets.includes(b) ? -1 : a < b ? -1 : 1)
            ); // sort supersets last, otherwise alphabetically
        }
    }
}
