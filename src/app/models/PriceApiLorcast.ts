export class PriceApiLorcast {

    private usd: string | null;
    private usdFoil: string | null;

    constructor(usd: string | null, usdFoil: string | null) {
        this.usd = usd;
        this.usdFoil = usdFoil;
    }

    public getUsd(): string | null {
        return this.usd;
    }

    public setUsd(value: string | null) {
        this.usd = value;
    }

    public getUsdFoil(): string | null {
        return this.usdFoil;
    }

    public setUsdFoil(value: string | null) {
        this.usdFoil = value;
    }

    public toString(): string {
        return `PriceApiLorcast {
            usd: ${this.usd},
            usdFoil: ${this.usdFoil}
        }`;
    }
}