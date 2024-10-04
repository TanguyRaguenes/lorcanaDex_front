export class Card {
    private artist: string;
    private lorcanaSetName: string;
    private classifications: string;
    private dateAdded: string;
    private setNum: number;
    private color: string;
    private gamemode: string;
    private franchise: string;
    private image: string;
    private cost: number;
    private inkable: boolean;
    private name: string;
    private type: string;
    private lore: number;
    private rarity: string;
    private flavorText: string;
    private uniqueId: string;
    private cardNum: number;
    private bodyText: string;
    private willpower: number;
    private cardVariants: string;
    private dateModified: string;
    private strength: number;
    private setId: string;

    constructor(
        artist: string,
        lorcanaSetName: string,
        classifications: string,
        dateAdded: string,
        setNum: number,
        color: string,
        gamemode: string,
        franchise: string,
        image: string,
        cost: number,
        inkable: boolean,
        name: string,
        type: string,
        lore: number,
        rarity: string,
        flavorText: string,
        uniqueId: string,
        cardNum: number,
        bodyText: string,
        willpower: number,
        cardVariants: string,
        dateModified: string,
        strength: number,
        setId: string
    ) {
        this.artist = artist;
        this.lorcanaSetName = lorcanaSetName;
        this.classifications = classifications;
        this.dateAdded = dateAdded;
        this.setNum = setNum;
        this.color = color;
        this.gamemode = gamemode;
        this.franchise = franchise;
        this.image = image;
        this.cost = cost;
        this.inkable = inkable;
        this.name = name;
        this.type = type;
        this.lore = lore;
        this.rarity = rarity;
        this.flavorText = flavorText;
        this.uniqueId = uniqueId;
        this.cardNum = cardNum;
        this.bodyText = bodyText;
        this.willpower = willpower;
        this.cardVariants = cardVariants;
        this.dateModified = dateModified;
        this.strength = strength;
        this.setId = setId;
    }

    // Getters
    public getArtist(): string {
        return this.artist;
    }

    public getLorcanaSetName(): string {
        return this.lorcanaSetName;
    }

    public getClassifications(): string {
        return this.classifications;
    }

    public getDateAdded(): string {
        return this.dateAdded;
    }

    public getSetNum(): number {
        return this.setNum;
    }

    public getColor(): string {
        return this.color;
    }

    public getGamemode(): string {
        return this.gamemode;
    }

    public getFranchise(): string {
        return this.franchise;
    }

    public getImage(): string {
        return this.image;
    }

    public getCost(): number {
        return this.cost;
    }

    public isInkable(): boolean {
        return this.inkable;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getLore(): number {
        return this.lore;
    }

    public getRarity(): string {
        return this.rarity;
    }

    public getFlavorText(): string {
        return this.flavorText;
    }

    public getUniqueId(): string {
        return this.uniqueId;
    }

    public getCardNum(): number {
        return this.cardNum;
    }

    public getBodyText(): string {
        return this.bodyText;
    }

    public getWillpower(): number {
        return this.willpower;
    }

    public getCardVariants(): string {
        return this.cardVariants;
    }

    public getDateModified(): string {
        return this.dateModified;
    }

    public getStrength(): number {
        return this.strength;
    }

    public getSetId(): string {
        return this.setId;
    }

    // Setters
    public setArtist(artist: string): void {
        this.artist = artist;
    }

    public setLorcanaSetName(lorcanaSetName: string): void {
        this.lorcanaSetName = lorcanaSetName;
    }

    public setClassifications(classifications: string): void {
        this.classifications = classifications;
    }

    public setDateAdded(dateAdded: string): void {
        this.dateAdded = dateAdded;
    }

    public setSetNum(setNum: number): void {
        this.setNum = setNum;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public setGamemode(gamemode: string): void {
        this.gamemode = gamemode;
    }

    public setFranchise(franchise: string): void {
        this.franchise = franchise;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public setCost(cost: number): void {
        this.cost = cost;
    }

    public setInkable(inkable: boolean): void {
        this.inkable = inkable;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public setLore(lore: number): void {
        this.lore = lore;
    }

    public setRarity(rarity: string): void {
        this.rarity = rarity;
    }

    public setFlavorText(flavorText: string): void {
        this.flavorText = flavorText;
    }

    public setUniqueId(uniqueId: string): void {
        this.uniqueId = uniqueId;
    }

    public setCardNum(cardNum: number): void {
        this.cardNum = cardNum;
    }

    public setBodyText(bodyText: string): void {
        this.bodyText = bodyText;
    }

    public setWillpower(willpower: number): void {
        this.willpower = willpower;
    }

    public setCardVariants(cardVariants: string): void {
        this.cardVariants = cardVariants;
    }

    public setDateModified(dateModified: string): void {
        this.dateModified = dateModified;
    }

    public setStrength(strength: number): void {
        this.strength = strength;
    }

    public setSetId(setId: string): void {
        this.setId = setId;
    }

    // toString method
    public toString(): string {
        return `Card {
            artist: ${this.artist},
            setName: ${this.lorcanaSetName},
            classifications: ${this.classifications},
            dateAdded: ${this.dateAdded},
            setNum: ${this.setNum},
            color: ${this.color},
            gamemode: ${this.gamemode},
            franchise: ${this.franchise},
            image: ${this.image},
            cost: ${this.cost},
            inkable: ${this.inkable},
            name: ${this.name},
            type: ${this.type},
            lore: ${this.lore},
            rarity: ${this.rarity},
            flavorText: ${this.flavorText},
            uniqueId: ${this.uniqueId},
            cardNum: ${this.cardNum},
            bodyText: ${this.bodyText},
            willpower: ${this.willpower},
            cardVariants: ${this.cardVariants},
            dateModified: ${this.dateModified},
            strength: ${this.strength},
            setId: ${this.setId}
        }`;
    }
}