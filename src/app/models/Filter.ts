export class Filter {
    private key: string;
    private value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    public getKey(): string {
        return this.key;
    }
    public getValue(): string {
        return this.value;
    }
    public setKey(key: string): void {
        this.key = key;
    }
    public setValue(value: string): void {
        this.value = value;
    }
}