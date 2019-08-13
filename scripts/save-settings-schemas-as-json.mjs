import fs from 'fs';

import accrual from '../src/accrual/settings-schema.mjs';
import accrualOverTime from '../src/accrual-over-time/settings-schema.mjs';
import accrualOverTimeDerived from '../src/accrual-over-time-derived/settings-schema.mjs';
import forms from '../src/forms/settings-schema.mjs';
import queries from '../src/queries/settings-schema.mjs';
import visitCompletion from '../src/visit-completion/settings-schema.mjs';

function saveSchema(folder, schema) {
    fs.writeFile(
        `./src/${folder}/settings-schema.json`,
        JSON.stringify(schema, null, 4),
        (err) => {
            if (err)
                console.log(err);
            console.log(`Successfully saved the ${folder} settings schema!`);
        }
    );
}

saveSchema('accrual', accrual);
saveSchema('accrual-over-time', accrualOverTime);
saveSchema('accrual-over-time-derived', accrualOverTimeDerived);
saveSchema('forms', forms);
saveSchema('queries', queries);
saveSchema('visit-completion', visitCompletion);
