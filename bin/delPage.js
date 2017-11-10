var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

async function delPage() {
  const platform = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择要删除的页面类型？',
        choices: ['pc', 'mobile']
      }
    ])
    .then(answers => {
      return answers.platform;
    });
  const dirPath = path.resolve(`src/pages${platform === 'pc' ? '' : '/m'}`);
  const dirs = await fs.readdirSync(dirPath);
  const dirsList = dirs
    .filter(dir => {
      return ['common', 'm'].indexOf(dir) < 0;
    })
    .map(dir => {
      const dirName = dir;
      const files = fs.readdirSync(`${dirPath}/${dirName}`);
      return {
        dirName,
        files
      };
    });
  const projectName = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'projectName',
        message: '请选择要删除的页面所在目录名称？',
        choices: dirsList
          .filter(dir => dir.files.length > 0)
          .map(dir => dir.dirName)
      }
    ])
    .then(answers => {
      return answers.projectName;
    });
  const filesList = dirsList.filter(dir => dir.dirName === projectName)[0]
    .files;
  const name = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'name',
        message: '请选择要删除的页面名称？',
        choices: [
          ...new Set(
            filesList.map(
              file => path.parse(`${dirPath}/${projectName}/${file}`).name
            )
          )
        ]
      }
    ])
    .then(answers => {
      return answers.name;
    });
  console.log('当前删除页面类型：', platform, ',页面目录为：', projectName, ',页面名称为：', name);
  shell.exec(
    `gulp del_page --projectName ${projectName} --name ${name} ${platform ===
    'mobile'
      ? '--m'
      : ''}`
  );
}

delPage();
