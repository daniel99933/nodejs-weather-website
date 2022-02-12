const weatherForm = document.querySelector("#weatherForm")
const $searchByLocation = document.querySelector("#searchByLocation")
const search = document.querySelector("input")
const message1 = document.querySelector("#msg1")
const message2 = document.querySelector("#msg2")



weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value
    
    message1.textContent = "Loading..."
    message2.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})

$searchByLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your broswer!")
    }

    navigator.geolocation.getCurrentPosition((location) => {
        message1.textContent = "Loading..."
        message2.textContent = ""

        fetch(`/weather?coord=${location.coords.latitude},${location.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                }
            })
        })  
    })
})
