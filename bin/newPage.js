var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

async function newPage() {
  const name = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入要创建的页面名称？'
      }
    ])
    .then(answers => {
      return answers.name;
    });
  const projectName = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入要创建的页面所在目录名称？'
      }
    ])
    .then(answers => {
      return answers.projectName;
    });
  const platform = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择要创建的页面类型？',
        choices: ['pc', 'mobile']
      }
    ])
    .then(answers => {
      return answers.platform;
    });
  console.log('当前创建页面类型：', platform, ',页面目录为：', projectName, ',页面名称为：', name);
  shell.exec(
    `gulp new_page --projectName ${projectName} --name ${name} ${platform ===
    'mobile'
      ? '--m'
      : ''}`
  );
}

newPage();
