export const todayKey = () =>
  new Date().toISOString().split("T")[0];

export const monthKey = (date = new Date()) =>
  date.toISOString().slice(0, 7);

export const yearKey = (date = new Date()) =>
  date.getFullYear().toString();
