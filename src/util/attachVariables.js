export default function attachVariables() {
    this.variables = Array.isArray(this.raw_data) && this.raw_data.length
        ? Object.keys(this.raw_data[0])
        : [];
}
