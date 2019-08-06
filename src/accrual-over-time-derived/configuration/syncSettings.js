export default function syncSettings(settings) {
    settings.x.column = settings.date_col;
    settings.y.column = 'count';
    settings.marks[0].per[0] = settings.population_col;
    settings.color_by = settings.population_col;

    return settings;
}
