const getUpdatedPrices = (url, apiKey) => {
    fetch(url, {
        headers: {
            "authorization": apiKey
        }
    }).then((response) => response.json())
    .then((data) => {
        deleteCoinsArticles();
        displayTokenAndPrice(data);
    }).catch((error) => console.log(error));
}

const getTopTenCoins = (url, apiKey) => {
    fetch(url, {
        headers: {
            "authorization": {apiKey}
        }
    })
    .then((response) => response.json())
    .then((data) => {
        displayTopTradedTokens(data.Data);
    })
    .catch((error) => console.log(error));
}