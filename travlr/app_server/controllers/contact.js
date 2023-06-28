/* GET contact */

const contact = (req, res) => {
    res.render('contact', {title: 'contact' });
};

module.exports = {
    contact
};