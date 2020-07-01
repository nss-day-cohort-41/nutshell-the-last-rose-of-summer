// List Build Functions
// David Bruce

import API from './../data.js';
import renderArticles from './articleDOM.js';
import listeners from './../eventListeners.js';

const articleSection = document.querySelector(".container__main__middle--news");
let articleArray = [];
let activeUserObj = {};
let activeUserId = "";

const articleList = {

    //Get users, friends, and articles and build array
    getAllArticles () {
        articleSection.innerHTML="";
        API.getAllUsersAndArticles()
        .then((response => {
            articleList.buildArticleArray(response);
        }))
    },
    //Build article array
    buildArticleArray(allUserArticles) {
        articleArray = []
        activeUserId = parseInt(sessionStorage.getItem("activeUser"))
        let friendArray = []

        activeUserObj = allUserArticles.find(user => user.id === activeUserId)
        activeUserObj.friends.forEach((friend => {
         
            friendArray.push(friend.activeUserId)}))
        

        //Find friends and set object key value
        allUserArticles.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
                if (friendArray.includes(friend.userId)) {
                    friendOfUser = true
                }
    // Builds article array with users and friends
            })
            user.articles.forEach(article => {
                article.userName = user.userName
                article.friendOfUser = friendOfUser

                if ( article.friendOfUser === true || article.userId === activeUserId) {
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
        articleList.articleDOMConverter(articleArray)
    }, 

    articleDOMConverter(articleArray)  {
        articleSection.innerHTML = ""  
        articleArray.forEach(article => {

            
            // Add active user article and adjust class for no italics
            if (article.userId === activeUserId) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.remove("section__friend")
            }
            // Add activeUserId friends articles and adjust class for italics and cornsilk background
            else if (article.friendOfUser === true ) {
                renderArticles(article)
                document.querySelector(`.article--${article.id}`).classList.toggle("section__friend")
            }                
            listeners.enableArticleDeleteButton();
        })
        
    }
}

export default articleList;
