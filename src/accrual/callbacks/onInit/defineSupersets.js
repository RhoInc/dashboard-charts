export default function defineSupersets() {
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

    if (this.supersets.length) this.config.marks[0].arrange = 'nested';
}
