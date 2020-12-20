const fs = require('fs');
const path = require('path');
const contactsPath = path.resolve('./db/contact.json');


function listContacts() {

    fs.readFile(contactsPath, 'utf-8', (err, data) => {

        if (err) {
            return console.log(err);
        }

        const users = JSON.parse(data);
        console.table(users);

    });

};


function getContactById(contactId) {

    fs.readFile(contactsPath, 'utf-8', (err, data) => {

        if (err) {
            return console.log(err);
        }

        const users = JSON.parse(data);

        users.filter(user => {
            
            if (user.id === contactId) {
                console.table(`User with ID ${contactId}: name ${user.name}, phone number ${user.phone}, email ${user.email}`);
                return;
            }

        });

    });

};


function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
        if (error) {
            return console.log(error);
        }

        const contacts = JSON.parse(data);
        const newContact = contacts.filter(contact => contact.id !== contactId);

        if (newContact.length === contacts.length) {
            console.log(
                `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`,
            );
            return;
        }

        console.log('Contact deleted successfully! New list of contacts: ');
        console.table(newContact);

        fs.writeFile(contactsPath, JSON.stringify(newContact), error => {
            if (error) {
                return console.log('error :', error);
            }
        });
    });
};


function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
        if (error) {
            return console.log(error);
        }

        const contacts = JSON.parse(data);

        contacts.push({
            id: contacts.length + 1,
            name: name,
            email: email,
            phone: phone,
        });

        console.log('Contacts added successfully! New lists of contacts: ');
        console.table(contacts);

        fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
            if (error) {
                return console.log(error);
            }
        });
    });
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};