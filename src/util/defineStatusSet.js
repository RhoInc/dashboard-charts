export default function defineStatusSet(status_col, status_order_col, status_color_col) {
    const variables = Object.keys(this.raw_data[0]);

    //Define ordered status set.
    this.status_set = d3
        .set(
            this.raw_data.map(
                d => `${d[status_col]}:|:${d[status_order_col]}:|:${d[status_color_col]}`
            )
        )
        .values()
        .sort((a, b) => {
            const aSplit = a.split(':|:');
            const aValue = aSplit[0];
            const aOrder = aSplit[1];
            const aFloat = parseFloat(aOrder);

            const bSplit = b.split(':|:');
            const bValue = bSplit[0];
            const bOrder = bSplit[1];
            const bFloat = parseFloat(bOrder);

            const comparison =
                !isNaN(aFloat) && !isNaN(bFloat)
                    ? aFloat - bFloat
                    : aOrder < bOrder
                        ? -1
                        : bOrder < aOrder
                            ? 1
                            : aValue < bValue
                                ? -1
                                : 1;

            return comparison;
        });

    //Update color domain.
    if (!(Array.isArray(this.config.color_dom) && this.config.color_dom.length))
        this.config.color_dom = this.status_set.map(status => status.split(':|:')[0]);
    else
        this.config.color_dom = this.config.color_dom.concat(
            this.status_set
                .map(status => status.split(':|:')[0])
                .filter(status => this.config.color_dom.indexOf(status) < 0)
        );

    //Update colors.
    if (variables.indexOf(status_color_col) > -1)
        this.config.colors = this.status_set.map(status => status.split(':|:')[2]);

    //Update legend order.
    if (!(Array.isArray(this.config.legend.order) && this.config.legend.order.length))
        this.config.legend.order = this.status_set.map(status => status.split(':|:')[0]);
    else
        this.config.legend.order = this.config.legend.order.concat(
            this.status_set
                .map(status => status.split(':|:')[0])
                .filter(status => this.config.legend.order.indexOf(status) < 0)
        );
}
