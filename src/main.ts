import { makeWordAggregateJson, makeWordSplitArr } from './wordpick';

export const main = (argv: string[]) => {
  const fileName = argv[2];
  const arr = makeWordSplitArr(fileName);
  const json = makeWordAggregateJson(arr);

  console.log(json);
};

const argv = process.argv;
main(argv);
