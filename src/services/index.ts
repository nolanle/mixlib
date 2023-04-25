import * as bip39 from 'bip39';
import {v4 as uuid} from 'uuid';

import {MasterKey} from '../MasterKey';
import {wordsCountToStrength} from '../utils';
import {IMasterKey} from '../types';

/**
 * Create a new masterkey
 * @param name The masterkey's identify name
 * @param words The materkey's words count
 * @returns
 */
export const create = async (name: string, words: 12 | 15 | 18 | 21 | 24) => {
  const id: string = uuid();
  const mnemonic = bip39.generateMnemonic(wordsCountToStrength(words));
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return new MasterKey(id, name, mnemonic, seed.toString('hex'));
};

export const recovery = async (name: string, mnemonic: string) => {
  if (bip39.validateMnemonic(mnemonic)) {
    const id: string = uuid();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return new MasterKey(id, name, mnemonic, seed.toString('hex'));
  }
  return null;
};

export const asignMasterKey = (obj: IMasterKey) => {
  return new MasterKey(obj.id, obj.name, obj.mnemonic, obj.seed);
};
