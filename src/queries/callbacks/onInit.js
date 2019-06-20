import defineStatusSet from '../../util/defineStatusSet';

export default function onInit() {
    defineStatusSet.call(
        this,
        this.config.status_col,
        this.config.status_order_col,
        this.config.status_color_col
    );
}
