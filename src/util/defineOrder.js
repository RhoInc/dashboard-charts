export default function defineOrder(data, value_col, order_col) {
    //Define set of values.
    const values = d3.set(data.map(d => `${d[value_col]}:|:${d[order_col]}`)).values();

    //Order values.
    const orderedValues = values
        .map(value_order => {
            const [value, order] = value_order.split(':|:');
            return {
                value,
                order,
                float: parseFloat(order)
            };
        })
        .sort(
            (a, b) =>
                !isNaN(a.float) && !isNaN(b.float) // numerical comparison
                    ? a.float - b.float
                    : a.order < b.order // alphanumeric ordering - left-side order is smaller
                        ? -1
                        : b.order < a.order // alphanumeric ordering - right-side order is smaller
                            ? 1
                            : a.value < b.value // equal left- and right-side order - left-side value is smaller
                                ? -1
                                : 1 // equal left- and right-side order - right-side value is smaller
        );

    return orderedValues;
}
