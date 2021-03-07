"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_item_1 = require("../line-item");
class Expense {
    constructor(amount = 0, margin) {
        this.amount = amount;
        this.postTaxAmount = amount;
        this.type = line_item_1.ELineItemType.EXPENSE;
        this.input = margin;
    }
    getAmount() {
        return this.amount;
    }
    getType() {
        return this.type;
    }
    applyForecast(input, previousCashflow, currentCashflow) {
        //do something
        // TODO
        let _input;
        if (input == undefined) {
            _input = this.input;
        }
        else {
            _input = input;
        }
        if (currentCashflow == undefined)
            return;
        let revenueTotal = 0;
        currentCashflow.getLineItems().forEach((item) => {
            if (item.getType() == line_item_1.ELineItemType.REVENUE) {
                revenueTotal += item.getAmount();
            }
        });
        let margin = _input.getVariableAmount();
        this.calculateExpense(margin, revenueTotal);
    }
    applyTax(input) {
        this.postTaxAmount = this.amount * input.getResidualMargin();
    }
    getPostTaxAmount() {
        return this.postTaxAmount;
    }
    calculateExpense(margin, revenue) {
        this.amount = margin * revenue;
    }
}
exports.default = Expense;
