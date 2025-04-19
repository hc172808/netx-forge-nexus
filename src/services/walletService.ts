import { toast } from "sonner";
import * as bip39 from 'bip39';
import CryptoJS from 'crypto-js';

// Types for wallet data
export interface Wallet {
  id: string;
  name: string;
  address: string;
  privateKey: string; // Encrypted
  publicKey: string;
  seedPhrase: string; // Encrypted
  balance: string;
  walletType: 'secret-phrase' | 'swift';
  isAdmin: boolean;
  dateCreated: string;
  email?: string;
  username?: string;
}

// Storage keys
const WALLETS_STORAGE_KEY = 'netx-wallets';
const ACTIVE_WALLET_KEY = 'netx-active-wallet';
const FIRST_USER_CREATED = 'netx-first-user-created';

// Get wallets from local storage
export const getWallets = (): Wallet[] => {
  const walletsJson = localStorage.getItem(WALLETS_STORAGE_KEY);
  return walletsJson ? JSON.parse(walletsJson) : [];
};

// Save wallets to local storage
export const saveWallets = (wallets: Wallet[]): void => {
  localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(wallets));
};

// Get active wallet
export const getActiveWallet = (): Wallet | null => {
  const wallets = getWallets();
  const activeWalletId = localStorage.getItem(ACTIVE_WALLET_KEY);
  
  if (!activeWalletId && wallets.length > 0) {
    // If no active wallet is set but wallets exist, set the first one as active
    localStorage.setItem(ACTIVE_WALLET_KEY, wallets[0].id);
    return wallets[0];
  }
  
  return wallets.find(wallet => wallet.id === activeWalletId) || null;
};

// Set active wallet
export const setActiveWallet = (walletId: string): void => {
  localStorage.setItem(ACTIVE_WALLET_KEY, walletId);
};

// Generate a random seed phrase
export const generateSeedPhrase = (): string => {
  return bip39.generateMnemonic();
};

// Encrypt sensitive data
export const encryptData = (data: string, password: string): string => {
  return CryptoJS.AES.encrypt(data, password).toString();
};

// Decrypt sensitive data
export const decryptData = (encryptedData: string, password: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Validate seed phrase
export const validateSeedPhrase = (phrase: string): boolean => {
  return bip39.validateMnemonic(phrase);
};

// Generate a wallet address from seed phrase or randomly for Swift wallet
export const generateWalletAddress = (seedPhrase?: string): { address: string, publicKey: string, privateKey: string } => {
  // This is a simplified implementation
  // In a real app, you would use a proper library to derive keys from the seed phrase
  
  let privateKey: string;
  
  if (seedPhrase) {
    // Derive from seed phrase (simplified)
    const hash = CryptoJS.SHA256(seedPhrase);
    privateKey = hash.toString();
  } else {
    // Generate random for Swift wallet
    privateKey = CryptoJS.lib.WordArray.random(32).toString();
  }
  
  // Generate public key from private key (simplified)
  const publicKey = CryptoJS.SHA256(privateKey).toString();
  
  // Generate address from public key (simplified)
  const address = '0x' + publicKey.substring(0, 40);
  
  return { address, publicKey, privateKey };
};

// Create a new wallet
export const createWallet = (
  walletType: 'secret-phrase' | 'swift', 
  password: string, 
  name = '',
  seedPhrase = '',
  email = '',
  username = ''
): Wallet | null => {
  try {
    // Generate a new seed phrase if not provided and if wallet type is 'secret-phrase'
    const phrase = walletType === 'secret-phrase' 
      ? (seedPhrase || generateSeedPhrase()) 
      : generateSeedPhrase(); // Swift wallets still have a phrase but it's auto-generated
      
    // Check if this is the first wallet ever created
    const isFirstWallet = localStorage.getItem(FIRST_USER_CREATED) === null;
    
    // Generate wallet keys
    const { address, publicKey, privateKey } = generateWalletAddress(phrase);
    
    // If this is the first wallet, mark it as created
    if (isFirstWallet) {
      localStorage.setItem(FIRST_USER_CREATED, 'true');
    }
    
    // Create wallet object
    const newWallet: Wallet = {
      id: Date.now().toString(),
      name: name || `${walletType === 'secret-phrase' ? 'Seed Phrase' : 'Swift'} Wallet ${Math.floor(Math.random() * 1000)}`,
      address,
      privateKey: encryptData(privateKey, password),
      publicKey,
      seedPhrase: encryptData(phrase, password),
      balance: '0.00',
      walletType,
      isAdmin: isFirstWallet, // First wallet is always admin
      dateCreated: new Date().toISOString(),
      email: email,
      username: username
    };
    
    // Save the wallet
    const wallets = getWallets();
    const updatedWallets = [...wallets, newWallet];
    saveWallets(updatedWallets);
    
    // Set as active if it's the first one
    if (wallets.length === 0) {
      setActiveWallet(newWallet.id);
    }
    
    return newWallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    return null;
  }
};

// Import a wallet using seed phrase
export const importWalletWithSeedPhrase = (
  seedPhrase: string, 
  password: string, 
  name = ''
): Wallet | null => {
  try {
    // Validate the seed phrase
    if (!validateSeedPhrase(seedPhrase)) {
      throw new Error('Invalid seed phrase');
    }
    
    // Check if a wallet with this seed phrase already exists
    const wallets = getWallets();
    
    // Generate wallet keys
    const { address, publicKey, privateKey } = generateWalletAddress(seedPhrase);
    
    // Check if a wallet with this address already exists
    if (wallets.some(wallet => wallet.address === address)) {
      throw new Error('Wallet with this seed phrase already exists');
    }
    
    // Create wallet object
    const newWallet: Wallet = {
      id: Date.now().toString(),
      name: name || `Imported Wallet ${Math.floor(Math.random() * 1000)}`,
      address,
      privateKey: encryptData(privateKey, password),
      publicKey,
      seedPhrase: encryptData(seedPhrase, password),
      balance: '0.00',
      walletType: 'secret-phrase',
      isAdmin: false, // Imported wallets are never admin
      dateCreated: new Date().toISOString()
    };
    
    // Save the wallet
    const updatedWallets = [...wallets, newWallet];
    saveWallets(updatedWallets);
    
    return newWallet;
  } catch (error) {
    console.error('Error importing wallet:', error);
    return null;
  }
};

// Delete a wallet
export const deleteWallet = (walletId: string): boolean => {
  try {
    const wallets = getWallets();
    const updatedWallets = wallets.filter(wallet => wallet.id !== walletId);
    
    // If the active wallet is being deleted, set a new active wallet
    const activeWallet = getActiveWallet();
    if (activeWallet && activeWallet.id === walletId && updatedWallets.length > 0) {
      setActiveWallet(updatedWallets[0].id);
    }
    
    saveWallets(updatedWallets);
    return true;
  } catch (error) {
    console.error('Error deleting wallet:', error);
    return false;
  }
};

// Update wallet details
export const updateWallet = (walletId: string, updates: Partial<Wallet>): Wallet | null => {
  try {
    const wallets = getWallets();
    const walletIndex = wallets.findIndex(wallet => wallet.id === walletId);
    
    if (walletIndex === -1) {
      throw new Error('Wallet not found');
    }
    
    // Create updated wallet
    const updatedWallet = { ...wallets[walletIndex], ...updates };
    const updatedWallets = [...wallets];
    updatedWallets[walletIndex] = updatedWallet;
    
    saveWallets(updatedWallets);
    return updatedWallet;
  } catch (error) {
    console.error('Error updating wallet:', error);
    return null;
  }
};

// Get wallet balance (in a real app, this would call an API)
export const getWalletBalance = async (address: string): Promise<string> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Random balance between 1000 and 10000
      const balance = (Math.random() * 9000 + 1000).toFixed(2);
      resolve(balance);
    }, 500);
  });
};

// Check if user is admin
export const isUserAdmin = (): boolean => {
  const activeWallet = getActiveWallet();
  return activeWallet?.isAdmin || false;
};
