"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscountRate {
    constructor(rate) {
        this.rate = rate;
    }
    getFactor(time) {
        return 1 / ((1 + this.rate) ^ time);
    }
    getVariableAmount() {
        return this.rate;
    }
}
exports.default = DiscountRate;
