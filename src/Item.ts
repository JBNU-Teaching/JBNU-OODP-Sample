// src/components/Item.ts

export interface IItem {
    name: string;
    price: number;
    getDescription(): string;
}

export class BasicItem implements IItem {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    getDescription(): string {
        return `${this.name}`;
    }
}

export class ItemDecorator implements IItem {
    protected decoratedItem: IItem;

    constructor(item: IItem) {
        this.decoratedItem = item;
    }

    // @ts-ignore
    get name(): string {
        return this.decoratedItem.name;
    }

    // @ts-ignore
    get price(): number {
        return this.decoratedItem.price;
    }

    getDescription(): string {
        return this.decoratedItem.getDescription();
    }
}

export class DiscountedItem extends ItemDecorator {
    private discount: number;

    constructor(item: IItem, discount: number) {
        super(item);
        this.discount = discount;
    }

    // @ts-ignore
    get price(): number {
        return this.decoratedItem.price - this.discount;
    }

    getDescription(): string {
        return `${this.decoratedItem.getDescription()} (Sale: $${this.discount})`;
    }
}
