document.addEventListener("DOMContentLoaded", function() {
  const createMon = document.querySelector('#create-monster')
  const monContainer = document.querySelector('#monster-container')
  getForm()
  const submitBtn = document.querySelector('#submit')
  const backBtn = document.querySelector('#back')
  const forwardBtn = document.querySelector('#forward')
  let page = 1

  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(function(promData) {
      return promData.json()
    })
    .then(function(parseJSON){
      let monsters = parseJSON
      monContainer.innerHTML = ""
      monsters.forEach(oneMonster)
    })

  submitBtn.addEventListener("click", function(e){
    e.preventDefault()
    let inpName= document.querySelector('#name').value
    let inpAge= document.querySelector('#age').value
    let inpDesc= document.querySelector('#desc').value
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${inpName}`,
        "age": `${inpAge}`,
        "description": `${inpDesc}`
      })
    })
    .then(function(promData) {
      return promData.json()
    })
  })

  backBtn.addEventListener("click", function(e){
    if (page != 1) {
      page --
      monContainer.innerHTML = ""
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(function(promData) {
          return promData.json()
        })
        .then(function(parseJSON){
          let monsters = parseJSON
          monContainer.innerHTML = ""
          monsters.forEach(oneMonster)
        })
    }
  })

  forwardBtn.addEventListener("click", function(e){
      page ++
      monContainer.innerHTML = ""
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(function(promData) {
          return promData.json()
        })
        .then(function(parseJSON){
          let monsters = parseJSON
          monContainer.innerHTML = ""
          monsters.forEach(oneMonster)
        })
  })

}) // end of DOMContentLoaded


function getForm() {
  const createMon = document.querySelector('#create-monster')
  createMon.innerHTML = `
  <form>
    <input id="name" type="text" name="name" placeholder="name">
    <input id="age" type="number" name="age" placeholder="age">
    <input id="desc" type="text" name="description" placeholder="description">
    <input id= "submit" type="submit" >
  </form>
  `
}


function oneMonster(monster) {
  const monContainer = document.querySelector('#monster-container')
  monContainer.innerHTML += `
  <h2> ${monster.name} </h2
  <h4>Age: ${monster.age}</h4>
  <p>Bio: ${monster.description}</p>
  `
}
