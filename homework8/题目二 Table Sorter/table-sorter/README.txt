可sortable的网页如下：
http://heroes.blizzard.cn/leaderboards
http://soj.sysu.edu.cn/ranklist.php
http://acm.hust.edu.cn/rank/user
http://acdream.info/standings
https://www.patest.cn/contests/pat-b-practise/ranklist

神秘代码：
window.onload = function() {tableSorter($('table'));}
function tableSorter(tables) {
	_.times(tables.length,function(i) {
		var tableHeads = tables[i].getElementsByTagName("th");
		_.times(tableHeads.length, function(j) {tableHeads[j].setAttribute("sortCol", j);});
		_.times(tableHeads.length, function(j) {tableHeads[j].onclick = function() {tableSort(this.parentNode.parentNode.parentNode, this);}});
	});
}
function tableSort(table, head) {
	var sorter = [];
	var order = head.getAttribute("class");
	sortCol = head.getAttribute("sortCol");
	_.times(table.rows.length - 1, function(i) {sorter.push(table.rows[i + 1]);});
	sorter.sort(compare(order));
	for(var i = 1; i < table.rows.length; ++i) sorter[i - 1] = sorter[i - 1].innerHTML;
	for(var i = 1; i < table.rows.length; ++i) table.rows[i].innerHTML = sorter[i - 1];
	_.times(table.rows[0].cells.length, function(i) {table.rows[0].cells[i].setAttribute("class", "");});
	head.setAttribute("class", order != "Ascending" ? "Ascending" : "Descending");
}
function compare(order) {
	return function(rowA, rowB) {
		var a = rowA.cells[sortCol].innerHTML;
		var b = rowB.cells[sortCol].innerHTML;
		return (order === "Ascending") ? a < b : a > b;
	}
}