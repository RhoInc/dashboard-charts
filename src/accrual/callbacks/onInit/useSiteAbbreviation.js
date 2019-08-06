import defineSet from '../../../util/defineSet';

export default function useSiteAbbreviation() {
    const datum = this.raw_data[0];
    this.config.useSite = datum.hasOwnProperty(this.config.site_col);
    this.config.useSiteAbbreviation = datum.hasOwnProperty(this.config.site_abbreviation_col);
    this.config.useSiteInfo = datum.hasOwnProperty(this.config.site_info_col);
    this.sites = defineSet.call(this, [
        this.config.site_col,
        this.config.site_abbreviation_col,
        this.config.site_info_col
    ]);

    if (this.config.useSiteAbbreviation) {
        this.config.y.column = this.config.site_abbreviation_col;
        this.config.marks[0].per[0] = this.config.site_abbreviation_col;
    }
}
