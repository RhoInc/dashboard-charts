const dashboardContainer = d3.select('#container');
const dataRoot = '../../data-library/data/clinical-trials/data-cleaning';//'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning';
const renderers = Object.keys(dashboardCharts.renderers)
    .map(function(renderer) {
        const rendererObj = {
            main: renderer,
            renderer: dashboardCharts.renderers[renderer],
            title: renderer.substring(0,1).toUpperCase() + renderer.substring(1).replace(/([A-Z])/g, ' $1'),
            specification: dashboardCharts.specifications[renderer],
        };
        rendererObj.csv = `${dataRoot}/${rendererObj.specification.schema['data-file']}.csv`;
        rendererObj.container = dashboardContainer
            .append('div')
            .classed('chart chart--' + renderer, true);
        rendererObj.header = rendererObj.container
            .append('div')
            .classed('chart__header', true)
            .html(
                rendererObj.title.replace(
                    'Derived',
                    '<span style = "cursor:help" title = "' +
                        'The accrual chart below displays participant accrual by population over time.\n' +
                        'It visualizes the same dataset as is used in the accrual bar chart.' +
                    '">&#9432;</span>'
                )
            );
        rendererObj.content = rendererObj.container
            .append('div')
            .classed('chart__content', true);
        rendererObj.instance = rendererObj.renderer(
            rendererObj.content.node(), // element
            {
                resizable: false,
                aspect: 2,
                width: null,
                height: null,
                range_band: null,
                scale_text: false,
            } // settings
        );
        rendererObj.data = fetch(rendererObj.csv).then(function(response) { return response.text(); });
        return rendererObj;
    });

Promise
    .all(renderers.map(function(renderer) { return renderer.data; }))
    .then(function(texts) {
        return texts.map(function(text) { return d3.csv.parse(text); });
    })
    .then(function(dataArrays) {
        dataArrays.forEach(function(dataArray,i) {
            const renderer = renderers[i];
            renderer.instance.init(dataArray);
            renderer.header.node().appendChild(renderer.instance.controls.wrap.node());
        });
    });
