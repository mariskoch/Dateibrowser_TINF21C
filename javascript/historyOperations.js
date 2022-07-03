window.addEventListener("popstate", function (event) {
    console.log(event);
    sessionStorage.setItem("currentPath", event.state.path);
    refreshTable();
});