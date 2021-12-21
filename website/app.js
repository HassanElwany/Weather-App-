/* Global Variables */



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = '2f55541e6e78716b11fa6b2950014115'

const button = document.getElementById('generate')
button.addEventListener ("click", async()=> {
   // grab the value of zip and feelings inputs 
    const zipCode = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
    // catching the data and pars it
try {
    const res = await fetch(url)
  const data = await res.json()
  const temp = data.main.temp
  console.log (temp)

  await fetch ("/dataToSave", {
      method: "POST",
      headers: {
          "content-type": "application/json"
      },
      body:JSON.stringify({
          date: newDate,
          temp,
          feelings
      })

  })
  const result = await fetch ("/dataToGet")
  const theEnd = await result.json()
  // change the content of divs to show the data 

function performAction(e){
    document.getElementById('date').textContent =`Date: ${newDate}`
    document.getElementById('temp').textContent = `temperature: ${temp}`
    document.getElementById('content').textContent = `I feel ${feelings}`
}
performAction()

} catch(error) {
    console.log(error)
}
  
})



