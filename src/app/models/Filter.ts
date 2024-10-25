export class Filter {
    private priority: number;
    private key: string;
    private value: string;

    constructor(priority: number, key: string, value: string) {
        this.priority = priority;
        this.key = key;
        this.value = value;
    }

    public getPriority(): number {
        return this.priority;
    }
    public getKey(): string {
        return this.key;
    }
    public getValue(): string {
        return this.value;
    }
    public setPriority(priority: number): void {
        this.priority = priority;
    }
    public setKey(key: string): void {
        this.key = key;
    }
    public setValue(value: string): void {
        this.value = value;
    }
}