import Web3 from 'web3';
import {subtract} from 'lodash';
import {BIP32Interface} from 'bip32';
import Wallet from 'ethereumjs-wallet';

import {IChainAccount} from '../types';
import {ChainTransaction} from './ChainTransaction';

export class AccountETH implements IChainAccount {
  base: number;
  xpub: BIP32Interface;
  xprv?: BIP32Interface;
  endpoint: string;
  wallet: Wallet;
  web3: Web3;

  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    this.base = 1e18;
    this.xpub = xpub;
    this.xprv = xprv;
    this.wallet = this.xprv
      ? Wallet.fromExtendedPrivateKey(this.xprv.toBase58())
      : Wallet.fromExtendedPublicKey(this.xpub.toBase58());
    this.endpoint =
      'https://goerli.infura.io/v3/e68e9eb0a4aa4c23840da2924a83b392';
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.endpoint));
  }

  public toPrivateKey() {
    return this.wallet.getPrivateKey().toString('hex');
  }

  public toAddress() {
    return this.wallet.getChecksumAddressString();
  }

  public validateAddress(address: string) {
    return this.web3.utils.isAddress(address);
  }

  public async getBalance(address?: string) {
    let balance = '';
    const destAddr = address || this.toAddress();
    await this.web3.eth.getBalance(destAddr).then(value => (balance = value));
    return (this.web3.utils.fromWei(balance, 'ether') as unknown as number) / 1;
  }

  public getTransactions(address: string) {}

  public async createTransaction(address: string, amount: number) {
    const amountToSend = this.web3.utils.toWei(`${amount}`, 'ether');
    const gasPrice = await this.web3.eth.getGasPrice();
    const estimatedFee = await this.web3.eth.estimateGas({
      to: address,
      data: '0x',
    });

    return {
      from: this.toAddress(),
      to: address,
      value: amountToSend,
      gasPrice: gasPrice,
      gas: estimatedFee,
    };
  }

  public async getEstimatedFee(address: string) {
    const gasPrice = await this.web3.eth.getGasPrice();
    const estimatedFee = await this.web3.eth.estimateGas({
      to: address,
      data: '0x',
    });
    const calculate = parseFloat(gasPrice) * estimatedFee;
    return (
      (this.web3.utils.fromWei(`${calculate}`, 'ether') as unknown as number) /
      1
    );
  }

  public async estimateMaxTransfer(address: string) {
    const balance = await this.getBalance();
    const fee = await this.getEstimatedFee(address);
    const estimated =
      balance > fee ? subtract(balance * this.base, fee * this.base) : 0;
    return estimated / this.base;
  }

  public async sendTransaction(tx: any) {
    try {
      const signedRawTx = await this.web3.eth.accounts.signTransaction(
        tx,
        this.toPrivateKey(),
      );

      const transaction = await this.web3.eth.sendSignedTransaction(
        signedRawTx.rawTransaction,
      );

      return transaction.transactionHash;
    } catch (error) {
      return null;
    }
  }
}
