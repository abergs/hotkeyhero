import vscode from "./public/hotkeys/vscode.tsv";
import { parseTSVArrays } from "./tsv.js";
const preloaded = {
  vscode,
};

export function getHotkeys(name) {
  let result = null;

  // check cache
  const cachekey = "hotkeys_" + name;
  const cached = localStorage.getItem(cachekey);
  let refreshCache = false;
  if (cached) {
    console.log("Hotkeys cached");
    const envelope = JSON.parse(cached);
    result = envelope.data;

    if (envelope.createdAt < Date.now() - 24 * 60 * 60 * 1000) {
      refreshCache = true;
    }
  } else {
    // give preloaded
    console.log("Hotkeys not cached");
    result = preloaded[name];
    refreshCache = true;
  }

  if (refreshCache) {
    tryRefreshCache(name, cachekey);
  }

  return result;
}

async function tryRefreshCache(name, cachekey) {
  try {
    console.log("refreshing cache");
    let res = await fetch("https://hotkeyhero-demo.andersaberg.com/hotkeys/" + name + ".tsv");
    if (res.ok) {
      const tsv = await res.text();
      const hotkeys = parseTSVArrays(tsv);
      if(hotkeys.length <= 1) { throw new Error("No hotkeys found"); }
      
      const envelope = {
        createdAt: Date.now(),
        data: hotkeys,
      };

      localStorage.setItem(cachekey, JSON.stringify(envelope));
    }
  } catch (e) {
    console.log(e);
  }
}
