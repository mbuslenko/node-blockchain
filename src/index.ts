import { Wallet } from './wallet/wallet';

const user1 = new Wallet();
const user2 = new Wallet();

user1.sendMoney(100, user2.publicKey);
user2.sendMoney(100, user1.publicKey);
