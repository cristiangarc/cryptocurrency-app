let coinCount = 0;
let articleCount = 3;
const maxArticles = 13;

const coins = ["BTC", "ETH", "USDT", "BNB", "XRP", "SOL", "USDC", "ADA", "DOGE", "TRX"];
coinsStr = coins.join(",");

const createArticle = (tokenName, tokenPrice, tokenSymbol) => {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    h2.textContent = `${tokenName}`;
    h3.textContent = `${tokenPrice}${tokenSymbol}`;
    article.append(h2);
    article.append(h3);

    return article;
}

const displayTokenAndPrice = (tokenObjects, numOfTokens) => {
    const keys = Object.keys(tokenObjects);
    for (let i = coinCount; i < coinCount + numOfTokens; i++) {
        if (i >= keys.length || articleCount >= maxArticles) {
            break;
        }
        const tokenName = keys[i];
        const article = createArticle(tokenName, tokenObjects[tokenName]["USD"], "USD");
        articleCount++;
        
        // append to both wallet sections
        const walletsSection = document.querySelector(".wallets .primary");
        walletsSection.append(article);

        const walletsSection2 = document.querySelector(".wallets .secondary");
        const article2 = createArticle(tokenName, tokenObjects[tokenName]["USD"], "USD");
        walletsSection2.append(article2);
    }
    coinCount += numOfTokens;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsStr}&tsyms=USD`, {
        headers: {
            "authorization": {API_KEY2}
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        displayTokenAndPrice(data, 5);
    })
    .catch((error) => console.log(error));
})