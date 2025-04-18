
import { Block, Transaction } from '../blockchain/consensusService';
import { BlockchainService } from '../blockchain/blockchainService';
import { NetworkNode, AuthStatus } from '../security/nodeAuthentication';
import { hashData, signMessage, verifySignature } from '../security/encryptionService';

// Types of P2P messages
export enum MessageType {
  HANDSHAKE = 'handshake',
  BLOCK_ANNOUNCEMENT = 'block_announcement',
  TRANSACTION_ANNOUNCEMENT = 'transaction_announcement',
  BLOCK_REQUEST = 'block_request',
  BLOCK_RESPONSE = 'block_response',
  CHAIN_REQUEST = 'chain_request',
  CHAIN_RESPONSE = 'chain_response',
  PEER_LIST_REQUEST = 'peer_list_request',
  PEER_LIST_RESPONSE = 'peer_list_response'
}

// P2P message interface
export interface P2PMessage {
  type: MessageType;
  data: any;
  sender: string; // sender's public key
  timestamp: number;
  signature: string;
}

// Rate limiting data
interface RateLimit {
  count: number;
  lastReset: number;
}

export class NetworkService {
  private peers: Map<string, NetworkNode> = new Map();
  private blockchainService: BlockchainService;
  private nodePublicKey: string;
  private nodePrivateKey: string;
  private rateLimits: Map<string, Map<MessageType, RateLimit>> = new Map();
  private maxRatePerMinute: Map<MessageType, number> = new Map([
    [MessageType.HANDSHAKE, 5],
    [MessageType.BLOCK_ANNOUNCEMENT, 10],
    [MessageType.TRANSACTION_ANNOUNCEMENT, 100],
    [MessageType.BLOCK_REQUEST, 20],
    [MessageType.CHAIN_REQUEST, 5],
    [MessageType.PEER_LIST_REQUEST, 10]
  ]);
  
  constructor(
    nodePublicKey: string,
    nodePrivateKey: string,
    blockchainService: BlockchainService
  ) {
    this.nodePublicKey = nodePublicKey;
    this.nodePrivateKey = nodePrivateKey;
    this.blockchainService = blockchainService;
  }
  
  // Add a peer to the network
  public addPeer(peer: NetworkNode): boolean {
    if (peer.status !== AuthStatus.AUTHENTICATED) {
      return false;
    }
    
    this.peers.set(peer.id, peer);
    // Initialize rate limiting for this peer
    this.rateLimits.set(peer.id, new Map());
    return true;
  }
  
  // Remove a peer from the network
  public removePeer(peerId: string): boolean {
    this.rateLimits.delete(peerId);
    return this.peers.delete(peerId);
  }
  
  // Get all peers
  public getPeers(): NetworkNode[] {
    return Array.from(this.peers.values());
  }
  
  // Check rate limiting for a peer and message type
  private checkRateLimit(peerId: string, messageType: MessageType): boolean {
    const now = Date.now();
    const peerLimits = this.rateLimits.get(peerId);
    
    if (!peerLimits) {
      return false; // Peer not found
    }
    
    if (!peerLimits.has(messageType)) {
      // First message of this type from this peer
      peerLimits.set(messageType, { count: 1, lastReset: now });
      return true;
    }
    
    const limit = peerLimits.get(messageType)!;
    const maxRate = this.maxRatePerMinute.get(messageType) || 10;
    
    // Reset counter if a minute has passed
    if (now - limit.lastReset > 60000) {
      peerLimits.set(messageType, { count: 1, lastReset: now });
      return true;
    }
    
    // Check if limit exceeded
    if (limit.count >= maxRate) {
      return false; // Rate limit exceeded
    }
    
    // Increment counter
    limit.count++;
    peerLimits.set(messageType, limit);
    return true;
  }
  
  // Create a signed message
  private createMessage(type: MessageType, data: any): P2PMessage {
    const message: Omit<P2PMessage, 'signature'> = {
      type,
      data,
      sender: this.nodePublicKey,
      timestamp: Date.now()
    };
    
    // Sign the message
    const messageString = JSON.stringify(message);
    const signature = signMessage(messageString, this.nodePrivateKey);
    
    return {
      ...message,
      signature
    };
  }
  
  // Verify a received message
  private verifyMessage(message: P2PMessage): boolean {
    // Skip signature in verification
    const { signature, ...messageWithoutSignature } = message;
    const messageString = JSON.stringify(messageWithoutSignature);
    
    // Verify signature
    return verifySignature(messageString, signature, message.sender);
  }
  
  // Handle received message from a peer
  public handleMessage(peerId: string, message: P2PMessage): P2PMessage | null {
    // Check if peer exists
    if (!this.peers.has(peerId)) {
      return null;
    }
    
    // Check rate limiting
    if (!this.checkRateLimit(peerId, message.type)) {
      // Could log rate limiting issue here
      return null;
    }
    
    // Verify message signature
    if (!this.verifyMessage(message)) {
      // Message signature invalid, could be malicious
      return null;
    }
    
    // Handle different message types
    switch (message.type) {
      case MessageType.HANDSHAKE:
        return this.handleHandshake(message);
      case MessageType.BLOCK_ANNOUNCEMENT:
        return this.handleBlockAnnouncement(message);
      case MessageType.TRANSACTION_ANNOUNCEMENT:
        return this.handleTransactionAnnouncement(message);
      case MessageType.BLOCK_REQUEST:
        return this.handleBlockRequest(message);
      case MessageType.CHAIN_REQUEST:
        return this.handleChainRequest(message);
      case MessageType.PEER_LIST_REQUEST:
        return this.handlePeerListRequest(message);
      default:
        return null;
    }
  }
  
  // Handle handshake message
  private handleHandshake(message: P2PMessage): P2PMessage {
    // In a real implementation, this would validate the handshake data
    
    // Respond with our blockchain info
    const latestBlock = this.blockchainService.getLatestBlock();
    return this.createMessage(MessageType.HANDSHAKE, {
      latestBlockIndex: latestBlock.index,
      latestBlockHash: latestBlock.hash,
      nodeType: 'full_node' // Example node type
    });
  }
  
  // Handle block announcement
  private handleBlockAnnouncement(message: P2PMessage): P2PMessage | null {
    const block = message.data.block as Block;
    
    // Verify the announced block (in a full implementation, this would check with blockchain service)
    // For demo purposes, just acknowledge
    return this.createMessage(MessageType.BLOCK_ANNOUNCEMENT, {
      acknowledgement: true,
      blockHash: block.hash
    });
  }
  
  // Handle transaction announcement
  private handleTransactionAnnouncement(message: P2PMessage): P2PMessage | null {
    const transaction = message.data.transaction as Transaction;
    
    // Add transaction to blockchain service
    this.blockchainService.addTransaction({
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      data: transaction.data
    });
    
    return this.createMessage(MessageType.TRANSACTION_ANNOUNCEMENT, {
      acknowledgement: true,
      transactionId: transaction.id
    });
  }
  
  // Handle block request
  private handleBlockRequest(message: P2PMessage): P2PMessage {
    const blockHash = message.data.blockHash;
    
    // In a full implementation, we would fetch the block by hash
    // For demo purposes, return the latest block
    const block = this.blockchainService.getLatestBlock();
    
    return this.createMessage(MessageType.BLOCK_RESPONSE, {
      block
    });
  }
  
  // Handle chain request
  private handleChainRequest(message: P2PMessage): P2PMessage {
    const startIndex = message.data.startIndex || 0;
    const endIndex = message.data.endIndex || -1;
    
    // Get the requested portion of the chain
    const chain = this.blockchainService.getChain();
    const requestedChain = endIndex === -1 
      ? chain.slice(startIndex) 
      : chain.slice(startIndex, endIndex + 1);
    
    return this.createMessage(MessageType.CHAIN_RESPONSE, {
      chain: requestedChain
    });
  }
  
  // Handle peer list request
  private handlePeerListRequest(message: P2PMessage): P2PMessage {
    // Send list of peers (excluding the requester)
    const peers = this.getPeers()
      .filter(peer => peer.publicKey !== message.sender)
      .map(peer => ({
        id: peer.id,
        publicKey: peer.publicKey,
        nodeType: peer.nodeType,
        ipAddress: peer.ipAddress,
        port: peer.port
      }));
    
    return this.createMessage(MessageType.PEER_LIST_RESPONSE, {
      peers
    });
  }
  
  // Broadcast a transaction to all peers
  public broadcastTransaction(transaction: Transaction): void {
    const message = this.createMessage(MessageType.TRANSACTION_ANNOUNCEMENT, {
      transaction
    });
    
    // In a real implementation, this would send the message to all peers
    console.log('Broadcasting transaction:', transaction.id);
    // For each peer: send message
  }
  
  // Broadcast a new block to all peers
  public broadcastBlock(block: Block): void {
    const message = this.createMessage(MessageType.BLOCK_ANNOUNCEMENT, {
      block
    });
    
    // In a real implementation, this would send the message to all peers
    console.log('Broadcasting block:', block.hash);
    // For each peer: send message
  }
}
