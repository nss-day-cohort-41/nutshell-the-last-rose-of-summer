// Articles JS
// David Bruce
import API from './../data.js'
import renderArticles from './articleDOM.js'
import listeners from './../eventListeners.js'
import shared from './../miscSharedFunctions.js'


let articleArray = [];

const articleSection = document.querySelector(".container__main__middle--news");

const articleFormHTML = (articleOperation) => {
    let articleDiscard = "New Article"
    if (articleOperation === "edit") { 
        articleDiscard = "Edits" 
    
    }
    const formHTML=
    `
        <section class="section__itemCard">
            <input type="hidden" id="field__articleId" value=""/>
            <input type="hidden" id="field__article__userId" value="${sessionStorage.activeUser}"/>
            <p class="header__itemCard"></p>
            <fieldset class="fieldset__article__title">
                <label for="article__title">News Article</label>
                <input type="text" class="field__text" id="field__article__title" name="article__title"></input>  
            </fieldset>
            <fieldset class="fieldset__article__synopsis">
                <label for="article__synopsis">Synopsis</label>
                <input type="text" class="field__text" id="field__article__synopsis" name="article__synopsis"></input>  
            </fieldset>
            <fieldset class="fieldset__article__url">
                <label for="article__url">URL</label>
                <input type="text" class="field__text" id="field__article__url" name="article__url"></input>  
            </fieldset>
            <div id="save_discard">
                <input type="button" value="Save Article" id="button__save__article"></input>
                <input type="button" value="Discard ${articleDiscard}" id="button__discard__article"></input>
            </div>
        </section>`;
        return formHTML;
}


const articleFunctions = {

    addArticleEntry () {
        const articleObject = articleFunctions.saveArticle("save")
        API.addArticleEntry(articleObject)
            .then((response) => {
                shared.clearDataField();
                articleFunctions.getAllArticles();
            })
    },
    
    articleDelete (articleId) {
      API.deleteArticle(articleId) 
         .then((articleFunctions.getAllArticles()))
    },

    addNewArticleForm () {
        document.querySelector(".container__main__left--messages").innerHTML = articleFormHTML("save")
    listeners.enableArticleDiscardButton()
    listeners.enableArticleSave()

    },

    // Save form fields to new article object
    saveArticle (articleOperation) {
        const articleId = "";
        if (articleOperation === "edit") { 
            articleId = document.getElementById("field__article__articleId").value;
        }
        const articleUserId = parseInt(sessionStorage.getItem("activeUser")); 
        const articleTitle = document.getElementById("field__article__title").value;
        const articleSynopsis = document.getElementById("field__article__synopsis").value;
        const articleUrl = document.getElementById("field__article__url").value;
        const articleTimestamp = new Date();

        const articleObject = articleFunctions.createArticleObject( articleUserId,articleTitle, articleSynopsis, articleUrl, articleTimestamp );
        return articleObject;
    }, 

    // Create new article object and return it
    createArticleObject ( articleUserId, articleTitle, articleSynopsis, articleUrl, articleTimestamp ) {
        return {
            userId: articleUserId,
            title: articleTitle,
            synopsis: articleSynopsis,
            url: articleUrl,
            timestamp: articleTimestamp
        }
    }, 

    //Get users, friends, and articles and build array
    getAllArticles () {
        articleSection.innerHTML="";
        API.getAllUsersAndArticles()
        .then((response => {
            articleFunctions.buildArticleArray(response)
        }))
    },
    //Build article array
    buildArticleArray(allUserArticles) {
        articleArray = []
    //Find friends and set object key value
        allUserArticles.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
                if (friend.following == sessionStorage.activeUser) {
                    friendOfUser = true
                }
    // Builds article array with users and friends
            })
            user.articles.forEach(article => {
                article.userName = user.userName
                article.friendOfUser = friendOfUser
                if ( article.friendOfUser = true || article.userId === sessionStorage.activeUser) {
                    articleArray.push(article)
                }
                
            })

        });
    // Sorts for newest article to go to top of list
        articleArray.sort((a, b) => {
                if (a.timestamp > b.timestamp) return -1;
                if (a.timestamp < b.timestamp) return 1;
                return 0;
        })
    // Add to DOM
        articleFunctions.articleDOMConverter(articleArray)
    }, 

    articleDOMConverter(articleArray)  {
        const articles = articleArray
        let articleSectionHTML = ""
        articleSection.innerHTML = ""  
        articleArray.forEach(article => {

            // Add active user article and adjust class for no italics
            if (article.userId == sessionStorage.activeUser) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.remove("section__friend")
            }
            // Add following friends articles and adjust class for italics and cornsilk background
            else if (article.friendOfUser === true ) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.toggle("section__friend")
            }                
            listeners.enableArticleDeleteButton();
        })
        
    }
}

export default articleFunctions;