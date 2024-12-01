// Format the date
export const fDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long", // e.g., "Saturday"
    year: "numeric", // e.g., "2024"
    month: "long", // e.g., "November"
    day: "numeric", // e.g., "30"
    hour: "2-digit", // e.g., "04"
    minute: "2-digit", // e.g., "20"
    second: "2-digit", // e.g., "13"
    hour12: true, // Use 12-hour clock (AM/PM)
  });

  return formattedDate;
};
