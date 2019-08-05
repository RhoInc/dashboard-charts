export default function addTooltipsToYAxis() {
    if (this.config.useSite) {
        this.svg
            .selectAll('.y.axis .tick * title')
            .remove();
        this.svg
            .selectAll('.y.axis .tick *')
            .style({
                cursor: 'help',
            })
            .append('title')
            .text(d => (
                this.sites
                    .find(site => (
                        this.config.useSiteAbbreviation
                            ? site[this.config.site_abbreviation_col] === d
                            : site[this.config.site_col] === d
                    ))[this.config.useSiteTooltip ? this.config.site_tooltip_col : this.config.site_col]
            ));
    }
}
