export default function captureFilters() {
    const filters = Object.keys(this.raw_data[0])
        .filter(key => /^filter:/i.test(key))
        .map(key => {
            return {
                type: 'subsetter',
                label: key.substring(key.indexOf(':') + 1),
                value_col: key,
            };
        });
    filters.forEach(filter => {
        this.controls.config.inputs.push(filter);
    });

    return filters;
}
