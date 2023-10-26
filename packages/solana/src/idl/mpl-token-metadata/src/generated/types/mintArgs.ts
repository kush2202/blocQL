/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Option, OptionOrNullable, none } from '@metaplex-foundation/umi';
import {
    GetDataEnumKind,
    GetDataEnumKindContent,
    Serializer,
    dataEnum,
    mapSerializer,
    option,
    struct,
    u64,
} from '@metaplex-foundation/umi/serializers';
import {
    AuthorizationData,
    AuthorizationDataArgs,
    getAuthorizationDataSerializer,
} from '.';

export type MintArgs = {
    __kind: 'V1';
    amount: bigint;
    authorizationData: Option<AuthorizationData>;
};

export type MintArgsArgs = {
    __kind: 'V1';
    amount?: number | bigint;
    authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getMintArgsSerializer(): Serializer<MintArgsArgs, MintArgs> {
    return dataEnum<MintArgs>(
        [
            [
                'V1',
                mapSerializer<
                    GetDataEnumKindContent<MintArgsArgs, 'V1'>,
                    any,
                    GetDataEnumKindContent<MintArgs, 'V1'>
                >(
                    struct<GetDataEnumKindContent<MintArgs, 'V1'>>([
                        ['amount', u64()],
                        [
                            'authorizationData',
                            option(getAuthorizationDataSerializer()),
                        ],
                    ]),
                    (value) => ({
                        ...value,
                        amount: value.amount ?? 1,
                        authorizationData: value.authorizationData ?? none(),
                    })
                ),
            ],
        ],
        { description: 'MintArgs' }
    ) as Serializer<MintArgsArgs, MintArgs>;
}

// Data Enum Helpers.
export function mintArgs(
    kind: 'V1',
    data: GetDataEnumKindContent<MintArgsArgs, 'V1'>
): GetDataEnumKind<MintArgsArgs, 'V1'>;
export function mintArgs<K extends MintArgsArgs['__kind']>(
    kind: K,
    data?: any
): Extract<MintArgsArgs, { __kind: K }> {
    return Array.isArray(data)
        ? { __kind: kind, fields: data }
        : { __kind: kind, ...(data ?? {}) };
}
export function isMintArgs<K extends MintArgs['__kind']>(
    kind: K,
    value: MintArgs
): value is MintArgs & { __kind: K } {
    return value.__kind === kind;
}
