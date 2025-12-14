export const CURRICULUM_DATA = {
  1: {
    tasks: {
      id: 1,
      title: "第 1 週：數位色彩",
      description: "任務：將圓形改成藍色 RGB(0, 0, 255)。",
      hint: "藍色是 (0, 0, 255)",
      starterCode: "function setup() { createCanvas(400, 400); } \nfunction draw() { background(220); fill(___, ___, ___); circle(200, 200, 100); }",
      validate: "(code) => code.includes('0, 0, 255')",
      successMsg: "太棒了！你學會了 RGB。",
      errorMsg: "顏色不對喔！"
    },
    questionPool: [
      {
        q: "fill(255,0,0) 是什麼色？",
        options: ["紅", "綠"],
        ans: 0,
        exp: "RGB順序是紅綠藍"
      }
    ]
  }
};
