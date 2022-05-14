"use strict"

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
const dropdownFunc = () => {
  const menu = document.getElementById('nav').querySelector('.main-nav')
  const dropdown = menu.querySelector('.dropdown')
  const subnav = menu.querySelector('.sub-nav')
  const elements = subnav.querySelectorAll('li')
  
  dropdown.addEventListener('click', () => {
    subnav.classList.toggle("open")
    let allElemsHeight = elements[1].offsetHeight * elements.length
    dropdown.classList.toggle('open')
    subnav.style.height = subnav.classList.contains("open") ? allElemsHeight + "px" : "49px"
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
    console.log(innerElemWidth)
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