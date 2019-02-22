
const monstersUrl = "http://localhost:3000/monsters"
const monsterContainer = document.querySelector("#monster-container")
const form = document.querySelector("#monster-form")

document.addEventListener('DOMContentLoaded',function(){
  let allMonsters = []
  function fetchMonsters(){
    fetch("http://localhost:3000/monsters")
    .then(function(response){
      return response.json()
    })
    .then(function(monstersArray){
      // console.log(monstersArray)
      monstersArray.forEach(monster => {
        // renderMonster(monster)
        allMonsters.push(monster)
      })
      console.log(allMonsters)
      showAllMonsters(allMonsters)
    })
  }

  form.addEventListener('submit',function(event){
    const monsterName = event.target.querySelector("#name").value
    const monsterAge = event.target.querySelector("#age").value
    const monsterDescription = event.target.querySelector("#description").value

    event.preventDefault()
    console.log(event)
    debugger
    fetch(monstersUrl, {
      method: "POST",
      node: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": monsterName,
        "age": monsterAge,
        "description": monsterDescription
      })
    })
    .then(function(r) {
		return r.json()
	  })
    .then(function(newMonsterObj) {
		console.log(newMonsterObj)
    debugger
		allMonsters.push(newMonsterObj)
		showAllPokemon(allPokemon)
	})
  })


  fetchMonsters()
})


function renderMonster(monster){
  monstersElement = document.createElement('div')
  monsterContainer.appendChild(monstersElement)
  monstersElement.innerHTML = `
  <h2>${monster.name}</h2>
  <h4>Age: ${monster.age}</h4>
  <p>Bio: ${monster.description}</p>
  `
}

function showAllMonsters(monsters){
  monsters.forEach(function(monster){
    renderMonster(monster)
  })
}
