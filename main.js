let coinCount = 0;
let articleCount = 3;
let hasDisplayedCoins = false;
const maxArticles = 13;

const coins = ["BTC", "ETH", "USDT", "BNB", "XRP", "SOL", "USDC", "ADA", "DOGE", "TRX"];
coinsStr = coins.join(",");
const url1 = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsStr}&tsyms=USD`;
const url2 = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

const createTokenListItem = (token) => {
    // console.log(token);
    const newLi = document.createElement("li");
    newLi.textContent = `${token["CoinInfo"]["FullName"]}`;
    return newLi;
}

const displayTokens = (tokenObjects) => {
    if (!hasDisplayedCoins) {
        let col = 0;
        for (let i = 0; i < tokenObjects.length; i++) {
            const newLi = createTokenListItem(tokenObjects[i]);
            let ul = null;
            // add to the first column
            if (col === 0) {
                ul = document.querySelector(".first-column ul");
            } else if (col === 1) { // add to second column
                ul = document.querySelector(".second-column ul");
            } else { // add to third column
                ul = document.querySelector(".third-column ul");
            }
            col = (col + 1) % 3
            ul.append(newLi);
        }
        hasDisplayedCoins = !hasDisplayedCoins;
    }
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

const deleteInitialArticles = () => {
    const initialArticles = document.querySelectorAll(".primary article");
    const initialArticlesSecond = document.querySelectorAll(".secondary article");

    for (const article of initialArticles) {
        if (article.textContent.includes("Coin")) {
            article.remove();
        }
    }
    for (const article of initialArticlesSecond) {
        if (article.textContent.includes("Coin")) {
            article.remove();
        }
    }
}

const createTokenArticle = (tokenName, tokenPrice, tokenSymbol) => {
    const newArticle = document.createElement("article");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    h2.textContent = `${tokenName}`;
    h3.textContent = `${tokenPrice}${tokenSymbol}`;
    newArticle.append(h2);
    newArticle.append(h3);

    return newArticle;
}

const displayTokenAndPrice = (tokenObjects, numOfTokens) => {
    if (coinCount === 0) {
        deleteInitialArticles();
    }

    const keys = Object.keys(tokenObjects);
    for (let i = coinCount; i < coinCount + numOfTokens; i++) {
        if (i >= keys.length || articleCount >= maxArticles) {
            break;
        }
        const tokenName = keys[i];
        const article = createTokenArticle(tokenName, tokenObjects[tokenName]["USD"], "USD");
        articleCount++;
        
        // append to both wallet sections
        const walletsSection = document.querySelector(".wallets .primary");
        walletsSection.append(article);

        const walletsSection2 = document.querySelector(".wallets .secondary");
        const article2 = createTokenArticle(tokenName, tokenObjects[tokenName]["USD"], "USD");
        walletsSection2.append(article2);
    }
    coinCount += numOfTokens;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(url1, {
        headers: {
            "authorization": {API_KEY2}
        }
    })
    .then((response) => response.json())
    .then((data) => {
        displayTokenAndPrice(data, 5);
        getTopTenCoins(url2);
    })
    .catch((error) => console.log(error));
})