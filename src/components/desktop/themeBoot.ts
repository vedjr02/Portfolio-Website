export const SETTINGS_KEY = "va-desktop";

/** Runs before paint (inlined in <head>) so a returning dark-mode visitor never sees a light flash. */
export const themeBootScript = `try{var s=JSON.parse(localStorage.getItem("${SETTINGS_KEY}")||"{}"),a=s.appearance||"dark",d=a==="dark"||(a==="auto"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}`;
