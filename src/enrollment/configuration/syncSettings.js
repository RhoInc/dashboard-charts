export default function syncSettings(settings) {
    settings.x.column = settings.population_col;
    settings.y.column = settings.site_col;
    settings.marks[0].split = settings.population_col;
    settings.marks[0].per[0] = settings.site_col;
    settings.marks[0].tooltip = '[' + settings.population_col + ']: $x';
    settings.color_by = settings.population_col;

    return settings;
}
