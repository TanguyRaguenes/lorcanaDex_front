export class SetApiLorcast {

    private setIdBdd: number | null;
    private setIdApi: string;
    private name: string;
    private code: string;
    private releasedAt: Date | null;
    private prereleasedAt: Date | null;

    constructor(
        setIdBdd: number | null,
        setIdApi: string,
        name: string,
        code: string,
        releasedAt: Date | null,
        prereleasedAt: Date | null
    ) {
        this.setIdBdd = setIdBdd;
        this.setIdApi = setIdApi;
        this.name = name;
        this.code = code;
        this.releasedAt = releasedAt;
        this.prereleasedAt = prereleasedAt;
    }

    public getSetIdBdd(): number | null {
        return this.setIdBdd;
    }

    public setSetIdBdd(value: number | null) {
        this.setIdBdd = value;
    }


    public getSetIdApi(): string {
        return this.setIdApi;
    }

    public setSetIdApi(value: string) {
        this.setIdApi = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(value: string) {
        this.code = value;
    }

    public getReleasedAt(): Date | null {
        return this.releasedAt;
    }

    public setReleasedAt(value: Date | null) {
        this.releasedAt = value;
    }

    public getPrereleasedAt(): Date | null {
        return this.prereleasedAt;
    }

    public setPrereleasedAt(value: Date | null) {
        this.prereleasedAt = value;
    }

    public toString(): string {
        return `SetApiLorcast {
            setIdBdd: ${this.setIdBdd},
            setIdApi: '${this.setIdApi}',
            name: '${this.name}',
            code: '${this.code}',
            releasedAt: ${this.releasedAt ? this.releasedAt.toISOString() : null},
            prereleasedAt: ${this.prereleasedAt ? this.prereleasedAt.toISOString() : null}
        }`;
    }
}