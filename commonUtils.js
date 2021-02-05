var _wpCommonJs = {};

_wpCommonJs.utils.isParamExists = (param) => {
    var field = param;
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1)
        return true;
    else if (url.indexOf('&' + field + '=') != -1)
        return true;

    return false
}

_wpCommonJs.utils.getGetValue = (param) => {
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

_wpCommonJs.utils.insertGetParam = (url, name, value) => {
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

_wpCommonJs.utils.getGetList = (url = location.href) => {
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

_wpCommonJs.utils.objectToUrlQuery = (params) => {
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return queryString;
}

_wpCommonJs.utils.asyncPost = (file, data, callback = null, xhr = false, onprogressXhr, onreadyXhr) => {
    if (xhr) {
        return new Promise((resolve, reject) => {

            var req = new XMLHttpRequest();
            req.onprogress = onprogressXhr;
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(req.responseText)
                }
            };

            req.open("POST", file + "?" + _wpCommonJs.utils.objectToUrlQuery(data), true);
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

_wpCommonJs.utils.removeElementFromArray = (arr, value) => {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        }
    }

    return arr;
}

_wpCommonJs.utils.getFileNameFromUrl = (url = _wpCommonJs.data.url.currentFile) => {
    var filename = _wpCommonJs.data.url.currentFile.substring(_wpCommonJs.data.url.currentFile.lastIndexOf('/') + 1);
    if (filename == "") {
        filename = "index.php";
    }
    return filename
}

_wpCommonJs.utils.generateToken = (n) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

_wpCommonJs.utils.loader.show = async () => {

    $.blockUI({
        message: '<div class="spinner-border text-success  align-self-center loader-lg">Loading...</div>',
        fadeIn: 200,
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            zIndex: 1200,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            zIndex: 1201,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });

}

_wpCommonJs.utils.loader.hide = () => {
    $.unblockUI()
}

_wpCommonJs.utils.isArraysEqual = (a, b) => {
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

_wpCommonJs.utils.getCurrentDir = () => {
    returnData = "";
    var link = document.createElement('a');
    link.href = '.';
    pathname = link.pathname;
    returnData = pathname.replace("/wispychat/", "");

    return returnData;
}

_wpCommonJs.utils.delayer = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms);
    })
}

_wpCommonJs.utils.isValidJsonString = (jsonString) => {

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

_wpCommonJs.utils.copyToClipboard = (str) => {
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

_wpCommonJs.utils.blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

_wpCommonJs.utils.downloadBlob = (blob, name) => {
    if (
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
    ) return window.navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}

_wpCommonJs.utils.downloadFile = (fileurl, filename) => {
    return new Promise((resolve, reject) => {
        var target = fileurl;
        var xhr = new XMLHttpRequest();

        // check compartibility
        // reset progress bar
        swal({
            title: ``,
            html: `
            <div id="downloading">
                <h3 style="text-align: center;">Downloading "${filename}"</h3>
                <div class="progress br-30">
                    <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        `,
            showConfirmButton: true,
            confirmButtonText: "Cancel",
            padding: '2em'
        }).then(function (result) {
            if (result.value) {
                xhr.abort()
            }
        })

        $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);

        xhr.overrideMimeType('application/octet-stream');
        xhr.open('GET', target, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();
        xhr.onprogress = function (e) {
            var value = e.loaded + "";
            var prog = value[0] + value[1];
            // update progress bar
            $('.progress-bar').css('width', prog + '%').attr('aria-valuenow', prog);
            $('.progress-bar').attr("aria-valuenow", prog);
        };
        xhr.onload = function () {
            if (xhr.status === 200) {
                // fill progress bar
                $('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
                $('.progress-bar').attr("aria-valuenow", "100%");
                var resArray = new Uint8Array(xhr.response);
                var blob = new Blob([resArray], { type: 'application/octet-stream' });
                _wpCommonJs.utils.downloadBlob(blob, filename)
                $("#downloading").html("")

                swal({
                    title: `Successfully Downloaded "${filename}"`,
                    type: "success",
                    padding: '2em',
                    confirmButtonText: "Not Downloaded Yet? Try Again!"
                }).then(async function (result) {
                    if (result.value) {
                        await _wpCommonJs.utils.downloadFile(fileurl, filename);
                    }
                })

                resolve()
            } else {
                xhr.onerror()
            }

        };

        xhr.onerror = function () {
            let statusText;
            $("#downloading").html('');
            if (xhr.statusText == "") {
                statusText = ""
            } else {
                statusText = `Status: ${xhr.statusText}`;
            }

            swal({
                title: `Downloading Failed of "${filename}"`,
                text: `${statusText}`,
                type: "error",
                padding: '2em',
                confirmButtonText: "Try Again"
            }).then(function (result) {
                if (result.value) {
                    _wpCommonJs.utils.downloadFile(fileurl, filename);
                }
            })

            delete statusText;
        }
    })
}

_wpCommonJs.utils.progressbar = (a = 0, b = "") => {
    return new Promise((resolve, reject) => {
        swal({
            title: ``,
            html: `
                <div id="progressbar">
                    <h4 style="text-align: center;" id="progressBarWpCommonStatus"></h4>
                    <div class="progress br-30">
                        <div id="progressBarWpCommon" class="progress-bar bg-gradient-info" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            `,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: false
        })
        document.getElementById("progressBarWpCommon").style.width = a + "%";
        document.getElementById("progressBarWpCommon").innerHTML = a + "%";
        document.getElementById("progressBarWpCommonStatus").innerHTML = b;

        resolve({
            set: function (p) {
                document.getElementById("progressBarWpCommon").style.width = p + "%";
                document.getElementById("progressBarWpCommon").innerHTML = p + "%";
            },
            done: function () {
                swal.close()
            },
            status: function (s) {
                document.getElementById("progressBarWpCommonStatus").innerHTML = s
            }
        })

    })
}

_wpCommonJs.utils.bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

_wpCommonJs.utils.notify = (text, bgcolor) => {
    Snackbar.show({
        text: text,
        backgroundColor: bgcolor
    });
}

_wpCommonJs.utils.fileSelector = (multiple = false) => {
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
