const token = 'token=='

const headers = new Headers({
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
});

const requestOption = {
    method: 'Get',
    headers: headers,
};

const songId = 'songId';
const url = `http://addr:port/api/bot/use/0/(/list/add/listId/http%3A%2F%2Fmusic.163.com%2Fsong%2Fmedia%2Fouter%2Furl%3Fid%3D${songId}.mp3)`;

fetch(url, requestOption)
    .then(response => {
        if (!response.ok) {
            throw new error(`HTTP error: ${response.error}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })