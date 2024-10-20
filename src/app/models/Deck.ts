import { Card } from "./Card";

export class Deck {

    private deckId: number | null;
    private deckName: string;
    private username: string;
    private creationDate: Date;
    private updateDate: Date | null;
    private firstInk: string;
    private secondInk: string;
    private cardsArray: Array<Card>;

    constructor(deckId: number | null, deckName: string, username: string, creationDate: Date, updateDate: Date | null, firstInk: string, secondInk: string) {
        this.deckId = deckId;
        this.deckName = deckName;
        this.username = username;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.firstInk = firstInk;
        this.secondInk = secondInk;
        this.cardsArray = [];
    }

    // Getters
    public getDeckId(): number | null {
        return this.deckId;
    }

    public getDeckName(): string {
        return this.deckName;
    }

    public getUsername(): string {
        return this.username;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public getUpdateDate(): Date | null {
        return this.updateDate;
    }

    public getFirstInk(): string {
        return this.firstInk;
    }

    public getSecondInk(): string {
        return this.secondInk;
    }

    public getCardsArray(): Array<Card> {
        return this.cardsArray;
    }

    // Setters
    public setDeckId(deckId: number): void {
        this.deckId = deckId;
    }

    public setDeckName(deckName: string): void {
        this.deckName = deckName;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }

    public setUpdateDate(updateDate: Date): void {
        this.updateDate = updateDate;
    }

    public setFirstInk(firstInk: string): void {
        this.firstInk = firstInk;
    }

    public setSecondInk(secondInk: string): void {
        this.secondInk = secondInk;
    }

    public setCardsArray(cardsArray: Array<Card>): void {
        this.cardsArray = cardsArray;
    }

    public toString(): string {
        return `Deck {
            deckId: ${this.deckId},
            deckName: "${this.deckName}",
            username: "${this.username}",
            creationDate: ${this.creationDate.toISOString()},
            updateDate: ${this.updateDate != null ? this.updateDate.toISOString() : null},
            firstInk: "${this.firstInk}",
            secondInk: "${this.secondInk}",
            cards: [${this.cardsArray.map(card => card.toString()).join(", ")}]
        }`;
    }

}