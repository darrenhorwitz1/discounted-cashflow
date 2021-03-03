interface Cashflow {
  discountCashflow(): number | null;
  aggregateLineItems(): void;
  currentPeriod(): number;
  setPeriod(period: number): void;
  getLineItems(): LineItem[];
  setDiscountRate(discountRate: Rate): void;
  nextPeriod(dcf: DiscountedCashflow): Cashflow;
  previousPeriod(dcf: DiscountedCashflow): Cashflow;
}

// class FreeCashflow implements Cashflow {}
