const glob = require('glob');
require('babel-register');
const fs = require('fs');
const request = require('request');
const d3 = require('d3');

glob(
    'src/**/settings-schema.mjs',
    function(error,files) {
        if (error) console.log(error)

        files
            .forEach(file => {
                console.log(file);
                const renderer = file.split('/')[1];
                const schema = require(`../${file}`).default;

                //Create markdown array, one item per line.
                const markdown = [
                    schema['data-guidelines'],
                    '',
                    '## Data structure',
                    schema['data-structure'],
                    '',
                    '## Data specification',
                    'required and optional variables:',
                    '',
                    '| Setting | Default | Data Type | Description | Required? |',
                    '|:--------|:--------|:----------|:------------|:---------:|',
                ];

                //Add variable table to markdown array.
                const properties = schema.properties;
                const settings = Object.keys(properties);
                const dataMappings = settings
                    .filter(setting => properties[setting]['data-mapping'])
                    .map(setting => {
                        const property = properties[setting];
                        property.setting = setting;

                        return property;
                    });
                dataMappings.forEach(variable => {
                    if (['string', 'number'].indexOf(variable.type) > -1)
                        markdown.push(
                            `|**${
                                variable.setting}**|${
                                variable.default}|${
                                variable.type}|${
                                variable.description.replace(/variable: /, '')}|${
                                variable.required ? '**Y**' : ''
                            }|`
                        );
                    else if (variable.type === 'array') {
                        variable.defaults.forEach((item,i) => {
                            markdown.push(
                                `|**${
                                    variable.setting}[${i}]**|${
                                    item}|${
                                    variable.type}|${
                                    variable.descriptions[item].replace(/variable: /, '')}|${
                                    variable.required ? '**Y**' : ''
                                }|`
                            )
                        });
                    } else
                        console.warn(`This wiki can't handle ${variable.type}s! Get outta here!`);
                });

                //Create markdown table with test data.
                markdown.push('');
                markdown.push('## Example data');
                console.log(schema);
                const dataFile = `https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/${schema['data-file']}.csv`;
                markdown.push(`the first few records of the [test dataset](https://github.com/RhoInc/data-library/blob/master/data/clinical-trials/data-cleaning/${schema['data-file']}.csv:`);
                console.log(markdown[markdown.length - 1]);
                markdown.push('');
                request.get(
                    dataFile,
                    function(error, response, body) {
                        console.log('----------------------------------------------------------------------------------------------------');
                        console.log(`  Reading ${dataFile}.`);
                        console.log('----------------------------------------------------------------------------------------------------');

                        if (!error && response.statusCode === 200) {
                            const data = d3.csv.parse(body);
                            console.log(data.slice(0,3));
                            const order = dataMappings.map(dataMapping => dataMapping.default);
                            const variables = Object.keys(data[0])
                                .filter(variable => dataMappings.map(dataMapping => dataMapping.default).indexOf(variable) > -1)
                                .sort((a,b) => {
                                    const aPos = dataMappings.map(dataMapping => dataMapping.default).indexOf(a);
                                    const bPos = dataMappings.map(dataMapping => dataMapping.default).indexOf(b);
                                    const diff = aPos > -1 && bPos > -1 ? aPos - bPos : 0;
                                    return diff ? diff : aPos > -1 ? -1 : bPos > -1 ? 1 : 0;
                                });
                            const headers = `| ${variables.join(' | ')} |`;
                            markdown.push(headers);
                            const columns = `|:${variables.map(variable => '-'.repeat(variable.length)).join('-|:')}-|`;
                            markdown.push(columns);
                            data.slice(0,3)
                                .map(d => `|${variables.map(variable => d[variable].split('\n')[0]).join('|')}|`)
                                .forEach(row => markdown.push(row));

                            /*------------------------------------------------------------------------------------\
                              Data guidelines markdown
                            \------------------------------------------------------------------------------------*/

                                fs.writeFile(
                                    file.replace('settings-schema.mjs', 'data-guidelines-wiki.md'),
                                    markdown.join('\n'),
                                    (err) => {
                                        if (err)
                                            console.log(err);
                                        console.log(`The ${renderer} data guidelines wiki markdown file was built!`);
                                    });
                        } else if (error) {
                            console.log('----------------------------------------------------------------------------------------------------');
                            console.log(`  Error: ${error}`);
                            console.log('----------------------------------------------------------------------------------------------------');
                        } else {
                            console.log('----------------------------------------------------------------------------------------------------');
                            console.log(`  Response status: ${response.statusCode} (${body})`);
                            console.log('----------------------------------------------------------------------------------------------------');
                        }
                    }
                );
        });
    }
);
