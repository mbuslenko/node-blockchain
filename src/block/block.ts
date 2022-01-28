import * as crypto from 'crypto';

import Transaction from '../transaction/transaction';

export default class Block {
  public nonce = Math.round(Math.random() * 99999999999)

  constructor(public previousHash: string, public transaction: Transaction) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('sha256');

    hash.update(str).end();
    return hash.digest('hex');
  }

  toString() {
    return JSON.stringify(this);
  }
}
