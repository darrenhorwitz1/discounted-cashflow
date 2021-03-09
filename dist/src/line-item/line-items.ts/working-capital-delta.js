"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_item_1 = require("../line-item");
class WorkingCapitalDelta {
    constructor(amount = 0, margin) {
        this.amount = amount;
        this.nwcAmount = 0;
        this.type = line_item_1.ELineItemType.WORKING_CAPITAL_DELTA;
        this.input = margin;
    }
    getAmount() {
        return this.amount;
    }
    getType() {
        return this.type;
    }
    applyForecast(input, previousCashflow, currentCashflow) {
        //TODO
        let _input;
        if (input == undefined) {
            _input = this.input;
        }
        else {
            _input = input;
        }
        //need to get current revenue and apply margin to it
        let prevNwc = this.getPreviousNWC(previousCashflow);
        let revenue = this.getRevenueTotal(currentCashflow);
        let margin = _input.getVariableAmount();
        this.calculateCurrentNWC(margin, revenue);
        // if NWC_t-1 is less than NWC_t then there has been an outflow of cash
        // thus amount will be negaive . VICE VERSA
        this.amount = prevNwc - this.nwcAmount;
    }
    getNWC() {
        return this.nwcAmount;
    }
    getPreviousNWC(cashflow) {
        let nwc = 0;
        cashflow.getLineItems().forEach((item) => {
            if (item.getType() == this.type) {
                nwc += item.getNWC();
            }
        });
        return nwc;
    }
    getRevenueTotal(cashflow) {
        let total = 0;
        cashflow.getLineItems().forEach((item) => {
            if (item.getType() == line_item_1.ELineItemType.REVENUE) {
                total += item.getAmount();
            }
        });
        return total;
    }
    calculateCurrentNWC(margin, revenue) {
        this.nwcAmount = margin * revenue;
    }
}
exports.default = WorkingCapitalDelta;
