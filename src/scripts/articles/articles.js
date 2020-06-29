// Articles JS
import API from './../data.js'
import renderArticles from './articleDOM.js'
import listeners from './../eventListeners.js'


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
            <p class="header__itemCard">${sessionStorage.activeUserName} </p>
            <fieldset class="fieldset__article__title">
                <label for="article__title">News Article</label>
                <input type="text" class="field__text" id="field__article__title" name="article__title"></input>  
            </fieldset>
            <fieldset class="fieldset__article__synopsis">
                <label for="article__synopsis">News Article</label>
                <input type="text" class="field__text" id="field__article__synopsis" name="article__synopsis"></input>  
            </fieldset>
            <fieldset class="fieldset__article__url">
                <label for="article__url">News Article</label>
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

    addArticleEntry (articleObject) {
        API.addArticleEntry(articleObject)
            .then((response) => {
                renderArticles(response);
            })
    },
    
    articleDelete (articleId) {
      API.deleteArticle(articleId) 
         .then((articleFunctions.getAllArticles()))
    },

    articleSave () {
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
        const articleUserId = document.getElementById("field__article__userId").value; 
        const articleTitle = document.getElementById("field__article__title").value;
        const articleSynopsis = document.getElementById("field__article__synopsis").value;
        const articleUrl = document.getElementById("field__article__url").value;
        const articleTimestamp = new Date();

        const articleObject = createArticle( articleTitle, articleSynopsis, articleUrl, articleTimestamp );
    }, 

    // Create new article object and return it
    createArticle ( articleUserId, articleTitle, articleSynopsis, articleUrl, articleTimestamp ) {
        return {
            userId: articleUserId,
            title: articleTitle,
            synopsis: articleSynopsis,
            url: articleUrl,
            timestamp: articleTimestamp
        }
    }, 

    //Get all user data including messages and friends//
    getAllArticles () {
        API.getAllUsersAndArticles()
        .then((response => {
            // console.log(response)
            articleFunctions.buildArticleArray(response)
        }))
    },
    //Build the array of all messages//
    buildArticleArray(allUserArticles) {
        articleArray = []
    //searches messages for all friends of Current User//
        allUserArticles.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
                if (friend.following == sessionStorage.activeUser) {
                    friendOfUser = true
                }
    //builds the message array, adding user name and friend status to the array//
            })
            user.articles.forEach(article => {
                article.userName = user.userName
                article.friendOfUser = friendOfUser
                if ( article.friendOfUser = true || article.userId === sessionStorage.activeUser) {
                    console.log(article)
                    articleArray.push(article)
                }
                
            })

        });
    //Sort the array to show newest on the bottom of the list//
        articleArray.sort((a, b) => {
                if (a.timestamp > b.timestamp) return -1;
                if (a.timestamp < b.timestamp) return 1;
                return 0;
        })
    //off to HTML DOMland
    
        articleFunctions.articleDOMConverter(articleArray)
    }, 
    articleDOMConverter(articleArray)  {
        const articles = articleArray
        let articleSectionHTML = ""
        articleSection.innerHTML = ""  
        articleArray.forEach(article => {

            //build current user message//
            if (article.userId == sessionStorage.activeUser) {
                renderArticles(article)
            //    articleSectionHTML += userHTML           
            }
            //build current user's friends messages//
            else if (article.friendOfUser === true ) {
                renderArticles(article)
            //    articleSectionHTML += friendHTML
            }                
            listeners.enableArticleDeleteButton();
        })
        
    }
}

export default articleFunctions;