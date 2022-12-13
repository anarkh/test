jest.mock('@vue/server-renderer', () => {
  const originalModule = jest.requireActual('@vue/server-renderer');
  return {
      __esModule: true,
      ...originalModule,
      parse: jest.fn().mockReturnValue(3),
  };
});