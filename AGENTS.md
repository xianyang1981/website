# 光影集 - 个人相册网站

## 项目概览

一个以个人相册为主的静态网站，采用草绿色背景设计，按年月组织照片。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **Icons**: lucide-react

## 目录结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（相册展示）
│   └── globals.css         # 全局样式（草绿色主题）
├── components/
│   ├── album-nav.tsx       # 年月导航
│   ├── lightbox.tsx        # 照片灯箱预览
│   └── photo-grid.tsx      # 瀑布流照片网格
└── lib/
    ├── albums.ts           # 相册数据定义（按年月分组）
    └── utils.ts            # 工具函数
```

## 核心功能

1. **年月导航**：按年月筛选照片（如 2025年6月、2025年5月）
2. **瀑布流布局**：响应式瀑布流展示照片
3. **灯箱预览**：点击照片可全屏查看，支持键盘导航（← → Esc）
4. **草绿色主题**：草绿色背景，让照片色彩更自然

## 开发命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
```

## 添加照片

编辑 `src/lib/albums.ts` 文件，在 `allPhotos` 数组中添加照片：

```typescript
{
  id: 'unique-id',
  src: '图片URL',
  alt: '图片描述',
  title: '照片标题',
  date: 'YYYY-MM-DD',  // 拍摄日期，用于年月分组
  width: 原始宽度,
  height: 原始高度,
}
```

## 设计规范

详见 `DESIGN.md` 文件。
