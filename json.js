const fs = require('fs');

fs.readFile('song.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file, ', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const dataArray = Object.entries(jsonData);

        for (let key in dataArray) {
            console.log(dataArray[key][0] + " : ", dataArray[key][1]);
        }
        
    } catch (parseError) {
        console.error("Error parsing JSON, ", parseError);
    }
});

