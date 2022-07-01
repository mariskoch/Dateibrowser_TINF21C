function login() {
    let formData = new FormData(document.getElementById("credentialForm"));
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/login', true);
    req.setRequestHeader("Accept", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                console.log(response);
                sessionStorage.setItem("authenticationString", "Basic " + btoa(formData.get("username") + ":" + response.token));
                refreshTable();
            } else {
                console.log(response);
                sessionStorage.setItem("authenticationString", "");
            }
        }
    }
    req.send(formData);
}

function logout() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/logout', true);
    req.setRequestHeader("Accept", "application/json")
    req.setRequestHeader("Authorization", sessionStorage.getItem("authenticationString"));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            clearTable();
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                console.log(response);
            } else {
                console.log(response);
            }
        }
    }
    req.send();
}