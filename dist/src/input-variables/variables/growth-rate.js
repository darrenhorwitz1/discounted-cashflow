"use strict";
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
