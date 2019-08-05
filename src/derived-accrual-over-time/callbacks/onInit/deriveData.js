export default function deriveData() {
    // define a full range of dates between enrollment start and snapshot date
    const dateRange = d3.time.day.range(
        d3.min(
            this.raw_data, d => d._date_
        ),
        d3.max(
            this.raw_data, d => d._date_
        ),
    );

    let n = dateRange.length * this.config.color_dom.length;
    this.config.filters.forEach(filter => {
        n = n * filter.set.length;
    });
    const perDate = new Array(n);
    let index = 0;

    // for each population
    this.config.color_dom.forEach(population => {
        const popSubset = this.raw_data.filter(d => d[this.config.population_col] === population);
        // for each date between enrollment start and shanpshot date
        dateRange.forEach(date => {
            const dateSubset = popSubset.filter(d => d._date_ <= date);
            if (!this.config.filters) {
                const datum = {
                    population,
                    date,
                    count: dateSubset.length,
                };
                perDate[index] = datum;
                index++;
            } else {
                this.config.filters.forEach(filter => {
                    filter.set.forEach(item => {
                        const filterSubset = dateSubset.filter(d => d[filter.value_col] === item[filter.value_col]);
                        const datum = {
                            population,
                            date,
                            [filter.value_col]: item[filter.value_col],
                            count: filterSubset.length,
                        };
                        perDate[index] = datum;
                        index++;
                    });
                });
            }
        });
    });

    this.raw_data = perDate;
}
