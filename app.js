// CACHING THE DOM
const showModal = document.getElementById('modal-btn');
const newListParent = document.getElementById('new-item');
const closeModal = document.getElementById('dismiss-modal');
const addTask = document.getElementById('add-task');
const simpleModal = document.getElementById('simpleModal');
const inputTask = document.getElementById('input-task');
const inputTime = document.getElementById('input-time');
const emptyState = document.querySelector('.empty-state');
const taskCounter = document.querySelector('.counter');
const currentDate = document.querySelector('.title');
const removeItem = document.querySelector('.icon');


// EVENT LISTENERS
showModal.addEventListener('click', displayModal);
closeModal.addEventListener('click', closeModalWindow);
addTask.addEventListener('click', validation);
currentDate.addEventListener('load', displayDate);
window.onload = displayDate();
window.addEventListener('click', clickOutsideModal);
newListParent.addEventListener('click', removeListItem);

// FUNCTIONS //

// DISPLAY MODAL
function displayModal() {
    simpleModal.style.display = 'initial';
    inputTask.value = '';
    inputTime.value = '';
}

// ADD ITEM
function addItem() {
    // CREATE PARENT DIV
    const newItem = document.createElement('div');
    newItem.className += 'grid list margin';
    

    // CREATE CHILDREN
    const listItem = document.createElement('p');
    listItem.className += 'list-item';

    const hour = document.createElement('p');
    hour.className += 'hour';

    // ADD INPUT VALUE TO DOM
    listItem.innerHTML = inputTask.value;
    hour.innerHTML = inputTime.value;

    // APPENC CHILDREN TO PARENT DIV
    newItem.appendChild(listItem);
    newItem.appendChild(hour);

    // DISPLAY ITEM IN DOM
    newListParent.appendChild(newItem);

    // REMOVE EMPTY STATE
    emptyState.style.display = 'none';

    // DISMISS MODAL
    simpleModal.style.display = 'none';

    // CREATE OVERLAY PARENT ELEMENT
    const overlay = document.createElement('div');
    overlay.className += 'overlay';

    // CREATE 'a' tag inside OVERLAY and append it to its parent
    const deleteBtn = document.createElement('a');
    deleteBtn.className += 'icon';
    deleteBtn.setAttribute('href', '#');
    overlay.appendChild(deleteBtn);

    // CREATE ICON INSIDE THE A TAG AND APPEND IT
    const deleteIcon = document.createElement('i');
    deleteIcon.className += 'fa fa-trash';
    deleteBtn.appendChild(deleteIcon);
    newItem.appendChild(overlay);

    countAdd();
}

// VALIDATION
function validation() {
    // VALIDATION
    if(inputTask.value === '' && inputTime.value === '' || inputTask.value === '' || inputTime.value === '') {
        alert('Please complete both fields');
    } else {
        addItem();
    };
}

// CLOSE MODAL
function closeModalWindow() {
    simpleModal.style.display = 'none';
}

// CLOSE MODAL BY CLICKING OUTSIDE THE MODAL WINDOW
function clickOutsideModal(e) {
    if(e.target === simpleModal) {
        simpleModal.style.display = 'none';
    }
}

// DELETE TASK FROM LIST
function removeListItem(e) {
    if(e.target.classList.contains('fa')) {
        let task = e.target.parentElement.parentElement.parentElement;
        task.remove();
    };
    
    countSubtract();

    // RETURN EMPTY STATE IF COUNTER IS AT 0
    if(taskCounter.innerHTML === '0') {
        emptyState.style.display = 'block';
    }
}


// TASK COUNTER - ADD
function countAdd() {
    taskCounter.innerHTML++;
}

// TASK COUNTER - SUBTRACT
function countSubtract() {
    taskCounter.innerHTML--;
}


// DISPLAY CURRENT DATE ON PAGE LOAD
function displayDate() {
    let date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    date = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    currentDate.innerHTML += `<br /> ${date}`;
}