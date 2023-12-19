let articleCount = 0;
let hasDisplayedCoins = false;
let hasDisplayedPrice = false;
const maxArticles = 10;
let displayedTokensStr = "";
let topTradedTokens = [];

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

const displayTopTradedTokens = (tokenObjects) => {
    if (!hasDisplayedCoins) {
        let column = 0;
        tokenObjects.forEach((token) => {
            const newLi = createTokenListItem(token);
            topTradedTokens.push(token["CoinInfo"]["FullName"]);
            let ulElement = null;
            // add to the first column
            if (column === 0) {
                ulElement = document.querySelector(".first-column ul");
            } else if (column === 1) { // add to second column
                ulElement = document.querySelector(".second-column ul");
            } else if (column === 2) { // add to third column
                ulElement = document.querySelector(".third-column ul");
            } else if (column === 3) { // add to fourth column
                ulElement = document.querySelector(".fourth-column ul");
            } else if (column === 4) { // add to fifth column
                ulElement = document.querySelector(".fifth-column ul");
            } else { // add to sixth column
                ulElement = document.querySelector(".sixth-column ul");
            }
            column = (column + 1) % 6
            ulElement.append(newLi);
        })
        hasDisplayedCoins = true;
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
        const coinsSection = document.querySelector(".coins .primary");
        coinsSection.append(newArticle);

        hasDisplayedPrice = true;
    })
}

const formTopTraded = document.querySelector("form.top-traded");
formTopTraded.addEventListener("submit", (event) => {
    event.preventDefault();

    getTopTenCoins(url2);
})

const flipHiddenTopTradedDivs = () => {
    const sectionDivs = document.querySelectorAll("section.top-traded div");
    for (const node of sectionDivs.values()) {
        if (!node.classList.value.includes("hidden")) node.classList.add("hidden");
        else node.classList.remove("hidden");
    }
}

const moveLeftArticle = document.querySelector("article.move-left");
moveLeftArticle.addEventListener("click", () => {
    flipHiddenTopTradedDivs();
    document.querySelector("section.top-traded").classList.add("hidden");
})

const moveRightArticle = document.querySelector("article.move-right");
moveRightArticle.addEventListener("click", () => {
    flipHiddenTopTradedDivs();

    document.querySelector("section.top-traded").classList.remove("hidden");
})

const formUpdateCoins = document.querySelector("form.update-coins");
formUpdateCoins.addEventListener("submit", (event) => {
    event.preventDefault();

    getUpdatedPrices(url1, API_KEY2);
})

getUpdatedPrices(url1, API_KEY2);