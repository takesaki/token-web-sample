<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

/// wallet connect /////
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue'

const projectId = '{YOUR_PROJECT_ID}'

// 2. Set chains
const testnet = {
  chainId: 80002,
  name: 'Polygon Amoy Testnet',
  currency: 'MATIC',
  explorerUrl: 'https://amoy.polygonscan.com/',
  rpcUrl: 'https://rpc-amoy.polygon.technology/'
}
const metadata = {
  name: 'Sample dApps',
  description: 'My first dApps.',
  url: 'http://localhost:5713', // url must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false, // true by default
})

const modal = createWeb3Modal({
  ethersConfig,
  chains: [testnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})
///////////////////////


</script>

<template>

  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="250" height="250" />

    <div class="wrapper">
      <HelloWorld msg="This is ERC20." />
      <router-link to="/">wallet connect</router-link>
    </div>
    
  </header>
  <main>
    <router-view />
  </main>
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
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
