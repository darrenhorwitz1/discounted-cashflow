"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_item_1 = require("../line-item/line-item");
class FreeCashflow {
    constructor(period, dcf, discountRate) {
        this.lineItems = [];
        this.period = period;
        this.discountRate = discountRate;
        this.aggregateTotal = 0;
        this.dcf = dcf;
    }
    resetLineItems() {
        this.lineItems = [];
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
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
        let otherLineItems = [];
        let revenueList = [];
        let prev = this.previousPeriod(this.dcf);
        let next = this.nextPeriod(this.dcf);
        this.lineItems.forEach((item) => {
            if (item.getType() == line_item_1.ELineItemType.REVENUE) {
                revenueList.push(item);
            }
            else {
                otherLineItems.push(item);
            }
        });
        let total = 0;
        revenueList.forEach((item) => {
            item.applyForecast(undefined, prev, next);
            total += item.getAmount();
        });
        //TODO apply tax
        otherLineItems.forEach((item) => {
            item.applyForecast(undefined, prev, next);
            total += item.getAmount();
        });
        this.aggregateTotal = total;
    }
    nextPeriod(dcf) {
        let cfList = dcf.cashflows;
        if (this.period == cfList.length - 1) {
            return undefined;
        }
        else {
            return cfList[this.period + 1];
        }
    }
    previousPeriod(dcf) {
        if (this.period <= 0) {
            return undefined;
        }
        else {
            return dcf.cashflows[this.period - 1];
        }
    }
}
exports.default = FreeCashflow;
