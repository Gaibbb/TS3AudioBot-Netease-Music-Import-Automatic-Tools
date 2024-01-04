let token = 'b1hmTXJQVThDZEJkUHo2YjdhdXdqZkxxVjhNPTprdW5GYjc5eE5EUFRvS0VXZ2hnQ293blhQN0hFbVc4UA==';
url = 'http://addr:port/api/bot/use/0/(/list/create/id/id)'
surl = 'http://addr:port/api/bot/use/0/(/list/list/id)'

const header = new Headers ({
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json'
})

const requestOption = {
    method: 'Get',
    headers: header
}

fetch(surl, requestOption)
    .then(response => {
        if (!response.ok) {
            throw new error("response error: ", response.status)
        }
        return response.json();
    })
    .then(data => {
        if (!((data).find(item => item.Id === '21'))) {
            fetch(url, requestOption)
                .then(response => {
                    if (!response.ok) {
                        throw new error("response error: ", response.status)
                    }
                    return response;
                })
                .then(data => {
                    console.log(data)
                })
        } else {
            const number = ((data).find(item => item.Id === '21')).SongCount;
            console.log(number);
        }
    })