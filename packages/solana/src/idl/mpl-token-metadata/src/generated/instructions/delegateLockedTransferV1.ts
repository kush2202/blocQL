/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
import {
    Context,
    Option,
    OptionOrNullable,
    Pda,
    PublicKey,
    Signer,
    TransactionBuilder,
    none,
    publicKey,
    transactionBuilder,
} from '@metaplex-foundation/umi';
import {
    Serializer,
    mapSerializer,
    option,
    publicKey as publicKeySerializer,
    struct,
    u64,
    u8,
} from '@metaplex-foundation/umi/serializers';
import { resolveIsNonFungible } from '../../hooked';
import {
    findMasterEditionPda,
    findMetadataPda,
    findTokenRecordPda,
} from '../accounts';
import {
    PickPartial,
    ResolvedAccount,
    ResolvedAccountsWithIndices,
    expectPublicKey,
    expectSome,
    getAccountMetasAndSigners,
} from '../shared';
import {
    AuthorizationData,
    AuthorizationDataArgs,
    TokenStandard,
    TokenStandardArgs,
    getAuthorizationDataSerializer,
} from '../types';

// Accounts.
export type DelegateLockedTransferV1InstructionAccounts = {
    /** Delegate record account */
    delegateRecord?: PublicKey | Pda;
    /** Owner of the delegated account */
    delegate: PublicKey | Pda;
    /** Metadata account */
    metadata?: PublicKey | Pda;
    /** Master Edition account */
    masterEdition?: PublicKey | Pda;
    /** Token record account */
    tokenRecord?: PublicKey | Pda;
    /** Mint of metadata */
    mint: PublicKey | Pda;
    /** Token account of mint */
    token?: PublicKey | Pda;
    /** Update authority or token owner */
    authority?: Signer;
    /** Payer */
    payer?: Signer;
    /** System Program */
    systemProgram?: PublicKey | Pda;
    /** Instructions sysvar account */
    sysvarInstructions?: PublicKey | Pda;
    /** SPL Token Program */
    splTokenProgram?: PublicKey | Pda;
    /** Token Authorization Rules Program */
    authorizationRulesProgram?: PublicKey | Pda;
    /** Token Authorization Rules account */
    authorizationRules?: PublicKey | Pda;
};

// Data.
export type DelegateLockedTransferV1InstructionData = {
    discriminator: number;
    delegateLockedTransferV1Discriminator: number;
    amount: bigint;
    lockedAddress: PublicKey;
    authorizationData: Option<AuthorizationData>;
};

export type DelegateLockedTransferV1InstructionDataArgs = {
    amount?: number | bigint;
    lockedAddress: PublicKey;
    authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getDelegateLockedTransferV1InstructionDataSerializer(): Serializer<
    DelegateLockedTransferV1InstructionDataArgs,
    DelegateLockedTransferV1InstructionData
> {
    return mapSerializer<
        DelegateLockedTransferV1InstructionDataArgs,
        any,
        DelegateLockedTransferV1InstructionData
    >(
        struct<DelegateLockedTransferV1InstructionData>(
            [
                ['discriminator', u8()],
                ['delegateLockedTransferV1Discriminator', u8()],
                ['amount', u64()],
                ['lockedAddress', publicKeySerializer()],
                ['authorizationData', option(getAuthorizationDataSerializer())],
            ],
            { description: 'DelegateLockedTransferV1InstructionData' }
        ),
        (value) => ({
            ...value,
            discriminator: 44,
            delegateLockedTransferV1Discriminator: 7,
            amount: value.amount ?? 1,
            authorizationData: value.authorizationData ?? none(),
        })
    ) as Serializer<
        DelegateLockedTransferV1InstructionDataArgs,
        DelegateLockedTransferV1InstructionData
    >;
}

// Extra Args.
export type DelegateLockedTransferV1InstructionExtraArgs = {
    tokenStandard: TokenStandardArgs;
    tokenOwner: PublicKey;
};

// Args.
export type DelegateLockedTransferV1InstructionArgs = PickPartial<
    DelegateLockedTransferV1InstructionDataArgs &
        DelegateLockedTransferV1InstructionExtraArgs,
    'tokenOwner'
>;

// Instruction.
export function delegateLockedTransferV1(
    context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
    input: DelegateLockedTransferV1InstructionAccounts &
        DelegateLockedTransferV1InstructionArgs
): TransactionBuilder {
    // Program ID.
    const programId = context.programs.getPublicKey(
        'mplTokenMetadata',
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );

    // Accounts.
    const resolvedAccounts: ResolvedAccountsWithIndices = {
        delegateRecord: {
            index: 0,
            isWritable: true,
            value: input.delegateRecord ?? null,
        },
        delegate: {
            index: 1,
            isWritable: false,
            value: input.delegate ?? null,
        },
        metadata: { index: 2, isWritable: true, value: input.metadata ?? null },
        masterEdition: {
            index: 3,
            isWritable: false,
            value: input.masterEdition ?? null,
        },
        tokenRecord: {
            index: 4,
            isWritable: true,
            value: input.tokenRecord ?? null,
        },
        mint: { index: 5, isWritable: false, value: input.mint ?? null },
        token: { index: 6, isWritable: true, value: input.token ?? null },
        authority: {
            index: 7,
            isWritable: false,
            value: input.authority ?? null,
        },
        payer: { index: 8, isWritable: true, value: input.payer ?? null },
        systemProgram: {
            index: 9,
            isWritable: false,
            value: input.systemProgram ?? null,
        },
        sysvarInstructions: {
            index: 10,
            isWritable: false,
            value: input.sysvarInstructions ?? null,
        },
        splTokenProgram: {
            index: 11,
            isWritable: false,
            value: input.splTokenProgram ?? null,
        },
        authorizationRulesProgram: {
            index: 12,
            isWritable: false,
            value: input.authorizationRulesProgram ?? null,
        },
        authorizationRules: {
            index: 13,
            isWritable: false,
            value: input.authorizationRules ?? null,
        },
    };

    // Arguments.
    const resolvedArgs: DelegateLockedTransferV1InstructionArgs = { ...input };

    // Default values.
    if (!resolvedArgs.tokenOwner) {
        resolvedArgs.tokenOwner = context.identity.publicKey;
    }
    if (!resolvedAccounts.token.value) {
        resolvedAccounts.token.value = findAssociatedTokenPda(context, {
            mint: expectPublicKey(resolvedAccounts.mint.value),
            owner: expectSome(resolvedArgs.tokenOwner),
        });
    }
    if (!resolvedAccounts.delegateRecord.value) {
        resolvedAccounts.delegateRecord.value = findTokenRecordPda(context, {
            mint: expectPublicKey(resolvedAccounts.mint.value),
            token: expectPublicKey(resolvedAccounts.token.value),
        });
    }
    if (!resolvedAccounts.metadata.value) {
        resolvedAccounts.metadata.value = findMetadataPda(context, {
            mint: expectPublicKey(resolvedAccounts.mint.value),
        });
    }
    if (!resolvedAccounts.masterEdition.value) {
        if (
            resolveIsNonFungible(
                context,
                resolvedAccounts,
                resolvedArgs,
                programId,
                false
            )
        ) {
            resolvedAccounts.masterEdition.value = findMasterEditionPda(
                context,
                {
                    mint: expectPublicKey(resolvedAccounts.mint.value),
                }
            );
        }
    }
    if (!resolvedAccounts.tokenRecord.value) {
        if (
            resolvedArgs.tokenStandard === TokenStandard.ProgrammableNonFungible
        ) {
            resolvedAccounts.tokenRecord.value = findTokenRecordPda(context, {
                mint: expectPublicKey(resolvedAccounts.mint.value),
                token: expectPublicKey(resolvedAccounts.token.value),
            });
        }
    }
    if (!resolvedAccounts.authority.value) {
        resolvedAccounts.authority.value = context.identity;
    }
    if (!resolvedAccounts.payer.value) {
        resolvedAccounts.payer.value = context.payer;
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
    if (!resolvedAccounts.splTokenProgram.value) {
        resolvedAccounts.splTokenProgram.value = context.programs.getPublicKey(
            'splToken',
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        );
        resolvedAccounts.splTokenProgram.isWritable = false;
    }
    if (!resolvedAccounts.authorizationRulesProgram.value) {
        if (resolvedAccounts.authorizationRules.value) {
            resolvedAccounts.authorizationRulesProgram.value =
                context.programs.getPublicKey(
                    'mplTokenAuthRules',
                    'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
                );
            resolvedAccounts.authorizationRulesProgram.isWritable = false;
        }
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
    const data =
        getDelegateLockedTransferV1InstructionDataSerializer().serialize(
            resolvedArgs as DelegateLockedTransferV1InstructionDataArgs
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
