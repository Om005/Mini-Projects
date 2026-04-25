let currSong = new Audio();
let songs
let curr_playlist
let curr_songs;
let old_songs;

async function playSong(Track, pause = false, fname) {
    currSong.src = `/PlayLists/${fname}/${Track}`;
    if (!pause) {
        currSong.play()
        document.querySelector(".songinfo").innerHTML = `${Track}`
        currSong.addEventListener("timeupdate", () => {
            document.querySelector(".songtime").innerHTML = `${String(parseInt(currSong.currentTime / 60)).padStart(2, '0')}:${String(parseInt(currSong.currentTime) % 60).padStart(2, '0')} / ${String(parseInt(currSong.duration / 60)).padStart(2, '0')}:${String(parseInt(currSong.duration) % 60).padStart(2, '0')}`
            document.querySelector(".circle").style.left = `${currSong.currentTime / currSong.duration * 100}%`

            if (`${String(parseInt(currSong.currentTime / 60)).padStart(2, '0')}:${String(parseInt(currSong.currentTime) % 60).padStart(2, '0')}` == `${String(parseInt(currSong.duration / 60)).padStart(2, '0')}:${String(parseInt(currSong.duration) % 60).padStart(2, '0')}`) {
                // play.src = "./svg/play-bt.svg"
                if (currSong.src == curr_songs[curr_songs.length - 1]) {
                    play.src = "./svg/play-bt.svg"
                }
                else {
                    next.click()
                }
            }
        })
        play.src = "./svg/pause.svg"
    }
    else {

        document.querySelector(".songinfo").innerHTML = `${Track}`
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    }
}

async function fetch_inside(l) {
    let rtn = "./imgs/music_6000250.png";

    let inside = await fetch(`${l.href}`);
    let inside_t = await inside.text();
    // console.log(inside_t)
    let in_div = document.createElement("div");
    in_div.innerHTML = inside_t;
    let as3 = in_div.getElementsByTagName("a");
    for (let ele of as3) {
        if (ele.href.endsWith(".jpeg") || ele.href.endsWith(".jpg") || ele.href.endsWith(".png") || ele.href.endsWith(".svg")) {
            rtn = `${ele.href}`;
            rtn = rtn.split("/PlayLists/")[1];
            rtn = "./PlayLists/" + decodeURI(rtn);
            // console.log(rtn);
            break;
        }
        // console.log("./PlayLists/"+decodeURI(rtn))
    }
    // console.log(rtn)
    return rtn
}


async function getSongs(l) {
    // let a = await fetch("http://127.0.0.1:3000/songs/")
    let a = await fetch(l)
    let response = await a.text()

    let div = document.createElement("div");
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let i = 0; i < as.length; i++) {
        let ele = as[i]
        if (ele.href.endsWith(".mp3")) {
            songs.push(ele.href)
        }
    }
    return songs
}

async function get_h2(l) {
    // console.log(l.href)
    let h2f = await fetch(l.href + "info.json")
    let h2j = await h2f.json()
    return h2j.title
}
async function get_p(l) {
    // console.log(l.href)
    let h2f = await fetch(l.href + "info.json")
    let h2j = await h2f.json()
    return h2j.description
}
async function createCard(as2) {
    
    for (let ele of as2) {
        if (ele !== as2[0]) {

            let name_of_list = `${ele.href.split("/PlayLists/")[1]}`
            name_of_list = name_of_list.replaceAll("/", " ")
            let new_div = document.createElement("div")
            new_div.classList.add("card", "rounded")
            new_div.setAttribute("data-loc", ele)

            let img_s = await fetch_inside(ele)
            let h2 = `${await get_h2(ele)}`
            let p = `${await get_p(ele)}`



            new_div.innerHTML = `<div class="play">
            <img src="./svg/play.svg" alt="">
            </div>
            <img src=${img_s} alt=""
            class="rounded">
            <h2 class="roboto-bold f-1">${h2.toUpperCase()}</h2>
            <p class="roboto-bold f-14 color-B3">${p.toUpperCase()}</p>`;


            // console.log(ele.href);
            // (async function temp(){
            //     await fetch_inside(ele);
            // })()
            
            document.querySelector(".cardContainer").append(new_div)


            new_div.addEventListener("mouseenter", () => {
                new_div.firstElementChild.classList.toggle("play-class")
            })
            new_div.addEventListener("mouseleave", () => {
                new_div.firstElementChild.classList.toggle("play-class")
            })
            let new_link = `${ele}`
            let new_songs = await getSongs(`${ele}`)
            // console.log(new_songs)
            new_div.querySelector(".play").addEventListener("click", () => {
                if (new_songs.length > 0) {
                    playSong(decodeURI(new_songs[0].split("/")[new_songs[0].split("/").length - 1]), false, decodeURI(new_songs[0].split("/")[new_songs[0].split("/").length - 2]));
                    (async function () {
                        curr_playlist = new_div.getAttribute("data-loc")
                        old_songs = await getSongs(curr_playlist)
                        console.log(curr_playlist)
                        console.log(old_songs)
                    })();
                }
            })
            
            new_div.addEventListener("click", async () => {
                curr_playlist = new_div.getAttribute("data-loc")
                // console.log(new_link)
                // alert("ok")
                // console.log(new_songs)
                let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
                songUL.innerHTML = ""
                if (new_songs.length == 0) {
                    let e_div = document.createElement("div")
                    e_div.innerHTML = "No songs found"
                    songUL.append(e_div)
                    // songUL.innerHTML = "No songs found"
                    e_div.style.textAlign = "center"
                    e_div.classList.add("roboto-bold")
                    e_div.style.fontSize = "20px"
                    e_div.style.paddingTop = "40%"
                }
                else {

                    for (const song of new_songs) {
                        // console.log(song)
                        // console.log(decodeURI(song.split("/")[song.split("/").length-1]))
                        //                         <lord-icon class="list_img invert"
                        //     src="https://cdn.lordicon.com/yvsfcbjq.json"
                        //     trigger="hover"
                        //     style="width:250px;height:250px">
                        // </lord-icon>
                        songUL.innerHTML = songUL.innerHTML + `<li>
                        <img src="./imgs/musical-note.png" alt="" class="list_img invert">
                <div class="info">
                <div class="poppins-semibold name_of_song">${decodeURI(song.split("/")[song.split("/").length - 1])}</div>
                <div class="poppins-semibold creator">Om</div>
                </div>
                </li>`
                    }
                    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(ele => {
                        ele.addEventListener("click", () => {
                            playSong(ele.querySelector(".info").firstElementChild.innerHTML, false, decodeURI(new_songs[0].split("/")[new_songs[0].split("/").length - 2]))
                            // playSong(decodeURI(ele.split("/")[ele.split("/").length-1]), true, decodeURI(ele.split("/")[ele.split("/").length-2]))
                            document.querySelector("#play-logo").src = "./imgs/dynamic.gif"
                            document.querySelector(".circle").style.transition = `all ${parseInt(currSong.duration)}s`;
                            (async function () {
                                old_songs = await getSongs(curr_playlist)
                                // console.log(old_songs);
                            })();
                        })

                    })
                }

                gsap.from(".songList ul li", {
                    opacity: 0,
                    duration: 1,
                    stagger: 0.02
                })
                curr_songs = await getSongs(curr_playlist)
                // console.log(curr_songs)
                let hamburger = document.querySelector(".hamburger")
                if (window.getComputedStyle(hamburger).display == "block") {
                    document.querySelector(".hamburger").click()
                }
            })
            if (ele == as2[1]) {
                (async function () {
                    curr_playlist = new_div.getAttribute("data-loc")
                    old_songs = await getSongs(curr_playlist)
                    console.log(curr_playlist)
                    console.log(old_songs)
                })();
                new_div.click()
                if (new_songs.length > 0) {
                    playSong(decodeURI(new_songs[0].split("/")[new_songs[0].split("/").length - 1]), true, decodeURI(new_songs[0].split("/")[new_songs[0].split("/").length - 2]))
                }
            }

        }
    }
}

async function main() {
    // songs = await getSongs("http://127.0.0.1:3000/songs/")
    let ab = await fetch("http://127.0.0.1:3000/PlayLists/");
    let abr = await ab.text();
    let div = document.createElement("div");
    div.innerHTML = abr;

    // let as2 = div.getElementsByTagName("a");
    (async function () {
        let as2 = div.getElementsByTagName("a")
        console.log(as2)
        await createCard(as2);
    })();
    // console.log(songs)
    // currSong.src = `/songs/${songs[0]}.mp3`
    // playSong(songs[0].split("/songs/")[1]).replaceAll("%20", " ").replaceAll(".mp3", "")
    /////////////       playSong(decodeURI(songs[0].split("/songs/")[1]), true)
    /////////////       // playSong(songs[0].split("/songs/")[1]).replaceAll("%20", " ").replaceAll(".mp3", "")
    /////////////
    /////////////       let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    /////////////       for (const song of songs) {
    /////////////           songUL.innerHTML = songUL.innerHTML + `<li>
    /////////////       <img src="./imgs/musical-note.png" alt="" class="list_img invert">
    /////////////       <div class="info">
    /////////////       <div class="poppins-semibold name_of_song">${decodeURI(song.split("/songs/")[1])}</div>
    /////////////       <div class="poppins-semibold creator">Om</div>
    /////////////       </div>
    /////////////       </li>`
    /////////////       }
    // <div class="poppins-semibold name_of_song">${(song.split("/songs/")[1]).replaceAll("%20", " ").replaceAll(".mp3", "")}</div>

    // console.log()
    // play the first song
    // let audio = new Audio(songs[0])
    // audio.play(); 

    // Attach an event listner
    // Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(ele => {
    //     ele.addEventListener("click", () => {
    //         playSong(ele.querySelector(".info").firstElementChild.innerHTML)
    //         document.querySelector(".circle").style.transition = `all ${parseInt(currSong.duration)}s`
    //     })
    // ele.addEventListener("mousedown", ()=>{
    //     ele.style.backgroundColor = "rgb(86 86 86)"
    // })
    // ele.addEventListener("mouseup", ()=>{
    //     ele.style.backgroundColor = "#121212"
    // })

    // Pause and play event
    // })
    // let play = document.querySelector("#play")
    play.addEventListener("click", () => {
        currSong.addEventListener("timeupdate", () => {
            document.querySelector(".songtime").innerHTML = `${String(parseInt(currSong.currentTime / 60)).padStart(2, '0')}:${String(parseInt(currSong.currentTime) % 60).padStart(2, '0')} / ${String(parseInt(currSong.duration / 60)).padStart(2, '0')}:${String(parseInt(currSong.duration) % 60).padStart(2, '0')}`
            document.querySelector(".circle").style.left = `${currSong.currentTime / currSong.duration * 100}%`

            if (`${String(parseInt(currSong.currentTime / 60)).padStart(2, '0')}:${String(parseInt(currSong.currentTime) % 60).padStart(2, '0')}` == `${String(parseInt(currSong.duration / 60)).padStart(2, '0')}:${String(parseInt(currSong.duration) % 60).padStart(2, '0')}`) {
                // play.src = "./svg/play-bt.svg"
                next.click()
            }
        })
        if (currSong.paused) {
            currSong.play()
            play.src = "./svg/pause.svg"
            document.querySelector("#play-logo").src = "./imgs/dynamic.gif" 
        }
        else {
            currSong.pause()
            play.src = "./svg/play-bt.svg"
            document.querySelector("#play-logo").src = "./imgs/static.png" 
        }
    })
    play.addEventListener("mousedown", () => {
        play.style.transform = "scale(0.9)"
    })
    play.addEventListener("mouseup", () => {
        play.style.transform = "scale(1)"
    })
    next.addEventListener("mousedown", () => {
        next.style.transform = "scale(0.9)"
    })
    next.addEventListener("mouseup", () => {
        next.style.transform = "scale(1)"
    })
    previous.addEventListener("mousedown", () => {
        previous.style.transform = "scale(0.9)"
    })
    previous.addEventListener("mouseup", () => {
        previous.style.transform = "scale(1)"
    })

    // seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        // console.log(e.target.getBoundingClientRect(), e.offsetX)
        let tage = e.offsetX / e.target.getBoundingClientRect().width * 100
        document.querySelector(".circle").style.left = `${tage}%`
        currSong.currentTime = currSong.duration * tage / 100
    })

    // For hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-160%"
    })

    // Next and Previous

    // await new Promise(resolve=>{
    //     setTimeout(() => {
    //         resolve()
    //     }, 100);
    // })
    // console.log(curr_playlist)
    // previous.addEventListener("click", () => {
    //     let curr_songs;
    //     (async function(){
    //         curr_songs = await getSongs(curr_playlist)
    //     })
    //     console.log(currSong)
    //     let index = curr_songs.indexOf(currSong.src)
    //     alert("aksdhf")
    //     // console.log(currSong.src)
    //     // console.log(songs[index - 1])
    //     if (index == 0) {
    //         document.querySelector(".circle").style.left = 0
    //         currSong.currentTime = 0
    //         alert("hey")
    //     }
    //     else {
    //         console.log(decodeURI(songs[index - 1].split("/")[songs[index-1].split("/").length-1]))
    //         // playSong(decodeURI(songs[index - 1].split(`/songs/`)[1]))
    //     }
    //     console.log(index)
    //     // console.log(songs)
    // })
    // next.addEventListener("click", () => {
    //     let curr_songs;
    //     (async function(){
    //         curr_songs = await getSongs(curr_playlist)
    //     })
    //     let index = curr_songs.indexOf(currSong.src)
    //     if (index < songs.length - 1) {
    //         playSong(decodeURI(songs[index + 1].split("/songs/")[1]))
    //     }
    // })
    // Playlist
    // document.querySelectorAll(".card").forEach(ele=>{
    //     ele.addEventListener("click", ()=>{
    //         // document.querySelector(".songList").getElementsByTagName("ul")[0].innerHTML = ""
    //         console.log(ele.getAttribute("data-loc"))
    //         console.log("i am clicked")
    //     })
    // })
    previous.addEventListener("click", () => {
        let index = old_songs.indexOf(currSong.src)
        if (index == 0) {
            document.querySelector(".circle").style.left = 0
            currSong.currentTime = 0
        }
        else {
            playSong(decodeURI(old_songs[index - 1].split("/")[old_songs[index - 1].split("/").length - 1]), false, decodeURI(old_songs[index].split("/")[old_songs[index].split("/").length - 2]))
            // playSong(decodeURI(songs[index - 1].split(`/songs/`)[1]))
        }
    })
    next.addEventListener("click", () => {
        let index = old_songs.indexOf(currSong.src)
        if (index == old_songs.length - 1) {
            // currSong.currentTime = currSong.duration
            // play.src = "./svg/play-bt.svg"
            // document.querySelector(".circle").style.left = 0
            // currSong.currentTime = 0
        }
        else {
            // playSong(decodeURI(old_songs[index - 1].split("/")[old_songs[index-1].split("/").length-1]), false, decodeURI(old_songs[index - 2].split("/")[old_songs[index-1].split("/").length-2]))
            playSong(decodeURI(old_songs[index + 1].split("/")[old_songs[index + 1].split("/").length - 1]), false, decodeURI(old_songs[index].split("/")[old_songs[index].split("/").length - 2]))
            // playSong(decodeURI(songs[index - 1].split(`/songs/`)[1]))
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.key == ' ') {
            play.click()
        }
        if (e.key == 'ArrowRight') {
            currSong.currentTime += 5
        }
        if (e.key == 'ArrowLeft') {
            currSong.currentTime -= 5
        }
        if (e.key == 'N' && e.shiftKey == true) {
            next.click()
        }
    })
}

main();
