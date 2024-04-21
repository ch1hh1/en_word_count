/**
 * 英文テキストを空白文字を考慮しつつ単語で区切り、1単語ずつを要素に持つ配列を返す
 * @param fileName
 * @returns
 */
export const makeWordSplitArr = (fileName: string): string[] => {
  // inputフォルダ内に置いたファイルへの相対パス文字列
  const pathStr: string = `../input/${fileName}`;
  // ファイル読みこみ
  let ipt: string = require('fs').readFileSync(pathStr, 'utf-8');
  // 文字列を整える
  const noLinefeed = ipt
    .replace(/[^\t a-zA-Z0-9"' ]/g, '')
    .replace(/\s/g, ' ')
    .replace(/\"/g, ' ');
  const splitStrings: string[] = noLinefeed.split(' ').filter((str) => str !== '');

  // テキストが単語で分割された配列を返却
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
