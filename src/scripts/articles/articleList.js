import { updatePortalLoggedIn, updateComponents } from "./events.js"

const renderArticleEntries = () => {

    const articleSection = document.querySelector(".container__main__middle--news")
    articleSection.innerHTML = "";
    debugger
    API.getUserData(userId)
        .then((userObject => {
                 userObject.articles.forEach((article)=> {
                     console.log(article)
                 })
    
            
        }))
    
    .then((articleArray) => {

            articleArray.forEach(article => {
                articleSection.innerHTML += `<section class="section__itemCard">
                <p class="header__itemCard">Title:  ${article.title}<button class="buttonNews--news.id">Delete</button></p>
                <p><strong>Synopsis:</strong>  ${article.synopsis}</p>
                <p><strong>URL:</strong>  ${article.url}</p>
                <p><strong>Timestamp:</strong>  ${article.timestamp}</p>
            </section>`
            });
            // registerEventListener.registerEventListener();




        })


}


export default renderArticleEntries;