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
  const noLinefeed = ipt
    .replace(/[^a-zA-Z]/g, ' ')
    .replace(/\s/g, ' ');
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
    const judge = theArray.some((word) => word.name === str);
    if (judge) {
      const duplicateWord = theArray.find((word) => word.name === str);
      if (duplicateWord) {
        duplicateWord.cnt = duplicateWord.cnt + 1;
      }
    } else if (!judge) {
      theArray.push({ name: str, cnt: 1 });
    }
  }
  const json = JSON.stringify(theArray);
  return json;
};
