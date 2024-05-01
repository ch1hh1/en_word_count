import { filterAggregationTartget ,exclude} from '../../wordpick';

describe('filterAggregationTartget（単語配列の集計前フィルター処理）', () => {
  test('1文字の単語を除去すること', () => {
    const arr = ['a', 'aa', 'aaa'];
    const result = filterAggregationTartget(arr);
    expect(result).toEqual(['aa', 'aaa']);
  });

  test('除外対象の単語を除去していること',() => {
    const result = filterAggregationTartget(exclude);
    // 除去対象と同じものを与えたら空っぽになるはず
    expect(result).toEqual([]);
  })
});
