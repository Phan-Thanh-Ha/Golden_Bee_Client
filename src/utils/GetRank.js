export const GetRank = (totalPoint) => {
  if (totalPoint < 999) {
    return " Hạng đồng ";
  }
  if (totalPoint < 4999) {
    return " Hạng bạc ";
  }
  if (totalPoint < 9999) {
    return " Hạng vàng ";
  }
  if (totalPoint < 10000) {
    return " Bạch kim ";
  }
  if (totalPoint < 10000) {
    return " Kim cương ";
  }
  // const ranks = [
  // { name: 'Hạng Đồng', icon: icons.bronze, minPoints: 0, maxPoints: 999 },
  // { name: 'Hạng Bạc', icon: icons.silver, minPoints: 1000, maxPoints: 4999 },
  // { name: 'Hạng Vàng', icon: icons.gold, minPoints: 5000, maxPoints: 9999 },
  // { name: 'Bạch Kim', icon: icons.platinum, minPoints: 10000, maxPoints: Infinity },
  // { name: 'Kim Cương', icon: icons.diamond, minPoints: 10000, maxPoints: Infinity },
};
