import Cashflow from "../../cashflow/cashflow";
import Input from "../../input-variables/input";
import { ELineItemType, LineItem } from "../line-item";

export default class WorkingCapitalDelta implements LineItem {
  private type: ELineItemType;
  private amount: number;
  private nwcAmount: number;
  private input: Input;
  constructor(amount: number = 0, margin: Input) {
    this.amount = amount;
    this.nwcAmount = 0;
    this.type = ELineItemType.WORKING_CAPITAL_DELTA;
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
    previousCashflow: Cashflow,
    currentCashflow: Cashflow
  ): void {
    //TODO
    let _input: Input;
    if (input == undefined) {
      _input = this.input;
    } else {
      _input = input;
    }
    //need to get current revenue and apply margin to it
    let prevNwc: number = this.getPreviousNWC(previousCashflow);
    let revenue: number = this.getRevenueTotal(currentCashflow);
    let margin: number = _input.getVariableAmount();
    this.calculateCurrentNWC(margin, revenue);

    // if NWC_t-1 is less than NWC_t then there has been an outflow of cash
    // thus amount will be negaive . VICE VERSA
    this.amount = prevNwc - this.nwcAmount;
  }

  getNWC(): number {
    return this.nwcAmount;
  }
  private getPreviousNWC(cashflow: Cashflow): number {
    let nwc: number = 0;

    cashflow.getLineItems().forEach((item) => {
      if (item.getType() == this.type) {
        let w: WorkingCapitalDelta = <WorkingCapitalDelta>item;
        nwc += w.getNWC();
      }
    });
    return nwc;
  }

  private getRevenueTotal(cashflow: Cashflow): number {
    let total: number = 0;
    cashflow.getLineItems().forEach((item) => {
      if (item.getType() == ELineItemType.REVENUE) {
        total += item.getAmount();
      }
    });
    return total;
  }

  private calculateCurrentNWC(margin: number, revenue: number): void {
    this.nwcAmount = margin * revenue;
  }
}
