import DiscountedCashflow from "../dcf/discounted-cashflow";
import Rate from "../input-variables/rate";
import { ELineItemType, LineItem } from "../line-item/line-item";
import Expense from "../line-item/line-items.ts/expense";
import Cashflow from "./cashflow";
import ITaxRate from "../input-variables/ITaxRate";
import Revenue from "../line-item/line-items.ts/revenue";
export default class FreeCashflow implements Cashflow {
  private period: number;
  private aggregateTotal: number;
  private discountRate: Rate | undefined;
  private taxRate: ITaxRate | undefined;
  private lineItems: LineItem[];
  private dcf: DiscountedCashflow;

  constructor(
    period: number,
    dcf: DiscountedCashflow,
    discountRate?: Rate,
    taxRate?: ITaxRate
  ) {
    this.lineItems = [];
    this.period = period;
    this.discountRate = discountRate;
    this.aggregateTotal = 0;
    this.taxRate = taxRate;
    this.dcf = dcf;
  }
  resetLineItems(): void {
    this.lineItems = [];
  }
  addLineItem(lineItem: LineItem): void {
    this.lineItems.push(lineItem);
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
    if (this.discountRate != undefined) {
      let pv = this.discountRate.getFactor(this.period) * this.aggregateTotal;
      console.log("discountCashflow()", pv, "time", this.period);
      return pv;
    }
    return null;
  }
  aggregateLineItems(): void {
    let otherLineItems: LineItem[] = [];
    let revenueList: LineItem[] = [];
    let prev = this.previousPeriod(this.dcf);
    let next = this.nextPeriod(this.dcf);
    this.lineItems.forEach((item) => {
      if (item.getType() == ELineItemType.REVENUE) {
        revenueList.push(item);
      } else {
        otherLineItems.push(item);
      }
    });

    let total: number = 0;
    revenueList.forEach((item) => {
      item.applyForecast(undefined, prev, next);
      //applying tax
      (<Revenue>item).applyTax(this.taxRate);
      total += item.getAmount();
    });
    //TODO apply tax
    otherLineItems.forEach((item) => {
      item.applyForecast(undefined, prev, next);
      if (item.getType() == ELineItemType.EXPENSE) {
        //applying the tax
        (<Expense>item).applyTax(this.taxRate);
      }
      total += item.getAmount();
    });

    this.aggregateTotal = total;
  }

  setTaxRate(taxRate: ITaxRate): void {
    this.taxRate = taxRate;
  }

  nextPeriod(dcf: DiscountedCashflow): Cashflow | undefined {
    let cfList = dcf.cashflows;
    if (this.period == cfList.length - 1) {
      return undefined;
    } else {
      return cfList[this.period + 1];
    }
  }
  previousPeriod(dcf: DiscountedCashflow): Cashflow | undefined {
    if (this.period <= 0) {
      return undefined;
    } else {
      return dcf.cashflows[this.period - 1];
    }
  }
}
