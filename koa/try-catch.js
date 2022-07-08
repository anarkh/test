try {
  aaa
} catch (e) {
  // console.log(e);
  throw e
}

const duridConfig = '{"device_id":123456789,"keyword":"北京1号线"}'
const query = {}
if (typeof duridConfig === 'string') {
  const druidObject = JSON.parse(duridConfig)
  Object.keys(druidObject).forEach((key) => {
    const { [key]: param } = query
    if (typeof param === 'undefined') {
      let value = druidObject[key]
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      console.log(value)
    }
  })
}
