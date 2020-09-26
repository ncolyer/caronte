const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

export function createCurlCommand(subCommand, method = null, json = null, data = null) {
    const full = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

    let contentType = null;
    let content = null;
    if (json != null) {
        contentType = '    -H "Content-Type: application/json" \\\n';
        content = `    -d '${JSON.stringify(json)}'`;
    } else if (data != null) {
        contentType = '    -H "Content-Type: multipart/form-data" \\\n';
        content = "    " + Object.entries(data).map(([key, value]) => `-F "${key}=${value}"`).join(" \\\n    ");
    }

    return `curl${method != null ? " -X " + method : ""} "${full}/api${subCommand}" \\\n` + contentType + "" + content;
}

export function validateIpAddress(ipAddress) {
    let regex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
    return regex.test(ipAddress);
}

export function validate24HourTime(time) {
    return timeRegex.test(time);
}

export function cleanNumber(number) {
    return number.replace(/[^\d]/gi, "").replace(/^0+/g, "");
}

export function validateMin(min) {
    return function (value) {
        return parseInt(value) > min;
    };
}

export function validateMax(max) {
    return function (value) {
        return parseInt(value) < max;
    };
}

export function validatePort(port) {
    return validateMin(0)(port) && validateMax(65565)(port);
}

export function timeToTimestamp(time) {
    let d = new Date();
    let matches = time.match(timeRegex);

    if (matches[1] !== undefined) {
        d.setHours(matches[1]);
    }
    if (matches[2] !== undefined) {
        d.setMinutes(matches[2]);
    }
    if (matches[3] !== undefined) {
        d.setSeconds(matches[3]);
    }

    return Math.round(d.getTime() / 1000);
}

export function timestampToTime(timestamp) {
    let d = new Date(timestamp * 1000);
    let hours = d.getHours();
    let minutes = "0" + d.getMinutes();
    let seconds = "0" + d.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

export function timestampToDateTime(timestamp) {
    let d = new Date(timestamp);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

export function timestampToTime2(timestamp) {
    let d = new Date(timestamp);
    let hours = d.getHours();
    let minutes = "0" + d.getMinutes();
    let seconds = "0" + d.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

export function formatSize(size) {
    if (size < 1000) {
        return `${size}`;
    } else if (size < 1000000) {
        return `${(size / 1000).toFixed(1)}K`;
    } else {
        return `${(size / 1000000).toFixed(1)}M`;
    }
}

export function randomClassName() {
    return Math.random().toString(36).slice(2)
}
