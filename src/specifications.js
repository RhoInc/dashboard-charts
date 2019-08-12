import accrual from './accrual/specification';
import visitCompletion from './visit-completion/specification';
import queries from './queries/specification';
import accrualOverTimeDerived from './accrual-over-time-derived/specification';
import accrualOverTime from './accrual-over-time/specification';
import forms from './forms/specification';

export default {
    accrual: accrual(),
    visitCompletion: visitCompletion(),
    queries: queries(),
    accrualOverTimeDerived: accrualOverTimeDerived(),
    accrualOverTime: accrualOverTime(),
    forms: forms()
};
