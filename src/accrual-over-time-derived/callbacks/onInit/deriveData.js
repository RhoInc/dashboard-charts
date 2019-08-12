export default function deriveData() {
    // define a full range of dates between the first accrual and the last accrual
    const extent = d3.extent(this.raw_data, d => d._date_);
    const dateRange = d3.time.day.range(extent[0], extent[1]).concat(extent[1]);

    // calculate the number of records needed to capture all combinations of population, date, and filter values
    let n = dateRange.length * this.config.color_dom.length;
    this.config.filters.forEach(filter => {
        n = n * filter.set.length;
    });

    // instantiate a new array with as many elements as needed
    const perDate = new Array(n);
    let index = 0;

    // for each population
    this.config.color_dom.forEach(population => {
        const popSubset = this.raw_data.filter(d => d[this.config.population_col] === population);

        // for each date between first accrual and last accrual
        dateRange.forEach(date => {
            const dateSubset = popSubset.filter(d => d._date_ <= date);

            // without filters, we only need to count the number of participants accrued in that
            // population on or before the current date
            if (!this.config.filters) {
                const datum = {
                    population,
                    date,
                    count: dateSubset.length
                };
                perDate[index] = datum;
                index++;
            }
            // otherwise we need to apply each combination of filters to the data
            else {
                this.config.filterCombinations.forEach(filterCombination => {
                    const datum = {
                        population,
                        date
                    };
                    let filterSubset = dateSubset;
                    filterCombination.forEach((value, i) => {
                        const key = this.config.filters[i].value_col;
                        datum[key] = value;
                        filterSubset = filterSubset.filter(d => d[key] === value);
                    });
                    datum.count = filterSubset.length;
                    perDate[index] = datum;
                    index++;
                });
            }
        });
    });

    this.raw_data = perDate;
}
