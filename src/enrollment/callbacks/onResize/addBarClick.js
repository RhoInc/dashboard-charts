export default function addBarClick() {
    const context = this;

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
                this.wrap
                    .style({
                        overflow: 'auto',
                    });

                // add a container for table and table header
                this.table = {};
                this.table.container = this.wrap
                    .append('div')
                    .style({
                        display: 'table',
                        width: '100%',
                    });
                this.table.title = this.table.container
                    .append('div')
                    .style({
                        display: 'inline-block',
                        'margin-right': '5px',
                        'font-size': '14px',
                        'font-weight': 'bold',
                    })
                    .text(`Displaying ${d.values.x} ${d.key} participants at ${d.values.y}`);
                this.table.backButton = this.table.container
                    .append('button')
                    .style({
                        float: 'right',
                    })
                    .text(`Back`)
                    .on('click', () => {
                        this.table.table.destroy();
                        this.table.container.remove();
                        this.svg.node().parentNode.style.display = null;
                        this.legend.style('display', null);
                        this.wrap
                            .style({
                                'overflow': null,
                            });
                    });

                // define and initialize table
                this.table.table = new webCharts.createTable(
                    this.table.container.node(),
                    {
                        searchable: false,
                        sortable: false,
                        pagination: true,
                        exportable: false,
                    }
                );
                this.table.table.on('layout', function() {
                    this.wrap.style({
                        width: '100%',
                        'margin-top': '5px',
                        'border-top': '1px solid #aaa'
                    });
                });
                this.table.table.init(
                    d.values.raw.map(di => {
                        const datum = Object.keys(di)
                            .filter(
                                key => (
                                    [
                                        this.config.population_col,
                                        this.config.population_superset_col,
                                        this.config.population_order_col,
                                        this.config.population_color_col,
                                        this.config.site_col,
                                        this.config.site_abbreviation_col,
                                    ].indexOf(key) < 0
                                )
                            )
                            .reduce(
                                (acc,cur) => {
                                    acc[cur] = di[cur];
                                    return acc;
                                },
                                {}
                            );

                        Object.keys(datum).forEach(key => {
                            if (key === this.config.id_col) {
                                Object.defineProperty(
                                    datum,
                                    'Participant ID',
                                    Object.getOwnPropertyDescriptor(
                                        datum,
                                        key
                                    )
                                );
                                delete datum[key];
                            }
                            if (/^filter/i.test(key)) {
                                Object.defineProperty(
                                    datum,
                                    key.replace(/^filter:/i, ''),
                                    Object.getOwnPropertyDescriptor(
                                        datum,
                                        key
                                    )
                                );
                                delete datum[key];
                            }
                        });

                        return datum;
                    })
                );
            });
    });
}
