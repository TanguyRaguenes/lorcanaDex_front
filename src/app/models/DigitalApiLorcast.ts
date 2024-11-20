export class DigitalApiLorcast {

  private small: string | null;
  private normal: string | null;
  private large: string | null;

  constructor(small: string | null = null, normal: string | null = null, large: string | null = null) {
    this.small = small;
    this.normal = normal;
    this.large = large;
  }

  public getSmall(): string | null {
    return this.small;
  }

  public setSmall(value: string | null) {
    this.small = value;
  }

  public getNormal(): string | null {
    return this.normal;
  }

  public setNormal(value: string | null) {
    this.normal = value;
  }

  public getLarge(): string | null {
    return this.large;
  }

  public setLarge(value: string | null) {
    this.large = value;
  }

  public toString(): string {
    return `DigitalApiLorcast {
      small: ${this.small},
      normal: ${this.normal},
      large: ${this.large}
    }`;
  }
}