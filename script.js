const apiKey = '6d739de099244a569ee052ea97803f3f';

const blogContainer =
    document.getElementById("blog-container");

var searchField = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");


async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.articles;
    }
    catch (error) {
        console.error("Error fetching Random news", error);
        return [];
    }
}

searchButton.addEventListener("click",
    async () => {
        const query = searchField.value.trim();
        if (query !== "") {
            try {
                const articles = await fetchNewsQuery(query);
                displayBlogs(articles)
            } catch (error) {
                console.log("Error fetching news by query", error);
            }
        }
    });

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.articles;
    }
    catch (error) {
        console.error("Error fetching Random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(element => {
        const blogCard = document.createElement
            ("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = element.urlToImage;
        img.alt = element.title;
        const title = document.createElement("h2");

        const truncatedTitle = element.title.length> 30 ? element.title.slice(0, 30) + "..." : element.title;

        title.textContent = truncatedTitle;

        const description = document.createElement("p");

        const truncatedDescription = element.description.length > 120 ? element.description.slice(0, 120) + "...": element.description;

        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(element.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });

}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }
    catch (error) {
        console.error("Error fetching random news", error);
    }
})();