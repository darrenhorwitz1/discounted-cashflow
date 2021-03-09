import FreeCashflow from "./src/cashflow/free-cashflow";
import DiscountedCashflow from "./src/dcf/discounted-cashflow";
import DiscountRate from "./src/input-variables/discount-rate";
import ITaxRate from "./src/input-variables/ITaxRate";
import GrowthRate from "./src/input-variables/variables/growth-rate";
import Margin from "./src/input-variables/variables/margin";
import TaxRate from "./src/input-variables/variables/tax-rate";
import Expense from "./src/line-item/line-items.ts/expense";
import Revenue from "./src/line-item/line-items.ts/revenue";

let myDcf: DiscountedCashflow = new DiscountedCashflow();
let discountRate: DiscountRate = new DiscountRate(0.2);
let tax: ITaxRate = new TaxRate(0.2);

let cf0 = new FreeCashflow(0, myDcf, discountRate,tax);
let cf1 = new FreeCashflow(1, myDcf, discountRate,tax);
let cf2 = new FreeCashflow(2, myDcf, discountRate,tax);
let cf3 = new FreeCashflow(3, myDcf, discountRate,tax);
let cf4 = new FreeCashflow(4, myDcf, discountRate,tax);
let cf5 = new FreeCashflow(5, myDcf, discountRate,tax);

let baseRev: Revenue = new Revenue(100, new GrowthRate(0));
let nextRev: Revenue = new Revenue(0, new GrowthRate(0.1));
let expense: Expense = new Expense(0,new Margin(0.1))

//revenues
cf0.addLineItem(baseRev);
cf1.addLineItem(nextRev);
cf2.addLineItem(nextRev);
cf3.addLineItem(nextRev);
cf4.addLineItem(nextRev);
cf5.addLineItem(nextRev);
//adding expenses
cf0.addLineItem(expense);
cf1.addLineItem(expense);
cf2.addLineItem(expense);
cf3.addLineItem(expense);
cf4.addLineItem(expense);
cf5.addLineItem(expense);

myDcf.addCashflow(cf0);
myDcf.addCashflow(cf1);
myDcf.addCashflow(cf2);
myDcf.addCashflow(cf3);
myDcf.addCashflow(cf4);
myDcf.addCashflow(cf5);

myDcf.calculatePresentValue();
console.log(myDcf.presentValue);
