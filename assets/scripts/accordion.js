var accordions = document.getElementsByClassName("accordion");

// Accordion Click
for (let i = 0; i < accordions.length; i++) {

    accordions[i].addEventListener("click", function() {
        this.classList.toggle("active");
        disableAccordions(i);

        var panel = this.nextElementSibling; // get content box

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.padding = "0 2rem";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.padding = "2rem";
        } 
  });

}

// Accordion disable
function disableAccordions(exclusion) {
    for (let i = 0; i < accordions.length; i++) {
        if(i != exclusion){
    
            var panel = accordions[i].nextElementSibling; // get content box

            if (panel.style.maxHeight && accordions[i].classList.contains("active")) {
                accordions[i].classList.toggle("active");
                panel.style.maxHeight = null;
                panel.style.padding = "0 2rem";
            }
        }
    }
}