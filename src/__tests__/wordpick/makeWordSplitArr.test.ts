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

  test('異常系_入力が空文字の場合、ファイル読み込み前に処理を終了する', () => {
    const result = wordpick.makeWordSplitArr('');
    expect(spyReadFileSync).toHaveBeenCalledTimes(0)
    expect(result).toEqual(null);
  });
  test('異常系_拡張子が.txtでない場合、ファイル読み込み前に処理を終了する', () => {
    const result = wordpick.makeWordSplitArr('test');
    expect(spyReadFileSync).toHaveBeenCalledTimes(0)
    expect(result).toEqual(null);
  });
  test('正常系_半角スペース区切りの文章を単語別に配列に格納できる', () => {
    spyReadFileSync.mockReturnValueOnce('abc def');
    const result = wordpick.makeWordSplitArr('');
    expect(result).toEqual(['abc', 'def']);
  });
})