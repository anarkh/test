jest.mock('yaml', () => {
  const originalModule = jest.requireActual('yaml');
  return {
      __esModule: true,
      ...originalModule,
      parse: jest.fn().mockReturnValue(3),
  };
});