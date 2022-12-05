// Your code here
const form = document.querySelector("#votes-form")
const input = document.createElement("input")
input.type = "hidden"
input.className = "inputs"
form.appendChild(input)
const votes = document.querySelector("#vote-count");

fetch("http://localhost:3000/characters")
  .then((res) => res.json())

  .then(function (characters) {
    console.log(characters);

    characters.map(function (character) {
      let upperDiv = document.getElementById("character-bar");

      // upperDiv.innerHTML += `<h2 class = "namee"><span id = "character-bar" >${character.name}</span></h2>`

      const name = document.createElement("h2");

      name.className = "namee";

      name.innerHTML = `<span id = "character-bar" >${character.name}</span>`;

      upperDiv.appendChild(name);

      name.addEventListener("click", dropDown);

      function dropDown() {
        let namess = document.querySelector("#name");
        let imgs = document.querySelector("#image");

        

        namess.textContent = character.name;
        imgs.src = character.image;
        votes.textContent = character.votes;

        
        input.id = character.id
      }

      
    });
  });

 

  form.addEventListener("submit", formSubmit)

  function formSubmit(e){
    e.preventDefault()

    
    const id = document.querySelector(".inputs").id
    let votesNum = document.querySelector("#vote-count").textContent;
    let voteCount = document.querySelector("#votes").value
    votesNum = parseInt(votesNum,10)
    voteCount = parseInt(voteCount,10)||0

    voteCount = voteCount + votesNum



    fetch(`http://localhost:3000/characters/${id}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
            
          },
          body: JSON.stringify({votes:voteCount})
    }).then(res => res.json()).then(character => votes.textContent = character.votes )
    e.reset()

    
  }

  const resetButton = document.querySelector("#reset-btn")

resetButton.addEventListener("click", function(e){
   e.preventDefault()
    
   document.getElementById("vote-count").textContent = 0;

   fetch(`http://localhost:3000/characters/${id}`,{
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify({votes})
}).then(res => res.json()).then(character => votes.textContent = character.votes )
e.reset()

   
 })
   
