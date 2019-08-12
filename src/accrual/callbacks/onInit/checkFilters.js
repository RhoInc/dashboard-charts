import defineSet from '../../../util/defineSet';

export default function checkFilters() {
    //Remove y from filters array if present
    const ySet = this.config.userCategoryAbbreviation
        ? defineSet.call(this, this.config.category_abbreviation_col)
        : defineSet.call(this, this.config.category_col);
    this.config.filters = this.config.filters.filter(
        filter => ySet.join(',') !== filter.set.join(',')
    );
    this.controls.config.inputs = this.controls.config.inputs.filter(
        input => ySet.join(',') !== input.set.join(',')
    );
}
