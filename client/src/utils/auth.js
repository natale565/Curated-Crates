import * as jwt_decode from 'jwt-decode';

class AuthService {
    getProfile() {
           try {
            return jwt_decode(this.getToken());
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    isTokenExpired(token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('id_token');
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true;
        }
    }


    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

export default new AuthService();
