window.addEventListener('load', function () {
    var problems = document.getElementById("problems");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://127.0.0.1:3000/load_probs", false);
    xmlHttp.send(null);
    problems.innerHTML = xmlHttp.responseText;
})