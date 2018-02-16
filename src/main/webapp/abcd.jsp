<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ path + "/";
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/easyui/demo/demo.css">
	<script type="text/javascript" src="<%=basePath%>/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
	$(function () {  
  	  $("#btnSearch").click(function () {  
      	   var pars = { name:$("#txtName").val() };  
       	  //有参数时执行此方法  
       	  initTable(pars)  
   	  });  
   	  //无参数时执行此方法  
     	initTable("");  
	 });  
	
	function initTable(pars) {  
        $('#table').datagrid({   //定位到Table标签，Table标签的ID是table
            fitColumns: true,  // 	boolean设置为true将自动使列适应表格宽度以防止出现水平滚动。
            url:'/city/get',  //指向后台的Action来获取当前用户的信息的Json格式的数据  
            title: '天气查询',  //表格标题  
            iconCls: 'icon-save',  
            height: 500,  
            nowrap: true,  // boolean设置为true，当数据长度超出列宽时将会自动截取。
            loadMsg: '正在加载用户的信息...',   // string 当从远程站点载入数据时，显示的一条快捷信息。
            autoRowHeight: false,  // boolean 定义设置行的高度，根据该行的内容。设置为false可以提高负载性能。
            striped: true, // boolean  设置为true将交替显示行背景。
            collapsible: true,  
            pagination: true,  // 设置true将在数据表格底部显示分页工具栏。
            //rownumbers: true,// 设置为true将显示行数。添加列数字  
            //sortName: 'ID',    //当数据表格初始化时以哪一列来排序
            //sortOrder: 'asc',  // 定义排序顺序，可以是'asc'或者'desc'（正序或者倒序）。
            remoteSort: false, // 定义是否通过远程服务器对数据排序。
            idField: 'ID',//主键   	表明该列是一个唯一列。
            queryParams: pars,  //异步查询的参数  
            pageList: [5, 10, 15, 20, 25,30],//分页的分组设置  
            pageSize: 10,//每页的默认值大小  当设置分页属性时，初始化每页记录数。
            beforePageText: '第',  
            afterPageText: '页    共 {pages} 页',    
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
            columns: [[  
                { title: '全选',checkbox:true},  
           	    { field: 'ID', title: '城市id' },  
                { field: 'cityname', title:'城市名' },  
                { field: 'weather', title: '天气'},  
                { field: 'htem', title:'高温' },  
                { field: 'ltem',title: '低温' },  
                { field: 'feel',title: '舒适度' }
            ]],  
            //表头的按钮  
            toolbar: [{  
                id: 'btnCancle',  
                text: '删除',  
                iconCls: 'icon-cancel',  
                handler: function () {  
                    //实现直接删除所有数据的方法  
                    Delete();  
                }  
            }, '-', {  
                id: 'btnDetail',  
                text: '详细',  
                iconCls: 'icon-remove',  
                handler: function () {  
                    //展示所选人员的详细信息方法  
                    Show();  
                }  
            }, '-', {  
                id: 'btnEdit',  
                text: '编辑',  
                iconCls: 'icon-edit',  
                handler: function () {  
                    //编辑所选人员的信息方法  
                    Update();  
                }  
            }, '-', {  
                id: 'btnCheckout',  
                text: '导出',  
                iconCls: 'icon-undo',  
                handler: function () {  
                    //实现修改的方法  
                    Checkout();  
                }  

            }]  
        });  
    }  
	</script>
<body>  
    <div>  
            请输入城市名：<input type="text"id="txtName" />  
        <input type="button"id="btnSearch" value="查询" />  
        <table id="table"class="querytable"></table>  
    </div>  
</body>  