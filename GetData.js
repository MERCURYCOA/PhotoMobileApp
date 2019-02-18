/*
From Flickr API documentation

URL: https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=08b00544f87699ff201954eb14c2760f&extras=m&per_page=30&page=1&format=rest&auth_token=72157705357959201-6f3e97f97cd10706&api_sig=817b5dc1a9a8db3721bfe1acb98f500b

*/

const apiKey = "cad4fb68d6364012ade40e78508ee1f1";
const oriURLString = "https://api.flickr.com/services/rest";

/**
 *@param url
 *@param callback
 */

export function fetchData(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(json => _handleResponse(json))
    .then(photos => callback(photos))
    .catch(error => console.log(error));
}

/**
 *@param page
 */
export function urlForRecent(page) {
  const otherParams = { page: page };
  return _createURL("flickr.photos.getRecent", otherParams);
}

/**
 *@param method
 */
function _createURL(method, otherParams) {
  let params = {
    api_key: apiKey,
    method: method,
    extras: "url_m,url_h",
    per_page: 30,
    format: "json",
    nojsoncallback: "1"
  };
  Object.assign(params, otherParams);
  const queryString = Object.keys(params)
    .map(key => key + "=" + encodeURIComponent(params[key]))
    .join("&");
  return oriURLString + "?" + queryString;
}

function _handleResponse(json) {
  return new Promise((resolve, reject) => {
    if (json.stat === "ok") {
      resolve(json.photos.photo);
    } else {
      reject("Flicker error code: " + json.stat + ", reason: " + json.message);
    }
  });
}
