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
</head>

<script type="text/javascript">
jQuery(function(){
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
		columns:[
		          {field:'city',title:'城市',width:100,align:'center',rowspan:2},
		          {field:'weather',title:'天气',width:100,align:'center',rowspan:2},
		          {field:'tem',title:'温度',width:100,align:'center',rowspan:2},
		          {field:'wind',title:'风力',width:100,align:'center',rowspan:2},
		          {field:'feeling',title:'舒适度',width:100,align:'center',rowspan:2}
		         ]
	}).datagrid("columnMoving");

	
/* 	$('year'.combobox)({
		url:"${basePath}/service/cifBasicInfo/year",
		valueField:'valueYear',
		textField:'textYear',
		panelHeight:120,
		requirde:true,
		editable:false
	}); */
	
	 $('#time').datebox({    
	    required:true   
	});  
});
</script>

<script type="text/javascript">
	function submitForm(){
		//查询参数添加在queryParams中
		var queryParams = $('#dataTable').datagrid('options').queryParams;
		var fileds = $('#data').serializeArray();//自动化序列表单元素为json对象
		$.each(fileds,function(i,filed){
			queryParams[fileds.name] = filed.value;//设置查询参数
		});
		var url="${basePath}/servie/cifBasicInfo/detail?freshtime="+ new Date().getTime();
		$('#dataTable').dtagrid('reload',url);//设置好查询参数 然后reload
	}
	
	 function clearForm(){
		$("#city").combobox('setValue','');
		$("#time").combobox('setValue','');
		} 
</script>

<title>天气接口</title>

</head>
	<div style="margin: 0;"></div>
<body>
	<div  class="easyui-layout" data-options="fit:true,border:false">
		<div data-options="region:'north'" style="height:9%;padding-top:1%;" >
			<form id="data" method="post">
				<table  class="easyui-datagrid" style="width:100%" border="0" cellpadding="0" cellspacing="0" >
					<tr>
						<td class="title" >
							城市
						</td>
						<td class="cont">
							<select id="city" name="city" style="width:100px" class="easyui-combobox" ></select>
						</td>
						
						<td class="title" >
							时间
						</td>
						<td class="cont">
							<input  id="time"  type="text" ></input>
						</td>
						
	    				<td class=cont colspan="2">
	    					<div align="center" class="serbut" style="height: 15px";padding-top: 0;">
	    						<a href="javascript:void(0)" id="qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">提交</a>
	    						<a href="javascript:void(0)" id="qkbtn" class="easyui-linkbutton" iconCls="icon-clear"  onclick="clearForm()">清空</a>
	    					</div>
	    				</td>	
					</tr>
				</table>
			</form>
		</div>
		
		<div data-options="region:'center',border:false" style="overflow:hidden;padding-top: 0;">
		    <!-- 居中  没有边框 横向纵向显示不超过显示内容 上边距为0 -->
			<table id="dataTable"></table>
		</div>
	</div>
</body>
</html>
