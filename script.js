function addImage() {
    const imageUpload = document.getElementById('imageUpload');
    const winnerName = document.getElementById('winnerName').value;
    const winnerLink = document.getElementById('winnerLink').value;

    if (imageUpload.files && imageUpload.files[0] && winnerName && winnerLink) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = {
                src: e.target.result,
                name: winnerName,
                link: winnerLink
            };
            saveImage(imageData);
            displayImage(imageData);
        }
        reader.readAsDataURL(imageUpload.files[0]);
        
        // Clear inputs after adding the image
        document.getElementById('imageUpload').value = '';
        document.getElementById('winnerName').value = '';
        document.getElementById('winnerLink').value = '';
    } else {
        alert('Por favor, sube una imagen y proporciona el nombre y el enlace del ganador.');
    }
}

function saveImage(imageData) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(imageData);
    localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(imageData => {
        displayImage(imageData);
    });
}

function displayImage(imageData) {
    const gallery = document.getElementById('gallery');
    
    const div = document.createElement('div');
    div.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = imageData.src;
    div.appendChild(img);

    const a = document.createElement('a');
    a.href = imageData.link;
    a.textContent = imageData.name;
    a.target = "_blank";
    div.appendChild(a);

    gallery.appendChild(div);
}
