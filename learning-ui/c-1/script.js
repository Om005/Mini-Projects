gsap.from("#box1", {
    x: 1200,
    duration: 2,
    delay: 1,
    rotate: 360,
    borderRadius: "50%",
    backgroundColor: "blue",
    scale: 0.8,
    repeat: -1,
    yoyo: true
})
gsap.from("#box2", {
    x: 1000,
    duration: 2,
    delay: 1
})