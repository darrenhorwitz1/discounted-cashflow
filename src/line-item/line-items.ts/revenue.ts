import Cashflow from "../../cashflow/cashflow";
import Input from "../../input-variables/input";
import TaxRate from "../../input-variables/variables/tax-rate";
import { ELineItemType, LineItem, TaxableLineItem } from "../line-item";

export default class Revenue implements LineItem, TaxableLineItem {
  private amount: number;
  private postTaxAmount: number;
  private type: ELineItemType;
  private input: Input;

  constructor(amount: number = 0, growthRate: Input) {
    this.type = ELineItemType.REVENUE;
    this.amount = amount;
    this.postTaxAmount = amount;
    this.input = growthRate;
  }
  getAmount(): number {
    return this.amount;
  }
  getType(): ELineItemType {
    return this.type;
  }
  applyForecast(input: Input, previousCashFlow?: Cashflow): void {
    let _input: Input;
    if (input == undefined) {
      _input = this.input;
    } else {
      _input = input;
    }
    //cant grow without a Revenue line Item from T-1
    if (previousCashFlow == undefined) return;
    //last years total revenue
    let prevTotal: number = 0;
    previousCashFlow.getLineItems().forEach((item) => {
      if (item.getType() == this.type) {
        prevTotal += item.getAmount();
      }
    });

    let growthRate = _input.getVariableAmount();
    this.growRevenue(prevTotal, growthRate);
  }
  applyTax(input: TaxRate): void {
    this.postTaxAmount = this.amount * input.getResidualMargin();
  }
  getPostTaxAmount(): number {
    return this.postTaxAmount;
  }

  growRevenue(prevRevenueTotal: number, growthRate: number): void {
    this.amount = prevRevenueTotal * (1 + growthRate);
  }
}
