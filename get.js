const fs = require('fs');
const { readJsonConfigFile, OutputFileType } = require('typescript');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function sendURL(url, requestOptions) {
    const response = await fetch(url, requestOptions)

    if (response.status === 204) {
        data = "HTML 204, nothing to return"
    } else if (response.ok) {
        data = await response.json();
    } else {
        throw new error(`HTTP error: ${response.error}`);
    }
        
    return data;
};

async function getListSongNumber(requestOptions, listId) {
    const url = `http://${addr_in}:${port_in}/api/bot/use/0/(/list/list/${listId})`
    const data = await sendURL(url, requestOptions);
    const number = ((data).find(item => item.Id === listId)).SongCount;

    return number;
};

async function readJsonFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('song.json', 'utf-8', (err, data) => {
            if (err) {
                console.error('读取文件错误, ', err);
                reject(err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                const dataArray = Object.entries(jsonData);
                resolve(dataArray);
            } catch (parseError) {
                console.error("解析JSON错误, ", parseError);
                reject(parseError);
            }
        });
    });
}

async function addSongToTheList(requestOptions, listId) {
    const dataArray = await readJsonFile();
    console.log(`The following songs will be add into the ${listId}\n` + dataArray[1]);
    for (let key in dataArray) {
        const songBeginNumber = await getListSongNumber(requestOptions, listId);
        const songId = dataArray[key][0];
        const songName = dataArray[key][1];
        const songAddURL = `http://${addr_in}:${port_in}/api/bot/use/0/(/list/add/${listId}/http%3A%2F%2Fmusic.163.com%2Fsong%2Fmedia%2Fouter%2Furl%3Fid%3D${songId}.mp3)`;
        const nameChangeURL = `http://${addr_in}:${port_in}/api/bot/use/0/(/list/item/name/${listId}/${songBeginNumber}/${songName})`;

        const createResponse = await sendURL(songAddURL, requestOptions);
        if (createResponse.ErrorCode === 10) {
            continue;
        }
        console.log("songId = " + songId + "  songName = " + songName);
        // console.log(createResponse);
    
        const renameResponse = await sendURL(nameChangeURL, requestOptions);
        // console.log(renameResponse);
    }
};

function delOutputFile() {
    const filePath = 'output.html'
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:, ', err);
        } else {
            console.log('File deleted.');
        }
    })
};

let addr_in, port_in, list_id, token_in;

rl.question("Please enter server's address: ", (addr) => {
    addr_in = addr;

    rl.question("Please enter ts3audiobot server's port: ", (port) => {
        port_in = port;

        rl.question("Please enter audiobot list id: ", (id) => {
            list_id = id;
            
            rl.question("Please enter your token: ", (token) => {
                token_in = token;
                rl.close();

                const headers = new Headers({
                    'Authorization': `Basic ${token_in}`,
                    'Content-Type': 'application/json',
                });
                
                const requestOption = {
                    method: 'Get',
                    headers: headers,
                };

                addSongToTheList(requestOption, list_id);
                delOutputFile();
            })
        })
    })
});