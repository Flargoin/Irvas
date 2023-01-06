const images = () => {
    const imgPopup = document.createElement('div'),
          works = document.querySelector('.works'),
          bigImg = document.createElement('img');

    imgPopup.classList.add('popup');
    works.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    if(document.body.clientWidth <= 768) {
        bigImg.classList.add('col-xs-10');
    }

    imgPopup.appendChild(bigImg);

    works.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        
        if(target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path);
        }

        if(target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow = '';
        }  
    });
}

export default images;