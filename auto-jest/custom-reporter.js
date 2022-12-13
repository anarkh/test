class CustomReporter {
  constructor(globalConfig, reporterOptions, reporterContext) {
    // eslint-disable-next-line no-underscore-dangle
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  onRunComplete(_testContexts, _results) {
    console.log('Custom reporter');
  }

  // Optionally, reporters can force Jest to exit with non zero code by returning
  // an `Error` from `getLastError()` method.
  getLastError() {
    if (this._shouldFail) {
      return new Error('Custom error reported!');
    }
  }
}

module.exports = CustomReporter;