function showPreview() {
    let table = document.getElementById("fileList");
    let name = table.rows[sessionStorage.getItem("highlightedRowIndex")].cells[1].innerText;
    let type = table.rows[sessionStorage.getItem("highlightedRowIndex")].cells[2].innerText;

    let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath") + name + "?format=base64";
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.addEventListener("readystatechange", function () {
        if (req.readyState === 4) {
            let dataURL = "data:" + type + ";base64," + req.responseText;
            console.log(dataURL);
            if (type.startsWith("image")) {
                base64ToImage(dataURL);
            } else if (type.startsWith("audio")) {
                base64ToAudio(dataURL);
            } else if (type.startsWith("video")) {
                base64ToVideo(dataURL);
            } else if (type.startsWith("text")) {
                previewText(req.responseText);
            }

        }
    });
    req.send();
}

function base64ToImage(base64img) {
    let img = new Image();
    img.src = base64img;
    document.getElementById("previews").appendChild(img);
}

function base64ToAudio(base64audio){
    let audio = new Audio();
    audio.src = base64audio;
    audio.controls = true;
    document.getElementById("previews").appendChild(audio);
}

function base64ToVideo(base64video){
    let vid = document.createElement("video");
    vid.controls = true;
    let src = document.createElement("source");
    src.src = base64video
    vid.appendChild(src);
    document.getElementById("previews").appendChild(vid);
}

function previewText(text) {
    let field = document.createElement("textarea");
    field.cols = 150;
    field.rows = 20;
    field.readOnly = true;
    field.value = atob(text);
    document.getElementById("previews").appendChild(field);
}

function clearPreviews() {
    document.getElementById("previews").innerHTML = ``;
}