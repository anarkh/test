try{
  aaa
} catch (e) {
  // console.log(e);
  throw e;
}

const duridConfig = '{"device_id":66057921568,"keyword":"北京1号线","debug_info":{"aladdin_debug":1,"intervention_debug":1},"aid":13,"abparams":{"search":{"app_engine_host":"10.227.91.210","app_engine_port":7888}}}';
const query = {};
if (typeof duridConfig === 'string') {
  const druidObject = JSON.parse(duridConfig);
  Object.keys(druidObject).forEach((key) => {
      const { [key]: param } = query;
      if (typeof param === 'undefined') {
          let value = druidObject[key];
          if (typeof value === 'object') {
              value = JSON.stringify(value);
          }
          console.log(value);
      }
  });
}