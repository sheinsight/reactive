import { create, devtools } from '@shined/reactive'

export const store = create({
  count: 0,
  user: [{ name: 'Bob' }],
  unused: 'unused',
})

devtools(store, { name: 'UseEffect Store' })
