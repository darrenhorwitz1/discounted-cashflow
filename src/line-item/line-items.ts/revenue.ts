class Revenue implements LineItem, TaxableLineItem {
  private amount: number;
  private postTaxAmount: number;
  private type: ELineItemType;

  constructor(amount: number = 0) {
    this.type = ELineItemType.REVENUE;
    this.amount = amount;
    this.postTaxAmount = amount;
  }
  getAmount(): number {
    return this.amount;
  }
  getType(): ELineItemType {
    return this.type;
  }
  applyForecast(input: Input, previousCashFlow?: Cashflow): void {
    //cant grow without a Revenue line Item from T-1
    if (previousCashFlow == undefined) return;

    // TODO
    // let prevAmt: number = previousCashFlow.getAmount();
    // this.amount = prevAmt * (1 + input.getVariableAmount());
  }
  applyTax(input: TaxRate): void {
    this.postTaxAmount = this.amount * input.getResidualMargin();
  }
  getPostTaxAmount(): number {
    return this.postTaxAmount;
  }
}
