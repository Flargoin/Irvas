const tabs = (parentSelector, tabSelector, contentSelector, state, activeClass, display = 'block') => {
    const parent = document.querySelector(parentSelector),
          tabs = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector),
          windowType = document.querySelector('#view_type');

    function hideTabsContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabsContent(i = 0) {
        content[i].style.display = display;
        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabsContent();

    parent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && (target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
            tabs.forEach((item, i) => {
                if(target === item || target.parentNode === item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
        if(target.classList.contains('glazing_block') || target.parentNode.classList.contains('glazing_block')) {
            tabs.forEach((item, i) => {
                if(target === item || target.parentNode === item) {
                    windowType.selectedIndex = i;
                    state.type = windowType.value;
                }
            });
        }
    });
}

export default tabs;
