const token = 'token=='

const headers = new Headers({
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
});

const requestOption = {
    method: 'Get',
    headers: headers,
};

url = 'http://addr:port/api/bot/use/0/(/list/item/name/id/index/name)'

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