"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GrowthRate {
    constructor(rate) {
        this.growthRate = rate;
    }
    getVariableAmount() {
        return this.growthRate;
    }
    getFactor(time) {
        return (1 + this.growthRate) ^ time;
    }
}
exports.default = GrowthRate;
