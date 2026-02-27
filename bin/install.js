#!/usr/bin/env node

/*
 * @Author: fukaidong
 * @Date: 2026-02-25 15:50:10
 * @LastEditors: fukaidong qiji777@yeah.net
 * @LastEditTime: 2026-02-26 18:33:02
 * @Description: scan-debug-skill 安装脚本 (ScanDebugSkill Install Script)
 *               包含更新处理逻辑：安装前清理旧版本核心目录，确保无残留文件。
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * 递归复制目录或文件
 * @param {string} src - 源路径
 * @param {string} dest - 目标路径
 */
function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    // 如果目标目录不存在，则创建
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    // 遍历源目录下的所有文件和子目录
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // 如果是文件，确保目标文件的父目录存在
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    // 复制文件 (fs.copyFileSync 默认会覆盖已存在的同名文件)
    fs.copyFileSync(src, dest);
  }
}

/**
 * 执行安装操作，将资源复制到目标目录
 * 包含更新逻辑：先清理旧目录，再复制新目录
 * @param {string} targetDir - 目标安装目录
 */
function install(targetDir) {
  // 源目录：当前脚本所在目录的上级目录 (package root)
  const sourceDir = path.resolve(__dirname, '..');

  console.log(`\n🚀 开始安装/更新 scan-debug-skill...`);
  console.log(`📂 源路径 (Source): ${sourceDir}`);
  console.log(`🎯 目标路径 (Target): ${targetDir}\n`);

  try {
    // 确保目标根目录存在
    if (!fs.existsSync(targetDir)) {
      console.log(`Creating target directory: ${targetDir}`);
      fs.mkdirSync(targetDir, { recursive: true });
    } else {
      console.log(`ℹ️  目标目录已存在，准备进行更新... (Target exists, preparing to update)`);
    }

    // 需要复制的文件和文件夹列表
    // 包含 css, html, js 目录以及 SKILL.md 说明文件
    const itemsToCopy = ['css', 'html', 'js', 'SKILL.md'];

    itemsToCopy.forEach(item => {
      const srcPath = path.join(sourceDir, item);
      const destPath = path.join(targetDir, item);

      if (fs.existsSync(srcPath)) {
        // --- 更新处理逻辑 START ---
        // 如果目标是一个已存在的目录，先将其删除。
        // 这样做是为了确保新版本删除了某些文件时，目标目录也能同步删除这些废弃文件（避免脏数据）。
        // 仅对我们明确管理的子目录执行此操作，避免误删用户在根目录下放的其他文件。
        if (fs.existsSync(destPath)) {
          const destStats = fs.statSync(destPath);
          if (destStats.isDirectory()) {
            // Node.js 14.14.0+ 支持 fs.rmSync
            // 如果是旧版本 Node，这里可能需要回退方案，但一般现代开发环境都支持
            try {
                process.stdout.write(`Cleaning old ${item}... `);
                fs.rmSync(destPath, { recursive: true, force: true });
                console.log('✅ Cleaned');
            } catch (rmError) {
                console.warn(`⚠️  无法清理旧目录 ${item}: ${rmError.message}，将尝试直接覆盖。`);
            }
          }
        }
        // --- 更新处理逻辑 END ---

        process.stdout.write(`Writing ${item}... `);
        copyRecursiveSync(srcPath, destPath);
        console.log('✅ Done');
      } else {
        console.warn(`⚠️  警告: 源文件/目录 ${item} 未找到，跳过 (Source not found, skipping)。`);
      }
    });

    console.log(`\n✨ scan-debug-skill 安装/更新成功！(Installation/Update Successful)`);
    console.log(`👉 当前位置: ${targetDir}\n`);

  } catch (error) {
    console.error(`\n❌ 安装失败 (Installation Failed): ${error.message}`);
    // 发生错误时退出进程
    process.exit(1);
  }
}

// 主程序入口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cwd = process.cwd();

// 检测当前目录下是否存在 .trae 或 .cursor 目录，以便提供智能默认选项
const hasTrae = fs.existsSync(path.join(cwd, '.trae'));
const hasCursor = fs.existsSync(path.join(cwd, '.cursor'));

let defaultChoice = '1'; // 默认 Trae
let defaultText = 'Trae';

if (hasCursor && !hasTrae) {
  defaultChoice = '2';
  defaultText = 'Cursor';
}
// 若两者都存在，默认保持为 1 (Trae)

console.log('请选择要安装的目标 IDE (Please select target IDE):');
console.log(`1. Trae   (.trae/scan-debug-skill)   ${hasTrae ? '[Detected]' : ''}`);
console.log(`2. Cursor (.cursor/scan-debug-skill) ${hasCursor ? '[Detected]' : ''}`);
console.log('3. Custom (指定目录/Custom Directory)');

rl.question(`请输入选项 (1/2/3) [默认: ${defaultChoice} (${defaultText})]: `, (answer) => {
  const choice = answer.trim() || defaultChoice;
  
  // 选项 3：自定义目录
  if (choice === '3') {
    rl.question('请输入目标安装目录 (Please enter target directory): ', (inputPath) => {
      const targetDir = inputPath.trim();
      if (targetDir) {
        // 处理相对路径和绝对路径
        const finalPath = path.isAbsolute(targetDir) ? targetDir : path.resolve(cwd, targetDir);
        install(finalPath);
      } else {
        console.log('❌ 未输入路径，已取消 (No path provided, cancelled).');
      }
      rl.close();
    });
    return;
  }

  // 映射选择到目标目录
  const targets = [];
  
  // 选项 1：安装到 Trae
  if (choice === '1') {
    targets.push(path.join(cwd, '.trae', 'scan-debug-skill'));
  }
  
  // 选项 2：安装到 Cursor
  if (choice === '2') {
    targets.push(path.join(cwd, '.cursor', 'scan-debug-skill'));
  }

  // 如果没有有效选择（且不是3），回退到默认
  if (targets.length === 0) {
    if (defaultChoice === '2') {
        targets.push(path.join(cwd, '.cursor', 'scan-debug-skill'));
    } else {
        targets.push(path.join(cwd, '.trae', 'scan-debug-skill'));
    }
  }

  // 执行安装
  targets.forEach(dir => install(dir));

  rl.close();
});
