var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

async function watchProject() {
  const platform = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择要构建的项目类型？',
        choices: ['all', 'pc', 'mobile']
      }
    ])
    .then(answers => {
      return answers.platform;
    });
  const projectDir = [];
  if (platform !== 'pc') {
    const mobilePath = path.resolve('src/pages/m');
    const files = await fs.readdirSync(mobilePath);
    projectDir.push(...files);
  }
  if (platform !== 'mobile') {
    const mobilePath = path.resolve('src/pages');
    const files = await fs.readdirSync(mobilePath);
    projectDir.push(...files);
  }
  const dirName = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'dirName',
        message: '请选择要构建的项目目录？',
        choices: ['all'].concat(
          [...new Set(projectDir)].sort().filter(dir => {
            return ['common', 'm'].indexOf(dir) < 0;
          })
        )
      }
    ])
    .then(answers => {
      return answers.dirName;
    });
  console.log('当前构建项目类型：', platform, ',项目目录为：', dirName);
  shell.exec(
    `gulp clean && gulp build_dev --env dev --projectName ${dirName} --platform ${platform}`
  );
}

watchProject();
