The Accrual chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants in each study populations by category.

## Data structure
one record per participant per population with a discrete variable that plots on the y-axis

Notes:
- variables prefixed _filter:_ will appear as data filter controls as well as columns in the data listing
- variables prefixed _listing:_ will appear as columns in the data listing

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**category_col**|category|string|category|**Y**|
|**category_abbreviation_col**|category_abbreviation|string|category abbreviation||
|**category_info_col**|category_info|string|category info||
|**id_col**|subjid|string|participant ID||
|**population_col**|population|string|population|**Y**|
|**population_order_col**|population_order|string|population order||
|**population_color_col**|population_color|string|population color||
|**population_superset_col**|population_superset|string|population superset, e.g. the superset of the randomized population is the screened population||
|**date_col**|date|string|date variable name in YYYY-MM-DD format||