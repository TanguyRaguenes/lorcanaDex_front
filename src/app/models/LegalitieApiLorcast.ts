export class LegalitieApiLorcast {
    private core: string | null;

    constructor(core: string | null = null) {
        this.core = core;
    }

    public getCore(): string | null {
        return this.core;
    }

    public setCore(value: string | null): void {
        this.core = value;
    }

    public toString(): string {
        return `LegalitieApiLorcast {
        core: '${this.core}'
      }`;
    }
}