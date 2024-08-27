// src/components/State.ts

import {IItem} from "./Item";

export interface CoinState {
    handleRequest(vendingMachine: VendingMachine): void;
}

export class VendingMachine {
    private currentState: CoinState;
    public sumCoins: number;
    private selectedItems: IItem[] = [];

    constructor(initialState: CoinState, sumCoins: number = 0) {
        this.currentState = initialState;
        this.sumCoins = sumCoins;
    }

    setState(state: CoinState) {
        this.currentState = state;
    }

    addCoins(coin: number) {
        this.sumCoins += coin;
    }

    execute() {
        this.currentState.handleRequest(this);
    }

    pushItem(item: IItem) {
        this.selectedItems.push(item);
    }

    getItems() {
        return this.selectedItems;
    }
}

export class NoCoinState implements CoinState {
    handleRequest(vendingMachine: VendingMachine): void {
        console.log('No coins available. Please insert coins.');
    }
}

export class HasCoinState implements CoinState {
    handleRequest(vendingMachine: VendingMachine): void {
        console.log('Coins inserted. You can select an item.');
    }
}
