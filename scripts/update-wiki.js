const glob = require('glob');
const fs = require('fs');

glob(
    'src/*/',
    (err,folders) => {
        if (err) throw(err)

        folders 
            .filter(folder => !/_template_|util/.test(folder))
            .forEach(folder => {
                const schemaPath = `${folder}/settings-schema.json`;
                fs.readFile(
                    schemaPath,
                    'utf8',
                    (err, data) => {
                        if (err) throw err;
                        const schema = JSON.parse(data);
                        console.log(schema);
                        const wikiFiles = [
                            {
                                src: `${folder}/configuration-wiki.md`,
                                dest: `dashboard-charts.wiki/${schema.title.replace(/ /g, '-')}---Configuration.md`,
                            },
                            {
                                src: `${folder}/data-guidelines-wiki.md`,
                                dest: `dashboard-charts.wiki/${schema.title.replace(/ /g, '-')}---Data-Guidelines.md`,
                            },
                        ];
                        wikiFiles.forEach(wikiFile => {
                            fs.copyFile(
                                wikiFile.src,
                                wikiFile.dest,
                                (err) => {
                                    if (err) throw(err);
                                }
                            );
                        });
                    }
                );
            });
    }
);
