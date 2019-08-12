export default function defineSimpleSet(variable) {
    const set = d3
        .set(this.raw_data.map(d => d[variable]))
        .values()
        .sort();

    return set;
}
