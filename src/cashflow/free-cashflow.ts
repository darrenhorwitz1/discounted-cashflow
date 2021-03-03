class FreeCashflow implements Cashflow {
  private period: number;
  private aggregateTotal: number;
  private discountRate: Rate | undefined;
  private lineItems: LineItem[];

  constructor(period: number, discountRate?: Rate) {
    this.lineItems = [];
    this.period = period;
    this.discountRate = discountRate;
    this.aggregateTotal = 0;
  }
  setPeriod(period: number): void {
    this.period = period;
  }
  setDiscountRate(discountRate: Rate): void {
    this.discountRate = discountRate;
  }
  currentPeriod(): number {
    return this.period;
  }
  getLineItems(): LineItem[] {
    return this.lineItems;
  }
  discountCashflow(): number | null {
    this.aggregateLineItems();
    if (this.discountRate != undefined)
      return this.discountRate?.getFactor(this.period) * this.aggregateTotal;
    return null;
  }
  aggregateLineItems(): void {
    let total: number = 0;
    this.lineItems.forEach((item) => {
      total += item.getAmount();
    });

    this.aggregateTotal = total;
  }
  nextPeriod(dcf: DiscountedCashflow): Cashflow {
    throw new Error("Method not implemented.");
  }
  previousPeriod(dcf: DiscountedCashflow): Cashflow {
    throw new Error("Method not implemented.");
  }
}
