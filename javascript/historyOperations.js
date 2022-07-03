window.addEventListener("popstate", function (event) {
    console.log(event);
    document.getElementById("pathDisplay").innerText = "root/" + event.state.path;
    sessionStorage.setItem("currentPath", event.state.path);
    refreshTable();
});