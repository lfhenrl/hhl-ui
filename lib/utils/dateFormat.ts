// tslint:disable:variable-name
const _29_01_2021 = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
export const D_29_01_2021 = (D: Date) => _29_01_2021.format(new Date(D));

const _29_01_2021_HHMM = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
export const D_29_01_2021_HHMM = (D: Date) => _29_01_2021_HHMM.format(new Date(D));

const _29_01_2021_HHMMSS = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
export const D_29_01_2021_HHMMSS = (D: Date) => _29_01_2021_HHMMSS.format(new Date(D));

const _01_dec_2021 = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});
export const D_01_dec_2021 = (D: Date) => _01_dec_2021.format(new Date(D));

const _01_dec_2021_HHMM = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
export const D_01_dec_2021_HHMM = (D: Date) => _01_dec_2021_HHMM.format(new Date(D));

const _01_dec_2021_HHMMSS = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
export const D_01_dec_2021_HHMMSS = (D: Date) => _01_dec_2021_HHMMSS.format(new Date(D));

const _mon_01_dec_2021 = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
});
export const D_mon_01_dec_2021 = (D: Date) => _mon_01_dec_2021.format(new Date(D));

const _mon_01_dec_2021_HHMM = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});
export const D_mon_01_dec_2021_HHMM = (D: Date) => _mon_01_dec_2021_HHMM.format(new Date(D));

const _mon_01_dec_2021_HHMMSS = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
export const D_mon_01_dec_2021_HHMMSS = (D: Date) => _mon_01_dec_2021_HHMMSS.format(new Date(D));

const _01_dec = new Intl.DateTimeFormat("en-GB", { month: "short", day: "numeric" });
export const D_01_dec = (D: Date) => _01_dec.format(new Date(D));

const _2021 = new Intl.DateTimeFormat("en-GB", { year: "numeric" });
export const D_2021 = (D: Date) => _2021.format(new Date(D));

const _HHMM = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });
export const D_HHMM = (D: Date) => _HHMM.format(new Date(D));

const _HHMMSS = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
export const D_HHMMSS = (D: Date) => _HHMMSS.format(new Date(D));

const _HHMMSSms = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});
export const D_HHMMSSms = (D: Date) => _HHMMSSms.format(new Date(D));

const rtf = new Intl.RelativeTimeFormat("en");

export const D_TimeAgo = (D: Date) => {
  const diff = Math.round(new Date(D).valueOf() - new Date().valueOf()) / 1000;

  const _diff = Math.abs(diff);

  if (_diff < 60) {
    return rtf.format(+diff.toFixed(1), "second");
  }
  if (_diff < 3600) {
    const value = diff / 60;
    return rtf.format(+value.toFixed(1), "minute");
  }
  if (_diff < 86400) {
    const value = diff / 3600;
    return rtf.format(+value.toFixed(1), "hour");
  }
  if (_diff < 604800) {
    const value = diff / 86400;
    return rtf.format(+value.toFixed(1), "day");
  }
  if (_diff < 2618784) {
    const value = diff / 604800;
    return rtf.format(+value.toFixed(1), "week");
  }
  if (_diff <= 30116016) {
    const value = diff / 2618784;
    return rtf.format(+value.toFixed(1), "month");
  }
  if (_diff > 30116016) {
    const value = diff / 31425408;
    return rtf.format(+value.toFixed(1), "year");
  }
};
