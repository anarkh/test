// agent.js
const { OpenAI } = require('openai');
require('dotenv').config();

class AIAgent {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
    });
    this.memory = [];
    this.sessionStartTime = new Date().toLocaleString();
    this.messageCount = 0;
  }

  // 添加记忆
  addToMemory(role, content) {
    this.memory.push({
      role,
      content
    });
    
    // 限制记忆长度，避免上下文过长
    if (this.memory.length > 20) {
      this.memory = this.memory.slice(-20); // 保留最近20条消息
    }
  }

  // 生成响应
  async generateResponse(prompt) {
    this.addToMemory('user', prompt);
    this.messageCount++;
    try {
      const response = await this.openai.chat.completions.create({
        model: 'doubao-seed-1-6-251015',
        messages: [
          {
            role: 'system',
            content: '你是一个有用的AI助手。请根据用户的问题提供详细且准确的回答。'
          },
          ...this.memory
        ],
        reasoning_effort: "medium",
      });

      const aiResponse = response.choices[0].message.content;
      
      this.addToMemory('assistant', aiResponse);

      return aiResponse;
    } catch (error) {
      console.error('生成响应时出错:', error.message || error);
      
      // 提供更友好的错误提示
      let errorMessage = '抱歉，处理请求时遇到问题。';
      if (error.message && error.message.includes('API key')) {
        errorMessage += ' 请检查API密钥配置。';
      } else if (error.message && error.message.includes('timeout')) {
        errorMessage += ' 请求超时，请稍后再试。';
      }
      
      return errorMessage;
    }
  }

  // 执行工具
  async executeTool(toolName, parameters) {
    console.log(`执行工具: ${toolName}`, parameters);
    // 这里可以实现具体的工具执行逻辑
    
    // 模拟工具执行结果
    const toolResults = {
      weather: `当前天气晴朗，温度25°C`,
      time: new Date().toLocaleString(),
      calculator: `计算结果: ${eval(parameters.expression)}`
    };
    
    return toolResults[toolName] || `工具 ${toolName} 执行成功`;
  }

  // 清理记忆
  clearMemory() {
    this.memory = [];
    this.messageCount = 0;
    return '记忆已清空';
  }
  
  // 获取会话信息
  getSessionInfo() {
    return {
      startTime: this.sessionStartTime,
      messageCount: this.messageCount,
      memorySize: this.memory.length
    };
  }
}

module.exports = AIAgent;
