import { JsonRpcProvider, WebSocketProvider, Contract } from 'ethers'
import NetworkInfo from '../../config/Network.json'
import ContractInfo from '../../config/NewToken.json'

const RPCEndpoint = 'https://' + NetworkInfo.rpcEndpoint;
const WebSocketEndpoint = 'wss://polygon-amoy-bor-rpc.publicnode.com';

const ADDRESS = NetworkInfo.contractAddress;
const ABI = ContractInfo.abi;



// Contract Call用
const provider = new WebSocketProvider(WebSocketEndpoint);
const contract: Contract = new Contract(ADDRESS, ABI, provider);

const getContractObject = ():Contract => {
  return new Contract(ADDRESS, ABI, provider);
}

const getOwner = async () => {
  return contract.owner();
}

const getSymbol = async () => {
  return contract.symbol(); 
}

const getBalance = async (address: string) => {
  return contract.balanceOf(address);
}

const getBalanceofID = async (id: string) => {
  return contract.balanceOfId(id);
}

const getTotalSupply = async () => {
  return contract.totalSupply();
}

export default {
  getContractObject,
  getBalance,
  getBalanceofID,
  getTotalSupply,
  getSymbol,
  getOwner
};