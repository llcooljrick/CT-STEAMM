export type Steam = 'S' | 'T' | 'E' | 'A' | 'M';

export type CurriculumWeek = {
  week: number;
  programmingConcept: string;
  p5Focus: string;
  culturalLiberalArtsPrompt: string;
  miniTask: string;
  steamMapping: Record<Steam, string>;
  reflectionPrompt: string;
};

export const curriculum: CurriculumWeek[] = [
  {
    week: 1,
    programmingConcept: '座標系與畫布：x/y、寬高、基本圖形',
    p5Focus: 'createCanvas(), background(), ellipse(), rect()',
    culturalLiberalArtsPrompt: '以「我的生活半徑」為題：把你每天會走到的地方用點與線表達（家、學校、社區）。',
    miniTask: '畫出 3 個「你常去的點」，並用線連起來；每個點用不同大小代表重要性。',
    steamMapping: {
      S: '觀察：空間位置與比例（生活地理的感知）',
      T: '以程式控制繪圖流程（p5.js）',
      E: '用參數調整位置/大小，迭代測試直到畫面清楚',
      A: '構圖：視覺焦點與留白',
      M: '座標、比例、距離概念',
    },
    reflectionPrompt: '你選擇放大的那個點代表什麼？如果換一個人來看，他會讀到什麼？',
  },
  {
    week: 2,
    programmingConcept: '變數與狀態：用變數控制畫面',
    p5Focus: 'let, =, frameCount',
    culturalLiberalArtsPrompt: '以「心情溫度計」為題：把情緒用一個可變的數值表示。',
    miniTask: '用一個變數控制顏色或大小，讓畫面能呈現「漸變」。',
    steamMapping: {
      S: '感受與表徵：情緒如何被觀察與描述',
      T: '用程式保存狀態並更新',
      E: '測試變數範圍與視覺效果的可讀性',
      A: '色彩象徵與情緒連結',
      M: '數值範圍與映射（mapping）',
    },
    reflectionPrompt: '你把哪種情緒設定成「高溫」？這是個人經驗還是文化習慣？',
  },
  {
    week: 3,
    programmingConcept: '重複結構：for 迴圈與圖樣',
    p5Focus: 'for loop、重複繪製形成紋理',
    culturalLiberalArtsPrompt: '以「地方紋樣」為題：從在地元素（稻浪、龜山島輪廓、花磚）找出一個可重複的形。',
    miniTask: '用 for 迴圈產生一排或一格格圖案；至少做兩種排列方式。',
    steamMapping: {
      S: '模式辨識：自然/文化中的重複結構',
      T: '用迴圈生成圖樣',
      E: '參數化設計：修改步距/密度/大小',
      A: '圖案節奏與視覺韻律',
      M: '等差序列、平移、陣列概念',
    },
    reflectionPrompt: '你選的紋樣「代表哪個地方/記憶」？重複讓它變得更有力量還是更麻木？',
  },
  {
    week: 4,
    programmingConcept: '隨機與機率：random()、可控的意外',
    p5Focus: 'random(), noise()（可選）',
    culturalLiberalArtsPrompt: '以「天氣與心境」為題：把不可預測的變化（雨、風、霧）轉成可見的隨機。',
    miniTask: '用 random 產生散點或飄動效果，並加入「可控制的參數」讓觀眾看得懂你在表達什麼。',
    steamMapping: {
      S: '自然變化與不確定性',
      T: '用隨機函式生成變化',
      E: '讓隨機仍可被控制與重現（調參）',
      A: '氛圍營造（粒子、霧感、流動）',
      M: '分佈、範圍、種子/重現概念（延伸）',
    },
    reflectionPrompt: '你希望觀眾感受到「意外」還是「秩序」？你怎麼在兩者間拿捏？',
  },
  {
    week: 5,
    programmingConcept: '條件判斷：if/else 讓畫面做決策',
    p5Focus: 'if/else、比較運算',
    culturalLiberalArtsPrompt: '以「界線」為題：什麼時候該跨越、什麼時候該停下？把界線做成畫面的規則。',
    miniTask: '用 if/else 讓物件在某條界線前後呈現不同狀態（顏色/速度/形狀）。',
    steamMapping: {
      S: '規則與因果：行為如何受條件影響',
      T: '用判斷控制流程',
      E: '除錯：找出條件臨界點與例外',
      A: '符號化設計：界線的視覺語彙',
      M: '不等式、閾值（threshold）',
    },
    reflectionPrompt: '你設定的「界線」對你而言代表什麼？它是保護、限制、還是提醒？',
  },
  {
    week: 6,
    programmingConcept: '函式與模組化：把重複行為抽出來',
    p5Focus: 'function drawThing(){...}',
    culturalLiberalArtsPrompt: '以「傳承」為題：把一個重要的動作/圖形當作「可被重複呼叫的儀式」。',
    miniTask: '把你作品中最核心的一段畫法寫成 function，並用不同參數生成變化。',
    steamMapping: {
      S: '結構化思考：把現象拆成可描述的部分',
      T: '用函式封裝與重用',
      E: '可維護：修改一處即可影響全局',
      A: '風格一致性與變化的統一',
      M: '參數化（parameterization）',
    },
    reflectionPrompt: '你把什麼定義成「核心儀式」？為何它值得被重複呼叫？',
  },
  {
    week: 7,
    programmingConcept: '互動：事件與輸入（mouse/keyboard）',
    p5Focus: 'mouseX/mouseY, mousePressed, keyPressed',
    culturalLiberalArtsPrompt: '以「對話」為題：觀眾的動作如何改變作品？作品要如何回應觀眾？',
    miniTask: '設計至少一種互動：點擊生成、滑動改變、按鍵切換模式等。',
    steamMapping: {
      S: '互動行為的觀察與回饋',
      T: '事件處理與即時輸入',
      E: '使用者測試：同學能否理解互動規則',
      A: '互動節奏與沉浸感',
      M: '座標、速度、狀態切換的規則',
    },
    reflectionPrompt: '你的作品希望觀眾「做什麼」？觀眾做不到時，你要改互動還是改提示？',
  },
  {
    week: 8,
    programmingConcept: '資料結構入門：陣列（array）與多個物件的管理',
    p5Focus: 'array、push()、for 搭配陣列繪製',
    culturalLiberalArtsPrompt: '以「社區裡的人」為題：用多個元素表示不同角色（同學、家人、店家），思考「個體」與「群體」的關係。',
    miniTask: '用陣列保存至少 10 個點或物件，並用迴圈把它們畫出來；每個元素可有不同大小或顏色。',
    steamMapping: {
      S: '觀察群體行為：個體與整體的關係',
      T: '用資料結構管理多個元素',
      E: '逐步擴充：從 1 個物件到 N 個物件的可維護設計',
      A: '群像構圖：密度、節奏與視覺焦點',
      M: '集合、索引、序列與迭代',
    },
    reflectionPrompt: '你如何讓「很多個物件」仍然看得懂？你做了哪些取捨？',
  },
  {
    week: 9,
    programmingConcept: '除錯與可讀性：逐步測試、註解與版本化修改',
    p5Focus: 'console.log、註解、分段測試、參數化',
    culturalLiberalArtsPrompt: '以「求證與負責」為題：作品不是一次成功；你如何面對錯誤、修正與向他人解釋你的選擇？',
    miniTask: '找出作品中的 1 個 bug 或不穩定處，使用「逐步測試」定位原因，並用註解寫下你怎麼修。',
    steamMapping: {
      S: '以證據檢核假設（哪裡出了問題？）',
      T: '除錯工具與程式可讀性',
      E: '迭代修正流程：提出假設→測試→修補',
      A: '讓作品意圖可被他人理解（說明與呈現）',
      M: '分段、變因控制與邏輯推理',
    },
    reflectionPrompt: '你最關鍵的一次修正是什麼？你是怎麼「找到原因」的？',
  },
  {
    week: 10,
    programmingConcept: '整合與作品化：把 1–9 週串成可展示的互動作品',
    p5Focus: '變數/迴圈/條件/函式/互動/陣列的整合',
    culturalLiberalArtsPrompt: '以「一個地方的故事」為題：讓作品同時具備技術結構、文化脈絡與個人觀點。',
    miniTask: '完成一個作品：至少包含（迴圈或圖樣）＋（互動）＋（條件或狀態變化）＋（自訂函式）＋（陣列或多物件管理）。',
    steamMapping: {
      S: '以現象/情境做整體理解（作品的主題與可觀察性）',
      T: '系統整合與展示（網頁可運作、可分享）',
      E: '工程化完善：bug 修補、效能、可用性與測試',
      A: '敘事與審美：主題一致、視覺風格統一',
      M: '規則系統：參數、範圍、臨界點與資料結構',
    },
    reflectionPrompt: '回看你的 AI 對話、程式版本與反思文字：你最大的「轉變」是什麼？請用一個具體片段（程式或對話）證明。',
  },
];
