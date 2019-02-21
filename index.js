// all of the global variables
const createMonsterDiv = document.querySelector("#create-monster")
const monsterContainer = document.querySelector("#monster-container")
const backBtn = document.querySelector("#back") // goes down a page
const fwdBtn = document.querySelector("#forward") // goes up a page
let monsters = []
let page = 1
// console.log(backBtn);

function renderPage(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(parsedData) {
    monsters = parsedData
    return getMonsters(monsters);
  });
}

renderPage(page)

// function that would render the monsters
const getMonsters = function (array) {
  array.forEach(function(element) {
    monsterContainer.innerHTML += `
    <div>
      <h2>${element.name}</h2>
      <h4>${element.age}</h4>
      <p>${element.description}</p>
    </div>`
  })
}


//creating the new monster form
createMonsterDiv.innerHTML = `
  <form id="monster-form">
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create Monster</button>
  </form>
`
// selecting monster form
const monsterForm = document.querySelector("#monster-form");

// add the submit event listener onto the monster form
monsterForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const name = monsterForm.querySelector("#name").value
  const age = monsterForm.querySelector("#age").value
  const description = monsterForm.querySelector("#description").value

  const data = {
    "name": name,
    "age": age,
    "description": description
  }

  fetch(`http://localhost:3000/monsters/`, {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())

  window.alert("New Monster Created")
  monsterForm.reset()
  // console.log("success! Reset the form");
}) // end of the add event listener on form submit

fwdBtn.addEventListener("click", function(event) {
  page += 1;
  monsterContainer.innerHTML = ""
  renderPage(page);
})

backBtn.addEventListener("click", function(event) {
  if (page === 1) {
    window.alert("NO MONSTERS HERE")
  } else {
    page -= 1
    monsterContainer.innerHTML = ""
    renderPage(page);
  }
})




// function showFiftyMonsters(allMonsters, page){
//   allMonsters.slice[0*page,1*page+49]
// }
