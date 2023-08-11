const new_estimate_btn = document.getElementById("add-estimate-btn");
let page_div = document.getElementById("estimate-modal-page-div");
let modal_div_id = document.getElementById("modal-main-background");
let modal_div = document.getElementsByClassName("modal-main-background");
let close_modal_btn = document.getElementById("close-modal");

new_estimate_btn.addEventListener("click", () => {
  modal_div_id.style.display = "block";
});

close_modal_btn.addEventListener("click", () => {
  modal_div_id.style.display = "none";
});
