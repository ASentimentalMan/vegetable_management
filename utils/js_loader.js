import Vue from 'vue'

let scriptLoaded = {}
const scriptLoader = (name, url) => {
  return new Promise((resolve, reject) => {
    if (typeof (scriptLoaded[name]) === 'undefined') {
      let script = document.createElement('script');
      script.type = "text/javascript";
      script.async = true;
      script.src = url;
      script.onerror = reject;
      document.head.appendChild(script);
      script.onload = () => {
      scriptLoaded[name] = true
      resolve()
      }
    } else {
      resolve();
    }
  })
}
export default scriptLoader