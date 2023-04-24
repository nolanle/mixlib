import * as chai from 'chai';
import * as mocha from 'mocha';
import {TWordCount, create, recovery} from '../src/index';

const expect = chai.expect;
const wordsCount: TWordCount[] = [12, 15, 18, 21, 24];

const testCase = (words: TWordCount) =>
  new Promise((resolve, reject) => {
    try {
      create('Master Key', words).then(masterKey =>
        resolve(masterKey.mnemonic.split(' ').length),
      );
    } catch (error) {
      reject(error);
    }
  });

describe('Should be a valid mnemonic words count', () => {
  it(`should be a valid mnemonic ${wordsCount[0]} words`, () => {
    testCase(wordsCount[0]).then(length => {
      expect(wordsCount[0]).to.equal(length);
    });
  });

  it(`should be a valid mnemonic ${wordsCount[1]} words`, () => {
    testCase(wordsCount[1]).then(length => {
      expect(wordsCount[1]).to.equal(length);
    });
  });

  it(`should be a valid mnemonic ${wordsCount[2]} words`, () => {
    testCase(wordsCount[2]).then(length => {
      expect(wordsCount[2]).to.equal(length);
    });
  });

  it(`should be a valid mnemonic ${wordsCount[3]} words`, () => {
    testCase(wordsCount[3]).then(length => {
      expect(wordsCount[3]).to.equal(length);
    });
  });

  it(`should be a valid mnemonic ${wordsCount[4]} words`, () => {
    testCase(wordsCount[4]).then(length => {
      expect(wordsCount[4]).to.equal(length);
    });
  });
});

describe('Should be a recovery mnemonic', () => {
  it(`should be a VALID mnemonic recovery`, () => {
    recovery(
      'Master Key',
      'stick antique gadget enter build accident report session eagle exhibit pizza boost',
    ).then(masterKey => {
      expect(!masterKey).to.equal(false);
    });
  });

  it(`should be a INVALID mnemonic recovery`, () => {
    recovery('Master Key', 'basket actual').then(masterKey => {
      expect(masterKey).to.equal(null);
    });
  });
});
