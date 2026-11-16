from pathlib import Path
import json
import pandas as pd

ROOT = Path(__file__).parent
source = ROOT / 'data' / 'Amazon Sales Data India.xlsx'
df = pd.read_excel(source)
assert len(df) == 10000
assert df.Order_ID.is_unique
assert df.notna().all().all()
assert (df.Quantity > 0).all()
dates = pd.to_datetime(df.Order_Date, format='%Y-%m-%d', errors='raise')
assert set(df.Order_Status) == {'Delivered','Shipped','Returned','Cancelled'}
assert (df[['Total_Sales_INR','Profit_INR']] >= 0).all().all()
# Keep all 13 original fields and every row; no source workbook edits.
rows = df.values.tolist()
(ROOT/'data'/'orders.json').write_text(json.dumps({'columns':df.columns.tolist(),'rows':rows},separators=(',',':')),encoding='utf-8')
df.to_csv(ROOT/'data'/'orders.csv',index=False)
summary = {'orders':len(df),'units':int(df.Quantity.sum()),'sales':round(float(df.Total_Sales_INR.sum()),2),'profit':round(float(df.Profit_INR.sum()),2),'date_min':str(dates.min().date()),'date_max':str(dates.max().date()),'statuses':df.Order_Status.value_counts().to_dict(),'missing_cells':int(df.isna().sum().sum()),'duplicate_order_ids':int(df.Order_ID.duplicated().sum())}
for status in ['Delivered','Shipped','Returned','Cancelled']:
    s=df[df.Order_Status==status]
    summary[status]={'orders':len(s),'sales':round(float(s.Total_Sales_INR.sum()),2),'profit':round(float(s.Profit_INR.sum()),2)}
for field in ['Category','Product','Ship_State','Payment_Method','Fulfillment']:
    summary[field]=df.groupby(field).agg(sales=('Total_Sales_INR','sum'),profit=('Profit_INR','sum'),orders=('Order_ID','nunique'),units=('Quantity','sum')).round(2).sort_values('sales',ascending=False).reset_index().to_dict('records')
(ROOT/'data'/'audit.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
template=(ROOT/'dashboard.template.html').read_text(encoding='utf-8')
(ROOT/'index.html').write_text(template.replace('__DATA__',json.dumps(rows,separators=(',',':')).replace('</','<\\/')),encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k not in ['Category','Product','Ship_State','Payment_Method','Fulfillment']},indent=2))
