const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
  
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=>{
        if(data.error)
        {
            msg2.textContent = ''
            msg1.textContent = data.error
        }    
        else{
            msg1.textContent = ''
            msg2.textContent = data.Location + '  ' + data.Temperature + ' ' + data.Weather
        //console.log(data.Location + '  ' + data.Temperature + ' ' + data.Weather)
        }
    })
})
})