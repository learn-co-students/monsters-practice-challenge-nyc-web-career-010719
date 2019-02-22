document.addEventListener("DOMContentLoaded", function(event) {
  const monsterContainer = document.querySelector('#monster-container')
  const monsterCreator = document.querySelector('#create-monster')
  let allMonsters = []
  let page = 1

  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(function(response) {
    return response.json()
      })
    .then(function(parsedResponse) {
      allMonsters = parsedResponse.slice(0, 50)
      showAllMonsters(allMonsters)
    })

    monsterCreator.innerHTML += `
      <h2>Create Monster</h2>
        <form id="form">
          Name:<br>
            <input type="text" name="name" value="" id="name"><br>
          Age:<br>
            <input type="number" name="age" value="" id="age"><br>
          Description:<br>
            <input type="text" name="description" value="" id="description"><br>
            <input type="submit" value="Submit" id="submit">
        </form>`

    const form = document.querySelector('#form')
    form.addEventListener("submit", function(e){
      e.preventDefault()
      let nameInput = document.querySelector('#name').value
      let ageInput = document.querySelector('#age').value
      let descriptionInput = document.querySelector('#description').value
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
    			"name": nameInput,
    			"sprites": ageInput,
    			"description": descriptionInput
    		})
      })
       .then(function(response) {
       return response.json()
     }) .then (function (data){
       allMonsters.push(data)
       showAllMonsters(allMonsters)
     })
    })

console.log("DOM fully loaded and parsed");
});

function showAllMonsters(monsters){
  const monsterContainer = document.querySelector('#monster-container')
  monsterContainer.innerHTML += monsters.map(renderSingleMonster).join('')

}

function renderSingleMonster(monster){
  return `
    <div>
      <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
          <p>Description: ${monster.description}</p>
    </div>
    `

}


//
// const monsterContainer = document.querySelector('#monster-container')
// const monsterCreator = document.querySelector('#create-monster')
// const backBtn = document.querySelector('#back')
// const forwardBtn = document.querySelector('#forward')
// let allMonsters = []
//
// let page = 1
//
// monsterCreator.innerHTML = `
//   <h2>Create Monster</h2>
//     <form id="form">
//       Name:<br>
//       <input type="text" name="name" value="" id="name">
//       <br>
//       Age:<br>
//       <input type="number" name="age" value="" id="age">
//       <br>
//       Description:<br>
//       <input type="text" name="description" value="" id="description">
//       <br>
//       <input type="submit" value="Submit" id="submit">
//     </form>
//     `
// const form = document.querySelector('#form')
// form.addEventListener("submit", function(e){
//   e.preventDefault()
//   let nameInput = document.querySelector('#name').value
//   let ageInput = document.querySelector('#age').value
//   let descriptionInput = document.querySelector('#description').value
//     fetch('http://localhost:3000/monsters', {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//       },
//       body: JSON.stringify({
//   			"name": nameInput,
//   			"sprites": ageInput,
//   			"description": descriptionInput
//   		})
//     })
//      .then(function(response) {
//      return response.json()
//
//    }).then(function(data){
//     let monsterObj = data
//     // console.log(allMonsters)
//     // allMonsters.push(monsterObj)
//     renderSingleMonster(monsterObj)
//     // let monsterArray = Object.keys(monster)
//     // console.log(monsterArray)
//     // monsterContainer.innerHTML = ""
//     // monsterArray.forEach(renderSingleMonster)
//
//     })
// })
//
// fetch('http://localhost:3000/monsters')
//   .then(function(response) {
//   return response.json()
//     })
//   .then(function(parsedResponse) {
//     let allMonsters = parsedResponse.slice(0, 50)
//     monsterContainer.innerHTML = ""
//     allMonsters.forEach(renderSingleMonster)
//     // console.log(allMonsters)
//   })
//
// function renderSingleMonster(monster){
//   // console.log(monster)
//   monsterContainer.innerHTML += `
//     <div>
//       <h2>${monster.name}</h2>
//         <h4>Age: ${monster.age}</h4>
//           <p>Description: ${monster.description}</p>
//     </div>
//     `
// }
//
// backBtn.addEventListener("click", function(e){
//   if (page != 1) {
//     page --
//     monsterContainer.innerHTML = ""
//     fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
//       .then(function(promData) {
//         return promData.json()
//       })
//       .then(function(parseJSON){
//         let monsters = parseJSON
//         monsterContainer.innerHTML = ""
//         monsters.forEach(renderSingleMonster)
//       })
//   }
// })
//
// forwardBtn.addEventListener("click", function(e){
//     page ++
//     monsterContainer.innerHTML = ""
//     fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
//       .then(function(promData) {
//         return promData.json()
//       })
//       .then(function(parseJSON){
//         let monsters = parseJSON
//         monsterContainer.innerHTML = ""
//         monsters.forEach(renderSingleMonster)
//       })
// })
