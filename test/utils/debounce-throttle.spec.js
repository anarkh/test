import { debounce } from '../../utils/debounce-throttle';

describe('debounce', () => {
  it('should be a function', (done) => {
    const test = jest.fn();
    const debounceTest = debounce(test, 300)
    debounceTest(1)
    debounceTest(2)
    setTimeout(() => {
      expect(test).toBeCalledTimes(1);
      done();
    }, 300)
  });
});