import Cashflow from "../cashflow/cashflow";
import Input from "../input-variables/input";

export enum ELineItemType {
  REVENUE,
  EXPENSE,
  NET_CAPEX,
  WORKING_CAPITAL_DELTA,
}

export interface LineItem {
  getAmount(): number;
  getType(): ELineItemType;
  applyForecast(
    input?: Input,
    previousCashflow?: Cashflow,
    currentCashflow?: Cashflow
  ): void;
}
export interface TaxableLineItem {
  applyTax(input: Input): void;
  getPostTaxAmount(): number;
}
