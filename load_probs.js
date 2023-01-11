window.addEventListener('load', function () {
    var problems = document.getElementById("problems");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://ericJudge.nonrice.repl.co/load_probs", false);
    xmlHttp.send(null);
    problems.innerHTML = xmlHttp.responseText;
})