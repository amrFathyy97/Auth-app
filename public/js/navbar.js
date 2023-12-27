const btn = document.querySelector(".user");
const logout = document.querySelector(".logout");

const logout_btn = document.querySelector(".logout_btn") 



window.onload = async function(){
    const data = await fetch("http://localhost:3000/", {
        method: "GET",
        
    });
    const res = await data.headers
    btn.style.cursor = "pointer";
    btn.textContent = res.get("user").toUpperCase()
    
}


btn.onclick = function(){
    if(btn.textContent !== "Sign in"){
        logout.classList.toggle("expand")
    }
}



logout_btn.addEventListener("click", async () => {
    console.log("first")
    const data = await fetch("http://localhost:3000/logout", {
        mode: "no-cors"
    });
    window.location.href = "http://localhost:3000/"

})

