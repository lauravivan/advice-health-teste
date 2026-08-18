export const formatDateToString = (date: Date | null | undefined) => {
  if (!date) return `0/0/0000`;
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
