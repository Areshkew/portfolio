const projectsContainer = document.getElementById("projects__links");

// fetch Projects
async function fetchProjects() {
    try {
      const response = await fetch("assets/documents/projects.json");

      if (!response.ok) {
        throw new Error("Unable to fetch data from the JSON file.");
      }

      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
}

// DOM
function generateID(projectID){
    return "modal" + projectID;
}

function createModal(project, ModalID){
    // Modal
    const ModalHTML = `
    <button class="modal__activator"
      onclick="window.${ModalID}.showModal()" id="btn${ModalID}"
      style="--test: '${project.name}';">
      
      <img src="${project.thumbnail}" width="200" height="200">

    </button>

    <dialog class="projects__modal" id="${ModalID}">
        <div class="modal__header">
            <div>${project.name}</div>
            <button onclick="window.${ModalID}.close()">x</button>
        </div>
        
        <div class="modal__carousel" id="${ModalID}_carousel">
            <div id="${ModalID}_left"> < </div>
            <div id="${ModalID}_right"> > </div>
        </div>

        <div class="modal__repo">
          <div> <a href="${project.repoLink}" class="${project.privacy} repo_link" target="_blank"></a> </div>
          <div class="repo_stack">${project.stack}</div>
        </div>

        <div class="modal__info">
            ${project.description}
        </div>
    </dialog>
    `;

    projectsContainer.insertAdjacentHTML("beforeend", ModalHTML);
}

function createCarousel(project, ModalID) {
  // Carousel
  const carousel = document.getElementById(ModalID+"_carousel");
  const left_btn = document.getElementById(ModalID+"_left");
  const right_btn = document.getElementById(ModalID+"_right");
  const pictures = project.screenshots;
  
  // Set first photo
  carousel.style.backgroundImage = `url('${pictures.at(0)}')`;
  
  // Click Actions
  var picIt = 0;
  carousel.addEventListener('click', (e) => {
    if(e.target === right_btn)
      picIt = (picIt + 1) % pictures.length;
    else if(e.target === left_btn && picIt > 0)
      picIt--;
    else
      picIt = pictures.length - 1;
    
    console.log(picIt)
    carousel.style.backgroundImage = `url('${pictures.at(picIt)}')`;
  });

  // Disable buttons if there are 1 or less pictures 
  if(pictures.length <= 1){
    left_btn.style.display = "none";
    right_btn.style.display = "none";
  }
}

// Fetch Projects Promise Solving
fetchProjects().then((projects) => {
    
    projects.forEach(project => {
        const ModalID = generateID(project.id);
        
        createModal(project, ModalID);
        createCarousel(project, ModalID);

    });

})
.catch((e) => console.log(e));
