document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#feedback-form');
    const successPopup = document.getElementById('success-popup');
    const homeButton = document.getElementById('home-button');
    const tekrarButton = document.getElementById('tekrar-degerlendir');
    const googleReviewButton = document.getElementById('google-review-button');
    const ratingWarning = document.getElementById('rating-warning');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Formun varsayılan submit işlemini engelle

        // Genel deneyim puanını kontrol et
        const rating = document.querySelector('button.rating-btn.selected')?.dataset.value;
        if (!rating) {
            ratingWarning.classList.remove('hidden'); // Uyarıyı göster
            return;
        } else {
            ratingWarning.classList.add('hidden'); // Uyarıyı gizle
        }

        // Kriterlerin seçimlerini kontrol et ve değerlerini al
        const criteriaData = {
            'Lezzet': '',
            'Ortam': '',
            'Personel': '',
            'Servis': '',
            'Temizlik': ''
        };

        document.querySelectorAll('.criteria').forEach(criteria => {
            const name = criteria.querySelector('.criteria-buttons button.selected')?.getAttribute('name');
            const value = criteria.querySelector('.criteria-buttons button.selected')?.dataset.value;
            if (name && value) {
                criteriaData[name] = value;
            }
        });

        // FormData nesnesi oluşturuluyor
        const formData = new FormData(form);
        formData.append('general_experience', rating);
        formData.append('Lezzet', criteriaData['Lezzet'] || '');
        formData.append('Ortam', criteriaData['Ortam'] || '');
        formData.append('Personel', criteriaData['Personel'] || '');
        formData.append('Servis', criteriaData['Servis'] || '');
        formData.append('Temizlik', criteriaData['Temizlik'] || '');
        formData.append('additional_thoughts', form.querySelector('textarea').value);

        // Başarı pop-up'ını hemen göster
        successPopup.classList.remove('hidden');

        // Form verilerini Google Sheets'e gönder
        fetch(scriptURL, { method: 'POST', body: formData })
            .catch(error => console.error('Error!', error.message));

        // Kriterlerin seçimlerini kontrol et
        const criteriaButtons = document.querySelectorAll('.criteria-buttons button.selected');
        const allCriteriaFirstButtonSelected = Array.from(criteriaButtons).every(btn => 
            (btn.dataset.value === '5' && btn.parentElement.parentElement.querySelector('.criteria-title').textContent.includes('Lezzet')) ||
            (btn.dataset.value === '5' && btn.parentElement.parentElement.querySelector('.criteria-title').textContent.includes('Ortam')) ||
            (btn.dataset.value === '5' && btn.parentElement.parentElement.querySelector('.criteria-title').textContent.includes('Personel')) ||
            (btn.dataset.value === '5' && btn.parentElement.parentElement.querySelector('.criteria-title').textContent.includes('Servis')) ||
            (btn.dataset.value === '5' && btn.parentElement.parentElement.querySelector('.criteria-title').textContent.includes('Temizlik'))
        );

        if (rating === '5' && allCriteriaFirstButtonSelected) {
            googleReviewButton.classList.remove('hidden');
        } else {
            googleReviewButton.classList.add('hidden');
        }
    });

    tekrarButton.addEventListener('click', () => {
        // Ana sayfaya yönlendirme işlemi
        window.location.href = 'https://frescomakarna.com/anket.html'; // Ankete geri döner
    });

    homeButton.addEventListener('click', () => {
        // Ana sayfaya yönlendirme işlemi
        window.location.href = 'https://frescomakarna.com/'; // Ana sayfanızın URL'sini buraya yazın
    });

    googleReviewButton.addEventListener('click', () => {
        // Google değerlendirme sayfasına yönlendirme işlemi
        window.open('https://search.google.com/local/writereview?placeid=ChIJhfWYE54tuRQRavQi8Qzomzs'); // Buraya Google değerlendirme URL'nizi ekleyin
    });

    // Rating ve criteria butonlarının seçilme işlemleri
    document.querySelectorAll('.rating-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.rating-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    document.querySelectorAll('.criteria-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.querySelectorAll('.criteria-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycby8lsa8V79kKlt2EeOp_NPzKeBmXORbwIdkWGrbwWnHTvqK6eq76VyzmWN9DHNcy4f2hQ/exec';
