# Amazon India Dashboard

Interactive sales and order analysis built for the Sapphire IQ Amazon India Dashboard assignment. Open `index.html` in a modern browser. It includes the full dataset and works offline without a server, login, build step, or chart-library download.

## What it covers

- Overview: booked sales, recorded profit, distinct orders, units ordered, average order value, profit margin, delivered sales and delivered units, plus monthly sales/profit trends.
- Products: category sales, profit and units; top 10 products by booked sales.
- Order health: delivered, shipped, returned and cancelled orders; return/cancellation rates; category-level returns and cancellations; associated order value.
- Channels & markets: payment and fulfillment sales/profit; state sales/profit/orders.
- Global filters: inclusive start/end dates, category, state, order status, payment and fulfillment.
- Export: CSV of every source field for the currently selected orders.

## Source and scope

Original materials: [Sapphire IQ project folder](https://drive.google.com/drive/folders/1HQg0DXDs-HmjyoJYggrcRr51ocfPiVHc).

- Brief: `brief.pdf`, five pages.
- Source workbook: `data/Amazon Sales Data India.xlsx`, Sheet1, preserved without edits.
- 10,000 source rows, 13 fields, 10,000 unique order IDs.
- Date coverage: 1 January 2024 through 30 August 2026, across 32 months. August 2026 is partial. This is a source-data snapshot, not a live Amazon connection.
- No missing cells or duplicate rows. Product classifications are retained even where they appear unusual (for example, Laptop Backpack is in Electronics & Mobiles).
- The supplied educational dataset has not been authenticated as actual Amazon operating data.

## Metric definitions

All metrics follow the global filters, including the status filter.

| Metric | Definition |
|---|---|
| Booked sales | Sum of source Total_Sales_INR, including every selected status |
| Recorded profit | Sum of source Profit_INR |
| Orders | Distinct count of Order_ID |
| Units ordered | Sum of Quantity, including every selected status |
| Average order value | Booked sales / distinct orders |
| Profit margin | Recorded profit / booked sales |
| Delivered sales / units | Sales / quantity restricted to Delivered within the selected scope |
| Return rate | Returned orders / selected orders |
| Cancellation rate | Cancelled orders / selected orders |
| Returned & cancelled value | Sum of source sales on those statuses, not proven revenue loss |

The source retains positive sales on all 985 returned/cancelled orders, but records zero profit on them. Shipped orders also have recorded profit. Therefore, neither all-status sales nor all-status profit should be described as realized revenue or accounting profit. Refunds, recoveries, settlement amounts and underlying costs are unavailable. Discount is already reflected in Total_Sales_INR; it is not subtracted twice.

Selecting Returned as the status makes the return rate 100% by design. Reset status to All for the overall return rate. Undefined ratios display “—”. An empty or reversed date range returns no matching orders. Bar tooltips and tables provide exact values; abbreviated cards and bars use lakh/crore units.

## Rebuild and test

The delivered dashboard needs no dependencies. To rebuild it from the original workbook, use Python with pandas and openpyxl installed:

```text
python build.py
```

To run the JavaScript acceptance checks, use Node.js 18 or later:

```text
node test.mjs
```

`build.py` validates and exports all source rows, writes `data/audit.json`, and embeds the records into `index.html` from `dashboard.template.html`. It never edits the original workbook. `test.mjs` checks default totals, each dimension filter, an inclusive date range, a combined selection, empty results and grouping reconciliation. The recorded run passed 12/12 tests. Browser checks also verified navigation through all four sections and a returned-only selection. See `data/test-results.json` for automated results.

## Files

- `index.html`: ready-to-open standalone dashboard.
- `dashboard.template.html`: dashboard source template.
- `build.py`: reproducible preparation and source checks.
- `test.mjs`: automated dashboard calculation/filter checks.
- `ANALYSIS.md`: findings and business recommendations.
- `data/orders.csv` and `data/orders.json`: complete source-data exports.
- `data/audit.json`: exact totals and grouped reference values.
- `data/Amazon Sales Data India.xlsx`: unchanged original source.
- `brief.pdf`: supplied business requirements.

## GitHub handoff

Repository: https://github.com/modepallidineshbhargavchowdary-design/amazon-india-dashboard

Download the project and open `index.html` to explore the dashboard offline. For optional live hosting, enable GitHub Pages from the main branch root. The Sapphire IQ portal accepts this repository link for review. This public repository includes the supplied educational dataset. This is a browser-based implementation, not a Power BI PBIX file.
