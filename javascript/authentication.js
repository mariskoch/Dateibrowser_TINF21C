function login() {
    let formData = new FormData(document.getElementById("credentialForm"));
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:8080/login', true);
    req.setRequestHeader("Accept", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let status = document.getElementById("authenticationStatus");
            let response = JSON.parse(req.responseText);
            if (req.status === 200) {

                status.innerText = "logged in";
                status.classList.add("loggedIn");
                status.classList.remove("loggedOut");
                sessionStorage.setItem("authenticationString", "Basic " + btoa(formData.get("username") + ":" + response.token));
                sessionStorage.setItem("currentPath", "");
                refreshTable();
            } else {
                clearTable();
                status.innerText = "wrong credentials - logged out";
                status.classList.remove("loggedIn");
                status.classList.add("loggedOut");
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
            document.getElementById("authenticationStatus").innerText = "logged out";
            clearTable();
            let response = JSON.parse(req.responseText);
            let status = document.getElementById("authenticationStatus");
            if (req.status === 200) {
                status.classList.remove("loggedIn");
                status.classList.add("loggedOut");
                console.log(response);
            } else {
                console.log(response);
            }
        }
    }
    req.send();
}