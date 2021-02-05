var _commonJsUtils = {};

_commonJsUtils.isParamExists = (param) => {
    var field = param;
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1)
        return true;
    else if (url.indexOf('&' + field + '=') != -1)
        return true;

    return false
}

_commonJsUtils.getGetValue = (param) => {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

_commonJsUtils.insertGetParam = (url, name, value) => {
    if (url.length === 0) {
        return;
    }

    let rawURL = url;

    // URL with `?` at the end and without query parameters
    // leads to incorrect result.
    if (rawURL.charAt(rawURL.length - 1) === "?") {
        rawURL = rawURL.slice(0, rawURL.length - 1);
    }
    const parsedURL = new URL(rawURL);
    let parameters = parsedURL.search;

    parameters += (parameters.length === 0) ? "?" : "&";
    parameters = (parameters + name + "=" + value);

    return (parsedURL.origin + parsedURL.pathname + parameters);
}

_commonJsUtils.getGetList = (url = location.href) => {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        if (vars[i] != "") {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return params;
}

_commonJsUtils.objectToUrlQuery = (params) => {
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return queryString;
}

_commonJsUtils.asyncPost = (file, data, callback = null, xhr = false, onprogressXhr, onreadyXhr) => {
    if (xhr) {
        return new Promise((resolve, reject) => {

            var req = new XMLHttpRequest();
            req.onprogress = onprogressXhr;
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(req.responseText)
                }
            };

            req.open("POST", file + "?" + _commonJsUtils.objectToUrlQuery(data), true);
            req.send();

        })
    } else {
        return new Promise((resolve, reject) => {

            $.post(file, data, (data, status) => {
                if (typeof (callback) == "function") {
                    callback(data, status);
                }
                resolve(data);
            })
        })
    }
}

_commonJsUtils.removeElementFromArray = (arr, value) => {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        }
    }

    return arr;
}

_commonJsUtils.getFileNameFromUrl = (url = _commonJsUtils.data.url.currentFile) => {
    var filename = _commonJsUtils.data.url.currentFile.substring(_commonJsUtils.data.url.currentFile.lastIndexOf('/') + 1);
    if (filename == "") {
        filename = "index.php";
    }
    return filename
}

_commonJsUtils.generateToken = (n) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

_commonJsUtils.isArraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

_commonJsUtils.getCurrentDir = () => {
    returnData = "";
    var link = document.createElement('a');
    link.href = '.';
    pathname = link.pathname;

    return returnData;
}

_commonJsUtils.delayer = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms);
    })
}

_commonJsUtils.isValidJsonString = (jsonString) => {

    if (!(jsonString && typeof jsonString === "string")) {
        return false;
    }

    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }

}

_commonJsUtils.copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

_commonJsUtils.blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

_commonJsUtils.bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

_commonJsUtils.fileSelector = (multiple = false) => {
    return new Promise((resolve, reject) => {
        var fileSelectorInput = document.createElement('input');
        fileSelectorInput.setAttribute('type', 'file');
        if (multiple) {
            fileSelectorInput.setAttribute('multiple', "");
        }

        fileSelectorInput.style.position = "fixed";
        fileSelectorInput.style.top = "0";
        fileSelectorInput.style.left = "0";
        fileSelectorInput.style.zIndex = "-999999";
        fileSelectorInput.style.opacity = "0";

        document.body.appendChild(fileSelectorInput);

        fileSelectorInput.click();

        fileSelectorInput.addEventListener("change", () => {

            resolveData = [];
            for (let i = 0; i < fileSelectorInput.files.length; i++) {
                const e = fileSelectorInput.files[i];
                resolveData.push(e);
            }

            resolve(resolveData)
        })
    })
}

_commonJsUtils.importCss = (file) => {
    return new Promise((resolve, reject) => {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = file;
        link.onload = () => { resolve(); }
        link.onerror = () => {
            resolve();
        }

        document.getElementsByTagName('head')[0].appendChild(link);
    })
}

_commonJsUtils.importJs = (file) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: file,
            dataType: "script",
            success: function () {
                resolve();
            },
            error: function (jqXHR, exception) {
                resolve({ jqXHR, exception })
            }
        });
    })
}

_commonJsUtils.removeImports = (filename, filetype) => {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}


