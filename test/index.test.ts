import { expect, it } from 'vitest'
import { vue } from '@antfu/eslint-config'
import { flatConfigsToRulesDTS, pluginsToRulesDTS } from '../src/core'

it('pluginsToRuleOptions', async () => {
  expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    import: await import('eslint-plugin-import-x').then(m => m.default),
    antfu: await import('eslint-plugin-antfu').then(m => m.default),
  }))
    .toMatchSnapshot()
})

it('pluginsToRuleOptions ts expect no warnings', async () => {
  await pluginsToRulesDTS({
    // @ts-expect-error missing types
    ts: await import('@typescript-eslint/eslint-plugin').then(m => m.default),
  })
})

it('core rules', async () => {
  const { builtinRules } = await import('eslint/use-at-your-own-risk')

  expect(await pluginsToRulesDTS({
    '': { rules: Object.fromEntries(builtinRules.entries()) },
  }))
    .toMatchSnapshot()
})

it('flatConfigsToRuleOptions', async () => {
  expect(await flatConfigsToRulesDTS(await vue() as any))
    .toMatchSnapshot()
})
