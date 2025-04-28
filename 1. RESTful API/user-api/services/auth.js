class AuthService {
    async exchangeToken({ grant_type, code, redirect_uri, client_id }) {
        // Simulate token issuing
        const now = Math.floor(Date.now() / 1000); // current time in seconds
        const expiresIn = 3600; // 1 hour
        let accessToken = '';
        if (code === 'authUser1') {
            accessToken = 'Bearer faketoken_user1';
        } else if (code === 'authUser2') {
            accessToken = 'Bearer faketoken_user2';
        }
        return {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: expiresIn,
            refresh_token: 'mock_refresh_token_' + code,
            id_token: 'mock_id_token_' + client_id,
            issued_at: now,
            expires_at: now + expiresIn
        };
    }
}

const authService = new AuthService();
export default authService;
