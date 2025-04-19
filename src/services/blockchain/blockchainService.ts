import { Block, ConsensusService, ConsensusType, Transaction } from './consensusService';
import { hashData, signMessage } from '../security/encryptionService';

export class BlockchainService {
  private chain: Block[] = [];
  private pendingTransactions: Transaction[] = [];
  private consensusService: ConsensusService;
  private maxBlockSize: number = 1000; // Maximum number of transactions per block
  private maxPendingTransactions: number = 10000; // Maximum pending transactions
  private nodePublicKey: string;
  private nodePrivateKey: string;
  
  constructor(
    nodePublicKey: string, 
    nodePrivateKey: string,
    consensusType: ConsensusType = ConsensusType.PROOF_OF_WORK
  ) {
    this.nodePublicKey = nodePublicKey;
    this.nodePrivateKey = nodePrivateKey;
    
    // Initialize consensus service
    this.consensusService = new ConsensusService({
      type: consensusType,
      blockTime: 10, // 10 seconds block time
      difficultyTarget: 4, // for PoW
      minStake: 100, // for PoS
      authorizedValidators: [nodePublicKey] // for PoA
    });
    
    // Create genesis block
    this.createGenesisBlock();
  }
  
  // Create the first block in the chain
  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: '0',
      nonce: 0,
      validator: this.nodePublicKey,
      signature: ''
    };
    
    // Calculate the proper hash for genesis block
    genesisBlock.hash = this.calculateBlockHash(genesisBlock);
    
    // Sign the block
    genesisBlock.signature = this.signBlock(genesisBlock);
    
    // Add to chain
    this.chain.push(genesisBlock);
  }
  
  // Get the latest block in the chain
  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
  
  // Add a new transaction to pending transactions
  public addTransaction(transaction: Omit<Transaction, 'id' | 'signature'>): Transaction | null {
    if (this.pendingTransactions.length >= this.maxPendingTransactions) {
      return null; // Transaction pool is full
    }
    
    // Create transaction with ID and signature
    const newTransaction: Transaction = {
      ...transaction,
      id: hashData(JSON.stringify(transaction) + Date.now()),
      signature: ''
    };
    
    // Sign transaction if we are the sender
    if (transaction.from === this.nodePublicKey) {
      newTransaction.signature = signMessage(
        JSON.stringify(newTransaction), 
        this.nodePrivateKey
      );
    }
    
    this.pendingTransactions.push(newTransaction);
    return newTransaction;
  }
  
  // Mine a new block with pending transactions
  public mineBlock(): Block | null {
    // Get transactions for the new block (up to maxBlockSize)
    const transactions = this.pendingTransactions.slice(0, this.maxBlockSize);
    
    if (transactions.length === 0) {
      return null; // No transactions to mine
    }
    
    const latestBlock = this.getLatestBlock();
    const newIndex = latestBlock.index + 1;
    const previousHash = latestBlock.hash;
    
    // Create new block
    const newBlock: Omit<Block, 'hash' | 'signature'> = {
      index: newIndex,
      timestamp: Date.now(),
      transactions,
      previousHash,
      nonce: 0,
      validator: this.nodePublicKey
    };
    
    // Perform mining (Proof of Work in this example)
    const minedBlock = this.performProofOfWork(newBlock);
    
    // Sign the block
    minedBlock.signature = this.signBlock(minedBlock);
    
    // Verify the block
    if (this.consensusService.verifyBlock(minedBlock, latestBlock)) {
      // Add to blockchain
      this.chain.push(minedBlock);
      
      // Remove mined transactions from pending
      this.pendingTransactions = this.pendingTransactions.slice(this.maxBlockSize);
      
      return minedBlock;
    }
    
    return null; // Mining failed
  }
  
  // Calculate hash of a block
  private calculateBlockHash(block: Omit<Block, 'hash' | 'signature'>): string {
    return hashData(JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      transactions: block.transactions,
      previousHash: block.previousHash,
      nonce: block.nonce,
      validator: block.validator
    }));
  }
  
  // Perform Proof of Work mining
  private performProofOfWork(block: Omit<Block, 'hash' | 'signature'>): Block {
    const difficulty = 4; // Number of leading zeros required
    const target = '0'.repeat(difficulty);
    let nonce = 0;
    let hash = '';
    
    // Mine until we find a hash with the required difficulty
    do {
      nonce++;
      const blockWithNonce = { ...block, nonce };
      hash = this.calculateBlockHash(blockWithNonce);
    } while (!hash.startsWith(target));
    
    // Return the complete block with hash and signature
    const blockWithHash = {
      ...block,
      nonce,
      hash,
      signature: '' // Add an empty signature initially
    };
    
    // Now sign the block
    blockWithHash.signature = this.signBlock(blockWithHash);
    
    return blockWithHash;
  }
  
  // Sign a block using the node's private key
  private signBlock(block: Block): string {
    // Create a string representation of the block without the signature
    const blockString = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      transactions: block.transactions,
      previousHash: block.previousHash,
      hash: block.hash,
      nonce: block.nonce,
      validator: block.validator
    });
    
    return signMessage(blockString, this.nodePrivateKey);
  }
  
  // Validate the entire blockchain
  public validateChain(): boolean {
    // Check each block in the chain
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      // Verify with consensus rules
      if (!this.consensusService.verifyBlock(currentBlock, previousBlock)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Get the entire blockchain
  public getChain(): Block[] {
    return [...this.chain];
  }
  
  // Get pending transactions
  public getPendingTransactions(): Transaction[] {
    return [...this.pendingTransactions];
  }
}
