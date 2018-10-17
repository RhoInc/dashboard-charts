export default function onResize() {
    var context = this;
    this.svg.selectAll('.y.axis .tick text').each(function(d) {
        if (d % 1)
            // if the tick label is not an integer then remove
            d3.select(this).remove();
    });
}
