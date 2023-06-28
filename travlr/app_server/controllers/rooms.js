/* GET rooms */

const rooms = (req, res) => {
    res.render('rooms', {title: 'Rooms' });
};

module.exports = {
    rooms
};