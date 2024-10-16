import { Card } from "./Card";

export class Deck {

    private deckId: number;
    private deckName: string;
    private userName: string;
    private creationDate: Date;
    private updateDate: Date;
    private firstInk: string;
    private secondInk: string;
    private cardsArray: Array<Card>;

    constructor(deckName: string, userName: string, creationDate: Date, updateDate: Date, firstInk: string, secondInk: string) {
        this.deckId = 0;
        this.deckName = deckName;
        this.userName = userName;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.firstInk = firstInk;
        this.secondInk = secondInk;
        this.cardsArray = [];
    }

    // Getters
    public getDeckId(): number {
        return this.deckId;
    }

    public getDeckName(): string {
        return this.deckName;
    }

    public getUserName(): string {
        return this.userName;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public getUpdateDate(): Date {
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

    public setUserName(userName: string): void {
        this.userName = userName;
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
            userName: "${this.userName}",
            creationDate: ${this.creationDate.toISOString()},
            updateDate: ${this.updateDate.toISOString()},
            firstInk: "${this.firstInk}",
            secondInk: "${this.secondInk}",
            cards: [${this.cardsArray.map(card => card.toString()).join(", ")}]
        }`;
    }

}