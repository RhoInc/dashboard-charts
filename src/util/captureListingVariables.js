export default function captureListingVariables() {
    this.config.listingVariables = Object.keys(this.raw_data[0])
        .filter(key => /^listing:/i.test(key))
        .map(key => {
            return {
                col: key,
                header: key.substring(key.indexOf(':') + 1)
            };
        });
}
