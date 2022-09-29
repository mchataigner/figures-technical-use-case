export const percentiles = (arr, ...ps) =>
  ps.map(
    (p) =>
      (arr[Math.floor((p * arr.length) / 100)] +
        arr[Math.ceil((p * arr.length) / 100)]) /
      2
  );
