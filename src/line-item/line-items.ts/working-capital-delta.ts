class WorkingCapitalDelta implements LineItem {
  private type: ELineItemType;
  private amount: number;
  constructor(amount: number = 0) {
    this.amount = amount;
    this.type = ELineItemType.WORKING_CAPITAL_DELTA;
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
