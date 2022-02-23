const HHL_holyDayNames = [
  "Maundy Thursday (Skærtorsdag)",
  "Good Friday (Langfredag)",
  "2nd day of Easter (2. Påskedag)",
  "Prayer Day (Store Bededag)",
  "Christs ascension (Kristi Himmelfart)",
  "2. Pentecost (2. Pinsedag)"
];

// tslint:disable-next-line:variable-name
const HHL_holyDays = {
  // ********** fixed ****************************
  "5/6": "Constitution Day (Grundlovsdag)",
  "24/12": "Christmas Day",
  "25/12": "1st Christmas Day",
  "26/12": "2nd Christmas Day",
  "31/12": "New Years Eve",
  "1/1": "New Years Day",

  // ********* 2017 *****************************
  "13/04/2017": HHL_holyDayNames[0], // SkærTorsdag
  "14/04/2017": HHL_holyDayNames[1], // Langfredag
  "17/04/2017": HHL_holyDayNames[2], // Påske
  "12/05/2017": HHL_holyDayNames[3], // Store Bededag
  "25/05/2017": HHL_holyDayNames[4], // Kristi Himmelfart
  "05/06/2017": HHL_holyDayNames[5], // 2. Pinsedag

  // ********* 2018 *****************************
  "29/03/2018": HHL_holyDayNames[0], // SkærTorsdag
  "30/03/2018": HHL_holyDayNames[1], // Langfredag
  "02/04/2018": HHL_holyDayNames[2], // Påske
  "27/04/2018": HHL_holyDayNames[3], // Store Bededag
  "10/05/2018": HHL_holyDayNames[4], // Kristi Himmelfart
  "21/05/2018": HHL_holyDayNames[5], // 2. Pinsedag

  // ********* 2019 *****************************
  "18/04/2019": HHL_holyDayNames[0], // SkærTorsdag
  "19/04/2019": HHL_holyDayNames[1], // Langfredag
  "22/04/2019": HHL_holyDayNames[2], // Påske
  "17/05/2019": HHL_holyDayNames[3], // Store Bededag
  "30/05/2019": HHL_holyDayNames[4], // Kristi Himmelfart
  "10/06/2019": HHL_holyDayNames[5], // 2. Pinsedag

  // ********* 2020 *****************************
  "9/4/2020": HHL_holyDayNames[0], // SkærTorsdag
  "10/4/2020": HHL_holyDayNames[1], // Langfredag
  "13/4/2020": HHL_holyDayNames[2], // Påske
  "8/5/2020": HHL_holyDayNames[3], // Store Bededag
  "21/5/2020": HHL_holyDayNames[4], // Kristi Himmelfart
  "1/6/2020": HHL_holyDayNames[5], // 2. Pinsedag

  // ********* 2021 *****************************
  "01/04/2021": HHL_holyDayNames[0], // SkærTorsdag
  "02/04/2021": HHL_holyDayNames[1], // Langfredag
  "05/04/2021": HHL_holyDayNames[2], // Påske
  "30/04/2021": HHL_holyDayNames[3], // Store Bededag
  "13/05/2021": HHL_holyDayNames[4], // Kristi Himmelfart
  "24/05/2021": HHL_holyDayNames[5] // 2. Pinsedag
};

export function HHL_isHolyDay(d: string) {
  const dArr = d.split("/");
  const short = `${dArr[0]}/${parseInt(dArr[1]) + 1}`
  // const short = d.substring(0, 5);
  const day = HHL_holyDays[short];
  if (day) {
    return day;
  }
  const long = `${short}/${dArr[2]}`;
  return HHL_holyDays[long];
}
