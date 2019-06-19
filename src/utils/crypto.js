import forge from 'node-forge';

const base64Std = '+/';
const base64URL = '-_';

const escapeRegExp = text => text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

function encodeURL(text) {
  return Array.prototype.reduce.call(
    base64Std,
    (encoded, char, i) => encoded.replace(new RegExp(escapeRegExp(char), 'g'), base64URL[i]),
    text
  );
}

function decodeURL(text) {
  return Array.prototype.reduce.call(
    base64URL,
    (decoded, char, i) => decoded.replace(new RegExp(escapeRegExp(char), 'g'), base64Std[i]),
    text
  );
}

export function encrypt(plainText, publicKeyPem) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  return encodeURL(
    forge.util.encode64(
      publicKey.encrypt(plainText, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      })
    )
  );
}

export function decrypt(cipherText, privateKeyPem) {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  return privateKey.decrypt(forge.util.decode64(decodeURL(cipherText)), 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
}
