export default {
  round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  },
  randomInt() {
    return Math.floor(Math.random() * 1000000000);
  }
}