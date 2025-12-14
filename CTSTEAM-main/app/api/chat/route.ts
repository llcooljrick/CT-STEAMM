import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  // 防呆：如果沒有 OpenAI 鑰匙，回傳假訊息，不讓網站掛掉
  if (!process.env.OPENAI_API_KEY) {
    return new Response("請先設定 OpenAI API Key 才能使用 AI 功能。", { status: 200 });
  }

  try {
    const { messages, weekId, weekContext, code } = await req.json();

    const weekLine = weekId ? `本週（第 ${weekId} 週）` : '本週';
    const contextText = weekContext
      ? `\n\n【課程脈絡】\n- 程式概念：${weekContext.programmingConcept}\n- p5.js 重點：${weekContext.p5Focus}\n- 文化/博雅引導：${weekContext.culturalLiberalArtsPrompt}\n- 小任務：${weekContext.miniTask}\n- 反思題：${weekContext.reflectionPrompt}\n`
      : '';

    // System Prompt：兼顧「程式設計基礎」與「文化/博雅」；避免直接交答案
    const systemPrompt =
      `你是一位國中 CT‑STEAM 創意程式設計導師。你要做到三件事：\n` +
      `1) 用國中程度可理解的語言講清楚本週程式觀念與除錯思路。\n` +
      `2) 用提問引導學生把文化/博雅命題轉成可操作的視覺規則與互動設計。\n` +
      `3) 你可以給「局部程式片段」示例，但除非學生明確貼出他自己的程式碼並卡住，否則不要一次給出完整作品答案；優先給步驟、檢查點、與可調參數。\n` +
      `\n${weekLine}請以「先問兩個釐清問題→再給建議」的節奏回答。` +
      contextText;

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response("AI 發生錯誤，請稍後再試。", { status: 500 });
  }
}
