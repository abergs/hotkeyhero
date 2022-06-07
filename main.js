import "./style.css";
import { getImage } from "./backgrounds/unsplash.js";
import { getHotkeys } from "./hotkeystore.js";

function camelize(str) {
  // make first character uppercase and rest in word lowercase
  str = str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });

  // replace ctrl with Ctrl
  str = str.replace(/CTRL/g, "Ctrl");
  // replace alt with Alt
  str = str.replace(/ALT/g, "Alt");
  // replace shift with Shift
  str = str.replace(/SHIFT/g, "Shift");
  // replace cmd with Cmd
  str = str.replace(/CMD/g, "Cmd");
  //replace + with  +
  str = str.replace(/\+/g, " + ");
  return str;
}

// get all the elements from the body
var hotkeys = getHotkeys("vscode");
// specify a random index
var index = Math.floor(Math.random() * (0 - hotkeys.length + 1)) + hotkeys.length;
// get the random element
var hotkey = hotkeys[index];

const $ = (id) => document.querySelector(id);

function isMacintosh() {
  return navigator.platform.indexOf("Mac") > -1;
}

let keybinding = hotkey[1];
if (isMacintosh()) {
  keybinding = hotkey[2];
}
$("#command").innerText = hotkey[0];
$("#keybinding").innerText = camelize(keybinding);
$("#description").innerText = hotkey[3];

$("#tip").classList.add("show");

async function initAsync() {
  const img = await getImage();
  const bgImage = img.url;
  $(".bg").style = `background-image: url(${bgImage})`;
  $("#photographer").innerText = img.meta.user.name;
  $("#photographer").href = img.meta.user.links.html + "?utm_source=hotkeyhero&utm_medium=referral";
  $("#location").innerText = img.meta.location.title;
  $("#location").href = img.meta.links.html + "?utm_source=hotkeyhero&utm_medium=referral";
}
initAsync();
