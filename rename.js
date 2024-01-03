const token = 'b1hmTXJQVThDZEJkUHo2YjdhdXdqZkxxVjhNPTprdW5GYjc5eE5EUFRvS0VXZ2hnQ293blhQN0hFbVc4UA=='

const headers = new Headers({
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
});

const requestOption = {
    method: 'Get',
    headers: headers,
};

url = 'http://121.37.225.70:58913/api/bot/use/0/(/list/item/name/2d/39/nihao)'

fetch(url, requestOption)
    .then(response => {
        if (response.headers.get('content-length') === '0') {
            return 0;
        }

        if (response.status === 204) {
            console.log("HTML 204, nothing to return")
        } else if (response.ok) {
            return response.json();
        } else {
            throw new error(`HTTP error: ${response.error}`);
        }
    })
    .then(data => {
        if (data !== null && data!== undefined) {
            console.log(data);
        } else {
            console.log("Empty response or not a JSON data");
        }
    })