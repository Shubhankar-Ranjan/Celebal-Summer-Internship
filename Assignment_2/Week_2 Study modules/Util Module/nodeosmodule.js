var os = require('os');

// Endianness
console.log('Endianness : ' + os.endianness());

// OS type
console.log('Type : ' + os.type());

// OS platform
console.log('Platform : ' + os.platform());

// Total system memory
console.log('Total Memory : ' + os.totalmem() + ' bytes.');

// Total free memory
console.log('Free Memory : ' + os.freemem() + ' bytes.');