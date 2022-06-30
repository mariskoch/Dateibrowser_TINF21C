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
    let formData = new FormData();
    fileReader.onload = function () {
        let valFromDataURL = GetValFromDataURL(fileReader.result);
        formData.append("type", valFromDataURL[1]);
        formData.append("content", valFromDataURL[2]);
    }
    console.log(formData);
    let input = event.target.files[0];
    fileReader.readAsDataURL(input);

    let url = "http://localhost:8080/" + input.name;
    let req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);
    req.addEventListener("readystatechange", function () {
        readyStateChangeFunction(req);
    });
    req.send(formData);
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