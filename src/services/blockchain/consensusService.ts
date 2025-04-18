
import { hashData } from '../security/encryptionService';
import { NetworkNode } from '../security/nodeAuthentication';

// Types of consensus algorithms supported
export enum ConsensusType {
  PROOF_OF_WORK = 'pow',
  PROOF_OF_STAKE = 'pos',
  PROOF_OF_AUTHORITY = 'poa',
  DELEGATED_PROOF_OF_STAKE = 'dpos'
}

// Interface for consensus configuration
export interface ConsensusConfig {
  type: ConsensusType;
  blockTime: number; // in seconds
  difficultyTarget?: number; // for PoW
  minStake?: number; // for PoS
  authorizedValidators?: string[]; // for PoA (list of validator public keys)
}

// Represents a block in the blockchain
export interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string; // public key of the validator/miner
  signature: string;
}

// Represents a transaction
export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  data?: string;
  signature: string;
}

// Service for managing blockchain consensus
export class ConsensusService {
  private config: ConsensusConfig;
  private validators: Map<string, NetworkNode> = new Map();
  
  constructor(config: ConsensusConfig) {
    this.config = config;
  }
  
  // Add a validator to the consensus mechanism
  public addValidator(node: NetworkNode): boolean {
    if (this.config.type === ConsensusType.PROOF_OF_AUTHORITY) {
      // For PoA, check if node is authorized
      if (!this.config.authorizedValidators?.includes(node.publicKey)) {
        return false;
      }
    }
    
    this.validators.set(node.id, node);
    return true;
  }
  
  // Remove a validator
  public removeValidator(nodeId: string): boolean {
    return this.validators.delete(nodeId);
  }
  
  // Get all validators
  public getValidators(): NetworkNode[] {
    return Array.from(this.validators.values());
  }
  
  // Verify if a block is valid according to the consensus rules
  public verifyBlock(block: Block, previousBlock: Block): boolean {
    // Verify block hash
    const calculatedHash = this.calculateBlockHash(block);
    if (calculatedHash !== block.hash) {
      return false;
    }
    
    // Verify previous hash
    if (block.previousHash !== previousBlock.hash) {
      return false;
    }
    
    // Verify timestamp
    if (block.timestamp <= previousBlock.timestamp) {
      return false;
    }
    
    // Additional consensus-specific validations
    switch (this.config.type) {
      case ConsensusType.PROOF_OF_WORK:
        return this.verifyProofOfWork(block);
      case ConsensusType.PROOF_OF_STAKE:
        return this.verifyProofOfStake(block);
      case ConsensusType.PROOF_OF_AUTHORITY:
        return this.verifyProofOfAuthority(block);
      default:
        return false;
    }
  }
  
  // Calculate hash of a block
  private calculateBlockHash(block: Omit<Block, 'hash'>): string {
    // Create a string representation of the block without the hash field
    const blockString = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      transactions: block.transactions,
      previousHash: block.previousHash,
      nonce: block.nonce,
      validator: block.validator
    });
    
    return hashData(blockString);
  }
  
  // Verify Proof of Work
  private verifyProofOfWork(block: Block): boolean {
    if (!this.config.difficultyTarget) return false;
    
    // Check if hash satisfies difficulty target
    // For example, if difficulty target is 4, hash must start with '0000'
    const requiredPrefix = '0'.repeat(this.config.difficultyTarget);
    return block.hash.startsWith(requiredPrefix);
  }
  
  // Verify Proof of Stake
  private verifyProofOfStake(block: Block): boolean {
    // Find validator node
    const validator = Array.from(this.validators.values())
      .find(node => node.publicKey === block.validator);
    
    if (!validator) return false;
    
    // In a real implementation, you would verify the stake amount
    // For demo purposes, we'll just verify the validator is registered
    return true;
  }
  
  // Verify Proof of Authority
  private verifyProofOfAuthority(block: Block): boolean {
    // Check if validator is in the authorized list
    return this.config.authorizedValidators?.includes(block.validator) || false;
  }
}
