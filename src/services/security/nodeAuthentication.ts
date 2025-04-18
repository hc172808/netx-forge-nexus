
import { hashData, signMessage, verifySignature } from './encryptionService';

// Node types for the network
export enum NodeType {
  VALIDATOR = 'validator',
  MINER = 'miner',
  FULL_NODE = 'full_node',
  LIGHT_NODE = 'light_node'
}

// Authentication status for nodes
export enum AuthStatus {
  PENDING = 'pending',
  AUTHENTICATED = 'authenticated',
  REJECTED = 'rejected'
}

// Node representation in the network
export interface NetworkNode {
  id: string;
  publicKey: string;
  nodeType: NodeType;
  ipAddress: string;
  port: number;
  status: AuthStatus;
  lastSeen: Date;
  reputation: number; // Score based on behavior, used for trust calculation
}

// Authentication challenge for new nodes
export interface AuthChallenge {
  challengeId: string;
  challenge: string;
  timestamp: number;
  expiresAt: number;
}

// Generate a challenge for node authentication
export const generateAuthChallenge = (): AuthChallenge => {
  const challenge = hashData(Date.now().toString() + Math.random().toString());
  const timestamp = Date.now();
  
  return {
    challengeId: hashData(challenge + timestamp.toString()),
    challenge,
    timestamp,
    expiresAt: timestamp + 5 * 60 * 1000 // 5 minutes expiration
  };
};

// Verify node's response to authentication challenge
export const verifyNodeResponse = (
  challenge: AuthChallenge,
  response: string,
  nodePubKey: string
): boolean => {
  // Check if challenge is expired
  if (Date.now() > challenge.expiresAt) {
    return false;
  }
  
  return verifySignature(challenge.challenge, response, nodePubKey);
};

// Register a new node in the network
export const registerNode = (
  publicKey: string,
  nodeType: NodeType,
  ipAddress: string,
  port: number
): NetworkNode => {
  const newNode: NetworkNode = {
    id: hashData(publicKey + ipAddress + port),
    publicKey,
    nodeType,
    ipAddress,
    port,
    status: AuthStatus.PENDING,
    lastSeen: new Date(),
    reputation: 50 // Starting reputation
  };
  
  // In a real implementation, this would be saved to a database
  // For demo purposes, we'll just return the node
  return newNode;
};

// Update node status based on authentication result
export const updateNodeStatus = (
  node: NetworkNode,
  status: AuthStatus
): NetworkNode => {
  return {
    ...node,
    status,
    lastSeen: new Date()
  };
};

// Update node reputation based on behavior
export const updateNodeReputation = (
  node: NetworkNode,
  reputationChange: number
): NetworkNode => {
  // Cap reputation between 0 and 100
  const newReputation = Math.max(0, Math.min(100, node.reputation + reputationChange));
  
  return {
    ...node,
    reputation: newReputation,
    lastSeen: new Date()
  };
};
