enum ELineItemType {
  REVENUE,
  EXPENSE,
  NET_CAPEX,
  WORKING_CAPITAL_DELTA,
}

interface LineItem {
  getAmount(): number;
  getType(): ELineItemType;
  applyForecast(
    input?: Input,
    previousCashflow?: Cashflow,
    currentCashflow?: Cashflow
  ): void;
}
interface TaxableLineItem {
  applyTax(input: Input): void;
  getPostTaxAmount(): number;
}
