The Enrollment over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots study enrollment over time by population.

## Data structure
one record per site per population per date between site activation and data snapshot date

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**site_col**|site|string|site variable name|**Y**|
|**date_col**|date|string|date variable name in YYYY-MM-DD format|**Y**|
|**population_col**|population|string|population|**Y**|
|**population_order_col**|population_order|string|population order||
|**population_color_col**|population_color|string|population color||
|**participant_count_col**|participant_count|string|participant count|**Y**|
