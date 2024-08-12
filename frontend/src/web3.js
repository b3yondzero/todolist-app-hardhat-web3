import Web3 from 'web3';
import TodoABI from './contracts/Todo.json';
import contractAddress from "./contracts/contract-address.json";
const web3 = window.ethereum ? new Web3(window.ethereum) : new Web3('http://localhost:8545');
const todoContract = new web3.eth.Contract(TodoABI.abi, contractAddress.Todo);

export { web3, todoContract };
