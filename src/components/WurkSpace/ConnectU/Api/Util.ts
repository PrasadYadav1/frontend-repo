export const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (!date) return "";
  const year = new Date(value);
  if (!year) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const years = year.getFullYear();
  return month + " " + day +", "+years;
};
export const colorsList = [
  "#a8193d",
  "#4fcc25",
  "#1ebffa",
  "#8da377",
  "#9975bd",
  "#cf61a1",
  "#240959",
];
