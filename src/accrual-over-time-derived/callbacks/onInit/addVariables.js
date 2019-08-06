export default function addVariables() {
    this.raw_data.forEach(d => {
        d._date_ = d3.time.format(this.config.date_format).parse(d[this.config.date_col]);
        if (d.hasOwnProperty(this.config.site_col))
            d['filter:Site'] = d[this.config.site_col];
    });
}
