export const getStringedDate = (targetDate) => {
  if (!targetDate) return "";
  const dateObj =
    targetDate instanceof Date ? targetDate : new Date(targetDate);
  if (isNaN(dateObj.getTime())) return "";

  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;
};
