"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_item_1 = require("../line-item");
class Revenue {
    constructor(amount = 0, growthRate) {
        this.type = line_item_1.ELineItemType.REVENUE;
        this.amount = amount;
        this.postTaxAmount = amount;
        this.input = growthRate;
    }
    getAmount() {
        return this.amount;
    }
    getType() {
        return this.type;
    }
    applyForecast(input, previousCashFlow) {
        let _input;
        if (input == undefined) {
            _input = this.input;
        }
        else {
            _input = input;
        }
        //cant grow without a Revenue line Item from T-1
        if (previousCashFlow == undefined)
            return;
        //last years total revenue
        let prevTotal = 0;
        previousCashFlow.getLineItems().forEach((item) => {
            if (item.getType() == this.type) {
                prevTotal += item.getAmount();
            }
        });
        let growthRate = _input.getVariableAmount();
        this.growRevenue(prevTotal, growthRate);
    }
    applyTax(input) {
        this.postTaxAmount = this.amount * input.getResidualMargin();
    }
    getPostTaxAmount() {
        return this.postTaxAmount;
    }
    growRevenue(prevRevenueTotal, growthRate) {
        this.amount = prevRevenueTotal * (1 + growthRate);
    }
}
exports.default = Revenue;
