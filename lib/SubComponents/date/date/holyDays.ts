const HHL_holyDayNames = [
  "Maundy Thursday (Skærtorsdag)",
  "Good Friday (Langfredag)",
  "2nd day of Easter (2. Påskedag)",
  "Prayer Day (Store Bededag)",
  "Christs ascension (Kristi Himmelfart)",
  "2. Pentecost (2. Pinsedag)",
];

// tslint:disable-next-line:variable-name
const HHL_holyDays: any = {
  // ********** fixed ****************************
  "5/6": "Constitution Day (Grundlovsdag)",
  "24/12": "Christmas Day",
  "25/12": "1st Christmas Day",
  "26/12": "2nd Christmas Day",
  "31/12": "New Years Eve",
  "1/1": "New Years Day",

  // ********* 2024 *****************************
  "28/3/2024": HHL_holyDayNames[0], // SkærTorsdag
  "29/3/2024": HHL_holyDayNames[1], // Langfredag
  "1/4/2024": HHL_holyDayNames[2], // Påske
  "26/4/2024": HHL_holyDayNames[3], // Store Bededag
  "9/5/2024": HHL_holyDayNames[4], // Kristi Himmelfart
  "20/5/2024": HHL_holyDayNames[5], // 2. Pinsedag

  // ********* 2025 *****************************
  "17/4/2025": HHL_holyDayNames[0], // SkærTorsdag
  "18/4/2025": HHL_holyDayNames[1], // Langfredag
  "21/4/2025": HHL_holyDayNames[2], // Påske
  "29/5/2025": HHL_holyDayNames[4], // Kristi Himmelfart
  "9/6/2025": HHL_holyDayNames[5], // 2. Pinsedag
};

export function HHL_isHolyDay(d: string) {
  const dArr = d.split("/");
  const short = `${dArr[0]}/${parseInt(dArr[1]) + 1}`;
  // const short = d.substring(0, 5);
  const day = HHL_holyDays[short];
  if (day) {
    return day;
  }
  const long = `${short}/${dArr[2]}`;
  return HHL_holyDays[long];
}
