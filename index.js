const crypto = require('crypto');

const Decrypt = (SharedSecret, encryptedMessage) => {

    const bobPayload = Buffer.from(encryptedMessage, 'base64').toString('hex');

    const bobIv = bobPayload.substr(0, 32);
    const bobEncrypted = bobPayload.substr(32, bobPayload.length - 32 - 32);
    const bobAuthtag = bobPayload.substr(bobPayload.length - 32, 32);

    const Decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(SharedSecret, 'hex'),
        Buffer.from(bobIv, 'hex'),
    );

    Decipher.setAuthTag(Buffer.from(bobAuthtag, 'hex'));

    let decrypted = Decipher.update(bobEncrypted, 'hex', 'utf8');
    decrypted += Decipher.final('utf8');

    return decrypted;
}

module.exports = Decrypt;