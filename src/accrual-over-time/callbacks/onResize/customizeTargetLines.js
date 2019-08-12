export default function customizeTargetLines() {
    // Update lines in chart.
    this.marks.filter(mark => mark.type === 'line').forEach(mark => {
        mark.paths.each(function(d) {
            if (/target/i.test(d.key)) this.setAttribute('stroke-dasharray', '2 4');
        });
    });

    // Update lines in legend.
    this.legend.selectAll('.legend-item').each(function(d) {
        const line = this.getElementsByTagName('line')[0];
        line.setAttribute('stroke-width', '4px');
        if (/target/i.test(d.label)) line.setAttribute('stroke-dasharray', '3 2');
    });
}
