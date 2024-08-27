// src/components/TemplateMethod.ts

import { IItem } from './Item';

export abstract class ItemSelectionTemplate {
    protected abstract checkAvailability(sumCoins: number, itemPrice: number): boolean;
    protected abstract processPayment(sumCoins: number, itemPrice: number): number;
    protected abstract handleSuccess(item: IItem): void;

    public selectItem(sumCoins: number, item: IItem): number {
        if (this.checkAvailability(sumCoins, item.price)) {
            const updatedCoins = this.processPayment(sumCoins, item.price);
            this.handleSuccess(item);
            return updatedCoins;
        } else {
            alert('코인이 부족합니다.');
            return sumCoins;
        }
    }
}

export class DefaultItemSelection extends ItemSelectionTemplate {
    protected checkAvailability(sumCoins: number, itemPrice: number): boolean {
        return sumCoins >= itemPrice;
    }

    protected processPayment(sumCoins: number, itemPrice: number): number {
        return sumCoins - itemPrice;
    }

    protected handleSuccess(item: IItem): void {
        console.log(`Successfully selected ${item.name}`);
    }
}
