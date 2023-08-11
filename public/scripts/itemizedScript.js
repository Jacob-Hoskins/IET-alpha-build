let add_btn = document.getElementById("add-btn");
let searchbar = document.getElementById("searchbar-input");
let search_btn = document.getElementById("search-btn");
let item_table = document.getElementById("item_table");
let delete_button = document.getElementById("del-btn");
let items_searching = document.getElementById("items-searching");
let job_info_div = document.getElementById("job-info-id");

// Number for id's on the buttons
let num = 1;

add_btn.addEventListener("click", () => {
  let input = searchbar.value;
  console.log(input);
  addItemToTable(input, num);

  num += 1;
});

search_btn.addEventListener("click", () => {
  submitList();
});

// TODO: update code from commented function to this one
function addItemToTable(input, num) {
  let del_btn_id = deleteButtonId();
  let item_div_id = itemDivId();

  // create elements
  let delete_button_el = document.createElement("button");
  let edit_button_el = document.createElement("button");

  const item_div = document.createElement("div");
  const item_element = document.createElement("p");
  const quantity_element = document.createElement("p");
  const single_price_element = document.createElement("p");
  const total_price_element = document.createElement("p");

  //update attributes
  delete_button_el.innerText = "Del";
  edit_button_el.innerText = "Edit";

  delete_button_el.setAttribute("id", del_btn_id);
  item_div.setAttribute("class", "item-row");
  item_div.setAttribute("id", item_div_id);

  item_element.innerText = input;
  quantity_element.innerText = 0;
  single_price_element.innerText = 0;
  total_price_element.innerText = 0;

  delete_button_el.setAttribute(
    "onclick",
    `deleteItemFromTable("${item_div_id}")`
  );
  edit_button_el.setAttribute("onclick", `editItemName("${item_div_id}")`);

  //append elements
  item_div.appendChild(item_element);
  item_div.appendChild(quantity_element);
  item_div.appendChild(single_price_element);
  item_div.appendChild(total_price_element);
  item_div.appendChild(delete_button_el);
  item_div.appendChild(edit_button_el);
  items_searching.appendChild(item_div);
}

// returns the ids for the delete button
function deleteButtonId() {
  const del_num = num - 1;
  const part_one = "del_btn_";
  const final_name = part_one + del_num;
  return final_name;
}

//returns ID for item row in table
function itemDivId() {
  const del_num = num - 1;
  const part_one = "item_div";
  const final_name = part_one + del_num;
  return final_name;
}

// If row === 0 add 1
function deleteItemFromTable(id) {
  let elm = document.getElementById(id);
  elm.remove();
}

// function to change button attributes
function buttonOnOff(id) {
  let btn_value = search_btn.firstChild.nodeValue;

  if (btn_value === "Add") {
    search_btn.innerText = "Update";
  }
  if (btn_value === "Update") {
    search_btn.innerText = "Add";
  }
}

function editItemName(id) {
  buttonOnOff(id);
  let ids_element = document.getElementById(id);
  console.log(ids_element.innerText);
}

function updateJobInfo() {
  let name_input_bar = document.createElement("input");
  let number_input_bar = document.createElement("input");

  job_info_div.appendChild(name_input_bar);
  job_info_div.appendChild(number_input_bar);
}
