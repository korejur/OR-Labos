document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchValue = document.getElementById('search-input').value;
        const searchAttribute = document.getElementById('search-attribute').value; 
        fetchData(searchValue, searchAttribute);

    });

    const downloadCsvButton = document.getElementById('download-csv');
    const downloadJsonButton = document.getElementById('download-json');

    downloadCsvButton.addEventListener('click', function () {
        downloadCsv();
    });

    downloadJsonButton.addEventListener('click', function () {
        downloadJson();
    });

    fetchData();
});

function fetchData(searchTerm = '', searchAttribute = 'all') {
    
    const url = searchTerm ? `/data?search=${encodeURIComponent(searchTerm)}&attribute=${searchAttribute}` : `/data?attribute=${searchAttribute}`;

    fetch(url)
        .then(response => response.json())
        .then(data => fillTable(data))
        .catch(error => console.error('Error fetching data:', error));
}


function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString();
}


function fillTable(data) {
    const table = document.getElementById('data-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    const searchTerm = document.getElementById('search-input').value.trim();

    data.forEach((row) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${highlightSearchTerm(row.nazivmuzeja, searchTerm)}</td>
            <td>${highlightSearchTerm(row.nazivizlozbe, searchTerm)}</td>
            <td>${highlightSearchTerm(row.opis, searchTerm)}</td>
            <td>${highlightSearchTerm(row.vrstaizlozbe, searchTerm)}</td>
            <td>${formatDate(row.datumpocetka)}</td>
            <td>${formatDate(row.datumzavrsetka)}</td>
            <td>${highlightSearchTerm(row.adresa, searchTerm)}</td>
            <td>${highlightSearchTerm(row.webstranica, searchTerm)}</td>
            <td>${highlightSearchTerm(row.mail, searchTerm)}</td>
            <td>${highlightSearchTerm(row.telefon, searchTerm)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function highlightSearchTerm(text, searchTerm) {
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'gi'); // 'gi' for global and case-insensitive matching
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
    return text;
}