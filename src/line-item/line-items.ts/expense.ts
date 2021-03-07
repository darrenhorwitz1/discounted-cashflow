import Cashflow from "../../cashflow/cashflow";
import Input from "../../input-variables/input";
import TaxRate from "../../input-variables/variables/tax-rate";
import { ELineItemType, LineItem, TaxableLineItem } from "../line-item";

export default class Expense implements LineItem, TaxableLineItem {
  private amount: number;
  private postTaxAmount: number;
  private type: ELineItemType;
  private input: Input;
  constructor(amount: number = 0, margin: Input) {
    this.amount = amount;
    this.postTaxAmount = amount;
    this.type = ELineItemType.EXPENSE;
    this.input = margin;
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
    let _input: Input;
    if (input == undefined) {
      _input = this.input;
    } else {
      _input = input;
    }

    if (currentCashflow == undefined) return;
    let revenueTotal: number = 0;
    currentCashflow.getLineItems().forEach((item) => {
      if (item.getType() == ELineItemType.REVENUE) {
        revenueTotal += item.getAmount();
      }
    });

    let margin: number = _input.getVariableAmount();
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
