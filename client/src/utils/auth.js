import { jwtDecode } from 'jwt-decode';

class AuthService {
    getProfile() {
        const token = this.getToken();
        if (!token) return null;
        
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }    

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        if (!token) return true;
        
        try {
            const decoded = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true;
        }
    }
    


    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        if (!idToken) {
            console.error("Invalid token provided to AuthService.");
            return;
        }
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }
    
    logout() {
    localStorage.removeItem('id_token');
    window.location.reload(); 
}

    
}

export default new AuthService();
