export const convertTimestamp = unix_timestamp => {
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  let minutes = '0' + date.getMinutes();
  let seconds = '0' + date.getSeconds();
  let formattedTime =
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  let formattedDate = formatDate(date);
  const { year, month, day } = formattedDate;
  return { time: formattedTime, date: `${year}-${month}-${day}` };
};

export const formatDate = date => {
  let year = `${date.getFullYear()}`;
  let month = `${date.getMonth() + 1}`;
  month = month.length === 1 ? '0' + month : month;
  let day = `${date.getDate()}`;
  day = day.length === 1 ? '0' + day : day;
  return { day: day, month: month, year: year };
};
