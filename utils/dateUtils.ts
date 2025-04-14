export function getDateMonthsAgo(monthsAgo: number): Date {
  const now = new Date();
  const newDate = new Date(now); // 创建副本
  newDate.setMonth(newDate.getMonth() - monthsAgo);
  return newDate;
}
