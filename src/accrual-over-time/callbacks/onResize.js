import removeYAxisTicks from './onResize/removeYAxisTicks';
import addHover from './onResize/addHover';
import customizeTargetLines from './onResize/customizeTargetLines';

export default function onResize() {
    removeYAxisTicks.call(this);
    addHover.call(this);
    customizeTargetLines.call(this);
}
