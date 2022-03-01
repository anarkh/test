// 提供头文件node_api.h；
#include <node_api.h>
#include <stdio.h>

// 实际暴露的方法
napi_value Echo(napi_env env, napi_callback_info info)
{
    // 任何 N-API 调用都返回一个napi_status枚举，来表示这次调用成功与否；
    napi_status status;

    size_t argc = 1;
    // 所有JavaScript数据类型都被黑盒类型napi_value封装
    napi_value argv[1];
    status = napi_get_cb_info(env, info, &argc, argv, 0, 0);
    if(status != napi_ok || argc < 1)
    {
        napi_throw_type_error(env, NULL, "Wrong number of arguments");
        status = napi_get_undefined(env, argv);
    }

    // N-API 的返回值由于被napi_status占坑了，所以真实返回值通过形参来传递；
    return argv[0];
}

// 实际暴露的方法
napi_value Add(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2];
    napi_get_cb_info(env, info, &argc, args, NULL, NULL); 
    int a;
    napi_get_value_int32(env, args[0], &a);
    int b;
    napi_get_value_int32(env, args[1], &b);

    int res = a+b;
    napi_value ret; 
    napi_create_int32(env, res, &ret); 
    return ret; 
}
// 扩展的初始化方法
// env: 环境变量
// exports： node模块中对外暴露的对象
napi_value Init(napi_env env, napi_value exports)
{
    napi_status status;
    // napi_property_descriptor 为结构体，作用是描述扩展暴露的 方法/属性 的描述
    napi_property_descriptor desc =
        { "echo", 0, Echo, 0, 0, 0, napi_default, 0 };
    status = napi_define_properties(env, exports, 1, &desc); //定义暴露的方法
    napi_property_descriptor desc2 =
        { "add", 0, Add, 0, 0, 0, napi_default, 0 };
    napi_define_properties(env, exports, 1, &desc2); //定义暴露的方法
    return exports;
}
// 注册扩展， 扩展名叫设置的NODE_GYP_MODULE_NAME，Init为扩展的初始化方法
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)