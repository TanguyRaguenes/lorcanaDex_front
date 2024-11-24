export class Filter {
    private priority: number;
    private key: string;
    private value: string;
    private operator: string;

    constructor(priority: number, key: string, value: string, operator: string) {
        this.priority = priority;
        this.key = key;
        this.value = value;
        this.operator = operator;
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
    public getOperator(): string {
        return this.operator;
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
    public setOperator(operator: string): void {
        this.operator = operator;
    }
}