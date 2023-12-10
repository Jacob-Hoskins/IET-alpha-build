const scope_of_work_btn = document.getElementById("work-page-edit-btn-scope");
const scope_of_work_input_div = document.getElementById("scope-of-work-interaction-div");
const addNotesBtn = document.getElementById("addNotesBtn")
const addNotesFormDiv = document.getElementById("notes-interaction-div")

scope_of_work_btn.addEventListener("click", () =>{
    console.log("Clicked")
    scope_of_work_input_div.style.display = "flex";
});

addNotesBtn.addEventListener('click', () =>{
    addNotesFormDiv.style.display = "block"
    console.log("clicked")
})