import defineMultivariateSet from '../../../util/defineMultivariateSet';

export default function useCategoryAbbreviation() {
    const datum = this.raw_data[0];

    this.config.useCategory = datum.hasOwnProperty(this.config.category_col);
    this.config.useCategoryAbbreviation = datum.hasOwnProperty(
        this.config.category_abbreviation_col
    );
    this.config.useCategoryInfo = datum.hasOwnProperty(this.config.category_info_col);

    this.categories = defineMultivariateSet.call(this, [
        this.config.category_col,
        this.config.category_abbreviation_col,
        this.config.category_info_col
    ]);

    if (this.config.useCategoryAbbreviation) {
        this.config.y.column = this.config.category_abbreviation_col;
        this.config.marks[0].per[0] = this.config.category_abbreviation_col;
    }
}
