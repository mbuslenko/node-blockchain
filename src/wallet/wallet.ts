import * as crypto from 'crypto';
import { Chain } from '../chain/chain';
import { Transaction } from '../transaction/transaction';

export class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    this.publicKey = keyPair.publicKey;
    this.privateKey = keyPair.privateKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end()

    const signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);

  }
}
