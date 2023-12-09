const createJobBtn = document.getElementById("create-job-btn")
let createJobFormDiv = document.getElementById("create-job-form-div")

createJobBtn.addEventListener("click", () =>{
    console.log("click");
    show_job_form()
})

function show_job_form(){
    createJobFormDiv.style.display = "block"
}