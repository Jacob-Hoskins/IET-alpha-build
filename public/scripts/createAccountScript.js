const adminBtn = document.getElementById('account-role-btn');
const userBtn = document.getElementById('employee-btn');
const formDiv = document.getElementById('create-account-admin-div')
const userFormDiv = document.getElementById('create-account-user-div')
const btnChoicesDiv = document.getElementById('employee-admin-btn-choice')
const closeBtn = document.getElementById('back-icon')
const iconFormDiv = document.getElementById('icon-form-div')
let current_url = new URL(document.URL.valueOf())
let params = new URLSearchParams(current_url.search);

// TODO: add url parameters about btn clicked to give users the right path for
// backend to fill out the proper document

adminBtn.addEventListener('click', () =>{
    formDiv.style.display = "block"
    iconFormDiv.style.display = 'flex'
    closeBtn.style.display = "block"
    btnChoicesDiv.style.display = "None"

    let new_url = `${document.URL}/owner`
    // window.history.replaceState("role", "owner", new_url)
    
})

userBtn.addEventListener('click', () =>{
    userFormDiv.style.display = "block"
    iconFormDiv.style.display = "flex"
    closeBtn.style.display = "block"
    btnChoicesDiv.style.display = "none"

    let new_url = `${document.URL}/employee`
    console.log(new_url)
    // window.history.replaceState("role", "employee", new_url)
})

closeBtn.addEventListener('click', ()=>{
    userFormDiv.style.display = "none"
    formDiv.style.display = "none"
    iconFormDiv.style.display = "none";
    closeBtn.style.display = "none"
    btnChoicesDiv.style.display = "flex"

    let new_url = document.URL
    // window.history.replaceState("role", "none", current_url)
})