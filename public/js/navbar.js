const btn = document.querySelector(".user");
const ul = document.querySelector("ul");
const logout = document.querySelector(".btn");



window.onload = async function(){
    const data = await fetch("http://localhost:3000/", {
        method: "GET",
        
    });
    const res = await data.headers
    btn.style.cursor = "pointer";
    btn.textContent = res.get("user")
}


btn.onclick = function(){
    document.querySelector(".logout").classList.toggle("turn")
}



logout.addEventListener("click", async () => {
    const data = await fetch("http://localhost:3000/logout", {
        mode: "no-cors"
    });
})

logout.addEventListener("click", () => {
    window.location.href = "http://localhost:3000/"
})