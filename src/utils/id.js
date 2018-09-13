let count = 0
let prefix = 'vue-chart-'

export function getId () {
  count++
  return prefix + count
}
