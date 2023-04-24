import {Network} from '../Network';
import {INetwork} from '../types';

export const Networks: INetwork[] = [
  new Network('Binance Smart Chain', 'BNB', 18, 60),
  new Network('Ethereum', 'ETH', 18, 60),
];
