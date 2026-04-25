document.querySelectorAll(".card").forEach(ele=>{
    ele.addEventListener("mouseenter", ()=>{
        ele.firstElementChild.classList.toggle("play-class")
    })
    ele.addEventListener("mouseleave", ()=>{
        ele.firstElementChild.classList.toggle("play-class")
    })
})

gsap.from(".playbar", {
    opacity: 0,
    y: 100,
    duration: 0.4
})
gsap.from(".logo", {
    opacity: 0,
    y: -100,
    duration: 0.4
})
gsap.from(".home ul li", {
    opacity: 0,
    duration: 0.4,
    x: -100
})
gsap.from(".header", {
    opacity: 0,
    duration: 0.4,
    y: -100
})