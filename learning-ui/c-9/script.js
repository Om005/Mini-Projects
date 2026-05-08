let tl = gsap.timeline()

tl.to(".full", {
    right: 0,
    duration: 0.6,
    ease: "bounce.out"
})
tl.from(".full h4", {
    x: 100,
    opacity: 0,
    stagger: 0.2
})
tl.from(".full i", {
    opacity: 0,
    duration: 0.2,
    scale: 2,
})

tl.pause()

document.querySelector(".nav i").addEventListener("click", ()=>{
    tl.play()
})
document.querySelector(".full i").addEventListener("click", ()=>{
    tl.reverse()
})