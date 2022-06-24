const eslintRules = {
  'for-direction': {
    en: 'for-direction',
    zh: '强制 “for” 循环中更新子句的计数器朝着正确的方向移动'
  },
  'getter-return': {
    en: 'getter-return',
    zh: '强制 getter 函数中出现 return 语句'
  },
  'no-async-promise-executor': {
    en: 'no-async-promise-executor',
    zh: '禁止使用异步函数作为 Promise executor'
  },
  'no-await-in-loop': { en: 'no-await-in-loop', zh: '禁止在循环中出现 await' },
  'no-compare-neg-zero': {
    en: 'no-compare-neg-zero',
    zh: '禁止与 -0 进行比较'
  },
  'no-cond-assign': {
    en: 'no-cond-assign',
    zh: '禁止条件表达式中出现赋值操作符'
  },
  'no-console': { en: 'no-console', zh: '禁用 console' },
  'no-constant-condition': {
    en: 'no-constant-condition',
    zh: '禁止在条件中使用常量表达式'
  },
  'no-control-regex': {
    en: 'no-control-regex',
    zh: '禁止在正则表达式中使用控制字符'
  },
  'no-debugger': { en: 'no-debugger', zh: '禁用 debugger' },
  'no-dupe-args': {
    en: 'no-dupe-args',
    zh: '禁止 function 定义中出现重名参数'
  },
  'no-dupe-keys': { en: 'no-dupe-keys', zh: '禁止对象字面量中出现重复的 key' },
  'no-duplicate-case': {
    en: 'no-duplicate-case',
    zh: '禁止出现重复的 case 标签'
  },
  'no-empty': { en: 'no-empty', zh: '禁止出现空语句块' },
  'no-empty-character-class': {
    en: 'no-empty-character-class',
    zh: '禁止在正则表达式中使用空字符集'
  },
  'no-ex-assign': { en: 'no-ex-assign', zh: '禁止对 catch 子句的参数重新赋值' },
  'no-extra-boolean-cast': {
    en: 'no-extra-boolean-cast',
    zh: '禁止不必要的布尔转换'
  },
  'no-extra-parens': { en: 'no-extra-parens', zh: '禁止不必要的括号' },
  'no-extra-semi': { en: 'no-extra-semi', zh: '禁止不必要的分号' },
  'no-func-assign': {
    en: 'no-func-assign',
    zh: '禁止对 function 声明重新赋值'
  },
  'no-inner-declarations': {
    en: 'no-inner-declarations',
    zh: '禁止在嵌套的块中出现变量声明或 function 声明'
  },
  'no-invalid-regexp': {
    en: 'no-invalid-regexp',
    zh: '禁止 RegExp 构造函数中存在无效的正则表达式字符串'
  },
  'no-irregular-whitespace': {
    en: 'no-irregular-whitespace',
    zh: '禁止不规则的空白'
  },
  'no-misleading-character-class': {
    en: 'no-misleading-character-class',
    zh: '不允许在字符类语法中出现由多个代码点组成的字符'
  },
  'no-obj-calls': { en: 'no-obj-calls', zh: '禁止把全局对象作为函数调用' },
  'no-prototype-builtins': {
    en: 'no-prototype-builtins',
    zh: '禁止直接调用 Object.prototypes 的内置属性'
  },
  'no-regex-spaces': {
    en: 'no-regex-spaces',
    zh: '禁止正则表达式字面量中出现多个空格'
  },
  'no-sparse-arrays': { en: 'no-sparse-arrays', zh: '禁用稀疏数组' },
  'no-template-curly-in-string': {
    en: 'no-template-curly-in-string',
    zh: '禁止在常规字符串中出现模板字面量占位符语法'
  },
  'no-unexpected-multiline': {
    en: 'no-unexpected-multiline',
    zh: '禁止出现令人困惑的多行表达式'
  },
  'no-unreachable': {
    en: 'no-unreachable',
    zh: '禁止在 return、throw、continue 和 break 语句之后出现不可达代码'
  },
  'no-unsafe-finally': {
    en: 'no-unsafe-finally',
    zh: '禁止在 finally 语句块中出现控制流语句'
  },
  'no-unsafe-negation': {
    en: 'no-unsafe-negation',
    zh: '禁止对关系运算符的左操作数使用否定操作符'
  },
  'require-atomic-updates': {
    en: 'require-atomic-updates',
    zh: '禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值'
  },
  'use-isnan': { en: 'use-isnan', zh: '要求使用 isNaN() 检查 NaN' },
  'valid-typeof': {
    en: 'valid-typeof',
    zh: '强制 typeof 表达式与有效的字符串进行比较'
  },
  'accessor-pairs': {
    en: 'accessor-pairs',
    zh: '强制 getter 和 setter 在对象中成对出现'
  },
  'array-callback-return': {
    en: 'array-callback-return',
    zh: '强制数组方法的回调函数中有 return 语句'
  },
  'block-scoped-var': {
    en: 'block-scoped-var',
    zh: '强制把变量的使用限制在其定义的作用域范围内'
  },
  'class-methods-use-this': {
    en: 'class-methods-use-this',
    zh: '强制类方法使用 this'
  },
  complexity: { en: 'complexity', zh: '指定程序中允许的最大环路复杂度' },
  'consistent-return': {
    en: 'consistent-return',
    zh: '要求 return 语句要么总是指定返回的值，要么不指定'
  },
  curly: { en: 'curly', zh: '强制所有控制语句使用一致的括号风格' },
  'default-case': {
    en: 'default-case',
    zh: '要求 switch 语句中有 default 分支'
  },
  'dot-location': { en: 'dot-location', zh: '强制在点号之前和之后一致的换行' },
  'dot-notation': { en: 'dot-notation', zh: '强制尽可能地使用点号' },
  eqeqeq: { en: 'eqeqeq', zh: '要求使用 === 和 !==' },
  'guard-for-in': {
    en: 'guard-for-in',
    zh: '要求 for-in 循环中有一个 if 语句'
  },
  'max-classes-per-file': {
    en: 'max-classes-per-file',
    zh: '强制每个文件中包含的的类的最大数量'
  },
  'no-alert': { en: 'no-alert', zh: '禁用 alert、confirm 和 prompt' },
  'no-caller': {
    en: 'no-caller',
    zh: '禁用 arguments.caller 或 arguments.callee'
  },
  'no-case-declarations': {
    en: 'no-case-declarations',
    zh: '不允许在 case 子句中使用词法声明'
  },
  'no-div-regex': {
    en: 'no-div-regex',
    zh: '禁止除法操作符显式的出现在正则表达式开始的位置'
  },
  'no-else-return': {
    en: 'no-else-return',
    zh: '禁止 if 语句中 return 语句之后有 else 块'
  },
  'no-empty-function': { en: 'no-empty-function', zh: '禁止出现空函数' },
  'no-empty-pattern': { en: 'no-empty-pattern', zh: '禁止使用空解构模式' },
  'no-eq-null': {
    en: 'no-eq-null',
    zh: '禁止在没有类型检查操作符的情况下与 null 进行比较'
  },
  'no-eval': { en: 'no-eval', zh: '禁用 eval()' },
  'no-extend-native': { en: 'no-extend-native', zh: '禁止扩展原生类型' },
  'no-extra-bind': { en: 'no-extra-bind', zh: '禁止不必要的 .bind() 调用' },
  'no-extra-label': { en: 'no-extra-label', zh: '禁用不必要的标签' },
  'no-fallthrough': { en: 'no-fallthrough', zh: '禁止 case 语句落空' },
  'no-floating-decimal': {
    en: 'no-floating-decimal',
    zh: '禁止数字字面量中使用前导和末尾小数点'
  },
  'no-global-assign': {
    en: 'no-global-assign',
    zh: '禁止对原生对象或只读的全局对象进行赋值'
  },
  'no-implicit-coercion': {
    en: 'no-implicit-coercion',
    zh: '禁止使用短符号进行类型转换'
  },
  'no-implicit-globals': {
    en: 'no-implicit-globals',
    zh: '禁止在全局范围内使用变量声明和 function 声明'
  },
  'no-implied-eval': {
    en: 'no-implied-eval',
    zh: '禁止使用类似 eval() 的方法'
  },
  'no-invalid-this': {
    en: 'no-invalid-this',
    zh: '禁止 this 关键字出现在类和类对象之外'
  },
  'no-iterator': { en: 'no-iterator', zh: '禁用 __iterator__ 属性' },
  'no-labels': { en: 'no-labels', zh: '禁用标签语句' },
  'no-lone-blocks': { en: 'no-lone-blocks', zh: '禁用不必要的嵌套块' },
  'no-loop-func': {
    en: 'no-loop-func',
    zh: '禁止在循环语句中出现包含不安全引用的函数声明'
  },
  'no-magic-numbers': { en: 'no-magic-numbers', zh: '禁用魔术数字' },
  'no-multi-spaces': { en: 'no-multi-spaces', zh: '禁止使用多个空格' },
  'no-multi-str': { en: 'no-multi-str', zh: '禁止使用多行字符串' },
  'no-new': { en: 'no-new', zh: '禁止使用 new 以避免产生副作用' },
  'no-new-func': {
    en: 'no-new-func',
    zh: '禁止对 Function 对象使用 new 操作符'
  },
  'no-new-wrappers': {
    en: 'no-new-wrappers',
    zh: '禁止对 String，Number 和 Boolean 使用 new 操作符'
  },
  'no-octal': { en: 'no-octal', zh: '禁用八进制字面量' },
  'no-octal-escape': {
    en: 'no-octal-escape',
    zh: '禁止在字符串中使用八进制转义序列'
  },
  'no-param-reassign': {
    en: 'no-param-reassign',
    zh: '禁止对 function 的参数进行重新赋值'
  },
  'no-proto': { en: 'no-proto', zh: '禁用 __proto__ 属性' },
  'no-redeclare': { en: 'no-redeclare', zh: '禁止多次声明同一变量' },
  'no-restricted-properties': {
    en: 'no-restricted-properties',
    zh: '禁止使用对象的某些属性'
  },
  'no-return-assign': {
    en: 'no-return-assign',
    zh: '禁止在 return 语句中使用赋值语句'
  },
  'no-return-await': { en: 'no-return-await', zh: '禁用不必要的 return await' },
  'no-script-url': { en: 'no-script-url', zh: '禁止使用 javascript: url' },
  'no-self-assign': { en: 'no-self-assign', zh: '禁止自我赋值' },
  'no-self-compare': { en: 'no-self-compare', zh: '禁止自身比较' },
  'no-sequences': { en: 'no-sequences', zh: '禁用逗号操作符' },
  'no-throw-literal': { en: 'no-throw-literal', zh: '禁止抛出异常字面量' },
  'no-unmodified-loop-condition': {
    en: 'no-unmodified-loop-condition',
    zh: '禁用一成不变的循环条件'
  },
  'no-unused-expressions': {
    en: 'no-unused-expressions',
    zh: '禁止出现未使用过的表达式'
  },
  'no-unused-labels': { en: 'no-unused-labels', zh: '禁用出现未使用过的标' },
  'no-useless-call': {
    en: 'no-useless-call',
    zh: '禁止不必要的 .call() 和 .apply()'
  },
  'no-useless-catch': { en: 'no-useless-catch', zh: '禁止不必要的 catch 子句' },
  'no-useless-concat': {
    en: 'no-useless-concat',
    zh: '禁止不必要的字符串字面量或模板字面量的连接'
  },
  'no-useless-escape': { en: 'no-useless-escape', zh: '禁用不必要的转义字符' },
  'no-useless-return': {
    en: 'no-useless-return',
    zh: '禁止多余的 return 语句'
  },
  'no-void': { en: 'no-void', zh: '禁用 void 操作符' },
  'no-warning-comments': {
    en: 'no-warning-comments',
    zh: '禁止在注释中使用特定的警告术语'
  },
  'no-with': { en: 'no-with', zh: '禁用 with 语句' },
  'prefer-named-capture-group': {
    en: 'prefer-named-capture-group',
    zh: '建议在正则表达式中使用命名捕获组'
  },
  'prefer-promise-reject-errors': {
    en: 'prefer-promise-reject-errors',
    zh: '要求使用 Error 对象作为 Promise 拒绝的原因'
  },
  radix: { en: 'radix', zh: '强制在 parseInt() 使用基数参数' },
  'require-await': {
    en: 'require-await',
    zh: '禁止使用不带 await 表达式的 async 函数'
  },
  'require-unicode-regexp': {
    en: 'require-unicode-regexp',
    zh: '强制在 RegExp 上使用 u 标志'
  },
  'vars-on-top': {
    en: 'vars-on-top',
    zh: '要求所有的 var 声明出现在它们所在的作用域顶部'
  },
  'wrap-iife': { en: 'wrap-iife', zh: '要求 IIFE 使用括号括起来' },
  yoda: { en: 'yoda', zh: '要求或禁止 “Yoda” 条件' },
  strict: { en: 'strict', zh: '要求或禁止使用严格模式指令' },
  'init-declarations': {
    en: 'init-declarations',
    zh: '要求或禁止 var 声明中的初始化'
  },
  'no-delete-var': { en: 'no-delete-var', zh: '禁止删除变量' },
  'no-label-var': { en: 'no-label-var', zh: '不允许标签与变量同名' },
  'no-restricted-globals': {
    en: 'no-restricted-globals',
    zh: '禁用特定的全局变量'
  },
  'no-shadow': { en: 'no-shadow', zh: '禁止变量声明与外层作用域的变量同名' },
  'no-shadow-restricted-names': {
    en: 'no-shadow-restricted-names',
    zh: '禁止将标识符定义为受限的名字'
  },
  'no-undef': {
    en: 'no-undef',
    zh: '禁用未声明的变量，除非它们在 /*global */ 注释中被提到'
  },
  'no-undef-init': { en: 'no-undef-init', zh: '禁止将变量初始化为 undefined' },
  'no-undefined': { en: 'no-undefined', zh: '禁止将 undefined 作为标识符' },
  'no-unused-vars': { en: 'no-unused-vars', zh: '禁止出现未使用过的变量' },
  'no-use-before-define': {
    en: 'no-use-before-define',
    zh: '禁止在变量定义之前使用它们'
  },
  'callback-return': {
    en: 'callback-return',
    zh: '强制数组方法的回调函数中有 return 语句'
  },
  'global-require': {
    en: 'global-require',
    zh: '要求 require() 出现在顶层模块作用域中'
  },
  'handle-callback-err': {
    en: 'handle-callback-err',
    zh: '要求回调函数中有容错处理'
  },
  'no-buffer-constructor': {
    en: 'no-buffer-constructor',
    zh: '禁用 Buffer() 构造函数'
  },
  'no-mixed-requires': {
    en: 'no-mixed-requires',
    zh: '禁止混合常规变量声明和 require 调用'
  },
  'no-new-require': {
    en: 'no-new-require',
    zh: '禁止调用 require 时使用 new 操作符'
  },
  'no-path-concat': {
    en: 'no-path-concat',
    zh: '禁止对 __dirname 和 __filename 进行字符串连接'
  },
  'no-process-env': { en: 'no-process-env', zh: '禁用 process.env' },
  'no-process-exit': { en: 'no-process-exit', zh: '禁用 process.exit()' },
  'no-restricted-modules': {
    en: 'no-restricted-modules',
    zh: '禁用通过 require 加载的指定模块'
  },
  'no-sync': { en: 'no-sync', zh: '禁用同步方法' },
  'array-bracket-newline': {
    en: 'array-bracket-newline',
    zh: '在数组开括号后和闭括号前强制换行'
  },
  'array-bracket-spacing': {
    en: 'array-bracket-spacing',
    zh: '强制数组方括号中使用一致的空格'
  },
  'array-element-newline': {
    en: 'array-element-newline',
    zh: '强制数组元素间出现换行'
  },
  'block-spacing': {
    en: 'block-spacing',
    zh: '禁止或强制在代码块中开括号前和闭括号后有空格'
  },
  'brace-style': {
    en: 'brace-style',
    zh: '强制在代码块中使用一致的大括号风格'
  },
  camelcase: { en: 'camelcase', zh: '强制使用骆驼拼写法命名约定' },
  'capitalized-comments': {
    en: 'capitalized-comments',
    zh: '强制或禁止对注释的第一个字母大写'
  },
  'comma-dangle': { en: 'comma-dangle', zh: '要求或禁止末尾逗号' },
  'comma-spacing': { en: 'comma-spacing', zh: '强制在逗号前后使用一致的空格' },
  'comma-style': { en: 'comma-style', zh: '强制使用一致的逗号风格' },
  'computed-property-spacing': {
    en: 'computed-property-spacing',
    zh: '强制在计算的属性的方括号中使用一致的空格'
  },
  'consistent-this': {
    en: 'consistent-this',
    zh: '当获取当前执行环境的上下文时，强制使用一致的命名'
  },
  'eol-last': { en: 'eol-last', zh: '要求或禁止文件末尾存在空行' },
  'func-call-spacing': {
    en: 'func-call-spacing',
    zh: '要求或禁止在函数标识符和其调用之间有空格'
  },
  'func-name-matching': {
    en: 'func-name-matching',
    zh: '要求函数名与赋值给它们的变量名或属性名相匹配'
  },
  'func-names': {
    en: 'func-names',
    zh: '要求或禁止使用命名的 function 表达式'
  },
  'func-style': {
    en: 'func-style',
    zh: '强制一致地使用 function 声明或表达式'
  },
  'function-paren-newline': {
    en: 'function-paren-newline',
    zh: '强制在函数括号内使用一致的换行'
  },
  'id-blacklist': { en: 'id-blacklist', zh: '禁用指定的标识符' },
  'id-length': { en: 'id-length', zh: '强制标识符的最小和最大长度' },
  'id-match': { en: 'id-match', zh: '要求标识符匹配一个指定的正则表达式' },
  'implicit-arrow-linebreak': {
    en: 'implicit-arrow-linebreak',
    zh: '强制隐式返回的箭头函数体的位置'
  },
  indent: { en: 'indent', zh: '强制使用一致的缩进' },
  'jsx-quotes': {
    en: 'jsx-quotes',
    zh: '强制在 JSX 属性中一致地使用双引号或单引号'
  },
  'key-spacing': {
    en: 'key-spacing',
    zh: '强制在对象字面量的属性中键和值之间使用一致的间距'
  },
  'keyword-spacing': {
    en: 'keyword-spacing',
    zh: '强制在关键字前后使用一致的空格'
  },
  'line-comment-position': {
    en: 'line-comment-position',
    zh: '强制行注释的位置'
  },
  'linebreak-style': { en: 'linebreak-style', zh: '强制使用一致的换行风格' },
  'lines-around-comment': {
    en: 'lines-around-comment',
    zh: '要求在注释周围有空行'
  },
  'lines-between-class-members': {
    en: 'lines-between-class-members',
    zh: '要求或禁止类成员之间出现空行'
  },
  'max-depth': { en: 'max-depth', zh: '强制可嵌套的块的最大深度' },
  'max-len': { en: 'max-len', zh: '强制一行的最大长度' },
  'max-lines': { en: 'max-lines', zh: '强制最大行数' },
  'max-lines-per-function': {
    en: 'max-lines-per-function',
    zh: '强制函数最大代码行数'
  },
  'max-nested-callbacks': {
    en: 'max-nested-callbacks',
    zh: '强制回调函数最大嵌套深度'
  },
  'max-params': { en: 'max-params', zh: '强制函数定义中最多允许的参数数量' },
  'max-statements': {
    en: 'max-statements',
    zh: '强制函数块最多允许的的语句数量'
  },
  'max-statements-per-line': {
    en: 'max-statements-per-line',
    zh: '强制每一行中所允许的最大语句数量'
  },
  'multiline-comment-style': {
    en: 'multiline-comment-style',
    zh: '强制对多行注释使用特定风格'
  },
  'multiline-ternary': {
    en: 'multiline-ternary',
    zh: '要求或禁止在三元操作数中间换行'
  },
  'new-cap': { en: 'new-cap', zh: '要求构造函数首字母大写' },
  'new-parens': {
    en: 'new-parens',
    zh: '强制或禁止调用无参构造函数时有圆括号'
  },
  'newline-per-chained-call': {
    en: 'newline-per-chained-call',
    zh: '要求方法链中每个调用都有一个换行符'
  },
  'no-array-constructor': {
    en: 'no-array-constructor',
    zh: '禁用 Array 构造函数'
  },
  'no-bitwise': { en: 'no-bitwise', zh: '禁用按位运算符' },
  'no-continue': { en: 'no-continue', zh: '禁用 continue 语句' },
  'no-inline-comments': {
    en: 'no-inline-comments',
    zh: '禁止在代码后使用内联注释'
  },
  'no-lonely-if': {
    en: 'no-lonely-if',
    zh: '禁止 if 作为唯一的语句出现在 else 语句中'
  },
  'no-mixed-operators': {
    en: 'no-mixed-operators',
    zh: '禁止混合使用不同的操作符'
  },
  'no-mixed-spaces-and-tabs': {
    en: 'no-mixed-spaces-and-tabs',
    zh: '禁止空格和 tab 的混合缩进'
  },
  'no-multi-assign': { en: 'no-multi-assign', zh: '禁止连续赋值' },
  'no-multiple-empty-lines': {
    en: 'no-multiple-empty-lines',
    zh: '禁止出现多行空行'
  },
  'no-negated-condition': {
    en: 'no-negated-condition',
    zh: '禁用否定的表达式'
  },
  'no-nested-ternary': { en: 'no-nested-ternary', zh: '禁用嵌套的三元表达式' },
  'no-new-object': { en: 'no-new-object', zh: '禁用 Object 的构造函数' },
  'no-plusplus': { en: 'no-plusplus', zh: '禁用一元操作符 ++ 和 --' },
  'no-restricted-syntax': { en: 'no-restricted-syntax', zh: '禁用特定的语法' },
  'no-tabs': { en: 'no-tabs', zh: '禁用 tab' },
  'no-ternary': { en: 'no-ternary', zh: '禁用三元操作符' },
  'no-trailing-spaces': { en: 'no-trailing-spaces', zh: '禁用行尾空格' },
  'no-underscore-dangle': {
    en: 'no-underscore-dangle',
    zh: '禁止标识符中有悬空下划线'
  },
  'no-unneeded-ternary': {
    en: 'no-unneeded-ternary',
    zh: '禁止可以在有更简单的可替代的表达式时使用三元操作符'
  },
  'no-whitespace-before-property': {
    en: 'no-whitespace-before-property',
    zh: '禁止属性前有空白'
  },
  'nonblock-statement-body-position': {
    en: 'nonblock-statement-body-position',
    zh: '强制单个语句的位置'
  },
  'object-curly-newline': {
    en: 'object-curly-newline',
    zh: '强制大括号内换行符的一致性'
  },
  'object-curly-spacing': {
    en: 'object-curly-spacing',
    zh: '强制在大括号中使用一致的空格'
  },
  'object-property-newline': {
    en: 'object-property-newline',
    zh: '强制将对象的属性放在不同的行上'
  },
  'one-var': { en: 'one-var', zh: '强制函数中的变量要么一起声明要么分开声明' },
  'one-var-declaration-per-line': {
    en: 'one-var-declaration-per-line',
    zh: '要求或禁止在变量声明周围换行'
  },
  'operator-assignment': {
    en: 'operator-assignment',
    zh: '要求或禁止在可能的情况下使用简化的赋值操作符'
  },
  'operator-linebreak': {
    en: 'operator-linebreak',
    zh: '强制操作符使用一致的换行符'
  },
  'padded-blocks': { en: 'padded-blocks', zh: '要求或禁止块内填充' },
  'padding-line-between-statements': {
    en: 'padding-line-between-statements',
    zh: '要求或禁止在语句间填充空行'
  },
  'prefer-object-spread': {
    en: 'prefer-object-spread',
    zh: '禁止使用以对象字面量作为第一个参数的 Object.assign，优先使用对象扩展。'
  },
  'quote-props': {
    en: 'quote-props',
    zh: '要求对象字面量属性名称用引号括起来'
  },
  quotes: { en: 'quotes', zh: '强制使用一致的反勾号、双引号或单引号' },
  semi: { en: 'semi', zh: '要求或禁止使用分号代替 ASI' },
  'semi-spacing': {
    en: 'semi-spacing',
    zh: '强制分号之前和之后使用一致的空格'
  },
  'semi-style': { en: 'semi-style', zh: '强制分号的位置' },
  'sort-keys': { en: 'sort-keys', zh: '要求对象属性按序排列' },
  'sort-vars': { en: 'sort-vars', zh: '要求同一个声明块中的变量按顺序排列' },
  'space-before-blocks': {
    en: 'space-before-blocks',
    zh: '强制在块之前使用一致的空格'
  },
  'space-before-function-paren': {
    en: 'space-before-function-paren',
    zh: '强制在 function的左括号之前使用一致的空格'
  },
  'space-in-parens': {
    en: 'space-in-parens',
    zh: '强制在圆括号内使用一致的空格'
  },
  'space-infix-ops': { en: 'space-infix-ops', zh: '要求操作符周围有空格' },
  'space-unary-ops': {
    en: 'space-unary-ops',
    zh: '强制在一元操作符前后使用一致的空格'
  },
  'spaced-comment': {
    en: 'spaced-comment',
    zh: '强制在注释中 // 或 /* 使用一致的空格'
  },
  'switch-colon-spacing': {
    en: 'switch-colon-spacing',
    zh: '强制在 switch 的冒号左右有空格'
  },
  'template-tag-spacing': {
    en: 'template-tag-spacing',
    zh: '要求或禁止在模板标记和它们的字面量之间有空格'
  },
  'unicode-bom': {
    en: 'unicode-bom',
    zh: '要求或禁止 Unicode 字节顺序标记 (BOM)'
  },
  'wrap-regex': { en: 'wrap-regex', zh: '要求正则表达式被括号括起来' },
  'arrow-body-style': {
    en: 'arrow-body-style',
    zh: '要求箭头函数体使用大括号'
  },
  'arrow-parens': { en: 'arrow-parens', zh: '要求箭头函数的参数使用圆括号' },
  'arrow-spacing': {
    en: 'arrow-spacing',
    zh: '强制箭头函数的箭头前后使用一致的空格'
  },
  'constructor-super': {
    en: 'constructor-super',
    zh: '要求在构造函数中有 super() 的调用'
  },
  'generator-star-spacing': {
    en: 'generator-star-spacing',
    zh: '强制 generator 函数中 * 号周围使用一致的空格'
  },
  'no-class-assign': { en: 'no-class-assign', zh: '禁止修改类声明的变量' },
  'no-confusing-arrow': {
    en: 'no-confusing-arrow',
    zh: '禁止在可能与比较操作符相混淆的地方使用箭头函数'
  },
  'no-const-assign': { en: 'no-const-assign', zh: '禁止修改 const 声明的变量' },
  'no-dupe-class-members': {
    en: 'no-dupe-class-members',
    zh: '禁止类成员中出现重复的名称'
  },
  'no-duplicate-imports': {
    en: 'no-duplicate-imports',
    zh: '禁止重复模块导入'
  },
  'no-new-symbol': {
    en: 'no-new-symbol',
    zh: '禁止 Symbolnew 操作符和 new 一起使用'
  },
  'no-restricted-imports': {
    en: 'no-restricted-imports',
    zh: '禁止使用指定的 import 加载的模块'
  },
  'no-this-before-super': {
    en: 'no-this-before-super',
    zh: '禁止在构造函数中，在调用 super() 之前使用 this 或 super'
  },
  'no-useless-computed-key': {
    en: 'no-useless-computed-key',
    zh: '禁止在对象中使用不必要的计算属性'
  },
  'no-useless-constructor': {
    en: 'no-useless-constructor',
    zh: '禁用不必要的构造函数'
  },
  'no-useless-rename': {
    en: 'no-useless-rename',
    zh: '禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字'
  },
  'no-var': { en: 'no-var', zh: '要求使用 let 或 const 而不是 var' },
  'object-shorthand': {
    en: 'object-shorthand',
    zh: '要求或禁止对象字面量中方法和属性使用简写语法'
  },
  'prefer-arrow-callback': {
    en: 'prefer-arrow-callback',
    zh: '要求回调函数使用箭头函数'
  },
  'prefer-const': {
    en: 'prefer-const',
    zh: '要求使用 const 声明那些声明后不再被修改的变量'
  },
  'prefer-destructuring': {
    en: 'prefer-destructuring',
    zh: '优先使用数组和对象解构'
  },
  'prefer-numeric-literals': {
    en: 'prefer-numeric-literals',
    zh: '禁用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量'
  },
  'prefer-rest-params': {
    en: 'prefer-rest-params',
    zh: '要求使用剩余参数而不是 arguments'
  },
  'prefer-spread': {
    en: 'prefer-spread',
    zh: '要求使用扩展运算符而非 .apply()'
  },
  'prefer-template': {
    en: 'prefer-template',
    zh: '要求使用模板字面量而非字符串连接'
  },
  'require-yield': { en: 'require-yield', zh: '要求 generator 函数内有 yield' },
  'rest-spread-spacing': {
    en: 'rest-spread-spacing',
    zh: '强制剩余和扩展运算符及其表达式之间有空格'
  },
  'sort-imports': { en: 'sort-imports', zh: '强制模块内的 import 排序' },
  'symbol-description': { en: 'symbol-description', zh: '要求 symbol 描述' },
  'template-curly-spacing': {
    en: 'template-curly-spacing',
    zh: '要求或禁止模板字符串中的嵌入表达式周围空格的使用'
  },
  'yield-star-spacing': {
    en: 'yield-star-spacing',
    zh: '强制在 yield* 表达式中 * 周围使用空格'
  }
}

const addRules = {
  'default-case-last': {
    en: 'default-case-last',
    zh: '将开关语句中的缺省子句强制为最后一个子句'
  },
  'default-param-last': {
    en: 'default-param-last',
    zh: '把默认参数放在最后,可以让函数调用省略可选的尾部参数。'
  },
  'grouped-accessor-pairs': {
    en: 'grouped-accessor-pairs',
    zh: '同一属性的getter和setter要相邻定义。'
  },
  'no-constructor-return': {
    en: 'no-constructor-return',
    zh: '不允许在构造函数中返回值'
  },
  'no-native-reassign': {
    en: 'no-native-reassign',
    zh: '不允许重新分配本地对象 v3.3.0 中已弃用，并被no-global-assign规则取代'
  },
  'no-nonoctal-decimal-escape': {
    en: 'no-nonoctal-decimal-escape',
    zh: '禁止\8和\9转义字符串文字中的序列'
  },
  'prefer-regex-literals': {
    en: 'prefer-regex-literals',
    zh: '不允许使用RegExp以字符串文字作为其参数的构造函数'
  },
  'no-dupe-else-if': {
    en: 'no-dupe-else-if',
    zh: '此规则不允许同一if-else-if链中的条件重复'
  },
  'no-import-assign': {
    en: 'no-import-assign',
    zh: '不允许修改import导入参数'
  },
  'no-loss-of-precision': {
    en: 'no-loss-of-precision',
    zh: '不允许使用失去精度的数字'
  },
  'no-promise-executor-return': {
    en: 'no-promise-executor-return',
    zh: '不允许直接从Promise执行程序函数return'
  },
  'no-setter-return': {
    en: 'no-setter-return',
    zh: '不允许从 setter 函数返回值'
  },
  'no-unreachable-loop': {
    en: 'no-unreachable-loop',
    zh: '禁止仅允许一次的循环'
  },
  'no-unsafe-optional-chaining': {
    en: 'no-unsafe-optional-chaining',
    zh: '不允许在有undefined的上下文中使用可选链接。'
  },
  'no-unused-private-class-members': {
    en: 'no-unused-private-class-members',
    zh: '不允许未使用的私有类成员。'
  },
  'no-useless-backreference': {
    en: 'no-useless-backreference',
    zh: '禁止在正则表达式中进行无用的反向引用'
  },
  'no-negated-in-lhs': {
    en: 'no-negated-in-lhs',
    zh: '进制！操作在in语法中使用 v3.3.0 中已弃用，并被no-unsafe-negation规则取代'
  },
  'valid-jsdoc': {
    en: 'valid-jsdoc',
    zh: '强制执行有效的 JSDoc 注释。v5.10.0中已弃用'
  },
  'function-call-argument-newline': {
    en: 'function-call-argument-newline',
    zh: '强制在函数调用的参数之间换行。'
  },
  'id-denylist': {
    en: 'id-denylist',
    zh: '不允许在变量和方法定义中指定标识符。'
  },
  'lines-around-directive': {
    en: 'lines-around-directive',
    zh: '禁止指令周围的空白换行符。'
  },
  'newline-after-var': {
    en: 'newline-after-var',
    zh: '要求或禁止变量声明语句后有一行空行 v4.0.0 中 已弃用'
  },
  'newline-before-return': {
    en: 'newline-before-return',
    zh: '要求 return 语句之前有一空行 v4.0.0 中 已弃用'
  },
  'no-spaced-func': {
    en: 'no-spaced-func',
    zh: '不允许函数标识符与其方法体之间存在间隔'
  },
  'prefer-exponentiation-operator': {
    en: 'prefer-exponentiation-operator',
    zh: '禁止调用Math.pow并建议改用**运算符'
  },
  'require-jsdoc': {
    en: 'require-jsdoc',
    zh: '需要 JSDoc 注释 v5.10.0中已弃用'
  },
  'no-catch-shadow': {
    en: 'no-catch-shadow',
    zh: '不允许在 catch 内隐藏变量。v5.1.0中已弃用 '
  },
  'no-restricted-exports': {
    en: 'no-restricted-exports',
    zh: '不允许import导出中指定名称。'
  },
  'prefer-reflect': {
    en: 'prefer-reflect',
    zh: '在适用的情况下使用reflect方法。v3.9.0 中已弃用'
  },
  yield: {
    en: 'yield',
    zh: '强制'
  },
  yield: {
    en: 'yield',
    zh: '强制'
  },
  yield: {
    en: 'yield',
    zh: '强制'
  }
}

Object.assign(eslintRules, addRules)
module.exports = eslintRules
