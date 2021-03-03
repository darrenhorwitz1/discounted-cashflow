class DiscountRate implements Input, Rate {
  private rate: number;

  constructor(rate: number) {
    this.rate = rate;
  }
  getFactor(time: number): number {
    return 1 / ((1 + this.rate) ^ time);
  }
  getVariableAmount(): number {
    return this.rate;
  }
}
