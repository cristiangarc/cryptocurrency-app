const getUpdatedPrices = (url, apiKey) => {
    fetch(url, {
        headers: {apiKey}
    }).then((response) => response.json())
    .then((data) => {
        deleteCoinsArticles();
        displayTokenAndPrice(data);
    }).catch((error) => console.log(error));
}

const getTopTenCoins = (url) => {
    fetch(url, {
        headers: {
            "authorization": {API_KEY2}
        }
    })
    .then((response) => response.json())
    .then((data) => {
        displayTokens(data.Data);
    })
    .catch((error) => console.log(error));
}