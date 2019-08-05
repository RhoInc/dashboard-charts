export default function sortLegend() {
    //Manually sort legend.
    this.legend
        .selectAll('.legend-item')
        .sort(
            (a, b) =>
                this.config.legend.order.indexOf(b.label) -
                this.config.legend.order.indexOf(a.label)
        );
}
