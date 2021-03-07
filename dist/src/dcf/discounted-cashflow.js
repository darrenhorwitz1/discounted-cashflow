"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscountedCashflow {
    constructor() {
        this._presentValue = null;
        this._cashflows = [];
    }
    get presentValue() {
        return this._presentValue;
    }
    get cashflows() {
        return this._cashflows;
    }
    calculatePresentValue() {
        // do something
        let pv = 0;
        this._cashflows.forEach((cf) => {
            let pvCF = cf.discountCashflow();
            console.log(pvCF);
            if (pvCF != null) {
                pv += pvCF;
            }
        });
        this._presentValue = pv;
        return this._presentValue;
    }
    addCashflow(cashflow) {
        this._cashflows[cashflow.currentPeriod()] = cashflow;
    }
    //this wont work need to change
    removeCashflow(cashflow) {
        let cfPV = cashflow.discountCashflow();
        if (this._cashflows.length < 0)
            return;
        if (cfPV != null && this._presentValue != null)
            this._presentValue -= cfPV;
        this._cashflows = this._cashflows.filter((cf) => cf.currentPeriod() != cashflow.currentPeriod());
        this._cashflows.forEach((cf, index) => {
            cf.setPeriod(index);
        });
    }
}
exports.default = DiscountedCashflow;
