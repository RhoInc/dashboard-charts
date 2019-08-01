import defineSet from '../../../util/defineSet';

export default function useSiteAbbreviation() {
    this.config.useSiteAbbreviation = this.raw_data[0].hasOwnProperty(this.config.site_abbreviation_col);
    if (this.config.useSiteAbbreviation) {
        this.config.y.column = this.config.site_abbreviation_col;
        this.config.marks[0].per[0] = this.config.site_abbreviation_col;
        this.sites = defineSet.call(this, [this.config.site_col, this.config.site_abbreviation_col]);
    } else {
        this.sites = defineSet.call(this, [this.config.site_col]);
    }
}
