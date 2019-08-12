export default function customizeLegendLabels() {
    const context = this;

    //Add population totals to legend labels.
    this.wrap.selectAll('.legend-label').each(function(d) {
        d3.select(this).text(
            context.supersets &&
            !context.supersets.map(superset => superset.population).includes(d.label)
                ? d.label +
                  ': ' +
                  context.filtered_data.filter(function(di) {
                      return di[context.config.population_col] === d.label;
                  }).length +
                  ' (' +
                  d3.format('.1%')(
                      context.filtered_data.filter(function(di) {
                          return di[context.config.population_col] === d.label;
                      }).length /
                          context.filtered_data.filter(function(di) {
                              return context.supersets
                                  .map(superset => superset.population)
                                  .includes(di[context.config.population_col]);
                          }).length
                  ) +
                  ')'
                : d.label +
                  ': ' +
                  context.filtered_data.filter(function(di) {
                      return di[context.config.population_col] === d.label;
                  }).length +
                  ''
        );
    });
}
