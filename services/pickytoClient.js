import { countries, timezones } from "./utility"

export const createSeasionId = () => {
    const country = getCountry();
    const browser = getBrowserName();
    const device = getDeviceType();
    return `${country}-${browser}-${device}`

}

const getBrowserName = () => {
    // detect browser
    let userAgent = navigator.userAgent.toLocaleLowerCase();
    let browserName;
    if (!!document.documentMode == true) {
        browserName = "IE"
    }
    else if (userAgent.search('opr') > -1) {
        browserName = "Opera"
    }
    else if (userAgent.search('edg') > -1) {
        browserName = "Edge"
    }
    else if (userAgent.search('chrome') > -1 || userAgent.search('crios') > -1 || !!window.chrome == true) {
        browserName = "Chrome"
    }
    else if (userAgent.search('firefox') > -1 || userAgent.search('fxios') > -1 || userAgent.search('focus') > -1) {
        browserName = "Firefox"
    }
    else {
        browserName = "Not detect"
    }
    return browserName;
}

const getDeviceType = () => {
    // detect devicetype
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    else {

        return "Desktop";
    }
};

const getCountry = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone === "" || !timezone) {
        return null;
    }
    // console.log('fasfsdfsdf', timezones, timezone, timezones[timezone]);
    const _country = timezones[timezone].c[0];
    const country = countries[_country];
    return country;
}