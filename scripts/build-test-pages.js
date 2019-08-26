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
                const name = folder.split('/')[1];
                const main = name.split('-').map((d,i) => i ? d.substring(0,1).toUpperCase() + d.substring(1) : d).join('');
                const title = main.substring(0,1).toUpperCase() + main.substring(1).replace(/([A-Z])/g, ' $1').replace(' Derived', ' (derived)');
                const csv = `https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-${name.replace('accrual-over-time-derived', 'accrual')}.csv`;

                Object.keys(files).forEach(key => {
                    const file = files[key];
                    const path1 = `${folder}/test-page/index.${key}`;
                    const path2 = `test-page/${name}/index.${key}`;
                    const data = file
                        .map(line => (
                            line.replace(/_main_/g, main)
                                .replace(/_title_/g, title)
                                .replace(/_csv_/g, csv)
                        ))
                        .join('\n');

                    fs.writeFile(
                        path1,
                        data,
                        (err) => {
                            if (err) throw err;
                            console.log(`[ ${path1} ] has been saved!`);
                        }
                    );
                    fs.writeFile(
                        path2,
                        data.replace('../../../dashboardCharts.js', '../../dashboardCharts.js'),
                        (err) => {
                            if (err) throw err;
                            console.log(`[ ${path2} ] has been saved!`);
                        }
                    );
                });
        });
    }
);
