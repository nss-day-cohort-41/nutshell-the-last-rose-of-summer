
export default {
    storeUser (userId) {
        sessionStorage.setItem('activeUser', userId )               
    },
    removeUser () {
        sessionStorage.removeItem('activeUser')
    }
}