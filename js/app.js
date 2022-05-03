"use strict"
gsap.registerPlugin(ScrollTrigger);

const menu = document.getElementById('nav').querySelector('.main-nav')
const menuPoints = menu.querySelectorAll('.main-nav-point')
const records = document.querySelectorAll(".record")
const points = document.querySelectorAll(".point")
const termin = document.getElementById('termine')
const termine = termin.querySelectorAll('.scroll-content > p')
const contact = document.getElementById('contact')
const contactInfo = contact.querySelectorAll('.desc > div')

//Site Animation
//Start
const Tl = gsap.timeline({defaults: {duration: .8, ease: "back.out"}})
Tl.fromTo('#start', {scale: 1.05}, {scale: 1})
Tl.fromTo('#start h2', {opacity: 0, y:50}, {opacity: 1, y:0}, "<50%")
Tl.fromTo('#start p', {opacity: 0, y:50}, {opacity: 1, y:0}, "<40%")
Tl.fromTo('.autograph', {opacity: 0, y:50}, {opacity: 1, y:0}, "<30%")
Tl.fromTo('#nav', {y: -56}, {y:0, ease: "power1.out"}, "<30%")
Tl.fromTo('#nav h1', {opacity: 0, rotation: "-30deg", x: -20}, {opacity: 1,rotation: "0deg", x:0}, "<50%")
Tl.fromTo('#nav > div > span', {opacity: 0, x: -20}, {opacity: 1, x:0}, "<25%")
menuPoints.forEach((point) => {Tl.fromTo(point, {opacity: 0, y: -20}, {opacity: 1, y:0}, "<20%")})
Tl.fromTo('.lang-nav', {opacity: 0, y: -20}, {opacity: 1, y:0}, "<25%")

//Career
const careerTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#career",
    start: "-10% 60%"
  },
})
careerTl.fromTo('#career .head .line', {x: "-100%"}, {x: 0, duration: 1, ease: "back.in"})
careerTl.fromTo('#career .head h2', {opacity: 0, x: 70}, {opacity: 1, x: 0, duration: .75, ease: "back.out"})
careerTl.fromTo('#career .filter', {opacity: 0, x: 30}, {opacity: 1, x: 0, duration: .75, ease: "back.out"}, "<20%")
careerTl.fromTo('#timeline .slider-nav .line', {scale: 0}, {scale: 1, duration: .75, ease: "power1.out"}, "<50%")
points.forEach((point) => {careerTl.fromTo(point, {opacity: 0, y: 60}, {opacity: 1, y: 0, duration: .75, ease: "back.in"}, "<20%")}, "<60%")

//Live
const liveTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#live",
    start: "-10% 50%"
  },
  duration: .5,
  ease: "back.out"
})
liveTl.fromTo('#live .head .line', {x: "100%"}, {x: 0, duration: 1, ease: "back.in"}, "<20%")
liveTl.fromTo('#live .head h2', {opacity: 0, x: -70}, {opacity: 1, x: 0, duration: .75, ease: "back.out"})
liveTl.fromTo('#live .filter', {opacity: 0, x: 30}, {opacity: 1, x: 0, duration: .75, ease: "back.out"}, "<20%")
termine.forEach((termin) => {liveTl.fromTo(termin, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: .5, ease: "back.out"}, "<20%")})
liveTl.fromTo('#termine .down', {opacity: 0}, {opacity: 1, duration: .75, ease: "back.out"}, "<20%")
liveTl.fromTo('#live .note', {opacity: 0, x: 30}, {opacity: 1, x:0, duration: .75, ease: "back.out"}, "<40%")

//Career
const recordsTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#work",
    start: "-50%"
  },
})
recordsTl.fromTo('#work .head .line', {x: "-100%"}, {x: 0, duration: 1, ease: "back.in"})
recordsTl.fromTo('#work .head h2', {opacity: 0, x: 70}, {opacity: 1, x: 0, duration: .75, ease: "back.out"})
recordsTl.fromTo('#work .head p', {opacity: 0, x: 70}, {opacity: 1, x: 0, duration: .75, ease: "back.out"}, "< 30%")
records.forEach((record) => {recordsTl.fromTo(record, {opacity: 0, scale: .5}, {opacity: 1, scale: 1, duration: .7}, "<20%")})
recordsTl.fromTo('#work .filter', {opacity: 0, x: 30}, {opacity: 1, x: 0, duration: .75, ease: "back.out"}, "<20%")

const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#contact",
    start: "-50%"
  },
})

contactTl.fromTo('#contact .head .line', {x: "100%"}, {x: 0, duration: 1, ease: "back.in"})
contactTl.fromTo('#contact .head h2', {opacity: 0, x: -70}, {opacity: 1, x: 0, duration: .75, ease: "back.out"})
contactInfo.forEach((contacts) => {contactTl.fromTo(contacts, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: .75, ease: "back.out"}, "<20%")})

// Filter
const filterDropdown = (id) => {
  let parentElem = document.getElementById(id),
  filterElem = parentElem.querySelector(".filter-dropdown");

  let firstElem = document.createElement("li");
  firstElem.classList.add("hide");
  filterElem.prepend(firstElem);

  let elements = filterElem.querySelectorAll("li"),
  allElemsHeight = elements[1].offsetHeight * elements.length;

  for (let elem of elements) {
    elem.addEventListener("click", () => {
      filterElem.classList.toggle("open");
      filterElem.style.height = filterElem.classList.contains("open") ? allElemsHeight + "px" : "30px"
      if (!elem.classList.contains("active")) {
        removeClassFromList(elements, "hide")
        removeClassFromList(elements, "active")
        elem.classList.add("hide")
        filterElem.firstChild.innerHTML = elem.innerHTML
        filterElem.firstChild.classList.add("active") 
      }
    })
  }
}

//Dropdown 
const dropdown = menu.querySelector('.dropdown')
const subnav = menu.querySelector('.sub-nav')

dropdown.addEventListener('click', () => {
  subnav.classList.toggle("open")
})

//Terminscroller
const terminScroller = () => {
  const scroller = document.getElementById("termin-scroller"),
      scrollerContent = scroller.querySelector(".scroll-content"),
      up = scroller.parentElement.querySelector(".up"),
      down = scroller.parentElement.querySelector(".down");

  
    const getScrollerHeight = () => {
      let scrollerHeight = scroller.offsetHeight
      return scrollerHeight
    }

    const getScrollerContentHeight = () => {
      let scrollerContentHeight = scrollerContent.offsetHeight;
      return scrollerContentHeight
    }
    
    let position = 0;
      

      down.addEventListener('click', () => {
        let scrollerHeight = getScrollerHeight();
        let scrollerContentHeight = getScrollerContentHeight();
        if (scrollerHeight < scrollerContentHeight) {
          position = scrollerContentHeight - scrollerHeight;
          scrollerContent.style.transform = "translateY(-" + position + "px)";
          if (up.classList.contains("invisible")) {
            up.classList.remove("invisible")
            scroller.classList.remove("invisible")
            down.classList.add("invisible")
          } else {
            up.classList.add("invisible")
            scroller.classList.add("invisible")
          }
        }
      })

      up.addEventListener('click', () => {
        let scrollerHeight = getScrollerHeight();
        let scrollerContentHeight = getScrollerContentHeight();
        position = scrollerContentHeight - scrollerHeight;
        if (position !== 0) {
          scrollerContent.style.transform = "translateY(0px)"
          if (down.classList.contains("invisible")) {
            down.classList.remove("invisible")
            up.classList.add("invisible")
            scroller.classList.add("invisible")
          } else {
            down.classList.add("invisible")
            scroller.classList.remove("invisible")
          }
        }
      })
}


const calcScale = (elem) => {
  const card = elem.querySelector('.card');
  let scale = 0,
      cardWidth = card.offsetWidth;

  scale = 500 / cardWidth;
  return scale;
}

const blurSiblings = (status) => {
  let blurValue = status ? "2px" : "0" 
  for (let record of records) {
    record.style.filter = "blur(" + blurValue + ")"
  }
}

const closeRecord = (elem) => {
  const card = elem.querySelector('.card');
  elem.classList.remove("open");
  card.style.transform = "scale(1)"
  blurSiblings(false);
}

const openRecord = (elem) => {
  const card = elem.querySelector('.card'),
        back = card.querySelector('.back'),
        headline = back.querySelector('h4'),
        subhead = back.querySelector('h5'),
        tracks = back.querySelector('div');
        
  let scale = calcScale(elem); 

  card.style.transform = "scale(" + scale +  ") rotateY(180deg)"
  elem.classList.add("open");
  let fontsize = 1.4 / scale;
  let headsize = 1.75 / scale;
  let subheadsize = 1.5 / scale;
  let margin = .5 / scale;
  let padding = 1.5 / scale;
  let lineHeight = 1.75 / scale;
  back.style.fontSize = fontsize + "rem"
  back.style.lineHeight = lineHeight + "rem"
  back.style.padding = padding + "rem"
  tracks.style.marginBottom = margin + "rem"
  headline.style.fontSize = headsize + "rem"
  headline.style.marginBottom = margin + "rem"
  subhead.style.fontSize = subheadsize + "rem"
  subhead.style.marginBottom = margin + "rem"
  blurSiblings(true);
  elem.style.filter = "blur(0)"
}

const recordInfo = () => {
  let records = document.querySelectorAll(".record");
  
  for(let record of records) {
    record.addEventListener('click', (event) => {
      //apply open class
      if (record.classList.contains("open")){
        closeRecord(record);
      } else {
        for(let sibling of records) {
          closeRecord(sibling)
        }
        openRecord(record);
      }
    })
  }
}


//Slider
const getSliderWidth = (elem) => {
  return elem.offsetWidth;
}

const getSliderInnerWidth = (elem, margin) => {
  let innerWidth = 0;
  for (let card of elem) {
    innerWidth += card.offsetWidth + margin
  }
  return innerWidth
}

const getElementWidth = (elem, margin) => {
  let cardWidth = 0
  for (let card of elem) {
    cardWidth = card.offsetWidth + margin
  }
  return cardWidth
}

const slider = (id, slideElem, margin) => {
  const slider = document.getElementById(id)
  const sliderContainer = slider.querySelector('.slider-container')
  const sliderInner = slider.querySelector('.slider-inner')
  const nextBtn = slider.querySelector(".next")
  const prevBtn = slider.querySelector(".prev")
  const sliderElements = slider.querySelectorAll(slideElem)

  let touchstartX = 0
  let touchendX = 0
  let touchstartY = 0
  let touchendY = 0
  let position = 0

  const slideToRight = () => {
    let sliderElemWidth = getSliderWidth(sliderContainer)
    let innerElemWidth = getSliderInnerWidth(sliderElements, margin)
    position -= sliderElemWidth
    if (position < 0) {
      position = 0
    }
    sliderInner.style.transform = `translateX(-${position}px)`
  }
  const slideToLeft = () => {
    let sliderElemWidth = getSliderWidth(sliderContainer)
    let cardWidth = getElementWidth(sliderElements, margin)
    let innerElemWidth = getSliderInnerWidth(sliderElements, margin)
    let scrollWidth = 0
    
    let multiplier = Math.floor(sliderElemWidth / cardWidth)
    scrollWidth = cardWidth * multiplier

    if (position < innerElemWidth - sliderElemWidth) {
      position += scrollWidth
    }

    if (position + sliderElemWidth > innerElemWidth) {
      position = innerElemWidth - sliderElemWidth
    }
    sliderInner.style.transform = `translateX(-${position}px)`
  }
  
  nextBtn.addEventListener('click', () => slideToLeft())
  prevBtn.addEventListener('click', () => slideToRight())

  function handleGesture() {
    if (Math.abs(touchendX - touchstartX) <= 20 || Math.abs(touchendY - touchstartY) >= Math.abs(touchendX - touchstartX)) {return}
    if (touchendX < touchstartX) {slideToLeft()}
    if (touchendX > touchstartX) {slideToRight()}
  }

  slider.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
  })

  slider.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    handleGesture()
  })
}

//Helper
const removeClassFromList = (list, className) => {
  for (let listElem of list) {
    listElem.classList.remove(className)
  }
}

recordInfo();
slider("career", ".point", 72);
slider("work", ".card", 5);
terminScroller();
filterDropdown("career");
filterDropdown("work");