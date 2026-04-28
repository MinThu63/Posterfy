// Undo/Redo history manager
export function createHistory(initial, maxSize = 50) {
  return {
    past: [],
    present: structuredClone(initial),
    future: [],
    maxSize,
  }
}

export function pushState(history, newState) {
  const past = [...history.past, history.present].slice(-history.maxSize)
  return {
    ...history,
    past,
    present: structuredClone(newState),
    future: [],
  }
}

export function undo(history) {
  if (history.past.length === 0) return history
  const prev = history.past[history.past.length - 1]
  return {
    ...history,
    past: history.past.slice(0, -1),
    present: prev,
    future: [history.present, ...history.future],
  }
}

export function redo(history) {
  if (history.future.length === 0) return history
  const next = history.future[0]
  return {
    ...history,
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  }
}

export function canUndo(history) {
  return history.past.length > 0
}

export function canRedo(history) {
  return history.future.length > 0
}
