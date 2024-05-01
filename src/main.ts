import { filterAggregationTartget, makeWordAggregateJson, makeWordSplitArr } from './wordpick';

export const main = (argv: string[]) => {
  const fileName = argv[2];
  try {
    const arr = makeWordSplitArr(fileName);
    const filtered = filterAggregationTartget(arr);
    const json = makeWordAggregateJson(filtered);
    console.log(json);
  } catch (e: any) {
    console.log(e.message);
  }
};

const argv = process.argv;
main(argv);
