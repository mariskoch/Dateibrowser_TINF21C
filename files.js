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
            if (req.readyState === 4) {
                refresh();
            }
        });
        req.send(params);
    }
    let input = event.target.files[0];
    fileReader.readAsDataURL(input);
}

function refresh() {
    let table = document.getElementById("fileList");
    table.innerHTML = `<tr>
        <td colspan="1" style="width: 85%">Name</td>
        <td colspan="1" style="width: 15%">Filetype</td>
    </tr>`;


    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/', true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);
    req.addEventListener("readystatechange", function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            for (let i = 0; i < response.length; i++) {
                let row = table.insertRow(i+1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                cell1.innerText = response[i].Name;
                cell2.innerText = response[i].Type;
            }
        }
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
        if (req.readyState === 4) {
            refresh();
        }
    });
    req.send();
}