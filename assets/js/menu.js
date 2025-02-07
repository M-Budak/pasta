document.addEventListener("DOMContentLoaded", function() {
    let SHEET_ID = '1HHlDEC0XFvWjIrkWeBsEee4NsRR469msmezS69htQwQ';
    let SHEET_TITLE = 'Database';
    let SHEET_RANGE = 'A1:D30';
    let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        console.log(rep); // Yanıtı kontrol etmek için

        // JSON verisini parse et
        let jsonData = rep.substr(47).slice(0, -2);
        let data = JSON.parse(jsonData);
        console.log(data); // JSON verisini kontrol etmek için

        // Sadece alfredo_small öğesini işlemek için
        let item = 'alfredo_small';

        // Menü adı
        let nameElement = document.getElementById(item + '_name');
        if (nameElement) {
            nameElement.innerHTML = data.table.rows[0].c[1].v;
        }

        // Menü içeriği
        let descriptionElement = document.getElementById(item + '_description');
        if (descriptionElement) {
            descriptionElement.innerHTML = data.table.rows[0].c[2].v;
        }

        // Menü fiyatı
        let priceElement = document.getElementById(item + '_price');
        if (priceElement) {
            priceElement.innerHTML = data.table.rows[0].c[3].v + " TL";
        }
    })
    .catch(error => console.error('Error fetching data:', error));
});
