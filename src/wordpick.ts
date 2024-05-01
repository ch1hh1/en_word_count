/**
 * 英文テキストを空白文字を考慮しつつ単語で区切り、1単語ずつを要素に持つ配列を返す
 * @param fileName
 * @returns
 */
export const makeWordSplitArr = (fileName: string): string[] => {
  // nullかundefinedのチェックには==nullを使うべきらしい
  if (fileName === '' || fileName == null) throw new Error('No file name');
  if (fileName.toLowerCase().slice(-4) !== '.txt') throw new Error('Reject files other than text files');

  const pathStr: string = `../input/${fileName}`;
  let ipt: string = require('fs').readFileSync(pathStr, 'utf-8');
  if (ipt == null) throw new Error('No file');
  if (ipt === '') throw new Error('No statement');

  // 英語以外を半角スペース化し、空白文字全てを半角スペースに寄せ、半角スペースで切り空白は除去
  const noLinefeed = ipt.replace(/[^a-zA-Z]/g, ' ').replace(/\s/g, ' ');
  const splitStrings: string[] = noLinefeed.split(' ').filter((str) => str !== '');

  return splitStrings;
};

export type WordInfo = {
  name: string;
  cnt: number;
};
/**
 * 単語の集計JSON文字列を作成する
 * @param strArr
 * @returns
 */
export const makeWordAggregateJson = (strArr: string[]): string => {
  const theArray: WordInfo[] = [];
  for (const str of strArr) {
    // 小文字に寄せて比較する（念の為既出の物も小文字寄せ）
    const judge = theArray.some((word) => word.name.toLowerCase() === str.toLowerCase());
    if (judge) {
      const duplicateWord = theArray.find((word) => word.name.toLowerCase() === str.toLowerCase());
      if (duplicateWord) {
        duplicateWord.cnt = duplicateWord.cnt + 1;
      }
    } else if (!judge) {
      // 新規登録時は必ず小文字に寄せる
      theArray.push({ name: str.toLowerCase(), cnt: 1 });
    }
  }
  const json = JSON.stringify(theArray);
  return json;
};

/**
 * 除外対象の単語配列
 */
export const exclude = [
  'the',
  'as',
  'on',
  'in',
  'to',
  'me',
  'hi',
  'or',
  'and',
  'this',
  'that',
  'you',
  'my',
  'from',
  'before',
  'after',
  'of',
  'is',
  'be',
  'at',
  'an',
  'as'
];
/**
 * 集計対象を制限する
 * @param
 * @returns
 */
export const filterAggregationTartget = (strArr: string[]) => {
  if (strArr.length === 0) return [];

  // 1文字を除外する
  const lengthFiltered = strArr.filter((word: string) => word.length >= 2);

  // 特定の単語を除外する（小文字寄せして除外）
  const wordExcluded = lengthFiltered.filter((word: string) => !exclude.includes(word.toLowerCase()));

  return wordExcluded;
};
