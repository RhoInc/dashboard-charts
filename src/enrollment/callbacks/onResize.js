export default function onResize() {
    const context = this;

    //Customize tooltips.
    this.svg
        .selectAll('.bar-group')
        .each(function(d) {
            d3.select(this)
                .selectAll('title')
                .text(
                    d.values
                        .map(value => `${value.key}: ${value.values.x}`)
                        .join('\n')
                );
        });

    //Manually sort legend.
    this.legend
        .selectAll('.legend-item')
        .sort((a,b) => this.config.legend.order.indexOf(b.label) - this.config.legend.order.indexOf(a.label));

    //Add population totals to legend labels.
    this.wrap.selectAll('.legend-label').each(function(d) {
        d3.select(this).text(
            d.label +
                ' (' +
                context.raw_data.filter(function(di) {
                    return di[context.config.population_col] === d.label;
                }).length +
                ')'
        );
    });
}
