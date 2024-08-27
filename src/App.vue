
<script lang="ts">
import { defineComponent } from 'vue';
import { EnhancedObserver } from './Observer';
import { IItem, BasicItem, DiscountedItem } from './Item';
import { CoinRenderer, Coin10Renderer, Coin50Renderer, Coin100Renderer } from './CoinRenderer';
import { DefaultItemSelection } from './TemplateMethod';
import { BasicCoinAdditionStrategy } from './Strategy';
import { VendingMachine, NoCoinState, HasCoinState } from './State';
import { Command, AddCoinCommand, SelectItemCommand } from './Command';

export default defineComponent({
computed: {
 AddCoinCommand() {
   return AddCoinCommand
 },
 SelectItemCommand() {
   return SelectItemCommand
 }
},
data() {
 return {
   vendingMachine: new VendingMachine(new NoCoinState()),
   items: this.createItems(),
   selectedItems: [] as IItem[],
   enhancedObserver: new EnhancedObserver(),
   coinRenderers: [new Coin10Renderer(), new Coin50Renderer(), new Coin100Renderer()], // 코인 렌더러 객체들,
   coins: [
     { id: 'coin-10', value: 10 },
     { id: 'coin-50', value: 50 },
     { id: 'coin-100', value: 100 }
   ],
   coinAdditionStrategy: new BasicCoinAdditionStrategy(),
   itemSelectionTemplate: new DefaultItemSelection()
 };
},
methods: {
 createItems(): IItem[] {
   const basicItems = Array.from({ length: 20 }, (v, i) =>
       new BasicItem(`item-${i + 1}`, (i + 1) * 10)
   );

   return basicItems.map((item, index) => {
     if (index % 2 === 0) {
       return new DiscountedItem(item, 5);
     }
     return item;
   });
 },
 executeCommand(command: Command) {
   command.execute();
   this.updateState();
   this.enhancedObserver.notify({ sumCoins: this.vendingMachine.sumCoins, selectedItems: this.vendingMachine.getItems() });
 },
 updateState() {
   if (this.vendingMachine.sumCoins > 0) {
     this.vendingMachine.setState(new HasCoinState());
   } else {
     this.vendingMachine.setState(new NoCoinState());
   }
 },
 initializeCoins() {
   const coins = [
     new Coin10Renderer(),
     new Coin50Renderer(),
     new Coin100Renderer()
   ];

   coins.forEach((coin) => {
     const element = document.getElementById(coin.getId());
     element?.addEventListener('click', () => this.executeCommand(new AddCoinCommand(this.vendingMachine, coin.getValue())));
   });
 },
 observeChanges() {
   this.enhancedObserver.subscribe((data: { sumCoins: number; selectedItems: IItem[] }) => {
      this.vendingMachine.sumCoins = data.sumCoins;
      this.selectedItems = data.selectedItems;
   });
 },
  selectItem(item: IItem) {
    this.executeCommand(new SelectItemCommand(this.vendingMachine, item));
  },
},
mounted() {
 this.initializeCoins();
 this.observeChanges();
 this.updateState();
}
});
</script>

<template>
  <div class="machine-component">
    <div class="machine-title-text">현재 넣은 코인: {{ vendingMachine.sumCoins }}</div>
    <div class="machine-item">
      <div v-for="(item, index) in items" :key="index" class="grid-item" @click="
      () => {
        selectItem(item);
      }">
        <div class="item-text">
          {{ item.getDescription() }}
        </div>
        <div class="item-price-text">
          {{ item.price }} coin
        </div>
      </div>
    </div>
    <div class="item-output-container">
      <div class="item-output">
        <div v-for="(item, index) in selectedItems" :key="index" class="selected-item">
          {{ item.getDescription() }}
        </div>
      </div>
    </div>
  </div>

  <div class="coin-component">
    <div
        v-for="coin in coins"
        :key="coin.id"
        :id="coin.id"
        :class="'coin ' + coin.id"
        @click="executeCommand(new AddCoinCommand(vendingMachine, coin.value))"
    >
      <div class="coin-image-component">
        <div class="coin-image"></div>
      </div>
      <div class="coin-text">{{ coin.value }} coin</div>
    </div>
  </div>

</template>



<style scoped>

.machine-component {
  max-width: 1050px;
  width: 50dvw;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  display: grid;
  grid-template-rows: 1fr 20fr 5fr;
}

.machine-title-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000;
  text-align: center;
  margin-top: 10px;
  width: 100%;
}

.machine-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 10px; /* 그리드 아이템 간의 간격 */
  width: 100%; /* 원하는 크기로 조정 */
  height: 100%; /* 원하는 크기로 조정 */
  padding: 10px;
}

.grid-item {
  background-color: #f0f0f0; /* 그리드 아이템의 배경색 */
  border: 1px solid #ccc; /* 그리드 아이템의 테두리 */
  height: 100%; /* 그리드 아이템의 높이 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #444;
}

.item-price-text {
  font-size: 1rem;
  font-weight: 500;
  color: #444;
}

.grid-item:hover {
  cursor: pointer;
  background-color: #000000;
}

.grid-item:hover .item-text {
  color: #ffffff;
}

.grid-item:hover .item-price-text {
  color: #ffffff;
}


.item-output-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 20dvh;
}

.item-output {
  width: 95%;
  height: 90%;
  border: #bababa 1px solid;
  border-radius: 10px;
  background-color: #efefef;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: minmax(50px, auto);
  gap: 10px;

  overflow-y: scroll;

  scrollbar-width: thin;
  scrollbar-color: #bababa #efefef;
}

.selected-item {
  font-size: 1rem;
  font-weight: 500;
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
  color: #000;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 80px;
  min-height: 50px;
}

.coin-component {
  margin-left: 5dvw;
  width: 30dvw;
  max-width: 800px;
  height: 20%;
  align-items: center;
  border-radius: 10px;
  border: #f8f8f8 1px solid;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.coin {
  display: flex;
  flex-direction: column;
  width: 9.5rem;
  height: 9.5rem;
}

.coin .coin-image-component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coin .coin-image {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.coin .coin-image:hover {
  cursor: pointer;
  transform: scale(1.1) rotate(360deg);
  transition: transform 0.25s;
}


.coin .coin-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}

.coin-10 .coin-image {
  background-image: url(src/assets/svg/coin-10.svg);
}

.coin-50 .coin-image {
  background-image: url(src/assets/svg/coin-50.svg);
}

.coin-100 .coin-image {
  background-image: url(src/assets/svg/coin-100.svg);
}

</style>
