function GetValFromDataURL(dataURL) {
    return dataURL.match(/^data:(.+);base64,(.+)$/);
}

function addFile(event) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
        let valFromDataURL = GetValFromDataURL(fileReader.result);
        let params = "type=" + valFromDataURL[1] + "&content=" + valFromDataURL[2];
        console.log("start!!!");
        console.log(fileReader.result === "data:" + valFromDataURL[1] + ";base64," + valFromDataURL[2]);
        console.log(fileReader.result);
        console.log(valFromDataURL);
        console.log(valFromDataURL[1]);
        console.log(valFromDataURL[2]);
        console.log(params);
        let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath") + input.name;
        let req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
        req.addEventListener("readystatechange", function () {
            if (req.readyState === 4) {
                console.log(req.responseText);
                refreshTable();
            }
        });
        req.send(params);
    }
    let input = event.target.files[0];
    fileReader.readAsDataURL(input);
}

function deleteFile() {
    let table = document.getElementById("fileList");
    let fileName = table.rows[sessionStorage.getItem("highlightedRowIndex")].cells[0].innerText;
    let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath") + fileName;
    let req = new XMLHttpRequest();
    req.open('DELETE', url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.addEventListener("readystatechange", function () {
        if (req.readyState === 4) {
            console.log(req.responseText);
            refreshTable();
        }
    });
    req.send();
}

function downloadFile() {
    let row = document.getElementById("fileList").rows[sessionStorage.getItem("highlightedRowIndex")];
    let name = row.cells[0].innerText;

    let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath") + name + "?format=base64";
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.addEventListener("readystatechange",function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                let uri = "data:" + row.cells[1].innerText + ";base64," + req.response;
                downloadURI(uri, name);
            }
        }
    });
    req.send();
}

function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}