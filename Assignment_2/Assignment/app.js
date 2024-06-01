/*
    How to run this file?

    TO,
        1. Create a file: npm run create (OR) node app.js create <filename> <content>
        2. Read a file: npm run read (OR) node app.js read <filename>
        3. Delete a file: npm run delete (OR) node app.js delete <filename> 
*/

const fs = require('fs');
const path = require('path');

const createFile = (filePath, content) => {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('File created');
};

const readFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(data);
};

const deleteFile = (filePath) => {
    fs.unlinkSync(filePath);
    console.log('File deleted');
};

const main = () => {
    const args = process.argv.slice(2);
    const command = args[0];
    const filePath = path.join(__dirname, args[1]);
    const content = args.slice(2).join(' ') || '';

    switch (command) {
        case 'create':
            createFile(filePath, content);
            break;
        case 'read':
            readFile(filePath);
            break;
        case 'delete':
            deleteFile(filePath);
            break;
        default:
            console.log('Unknown command. Use create, read, or delete.');
    }
};

main();
