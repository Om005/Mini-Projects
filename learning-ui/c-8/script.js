let cont = document.querySelector(".container")
let cu = document.querySelector(".cursor")

document.querySelector(".container").addEventListener("mousemove", (cor)=>{
    gsap.to(".cursor", {
        x: cor.x,
        y: cor.y,
        duration: 0.8,
        ease: "back.out"
    })
})

document.querySelector(".box").addEventListener("mouseenter", ()=>{
    gsap.to(".cursor", {
        scale: 1.5
    })
})
document.querySelector(".box").addEventListener("mouseleave", ()=>{
    gsap.to(".cursor", {
        scale: 0.5
    })
})