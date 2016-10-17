var svg = d3.select("#container")
.append("svg:svg")//在“container”中插入svg
.attr("width", 500)//设置svg的宽度
.attr("height", 250)//设置svg的高度
d3.select("svg")//使用“select”函数选择svg
.append("g")//在svg中插入g
.attr("transform","translate(50,25)")//设置g的偏移量
