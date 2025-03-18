import { describe, it, expect } from "vitest";
import { decrypt, encrypt } from "./encryption";

const TEST_KEY = "my_super_secret_key_with_32_chars!"; // Asegúrate de que tenga 32 caracteres

describe("AES-GCM Encryption", () => {
  it("should encrypt and decrypt a text correctly", async () => {
    const originalText = "Hello, world!";
    const encryptedText = await encrypt(originalText, TEST_KEY);
    const decryptedText = await decrypt(encryptedText, TEST_KEY);

    expect(decryptedText).toBe(originalText);
  });

  it("should produce different encryption outputs for the same text", async () => {
    const originalText = "Hello, world!";
    const encrypted1 = await encrypt(originalText, TEST_KEY);
    const encrypted2 = await encrypt(originalText, TEST_KEY);

    expect(encrypted1).not.toBe(encrypted2); // Debería ser diferente debido al IV aleatorio
  });

  it("should fail to decrypt with an incorrect key", async () => {
    const originalText = "Hello, world!";
    const encryptedText = await encrypt(originalText, TEST_KEY);

    await expect(decrypt(encryptedText, "wrong_key_that_is_32_chars_long")).rejects.toThrow();
  });

  it("should throw an error for a short key", async () => {
    await expect(encrypt("Test", "short_key")).rejects.toThrow("Key must be at least 32 characters long");
  });
});
