const startButton = document.getElementById("start-button")
const nameUser = document.querySelector("#nameUser")


nameUser.addEventListener("input", (e) => {
    if(e.target.value != "") {
        startButton.disabled = false
    } else {
        startButton.disabled = true
    }

})

startButton.addEventListener("click",()=>{
    localStorage.setItem("name", nameUser.value)
})



