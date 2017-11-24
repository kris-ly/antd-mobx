import { reaction } from 'mobx'

const mobxReaction = reactorArr => (
  reactorArr.map((reactor) => {
    if (typeof reactor !== 'function') return () => null
    return reaction(
      reactor,
      (target) => { console.log(`${reactor.name} change: `, target) },
    )
  })
)
export default mobxReaction;
