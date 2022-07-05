function clearTable() {
    let table = document.getElementById("fileList");
    table.innerHTML = `<tr>
        <td colspan="1" style="width: 3%">Type</td>
        <td colspan="1" style="width: 82%">Name</td>
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

            for (let i = 0; i < response.length; i++) {
                let type = response[i].Type;
                let row = table.insertRow(i + 1);
                row.setAttribute("onclick", "highlightRow(this, document.getElementById(\"fileList\"));");
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);

                let icon = new Image();
                icon.style.width = "25px";

                if (type.startsWith("dir")) {
                    icon.src = "../assets/directory.png"
                    cell0.appendChild(icon);
                } else if (type.startsWith("text")) {
                    icon.src = "../assets/text.png"
                    cell0.appendChild(icon);
                } else if (type.startsWith("image")) {
                    icon.src = "../assets/image.png"
                    cell0.appendChild(icon);
                } else if (type.startsWith("audio")) {
                    icon.src = "../assets/audio.png"
                    cell0.appendChild(icon);
                } else if (type.startsWith("video")) {
                    icon.src = "../assets/video.png"
                    cell0.appendChild(icon);
                } else {

                }

                cell1.innerText = response[i].Name;
                cell2.innerText = type;
            }
        }
    });
    req.send();
}

function highlightRow(row, table) {
    for (let i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[1] === row.cells[1] && table.rows[i].cells[2] === row.cells[2]) {
            sessionStorage.setItem("highlightedRowIndex", i.toString());
        }
        table.rows[i].setAttribute("style", "background-color: white");
    }
    row.setAttribute("style", "background-color: lightgrey");
    let enterButton = document.getElementById("enterDirectory");
    let leaveButton = document.getElementById("leaveDirectory");
    let previewButton = document.getElementById("showPreview");
    let editButton = document.getElementById("edit");
    let deleteButton = document.getElementById("delete");
    let downloadButton = document.getElementById("download");

    enterButton.disabled = false;
    leaveButton.disabled = false;
    previewButton.disabled = false;
    editButton.disabled = false;
    deleteButton.disabled = false;
    downloadButton.disabled = false;

    let type = row.cells[2].innerText;
    if (type.startsWith("dir")) {
        previewButton.disabled = true;
        editButton.disabled = true;
        downloadButton.disabled = true;
    } else if (type.startsWith("text")) {
        enterButton.disabled = true;
    } else if (type.startsWith("image")) {
        enterButton.disabled = true;
        editButton.disabled = true;
    } else if (type.startsWith("audio")) {
        enterButton.disabled = true;
        editButton.disabled = true;
    } else if (type.startsWith("video")) {
        enterButton.disabled = true;
        editButton.disabled = true;
    } else {
        enterButton.disabled = true;
        previewButton.disabled = true;
        editButton.disabled = true;
    }
}