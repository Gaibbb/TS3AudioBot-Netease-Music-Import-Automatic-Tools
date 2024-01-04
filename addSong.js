const token = 'b1hmTXJQVThDZEJkUHo2YjdhdXdqZkxxVjhNPTprdW5GYjc5eE5EUFRvS0VXZ2hnQ293blhQN0hFbVc4UA=='

const headers = new Headers({
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
});

const requestOption = {
    method: 'Get',
    headers: headers,
};

const songId = '22804057';
const url = `http://121.37.225.70:58913/api/bot/use/0/(/list/add/yjk/http%3A%2F%2Fmusic.163.com%2Fsong%2Fmedia%2Fouter%2Furl%3Fid%3D${songId}.mp3)`;

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