const setAttr = (store, attrName) => ({
  value: store.state[attrName],
  onChange: (event) => {
    store.state[attrName] = event.target ? event.target.value : event
  },
})

export default setAttr;
