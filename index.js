const users = require('./contact');

const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      users.listContacts();
      break;

    case 'get':
      users.getContactById(id);
      break;

    case 'add':
      users.addContact(name, email, phone);
      break;

    case 'remove':
      users.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

