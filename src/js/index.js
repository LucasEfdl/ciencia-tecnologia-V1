const startButton = document.getElementById("start-button")
const nameUser = document.querySelector("#nameUser")
const nameUserForm = document.querySelector("[data-nickname]")

nameUser.addEventListener("input", (e) => {
    if(e.target.value != "") {
        startButton.disabled = false
    } else {
        startButton.disabled = true
    }

})

startButton.addEventListener("click",()=>{
    nameUserForm.value = nameUser.value
    localStorage.setItem("name", nameUser.value)
})



