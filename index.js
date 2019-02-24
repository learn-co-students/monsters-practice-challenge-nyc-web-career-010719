const newMonsterForm = document.querySelector('#monster-form')
const forwardPageBtn = document.querySelector("#forward")
const backPageBtn = document.querySelector("#back")

document.addEventListener("DOMContentLoaded", () => {
  fetchMonsters()

  newMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    createMonster();
  })


  var page = 1
  forwardPageBtn.addEventListener("click", function() {
    // console.log(page)
    if (monsters.length === 50) {
      page++
      fetchMonsters(page)
    }
  })
  backPageBtn.addEventListener("click", function() {
    // console.log(page)
    if (page > 1) {
      page--
      fetchMonsters(page)
    }
  })

}) //END OF DOMContentLoaded

function allMonsters(monsters) {
  const monsterContainer = document.querySelector('#monster-container');
  monsterContainer.innerHTML = "";
  monsters.forEach(renderMonster);
}

function renderMonster(monster) {
  const monsterContainer = document.querySelector('#monster-container');
  monsterContainer.innerHTML += `<div>
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>Bio: ${monster.description}</p>
      </div>`;
}

//localhost:3000/monsters/?_limit=20&_page=3
function fetchMonsters(page) {
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then(function(response){
  return response.json();
})
  .then ( (data) => {
    monsters = data
    allMonsters(data)
  })
  // page++
} //ends fetchMonsters function

function createMonster () {
  const monsterName = newMonsterForm.querySelector('#name').value
  const monsterAge = newMonsterForm.querySelector('#age').value
  const monsterBio = newMonsterForm.querySelector('#description').value
  // debugger
  fetch("http:localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "aaplication/json"
    },
    body: JSON.stringify ({
      "name": `${monsterName}`,
      "age" : `${monsterAge}`,
      "description": `${monsterBio}`
    })
  })
  const monsterContainer = document.querySelector("#monster-container");
  monsterContainer.innerHTML = "";
  fetchMonsters()
} //end of create monster function
