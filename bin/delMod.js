var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

async function delMod() {
  const name = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入要删除的模块名称？'
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
        message: '请选择要删除的模块类型？',
        choices: ['pc', 'mobile']
      }
    ])
    .then(answers => {
      return answers.platform;
    });
  console.log('当前删除模块类型：', platform, ',模块名称为：', name);
  shell.exec(
    `gulp del_mod --name ${name} ${platform === 'mobile' ? '--m' : ''}`
  );
}

delMod();
