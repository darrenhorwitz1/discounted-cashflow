"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaxRate {
    constructor(taxRate) {
        this.taxRate = taxRate;
    }
    getResidualMargin() {
        return 1 - this.taxRate;
    }
    getVariableAmount() {
        return this.taxRate;
    }
}
exports.default = TaxRate;
