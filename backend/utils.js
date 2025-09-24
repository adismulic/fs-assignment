const fs = require('fs');

// Read sample data from a text file
function readSampleData(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    return lines;
}

module.exports = { readSampleData };
