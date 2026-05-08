// time calculation 
// pass
// solution is timeline

let tl = gsap.timeline()

tl.from("h2", {
    opacity: 0,
    y: -10,
    duration: 0.4,
    delay: 0.5
})
tl.from("li", {
    opacity: 0,
    y: -10,
    duration: 0.4,
    stagger: 0.2
})
tl.from("h1", {
    opacity: 0,
    y: -5,
    duration: 0.5,
    scale: 0.5
})
// same for box3