function addFile() {
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/File1', true);
    req.setRequestHeader("ContentType", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);

    let content = "Hall test";
    let formData = new FormData();
    formData.append("content", btoa(content));
    if (req.readyState === 4) {
        let response = JSON.parse(req.responseText);
        if (req.status === 200) {
            alert(req.responseText);
        } else {
            alert(req.responseText);
        }
    }
    req.send(formData);
    refresh();
}

function refresh() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/', true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);
    if (req.readyState === 4) {
        let response = JSON.parse(req.responseText);
        if (req.status === 200) {
            alert(req.responseText);
        } else {
            alert(req.responseText);
        }
    }
    req.send();
}