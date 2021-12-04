const wait = (timing) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timing);
    });
}

module.exports = {
    wait
}
