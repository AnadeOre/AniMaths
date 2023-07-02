function roundTwoDecimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function distanceBetweenPoints(x1, y1, x2, y2) {
  const sum = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  const dist = Math.sqrt(sum);
  return roundTwoDecimals(dist);
}

export {roundTwoDecimals, distanceBetweenPoints};
