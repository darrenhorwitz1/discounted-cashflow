class Margin implements Input, IMargin {
  private margin: number;

  constructor(margin: number) {
    this.margin = margin;
  }
  getVariableAmount(): number {
    return this.margin;
  }
  getResidualMargin(): number {
    return 1 - this.margin;
  }
}
