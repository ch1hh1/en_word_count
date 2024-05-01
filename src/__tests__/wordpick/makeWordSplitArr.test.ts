import * as fs from 'fs';
import * as wordpick from '../../wordpick';

// 英文テキストを空白文字を考慮しつつ単語で区切り、
// 1単語ずつを要素に持つ配列を返す
// makeWordSplitArrのテスト

// -----共通モック化-----
jest.mock('fs');

// -----spy当て用変数定義-----
let spyReadFileSync: jest.SpyInstance;
let spyMakeWordSplitArr: jest.SpyInstance;

// -----テスト-----
describe('makeWordSplitArr（英文テキストを1単語ずつ分解する処理）', () => {
  beforeAll(() => {
    spyReadFileSync = jest.spyOn(fs, 'readFileSync');
    spyMakeWordSplitArr = jest.spyOn(wordpick, 'makeWordSplitArr');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.each`
    depiction             | arg           | expected
    ${'undefined'}        | ${undefined}  | ${'No file name'}
    ${'null'}             | ${null}       | ${'No file name'}
    ${'空文字'}           | ${''}         | ${'No file name'}
    ${'拡張子無し'}       | ${'test'}     | ${'Reject files other than text files'}
    ${'.txt以外の拡張子'} | ${'test.png'} | ${'Reject files other than text files'}
  `('異常系_入力が$depiction の場合、ファイル読み込み前に$expected をthrowする', ({ arg, expected }) => {
    try {
      wordpick.makeWordSplitArr(arg);
    } catch (e: any) {
      expect(e.message).toBe(expected);
      expect(spyReadFileSync).toHaveBeenCalledTimes(0);
    }
  });

  test.each`
    readed       | expected
    ${undefined} | ${'No file'}
    ${null}      | ${'No file'}
    ${''}        | ${'No statement'}
  `('異常系_ファイル読み込み結果が $a の場合ファイル読み込み前に $expected をthrowする', ({ readed, expected }) => {
    spyReadFileSync.mockReturnValueOnce(readed);
    try {
      wordpick.makeWordSplitArr('nothing.txt');
    } catch (e: any) {
      expect(e.message).toBe(expected);
    }
  });

  test.each`
    extension
    ${'test.txt'}
    ${'test.Txt'}
    ${'test.tXt'}
    ${'test.txT'}
    ${'test.TXt'}
    ${'test.tXT'}
    ${'test.TxT'}
    ${'test.TXT'}
  `('正常系_読み込みファイル拡張子が$extension の場合、小文字に名寄せしファイル読み込みを行う', ({ extension }) => {
    spyReadFileSync.mockReturnValueOnce('anything');
    wordpick.makeWordSplitArr(extension);
    // readFileSyncが呼び出されていれば、拡張子チェックを通過している
    expect(spyReadFileSync).toHaveBeenCalledTimes(1);
  });
  test('正常系_半角スペース区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
  test('正常系_全角スペース区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc　def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
  test('正常系_改行区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc' + '\n' + 'def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
  test('正常系_復帰区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc' + '\r' + 'def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
  test('正常系_改ページ区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc' + '\f' + 'def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
  test('正常系_水平タブ区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc' + '\t' + 'def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
  test('正常系_垂直タブ区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc' + '\v' + 'def');
    const result = wordpick.makeWordSplitArr('test.txt');
    expect(result).toEqual(['abc', 'def']);
  });
});
