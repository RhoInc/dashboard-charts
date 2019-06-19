export default function webchartsSettings() {
    return {
        x: {
            column: null,
            type: null,
            label: null
        },
        y: {
            column: null,
            type: null,
            label: null
        },
        marks: [
            {
                type: null,
                per: null,
                summarizeX: null,
                summarizeY: null
            }
        ],
        color_by: null,
        color_dom: null,
        colors: null,
        legend: {
            label: null,
            order: null
        },
        resizable: false,
        width: 500,
        height: 350,
        margin: {
            left: 50
        }
    };
}
