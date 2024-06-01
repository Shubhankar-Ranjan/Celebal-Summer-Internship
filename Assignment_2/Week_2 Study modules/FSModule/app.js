const fs = require('fs');

// Creating a file asynchronously
// fs.writeFile('data.txt', 'This is an example for creating file in node.js', (err) => {
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('File is created successfully');
// });
        
// fs.readFile('data.txt', 'utf8', (err, data) => {
//     if (err) {
//         throw new Error(err);
//     }
//     console.log(data);
// });



// Creating a file synchronously
try {
    fs.writeFileSync('data.txt', 'This is an example for creating file in node.js');   
    console.log('File is created successfully');
} catch (error) {
    console.log(error);   
}

try {
    const data = fs.readFileSync('data.txt', 'utf8');
    console.log(data);
} catch (e) {
    console.log(e);
}
