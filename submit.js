import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/c_cpp");
editor.setKeyboardHandler("ace/keyboard/vscode");

document.getElementById("submit").addEventListener("click", submit);
document.getElementById("vim").addEventListener("click", toggle_vim);

var vim = false;

function toggle_vim(){
    if (vim == false){
        editor.setOption("relativeLineNumbers", true)
        editor.setKeyboardHandler("ace/keyboard/vim");
    } else {
        editor.setOption("relativeLineNumbers", false)
        editor.setKeyboardHandler("ace/keyboard/vscode");
    }
    vim ^= 1;
}

function submit(){
    document.getElementById("submit").style.display = "none";
    var code = editor.getValue();;
    var id = document.getElementById("id").value;
    if (id == ""){
        alert("No submission ID!");
        document.getElementById("submit").style.display = "inline-block";
    } else {
        document.getElementById("resp").innerHTML = "Waiting for judge...";
        const socket = io("https://ericJudge.nonrice.repl.co");
        socket.on("connect", () => {
            socket.emit("run", code, id);
        });

        socket.on("upd_msg", (msg) => {
            document.getElementById("resp").innerHTML = msg;
            if (msg.includes("Accepted") || msg.includes("Failed")){
                socket.disconnect();
                document.getElementById("submit").style.display = "inline-block";
            }
        });
    }
}