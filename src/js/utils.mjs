// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  let queryString = window.location.search;
  let url = new URLSearchParams(queryString);
  return url.get(param);
}

export function renderListWithTemplate (templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  list.forEach((item) => {
    const element = templateFn(item);
    parentElement.insertAdjacentHTML(position, element);
  });
  
}


export async function loadTemplate(path) {
  const res = await fetch(path);
  const text = await res.text();
  return text;
}



export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  document.querySelector("header").innerHTML = header;
  document.querySelector("footer").innerHTML = footer;
}