"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_item_1 = require("../line-item/line-item");
class FreeCashflow {
    constructor(period, dcf, discountRate, taxRate) {
        this.lineItems = [];
        this.period = period;
        this.discountRate = discountRate;
        this.aggregateTotal = 0;
        this.taxRate = taxRate;
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
        this.aggregateLineItems();
        if (this.discountRate != undefined) {
            let pv = this.discountRate.getFactor(this.period) * this.aggregateTotal;
            return pv;
        }
        return null;
    }
    aggregateLineItems() {
        let otherLineItems = [];
        let revenueList = [];
        let prev = this.previousPeriod(this.dcf);
        let current = this;
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
            item.applyForecast(undefined, prev);
            //applying tax
            item.applyTax(this.taxRate);
            total += item.getPostTaxAmount();
        });
        //TODO apply tax
        otherLineItems.forEach((item) => {
            item.applyForecast(undefined, prev, current);
            if (item.getType() == line_item_1.ELineItemType.EXPENSE) {
                //applying the tax
                item.applyTax(this.taxRate);
                total += item.getPostTaxAmount();
            }
            else {
                total += item.getAmount();
            }
        });
        this.aggregateTotal = total;
    }
    setTaxRate(taxRate) {
        this.taxRate = taxRate;
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
