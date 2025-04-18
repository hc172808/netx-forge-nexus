
import CryptoJS from 'crypto-js';

// AES encryption for data at rest
export const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

// AES decryption for data at rest
export const decryptData = (encryptedData: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// SHA256 hashing (used for transaction verification)
export const hashData = (data: string): string => {
  return CryptoJS.SHA256(data).toString();
};

// HMAC signature generation for message authentication
export const signMessage = (message: string, privateKey: string): string => {
  return CryptoJS.HmacSHA256(message, privateKey).toString();
};

// Verify a signature to confirm message authenticity
export const verifySignature = (
  message: string, 
  signature: string, 
  publicKey: string
): boolean => {
  const computedSignature = CryptoJS.HmacSHA256(message, publicKey).toString();
  return computedSignature === signature;
};

// Generate random salt for password hashing
export const generateSalt = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

// Hash passwords with salt for secure storage
export const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 }).toString();
};

// Secure random value generation for cryptographic operations
export const generateSecureRandom = (byteLength = 32): string => {
  return CryptoJS.lib.WordArray.random(byteLength).toString();
};
