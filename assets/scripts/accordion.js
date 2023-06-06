var accordions = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < accordions.length; i++) {

    accordions[i].addEventListener("click", function() {
        this.classList.toggle("active");

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