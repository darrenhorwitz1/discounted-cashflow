class Expense implements LineItem, TaxableLineItem {
  private amount: number;
  private postTaxAmount: number;
  private type: ELineItemType;
  constructor(amount: number = 0) {
    this.amount = amount;
    this.postTaxAmount = amount;
    this.type = ELineItemType.EXPENSE;
  }
  getAmount(): number {
    return this.amount;
  }
  getType(): ELineItemType {
    return this.type;
  }
  applyForecast(
    input?: Input,
    previousCashflow?: Cashflow,
    currentCashflow?: Cashflow
  ): void {
    //do something
    // TODO
  }
  applyTax(input: TaxRate): void {
    this.postTaxAmount = this.amount * input.getResidualMargin();
  }
  getPostTaxAmount(): number {
    return this.postTaxAmount;
  }
}
