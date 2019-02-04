const glob = require('glob');
require('babel-register');
const fs = require('fs');

glob(
    'src/**/settings-schema.js',
    function(error,files) {
        if (error) console.log(error)

        files.forEach(file => {
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
            const variables = settings
                .filter(setting => properties[setting]['data-mapping'])
                .map(setting => {
                    const property = properties[setting];
                    property.setting = setting;

                    return property;
                });
            variables.forEach(variable => {
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

            /*------------------------------------------------------------------------------------\
              Configuration markdown
            \------------------------------------------------------------------------------------*/

                fs.writeFile(
                    file.replace('settings-schema.js', 'data-guidelines-wiki.md'),
                    markdown.join('\n'),
                    (err) => {
                        if (err)
                            console.log(err);
                        console.log(`The ${renderer} data guidelines wiki markdown file was built!`);
                    });
        });
    }
);
