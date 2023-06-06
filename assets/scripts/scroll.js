// Elements
const HomeLink = document.getElementById("homeLink");
const aboutLink = document.getElementById("aboutLink");
const skillsLink = document.getElementById("skillsLink");
const educationLink = document.getElementById("educationLink");
const projectsLink = document.getElementById("projectsLink");
const contactLink = document.getElementById("contactLink");
const titlePortfolioPos = document.getElementById("title-portfolio").offsetTop;
const header = document.getElementById("header");

// Remove Scroll Style
function resetAll(){
    HomeLink.classList.remove("scroll-style");
    aboutLink.classList.remove("scroll-style");
    skillsLink.classList.remove("scroll-style");
    educationLink.classList.remove("scroll-style");
    projectsLink.classList.remove("scroll-style");
    contactLink.classList.remove("scroll-style");
}

// Scroll Event
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    const viewportHeight = window.innerHeight;

    // HEADER BAR Scroll Effect
    if(scroll > titlePortfolioPos){
        header.style.backgroundColor = "rgba(44, 29, 33, 0.7)";
    }else{
        header.style.backgroundColor = "rgba(44, 29, 33, 0.2)";
    }

    // HeaderBAR menu options Effect
    if(scroll >= 0 && scroll < viewportHeight){
        resetAll();
        HomeLink.classList.add("scroll-style");
    }else if(scroll >= viewportHeight && scroll < (viewportHeight*2)){
        resetAll();
        aboutLink.classList.add("scroll-style");

    }else if(scroll >= (viewportHeight*2) && scroll < (viewportHeight*3)){
        resetAll();
        skillsLink.classList.add("scroll-style");

    }else if(scroll >= (viewportHeight*3) && scroll < (viewportHeight*4)){
        resetAll();
        educationLink.classList.add("scroll-style");
        
    }else if(scroll >= (viewportHeight*4) && scroll < (viewportHeight*5)){
        resetAll();
        projectsLink.classList.add("scroll-style");

    }else if(scroll >= (viewportHeight*5)){
        resetAll();
        contactLink.classList.add("scroll-style");
    }
});