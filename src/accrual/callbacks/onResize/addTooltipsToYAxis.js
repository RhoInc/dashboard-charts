export default function addTooltipsToYAxis() {
    this.svg.selectAll('.y.axis .tick * title').remove();
    this.svg
        .selectAll('.y.axis .tick *')
        .style({
            cursor: 'help'
        })
        .append('title')
        .text(
            d =>
                this.categories.find(
                    category =>
                        this.config.useCategoryAbbreviation
                            ? category[this.config.category_abbreviation_col] === d
                            : category[this.config.category_col] === d
                )[
                    this.config.useCategoryInfo
                        ? this.config.category_info_col
                        : this.config.useCategory
                            ? this.config.category_col
                            : this.config.category_abbreviation_col
                ]
        );
}
