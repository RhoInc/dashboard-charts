The Forms chart accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). It plots the number of forms by site and form status.

## Data structure
one record per form

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|**site_col**|site|string|site|**Y**|
|**status_col**|status|string|form status|**Y**|
|**status_order_col**|status_order|string|form status order||
|**status_color_col**|status_color|string|form status color||