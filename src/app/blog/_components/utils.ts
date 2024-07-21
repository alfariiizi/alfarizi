export function isNew(date: string) {
  const dateNow = new Date();
  const datePost = new Date(date);

  // Menghitung selisih dalam milidetik
  const difference = dateNow.getTime() - datePost.getTime();

  // Mengubah milidetik menjadi hari
  const dayDifference = difference / (1000 * 60 * 60 * 24);
  return dayDifference < 14;
}

export const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
