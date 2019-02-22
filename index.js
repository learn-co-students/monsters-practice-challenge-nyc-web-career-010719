document.addEventListener("DOMContentLoaded", function(event) {

  const monsterContainer = document.querySelector('#monster-container')
  const monsterCreator = document.querySelector('#create-monster')
  const forwardButton = document.querySelector('#forward')
  const backButton = document.querySelector('#back')
  let page = 1

  function renderPage(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(function(response) {
    return response.json()
      })
    .then(function(parsedResponse) {
      let monsterArray = parsedResponse
      renderMonsters(monsterArray)
    })
}
  renderPage(page)
  // runs function with default value set to 1

  monsterCreator.innerHTML = `
    <h2>Create Monster</h2>
      <form id="form">
        Name:<br>
        <input type="text" name="name" value="" id="name">
        <br>
        Age:<br>
        <input type="number" name="age" value="" id="age">
        <br>
        Description:<br>
        <input type="text" name="description" value="" id="description">
        <br>
        <input type="submit" value="Submit" id="submit">
      </form>
      `
      //form to create a monster at top of page

    const form = document.querySelector('#form')
    //grabs form to use later

    form.addEventListener("submit", function(e){

      e.preventDefault()
      console.log(e)

      let nameInput = document.querySelector('#name').value
      let ageInput = document.querySelector('#age').value
      let descriptionInput = document.querySelector('#description').value
      let data = {
        "name": nameInput,
        "age": ageInput,
        "description": descriptionInput
      }
      fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())

    window.alert("Monster Successfully Created")
    form.reset()
    })
    //event listener to store data collected from the form and add it to the database


    forwardButton.addEventListener("click", function(e){
      console.log("clicked forward!")
      page++
      monsterContainer.innerHTML = ""
      renderPage(page)
    })
    //forward button. increments page by 1, clears monsterContainer and pushes in next 50 monsters

    backButton.addEventListener("click", function(e){
      console.log("clicked back!")
      if (page > 1) {
      page--
      monsterContainer.innerHTML = ""
      renderPage(page)}
      else {
      window.alert("Ur already on page 1")
    }
    })
    //back button. subtracts page by 1, clears monsterContainer and pushes in last 50 monsters. gives alert if already on page 1

    function renderSingleMonster(monster) {
      monsterContainer.innerHTML += `
      <div>
        <h2>${monster.name}</h2>
          <h4>Age: ${monster.age}</h4>
            <p>Description: ${monster.description}</p>
      </div>
      `
    }

    function renderMonsters(arr) {
      arr.map(renderSingleMonster).join('')
    }
    //two helper functions to render monsters on page

console.log("DOM fully loaded and parsed");
});
