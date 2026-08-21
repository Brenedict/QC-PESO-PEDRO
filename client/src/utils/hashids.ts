import Hashids from "hashids";

const salt = import.meta.env?.VITE_HASHIDS_SALT || process.env.VITE_HASHIDS_SALT || "some salt value";

const hashids = new Hashids(salt);

const textEncoder = new TextEncoder();

export const encode = (id: string | number) => {
    // Convert the input to a string, encode to bytes, then map each byte to hex
    const bytes = textEncoder.encode(String(id));
    const hexValue = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashids.encodeHex(hexValue);
};

export const decode = (hex: string | undefined) => {
    if (!hex) {
        return null;
    }

    const decodedHex = hashids.decodeHex(hex);

    // Convert hex back to bytes, then decode back to a string
    const bytes = new Uint8Array(decodedHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
    return new TextDecoder().decode(bytes);
};
