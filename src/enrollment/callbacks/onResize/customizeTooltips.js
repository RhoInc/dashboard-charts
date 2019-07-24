import defaultTooltips from '../../../util/customizeTooltips';

export default function customizeTooltips() {
    const context = this;

    //Add single tooltip to entire bar group.
    if (this.supersets)
        this.svg.selectAll('.bar-group').each(function(d) {
            const tooltip = d.values
                .map(
                    di =>
                        context.supersets.map(superset => superset.population).includes(di.key)
                            ? `${di.key}: ${di.values.x}`
                            : `${di.key}: ${di.values.x} (${d3.format('.1%')(
                                  di.values.x /
                                      d.values.find(value =>
                                          context.supersets
                                              .map(superset => superset.population)
                                              .includes(value.key)
                                      ).values.x
                              )})`
                )
                .join('\n');

            d3.select(this)
                .selectAll('title')
                .text(tooltip);
        });
    else defaultTooltips.call(this);
}
