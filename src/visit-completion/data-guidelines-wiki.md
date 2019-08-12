The Visit Completion chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of participants by vist and visit status.

## Data structure
one record per participant per visit

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**site_col**|site|string|site|**Y**|
|**visit_col**|visit|string|visit|**Y**|
|**visit_order_col**|visit_order|string|visit order||
|**status_col**|status|string|visit status|**Y**|
|**status_order_col**|status_order|string|visit status order||
|**status_color_col**|status_color|string|visit status color||

## Example data
the first few records of the [test dataset](https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/data-cleaning/dashboard-visit-completion.csv):

| site | visit | visit_order | status | status_order | status_color |
|:-----|:------|:------------|:-------|:-------------|:-------------|
|Site 1|SCRN|0|Completed|1|#4daf4a|
|Site 1|SCRN|0|Completed|1|#4daf4a|
|Site 1|SCRN|0|Completed|1|#4daf4a|