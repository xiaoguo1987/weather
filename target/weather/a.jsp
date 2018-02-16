<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ path;
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
jQuery(function() {
	//初始化列表
   	$('#dataTable').datagrid({
   		iconCls:'icon-tip',
   		singleSelect:true,
   		rownumbers:true,
   		pagination:true,
   		collapsible:false,
   		panelHeight:'auto',
   		fit:true,
   		method:'post',
   		pageNumber:1,
   		pageSize:15,
   		pageList:[15,25,35,50,100],
   		align:'center',
   		fitColumns:true,
   		idField : 'id',     //此处根据实际情况进行填写
   		columns:[[
					 { title: '全选',checkbox:true},  
           	  	 	 { field: 'ID', title: 'id',width:100},  
                	 { field: 'cityname', title:'城市名',width:100 },  
              	     { field: 'weather', title: '天气',width:100},  
              	 	 { field: 'htem', title:'高温',width:100 },  
              	 	 { field: 'ltem',title: '低温',width:100 },  
               		 { field: 'feel',title: '舒适度',width:100 }
				]],
		 rowStyler: function(index,row){
			if(row.status=='2'){
				return 'color:#ff9999;';
			}else{
				if ((index % 2)==0){
					return 'background-color:#B2DAFC;';
				}	
			}
		} 
        
	}).datagrid("columnMoving");
	
	//
});
</script>
<script type="text/javascript">
//表格查询
function submitForm() {
	//查询参数直接添加在queryParams中
	var queryParams = $('#dataTable').datagrid('options').queryParams;
	var fields = $('#dataHosForm').serializeArray(); //自动序列化表单元素为JSON对象
	$.each(fields, function(i, field) {
		queryParams[field.name] = field.value; //设置查询参数

	});
	var url="${basePath}/city/find";
	$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
}; 

	
	function clearForm(){
		$("#dataHosForm")[0].reset();
		var url="${basePath}/";
		$('#dataTable').datagrid('load',url);
	}
</script>	
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" >
		<form id="dataHosForm"  method="post">
			<table >
				<tr>
					<td style="width:10%">城市名</td>
					<td >
					 <input  id="cityid" name="cityid" style="width:191px;" class="easyui-textbox" >
					 </td>
					<td>
				          <a href="javascript:void(0)" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				          <a href="javascript:void(0)" id = "qkbtn" class="easyui-linkbutton" iconCls="icon-clear" onclick="clearForm()">清空</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         
				   </td>
				</tr>
			</table>
			</form>
		</div>
	<div data-options="region:'center',border:false"  style="overflow: hidden; padding-top: 0;" > 
          <table id="dataTable" ></table> 
    </div>
</div>
</body>
</html>