const scope_of_work_btn = document.getElementById("work-page-edit-btn-scope");
const scope_of_work_input_div = document.getElementById("scope-of-work-interaction-div");
const scope_of_work_close_btn = document.getElementById("work-page-close-btn-scope")
const addNotesBtn = document.getElementById("addNotesBtn")
const notes_close_btn = document.getElementById("work-page-close-btn-notes")
const addNotesFormDiv = document.getElementById("notes-interaction-div")

scope_of_work_btn.addEventListener("click", () =>{
    console.log("Clicked")
    scope_of_work_input_div.style.display = "flex";
    scope_of_work_btn.style.display = "none"
    scope_of_work_close_btn.style.display = "block"
});

scope_of_work_close_btn.addEventListener("click", () =>{
    scope_of_work_input_div.style.display = "none"
    scope_of_work_btn.style.display = "block"
    scope_of_work_close_btn.style.display = "none"
})

addNotesBtn.addEventListener('click', () =>{
    addNotesFormDiv.style.display = "block"
    addNotesBtn.style.display = "none"
    notes_close_btn.style.display = "block"
})

notes_close_btn.addEventListener('click', () =>{
    addNotesFormDiv.style.display = "none"
    addNotesBtn.style.display = "block"
    notes_close_btn.style.display = "none"
})