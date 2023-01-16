import clearInputs from "./clearInputs";
import clearState from "./clearState";
const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            inputs = document.querySelectorAll('[data-input]'),
            btnCalc = document.querySelector('.popup_calc_button'),
            btnCalcProfile = document.querySelector('.popup_calc_profile_button'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if(e.target.classList.contains('glazing_price_btn')) {
                    if(e.target.parentNode.previousElementSibling.classList.contains("glazing_warm")) {
                         document.querySelector('[data-check = "warm"]').checked = true;
                         state.profile = "Теплое";
                     } else {
                         document.querySelector('[data-check = "cold"]').checked = true;
                         state.profile = "Холодное";
                    }
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        inputs.forEach(input => {
            btnCalc.setAttribute('disabled', 'true');
            btnCalcProfile.setAttribute('disabled', 'true');

            input.addEventListener('input', () => {
                if(!state.width || !state.height) {
                    btnCalc.setAttribute('disabled', 'true');
                    btnCalc.classList.remove('button--active');
                } else {
                    btnCalc.removeAttribute('disabled');
                    btnCalc.classList.add('button--active');
                }

                if(!state.profile) {
                    btnCalcProfile.setAttribute('disabled', 'true');
                    btnCalcProfile.classList.remove('button--active');
                } else {
                    btnCalcProfile.removeAttribute('disabled');
                    btnCalcProfile.classList.add('button--active');
                }
            }); 
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            clearInputs('input');
            clearState(state);
            btnCalc.setAttribute('disabled', 'true');
            btnCalcProfile.setAttribute('disabled', 'true');
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time)
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '20px';
        div.style.height = '20px';
        div.style.position = 'absolute';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove;
        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup_engineer', 60000);
};
export default modals;