"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Margin {
    constructor(margin) {
        this.margin = margin;
    }
    getVariableAmount() {
        return this.margin;
    }
    getResidualMargin() {
        return 1 - this.margin;
    }
}
exports.default = Margin;
