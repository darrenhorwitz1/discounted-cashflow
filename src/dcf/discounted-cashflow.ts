import Cashflow from "../cashflow/cashflow";
export default class DiscountedCashflow {
  private _presentValue: number | null;

  private _cashflows: Cashflow[];

  constructor() {
    this._presentValue = null;
    this._cashflows = [];
  }
  get presentValue(): number | null {
    return this._presentValue;
  }

  get cashflows(): Cashflow[] {
    return this._cashflows;
  }

  calculatePresentValue(): number {
    // do something
    let pv: number = 0;
    this._cashflows.forEach((cf) => {
      let pvCF = cf.discountCashflow();
      if (pvCF != null) {
        pv += pvCF;
      }
    });
    this._presentValue = pv;
    return this._presentValue;
  }
  addCashflow(cashflow: Cashflow): void {
    this._cashflows[cashflow.currentPeriod()] = cashflow;
  }
  //this wont work need to change
  removeCashflow(cashflow: Cashflow): void {
    let cfPV = cashflow.discountCashflow();
    if (this._cashflows.length < 0) return;
    if (cfPV != null && this._presentValue != null) this._presentValue -= cfPV;
    this._cashflows = this._cashflows.filter(
      (cf) => cf.currentPeriod() != cashflow.currentPeriod()
    );
    this._cashflows.forEach((cf, index) => {
      cf.setPeriod(index);
    });
  }
}
