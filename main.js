let articleCount = 0;
let hasDisplayedCoins = false;
let hasDisplayedPrice = false;
const maxArticles = 10;
let displayedTokensStr = "";

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
        let column = 0;
        tokenObjects.forEach((token) => {
            const newLi = createTokenListItem(token);
            let ulElement = null;
            // add to the first column
            if (column === 0) {
                ulElement = document.querySelector(".first-column ul");
            } else if (column === 1) { // add to second column
                ulElement = document.querySelector(".second-column ul");
            } else { // add to third column
                ulElement = document.querySelector(".third-column ul");
            }
            column = (column + 1) % 3
            ulElement.append(newLi);
        })
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
    const initialArticles = document.querySelectorAll(".wallets article");

    initialArticles.forEach((article) => {
        if (article.textContent.includes("Coin")) {
            article.remove();
        }
    })
}

const deleteWalletsArticles = () => {
    if (hasDisplayedPrice) {
        const walletsArticles = document.querySelectorAll(".wallets article");
    
        walletsArticles.forEach((article) => {
            article.remove();
        });
        articleCount = 0;
        displayedTokensStr = "";
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

const displayTokenAndPrice = (tokenObjects) => {
    if (articleCount === 0 && !hasDisplayedPrice) {
        deleteInitialArticles();
    }

    const tokenNames = Object.keys(tokenObjects);
    tokenNames.forEach((token) => {
        if (articleCount >= maxArticles || displayedTokensStr.includes(token)) {
            return null;
        }
        const newArticle = createTokenArticle(token, tokenObjects[token]["USD"], "USD");
        articleCount++;
        displayedTokensStr += token;
        
        // append to both wallet sections
        const walletsSection = document.querySelector(".wallets .primary");
        walletsSection.append(newArticle);
    
        const walletsSection2 = document.querySelector(".wallets .secondary");
        const newArticle2 = createTokenArticle(token, tokenObjects[token]["USD"], "USD");
        walletsSection2.append(newArticle2);

        hasDisplayedPrice = true;
    })
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
        deleteWalletsArticles();
        displayTokenAndPrice(data, 5);
    })
    .catch((error) => console.log(error));
})

const formTopTraded = document.querySelector("form.top-traded");
formTopTraded.addEventListener("submit", (event) => {
    event.preventDefault();

    getTopTenCoins(url2);
})

// const formHideSection = document.querySelector("form.hide-section");
const moveLeftArticle = document.querySelector("article.move-left");
moveLeftArticle.addEventListener("click", () => {
    const section = document.querySelector("section.top-traded");
    section.classList.add("hidden");

    const hiddenDivs = document.querySelectorAll(".top-traded div.hidden");
    if (hiddenDivs.length) {
        hiddenDivs.forEach((div) => div.classList.remove("hidden"));
    }
})

const moveRightArticle = document.querySelector("article.move-right");
moveRightArticle.addEventListener("click", () => {
    const section = document.querySelector("section.top-traded");
    section.classList.remove("hidden");
})