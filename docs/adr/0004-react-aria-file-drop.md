# ADR-0004：文件拖放采用 React Aria，文件选择保持原生语义

日期：2026-09-22  
状态：**Accepted**  
决策者：QH 项目  
适用范围：`Dropzone` 与 `FileUpload`

## 背景

文件输入同时涉及两类行为：浏览设备文件，以及从其他应用拖放或粘贴文件。完整实现需要处理鼠标、触摸、键盘和屏幕阅读器拖放模式，并在文件进入应用状态前校验 MIME 类型、扩展名、大小、数量和重复项。

浏览器原生 `input[type="file"]` 已提供设备选择器、`accept` 过滤和辅助技术语义。拖放区域则没有等价的原生控件；自行实现会重复复杂的拖放状态机。React Aria 已提供跨输入方式的 DropZone 行为，但其 FileTrigger 要求 React Aria Pressable，不能直接包裹当前基于原生按钮的 QH Button。

## 决策

- `Dropzone` 使用 React Aria Components DropZone 作为拖放、粘贴、键盘和屏幕阅读器行为层。
- `FileUpload` 组合 `Dropzone`、原生视觉隐藏的文件输入、QH Button 和 IconButton。
- QH Button 继续保持原生按钮实现，不为 FileTrigger 引入第二套按钮行为。
- 公共 API 返回浏览器 `File` 对象和结构化拒绝原因，不暴露 React Aria 的 DropItem 或事件类型。
- 核心组件只管理本地文件选择、校验和移除；网络上传、进度、取消、重试、分片和持久化属于业务层。

## API 与状态边界

`FileUpload` 同时支持 `files`、`defaultFiles` 和 `onFilesChange`。受控模式只报告下一组文件，不在内部改写展示状态。`Dropzone` 通过 `onFilesDrop` 一次返回：

```ts
interface FileSelectionResult {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
}

type FileRejectionReason =
  | "file-type"
  | "file-size"
  | "too-many-files"
  | "duplicate-file";
```

`acceptedFileTypes` 接受精确 MIME、MIME 通配符和扩展名。`maxFileSize` 使用字节，`maxFiles` 表示总选择数量。单选模式中新选择的有效文件替换旧文件；多选模式追加文件并拒绝重复项和超出总数的项。

文件对象不可序列化，浏览器也不允许程序任意写入原生文件输入。组件因此不提供隐含的 `name` 或自动表单提交协议。业务应通过 `onFilesChange` 把文件交给上传服务或表单状态管理器。

## 可访问性与移动端

- 文件输入通过 Field.Label、`aria-label` 或 `aria-labelledby` 命名。
- Dropzone 拥有独立名称，避免文件选择器与拖放入口在辅助技术中同名。
- 所有移除按钮始终可见，并包含对应文件名；状态变化通过礼貌型实时区域播报。
- 拖放不是移动端唯一入口，设备文件选择按钮始终可见。
- 默认操作控件保持 44px 触控目标，长文件名截断，320px 视口不产生页面横向滚动。

## 后果

正面影响：业务获得一致的文件校验结果，桌面拖放和移动端设备选择拥有各自合适且可访问的交互路径；核心包不承担特定上传服务的状态模型。

成本：应用需要自行管理上传生命周期；React Aria DropZone 的行为与版本兼容性成为需要跟踪的依赖。若未来多个项目需要相同的上传队列、进度或断点续传，应以独立 Pattern 或新 ADR 评审，而不是扩张当前组件。

## 参考

- [React Aria DropZone](https://react-aria.adobe.com/DropZone)
- [React Aria FileTrigger](https://react-aria.adobe.com/FileTrigger)
