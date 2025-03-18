const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function getKey(key: string): Promise<CryptoKey> {
  const keyBytes = encoder.encode(key);
  if (keyBytes.length < 32) {
    throw new Error("Key must be at least 32 characters long");
  }

  return await crypto.subtle.importKey(
    "raw",
    keyBytes.slice(0, 32), // Forzamos a 256 bits (32 bytes)
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
}

/**
 * Encrypts a text using AES-GCM.
 * @param text - Text to encrypt
 * @param key - Key to encrypt the text
 * @returns Encrypted text in base64
 */
export async function encrypt(text: string, key: string): Promise<string> {
  const keyMaterial = await getKey(key);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    keyMaterial,
    encoder.encode(text),
  );

  // Convertir a Base64 seguro
  const buffer = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
  return btoa(String.fromCharCode(...buffer));
}

/**
 * Decrypts an encrypted text using AES-GCM.
 * @param encryptedText - Encrypted text in base64
 * @param key - Key to decrypt the text
 * @returns Decrypted text
 */
export async function decrypt(encryptedText: string, key: string): Promise<string> {
  const keyMaterial = await getKey(key);
  const data = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));

  const iv = data.slice(0, 12);
  const encryptedData = data.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    keyMaterial,
    encryptedData,
  );

  return decoder.decode(decrypted);
}
