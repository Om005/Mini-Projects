// time calculation 
// pass
// solution is timeline

let timeline = gsap.timeline()

timeline.to("#box1", {
    x: 1200,
    rotate: 360,
    delay: 1,
    duration: 1
})
timeline.to("#box2", {
    x: 1000,
    rotate: 180,
    duration: 1
})
// same for box3