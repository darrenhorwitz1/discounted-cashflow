import Cashflow from "../../cashflow/cashflow";
import Input from "../../input-variables/input";
import { ELineItemType, LineItem } from "../line-item";

export default class NetCapex implements LineItem {
  private type: ELineItemType;
  private amount: number;
  private input: Input;
  constructor(amount: number = 0, margin: Input) {
    this.amount = amount;
    this.type = ELineItemType.NET_CAPEX;
    this.input = margin;
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
    let _input: Input;
    if (input == undefined) {
      _input = this.input;
    } else {
      _input = input;
    }
    if (currentCashflow == undefined) return;
    let revenue: number = this.revenueTotal(currentCashflow);
    let margin: number = _input.getVariableAmount();

    this.calculateNetCapex(margin, revenue);
  }
  private calculateNetCapex(margin: number, revenue: number): void {
    this.amount = margin * revenue * -1;
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
