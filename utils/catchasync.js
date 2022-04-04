module.exports = (fn) => {
    return (req, res) => {
        fn(req, res).catch((err) => console.error(err));
    };
};
