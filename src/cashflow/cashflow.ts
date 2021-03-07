import DiscountedCashflow from "../dcf/discounted-cashflow";
import Rate from "../input-variables/rate";
import { LineItem } from "../line-item/line-item";

interface Cashflow {
  discountCashflow(): number | null;
  addLineItem(lineItem: LineItem): void;
  resetLineItems(): void;
  aggregateLineItems(): void;
  currentPeriod(): number;
  setPeriod(period: number): void;
  getLineItems(): LineItem[];
  setDiscountRate(discountRate: Rate): void;
  nextPeriod(dcf: DiscountedCashflow): Cashflow | undefined;
  previousPeriod(dcf: DiscountedCashflow): Cashflow | undefined;
}

export default Cashflow;
