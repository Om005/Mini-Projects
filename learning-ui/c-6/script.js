gsap.to(".page2 h1", {
    transform: "translateX(-160%)",
    scrollTrigger: {
        trigger: ".page2",
        scroller: "body",
        start: "top 0%",
        // markers: true,
        end: "top -100%",
        scrub: 2,
        pin: true

    }
})