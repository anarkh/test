// interactive.js - 实现真实的用户输入输出交互
const AIAgent = require('./agent');
const readline = require('readline');

async function interactiveChat() {
  const agent = new AIAgent();
  
  // 创建readline接口处理用户输入输出
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });
  
  // 欢迎信息
  console.log('====================================');
  console.log('    AI Agent 交互式对话系统');
  console.log('====================================');
  console.log('输入 "退出" 或 "quit" 结束会话');
  console.log('输入 "清空" 或 "clear" 清空对话历史');
  console.log('输入 "状态" 或 "status" 查看会话信息');
  console.log('====================================');
  
  // 开始对话循环
  const processUserInput = async () => {
    for await (const line of rl) {
      const input = line.trim();
      
      // 检查命令
      if (input.startsWith('/tool ')) {
        const [_, toolName, ...paramsParts] = input.split(' ');
        const paramsString = paramsParts.join(' ');
        
        try {
          // 尝试解析参数字符串为对象
          let params = {};
          if (paramsString && paramsString.startsWith('{')) {
            params = JSON.parse(paramsString);
          }
          
          const result = await agent.executeTool(toolName, params);
          console.log(`工具结果: ${result}`);
        } catch (error) {
          console.error('工具执行错误:', error.message);
        }
        rl.prompt();
        continue;
      } else if (input.toLowerCase() === '退出' || input.toLowerCase() === 'quit') {
        console.log('感谢使用，再见！');
        rl.close();
        break;
      } else if (input.toLowerCase() === '清空' || input.toLowerCase() === 'clear') {
        const result = agent.clearMemory();
        console.log(`系统: ${result}`);
        rl.prompt();
        continue;
      } else if (input.toLowerCase() === '状态' || input.toLowerCase() === 'status') {
        const info = agent.getSessionInfo();
        console.log(`系统: 会话开始于 ${info.startTime}`);
        console.log(`系统: 已处理 ${info.messageCount} 条消息`);
        console.log(`系统: 当前记忆中包含 ${info.memorySize} 条记录`);
        rl.prompt();
        continue;
      }
      
      // 处理用户查询
      try {
        console.log('AI正在思考...');
        const response = await agent.generateResponse(input);
        console.log(`AI: ${response}`);
      } catch (error) {
        console.error('错误:', error.message);
      } finally {
        rl.prompt();
      }
    }
  };
  
  // 启动处理
  rl.prompt();
  await processUserInput();
}

interactiveChat().catch(console.error);