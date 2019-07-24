const glob = require('glob');
require('babel-register');
const fs = require('fs');

const files = {
    css: fs.readFileSync('./src/_template_/test-page/index.css', 'utf8').split('\n'),
    html: fs.readFileSync('./src/_template_/test-page/index.html', 'utf8').split('\n'),
    js: fs.readFileSync('./src/_template_/test-page/index.js', 'utf8').split('\n'),
};

glob(
    'src/*/',
    (error,folders) => {
        if (error) console.log(error)

        folders 
            .filter(folder => !/_template_|util/.test(folder))
            .forEach(folder => {
                const main = folder.split('/')[1];
                const title = main.substring(0,1).toUpperCase() + main.substring(1).replace(/([A-Z])/g, ' $1');
                const csv = `https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-${title.toLowerCase().replace(/ /g, '-')}.csv`;

                Object.keys(files).forEach(key => {
                    const file = files[key];
                    const path = `${folder}/test-page/index.${key}`;
                    const data = file
                        .map(line => (
                            line.replace(/_main_/g, main)
                                .replace(/_title_/g, title)
                                .replace(/_csv_/g, csv)
                        ))
                        .join('\n');

                    fs.writeFile(
                        path,
                        data,
                        (err) => {
                            if (err) throw err;
                            console.log(`[ ${path} ] has been saved!`);
                        }
                    );
                });
        });
    }
);
