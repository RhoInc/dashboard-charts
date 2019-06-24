export default function setYFormat() {
    switch (this.config.marks[0].summarizeY) {
        case 'count':
            this.config.y.format = '1d';
            break;
        case 'percent':
            this.config.y.format = '%';
            break;
        default:
            this.config.y.format = null;
    }
}
