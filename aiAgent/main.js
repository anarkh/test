// main.js - 展示真实的交互场景
const AIAgent = require('./agent');

async function main() {
  // 创建AI Agent实例
  const agent = new AIAgent();
  
  console.log('AI Agent 演示已启动！');
  console.log('----------------------');
  
  // 模拟真实对话场景
  const conversation = [
    {
      user: [
          {
            type: 'image_url',
            image_url: {
              url: 'https://ark-project.tos-cn-beijing.ivolces.com/images/view.jpeg',
            },
          },
          { type: 'text', text: '这是哪里？' },
        ],
      description: '基础问题测试'
    },
    // {
    //   user: '它和机器学习有什么区别？',
    //   description: '上下文理解测试（引用之前的对话）'
    // },
    // {
    //   user: '那你能给我举一个机器学习的实际应用例子吗？',
    //   description: '连续对话和知识应用测试'
    // }
  ];
  
  for (const turn of conversation) {
    console.log(`\n[${turn.description}]`);
    console.log(`用户: ${turn.user}`);
    console.log('AI正在思考...');
    const response = await agent.generateResponse(turn.user);
    console.log(`AI: ${response}`);
    console.log('----------------------');
  }
  
  // 展示会话信息
  const sessionInfo = agent.getSessionInfo();
  console.log(`\n会话统计:`);
  console.log(`- 开始时间: ${sessionInfo.startTime}`);
  console.log(`- 消息数量: ${sessionInfo.messageCount}`);
  console.log(`- 记忆大小: ${sessionInfo.memorySize}`);
  
  console.log('\n演示会话结束。请运行 node interactive.js 开始真实交互！');
}

main().catch(console.error);