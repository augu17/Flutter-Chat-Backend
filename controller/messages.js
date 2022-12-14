
const Message = require('../models/message');

const getChat = async (req, res) => {
    const myId = req.uid;
    const messagefor = req.params.for;

    const last30 = await Message.find({
        $or: [{ to: myId, for: messagefor }, { to: messagefor, for: myId }]
    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({
        ok: true,
        last30
    })
}

module.exports = {
    getChat,
}