import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const nodes=new Map();
function element(id){if(!nodes.has(id))nodes.set(id,{value:'',innerHTML:'',textContent:'',addEventListener(){}});return nodes.get(id)}
const ctx={document:{getElementById:element,querySelectorAll:()=>[]},window:{},console,Intl,Map,Set,Blob,URL,setTimeout};
vm.createContext(ctx);vm.runInContext(js,ctx);
function eq(actual,expected){assert.ok(Math.abs(actual-expected)<0.005,`${actual} != ${expected}`)}
const tests=[];
function test(name,fn){fn();tests.push({name,result:'PASS'})}
const state=()=>ctx.window.dashboardState;
const run=code=>vm.runInContext(code,ctx);
test('Default totals agree with independent pandas audit',()=>{assert.equal(state().orders,10000);eq(state().sales,155789893.89);eq(state().profit,33167008.49);assert.equal(state().units,24926);assert.equal(state().months,32);eq(state().deliveredSales,125894209.85)});
test('Delivered-only filter',()=>{element('status').value='Delivered';run('render()');assert.equal(state().orders,8147);eq(state().sales,125894209.85);eq(state().profit,29697472.88);assert.equal(state().units,20257)});
test('Returned-only filter and denominator',()=>{element('status').value='Returned';run('render()');assert.equal(state().orders,485);eq(state().sales,7960583.45);eq(state().profit,0);assert.ok(element('rates').innerHTML.includes('100.00%'))});
test('Cancelled-only filter',()=>{element('status').value='Cancelled';run('render()');assert.equal(state().orders,500);eq(state().sales,7688159.19)});
test('Category filter',()=>{run('reset()');element('category').value='Electronics & Mobiles';run('render()');assert.equal(state().orders,3045);eq(state().sales,123569507.07)});
test('State filter',()=>{run('reset()');element('state').value='Maharashtra';run('render()');assert.equal(state().orders,1840);eq(state().sales,29554237.21)});
test('Payment filter',()=>{run('reset()');element('payment').value='UPI';run('render()');assert.equal(state().orders,4972);eq(state().sales,78515436.26)});
test('Fulfillment filter',()=>{run('reset()');element('fulfillment').value='Amazon (FBA)';run('render()');assert.equal(state().orders,7054);eq(state().sales,107528288.07)});
test('Date range inclusive and monthly aggregation',()=>{run('reset()');element('from').value='2026-07-01';element('to').value='2026-07-31';run('render()');eq(state().sales,6443679);assert.equal(state().orders,374);assert.equal(state().months,1)});
test('Empty/reversed date range is safe',()=>{element('from').value='2026-08-30';element('to').value='2024-01-01';run('render()');assert.equal(state().orders,0);assert.ok(element('kpis').innerHTML.includes('—'));assert.ok(!element('kpis').innerHTML.includes('NaN'))});
test('Combined filter intersection',()=>{run('reset()');element('category').value='Electronics & Mobiles';element('status').value='Delivered';run('render()');assert.equal(state().orders,2465);eq(state().sales,99520790.80)});
test('Grouped amounts reconcile to all source rows',()=>{run('reset()');for(const col of [1,2,3,9,10,11,12]){const totals=run(`group(RAW,${col}).reduce((a,g)=>({sales:a.sales+g.sales,profit:a.profit+g.profit,orders:a.orders+g.orders}),{sales:0,profit:0,orders:0})`);eq(totals.sales,155789893.89);eq(totals.profit,33167008.49);assert.equal(totals.orders,10000)}});
fs.writeFileSync(new URL('data/test-results.json',import.meta.url),JSON.stringify({tests,passed:tests.length,total:tests.length},null,2));
console.log(`${tests.length}/${tests.length} tests passed`);
console.log(tests.map(x=>`${x.result} ${x.name}`).join('\n'));
