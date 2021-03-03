"use strict";
class Revenue {
    constructor(amount = 0) {
        this.type = ELineItemType.REVENUE;
        this.amount = amount;
        this.postTaxAmount = amount;
    }
    getAmount() {
        return this.amount;
    }
    getType() {
        return this.type;
    }
    applyForecast(input, prevCFLineItem) {
        //cant grow without a Revenue line Item from T-1
        if (prevCFLineItem == undefined)
            return;
        let prevAmt = prevCFLineItem.getAmount();
        this.amount = prevAmt * (1 + input.getVariableAmount());
    }
    applyTax(input) {
        this.postTaxAmount = this.amount * input.getResidualMargin();
    }
    getPostTaxAmount() {
        return this.postTaxAmount;
    }
}
let t = new TaxRate(0.28);
let t1 = new Margin(0.5);
let r = new Revenue(100);
