let statement_num = 0;
let proce = {
    0: "Initializing Your system to be processed...",
    1: "Reading Your System Files...",
    2: "Password Files Detected...",
    3: "Sending all passwords and personal files to server...",
    4: "Disabling Security Protocols...",
    5: "Downloading Malware files into System...",
    6: "Activating Backdoor...",
    7: "Initiating Remote Control...",
    8: "Downloading Unknown files...",
    9: "Encrypting File Data...",
    10: "System Data Erasure Protocol Initiated..."
}

function playSound(url) {
    var audio = new Audio(url);
    audio.play();
}

async function dot_func(n, t) {
    let p = document.querySelector(`.p${n}`)
    let old_txt = p.textContent
    while (true) {
        for (let k = 1; true; k++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    p.textContent = old_txt.slice(0, k % 3 == 0 ? -1 : -3 + k % 3)
                    resolve()
                }, 100);
            })
            if (k % 3 == 0) p.textContent = old_txt
            if (k * 500 >= t && p.textContent == old_txt){
                if(n==5){
                    document.querySelector(".file1").click()
                    alert("This file is harmful for your device")
                    playSound('voice.mp3')
                }
                break
            }
        }
        p.textContent = old_txt + "   Completed"
        break
    }
}

async function addText() {
    let time = (Math.floor(Math.random() * 7) + 1) * 1000;
    if (statement_num == 0) {
        await new Promise((resolve) => {
            setTimeout(() => {
                let newp = document.createElement("p");
                newp.classList.add(`p${statement_num}`)
                newp.textContent = proce[statement_num];
                document.body.append(newp);
                statement_num++;
                resolve()
            }, time);
        })
    }
    else {
        await dot_func(statement_num - 1, time)
        if(statement_num-1==0){
            alert("This site may cause data leak from your system")            
        }
        await new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 100);
        })
        let newp = document.createElement("p");
        newp.classList.add(`p${statement_num}`)
        newp.textContent = proce[statement_num];
        document.body.append(newp);
        statement_num++;
        if (statement_num == 11) {
            await dot_func(statement_num - 1, 3000)
            newp.textContent = newp.textContent
            window.close()
        }
    }
}

async function main() {
    for (let i = 0; i < 11; i++) {
        await addText();
    }
}

main()
