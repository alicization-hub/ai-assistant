export function shuffle<T = any>(inputs: T[]) {
  const result = [...inputs]

  for (let index = result.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const temporary = result[index]
    result[index] = result[randomIndex]
    result[randomIndex] = temporary
  }

  return result
}

export function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
