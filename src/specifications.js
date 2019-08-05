import accrual from './accrual/specification';
import visitCompletion from './visit-completion/specification';
import queries from './queries/specification';
import derivedAccrualOverTime from './derived-accrual-over-time/specification';
import accrualOverTime from './accrual-over-time/specification';
import forms from './forms/specification';

export default {
    accrual: accrual(),
    visitCompletion: visitCompletion(),
    queries: queries(),
    derivedAccrualOverTime: derivedAccrualOverTime(),
    accrualOverTime: accrualOverTime(),
    forms: forms()
};
