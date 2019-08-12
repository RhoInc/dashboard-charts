//TODO: refactor, modularize
export default function addBarClick() {
    if (this.raw_data[0].hasOwnProperty(this.config.id_col)) {
        this.height = this.wrap.node().clientHeight;

        this.marks.forEach(mark => {
            this.svg
                .selectAll(`.wc-data-mark.${mark.type}`)
                .style({
                    cursor: 'pointer'
                })
                .on('click', d => {
                    // hide stuff
                    this.svg.node().parentNode.style.display = 'none';
                    this.legend.node().setAttribute('style', 'display: none !important');
                    this.wrap.style({
                        height: `${this.height}px`,
                        overflow: 'auto'
                    });

                    // add a container for table and table header
                    this.table = {};
                    this.table.container = this.wrap.append('div').style({
                        display: 'table',
                        width: '100%'
                    });
                    this.table.title = this.table.container
                        .append('div')
                        .style({
                            display: 'inline-block',
                            'margin-right': '5px',
                            'font-size': '14px',
                            'font-weight': 'bold'
                        })
                        .text(`Displaying ${d.values.x} ${d.key} participants at ${d.values.y}`);

                    // add back button
                    this.table.backButton = this.table.container
                        .append('button')
                        .style({
                            float: 'right'
                        })
                        .text(`Back`)
                        .on('click', () => {
                            this.table.table.destroy();
                            this.table.container.remove();
                            this.svg.node().parentNode.style.display = null;
                            this.legend.style('display', null);
                            this.wrap.style({
                                overflow: null
                            });
                        });

                    // define and initialize table
                    const cols = [
                        this.config.id_col,
                        ...this.config.filters.map(filter => filter.value_col),
                        ...this.config.listingVariables.map(listingVariable => listingVariable.col)
                    ];
                    if (this.raw_data[0].hasOwnProperty(this.config.date_col))
                        cols.splice(1, 0, this.config.date_col);
                    const headers = [
                        'Participant ID',
                        ...this.config.filters.map(filter => filter.label),
                        ...this.config.listingVariables.map(
                            listingVariable => listingVariable.header
                        )
                    ];
                    if (this.raw_data[0].hasOwnProperty(this.config.date_col))
                        headers.splice(1, 0, 'Accrual Date');
                    this.table.table = new webCharts.createTable(this.table.container.node(), {
                        cols,
                        headers,
                        searchable: false,
                        sortable: true,
                        pagination: false,
                        exportable: true
                    });
                    this.table.table.on('layout', function() {
                        this.wrap.style({
                            width: '100%',
                            'margin-top': '5px',
                            'border-top': '1px solid #aaa'
                        });
                    });
                    this.table.table.on('draw', function() {});
                    this.table.table.init(d.values.raw);

                    //Clear table when controls change.
                    this.controls.wrap.on('change', () => {
                        this.table.table.destroy();
                        this.table.container.remove();
                        this.svg.node().parentNode.style.display = null;
                        this.legend.style('display', null);
                        this.wrap.style({
                            overflow: null
                        });
                    });
                });
        });
    }
}
