//TODO: identifiactionString in Session speichern
let identificationString = "";

function login() {
    let formData = new FormData(document.getElementById("credentialForm"));
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/login', true);
    req.setRequestHeader("Accept", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                document.getElementById("loginResult").innerText = " login success: " + response.token;
                let identificationSetup = formData.get("username") + ":" + response.token;
                identificationString = "Basic " + btoa(identificationSetup);
            } else {
                document.getElementById("loginResult").innerText = "login error: " + response.error;
                identificationString = "";
            }
        }
    }
    req.send(formData);
}

function testAuthorization() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/', true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", identificationString);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                document.getElementById("authorizationResult").innerText = "authorization success";
            } else {
                document.getElementById("authorizationResult").innerText = "authorization error: " + response.error;
            }
        }
    }
    req.send();
}

function logout() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080/logout', true);
    req.setRequestHeader("Accept", "application/json")
    req.setRequestHeader("Authorization", identificationString);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {
                document.getElementById("logoutResult").innerText = "logout success: " + response.message;
            } else {
                document.getElementById("logoutResult").innerText = "logout error: " + response.error;
            }
        }
    }
    req.send();
}