export const wordsCountToStrength = (count: 12 | 15 | 18 | 21 | 24) => {
  let strength = 0;
  switch (count) {
    case 15:
      strength = 160;
      break;
    case 18:
      strength = 192;
      break;
    case 21:
      strength = 224;
      break;
    case 24:
      strength = 256;
      break;
    default:
      strength = 128;
      break;
  }
  return strength;
};
