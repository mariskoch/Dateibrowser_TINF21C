function showPreview() {
    let name = document.getElementById("preview").value;
    let url = "http://localhost:8080/" + sessionStorage.getItem("currentPath") + name + "?format=base64";
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    //req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.addEventListener("readystatechange", function () {
        if (req.readyState === 4) {
            console.log(req.response);
            let dataURL = "data:image/jpeg;base64," + req.responseText;
            console.log(dataURL);
            /*let img = new Image();
            img.src = dataURL;
            //img.setAttribute("src", dataURL);
            //img.setAttribute("alt", "random image");
            document.body.appendChild(img);*/

            Base64ToImage(dataURL, function(img) {
                console.log("add image");
                document.body.appendChild(img);
            });
        }
    });
    req.send();
}

function Base64ToImage(base64img, callback) {
    let img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = base64img;
    callback(img);
}
