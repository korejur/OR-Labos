function downloadCsv() {
    const table = document.getElementById('data-table');
    const rows = table.querySelectorAll('tbody tr');
    const csvData = [];

    const header = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText);
    csvData.push(header.join(','));

    rows.forEach(row => {
        const rowData = Array.from(row.querySelectorAll('td')).map(td => td.innerText);
        csvData.push(rowData.join(','));
    });

    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], {
        type: 'text/csv'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'muzeji_Zagreb.csv';
    a.click();
}

function downloadJson() {
    const table = document.getElementById('data-table');
    const rows = table.querySelectorAll('tbody tr');
    const jsonData = [];

    rows.forEach(row => {
        const muzejData = {};
        const izlozbeData = [];

        muzejData['mail'] = row.querySelector('td:nth-child(9)').textContent;
        muzejData['adresa'] = row.querySelector('td:nth-child(7)').textContent;
        muzejData['telefon'] = row.querySelector('td:nth-child(10)').textContent;
        muzejData['nazivmuzeja'] = row.querySelector('td:nth-child(1)').textContent;
        muzejData['webstranica'] = row.querySelector('td:nth-child(8)').textContent;

        const izlozbaData = {};
        izlozbaData['opis'] = row.querySelector('td:nth-child(3)').textContent;
        izlozbaData['datumpocetka'] = row.querySelector('td:nth-child(5)').textContent;
        izlozbaData['nazivizlozbe'] = row.querySelector('td:nth-child(2)').textContent;
        izlozbaData['vrstaizlozbe'] = row.querySelector('td:nth-child(4)').textContent;
        izlozbaData['datumzavrsetka'] = row.querySelector('td:nth-child(6)').textContent;

        izlozbeData.push(izlozbaData);

        muzejData['izlozbe'] = izlozbeData;
        jsonData.push({
            'muzej': muzejData
        });
    });

    const jsonContent = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonContent], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'muzeji_Zagreb.json';
    a.click();
}

