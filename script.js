// 
const partyForm = document.querySelector("#partyForm")
const partyList = document.querySelector("#partyList")

// API URL
const COHORT = "2408-FTB-MT-WEB-PT";
const apiUrl = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}`;

const state = {
    eventList: []
}

async function fetchParties() {
    
    try {
        const response = await fetch(`${apiUrl}/events`);
        const jsonEvent = await response.json();
        state.eventList = jsonEvent.data;
        console.log(state.eventList);
    }
    catch (error) {
        console.error(error)
    }
    renderParties(state.eventList);
}
// getEvents();


// Fetch Catch from API
// async function fetchParties(){
   
//    try{ const response =  await fetch(`${apiUrl}/events`)
//     const data = await response.json(); // Using json
//     console.log(data)
//      // render to the dom
//      renderParties(data.data);
//     }
//     catch(error){
//     console.error(error)
//     }

// }
fetchParties()

function renderParties(events){
    
    const renderEvents = events.map(event => {
        const partyCard = document.createElement("div")
        partyCard.innerHTML = `<div id="${event.id}">
      <h2>${event.name}</h2>
      <p>${event.date}</p>
      <p>${event.description}</p>
      <p>${event.location}</p>
        <button class="delete" id="${event.id}">Delete</button>
       </div>`
       return partyCard;  
    })
 console.log(renderEvents);
//delete button
    partyList.replaceChildren(...renderEvents);
    document.querySelector(".delete").addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(e.currentTarget);
        deleteParty(e.currentTarget.id);
       })
    //    deleteParty();
    return renderEvents;
}



// add new party
async function addParty() {
    const name = document.querySelector("#name").value;
    // console.log(name.value)
    const dateTime = document.querySelector("#date").value;
    const date = new Date(dateTime).toISOString();
    const location = document.querySelector("#location").value;
    const description = document.querySelector("#description").value;
    const userInput = {
        name,
        location,
        date,
        description,
    }
    try {
        const response = await fetch(`${apiUrl}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInput) 
        })
        // const result = await response.json();
        return response;
    }
    catch(error){
console.error(error);
    }
}

// Delete Botton
const button = document.querySelector('#button');
    button.addEventListener('click',(e) => {
        e.preventDefault();
        addAndRender();
        // const response = addParty()// }
    });

    const addAndRender = async function(){
        const response = await addParty()
        if(response.ok){
            fetchParties();
    }}

    async function deleteParty(id) {
       try{
        const response = await fetch(`${apiUrl}/events/${id}`,{
            method: 'DELETE', 
        });

       }
       catch(error){
        console.error(error);
       } 
      
    }
       
    
