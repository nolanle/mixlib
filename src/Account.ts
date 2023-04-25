import {BIP32Interface} from 'bip32';

import {AccountBSC, AccountETH} from './chains';
import {IChainAccount, INetwork} from './types';

export class Account {
  private network: INetwork;
  private account: IChainAccount;

  constructor(network: INetwork, xprv: BIP32Interface) {
    this.network = network;
    switch (this.network.symbol) {
      case 'BNB':
        this.account = new AccountBSC(xprv.neutered(), xprv);
        break;
      case 'ETH':
        this.account = new AccountETH(xprv.neutered(), xprv);
        break;
      default:
        throw Error('Unsupport network');
    }
  }

  public toPrivateKey() {
    return this.account.toPrivateKey();
  }

  public toAddress() {
    return this.account.toAddress();
  }

  public validateAddress(address: string) {
    return this.account.validateAddress(address);
  }

  public getBalance(address?: string) {
    return this.account.getBalance(address);
  }

  public getTransactions(address?: string) {
    return this.account.getTransactions(address);
  }

  public createTransaction(address: string, amount: number) {
    return this.account.createTransaction(address, amount);
  }

  public estimateMaxTransfer(address: string) {
    return this.account.estimateMaxTransfer(address);
  }

  public sendTransaction(tx: any) {
    return this.account.sendTransaction(tx);
  }
}
