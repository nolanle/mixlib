import Web3 from 'web3';
import {AccountETH} from './AccountETH';
import {BIP32Interface} from 'bip32';

export class AccountBSC extends AccountETH {
  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    super(xpub, xprv);
    this.endpoint = 'https://data-seed-prebsc-1-s1.binance.org:8545';
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.endpoint));
  }
}
