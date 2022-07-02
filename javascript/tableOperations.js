function clearTable() {
    let table = document.getElementById("fileList");
    table.innerHTML = `<tr>
        <td colspan="1" style="width: 85%">Name</td>
        <td colspan="1" style="width: 15%">Filetype</td>
    </tr>`;
}

function refreshTable() {
    clearTable();
    let table = document.getElementById("fileList");
    let req = new XMLHttpRequest();
    let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath");
    req.open('GET', url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.addEventListener("readystatechange", function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                let row = table.insertRow(i+1);
                row.setAttribute("onclick", "highlightRow(this, document.getElementById(\"fileList\"));");
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                cell1.innerText = response[i].Name;
                cell2.innerText = response[i].Type;
            }
        }
    });
    req.send();
}

function highlightRow(row, table) {
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].setAttribute("style", "background-color: white");
    }
    row.setAttribute("style", "background-color: lightgrey");
    let type = row.cells[1].innerText;
    switch (type) {
        case type.startsWith("dir"):
            break;
        case type.startsWith("text"):
            break;
        case type.startsWith("image"):
            break;
        case type.startsWith("audio"):
            break;
        case type.startsWith("video"):
            break;
        default:
            break;
    }
}