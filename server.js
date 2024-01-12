const express = require('express');
const path = require('path');
const ejs = require('ejs');
const muzejiRoutes = require('./routes/muzeji_r');
const axios = require('axios');
const fs = require('fs');
const {
    Pool
} = require('pg');

const {
    auth,
    requiresAuth
} = require('express-openid-connect');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'muzejiZagreba',
    password: 'bazepodataka',
    port: 5432,
});

const session = require('express-session');
app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


app.use(express.json());

app.use('/api/v1/muzeji', muzejiRoutes);


app.get('/data', async (req, res) => {
    try {
        const searchTerm = req.query.search || '';
        const searchAttribute = req.query.attribute;

        let queryText = `
            SELECT
                m.nazivmuzeja,
                i.nazivizlozbe,
                i.opis,
                i.vrstaizlozbe,
                TO_CHAR(i.datumpocetka, 'YYYY-MM-DD') AS datumpocetka_str,
                TO_CHAR(i.datumzavrsetka, 'YYYY-MM-DD') AS datumzavrsetka_str,
                m.webstranica,
                m.adresa,
                m.mail,
                m.telefon
            FROM
                muzej m
            JOIN
                izlozba i ON m.idMuzeja = i.idMuzeja
        `;

        const params = [];

        if (searchTerm && searchAttribute && searchAttribute !== 'all') {
            if (searchAttribute === 'datumpocetka' || searchAttribute === 'datumzavrsetka') {
                queryText += ` WHERE TO_CHAR(${searchAttribute}, 'YYYY-MM-DD') ILIKE $1`;
            } else {
                queryText += ` WHERE ${searchAttribute} ILIKE $1`;
            }
            params.push(`%${searchTerm}%`);
        } else if (searchTerm) {
            queryText += `
                WHERE
                    m.nazivmuzeja ILIKE $1 OR
                    i.nazivizlozbe ILIKE $1 OR
                    i.opis ILIKE $1 OR
                    i.vrstaizlozbe ILIKE $1 OR
                    m.adresa ILIKE $1 OR
                    m.webstranica ILIKE $1 OR
                    m.mail ILIKE $1 OR
                    m.telefon ILIKE $1 OR
                    TO_CHAR(i.datumpocetka, 'YYYY-MM-DD') ILIKE $1 OR
                    TO_CHAR(i.datumzavrsetka, 'YYYY-MM-DD') ILIKE $1
            `;
            params.push(`%${searchTerm}%`);
        }

        const result = await pool.query(queryText, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


const config = {
    authRequired: false,
    auth0Logout: false,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:5500',
    clientID: '1j5x1231M16ujBOagJVYEqDp5kfrR85M',
    issuerBaseURL: 'https://dev-746naqxvi6sm0ikc.eu.auth0.com'
};

app.use(auth(config));

app.get('/authStatus', (req, res) => {
    console.log("Entered authStatus");
    res.json({
        isAuthenticated: req.oidc.isAuthenticated(),
        isAppSessionActive: req.session.isAppSessionActive || false
    });
});


app.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render('index');
});

app.get('/datatable', (req, res) => {
    res.render('datatable');
});


app.get('/profile', requiresAuth(), (req, res) => {
    res.render('profile', {
        user: req.oidc.user
    });
});


app.get('/exportData', requiresAuth(), async (req, res) => {
    try {
        const data = await fetchDataFromDatabase();
        const format = req.query.format; // 'csv' or 'json'

        if (format === 'csv') {
            const csv = exportToCsv(data);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=izlozbe.csv');
            res.send(csv);
        } else if (format === 'json') {
            const json = exportToJson(data);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', 'attachment; filename=izlozbe.json');
            res.send(json);
        } else {
            res.status(400).send("Invalid format specified");
        }

    } catch (error) {
        console.error("Failed to export data", error);
        res.status(500).send("Error exporting data");
    }
});



async function fetchDataFromDatabase() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM izlozba');
        return res.rows;
    } finally {
        client.release();
    }
}

function exportToCsv(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

function exportToJson(data) {
    return JSON.stringify(data, null, 2);
}


app.listen(5500, () => {
    console.log(`Server running on port 5500`);
});
