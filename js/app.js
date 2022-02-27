const playerInfo = document.getElementById('playersInfo')
const getInfoId = document.getElementById('details-info')
const getErr = document.getElementById('error')
const searchBoxInput = document.getElementById('search-box')

const searchPlayer = () =>{
   const getValue = searchBoxInput.value

   if(getValue === '' || isNaN(getValue) == false){
    getErr.innerText = 'Opps! No values match, try again'
    searchBoxInput.value = ''
    getInfoId.innerText = ''
    playerInfo.innerText = ''
   
   }else{
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${getValue}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayers(data.player))
 
    searchBoxInput.value = ''
    playerInfo.innerText = ''
    getInfoId.innerText = ''
    getErr.innerText = ''
   }
 

}

const displayPlayers = (players) =>{
    // console.log(players)
    if(players === null || players === ''){

       const h3 = document.createElement('h3')
       h3.classList.add('text-danger')
       h3.innerText = 'Opps!! Search result is not found 00000'
       getErr.appendChild(h3)
       playerInfo.innerText = ''
       getInfoId.innerText = ''


    }else{
        for(const player of players){
            // console.log(player)
            const div = document.createElement('div')
            div.classList.add('col-lg-6')
            div.innerHTML = `
                    <div id="deleteInfo" class="card">
                    <img src="${player.strThumb}" class="card-img-top" alt="players Images">
                    <div class="card-body">
                    <h5 class="card-title">${player.strPlayer}</h5>
                    <p class="card-text"></p>
    
                    <a href="#" onclick="details('${player.idPlayer}')" class="btn btn-warning">Details</a>
                    <a href="#" onclick="deletePlayer('${player.idPlayer}')" class="btn btn-danger">Delete</a>
                    </div>
                </div>
            `
            playerInfo.appendChild(div)
            getErr.innerText = ''       
        }
    }
    //  console.log(players)
  
   
}

const details = (id) => {
    console.log(id)
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`

    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.players[0]))

    getInfoId.innerText = ''
}

const displayDetails = (info) => {

    if(info.strGender == 'Male'){
        const div = document.createElement('div')
        div.innerHTML = `<div class="card p-2"><img src="images/m.jpg" class="w-50" alt="images"></div>`
        getInfoId.appendChild(div)
    }
    else{
        const div = document.createElement('div')
        div.innerHTML = `<img src="images/w.jpg" class="w-50 align-center " alt="images">`
        getInfoId.appendChild(div)
    }

    const div = document.createElement('div')
    div.innerHTML = `
        <div  class="card text-center p-5">
            <img src="${info.strThumb}"  alt="">
            <h1>Name:${info.strPlayer} </h1>
            <h3>Nationality:${info.strNationality} </h3>
            <h3>Gender:${info.strGender} </h3>
            <h3>Hight:${info.strHeight} </h3>
            <h3>Position: ${info.strPosition}</h3>
            <p>Details:${info.strDescriptionIT} </p>
        </div>
    `
    getInfoId.appendChild(div)

}

const deletePlayer = (id) => {
    console.log(id)
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`

    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => deletePlayerInfo(data.players))

    getInfoId.innerText = ''

}

const deletePlayerInfo = (deleteInfo) =>{
        console.log(deleteInfo.idPlayer)
    const deletePlayerDiv = document.getElementById('deleteInfo')
    console.log(deletePlayerDiv)
    deletePlayerDiv.remove()
    
}