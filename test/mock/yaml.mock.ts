jest.mock('yaml', () => {
  const originalModule = jest.requireActual('yaml');
  return {
      __esModule: true,
      ...originalModule,
      test: jest.fn().mockResolvedValue({
          host: '127.0.0.1',
          port: 3000,
          uri: '127.0.0.1: 3000'
      })
  };
});