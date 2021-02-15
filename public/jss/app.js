console.log('client side javascript file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    console.log(location)

    fetch('http://127.0.0.1:3000/weather?address='+location).then((response) => {
        console.log(response)
    response.json().then((data)=>{
        console.log(data)
        if(data.error)
        {
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
        }
    }  ) 
})

    console.log('testing')
})