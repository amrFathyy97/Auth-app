const btn = document.querySelector(".user");
const ul = document.querySelector("ul");
const logout = document.querySelector(".logout button");



window.onload = async function(){
    const data = await fetch("http://localhost:3000");
    const res = await data.headers
    btn.style.cursor = "pointer";
    btn.textContent = res.get("user")
}


btn.onclick = function(){
    document.querySelector(".logout").classList.toggle("turn")
}



logout.addEventListener("click", async (e) => {
    const data = await fetch("http://localhost:3000/logout");
    window.location.href = "http://localhost:3000"
})