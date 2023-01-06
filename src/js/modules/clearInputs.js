const clearInputs = (inputsSelector) => {
    const inputs = document.querySelectorAll(inputsSelector);

     inputs.forEach(item => {
        if(item.getAttribute('type') === 'text') {
            item.value = '';
        }  
        
        if (item.getAttribute('type') === 'checkbox') {
            item.checked = false;
        }
    });
}

export default clearInputs;