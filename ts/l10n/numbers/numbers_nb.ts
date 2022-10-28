//
// Copyright 2021-22 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Translating numbers into Norwegian bokmål
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Numbers, NUMBERS as NUMB } from '../messages';

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  const hundreds = Math.floor(n / 100);
  str += NUMBERS.ones[hundreds]
    ? (hundreds === 1 ? '' : NUMBERS.ones[hundreds] + NUMBERS.numSep) + 'hundre'
    : '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    str +=
      NUMBERS.ones[n] ||
      NUMBERS.tens[Math.floor(n / 10)] +
        (n % 10 ? NUMBERS.numSep + NUMBERS.ones[n % 10] : '');
  }
  return str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Are we computing an ordinal?
 * @returns The string representation of that number.
 */
function numberToWords(num: number, ordinal = false): string {
  if (num === 0) {
    return NUMBERS.zero;
  }
  if (num >= Math.pow(10, 36)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    const hundreds = num % 1000;
    if (hundreds) {
      // Case 0: hundreds === 1 and pos = 0, translate
      // Case 1: hundreds === 1 and pos = 1, no space, no translate
      // Case 2: hundreds === 1 and pos > 1, space, no translate
      // Case 3: space and translate
      const large = NUMBERS.large[pos];
      const hund = hundredsToWords_(num % 1000);
      const plural = hundreds > 1 && pos > 1 ? 'er' : '';
      // junk to see if it's this that runs
      // I don't think this ought to preempt if it isn't ordinal
      ordinal;  // to avoid getting a typescript compiler
      str =
        hund +
        (pos ?
          ' ' +
          large + (pos > 1 && plural) +
          (str ? ' ' : '' )
         : '') +
        str;
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str.replace(/ $/, '');
}

/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 *
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @returns The ordinal of the number as string.
 */
function numberToOrdinal(num: number, plural: boolean): string {
  if (num === 1) {
    return plural ? 'hele' : 'hel';
  }
  if (num === 2) {
    return plural ? 'halve' : 'halv';
  }
  return wordOrdinal(num) + (plural ? 'deler' : 'del');
}

/**
 * Creates a word ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function wordOrdinal(num: number): string {
  let ordinal = numberToWords(num, true);
  if (ordinal.match(/^null$/)) {
    ordinal = 'nullte';
  } else if (ordinal.match(/\ben$/)) {
    ordinal = ordinal.replace(/en$/, 'første');
  } else if (ordinal.match(/to$/)) {
    ordinal = ordinal.replace(/to$/, 'andre');
  } else if (ordinal.match(/tre$/)) {
    ordinal = ordinal.replace(/tre$/, 'tredje');
  } else if (ordinal.match(/fire$/)) {
    ordinal = ordinal.replace(/fire$/, 'fjerde');
  } else if (ordinal.match(/fem$/)) {
    ordinal = ordinal.replace(/fem$/, 'femte');
  } else if (ordinal.match(/seks$/)) {
    ordinal = ordinal.replace(/seks$/, 'sjette');
  } else if (ordinal.match(/sju$/)) {
    ordinal = ordinal.replace(/sju$/, 'sjuende');
  } else if (ordinal.match(/åtte$/)) {
    ordinal = ordinal.replace(/åtte$/, 'åttende');
  } else if (ordinal.match(/ni$/)) {
    ordinal = ordinal.replace(/ni$/, 'niende');
  } else if (ordinal.match(/ti$/)) {
    ordinal = ordinal.replace(/ti$/, 'tiende');
  } else if (ordinal.match(/elleve$/)) {
    ordinal = ordinal.replace(/elleve$/, 'ellevte');
  } else if (ordinal.match(/tolv$/)) {
    ordinal = ordinal.replace(/tolv$/, 'tolvte');
  } else if (ordinal.match(/tretten$/)) {
    ordinal = ordinal.replace(/tretten$/, 'trettende');
  } else if (ordinal.match(/fjorten$/)) {
    ordinal = ordinal.replace(/fjorten$/, 'fjortende');
  } else if (ordinal.match(/femten$/)) {
    ordinal = ordinal.replace(/femten$/, 'femtende');
  } else if (ordinal.match(/seksten$/)) {
    ordinal = ordinal.replace(/seksten$/, 'sekstende');
  } else if (ordinal.match(/søtten$/)) {
    ordinal = ordinal.replace(/søtten$/, 'søttende');
  } else if (ordinal.match(/atten$/)) {
    ordinal = ordinal.replace(/atten$/, 'attende');
  } else if (ordinal.match(/nitten$/)) {
    ordinal = ordinal.replace(/nitten$/, 'nittende');
  } else if (ordinal.match(/tusen$/)) {
    ordinal = ordinal.replace(/tusen$/, 'tusende');
  } else if (ordinal.match(/iard$/) || ordinal.match(/ion$/)) {
    ordinal = ordinal + 'te';
  } else if (ordinal.match(/iarder$/) || ordinal.match(/ioner$/)) {
    ordinal = ordinal + 'te';
  } else {
    ordinal = ordinal + 'de';
  }
  return ordinal;
}

/**
 * Creates a numeric ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  const str = num.toString();
  return str + '.';
}

const NUMBERS: Numbers = NUMB();
NUMBERS.wordOrdinal = wordOrdinal;
NUMBERS.numericOrdinal = numericOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;

export default NUMBERS;
// TODO: For simple speech output this should be different.
