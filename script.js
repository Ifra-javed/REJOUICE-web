function LocoScroll(){
    
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
LocoScroll();

function cursorEffect(){
    let page1Content = document.querySelector("#page1-content");
let cursor = document.querySelector("#cursor");

page1Content.addEventListener("mousemove", function(dets){
    gsap.to("#cursor",{
        x:dets.x,
        y:dets.y
    })
})
page1Content.addEventListener("mouseenter", function(){
    gsap.to(cursor,{
        scale:1,
        opacity:1
    })
})
page1Content.addEventListener("mouseleave", function(){
    gsap.to(cursor,{
        scale:0,
        opacity:0
    })
})
}
cursorEffect();

function page2Animation(){
    gsap.from(" #page2-top h3 ,#page2-top h4,.elem h1 ",{
        y:120,
        stagger:0.25,
        duration:1,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top 40%",
            end:"top 36%",
            // markers:true,
            scrub:2
        }
    })
}
page2Animation();

function page4Animation(){
    gsap.from(" #page4-top h3 , .elem4 h1 ",{
        y:120,
        stagger:0.25,
        duration:1,
        scrollTrigger:{
            trigger:"#page4",
            scroller:"#main",
            start:"top 60%",
            end:"top 46%",
            // markers:true,
            scrub:2
        }
    })
}
page4Animation();

function cursor4Effect(){
let page4Bottom = document.querySelector("#page4-bottom");
let cursorTwo = document.querySelector("#cursor-two");

page4Bottom.addEventListener("mousemove", function(dets){
    gsap.to("#cursor-two",{
        x:dets.x,
        y:dets.y,
    })
})
page4Bottom.addEventListener("mouseenter", function(){
    gsap.to(cursorTwo,{
        scale:1,
        opacity:1,
        duration:1,
        ease:"back.out"
    })
})
page4Bottom.addEventListener("mouseleave", function(){
    gsap.to(cursorTwo,{
        scale:0,
        opacity:0
    })
})
}
cursor4Effect();

function sliderAnimation(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: true,
          },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

}
sliderAnimation();


let tl = gsap.timeline()

tl.from("#loader h3",{
    x:60,
    opacity:0,
    duration:1,
    stagger:0.1
})
tl.to("#loader h3",{
    x:-20,
    opacity:0,
    duration:0.5,
    stagger:0.1
})
tl.to("#loader",{
    opacity:0,
})
tl.from("#page1-content h1 span",{
    opacity:0,
    y:100,
    duration:0.5,
    stagger:0.1,
    delay:-0.5
})
tl.to("#loader",{
  display:"none"
})
