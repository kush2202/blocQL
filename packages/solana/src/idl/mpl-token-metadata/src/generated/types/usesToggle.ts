/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
    GetDataEnumKind,
    GetDataEnumKindContent,
    Serializer,
    dataEnum,
    struct,
    tuple,
    unit,
} from '@metaplex-foundation/umi/serializers';
import { Uses, UsesArgs, getUsesSerializer } from '.';

export type UsesToggle =
    | { __kind: 'None' }
    | { __kind: 'Clear' }
    | { __kind: 'Set'; fields: [Uses] };

export type UsesToggleArgs =
    | { __kind: 'None' }
    | { __kind: 'Clear' }
    | { __kind: 'Set'; fields: [UsesArgs] };

export function getUsesToggleSerializer(): Serializer<
    UsesToggleArgs,
    UsesToggle
> {
    return dataEnum<UsesToggle>(
        [
            ['None', unit()],
            ['Clear', unit()],
            [
                'Set',
                struct<GetDataEnumKindContent<UsesToggle, 'Set'>>([
                    ['fields', tuple([getUsesSerializer()])],
                ]),
            ],
        ],
        { description: 'UsesToggle' }
    ) as Serializer<UsesToggleArgs, UsesToggle>;
}

// Data Enum Helpers.
export function usesToggle(
    kind: 'None'
): GetDataEnumKind<UsesToggleArgs, 'None'>;
export function usesToggle(
    kind: 'Clear'
): GetDataEnumKind<UsesToggleArgs, 'Clear'>;
export function usesToggle(
    kind: 'Set',
    data: GetDataEnumKindContent<UsesToggleArgs, 'Set'>['fields']
): GetDataEnumKind<UsesToggleArgs, 'Set'>;
export function usesToggle<K extends UsesToggleArgs['__kind']>(
    kind: K,
    data?: any
): Extract<UsesToggleArgs, { __kind: K }> {
    return Array.isArray(data)
        ? { __kind: kind, fields: data }
        : { __kind: kind, ...(data ?? {}) };
}
export function isUsesToggle<K extends UsesToggle['__kind']>(
    kind: K,
    value: UsesToggle
): value is UsesToggle & { __kind: K } {
    return value.__kind === kind;
}
