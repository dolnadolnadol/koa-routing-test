export class myFormattedDate {
  static convertFormattedDate = () => {
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const myFormattedDate =
      year +
      "-" +
      (monthIndex + 1) +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    return myFormattedDate;
  };
}
