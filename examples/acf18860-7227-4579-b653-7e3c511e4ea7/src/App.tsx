import React, { useState, useEffect } from 'react';
import { Split, Code2, Eye, FileCode, Paintbrush, Terminal, Save, Download, Upload, Copy, Check } from 'lucide-react';

type EditorTab = 'html' | 'css' | 'js';

interface CodeState {
  html: string;
  css: string;
  js: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<EditorTab>('html');
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState<CodeState>({
    html: `<h1 class="title">Hello World!</h1>
<p>Start editing to see changes in real-time!</p>
<button id="demoButton">Click me</button>
<div id="output"></div>`,
    css: `body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #f6f8fc 0%, #ffffff 100%);
  min-height: 100vh;
  color: #1a1a1a;
}

.title {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

button {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.3);
}

#output {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(59, 130, 246, 0.1);
}`,
    js: `document.getElementById('demoButton').addEventListener('click', function() {
  const output = document.getElementById('output');
  output.textContent = '按钮被点击了！' + ' ' + new Date().toLocaleTimeString();
  
  // 添加动画效果
  output.style.animation = 'none';
  output.offsetHeight; // 触发重绘
  output.style.animation = 'fadeIn 0.5s ease-out';
});

// 添加动画关键帧
if (!document.querySelector('#fadeInAnimation')) {
  const style = document.createElement('style');
  style.id = 'fadeInAnimation';
  style.textContent = \`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  \`;
  document.head.appendChild(style);
}`
  });

  const [previewKey, setPreviewKey] = useState(0);

  const generatePreviewContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.js}</script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [code]);

  const handleCodeChange = (value: string, type: EditorTab) => {
    setCode(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleCopyCode = () => {
    const fullCode = generatePreviewContent();
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCode = () => {
    const fullCode = generatePreviewContent();
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, 'text/html');
          
          const styleContent = doc.querySelector('style')?.textContent || '';
          const scriptContent = doc.querySelector('script')?.textContent || '';
          const bodyContent = doc.body.innerHTML
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

          setCode({
            html: bodyContent.trim(),
            css: styleContent.trim(),
            js: scriptContent.trim()
          });
        } catch (error) {
          alert('文件解析错误');
        }
      };
      reader.readAsText(file);
    }
  };

  const snippets = {
    html: [
      { name: '响应式布局', code: '<div class="container">\n  <div class="row">\n    <div class="col">列 1</div>\n    <div class="col">列 2</div>\n  </div>\n</div>' },
      { name: '导航栏', code: '<nav>\n  <ul>\n    <li><a href="#home">首页</a></li>\n    <li><a href="#about">关于</a></li>\n    <li><a href="#contact">联系</a></li>\n  </ul>\n</nav>' }
    ],
    css: [
      { name: '弹性布局', code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' },
      { name: '响应式网格', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}' }
    ],
    js: [
      { name: '事件监听器', code: 'document.addEventListener("DOMContentLoaded", function() {\n  // 代码\n});' },
      { name: 'AJAX请求', code: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
                <Split className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                实时 HTML 编辑器
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2 text-gray-500" />}
                {copied ? '已复制' : '复制代码'}
              </button>
              <button
                onClick={handleSaveCode}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <Save className="h-4 w-4 mr-2 text-gray-500" />
                保存
              </button>
              <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer">
                <Upload className="h-4 w-4 mr-2 text-gray-500" />
                加载
                <input
                  type="file"
                  accept=".html"
                  onChange={handleLoadCode}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
            <div className="border-b border-gray-100">
              <div className="flex space-x-2 p-3">
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === 'html' 
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileCode className="h-4 w-4" />
                  <span>HTML</span>
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === 'css'
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Paintbrush className="h-4 w-4" />
                  <span>CSS</span>
                </button>
                <button
                  onClick={() => setActiveTab('js')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === 'js'
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Terminal className="h-4 w-4" />
                  <span>JavaScript</span>
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <textarea
                className="flex-1 p-4 font-mono text-sm focus:outline-none resize-none bg-transparent editor-textarea"
                value={code[activeTab]}
                onChange={(e) => handleCodeChange(e.target.value, activeTab)}
                spellCheck="false"
              />
              <div className="border-t border-gray-100 p-3 bg-gray-50/50 backdrop-blur-lg">
                <div className="text-sm text-gray-600 mb-2 font-medium">代码片段:</div>
                <div className="flex flex-wrap gap-2">
                  {snippets[activeTab].map((snippet, index) => (
                    <button
                      key={index}
                      onClick={() => handleCodeChange(code[activeTab] + '\n' + snippet.code, activeTab)}
                      className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
                    >
                      {snippet.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
            <div className="flex items-center space-x-2 px-4 py-3 border-b border-gray-100">
              <Eye className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">预览</span>
            </div>
            <div className="flex-1">
              <iframe
                key={previewKey}
                srcDoc={generatePreviewContent()}
                title="preview"
                className="w-full h-full bg-white"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;