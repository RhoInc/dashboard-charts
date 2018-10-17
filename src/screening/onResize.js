export default function onResize() {
    var context = this;
    this.svg.selectAll('.x.axis .tick text').each(function(d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
    //Add population totals to legend labels.

    this.wrap.selectAll('.legend-label').each(function(d) {
        d3.select(this).text(
            d.label +
                ' (' +
                context.raw_data.filter(function(di) {
                    return di.status === d.label;
                }).length +
                ')'
        );
    });
}
