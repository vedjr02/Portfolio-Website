/* Irish retail electricity tariffs, May 2026. Source: Selectra.ie (verified May 2026), as used in
 * the AdFlex dashboard (vedjrr/adflex-dynamic-prices, lib/retailTariffs.ts). Rates in c/kWh excl. VAT.
 * Bands (Dublin time): night 23:00-08:00, day 08:00-17:00 and 19:00-23:00, peak 17:00-19:00,
 * EV boost 02:00-05:00 on EV plans. */

export type Tariff = {
  id: string;
  supplier: string;
  plan: string;
  type: "flat" | "daynight" | "tou" | "ev";
  rate24h?: number;
  day?: number;
  night?: number;
  peak?: number;
  ev?: number;
};

export const tariffs: Tariff[] = [
  {"id":"sse-standard-24hr","supplier":"SSE Airtricity","plan":"Standard 24hr","type":"flat","rate24h":28.3},
  {"id":"sse-smart-electricity","supplier":"SSE Airtricity","plan":"Smart Electricity","type":"tou","day":29.95,"night":19.25,"peak":33.54},
  {"id":"sse-smart-everyday","supplier":"SSE Airtricity","plan":"Smart Everyday","type":"flat","rate24h":30.85},
  {"id":"ei-standard-24hr","supplier":"Electric Ireland","plan":"Standard 24hr","type":"flat","rate24h":31.27},
  {"id":"ei-nightsaver","supplier":"Electric Ireland","plan":"NightSaver","type":"daynight","day":35.06,"night":17.29},
  {"id":"ei-smart-electricity","supplier":"Electric Ireland","plan":"Smart Electricity","type":"tou","day":34.99,"night":18.39,"peak":37.33},
  {"id":"ei-smart-24","supplier":"Electric Ireland","plan":"Smart 24","type":"flat","rate24h":29.27},
  {"id":"energia-standard-24hr","supplier":"Energia","plan":"Standard 24hr","type":"flat","rate24h":30.28},
  {"id":"energia-nightsaver","supplier":"Energia","plan":"NightSaver","type":"daynight","day":33.2,"night":15.92},
  {"id":"energia-smart-24hr","supplier":"Energia","plan":"Smart 24 Hour","type":"flat","rate24h":32.11},
  {"id":"energia-smart-daynight","supplier":"Energia","plan":"Smart Day Night","type":"daynight","day":35.19,"night":17.34},
  {"id":"energia-smart-data","supplier":"Energia","plan":"Smart Data","type":"tou","day":33.7,"night":18.53,"peak":37.85},
  {"id":"energia-sst","supplier":"Energia","plan":"SST","type":"tou","day":35.81,"night":21,"peak":40.21},
  {"id":"energia-ev-smart-drive","supplier":"Energia","plan":"EV Smart Drive","type":"ev","day":40.16,"night":9.42},
  {"id":"energia-ev-smart-drive-plus","supplier":"Energia","plan":"EV Smart Drive Plus","type":"ev","day":38.93,"night":23.99,"peak":51.08,"ev":11.03},
  {"id":"bg-standard-24hr","supplier":"Bord Gáis Energy","plan":"Standard 24hr","type":"flat","rate24h":25.94},
  {"id":"bg-nightsaver","supplier":"Bord Gáis Energy","plan":"NightSaver","type":"daynight","day":27.9,"night":13.81},
  {"id":"bg-smart-electricity","supplier":"Bord Gáis Energy","plan":"Smart Electricity","type":"tou","day":27.73,"night":20.46,"peak":33.75},
  {"id":"bg-smart-allday","supplier":"Bord Gáis Energy","plan":"Smart All Day","type":"flat","rate24h":25.94},
];

/** Price in c/kWh for a plan at an hour of the day (0-23), using the bands above. */
export function priceAt(t: Tariff, hour: number): number {
  if (t.type === "flat") return t.rate24h ?? 0;
  if (t.ev !== undefined && hour >= 2 && hour < 5) return t.ev;
  if (hour >= 23 || hour < 8) return t.night ?? t.day ?? 0;
  if (t.peak !== undefined && hour >= 17 && hour < 19) return t.peak;
  return t.day ?? 0;
}
