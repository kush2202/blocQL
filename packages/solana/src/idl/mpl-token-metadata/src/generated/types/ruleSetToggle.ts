/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { PublicKey } from '@metaplex-foundation/umi';
import {
    GetDataEnumKind,
    GetDataEnumKindContent,
    Serializer,
    dataEnum,
    publicKey as publicKeySerializer,
    struct,
    tuple,
    unit,
} from '@metaplex-foundation/umi/serializers';

export type RuleSetToggle =
    | { __kind: 'None' }
    | { __kind: 'Clear' }
    | { __kind: 'Set'; fields: [PublicKey] };

export type RuleSetToggleArgs = RuleSetToggle;

export function getRuleSetToggleSerializer(): Serializer<
    RuleSetToggleArgs,
    RuleSetToggle
> {
    return dataEnum<RuleSetToggle>(
        [
            ['None', unit()],
            ['Clear', unit()],
            [
                'Set',
                struct<GetDataEnumKindContent<RuleSetToggle, 'Set'>>([
                    ['fields', tuple([publicKeySerializer()])],
                ]),
            ],
        ],
        { description: 'RuleSetToggle' }
    ) as Serializer<RuleSetToggleArgs, RuleSetToggle>;
}

// Data Enum Helpers.
export function ruleSetToggle(
    kind: 'None'
): GetDataEnumKind<RuleSetToggleArgs, 'None'>;
export function ruleSetToggle(
    kind: 'Clear'
): GetDataEnumKind<RuleSetToggleArgs, 'Clear'>;
export function ruleSetToggle(
    kind: 'Set',
    data: GetDataEnumKindContent<RuleSetToggleArgs, 'Set'>['fields']
): GetDataEnumKind<RuleSetToggleArgs, 'Set'>;
export function ruleSetToggle<K extends RuleSetToggleArgs['__kind']>(
    kind: K,
    data?: any
): Extract<RuleSetToggleArgs, { __kind: K }> {
    return Array.isArray(data)
        ? { __kind: kind, fields: data }
        : { __kind: kind, ...(data ?? {}) };
}
export function isRuleSetToggle<K extends RuleSetToggle['__kind']>(
    kind: K,
    value: RuleSetToggle
): value is RuleSetToggle & { __kind: K } {
    return value.__kind === kind;
}