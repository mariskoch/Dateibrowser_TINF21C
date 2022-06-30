function GetValFromDataURL(dataURL) {
    return dataURL.match(/^data:(.+);base64,(.+)$/);
}

function readyStateChangeFunction(req) {
    if (req.readyState === 4) {
        let response = JSON.parse(req.responseText);
        if (req.status === 200) {
            console.log(response);
        } else {
            console.log(response);
        }
    }
}

function addFile(event) {
    let fileReader = new FileReader();
    let params = "";
    //TODO: das ist asynchron... wie mache ich es, dass der rest erst weiterläuft, wenn das hier fertig ist?
    fileReader.onload = function () {
        let valFromDataURL = GetValFromDataURL(fileReader.result);
        console.log("type=" + valFromDataURL[1] + "&content=" + valFromDataURL[2]);
        params = "type=" + valFromDataURL[1] + "&content=" + valFromDataURL[2];
        console.log("params: " + params);
    }
    let input = event.target.files[0];
    fileReader.readAsDataURL(input);
    console.log(params);

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
    console.log("end of method");
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