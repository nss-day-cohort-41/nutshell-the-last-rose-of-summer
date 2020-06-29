
export default {
    storeUser (userId, userName) {
        sessionStorage.setItem('activeUser', userId )               
        sessionStorage.setItem('activeUserName', userName )               
    },
    removeUser () {
        sessionStorage.removeItem('activeUser')
        sessionStorage.removeItem('activeUserName')
    }
}