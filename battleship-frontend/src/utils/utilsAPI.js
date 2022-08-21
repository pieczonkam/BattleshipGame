import { jwtValidRequest } from "./requestsAPI";

const setJWT = (jwt) => {
    localStorage.setItem('jwt', jwt);
}

const logOut = () => {
    localStorage.removeItem('jwt');
    window.location.reload(false);
}

const isLoggedIn = async () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
        const logged_in = await jwtValidRequest(jwt);
        
        if (!logged_in) {
            localStorage.removeItem('jwt');
            return false;
        }

        return true;
    }

    return false;
}

export { setJWT, logOut, isLoggedIn }