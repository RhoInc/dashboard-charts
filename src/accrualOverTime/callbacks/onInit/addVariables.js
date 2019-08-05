export default function addVariables() {
    this.raw_data.forEach(d => {
        d._date_ = d3.time.format(this.config.date_format).parse(d[this.config.date_col]);
    });
}
