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
    input?: Input,
    previousCashflow?: Cashflow,
    currentCashflow?: Cashflow
  ): void {
    //TODO
    //need to get current revenue and apply margin to it
    
  }
}
