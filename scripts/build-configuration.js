require('babel-register');
var fs = require('fs');
var glob = require('glob');

function setDefault(setting) {
    let settingDefault = '**default:** ';

    if (setting.default === undefined && !setting.defaultObject) {
        settingDefault = settingDefault + 'none';
    } else if (setting.type === 'string') {
        settingDefault = settingDefault + '`"' + setting.default + '"`';
    } else if (['number', 'boolean'].indexOf(setting.type) > -1) {
        settingDefault = settingDefault + '`' + setting.default + '`';
    } else {
        settingDefault =
            settingDefault +
            '\n```\n' +
            JSON.stringify(setting.defaultObject, null, 2) +
            `\n\`\`\``;
    }

    if (setting.type !== 'object') return settingDefault;
}

glob(
    'src/**/settings-schema.js',
    function(error,files) {
        if (error) console.log(error)

        files.forEach(file => {
            const renderer = file.split('/')[1];
            const schema = require(`../${file}`).default;
            const webchartsSettings = require(`../${file.replace('settings-schema', 'configuration/webchartsSettings')}`).default();
            console.log(webchartsSettings);
            const properties = schema.properties;
            const markdown = [];

            /*------------------------------------------------------------------------------------\
              Overview
            \------------------------------------------------------------------------------------*/

                if (schema.overview)
                    schema.overview.split('\n').forEach(paragraph => {
                        markdown.push(paragraph);
                        markdown.push('');
                    });

            /*------------------------------------------------------------------------------------\
              Renderer-specific settings
            \------------------------------------------------------------------------------------*/

                markdown.push(`# Renderer-specific settings`);
                markdown.push(
                    `The sections below describe each ${renderer} setting as of version ${schema.version}.`
                );
                markdown.push(``);

                var keys = Object.keys(properties);
                keys.forEach((property, i) => {
                    var setting = properties[property];

                    markdown.push(`## settings.${property}`);
                    markdown.push(`\`${setting.type}\``);
                    markdown.push(``);
                    markdown.push(`${setting.description}`);

                    if (setting.type !== 'object') {
                        markdown.push(``);
                        markdown.push(setDefault(setting));
                    } else {
                        var subKeys = Object.keys(setting.properties);
                        subKeys.forEach((subProperty, i) => {
                            var subSetting = setting.properties[subProperty];
                            markdown.push(``);
                            markdown.push(`### settings.${property}.${subProperty}`);
                            markdown.push(`\`${subSetting.type}\``);
                            markdown.push(``);
                            markdown.push(`${subSetting.description || subSetting.title}`);
                            markdown.push(``);
                            markdown.push(setDefault(subSetting));
                        });
                    }

                    if (setting.type === 'array' && setting.items.type === 'object') {
                        var subKeys = Object.keys(setting.items.properties);
                        subKeys.forEach((subProperty, i) => {
                            var subSetting = setting.items.properties[subProperty];
                            markdown.push(``);
                            markdown.push(`### settings.${property}[].${subProperty}`);
                            markdown.push(`\`${subSetting.type}\``);
                            markdown.push(``);
                            markdown.push(`${subSetting.description || subSetting.title}`);
                            markdown.push(``);
                            markdown.push(setDefault(subSetting));
                        });
                    }

                    markdown.push(``);
                    markdown.push(``);
                    markdown.push(``);
                });

            /*------------------------------------------------------------------------------------------------\
              Webcharts settings
            \------------------------------------------------------------------------------------------------*/

                markdown.push(``);
                markdown.push(`# Webcharts settings`);
                markdown.push(`The object below contains each Webcharts setting as of version ${schema.version}.`);
                markdown.push(``);
                markdown.push('```');
                markdown.push(JSON.stringify(webchartsSettings, null, 4));
                markdown.push('```');

            /*------------------------------------------------------------------------------------------------\
              Configuration markdown
            \------------------------------------------------------------------------------------------------*/

                fs.writeFile(
                    file.replace('settings-schema.js', 'configuration.md'),
                    markdown.join('\n'),
                    err => {
                        if (err) console.log(err);
                        console.log('The configuration markdown file was built!');
                    }
                );
        });
    }
);
