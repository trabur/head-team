# HEADTEAM
Build:
```bash
$ npm i -g rollup
$ npm run bundle
```

Browser:
```bash
$ http-server . -p 3000
# http://localhost:3000/ht.beep.html
```

Features:
- first incompatible relay system timeshare (FIRST)
- grid back heap (GBH)

https://github.com/automerge/automerge

```js
// On one node
newDoc = Automerge.change(currentDoc, doc => {
  // make arbitrary change to the document
})
let changes = Automerge.getChanges(currentDoc, newDoc)
network.broadcast(JSON.stringify(changes))

// On another node
let changes = JSON.parse(network.receive())
newDoc = Automerge.applyChanges(currentDoc, changes)
```