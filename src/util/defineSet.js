export default function defineSet(variables = []) {
    const set = d3
        .set(
            this.raw_data.map(d =>
                variables.map(variable => `${variable}-:-${d[variable]}`).join(':|:')
            )
        )
        .values()
        .map(value => {
            return value.split(':|:').reduce((acc, cur) => {
                const key = cur.split('-:-')[0];
                const value = cur.split('-:-')[1];
                acc[key] = value;
                return acc;
            }, {});
        });

    return set;
}
