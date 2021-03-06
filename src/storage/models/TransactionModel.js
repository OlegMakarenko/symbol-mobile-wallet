import type { MosaicModel } from '@src/storage/models/MosaicModel';
export type TransactionType = 'unknown' | 'transfer' | 'fundsLock' | 'aggregate' | 'namespace' | 'mosaicAlias';
export type TransactionStatus = 'confirmed' | 'unconfirmed';

/**
 * Wallet transaction
 */
export interface TransactionModel {
    type: TransactionType;
    status: TransactionStatus;
    signerAddress: string;
    deadline: string;
    hash: string;
    fee: number;
}

/**
 * Transfer transaction model
 */
export interface TransferTransactionModel extends TransactionModel {
    type: 'transfer';
    isConfirmed: boolean;
    recipientAddress: string;
    messageText: string;
    messageEncrypted: boolean;
    mosaics: MosaicModel[];
}

/**
 * Funds lock transaction model
 */
export interface FundsLockTransactionModel extends TransactionModel {
    type: 'fundsLock';
    mosaic: MosaicModel;
    duration: number;
    aggregateHash: string;
}

/**
 * Aggregate transaction model
 */
export interface AggregateTransactionModel extends TransactionModel {
    type: 'aggregate';
    innerTransactions: TransactionModel[];
    cosignaturePublicKeys: string[];
    signTransactionObject: any;
}
/**
 * Namespace transaction model
 */
export interface NamespaceRegistrationTransactionModel extends TransactionModel {
    type: 'namespace';
    namespaceName: string;
}

export interface MosaicAliasTransactionModel extends TransactionModel {
    type: 'mosaicAlias';
    aliasAction: string;
    namespaceId: string;
    namespaceName: string;
    mosaicId: string;
}
