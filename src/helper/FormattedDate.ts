import dayjs from "dayjs";
export const myFormattedDate = {
  myFormattedDate: (() => {
    return dayjs().format("YYYY/MM/DD HH:mm:ss");
  })(),
};
