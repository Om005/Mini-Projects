let ipath = "M 10 100 Q 500 100 990 100"
let fpath = "M 10 100 Q 500 100 990 100"

document.querySelector(".container").addEventListener("mousemove", (cor)=>{
    let path = `M 10 100 Q ${cor.x} ${cor.y} 990 100`

    gsap.to("svg path", {
        attr: {d: path},
        duration: 0.5,
        ease: "power3.out"
    })
})
document.querySelector(".container").addEventListener("mouseleave", (cor)=>{

    gsap.to("svg path", {
        attr: {d: fpath},
        duration: 1.5,
        // ease: "elastic.out"
        ease: "elastic.out(1,0.1)",
    })
})
