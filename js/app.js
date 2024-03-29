"use strict"

let isMobile = window.matchMedia("(pointer:coarse)").matches;

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
const dropdown = () => {
  const menu = document.getElementById('nav').querySelector('.main-nav')
  const dropdown = menu.querySelector('.dropdown')
  const subnav = menu.querySelector('.sub-nav')
  const elements = subnav.querySelectorAll('li')
  
  dropdown.addEventListener('click', () => {
    subnav.classList.toggle("open")
    let allElemsHeight = elements[1].offsetHeight * elements.length
    dropdown.classList.toggle('open')
    subnav.style.height = subnav.classList.contains("open") ? allElemsHeight + "px" : "49px"
    for (let element of elements) {
      element.addEventListener('click', () => {
        if (dropdown.classList.contains('open') || subnav.classList.contains('open')) {
          dropdown.classList.remove('open')
          subnav.classList.remove('open')
        }
      })
    }
  })
}

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
      if (position + scrollerHeight < scrollerContentHeight) {
        position += scrollerHeight;
        scrollerContent.style.transform = "translateY(-" + position + "px)";
        // if (up.classList.contains("invisible")) {
        //     up.classList.remove("invisible")
        //     scroller.classList.remove("invisible")
        //     down.classList.add("invisible")
        //   } else {
      //         up.classList.add("invisible")
      //         scroller.classList.add("invisible")
      //       }
      //   }
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

// Record Backanimation Element Calculation
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
  if (!elem.classList.contains('open')) return
  const card = elem.querySelector('.card');
  blurSiblings(false);
  elem.classList.remove("open")
  card.style.transform = "scale(1)"
  let currentPosition = elem.parentElement.style.transform
  currentPosition = parseInt(currentPosition.replace(/[^0-9\-]/g, "")) || 0
  let scrollBacktoInitialPosition = parseInt(elem.parentElement.getAttribute('data-scrolltomiddle'))
  let result = currentPosition + scrollBacktoInitialPosition

  /* Scroll only back to initial position on end and beginning */
  if (currentPosition > 0) elem.parentElement.style.transform = `translateX(0)`
  let widthOfAllElems = 0 
  for (let children of elem.parentElement.children) {
    widthOfAllElems += children.offsetWidth - 6
  }
  widthOfAllElems = widthOfAllElems - elem.parentElement.offsetWidth - 5
  if (currentPosition < -widthOfAllElems) {
    elem.parentElement.style.transform = `translateX(-${widthOfAllElems}px)`
  }

  /** Scrolls records on close back to initial position */
  // elem.parentElement.style.transform = `translateX(${result}px)`
  elem.parentElement.setAttribute('data-scrolltomiddle', 0)
}

const openRecord = (elem) => {
  if (elem.classList.contains('open')) return      
  const card = elem.querySelector('.card'),
        back = card.querySelector('.back'),
        headline = back.querySelector('h4'),
        subhead = back.querySelector('h5'),
        tracks = back.querySelector('div'),
        close = back.querySelector('.close');

  let scale = calcScale(elem);  
  card.style.transform = "scale(" + scale +  ") rotateY(180deg)"
  elem.classList.add("open");
  let fontsize = 1.4 / scale;
  let headsize = 1.75 / scale;
  let subheadsize = 1.5 / scale;
  let margin = .5 / scale;
  let padding = 1.5 / scale;
  let lineHeight = 1.75 / scale;
  let closeSize = 30 /scale;
  back.style.fontSize = fontsize + "rem"
  back.style.lineHeight = lineHeight + "rem"
  back.style.padding = padding + "rem"
  close.style.width = closeSize + "px"
  close.style.height = closeSize + "px"
  close.style.right = closeSize / 2 + "px"
  close.style.top = closeSize / 2 + "px"
  tracks.style.marginBottom = margin + "rem"
  headline.style.fontSize = headsize + "rem"
  headline.style.marginBottom = margin + "rem"
  subhead.style.fontSize = subheadsize + "rem"
  subhead.style.marginBottom = margin + "rem"
  blurSiblings(true);
  elem.style.filter = "blur(0)"
  let parentElemWidth = elem.parentElement.offsetWidth
  let elemWidth = elem.offsetWidth
  let parentElemCenter = (parentElemWidth / 2) + elem.parentElement.offsetLeft
  let elemCenter = (elemWidth / 2) + elem.offsetLeft
  let scrollToMiddleDistance = Math.round(parentElemCenter - elemCenter)
  let currentPosition = elem.parentElement.style.transform
  currentPosition = parseInt(currentPosition.replace(/[^0-9\-]/g, "")) || 0
  elem.parentElement.style.transform = `translateX(${scrollToMiddleDistance}px)`
  elem.parentElement.setAttribute('data-scrolltomiddle',currentPosition - scrollToMiddleDistance)
  // console.log('scrollToMiddleDistance', scrollToMiddleDistance, 'result', (currentPosition - scrollToMiddleDistance), 'parentElemCenter', parentElemCenter, 'elemCenter', elemCenter)
}

let records = document.querySelectorAll(".record")
const recordInfo = () => {
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

const getsliderContentWidth = (slides, margin) => {
  let innerWidth = 0;
  for (let slide of slides) {
    innerWidth += slide.offsetWidth + margin
  }
  return innerWidth
}

const getElementWidth = (elem, margin) => {
  let slideWidth = 0
  for (let slide of elem) {
    slideWidth = slide.offsetWidth + margin
  }
  return slideWidth
}

const slider = (id, slideElem, margin) => {
  const slider = document.getElementById(id)
  const sliderContainer = slider.querySelector('.slider-container')
  const sliderContent = slider.querySelector('.slider-content')
  const sliderElements = slider.querySelectorAll(slideElem)

  const getScrollWidth = () => {
    let sliderElemWidth = getSliderWidth(sliderContainer)
    let slideWidth = getElementWidth(sliderElements, margin)
    let innerElemWidth = getsliderContentWidth(sliderElements, margin)
    let scrollWidth = 0

    let multiplier = Math.floor(sliderElemWidth / slideWidth)
    if (multiplier === 0) {multiplier = 1}
    scrollWidth = slideWidth * multiplier

    return [scrollWidth, sliderElemWidth, innerElemWidth]
  }

  const slideToLeft = () => {
    const [scrollWidth, sliderElemWidth, innerElemWidth] = getScrollWidth();
    const prev = nextBtn.parentElement.querySelector('.prev')
    const next = nextBtn.parentElement.querySelector('.next')
    prev.classList.remove('inactive')
    if (position <= innerElemWidth - sliderElemWidth) {position += scrollWidth}
    if (position + sliderElemWidth > innerElemWidth) {position = innerElemWidth - sliderElemWidth}
    if (position >= 0) {prev.classList.remove('inactive')} else {prev.classList.add('inactive')}
    if (position >= innerElemWidth - sliderElemWidth) {next.classList.add('inactive')} else {next.classList.remove('inactive')}
    sliderContent.style.transform = `translateX(-${position}px)`
    // console.log(sliderContent.style.transform = `translateX(-${position}px)`)
    blurSiblings(false)
    const openRecord = document.querySelector('.record.open')
    if (openRecord) {closeRecord(openRecord)}
  }

  const slideToRight = () => {
    const [scrollWidth, sliderElemWidth, innerElemWidth] = getScrollWidth();
    const prev = nextBtn.parentElement.querySelector('.prev')
    const next = nextBtn.parentElement.querySelector('.next')
    if (position <= innerElemWidth - sliderElemWidth) {position -= scrollWidth}
    next.classList.remove('inactive')
    if (position <= 0) {
      position = 0
      prev.classList.add('inactive')
    } else {prev.classList.remove('inactive')}

    if (position === scrollWidth - innerElemWidth) {}
    sliderContent.style.transform = `translateX(-${position}px)`
    blurSiblings(false)
    // console.log(sliderContent.style.transform = `translateX(-${position}px)`)
    const openRecord = document.querySelector('.record.open')
    if (openRecord) {closeRecord(openRecord)}
  }
  

  // Slider controls
  const nextBtn = slider.querySelector(".next")
  const prevBtn = slider.querySelector(".prev")
  
  nextBtn.addEventListener('click', () => slideToLeft())
  prevBtn.addEventListener('click', () => slideToRight())

  // Slider Filter Function
  const scrollToYear = (year) => {
    let index = 0
    for (let slide of sliderElements) {
      index += 1
      let sliderElemWidth = slide.offsetWidth
      if (slide.getAttribute('data-year') === year) {
        position = (sliderElemWidth * index) - sliderElemWidth
        sliderContent.style.transform = `translateX(-${position}px)`
      }
    }
  }

  btnFifties.addEventListener('click', () => {if (position !== 0) {sliderContent.style.transform = `translateX(0)`}})
  btnSixties.addEventListener('click', () => scrollToYear("60"))
  btnSeventies.addEventListener('click', () => scrollToYear("70"))
  btnEighties.addEventListener('click', () => scrollToYear("80"))
  btnNineties.addEventListener('click', () => scrollToYear("90"))
  btnTousends.addEventListener('click', () => scrollToYear("00"))
  btnTens.addEventListener('click', () => scrollToYear("10"))

  // Sliding on touchdevices
  let touchstartX = 0
  let touchendX = 0
  let touchstartY = 0
  let touchendY = 0
  let position = 0

  const handleGesture = () => {
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

const filterLPBtn = document.getElementById('filterLp')
const filterCDBtn = document.getElementById('filterCd')
const sliderLP = document.getElementById('sliderLP')
const sliderCD = document.getElementById('sliderCD')
const recordsCDAni = sliderCD.querySelectorAll(".record")
const recordsLPAni = sliderLP.querySelectorAll(".record")
const subtitle = document.querySelector('.subtitle')

filterLPBtn.addEventListener('click', () => {
  sliderLP.style.display='block'
  sliderCD.style.display='none'
  recordsLPAni.forEach((cd) => {gsap.fromTo(cd, {opacity: 0, scale: .5}, {opacity: 1, scale: 1, duration: .7}, "<20%")})
  subtitle.textContent='Langspielplatten'
})
filterCDBtn.addEventListener('click', () => {
  sliderLP.style.display='none'
  sliderCD.style.display='block'
  recordsCDAni.forEach((lp) => {gsap.fromTo(lp, {opacity: 0, scale: .5}, {opacity: 1, scale: 1, duration: .7}, "<20%")})
  subtitle.textContent='CDs'
})

//Helper
const removeClassFromList = (list, className) => {
  for (let listElem of list) {
    listElem.classList.remove(className)
  }
}

// dropdown()
slider("career", ".slide", 0);
filterDropdown("career");
// terminScroller();

filterDropdown("work");

if (!isMobile && window.matchMedia("(min-width: 1024px)").matches) {
  slider("sliderLP", ".card", 0);
  slider("sliderCD", ".card", 0);
  recordInfo();
} else if (isMobile && window.matchMedia("(min-width: 768px)").matches) {
  slider("sliderLP", ".card", 22);
  slider("sliderCD", ".card", 22);
} else {
  slider("sliderLP", ".card", 0);
  slider("sliderCD", ".card", 0);
}