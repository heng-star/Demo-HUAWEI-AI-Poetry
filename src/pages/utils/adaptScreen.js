export const adaptScreen = (part = 40) => {
    let fontSize = document.documentElement.clientWidth / part;
    document.documentElement.style.fontSize = fontSize + 'px';
}