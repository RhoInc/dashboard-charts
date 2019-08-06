The Accrual chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants in each study populations by site.

## Data structure
one record per participant per population

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**site_col**|site|string|site|**Y**|
|**site_abbreviation_col**|site_abbreviation|string|site abbreviation||
|**site_info_col**|site_info|string|site info||
|**id_col**|subjid|string|participant ID||
|**population_col**|population|string|population|**Y**|
|**population_order_col**|population_order|string|population order||
|**population_color_col**|population_color|string|population color||
|**population_superset_col**|population_superset|string|population superset, e.g. the superset of the randomized population is the screened population||