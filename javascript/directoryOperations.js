function addDirectory() {
    let directoryName = document.getElementById("directoryToAdd").value;
    let formData = new FormData();
    let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath") + directoryName;
    let req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.addEventListener("readystatechange", function () {
        if (req.readyState === 4) {
            console.log(req.responseText);
            refreshTable();
        }
    });
    formData.append("type", "dir");
    req.send(formData);
}

function enterDirectory() {
    document.getElementById("leaveDirectory").disabled = false;
    let table = document.getElementById("fileList");
    let directoryName = table.rows[sessionStorage.getItem("highlightedRowIndex")].cells[1].innerText;
    sessionStorage.setItem("currentPath", sessionStorage.getItem("currentPath") + directoryName + "/");
    refreshTable();
    document.getElementById("pathDisplay").innerText = "root/" + sessionStorage.getItem("currentPath");

    let obj = {path: sessionStorage.getItem("currentPath") };
    console.log(obj);
    window.history.pushState(obj, "");
}

function goToParentDirectory() {

    let path = sessionStorage.getItem("currentPath");
    let parentPath = path.substring(0, path.substring(0,path.length-1).lastIndexOf("\/")+1);
    if (parentPath === "") {
        document.getElementById("leaveDirectory").disabled = true;
    }
    console.log(parentPath);
    sessionStorage.setItem("currentPath", parentPath);
    refreshTable();
    document.getElementById("pathDisplay").innerText = "root/" + sessionStorage.getItem("currentPath");

    let obj = {path: sessionStorage.getItem("currentPath") };
    console.log(obj);
    window.history.pushState(obj, "");
}