import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;

// In-memory session store (use Redis or database in production)
const sessions = new Map();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/check-auth', (req, res) => {
    const sessionToken = req.cookies.sessionToken;
    const session = sessions.get(sessionToken);

    if (session) {
        res.json({ authenticated: true, user: session.user });
    } else {
        res.json({ authenticated: false });
    }
});

app.post('/api/login', (req, res) => {
    const { name, email, mobile } = req.body;
    const user = { name, email, mobile };

    // Generate secure session token using UUID v4
    const sessionToken = uuidv4();

    // Store session server-side
    sessions.set(sessionToken, {
        user,
        createdAt: Date.now()
    });

    res.cookie('sessionToken', sessionToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    });

    res.json({ success: true, user });
});


app.get('/reserve/reserve.html', (req, res, next) => {
    const sessionToken = req.cookies.sessionToken;
    const session = sessions.get(sessionToken);

    if (!session) {
        const redirectUrl = `http://localhost:${PORT}/reserve/reserve.html`;
        return res.redirect(301, `/login/login.html?redirect=${redirectUrl}`);
    }

    next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.redirect('/login/login.html');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Login page: http://localhost:${PORT}/login/login.html`);
    console.log(`Reserve page: http://localhost:${PORT}/reserve/reserve.html`);
});

