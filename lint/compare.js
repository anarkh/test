const xlsx = require('node-xlsx')
// import airbnb from 'eslint-config-airbnb-base';
// import { eslintRecommended } from 'eslint/conf/eslint-recommended';
const airbnb = require('eslint-config-airbnb-base')
// const eslintRecommended = require('eslint/conf/eslint-recommended.js');
const eslintRecommended = require('./eslint-recommended.js')
const standard = require('eslint-config-standard')
const tencentBase = require('eslint-config-tencent/base')
const tencentImport = require('eslint-config-tencent/import')

const zh = require('./eslint-rules')
const { writeFileSync } = require('fs')

const combineRules = (list) => {
  const rules = {}
  list.forEach(element => {
    const info = require(element)
    Object.assign(rules, info.rules)
  })
  return rules
}
const combineRulesESM = (list) => {
  const rules = {}
  const importlist = []
  list.forEach(element => {
    importlist.push(import(element))
  })
  const ruleslist = Promise.all(importlist)
  console.log(ruleslist)
}
const getJupiterRules = () => {
  const rules = jupiter.rules
  Object.assign(rules, jupiterApp.rules)
  return rules
}
const formatRules = (rules) => {
  Object.keys(rules).forEach((key) => {
    const value = rules[key]
    if (Array.isArray(value)) {
      rules[key] = value[0]
    }
  })

  return rules
}
const compareRules = (ruleslist) => {
  let allRulesArray = []
  ruleslist.forEach((items) => {
    allRulesArray = allRulesArray.concat(Object.keys(items.value))
  })
  const allRules = [...new Set(allRulesArray)]
  const result = []
  allRules.forEach((item) => {
    const oneRule = {
      rule: item
    }
    ruleslist.forEach((rule) => {
      oneRule[rule.key] = rule.value[item]
    })
    result.push(oneRule)
  })

  return result
}
const transformValue = (data) => {
  const yes = {
    v: '✅',
    s: {
      fill: {
        fgColor: { rgb: '98C379' }
      },
      font: {
        sz: 20
      }
    }
  }
  const no = {
    v: '',
    s: {
      fill: {
        fgColor: { rgb: 'FC5531' }
      }
    }
  }
  if (data === 'off' || data === undefined) {
    return no
  } else {
    return yes
  }
}
const createExcel = (rules) => {
  const data = [
    ['规则', '中文', 'airbnb-base', 'recommended', 'standard', 'tencent']
  ]
  rules.forEach((item) => {
    const ruleZh = zh[item.rule]?.zh || ''
    data.push([
      item.rule,
      ruleZh,
      transformValue(item.airbnb),
      transformValue(item.recommended),
      transformValue(item.jupiter),
      transformValue(item.standard),
      transformValue(item.tencent)
    ])
  })
  const sheetOptions = { '!cols': [{ wch: 50 }, { wch: 50 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }] }
  const buffer = xlsx.build([
    {
      name: 'sheet1',
      data
    }
  ], sheetOptions)

  writeFileSync('book.xlsx', buffer, { flag: 'w' }) // 如果文件存在，覆盖
}
// console.log(standard.rules);
// combineRulesESM(airbnb.extends);
const tencentRules = Object.assign({}, tencentBase.rules, tencentImport.rules)
const airbnbRules = combineRules(airbnb.extends)
const recommendedRules = eslintRecommended.rules
const jupiterRules = getJupiterRules()
const standardRules = standard.rules
const result = compareRules([{
  key: 'airbnb',
  value: formatRules(airbnbRules)
}, {
  key: 'recommended',
  value: formatRules(recommendedRules)
}, {
  key: 'standard',
  value: formatRules(standardRules)
}, {
  key: 'tencent',
  value: formatRules(tencentRules)
}])
// createExcel(result);
setTimeout(() => {
  console.log('timer1')
  setImmediate(function () { console.log('immd 1') })
  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  setImmediate(function () { console.log('immd 2') })
  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)
