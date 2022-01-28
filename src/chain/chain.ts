import * as crypto from 'crypto'

import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

import Block from '../block/block';
import Transaction from '../transaction/transaction';

export default class Chain {
  public static instance = new Chain();

  chain: Block[] = [];

  constructor() {
    this.chain = [new Block(null, new Transaction(2077, 'mike', 'alice'))];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number) {
    let solution = 1;

    const spinner = createSpinner('⛏ mining...')
    spinner.start()

    while(true) {
      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();

      const attempt = hash.digest('hex');

      if (attempt.startsWith('00000')) {
        spinner.stop()
        console.log(chalk.yellow(`🔨 mined block, solution: ${solution}`))

        return solution;
      }

      solution += 1;
    }
  }

  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    const verifier = crypto.createVerify('SHA256');
    verifier.update(transaction.toString())

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce)
      this.chain.push(newBlock);
    }
  }


}