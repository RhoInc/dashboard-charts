The Queries chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of queries by site and query status.

## Data structure
one record per query

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**site_col**|site|string|site|**Y**|
|**status_col**|status|string|query status|**Y**|
|**status_order_col**|status_order|string|query status order||
|**status_color_col**|status_color|string|query status color||

## Example data
the first few records of the [test dataset](https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-queries.csv):

| site | status | status_order | status_color |
|:-----|:-------|:-------------|:-------------|
|Site 1|Resolved|1|#66c2a5|
|Site 1|Resolved|1|#66c2a5|
|Site 1|Resolved|1|#66c2a5|