// gsap.from(".page1 .box", {
//     scale: 0,
//     delay: 0.5,
//     duration: 2,
//     rotate: 360
// })


// gsap.from(".page2 .box", {
//     scale: 0,
//     duration: 2,
//     rotate: 360,
//     scrollTrigger: {
//         trigger: ".page2 .box",
//         scroller: "body",
//         markers: true,
//         start: "top 60%"
//     }
// })
// gsap.from(".page3 .box", {
//     scale: 0,
//     delay: 0.5,
//     duration: 2,
//     rotate: 360,
//     scrollTrigger: ".page3 .box"
// })

gsap.from("h1", {
    opacity: 0,
    duration: 0.5,
    x: 200,
    scrollTrigger: {
        trigger: ".page2 h1",
        scroller: "body",
        markers: true,
        start: "top 30%",
        end: "top 20%",
        scrub: 2
    }
})
gsap.from("h2", {
    opacity: 0,
    duration: 0.5,
    x: -200,
    scrollTrigger: {
        trigger: ".page2 h2",
        scroller: "body",
        markers: true,
        start: "top 40%"
    }
})