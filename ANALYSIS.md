# Amazon India Dashboard: findings

Analysis of the supplied Sapphire IQ workbook, not verified Amazon operating results. Period: 1 January 2024 to 30 August 2026. All-status figures below include delivered, shipped, returned and cancelled records. Source: [project materials](https://drive.google.com/drive/folders/1HQg0DXDs-HmjyoJYggrcRr51ocfPiVHc); exact grouped controls are in `data/audit.json`.

## Overall performance

| Metric | Value |
|---|---:|
| Booked sales / recorded order value | ₹15,57,89,893.89 |
| Recorded profit | ₹3,31,67,008.49 |
| Orders | 10,000 |
| Units ordered | 24,926 |
| Average order value | ₹15,578.99 |
| Recorded profit margin | 21.29% |
| Delivered sales | ₹12,58,94,209.85 |
| Delivered orders | 8,147 |
| Delivered units | 20,257 |

July 2026 has the highest monthly booked sales at ₹64,43,679.00. That is 16.14% above July 2025, a comparison between complete like-for-like months. August 2026 ends on the 30th, so its total should not be treated as a full-month decline. The dashboard includes all monthly figures instead of assuming a consistent upward trend.

## Product concentration

Electronics & Mobiles contributes ₹12,35,69,507.07, or 79.32% of booked sales, and ₹2,63,10,257.24 of recorded profit. It also leads category order count and quantity. Home & Kitchen is next by sales at ₹1,79,73,218.93.

Laptop Backpack leads product booked sales at ₹2,65,29,187.41, followed by Power Bank 20000mAh at ₹2,55,48,449.07. These are source product labels and classifications, not independently validated product economics.

Recommendation: examine Electronics return reasons and supplier/product-level demand before increasing stock. Its high sales concentration makes performance sensitive to this category; the dataset alone does not establish whether expanding other categories would improve profit.

## Order health

| Status | Orders | Share | Booked value |
|---|---:|---:|---:|
| Delivered | 8,147 | 81.47% | ₹12,58,94,209.85 |
| Shipped | 868 | 8.68% | ₹1,42,46,941.40 |
| Returned | 485 | 4.85% | ₹79,60,583.45 |
| Cancelled | 500 | 5.00% | ₹76,88,159.19 |

Returned and cancelled orders together carry ₹1,56,48,742.64 of booked value, 10.04% of the total. This is not a measured financial loss: the file has no refund, recovery or settlement history. Their source recorded profit is zero.

Electronics has the highest category return rate at 5.39% (164 of 3,045 orders). Apparel & Fashion has the highest cancellation rate at 5.74% (148 of 2,580 orders).

Recommendation: investigate return reasons in Electronics and cancellation reasons in Apparel. Confirm stock accuracy, dispatch delays and customer feedback with operational records before assigning a cause.

## Channels and markets

- UPI leads payment methods with 4,972 orders, ₹7,85,15,436.26 booked sales and ₹1,66,53,494.14 recorded profit.
- Amazon (FBA) accounts for 7,054 orders, ₹10,75,28,288.07 booked sales and ₹2,28,82,414.52 recorded profit.
- Maharashtra leads states with 1,840 orders, ₹2,95,54,237.21 booked sales and ₹63,01,731.56 recorded profit. Karnataka is next by booked sales at ₹2,44,15,704.16.

Recommendation: prioritize availability and operational monitoring in the largest markets. Payment/fulfillment share alone does not prove that a channel is more efficient; fees, service levels and conversion data would be needed for a channel-shift decision.

## Checks and limits

The source contains 10,000 unique IDs with no missing cells or exact duplicate records. All 13 original fields and rows are preserved. Original stored sales are used rather than replacing them with recalculated rounded amounts. An independent calculation audit agreed with all default monetary totals and status counts; 12 automated dashboard tests passed.

The dataset has no customer IDs, delivery timestamps, actual settlements or accounting costs. Customer retention, delivery speed, net realized revenue and causal drivers cannot be calculated from it. The two embedded course recordings were not reviewed; implementation follows the full five-page written brief. No Power BI-specific requirement was stated in that brief, and the chosen deliverable is a standalone browser dashboard.
