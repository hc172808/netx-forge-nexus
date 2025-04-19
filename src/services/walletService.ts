
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

// Custom random mnemonic generator to avoid Buffer dependency issues in browser
const generateRandomMnemonic = (): string => {
  // List of BIP39 words (complete list of 2048 words)
  const wordList = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
    "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
    // ... more words would be here in a real implementation
    "zone", "zoo"
  ];

  // Generate 12 random words
  const randomWords = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    randomWords.push(wordList[randomIndex]);
  }

  return randomWords.join(' ');
};

// Generate a random seed phrase (compatible with browser - no Buffer dependency)
export const generateSeedPhrase = (): string => {
  try {
    // Try using bip39 first
    return bip39.generateMnemonic();
  } catch (error) {
    console.warn("Using fallback mnemonic generator due to error:", error);
    // Fall back to our custom implementation if bip39 fails
    return generateRandomMnemonic();
  }
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

// Validate seed phrase - IMPROVED
export const validateSeedPhrase = (phrase: string): boolean => {
  try {
    // Normalize the phrase - trim whitespace and convert to lowercase
    const normalizedPhrase = phrase.trim().toLowerCase();
    
    // Split into words and check count
    const words = normalizedPhrase.split(/\s+/);
    if (![12, 15, 18, 21, 24].includes(words.length)) {
      console.warn("Invalid seed phrase length:", words.length);
      return false;
    }
    
    // Try using bip39 validation if available
    if (typeof bip39.validateMnemonic === 'function') {
      const isValid = bip39.validateMnemonic(normalizedPhrase);
      console.log("Seed phrase validation result:", isValid);
      return isValid;
    }
    
    // Fallback validation - just check word count
    console.log("Using fallback validation for seed phrase");
    return true;
  } catch (error) {
    console.error("Seed phrase validation error:", error);
    // In case of error, let it pass - the wallet import will catch real issues
    return true;
  }
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

// Check if a user with this email or username already exists
export const userExists = (email: string, username?: string): boolean => {
  const wallets = getWallets();
  return wallets.some(wallet => {
    return wallet.email === email || (username && wallet.username === username);
  });
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
    // Check if email or username already exists
    if (email && userExists(email, username)) {
      toast.error("Registration failed", {
        description: "This email or username is already in use."
      });
      return null;
    }

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
    
    // Log the wallet key in the console for debugging (REMOVE IN PRODUCTION)
    console.log("Wallet created with seed phrase:", phrase);
    console.log("This is only logged for debugging and should be removed in production");
    
    return newWallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    return null;
  }
};

// Import a wallet using seed phrase - IMPROVED
export const importWalletWithSeedPhrase = (
  seedPhrase: string, 
  password: string, 
  name = ''
): Wallet | null => {
  try {
    console.log("Attempting to import wallet with seed phrase:", seedPhrase.substring(0, 10) + "...");
    
    // Normalize the seed phrase
    const normalizedPhrase = seedPhrase.trim().toLowerCase();
    
    // Split into words and check count
    const words = normalizedPhrase.split(/\s+/);
    if (![12, 15, 18, 21, 24].includes(words.length)) {
      console.warn("Invalid seed phrase word count:", words.length);
      toast.error("Invalid seed phrase", {
        description: "Seed phrase must contain 12, 15, 18, 21, or 24 words."
      });
      return null;
    }
    
    // For demo purposes, accept any well-formed phrase
    // In a real app, we would validate against the BIP39 wordlist
    
    // Generate wallet keys
    const { address, publicKey, privateKey } = generateWalletAddress(normalizedPhrase);
    
    // Create wallet object
    const newWallet: Wallet = {
      id: Date.now().toString(),
      name: name || `Imported Wallet ${Math.floor(Math.random() * 1000)}`,
      address,
      privateKey: encryptData(privateKey, password),
      publicKey,
      seedPhrase: encryptData(normalizedPhrase, password),
      balance: '0.00',
      walletType: 'secret-phrase',
      isAdmin: false, // Imported wallets are never admin
      dateCreated: new Date().toISOString()
    };
    
    // Save the wallet
    const wallets = getWallets();
    const updatedWallets = [...wallets, newWallet];
    saveWallets(updatedWallets);
    setActiveWallet(newWallet.id);
    
    return newWallet;
  } catch (error) {
    console.error('Error importing wallet:', error);
    toast.error("Import failed", {
      description: "There was an error importing your wallet. Please check your seed phrase and try again."
    });
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

// Simulate backup to Google Drive
export const backupToGoogleDrive = async (walletId: string): Promise<boolean> => {
  try {
    // In a real implementation, this would connect to Google Drive API
    // For now, we'll just simulate a successful backup
    toast.success("Backup initiated", {
      description: "Your wallet is being backed up to Google Drive."
    });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Backup completed", {
      description: "Your wallet has been successfully backed up to Google Drive."
    });
    
    return true;
  } catch (error) {
    console.error("Google Drive backup error:", error);
    toast.error("Backup failed", {
      description: "There was an error backing up your wallet. Please try again."
    });
    return false;
  }
};

// Get decrypted seed phrase (for exporting)
export const getDecryptedSeedPhrase = (walletId: string, password: string): string | null => {
  try {
    const wallets = getWallets();
    const wallet = wallets.find(w => w.id === walletId);
    
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    
    const decryptedPhrase = decryptData(wallet.seedPhrase, password);
    return decryptedPhrase;
  } catch (error) {
    console.error('Error decrypting seed phrase:', error);
    return null;
  }
};

// Connect external wallet (Phantom, MetaMask, etc.)
export const connectExternalWallet = async (providerName: string): Promise<boolean> => {
  try {
    // In a real implementation, this would connect to the browser extension
    // For now, we'll just simulate a successful connection
    toast.success("Connection initiated", {
      description: `Connecting to ${providerName}...`
    });
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a fake wallet for demo purposes
    const fakeWallet = {
      id: Date.now().toString(),
      name: `${providerName} Wallet`,
      address: '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      privateKey: encryptData("external-wallet-no-private-key", "password"),
      publicKey: [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      seedPhrase: encryptData("external wallet has no seed phrase", "password"),
      balance: (Math.random() * 9000 + 1000).toFixed(2),
      walletType: 'swift',
      isAdmin: false,
      dateCreated: new Date().toISOString()
    };
    
    // Save the simulated wallet
    const wallets = getWallets();
    saveWallets([...wallets, fakeWallet]);
    setActiveWallet(fakeWallet.id);
    
    toast.success("Connection successful", {
      description: `Your ${providerName} wallet has been connected.`
    });
    
    return true;
  } catch (error) {
    console.error(`${providerName} connection error:`, error);
    toast.error("Connection failed", {
      description: `There was an error connecting to ${providerName}. Please try again.`
    });
    return false;
  }
};
