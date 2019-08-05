const dashboardContainer = d3.select('#container');
const dataRoot = '../../data-library/data/clinical-trials/data-cleaning';//'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning';
const renderers = Object.keys(dashboardCharts.renderers)
    .map(function(renderer) {
        console.log(renderer);
        const rendererObj = {
            main: renderer,
            renderer: dashboardCharts.renderers[renderer],
            title: renderer.substring(0,1).toUpperCase() + renderer.substring(1).replace(/([A-Z])/g, ' $1'),
            specification: dashboardCharts.specifications[renderer],
        };
        console.log(rendererObj.specification.schema);
        rendererObj.csv = `${dataRoot}/${rendererObj.specification.schema['data-file']}.csv`;
        console.log(rendererObj.csv);
        //rendererObj.csv = 'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-'
            + rendererObj.title.toLowerCase().replace(/ /g, '-')
            + '.csv';
        rendererObj.container = dashboardContainer
            .append('div')
            .classed('chart chart--' + renderer, true);
        rendererObj.header = rendererObj.container
            .append('div')
            .classed('chart__header', true)
            .text(rendererObj.title);
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
