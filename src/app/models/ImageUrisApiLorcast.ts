import { DigitalApiLorcast } from "./DigitalApiLorcast";

export class ImageUrisApiLorcast {

    private digital: DigitalApiLorcast | null;

    constructor(digital: DigitalApiLorcast | null = null) {
        this.digital = digital;
    }

    public getDigital(): DigitalApiLorcast | null {
        return this.digital;
    }

    public setDigital(value: DigitalApiLorcast | null): void {
        this.digital = value;
    }

    public toString(): string {
        return `ImageUrisApiLorcast {
        digital: ${this.digital ? this.digital.toString() : 'null'}
      }`;
    }

}