// src/components/CoinRenderer.ts

export abstract class CoinRenderer {
    protected abstract getId(): string;
    protected abstract getValue(): number;
    protected abstract getImage(): string;

    public render(): string {
        return `

    `;
    }
}

export class Coin10Renderer extends CoinRenderer {
    protected getId(): string {
        return 'coin-10';
    }
    protected getValue(): number {
        return 10;
    }
    protected getImage(): string {
        return 'src/assets/svg/coin-10.svg';
    }
}

export class Coin50Renderer extends CoinRenderer {
    protected getId(): string {
        return 'coin-50';
    }
    protected getValue(): number {
        return 50;
    }
    protected getImage(): string {
        return 'src/assets/svg/coin-50.svg';
    }
}

export class Coin100Renderer extends CoinRenderer {
    protected getId(): string {
        return 'coin-100';
    }
    protected getValue(): number {
        return 100;
    }
    protected getImage(): string {
        return 'src/assets/svg/coin-100.svg';
    }
}
