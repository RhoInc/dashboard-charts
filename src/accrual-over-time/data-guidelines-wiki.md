The Accrual over Time chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots study accrual over time by population.

## Data structure
one record per population per date between accrual start date and data snapshot date with a variable that captures the number of participants accrued in the given population on the given date

Notes:
- variables prefixed _filter:_ will appear as data filter controls
- accrual must be calculated within each level of the filter variable(s)
- target lines:
  - if a **filter-level target accrual** line is desired, e.g. within site, the data must include rows for each filter value with `population_col` set to _Target_
  - if a **study-level target accrual** line is desired, e.g. irrespective of site, the data must include rows without filter values and with set `population_col` to _Target_ 

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**population_col**|population|string|population|**Y**|
|**population_order_col**|population_order|string|population order||
|**population_color_col**|population_color|string|population color||
|**date_col**|date|string|date variable name in YYYY-MM-DD format|**Y**|
|**participant_count_col**|participant_count|string|participant count|**Y**|

## Example data
the first few records of the [test dataset](https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-accrual-over-time.csv):

| population | population_order | population_color | date | participant_count |
|:-----------|:-----------------|:-----------------|:-----|:------------------|
|Screened|1|#a6bddb|2015-01-01|0|
|Screened|1|#a6bddb|2015-01-02|0|
|Screened|1|#a6bddb|2015-01-03|0|