/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
    Context,
    Pda,
    PublicKey,
    Signer,
    TransactionBuilder,
    publicKey,
    transactionBuilder,
} from '@metaplex-foundation/umi';
import {
    Serializer,
    mapSerializer,
    struct,
    u8,
} from '@metaplex-foundation/umi/serializers';
import { findMetadataPda } from '../accounts';
import {
    ResolvedAccount,
    ResolvedAccountsWithIndices,
    expectPublicKey,
    getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type UnverifyCollectionV1InstructionAccounts = {
    /** Creator to verify, collection (or metadata if parent burned) update authority or delegate */
    authority?: Signer;
    /** Delegate record PDA */
    delegateRecord?: PublicKey | Pda;
    /** Metadata account */
    metadata: PublicKey | Pda;
    /** Mint of the Collection */
    collectionMint: PublicKey | Pda;
    /** Metadata Account of the Collection */
    collectionMetadata?: PublicKey | Pda;
    /** System program */
    systemProgram?: PublicKey | Pda;
    /** Instructions sysvar account */
    sysvarInstructions?: PublicKey | Pda;
};

// Data.
export type UnverifyCollectionV1InstructionData = {
    discriminator: number;
    unverifyCollectionV1Discriminator: number;
};

export type UnverifyCollectionV1InstructionDataArgs = {};

export function getUnverifyCollectionV1InstructionDataSerializer(): Serializer<
    UnverifyCollectionV1InstructionDataArgs,
    UnverifyCollectionV1InstructionData
> {
    return mapSerializer<
        UnverifyCollectionV1InstructionDataArgs,
        any,
        UnverifyCollectionV1InstructionData
    >(
        struct<UnverifyCollectionV1InstructionData>(
            [
                ['discriminator', u8()],
                ['unverifyCollectionV1Discriminator', u8()],
            ],
            { description: 'UnverifyCollectionV1InstructionData' }
        ),
        (value) => ({
            ...value,
            discriminator: 53,
            unverifyCollectionV1Discriminator: 1,
        })
    ) as Serializer<
        UnverifyCollectionV1InstructionDataArgs,
        UnverifyCollectionV1InstructionData
    >;
}

// Instruction.
export function unverifyCollectionV1(
    context: Pick<Context, 'eddsa' | 'identity' | 'programs'>,
    input: UnverifyCollectionV1InstructionAccounts
): TransactionBuilder {
    // Program ID.
    const programId = context.programs.getPublicKey(
        'mplTokenMetadata',
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );

    // Accounts.
    const resolvedAccounts: ResolvedAccountsWithIndices = {
        authority: {
            index: 0,
            isWritable: false,
            value: input.authority ?? null,
        },
        delegateRecord: {
            index: 1,
            isWritable: false,
            value: input.delegateRecord ?? null,
        },
        metadata: { index: 2, isWritable: true, value: input.metadata ?? null },
        collectionMint: {
            index: 3,
            isWritable: false,
            value: input.collectionMint ?? null,
        },
        collectionMetadata: {
            index: 4,
            isWritable: true,
            value: input.collectionMetadata ?? null,
        },
        systemProgram: {
            index: 5,
            isWritable: false,
            value: input.systemProgram ?? null,
        },
        sysvarInstructions: {
            index: 6,
            isWritable: false,
            value: input.sysvarInstructions ?? null,
        },
    };

    // Default values.
    if (!resolvedAccounts.authority.value) {
        resolvedAccounts.authority.value = context.identity;
    }
    if (!resolvedAccounts.collectionMetadata.value) {
        resolvedAccounts.collectionMetadata.value = findMetadataPda(context, {
            mint: expectPublicKey(resolvedAccounts.collectionMint.value),
        });
    }
    if (!resolvedAccounts.systemProgram.value) {
        resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
        );
        resolvedAccounts.systemProgram.isWritable = false;
    }
    if (!resolvedAccounts.sysvarInstructions.value) {
        resolvedAccounts.sysvarInstructions.value = publicKey(
            'Sysvar1nstructions1111111111111111111111111'
        );
    }

    // Accounts in order.
    const orderedAccounts: ResolvedAccount[] = Object.values(
        resolvedAccounts
    ).sort((a, b) => a.index - b.index);

    // Keys and Signers.
    const [keys, signers] = getAccountMetasAndSigners(
        orderedAccounts,
        'programId',
        programId
    );

    // Data.
    const data = getUnverifyCollectionV1InstructionDataSerializer().serialize(
        {}
    );

    // Bytes Created On Chain.
    const bytesCreatedOnChain = 0;

    return transactionBuilder([
        {
            instruction: { keys, programId, data },
            signers,
            bytesCreatedOnChain,
        },
    ]);
}
