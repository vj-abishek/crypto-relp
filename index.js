import crypto from 'crypto';

const decrypt = (SharedSecret, encryptedMessage) => {

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

    let decrypt = Decipher.update(bobEncrypted, 'hex', 'utf8');
    decrypt += Decipher.final('utf8');

    return decrypt;
}

export default decrypt;