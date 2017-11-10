var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

async function newMod() {
  const name = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入要创建的模块名称？'
      }
    ])
    .then(answers => {
      return answers.name;
    });
  const platform = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'platform',
        message: '请选择要创建的模块类型？',
        choices: ['pc', 'mobile']
      }
    ])
    .then(answers => {
      return answers.platform;
    });
  console.log('当前创建模块类型：', platform, ',模块名称为：', name);
  shell.exec(
    `gulp new_mod --name ${name} ${platform === 'mobile' ? '--m' : ''}`
  );
}

newMod();
