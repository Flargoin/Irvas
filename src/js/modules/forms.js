import checkNumInputs from "./checkNumInputs";
import clearInputs from "./clearInputs";
import clearState from "./clearState";

const forms = (state) => {
    const forms = document.querySelectorAll('form'),
          btnCalc = document.querySelector('.popup_calc_button'),
          btnCalcProfile = document.querySelector('.popup_calc_profile_button');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage); 

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
            .then((res) => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                setTimeout(() => {
                    clearInputs('input');
                    clearState(state);
                    btnCalc.disabled = 'true';
                    btnCalcProfile.disabled = 'true';
                    statusMessage.remove();
                    document.querySelector('.popup_calc_end').style.display = 'none';
                    document.body.style.overflow = '';
                    document.body.style.marginRight = `0px`;
                }, 3000)
            });
        });
    });
}

export default forms; 