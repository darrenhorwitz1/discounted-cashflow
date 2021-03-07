import Input from "../input";
import Rate from "../rate";

export default class GrowthRate implements Input, Rate {
  private growthRate: number;

  constructor(rate: number) {
    this.growthRate = rate;
  }
  getVariableAmount(): number {
    return this.growthRate;
  }
  getFactor(time: number): number {
    return (1 + this.growthRate) ^ time;
  }
}
