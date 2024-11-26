import { CardApiLorcast } from "./CardApiLorcast";

export class DeckCard {

    private card: CardApiLorcast;
    private quantity: number

    constructor(card: CardApiLorcast, quantity: number) {
        this.card = card;
        this.quantity = quantity;
    }

    public getCard(): CardApiLorcast {
        return this.card;
    }

    public setCard(card: CardApiLorcast): void {
        this.card = card;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity:number): void {
        this.quantity=quantity;
    }
}