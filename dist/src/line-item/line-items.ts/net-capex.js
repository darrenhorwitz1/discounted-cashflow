"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_item_1 = require("../line-item");
class NetCapex {
    constructor(amount = 0, margin) {
        this.amount = amount;
        this.type = line_item_1.ELineItemType.NET_CAPEX;
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
        //need to get current revenue and apply margin to it
        let _input;
        if (input == undefined) {
            _input = this.input;
        }
        else {
            _input = input;
        }
        if (currentCashflow == undefined)
            return;
        let revenue = this.revenueTotal(currentCashflow);
        let margin = _input.getVariableAmount();
        this.calculateNetCapex(margin, revenue);
    }
    calculateNetCapex(margin, revenue) {
        this.amount = margin * revenue;
    }
    revenueTotal(cashflow) {
        let total = 0;
        cashflow.getLineItems().forEach((item) => {
            if (item.getType() == line_item_1.ELineItemType.REVENUE) {
                total += item.getAmount();
            }
        });
        return total;
    }
}
exports.default = NetCapex;
