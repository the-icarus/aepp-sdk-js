## Node.js bundle

The Node.js bundle is primarily interesting for scripts which use non-transpiled
code, such as the ones provided in the [`examples/node` directory](../examples/node) of the project.

```js
const { Universal: Ae, MemoryAccount, Node } = require('@aeternity/aepp-sdk')

const node1 = Node({ url: 'https://testnet.aeternity.io', internalUrl: 'https://testnet.aeternity.io' })
// const node2 = ...

const acc1 = MemoryAccount({ keypair: { publicKey: 'YOUR_PUBLIC_KEY', secretKey: 'YOUR_PRIVATE_KEY' } })
// const acc2 = ...
Promise.all([
  node1
]).then(nodes => {
    Ae({
      nodes: [
        { name: 'someNode', instance: nodes[0] },
      ],
      compilerUrl: 'COMPILER_URL',
      accounts: [
        acc1,
      ]
    }).then(ae => {
      ae.height().then(height => {
        console.log('Current Block', height)
      })
    })
})


// same with async
const main = async () => {
  const node1 = await Node({ url: 'https://testnet.aeternity.io', internalUrl: 'https://testnet.aeternity.io' })
  // const node2 = ...

  const acc1 = MemoryAccount({ keypair: { publicKey: 'YOUR_PUBLIC_KEY', secretKey: 'YOUR_PRIVATE_KEY' } })
  // const acc2 = ...

  const client = await Ae({
      nodes: [
        { name: 'someNode', instance: node1 },
      ],
      compilerUrl: 'COMPILER_URL',
      accounts: [
        acc1,
      ],
      address: 'SELECTED_ACCOUNT_PUB'
  })
  const height = await client.height()
  console.log('Current Block', height)
}

// call main
main()
```
