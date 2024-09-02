const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { createCanvas, loadImage } = require('canvas');
const { resolve } = require('path');

async function imagesToPdf(imagePaths, outputPdfPath) {
  // 创建一个新的PDF文档
  const pdfDoc = await PDFDocument.create();

  // eslint-disable-next-line no-restricted-syntax
  for (const imagePath of imagePaths) {
    // 加载图像
    const img = await loadImage(imagePath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // 将图像添加到PDF文档中
    const imageBytes = canvas.toBuffer('image/jpeg');
    const pdfImage = await pdfDoc.embedJpg(imageBytes);

    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    });
  }

  // 保存PDF文档
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPdfPath, pdfBytes);
}

const imagePath = resolve(__dirname, './20240902-152744.jpeg');
// 示例调用
const imagePaths = [imagePath];  // 替换为你的图像路径
const outputPdfPath = './output.pdf';

imagesToPdf(imagePaths, outputPdfPath)
  .then(() => {
    console.log('PDF 创建成功!');
  })
  .catch((err) => {
    console.error('创建PDF时出错:', err);
  });