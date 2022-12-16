
const Message = require('../models/message');

const getChat = async (req, res) => {
    const myId = req.uid;
    const messagesFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{ to: myId, for: messagesFrom }, { to: messagesFrom, for: myId }]
    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({
        ok: true,
        last30
    })
}

module.exports = {
    getChat,
}