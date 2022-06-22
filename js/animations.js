"use strict"
gsap.registerPlugin(ScrollTrigger);

const menu = document.getElementById('nav').querySelector('.main-nav')
const menuPoints = menu.querySelectorAll('.main-nav-point')
const recordsAni = document.querySelectorAll(".record")
const slides = document.querySelectorAll(".slide")
const termin = document.getElementById('termine')
const termine = termin.querySelectorAll('.scroll-content > *')
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
slides.forEach((slide) => {careerTl.fromTo(slide, {opacity: 0, y: 60}, {opacity: 1, y: 0, duration: .75, ease: "back.in"}, "<20%")}, "<60%")

//Live
const liveTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#live",
    start: "-10% 50%"
  },
  duration: .5,
  ease: "back.out"
})
liveTl.fromTo('#live .head .line', {x: "100%"}, {x: 0, duration: 1, ease: "back.in"}, "<10%")
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
recordsTl.fromTo('#work .filter', {opacity: 0, x: 30}, {opacity: 1, x: 0, duration: .75, ease: "back.out"}, "<20%")
recordsAni.forEach((record) => {recordsTl.fromTo(record, {opacity: 0, scale: .5}, {opacity: 1, scale: 1, duration: .7}, "<20%")})

const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#contact",
    start: "-50%"
  },
})

contactTl.fromTo('#contact .head .line', {x: "-100%"}, {x: 0, duration: 1, ease: "back.in"})
contactTl.fromTo('#contact .head h2', {opacity: 0, x: -70}, {opacity: 1, x: 0, duration: .75, ease: "back.out"})
contactInfo.forEach((contacts) => {contactTl.fromTo(contacts, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: .75, ease: "back.out"}, "<20%")})