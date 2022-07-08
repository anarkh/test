import { URLSearchParams } from 'url'
const count = 100
const query = 'cl=3&tn=baidutop10&fr=top1000&wd=十九届六中全会决议中的10个明确&rsv_idx=2&rsv_dl=fyb_n_homepage&sa=fyb_n_homepage&hisfilter=1'

const startTime = Date.now()
for (let i = 0; i < count; i++) {
  new URLSearchParams(query)
}
console.log(`URLSearchParams: ${Date.now() - startTime}`)

const urlToJson = (query) => {
  const obj = {}
  if (query.startsWith('?')) {
    query = query.substr(1)
  }

  const parr = query.split('&') // 将参数分割成数组 ["id = 1 ", " type = 2"]
  for (const i of parr) { // 遍历数组
    const arr = i.split('=') // 1） i id = 1   arr = [id, 1]  2）i type = 2  arr = [type, 2]
    obj[arr[0]] = arr[1] // obj[arr[0]] = id, obj.id = 1   obj[arr[0]] = type, obj.type = 2
  }

  return obj
}

const startTime2 = Date.now()
for (let i = 0; i < count; i++) {
  urlToJson(query)
}
console.log(`urlToJson: ${Date.now() - startTime2}`)
