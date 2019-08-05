export default function syncSettings(settings) {
    settings.x.column = settings.date_col;
    settings.y.column = settings.participant_count_col;
    settings.marks[0].per[0] = settings.population_col;
    settings.color_by = settings.population_col;

    return settings;
}
