The Derived Accrual over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots participant accrual over time by population, .

## Data structure
one record per participant per population with a date variable that captures the date of participant accrual in each population

Notes:
- variables prefixed _filter:_ will appear as data filter controls

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**population_col**|population|string|population|**Y**|
|**population_order_col**|population_order|string|population order||
|**population_color_col**|population_color|string|population color||
|**date_col**|date|string|date variable name in YYYY-MM-DD format|**Y**|

## Example data
the first few records of the [test dataset](https://github.com/RhoInc/data-library/blob/master/data/clinical-trials/data-cleaning/dashboard-accrual.csv:

| population | population_order | population_color | date |
|:-----------|:-----------------|:-----------------|:-----|
|Screened|1|#a6bddb|2015-05-21|
|Screened|1|#a6bddb|2015-05-30|
|Screened|1|#a6bddb|2015-08-13|