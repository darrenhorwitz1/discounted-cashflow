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
    input: Input,
    previousCashflow?: Cashflow,
    currentCashflow?: Cashflow
  ): void {
    //do something
    // TODO
    if (currentCashflow == undefined) return;
    let revenueTotal: number = 0;
    currentCashflow.getLineItems().forEach((item) => {
      if (item.getType() == ELineItemType.REVENUE) {
        revenueTotal += item.getAmount();
      }
    });

    let margin: number = input.getVariableAmount();
    this.calculateExpense(margin, revenueTotal);
  }
  applyTax(input: TaxRate): void {
    this.postTaxAmount = this.amount * input.getResidualMargin();
  }
  getPostTaxAmount(): number {
    return this.postTaxAmount;
  }

  private calculateExpense(margin: number, revenue: number): void {
    this.amount = margin * revenue;
  }
}
