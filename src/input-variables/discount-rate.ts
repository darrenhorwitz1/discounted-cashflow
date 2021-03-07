import Input from "./input";
import Rate from "./rate";

export default class DiscountRate implements Input, Rate {
  private rate: number;

  constructor(rate: number) {
    this.rate = rate;
  }
  getFactor(time: number): number {
    let denom = Math.pow(1 + this.rate, time);
    let factor = 1 / denom;
    return factor;
  }
  getVariableAmount(): number {
    return this.rate;
  }
}
