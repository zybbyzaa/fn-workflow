/**
 * Created by littledu on 15/5/16.
 */
var fs = require('fs'),
  path = require('path'),
  localIp = require('quick-local-ip');

module.exports = function(config) {
  var html = [
      '<!DOCTYPE html>',
      '<head>',
      '<meta charset="utf-8">',
      '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
      '<title></title>',
      '<link rel="stylesheet" href="http://wximg.gtimg.com/tmt/tools/file-list/css/style.css">',
      '<style type="text/css">',
      '.icon-qrcode{cursor: pointer;}@media only screen and (min-device-width : 310px) and (max-device-width : 800px){#myTable{margin: 0;max-width: 100%;}.td-header-qrcode,.td-header-time,.td-qrcode,.td-time{display:none;}.table-body,.td-header-title{font-size: 14px }}',
      '.icon-copy{background-image:url(https://clipboardjs.com/assets/images/clippy.svg);width: 16px;height: 16px;background-size: 16px;margin: 0 auto;display: block;top: 1px;position: relative;vertical-align: bottom;}',
      '.copy-value{opacity: 0}',
      '</style>',
      '</head>',
      '<body>',
      '   <table id="myTable" class="table">',
      '       <thead class="table-head">',
      '           <tr>',
      '           <th class="td-header-title">文件名</th>',
      '           <th class="td-header-qrcode" style="width:60px;text-align: center;">复制链接</th>',
      '           <th class="td-header-qrcode" style="width:40px;text-align: center;">二维码</th>',
      '           </tr>',
      '       </thead>',
      '       <tbody class="table-body">'
    ].join(''),
    tmpHtml = '',
    length = '/dist/WEB-INF/'.length,
    collector = listdir('./dist/WEB-INF/'),
    ip = localIp.getLocalIP4();

  showdir(collector, 0);

  function listdir(dir) {
    var collector = {
      name: dir,
      type: 'dir',
      url: '',
      child: []
    };
    files = fs.readdirSync(dir);

    files.forEach(function(file) {
      var absolutePath = dir + '/' + file,
        stats = fs.statSync(absolutePath);

      var url = absolutePath.substring(
        absolutePath.indexOf('./dist/WEB-INF') + length + 1
      );

      if (
        stats.isDirectory() &&
        (stats.isDirectory() !== '.' || stats.isDirectory() !== '..')
      ) {
        collector['child'].push(listdir(absolutePath));
      } else {
        collector['child'].push({
          name: path.basename(absolutePath),
          type: 'file',
          url: url
        });
      }
    });

    return collector;
  }

  function showdir(collector, level) {
    var file = collector['name'],
      basename = path.basename(file);

    var indent = 25 * (level - 1);

    if (indent <= 0) {
      indent = 10;
    }

    if (collector['type'] == 'dir') {
      if (level != 0) {
        html += `<tr><td class="td-dir" style="text-align:left; padding-left: ${indent}px">[目录]: ${basename}</td><td></td></tr>`;
      }

      collector['child'].forEach(function(item) {
        showdir(item, level + 1);
      });
    }

    if (collector['type'] == 'file') {
      if (path.extname(file) === '.htm' && basename !== 'TmTIndex.htm') {
        if (level === 1) {
          tmpHtml += `<tr class="level1">
              <td class="td-file sort-file" style="padding-left: ${indent}px">
                <a href="/WEB-INF${collector['url']}" target="_blank">
                  ${basename}
                  <input class="copy-value" type="text" id="${collector[
                    'url'
                  ].replace(/[\/,\.]/g, '')}" value="${ip}:${config.livereload
            .port}/WEB-INF${collector['url']}"/>
                </a>
              </td>
              <td class="td-copy">
                <a class="copy-url" href="javascript:;" data-clipboard-target="#${collector[
                  'url'
                ].replace(/[\/,\.]/g, '')}" title="${ip}:${config.livereload
            .port}/WEB-INF${collector['url']}">
                  <i class="icon-copy"></i>
                </a>
              </td>
              <td class="td-qrcode"><i class="icon-qrcode"></i></td>
            </tr>`;
        } else {
          html += `<tr>
            <td class="td-file sort-file" style="padding-left: ${indent}px">
              <a href="/WEB-INF${collector['url']}" target="_blank">
                ${basename}
                <input class="copy-value" type="text" id="${collector[
                  'url'
                ].replace(/[\/,\.]/g, '')}" value="${ip}:${config.livereload
            .port}/WEB-INF${collector['url']}"/>
              </a>
            </td>
            <td class="td-copy">
              <a class="copy-url" href="javascript:;" data-clipboard-target="#${collector[
                'url'
              ].replace(/[\/,\.]/g, '')}" title="${ip}:${config.livereload
            .port}/WEB-INF${collector['url']}">
                <i class="icon-copy"></i>
              </a>
            </td>
            <td class="td-qrcode"><i class="icon-qrcode"></i></td>
          </tr>`;
        }
      }
    }
  }

  html = html + tmpHtml;

  html += `</tbody></table><div id="qrcode"></div><script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script><script src="http://wximg.gtimg.com/tmt/tools/file-list/js/jquery-2.1.3.min.js"></script><script src="http://wximg.gtimg.com/tmt/tools/file-list/js/qrcode.min.js"></script><script type="text/javascript">$(document).ready(function(){ ;var url = location.href.replace("localhost", "${ip}");document.title= "${config.projectName} 资源列表";  $(".level1").prependTo(".table-body"); var clipboard = new Clipboard(".copy-url");clipboard.on("success", function(e) {console.log(e);});$(".td-qrcode i").bind("mouseenter ",function(){$("#qrcode").show().empty();\nnew QRCode(document.getElementById("qrcode"), encodeURI(url.split("/WEB-INF/TmTIndex.htm")[0]+$(this).parent().parent().find("a").attr("href")));});\n$("body").bind("click",function(){$("#qrcode").hide();});});</script></body></html>`;
  var out = fs.createWriteStream('./dist/WEB-INF/TmTIndex.htm', {
    encoding: 'utf8'
  });
  out.write(html, function(err) {
    if (err) console.log(err);
  });
  out.end();
};
