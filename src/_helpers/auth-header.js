export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.Token) {
        return { 'Authorization': 'Bearer ' + user.Token };
    } else {
        return {};
    }
}