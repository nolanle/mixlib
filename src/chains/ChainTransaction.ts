import {BIP32Interface} from 'bip32';
import {IChainTransaction} from '../types';

export class ChainTransaction implements IChainTransaction {
  hash: string;
  blockHash: string;
  blockNumber: number;
  destination: string;
  source: string;
  value: number;
  fee: number;

  constructor(
    hash: string,
    blockHash: string,
    blockNumber: number,
    destination: string,
    source: string,
    value: number,
    fee: number,
  ) {
    this.hash = hash;
    this.blockHash = blockHash;
    this.blockNumber = blockNumber;
    this.destination = destination;
    this.source = source;
    this.value = value;
    this.fee = fee;
  }
}
