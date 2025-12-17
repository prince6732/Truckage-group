
export const toUTC = (date: any) => {
  if (!date) return null;
  return new Date(date).toISOString(); 
};


export const toIST = (date: any) => {
  if (!date) return null;
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};


export const toDateOnly = (date: any) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
};
