export default function customizeTooltips() {
    const context = this;

    this.svg.selectAll('.bar-group').each(function(d) {
        d3.select(this)
            .selectAll('title')
            .text(
                context.config.marks[0].arrange === 'stacked'
                    ? `Total: ${d.total}\n${d.values
                          .map(
                              value =>
                                  ` - ${value.key}: ${value.values.raw.length} (${d3.format('.1%')(
                                      value.values.raw.length / d.total
                                  )})`
                          )
                          .join('\n')}`
                    : `${d.values
                          .map(value => `${value.key}: ${value.values.raw.length}`)
                          .join('\n')}`
            );
    });
}
