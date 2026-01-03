const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint to check if user is logged in
app.get('/api/check-auth', (req, res) => {
    const user = req.cookies.user;
    if (user) {
        res.json({ authenticated: true, user: JSON.parse(user) });
    } else {
        res.json({ authenticated: false });
    }
});

// API endpoint to login user (sets cookie)
app.post('/api/login', (req, res) => {
    const { name, email, mobile } = req.body;
    const user = { name, email, mobile };

    // Set cookie that expires in 24 hours
    res.cookie('user', JSON.stringify(user), {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false // Allow JavaScript access for localStorage sync
    });

    res.json({ success: true, user });
});

// API endpoint to logout
app.post('/api/logout', (req, res) => {
    res.clearCookie('user');
    res.json({ success: true });
});

// Middleware to check authentication for reserve page
app.get('/reserve/reserve.html', (req, res, next) => {
    const user = req.cookies.user;

    if (!user) {
        // Redirect to login with 301 and redirect query parameter
        const redirectUrl = `http://localhost:${PORT}/reserve/reserve.html`;
        return res.redirect(301, `/login/login.html?redirect=${encodeURIComponent(redirectUrl)}`);
    }

    next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Root redirect to login
app.get('/', (req, res) => {
    res.redirect('/login/login.html');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Login page: http://localhost:${PORT}/login/login.html`);
    console.log(`Reserve page: http://localhost:${PORT}/reserve/reserve.html`);
});

