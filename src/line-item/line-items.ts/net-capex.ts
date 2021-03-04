class NetCapex implements LineItem {
  private type: ELineItemType;
  private amount: number;
  constructor(amount: number = 0) {
    this.amount = amount;
    this.type = ELineItemType.NET_CAPEX;
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
    //TODO
    //need to get current revenue and apply margin to it

    if (currentCashflow == undefined) return;
    let revenue: number = this.revenueTotal(currentCashflow);
    let margin: number = input.getVariableAmount();

    this.calculateNetCapex(margin, revenue);
  }
  private calculateNetCapex(margin: number, revenue: number): void {
    this.amount = margin * revenue;
  }
  private revenueTotal(cashflow: Cashflow): number {
    let total: number = 0;
    cashflow.getLineItems().forEach((item) => {
      if (item.getType() == ELineItemType.REVENUE) {
        total += item.getAmount();
      }
    });
    return total;
  }
}
