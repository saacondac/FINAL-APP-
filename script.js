const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");
const emailInput = document.getElementById("email-input");
const groupInput = document.getElementById("group-input");
const listContainer = document.getElementById("list-container");
const totalContacts = document.getElementById("total-contacts");
const contactSelect = document.getElementById("contact-select");
const groupSelectInput = document.getElementById("group-select-input");
const searchInput = document.getElementById("search-input");

const contacts = [];

function addContact() {
    if (nameInput.value === '' || numberInput.value === '' || emailInput.value === '') {
        alert("You must fill all the fields!");
    } else {
        let contact = {
            name: nameInput.value,
            number: numberInput.value,
            email: emailInput.value,
            group: groupInput.value || 'No Group'
        };
        contacts.push(contact);
        updateContactList();
        nameInput.value = '';
        numberInput.value = '';
        emailInput.value = '';
        groupInput.value = '';
    }
}

function removeContact(button) {
    const li = button.parentElement;
    const contactName = li.textContent.split(',')[0].split(': ')[1];

    contacts.splice(contacts.findIndex(c => c.name === contactName), 1);
    contactSelect.querySelector(`option[value="${contactName}"]`).remove();
    li.remove();
    updateTotalContacts();
}

function updateTotalContacts() {
    totalContacts.textContent = listContainer.children.length;
}

function addToGroup() {
    const selectedContactName = contactSelect.value;
    const newGroup = groupSelectInput.value;

    const contact = contacts.find(c => c.name === selectedContactName);
    if (contact) {
        contact.group = newGroup || 'No Group';
        updateContactList();
    }
}

function removeFromGroup() {
    const selectedContactName = contactSelect.value;
    
    const contact = contacts.find(c => c.name === selectedContactName);
    if (contact) {
        contact.group = 'No Group';
        updateContactList();
    }
}

function updateContactList() {
    listContainer.innerHTML = '';
    contacts.forEach(contact => {
        let li = document.createElement("li");
        li.innerHTML = `Name: ${contact.name}, Number: ${contact.number}, Email: ${contact.email}, Group: ${contact.group} <button onclick="removeContact(this)">Remove</button>`;
        listContainer.appendChild(li);
    });
    updateTotalContacts();
    updateContactSelect();
}

function updateContactSelect() {
    contactSelect.innerHTML = '<option value="">Select a contact</option>';
    contacts.forEach(contact => {
        let option = document.createElement("option");
        option.value = contact.name;
        option.text = contact.name;
        contactSelect.appendChild(option);
    });
}

function searchContacts() {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchQuery));
    listContainer.innerHTML = '';
    filteredContacts.forEach(contact => {
        let li = document.createElement("li");
        li.innerHTML = `Name: ${contact.name}, Number: ${contact.number}, Email: ${contact.email}, Group: ${contact.group} <button onclick="removeContact(this)">Remove</button>`;
        listContainer.appendChild(li);
    });
}

searchInput.addEventListener('input', searchContacts);


