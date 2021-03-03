"use strict";
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
