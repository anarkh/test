const middlewares = [
  async (context, next) => {
    console.log(1);
    await next();
    console.log(3);
  },
  async (context, next) => {
    console.log(2);
    await next();
    console.log(4);
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

compose();
