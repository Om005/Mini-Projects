let t = document.querySelector("h1")

let s = t.textContent
let arr = (s.split(""))

let neww = ""

let num = Math.floor(s.length/2)
console.log(num)
arr.forEach((ele, index) => {
    if(index<num){
        neww += `<span class="a">${ele}</span>`
    }
    // else if(index>4){
    //     neww += `<span class="b">${ele}</span>`
    // }
    else{
        neww += `<span class="b">${ele}</span>`
    }
});

t.innerHTML = neww

gsap.from(".a", {
    y: 70,
    duration: 0.8,
    opacity: 0,
    stagger: 0.15
})
gsap.from(".b", {
    y: 70,
    duration: 0.8,
    opacity: 0,
    stagger: -0.15
})