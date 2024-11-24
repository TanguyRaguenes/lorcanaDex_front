import { PriceApiLorcast } from "./PriceApiLorcast";
import { SetApiLorcast } from "./SetApiLorcast";
import { LegalitieApiLorcast } from "./LegalitieApiLorcast";
import { ImageUrisApiLorcast } from "./ImageUrisApiLorcast";
import { DigitalApiLorcast } from "./DigitalApiLorcast";

export class CardApiLorcast {
    private cardIdBdd: number;
    private cardIdApi: string;
    private name: string;
    private version: string;
    private layout: string;
    private releasedAt: Date | null;
    private imageUris: ImageUrisApiLorcast | null;
    private cost: number | null;
    private inkwell: boolean;
    private ink: string;
    private type: string[];
    private classifications: string[];
    private text: string | null;
    private keywords: string[];
    private moveCost: number | null;
    private strength: number | null;
    private willpower: number | null;
    private lore: number | null;
    private rarity: string;
    private illustrators: string[];
    private collectorNumber: string;
    private lang: string;
    private flavorText: string | null;
    private tcgplayerId: number | null;
    private legalities: LegalitieApiLorcast | null;
    private set: SetApiLorcast;
    private prices: PriceApiLorcast;

    constructor(data: any) {
        this.cardIdBdd = data.cardIdBdd || 0;
        this.cardIdApi = data.cardIdApi || '';
        this.name = data.name || '';
        this.version = data.version || '';
        this.layout = data.layout || '';
        this.releasedAt = data.releasedAt ? new Date(data.releasedAt) : null;
        this.imageUris = data.imageUris
            ? new ImageUrisApiLorcast(
                data.imageUris.digital
                    ? new DigitalApiLorcast(
                        data.imageUris.digital.small || null,
                        data.imageUris.digital.normal || null,
                        data.imageUris.digital.large || null
                    )
                    : null
            )
            : null;
        this.cost = data.cost || null;
        this.inkwell = data.inkwell || false;
        this.ink = data.ink || '';
        this.type = data.type || [];
        this.classifications = data.classifications || [];
        this.text = data.text || null;
        this.keywords = data.keywords || [];
        this.moveCost = data.moveCost || null;
        this.strength = data.strength || null;
        this.willpower = data.willpower || null;
        this.lore = data.lore || null;
        this.rarity = data.rarity || '';
        this.illustrators = data.illustrators || [];
        this.collectorNumber = data.collectorNumber || '';
        this.lang = data.lang || '';
        this.flavorText = data.flavorText || null;
        this.tcgplayerId = data.tcgplayerId || null;
        this.legalities = data.legalities ? new LegalitieApiLorcast(data.legalities.core) : null;
        this.set = new SetApiLorcast(
            data.set?.setIdBdd || null,
            data.set?.setIdApi || '',
            data.set?.name || '',
            data.set?.code || '',
            data.set?.releasedAt ? new Date(data.set.releasedAt) : null,
            data.set?.prereleasedAt ? new Date(data.set.prereleasedAt) : null
        );
        this.prices = new PriceApiLorcast(data.prices?.usd || null, data.prices?.usdFoil || null);
    }

    // Getters et setters
    public getCardIdBdd(): number {
        return this.cardIdBdd;
    }

    public setCardIdBdd(value: number): void {
        this.cardIdBdd = value;
    }

    public getCardIdApi(): string {
        return this.cardIdApi;
    }

    public setCardIdApi(value: string): void {
        this.cardIdApi = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getVersion(): string {
        return this.version;
    }

    public setVersion(value: string): void {
        this.version = value;
    }

    public getLayout(): string {
        return this.layout;
    }

    public setLayout(value: string): void {
        this.layout = value;
    }

    public getReleasedAt(): Date | null {
        return this.releasedAt;
    }

    public setReleasedAt(value: Date | null): void {
        this.releasedAt = value;
    }

    public getImageUris(): ImageUrisApiLorcast | null {
        return this.imageUris;
    }

    public setImageUris(value: ImageUrisApiLorcast | null): void {
        this.imageUris = value;
    }

    public getCost(): number | null {
        return this.cost;
    }

    public setCost(value: number | null): void {
        this.cost = value;
    }

    public getInkwell(): boolean {
        return this.inkwell;
    }

    public setInkwell(value: boolean): void {
        this.inkwell = value;
    }

    public getInk(): string {
        return this.ink;
    }

    public setInk(value: string): void {
        this.ink = value;
    }

    public getType(): string[] {
        return this.type;
    }

    public setType(value: string[]): void {
        this.type = value;
    }

    public getClassifications(): string[] {
        return this.classifications;
    }

    public setClassifications(value: string[]): void {
        this.classifications = value;
    }

    public getText(): string | null {
        if (this.text !== null) {
            let text = this.text.replace(/\n/g, '<br><br>');
            text = text.replace(/\{I\}/g, '<span class="material-symbols-rounded align-middle text-base">hexagon</span>')
            text = text.replace(/\{E}/g, '<span class="material-symbols-rounded align-middle text-base">rotate_90_degrees_cw</span>')
            text = text.replace(/\{S}/g, '<span class="material-symbols-rounded align-middle text-base">brightness_empty</span>')
            text = text.replace(/\{L}/g, '<span class="material-symbols-rounded align-middle text-base">change_history</span>')
            return text;
        } else {
            return null;
        }

    }

    public setText(value: string | null): void {
        this.text = value;
    }

    public getKeywords(): string[] {
        return this.keywords;
    }

    public setKeywords(value: string[]): void {
        this.keywords = value;
    }

    public getMoveCost(): number | null {
        return this.moveCost;
    }

    public setMoveCost(value: number | null): void {
        this.moveCost = value;
    }

    public getStrength(): number | null {
        return this.strength;
    }

    public setStrength(value: number | null): void {
        this.strength = value;
    }

    public getWillpower(): number | null {
        return this.willpower;
    }

    public setWillpower(value: number | null): void {
        this.willpower = value;
    }

    public getLore(): number | null {
        return this.lore;
    }

    public setLore(value: number | null): void {
        this.lore = value;
    }

    public getRarity(): string {
        return this.rarity;
    }

    public setRarity(value: string): void {
        this.rarity = value;
    }

    public getIllustrators(): string[] {
        return this.illustrators;
    }

    public setIllustrators(value: string[]): void {
        this.illustrators = value;
    }

    public getCollectorNumber(): string {
        return this.collectorNumber;
    }

    public setCollectorNumber(value: string): void {
        this.collectorNumber = value;
    }

    public getLang(): string {
        return this.lang;
    }

    public setLang(value: string): void {
        this.lang = value;
    }

    public getFlavorText(): string | null {
        return this.flavorText;
    }

    public setFlavorText(value: string | null): void {
        this.flavorText = value;
    }

    public getTcgplayerId(): number | null {
        return this.tcgplayerId;
    }

    public setTcgplayerId(value: number | null): void {
        this.tcgplayerId = value;
    }

    public getLegalities(): LegalitieApiLorcast | null {
        return this.legalities;
    }

    public setLegalities(value: LegalitieApiLorcast | null): void {
        this.legalities = value;
    }

    public getSet(): SetApiLorcast {
        return this.set;
    }

    public setSet(value: SetApiLorcast): void {
        this.set = value;
    }

    public getPrices(): PriceApiLorcast {
        return this.prices;
    }

    public setPrices(value: PriceApiLorcast): void {
        this.prices = value;
    }

    // Méthode toString
    public toString(): string {
        return `CardApiLorcast {
      cardIdBdd: ${this.cardIdBdd},
      cardIdApi: '${this.cardIdApi}',
      name: '${this.name}',
      version: '${this.version}',
      layout: '${this.layout}',
      releasedAt: ${this.releasedAt ? this.releasedAt.toISOString() : null},
      imageUris: ${this.imageUris ? this.imageUris.toString() : null},
      cost: ${this.cost},
      inkwell: ${this.inkwell},
      ink: '${this.ink}',
      type: [${this.type.join(', ')}],
      classifications: [${this.classifications.join(', ')}],
      text: '${this.text}',
      keywords: [${this.keywords.join(', ')}],
      moveCost: ${this.moveCost},
      strength: ${this.strength},
      willpower: ${this.willpower},
      lore: ${this.lore},
      rarity: '${this.rarity}',
      illustrators: [${this.illustrators.join(', ')}],
      collectorNumber: '${this.collectorNumber}',
      lang: '${this.lang}',
      flavorText: '${this.flavorText}',
      tcgplayerId: ${this.tcgplayerId},
      legalities: ${this.legalities ? this.legalities.toString() : null},
      set: ${this.set.toString()},
      prices: ${this.prices.toString()}
    }`;
    }
}
