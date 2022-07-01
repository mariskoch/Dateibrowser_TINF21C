function addDirectory() {
    let directoryName = document.getElementById("directoryToAdd").value;
    let formData = new FormData();
    let url = "http://localhost:8080/" + directoryName;
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

