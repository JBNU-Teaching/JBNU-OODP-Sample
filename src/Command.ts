// src/components/Command.ts

import {VendingMachine} from "./State";
import {IItem} from "./Item";

export interface Command {
    execute(): void;
}

export class AddCoinCommand implements Command {
    private vendingMachine: VendingMachine;
    private coin: number;

    constructor(vendingMachine: VendingMachine, coin: number) {
        this.vendingMachine = vendingMachine;
        this.coin = coin;
    }

    execute(): void {
        this.vendingMachine.addCoins(this.coin);
        console.log(`Added ${this.coin} coins. Current sum: ${this.vendingMachine.sumCoins}`);
    }
}

export class SelectItemCommand implements Command {
    private vendingMachine: VendingMachine;
    private item: IItem;

    constructor(vendingMachine: VendingMachine, item: IItem) {
        this.vendingMachine = vendingMachine;
        this.item = item;
    }

    execute(): void {
        if (this.vendingMachine.sumCoins >= this.item.price) {
            this.vendingMachine.sumCoins -= this.item.price;
            this.vendingMachine.pushItem(this.item);
        } else {
            alert('Not enough coins to select this item.');
        }
    }
}
