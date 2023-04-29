import { Server } from "socket.io";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import { createServer } from "http";

function shell(cmd){
    return execSync(cmd).toString();
}

const httpserver = createServer((req, res) => {
    if (req.url == "/load_probs"){
        const probs = fs.readdirSync("./problems", { withFileTypes: true }).filter((item) => item.isDirectory()).map((item) => item.name);
        var list = "";
        for (var i=0; i<probs.length; ++i){
            list += "<p>Problem ID: " + probs[i] + " (<a href='problems/" + probs[i] + "/statement.txt'>View Statement</a>)\n";
        }
        res.writeHead(200);
        res.end(list);
        return;
    }
    var loc = "." + (req.url=="/" ? "/index.html" : req.url);
    fs.readFile(loc, function (err, data) {
        if (err || loc.includes("..") || loc.includes("problems/solution") || loc.includes("problems/input")) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        var ext = path.extname(loc);
        var type = "text/html";
        switch (ext) {
            case ".js":
                type = "text/javascript";
                break;
            case ".css":
                type = "text/css";
                break;
            case ".txt":
                type = "text/plain";
                break;
        }
        res.writeHead(200, { "Content-Type": type });
        res.end(data);
    });
});

const io = new Server(httpserver, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    socket.on("run", (code, id) => {
        var src = shell("mktemp").slice(0,-1) + ".cpp";
        fs.writeFileSync(src, code);

        var sub = shell("./run_util/compile.sh " + src).slice(0,-1);
        if (sub == "Compile Error"){
            io.emit("upd_msg", "Failed (Compile Error)");
            return;
        }

        var sol = shell("./run_util/compile.sh problems/" + id + "/solution.cpp").slice(0,-1);
        if (id.includes("/") || sol == "Compile Error"){
            io.emit("upd_msg", "Invalid ID!");
            return;
        }

        const judging_info = JSON.parse(fs.readFileSync("problems/" + id + "/judging_info.json").toString());
        var ml = judging_info.ml;
        var tl = judging_info.tl;
        var tcs = judging_info.tcs;
        
        var tc = 1;
        var runner = setInterval(function(){
            io.emit("upd_msg", "Running " + tc + "/" + tcs + "... ");
            const ver = shell("./run_util/run.sh " + sub + " " + sol + " problems/" + id + "/input/" + tc + ".txt" + " " + tl + " " + ml).slice(0,-1);
            if (ver != "OK"){
                io.emit("upd_msg", "Failed on testcase " + tc + " (" + ver + ")");
                console.log("Guy failed on " + id);
                clearInterval(runner)
            }
            if (tc++ == tcs){
                io.emit("upd_msg", "Accepted");
                console.log("Guy AC'd on " + id);
                clearInterval(runner)
            }
        });
    });
});

httpserver.listen(3000);