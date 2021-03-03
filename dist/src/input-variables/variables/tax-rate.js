"use strict";
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
