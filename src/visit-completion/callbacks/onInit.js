import attachVariables from '../../util/attachVariables';
import defineOrder from '../../util/defineOrder';
import defineStatusSet from '../../util/defineStatusSet';

export default function onInit() {
    attachVariables.call(this); // attach an array of data variables to chart object
    this.config.x.order = defineOrder(
        this.raw_data,
        this.config.visit_col,
        this.config.visit_order_col
    ).map(element => element.value);
    defineStatusSet.call(
        this,
        this.config.status_col,
        this.config.status_order_col,
        this.config.status_color_col
    );
}
