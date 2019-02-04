var fs = require('fs');
var glob = require('glob');

glob(
    'src/**/settings-schema.js',
    function(error,files) {
        if (error)
            console.log(error)
        console.log(files);
    }
);
