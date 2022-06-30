function GetValFromDataURL(dataURL) {
    return dataURL.match(/^data:(.+);base64,(.+)$/);
}

function readyStateChangeFunction(req) {
    if (req.readyState === 4) {
        let response = JSON.parse(req.responseText);
        console.log(response);
    }
}

function addFile(event) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
        let valFromDataURL = GetValFromDataURL(fileReader.result);
        let params = "type=" + valFromDataURL[1] + "&content=" + valFromDataURL[2];

        let url = "http://localhost:8080/" + input.name;
        let req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", identificationString);
        req.addEventListener("readystatechange", function () {
            readyStateChangeFunction(req);
        });
        req.send(params);
    }
    let input = event.target.files[0];
    fileReader.readAsDataURL(input);
}

function refresh() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/', true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);
    req.addEventListener("readystatechange", function () {
        readyStateChangeFunction(req);
    });
    req.send();
}

function deleteFile() {
    let fileName = document.getElementById("fileToDelete").value;
    let url = "http://localhost:8080/" + fileName;
    let req = new XMLHttpRequest();
    req.open('DELETE', url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);
    req.addEventListener("readystatechange", function () {
        readyStateChangeFunction(req);
    });
    req.send();
}