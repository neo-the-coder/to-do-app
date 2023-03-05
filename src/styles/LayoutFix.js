export const setScrollbarWidth = () => {
    document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.body.clientWidth}px`);
}

export const modalON = () => {
    document.body.classList.add("scrollbar-fix-body")
    document.getElementById("add-button").classList.add("scrollbar-fix-button");
};

export const modalOFF = () => {
    document.body.classList.remove("scrollbar-fix-body")
    document.getElementById("add-button").classList.remove("scrollbar-fix-button");
};