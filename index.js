// js code
"use strict";
function openModal() {
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
    document.getElementById('myModal').style.display = 'none';
  }
}

let users = [
  {
    name: "ali hanafi",
    number: "0545930714",
    email: "example@example.com"
  },
  {
    name: "bashar safieh",
    number: "0545930714",
    email: "example@example.com"
  },
  {
    name: "john cena",
    number: "0545930321",
    email: "example@example.com"
  },
  {
    name: "hanafi ali",
    number: "0545933432",
    email: "example@example.com"
  }
];

const list = document.querySelector(".list");

function addContact(contact, ind) {
  if (list.innerHTML === `<p> No contacts ! </p>`)
    list.innerHTML = ``;
  const li = document.createElement('li')
  li.classList.add("contact")
  li.innerHTML =
    `
    <div class="contact-info">
    <img src="img/contact.png" alt="">
    <p>${contact.name}</p>
    <p class="detail">${contact.number}</p>
    <p class="detail">${contact.email}</p>
    </div>
    <div class="contact-actions">
        <img onclick="popInfo(${ind})" src="img/info.png" alt="Error 404">
        <img  onclick="popEdit(${ind})" src="img/edit.png" alt="Error 404">
        <img onclick="dltContact(${ind})" src="img/delete.png" alt="Error 404">
    </div>
  `
  list.append(li);
}

function sortContacts(contacts) { // הפונקתיה מקבךת מערך 
  contacts.sort((a, b) => { // ממינת לפי התנאי הבא : עבור כל שני ערכים במערך בודקת וממינת
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return contacts; // שים לב הפונקציה "סורט" אכן בודקת ועוברת על כל המערך
}
sortContacts(users);
users.forEach((contact, ind) => addContact(contact, ind))


function popInfo(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <img src="img/contact.png" alt="Error 404">
    <p>Name: ${contact.name}</p><br
    <p>Number: ${contact.number}</p><br
    ${contact.email === "" ? "" : // if email is empty ("") ?. return empty (""). else : <P>...
                                 
      `
      <p>Email: ${contact.email}</p>
    
      `
    }
    
    `
    
}

function popEdit(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <form>
    <img src="img/contact.png" alt="Error 404">
    <label>Name: <input id="editName" type="text" value="${contact.name}"> </label>
    <label>Number: <input id="editNumber" type="number" value="${contact.number}"></label>
    <label>Email: <input id="editEmail" type="email" value="${contact.email}"></label>
    <input type="submit" id="saveBtn" onclick="saveEdit(event,${ind})" value="Save" ></input>
    </form>
  `
}

function dltAll() {
  let isOk = confirm("Are you sure?");
  if (isOk) {
    list.innerHTML =
      `
    <p id="inner">  No contacts ! </p>
    
    `
    users = [];
  }
}

function dltContact(ind) {
  let isOk = confirm("Are you sure?");
  if (isOk) {
    users = users.slice(0, ind).concat(users.slice(ind + 1))
    list.innerHTML = ``;
    users.forEach((contact, ind) => addContact(contact, ind))
    if (users.length === 0)
      list.innerHTML =
        `
        <p id="inner"> No contacts were added  </p>

        `
  }
}

function popAdd() {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  modalCont.innerHTML =
    `
    <img src="img/contact.png" alt="Error 404">
    <p>Name: <input id="addName" type="text" placeholder="name"> </p><br
    <p>Number: <input id="addNumber" type="number" placeholder="number"></p><br
    <p>Email: <input id="addEmail" type="email" placeholder="email"></p>
    <button id="saveBtn" onclick="saveNew()">Save</button>
  `
}


function saveNew() {
  let newName = document.querySelector("#addName").value; // getting the new values from the user input while adding new user (popAdd())
  let newNumber = document.querySelector("#addNumber").value;
  let newEmail = document.querySelector("#addEmail").value;

  if (newName === "" || newNumber === "") {
    alert("name or number can't be empty");
  } 
  else {
    if (newEmail !== "") {
      if (!checkEmail(newEmail)) {
        alert("Invalid Email Address");
        return;
      }
    }

    if(checkIfNewNumberExists(newNumber) === true){
      alert("Number Already Exists");
        return;
    }
    if(checkIfNewNameExists(newName) === true){
      alert("Name Already Exists");
        return;

    }
    
  }
    
    const newUser = { name: newName, number: newNumber, email: newEmail }; //building new user with new values 
    users.push(newUser); // adding the new user to the last in our array 
    list.innerHTML = ``; // after that we delete all users from our html
    sortContacts(users); // we sort them 
    users.forEach((contact, ind) => addContact(contact, ind)); // and readd them in the html again after sorting 
    document.getElementById('myModal').style.display = 'none'; // closing the popup 
  }



function saveEdit(event, ind) {
  event.preventDefault();
  let newName = document.querySelector("#editName").value;
  let newNumber = document.querySelector("#editNumber").value;
  let newEmail = document.querySelector("#editEmail").value;

  if (newName === "" || newNumber === "") {
    alert("name or number can't be empty");
  } 
  else {
    if (newEmail !== "") {
      if (!checkEmail(newEmail)) {
        alert("Invalid Email Address");
        return;
      }
    }
    if (checkEditNumber(newNumber,ind)){
        alert("Number Alreay Exists")
        return;
      }

    if(checkEditName(newName,ind)){
        alert("Name Alreay Exists")
        return;

      }
    }
    const newUser = { name: newName, number: newNumber, email: newEmail };
    users[ind] = newUser;
    list.innerHTML = ``;
    sortContacts(users);
    users.forEach((contact, ind) => addContact(contact, ind));
    document.getElementById('myModal').style.display = 'none';
  }


function searchContact(e) { // the event here is onkeyUp 
  list.innerHTML = ``;
  const filteredList = users.filter(user => { //filter is a method that gets an array and returns new array by the condition
      return user.name.toLowerCase().includes(e.target.value.toLowerCase()); // condition is returining names in lower case that includes the keyUp(e) value as alowercase 
    });
  list.innerHTML = ``; // deleting the html list 
  filteredList.forEach(user => { //rebuilding the list again after targeting the user we are looking for 
    addContact(user);
  })
}

list.addEventListener('mouseover', (event) => { //this method listen to mouseover event 
  if (event.target.tagName === 'LI') { // if the event tagname is a LI (list)
    event.target.style.fontWeight = 'bold'; //change style to bols
    event.target.style.backgroundColor = '#f7f7f7'; //change color to grey 
  }
});

list.addEventListener('mouseout', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.fontWeight = 'normal';
    event.target.style.backgroundColor = ''; // reset to default background color
  }
});

function checkEmail(email) {
  return email.includes('@') && email.includes('.');
}
function checkEditNumber(number,ind) {
  for (let i = 0; i < users.length; i++) {
    if (i !== ind && users[i].number === number) {
      return true;
    }
  }
  return false;
}

function checkIfNewNumberExists(number) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].number === number) {
      return true;
    }
  }
  return false;
}
function checkIfNewNameExists(name) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      return true;
    }
  }
  return false;
}
function checkEditName(name,id)
{
   for(let i=0; i< users.length ; i++)
   {
     if(users[i].name === name && id !== i)
       return true
   }
   return false;
   
}

function changeMode(){
  const body = document.body;
  body.classList.toggle('mode');

  const contacts = document.querySelector('.contacts');
  contacts.classList.toggle('mode');

  const darkmode = document.querySelector(".switch")
  darkmode.classList.toggle('switchOff');
}
// end of js code
