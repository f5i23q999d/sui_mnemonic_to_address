const nacl = require('tweetnacl/nacl');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const blake2b = require('blake2b');

const TEST_MNEMONIC = 'cost leave absorb violin blur crack attack pig rice glide orient employ';


const seed = bip39.mnemonicToSeedSync(TEST_MNEMONIC, "");
const path = `m/44'/784'/0'/0'/0'`;
const keypair = nacl.sign.keyPair.fromSeed(derivePath(path, seed.toString("hex")).key);
const rawBytes = keypair.publicKey;
const suiBytes = new Uint8Array(keypair.publicKey.length + 1);
suiBytes.set([0]);
suiBytes.set(rawBytes, 1);
const hash = blake2b(32).update(suiBytes);
const _hash = hash.digest();
const hexes = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
let hex = '';
for (let i = 0; i < _hash.length; i++) {
    hex += hexes[_hash[i]];
}
const SUI_ADDRESS_LENGTH = 32;
const slicedHash = hex.slice(0, SUI_ADDRESS_LENGTH * 2);
let address = slicedHash.toLowerCase();
address=`0x${address.padStart(SUI_ADDRESS_LENGTH * 2, '0')}`;
console.log(address);
