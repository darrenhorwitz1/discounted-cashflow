"use strict";
class FreeCashflow {
    constructor(period, discountRate) {
        this.lineItems = [];
        this.period = period;
        this.discountRate = discountRate;
        this.aggregateTotal = 0;
    }
    setPeriod(period) {
        this.period = period;
    }
    setDiscountRate(discountRate) {
        this.discountRate = discountRate;
    }
    currentPeriod() {
        return this.period;
    }
    getLineItems() {
        return this.lineItems;
    }
    discountCashflow() {
        var _a;
        this.aggregateLineItems();
        if (this.discountRate != undefined)
            return ((_a = this.discountRate) === null || _a === void 0 ? void 0 : _a.getFactor(this.period)) * this.aggregateTotal;
        return null;
    }
    aggregateLineItems() {
        let total = 0;
        this.lineItems.forEach((item) => {
            total += item.getAmount();
        });
        this.aggregateTotal = total;
    }
    nextPeriod(dcf) {
        throw new Error("Method not implemented.");
    }
    previousPeriod(dcf) {
        throw new Error("Method not implemented.");
    }
}
