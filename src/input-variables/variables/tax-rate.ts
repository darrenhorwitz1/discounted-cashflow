import ITaxRate from "../ITaxRate";

export default class TaxRate implements ITaxRate {
  private taxRate: number;
  constructor(taxRate: number) {
    this.taxRate = taxRate;
  }
  getResidualMargin(): number {
    return 1 - this.taxRate;
  }
  getVariableAmount(): number {
    return this.taxRate;
  }
}
