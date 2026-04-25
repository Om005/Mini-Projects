let tl = gsap.timeline()

tl.from("nav h1, nav h4, nav button", {
    y: -10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.5
})
tl.from(".center1 h1", {
    x: -100,
    opacity: 0,
    duration: 0.4
})
tl.from(".center1 p", {
    x: -100,
    opacity: 0,
    duration: 0.4
})
tl.from(".center1 button", {
    opacity: 0,
})
tl.from(".center2 img", {
    opacity: 0,
    duration: 0.5,
    x: 100
}, "-=1")
tl.from(".imgs img", {
    opacity: 0,
    y: 100,
    // duration: 0.5,
    stagger: 0.1
})



let tll = gsap.timeline({
    scrollTrigger: {
        trigger: ".section2",
        scroller: "body",
        start: "top 50%",
        end: "top 30%",
        scrub: 2,
    }
})
tll.from(".services", {
    opacity: 0,
    y: 30,
    duration: 0.5,
})
tll.from(".line1.left", {
    x: -300,
    opacity: 0,
    // duration: 1
}, "ok1")
tll.from(".line1.right", {
    x: 300,
    opacity: 0,
    // duration: 1
}, "ok1")


tll.from(".line2.left", {
    x: -300,
    opacity: 0,
    // duration: 1
}, "ok2")
tll.from(".line2.right", {
    x: 300,
    opacity: 0,
    // duration: 1
}, "ok2")