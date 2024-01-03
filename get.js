const token = 'b1hmTXJQVThDZEJkUHo2YjdhdXdqZkxxVjhNPTprdW5GYjc5eE5EUFRvS0VXZ2hnQ293blhQN0hFbVc4UA=='
const fs = require('fs');
const { readJsonConfigFile } = require('typescript');

const headers = new Headers({
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
});

const requestOption = {
    method: 'Get',
    headers: headers,
};

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
    const url = `http://121.37.225.70:58913/api/bot/use/0/(/list/list/${listId})`
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
    console.log(`The following songs will be add into the ${listId}\n` + dataArray);
    for (let key in dataArray) {
        const songBeginNumber = await getListSongNumber(requestOptions, listId);
        const songId = dataArray[key][0];
        const songName = dataArray[key][1];
        const songAddURL = `http://121.37.225.70:58913/api/bot/use/0/(/list/add/${listId}/http%3A%2F%2Fmusic.163.com%2Fsong%2Fmedia%2Fouter%2Furl%3Fid%3D${songId}.mp3)`;
        const nameChangeURL = `http://121.37.225.70:58913/api/bot/use/0/(/list/item/name/${listId}/${songBeginNumber}/${songName})`;

        const createResponse = await sendURL(songAddURL, requestOptions);
        console.log(createResponse);
    
        const renameResponse = await sendURL(nameChangeURL, requestOptions);
        console.log(renameResponse);
    }
};


const Id = 'guoyao';
addSongToTheList(requestOption, Id);

