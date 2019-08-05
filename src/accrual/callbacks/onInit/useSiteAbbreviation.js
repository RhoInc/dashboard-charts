import defineSet from '../../../util/defineSet';

export default function useSiteAbbreviation() {
    this.config.useSite = this.raw_data[0].hasOwnProperty(this.config.site_col);
    this.config.useSiteAbbreviation = this.raw_data[0].hasOwnProperty(this.config.site_abbreviation_col);
    this.config.useSiteTooltip = this.raw_data[0].hasOwnProperty(this.config.site_tooltip_col);
    this.sites = defineSet.call(this, [this.config.site_col, this.config.site_abbreviation_col, this.config.site_tooltip_col]);

    if (this.config.useSiteAbbreviation) {
        this.config.y.column = this.config.site_abbreviation_col;
        this.config.marks[0].per[0] = this.config.site_abbreviation_col;
    }
}
