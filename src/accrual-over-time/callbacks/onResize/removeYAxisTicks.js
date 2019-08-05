export default function removeYAxisTicks() {
    this.svg.selectAll('.y.axis .tick text').each(function(d) {
        // remove non-integer ticks
        if (d % 1)
            d3.select(this).remove();
    });
}
