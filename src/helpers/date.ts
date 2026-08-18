export const formatDateToString = (date: Date | null | undefined) => {
  if (!date) return `0/0/0000`;
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};


export const getSafeDate = (date: Date) => {
  const validDate = new Date(date);

  const isUTCMidnight =
    validDate.getUTCHours() === 0 &&
    validDate.getUTCMinutes() === 0 &&
    validDate.getUTCSeconds() === 0;

  // If the date is UTC midnight, build a new local Date using UTC parts
  // to avoid the timezone shift (e.g. day 30 showing as day 29)
  const safeDate = isUTCMidnight
    ? new Date(
        validDate.getUTCFullYear(),
        validDate.getUTCMonth(),
        validDate.getUTCDate()
      )
    : validDate;

  return safeDate;
}