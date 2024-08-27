// src/components/Observer.ts

import {IItem} from "./Item";

export class Observer {
    protected observers: Function[] = [];

    subscribe(fn: Function) {
        this.observers.push(fn);
    }

    unsubscribe(fn: Function) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    notify(data: any) {
        this.observers.forEach(observer => observer(data));
    }
}

export class EnhancedObserver extends Observer {
    notify(data: { sumCoins: number; selectedItems: IItem[] }) {
        this.observers.forEach(observer => observer(data));
    }
}
