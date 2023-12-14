const express = require('express');
const muzejiRoutes = require('./routes/muzeji_r');
const pool = require('./routes/db');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/v1/muzeji', muzejiRoutes);

/*app.get('/data', async (req, res) => {
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/datatable', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'datatable.html'));
});*/

app.listen(5500, () => {
    console.log(`Server running on port 5500`);
});
