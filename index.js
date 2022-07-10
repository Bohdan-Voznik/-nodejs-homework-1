const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const resultList = await contacts.listContacts();
      console.table(resultList);
      break;

    case "get":
      const resultGet = await contacts.getContactById(id);
      console.log(resultGet);
      break;

    case "add":
      const resultAdd = await contacts.addContact(name, email, phone);
      console.log(resultAdd);
      break;

    case "remove":
      const resultRemove = await contacts.removeContact(id);
      console.log(resultRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
