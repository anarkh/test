const middlewares = [
  async (context, next) => {
    context.a = 2;
    console.log(1);
    await next();
    console.log(3);
  },
  async (context, next) => {
    console.log(2);
    await next();
    context.b = 5;
    console.log(4);
  },
  async (context, next) => {
    console.log(5);
    await next();
  },
];

async function compose(context) {
  let index = -1;
  const dispatch = async (i) => {
    index = i;
    const fn = middlewares[i];
    if (!fn)  return;
    return await fn.call(this, context, dispatch.bind(null, i+1));
  }
  await dispatch(0);
}

const composeMiddleware = (ms) => {
  return async(context, next) => {
      const dispatch = async (i) => {
        const fn = i === ms.length ? next: ms[i];
        if (!fn)  return;
        return await fn.call(this, context, dispatch.bind(null, i+1));
      }
      await dispatch(0);
  }
};

const test = async () => {
  const context = {
    a: 1,
  };
  await compose(context);
  console.log(context);
}

const test2 = async () => {
  const context = {
    a: 1,
  };
  const fn = composeMiddleware(middlewares);
  await fn(context, async () => {
    console.log(6);
  });
  console.log(context);
}
test2();