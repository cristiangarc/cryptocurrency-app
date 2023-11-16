const deleteInitialArticles = () => {
    const initialArticles = document.querySelectorAll(".coins article");

    initialArticles.forEach((article) => {
        if (article.textContent.includes("Coin")) {
            article.remove();
        }
    })
}

const deleteCoinsArticles = () => {
    if (hasDisplayedPrice) {
        const coinsArticles = document.querySelectorAll(".coins article");
    
        coinsArticles.forEach((article) => {
            article.remove();
        });
        articleCount = 0;
        displayedTokensStr = "";
    }
}