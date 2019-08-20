import attachVariables from '../../util/attachVariables';
import defineStatusSet from '../../util/defineStatusSet';

export default function onInit() {
    attachVariables.call(this); // attach an array of data variables to chart object
    defineStatusSet.call(
        this,
        this.config.status_col,
        this.config.status_order_col,
        this.config.status_color_col
    );
}
