const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path")

const app = express();
const server = http.createServer(app);

const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {title: "Chess"});
})

io.on("connection", function(u_socket){
    console.log("Connected")

    // u_socket.on("Confidence increased", function(){
    //     io.emit("ok")
    // })
    // u_socket.on("disconnect", function(){
    //     console.log("Disconnected")
    // })

    if(!players.white){
        players.white = u_socket.id
        u_socket.emit("playerRole", "w")
    }
    else if(!players.black){
        players.black = u_socket.id
        u_socket.emit("playerRole", "b")
    }
    else{
        u_socket.emit("spectatorRole")
    }

    u_socket.on("disconnect", function(){
        if(u_socket.id==players.white){
            delete players.white
        }
        else if(u_socket.id==players.black){
            delete players.black            
        }
    })

    u_socket.on("move", (move)=>{
        try{
            if(chess.turn==='w' && u_socket.id!==players.white) return;
            if(chess.turn==='b' && u_socket.id!==players.black) return;

            const result = chess.move(move)
            if(result){
                currentPlayer = chess.turn()
                io.emit("mover", move)
                io.emit("boardState", chess.fen())
            }
            else{
                console.log("Invalid move: ", move)
                u_socket.emit("Invalid move: ", move)
            }
        }
        catch(err){
            console.log(err)
            u_socket.emit("Invalid move: ", move)
        }
    })
});

server.listen(3000, function(){
    console.log("Server is listening on port 3000")
});