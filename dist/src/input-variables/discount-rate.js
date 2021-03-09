"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscountRate {
    constructor(rate) {
        this.rate = rate;
    }
    getFactor(time) {
        let denom = Math.pow(1 + this.rate, time);
        let factor = 1 / denom;
        return factor;
    }
    getVariableAmount() {
        return this.rate;
    }
}
exports.default = DiscountRate;
