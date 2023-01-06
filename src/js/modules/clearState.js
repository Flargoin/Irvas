const clearState = (state) => {
    const windowType = document.querySelector('#view_type'),
    tabsForm = document.querySelectorAll('.balcon_icons_img'),
    contentForm = document.querySelectorAll('.big_img > img');


    function hideTabsForms() {
        contentForm.forEach(item => {
            item.style.display = 'none';
        });

        tabsForm.forEach(tab => {
            tab.classList.remove('do_image_more');
        });
    }

    function showTabsForms(i = 0) {
        contentForm[i].style.display = 'inline-block';
        tabsForm[i].classList.add('do_image_more');
        state.form = i;
    }

    Object.keys(state).forEach(key => {
        delete state[key];
        hideTabsForms();
        showTabsForms();
        state.type = windowType.value;
    });
}
export default clearState;