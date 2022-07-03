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
    let table = document.getElementById("fileList");
    let directoryName = table.rows[sessionStorage.getItem("highlightedRowIndex")].cells[0].innerText;
    sessionStorage.setItem("currentPath", sessionStorage.getItem("currentPath") + directoryName + "/");
    refreshTable();

    let obj = {path: sessionStorage.getItem("currentPath") };
    console.log(obj);
    window.history.pushState(obj, "");
}

function goToParentDirectory() {
    let path = sessionStorage.getItem("currentPath");
    let parentPath = path.substring(0, path.substring(0,path.length-1).lastIndexOf("\/")+1);
    console.log(parentPath);
    sessionStorage.setItem("currentPath", parentPath);
    refreshTable();

    let obj = {path: sessionStorage.getItem("currentPath") };
    console.log(obj);
    window.history.pushState(obj, "");
}
