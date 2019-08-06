import defineSet from './defineSet';

export default function captureFilters() {
    this.config.filters = Object.keys(this.raw_data[0])
        .filter(key => /^filter:/i.test(key))
        .map(key => {
            return {
                type: 'subsetter',
                label: key.substring(key.indexOf(':') + 1),
                value_col: key,
                set: defineSet.call(this, [key]),
            };
        });
    this.config.filters.forEach(filter => {
        this.controls.config.inputs.push(filter);
    });

    // Cartesian join with vanilla javascript (https://stackoverflow.com/a/43053803/4142034)
    const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
    const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
    this.config.filterCombinations = cartesian(...this.config.filters.map(filter => filter.set));
}
