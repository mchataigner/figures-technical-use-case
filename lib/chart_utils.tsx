export const yBounds = (min, max) => {
  return {
    minY: Math.floor(min / 1000) * 1000,
    maxY: Math.floor(max / 1000) * 1000,
  };
};

export const yAxis = (min, max, steps = 5) =>
  Array.from(Array(steps + 1), (_, i) =>
    Math.floor(min + ((max - min) / steps) * i)
  );

export const posAxis = (minY, maxY) => {
  return (y, reversed = false) => {
    if (!reversed) {
      return `${(y - minY) / (maxY - minY)} * (100% - 2rem)`;
    }
    return `${1 - (y - minY) / (maxY - minY)} * (100% - 2rem)`;
  };
};
