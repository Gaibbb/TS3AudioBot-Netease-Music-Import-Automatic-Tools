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
    } else if (response.status === 401) {
        throw new Error(`Please check yout token`);
    } else if (response.ok) {
        data = await response.json();
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
        
    return data;
};

async function getListSongNumber(requestOptions, listId, addr, port) {
    const url = `http://${addr}:${port}/api/bot/use/0/(/list/list/${listId})`
    const data = await sendURL(url, requestOptions);

    if (!((data).find(item => item.Id === listId))) {
        url_create = `http://${addr}:${port}/api/bot/use/0/(/list/create/${listId}/${listId})`
        const data_create = await sendURL(url_create, requestOptions);
        console.log(`New playlist ${listId} created success.\n` + data_create);

        const data_new = await sendURL(url, requestOptions);
        return ((data_new).find(item => item.Id === listId)).SongCount;
    } else {
        return ((data).find(item => item.Id === listId)).SongCount;
    }
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

async function addSongToTheList(requestOptions, listId, addr, port) {
    const dataArray = await readJsonFile();
    console.log(`The following songs will be add into the ${listId}\n`);
    try {
        for (let key in dataArray) {
            const songBeginNumber = await getListSongNumber(requestOptions, listId, addr, port);
            // if(getListSongNumber === )
            const songId = dataArray[key][0];
            const songName = dataArray[key][1];
            const songAddURL = `http://${addr}:${port}/api/bot/use/0/(/list/add/${listId}/http%3A%2F%2Fmusic.163.com%2Fsong%2Fmedia%2Fouter%2Furl%3Fid%3D${songId}.mp3)`;
            const nameChangeURL = `http://${addr}:${port}/api/bot/use/0/(/list/item/name/${listId}/${songBeginNumber}/${songName})`;

            const createResponse = await sendURL(songAddURL, requestOptions);
            if (createResponse.ErrorCode === 10) {
                continue;
            }
            console.log("songId = " + songId + "  songName = " + songName);
            // console.log(createResponse);
        
            await sendURL(nameChangeURL, requestOptions);
            // console.log(renameResponse);
        }

        console.log("All songs have been add to the playlist");
        process.exit();
    } catch (error) {
        console.error('Error during song addition and renaming:', error);
    } 
};

function start() {
    const args = process.argv.slice(2);
    const addr_in = args[0];
    const port_in = args[1];
    const list_id = args[2];
    const token_in = args[3];

    const headers = new Headers({
        'Authorization': `Basic ${token_in}`,
        'Content-Type': 'application/json',
    });
    
    const requestOption = {
        method: 'Get',
        headers: headers,
    };

    addSongToTheList(requestOption, list_id, addr_in, port_in);
}

start();