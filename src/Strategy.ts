// src/components/Strategy.ts

export interface CoinAdditionStrategy {
    addCoins(currentSum: number, coinValue: number): number;
}

export class BasicCoinAdditionStrategy implements CoinAdditionStrategy {
    addCoins(currentSum: number, coinValue: number): number {
        return currentSum + coinValue;
    }
}

export class BonusCoinStrategy implements CoinAdditionStrategy {
    addCoins(currentSum: number, coinValue: number): number {
        return currentSum + coinValue + 10; // 10코인 보너스
    }
}

export class DoubleCoinStrategy implements CoinAdditionStrategy {
    addCoins(currentSum: number, coinValue: number): number {
        return currentSum + coinValue * 2;
    }
}
