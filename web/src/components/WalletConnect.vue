<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/vue'


import ContractInfo from '../config/NewToken.json'

import token from './web3/contractwc'

import EventView from './EventTracer.vue';

const { address, chainId, isConnected } = useWeb3ModalAccount()
const { walletProvider, walletProviderType } = useWeb3ModalProvider()

let symbol = ref('');

let message = ref('Connect with WalletConnect.');
let myAmount = ref(0);
let transferAmount = ref(10);
let toAddress = ref(import.meta.env.VITE_DEFAULT_TO_ADDRESS);
let dialog = ref(false);
let canMint = ref(false);
let ownerAddress = ref('');

onMounted(() => {
  init();
});

const init = async () => {
  console.log('init');
  symbol.value = await token.getSymbol();
  ownerAddress.value = await token.getOwner();
}

watch(address, async () => {
  if(address.value) {
    myAmount.value = Number(await token.getBalance(address.value));
  }else{
    myAmount.value = 0;
    transferAmount.value = 1;
  }
  
});

watchEffect(async () => {
  canMint.value = false;
  if(isConnected.value) {
    if(address.value == ownerAddress.value){
      canMint.value = true;
    }
  }
});

const showDialog = () => {
  dialog.value = true;
}

const mint = async() => {
  
  const contract = await getContract();
  contract.mint(toAddress.value, transferAmount.value).then((transferResult) => {
    console.dir(transferResult);
    console.log("mint token");
  })

}

const transfer = async() => {

  const contract = await getContract();
  contract.transfer(toAddress.value, transferAmount.value).then((transferResult) => {
    console.dir(transferResult);
  })
  dialog.value = false;
}

const getContract = async() => {
  const provider = new BrowserProvider(walletProvider.value!);
  const signer = await provider.getSigner();
  const contract = new Contract(token.ADDRESS, ContractInfo.abi, signer);
  return contract;
}

</script>

<template>
  <v-container class="bg-gray-darken-4">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <p v-show="!isConnected" color="primary">{{ message }}</p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <w3m-button />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-slider
          v-model="transferAmount"
          :disabled="!isConnected"
          :min="1"
          :max="myAmount"
          :step="1"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row no-gutters align="center" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="2">
        <span class="text-h4">{{ transferAmount }}</span> {{ symbol }}
      </v-col>
      <v-col cols="1">
        <v-icon>mdi-arrow-right-bold-outline</v-icon>
      </v-col>
      <v-col cols="9">
        <v-text-field
        v-model="toAddress"
        variant="underlined"
        label="To Address"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn variant="outlined" :disabled="!isConnected" @click="showDialog" append-icon="mdi-logout">Transfer</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn variant="outlined" :disabled="!canMint" @click="mint" append-icon="mdi-login">Mint!</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-hand-coin-outline"
        :text="'You are about to transfer ' + transferAmount + symbol + ' to ' + toAddress + '.'"
        title="Confirm Transfer."
      >
        <template v-slot:actions>
          <v-btn
            text="Cancel"
            @click="dialog = false"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn class="ms-auto" text="Transfer" @click="transfer"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  <EventView :myAddress="address" :toAddress="toAddress" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  h1 {
    place-items: center;
    margin: 0 2rem 0 0;
    font-size: 2rem;
  }
}
</style>