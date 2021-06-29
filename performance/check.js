class Check {
    static isObject(obj, strict) {
      if (typeof obj !== 'function') return false;
  
      const str = obj.toString();
  
      // async function or arrow function
      if (obj.prototype === undefined) return false;
      // generator function or malformed definition
      if (obj.prototype.constructor !== obj) return false;
      // ES6 class
      if (str.slice(0, 5) === 'class') return true;
      // has own prototype properties
      if (Object.getOwnPropertyNames(obj.prototype).length >= 2) return true;
      // anonymous function
      if (/^function\s+\(|^function\s+anonymous\(/.test(str)) return false;
      // ES5 class without `this` in the body and the name's first character
      // upper-cased.
      if (strict && /^function\s+[A-Z]/.test(str)) return true;
      // has `this` in the body
      if (/\b\(this\b|\bthis[.[]\b/.test(str)) {
        // not strict or ES5 class generated by babel
        if (!strict || /classCallCheck\(this/.test(str)) return true;
  
        return /^function\sdefault_\d+\s*\(/.test(str);
      }
  
      return false;
    }
  }
  
  module.exports = Check;