function addFile(event) {
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/test.txt', true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);

    let formData = new FormData();

    let fileReader = new FileReader();
    fileReader.onload = function () {
        let lines = fileReader.result;
        formData.append("content", btoa(lines.toString()));
    }
    let input = event.target.files[0];
    console.log("MIMEType: " + input.mimeType);
    fileReader.readAsText(input);

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                console.log(response);
            } else {
                console.log(response);
            }
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
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                console.log(response)
            } else {
                console.log(response);
            }
        }
    }
    req.send();
}