<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<%@ include file="/include.jsp"%> 
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
				  {field:'cityname',title:'城市',width:100,align:'center'},
		          {field:'weather',title:'天气',width:100,align:'center'},
		          {field:'htem',title:'高温',width:100,align:'center'},
		          {field:'ltem',title:'低温',width:100,align:'center'},
		          {field:'feel',title:'舒适度',width:100,align:'center'}
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
  //初始化城市列表
   	$('#occupyType').combobox({
		valueField:'occupyTypeId',
		textField:'occupyType',
		url:"${basePath}/service/occupyDetail/occupyType",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	
   	
});
</script>
<script type="text/javascript">

	//表格查询
	function submitForms() {
		alert("1111");
		var city_id = $("#city_id").textbox('getValue');
		alert("1122");
		alert("要查询的城市名称："+city_id);
		alert("1133");
		//查询参数直接添加在queryParams中
		var queryParams = $('#dataTable').datagrid('options').queryParams;
		var fields = $('#dataHosForm').serializeArray(); //自动序列化表单元素为JSON对象
		$.each(fields, function(i, field) {
			queryParams[field.name] = field.value; //设置查询参数
	
		});
		alert("1444");
		var url = '${basePath}/city/find';
		alert(url);
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	} 
	
	function clearForm(){
		$("#dataHosForm")[0].reset();
	}
	
</script>
<title>城市天气查询页面</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
	<div  data-options="region:'north'" style="height:15%;padding-top: 1%;">
		<form id="dataHosForm"  method="post" style="height:100%;">
			<table style="width:100%;height:94%;" cellpadding="0px" cellspacing="0px">
				<tr height="50%">
					<td class="title">
					城市名称:
					</td>
					<td>
					 <input  id="city_id" name="city_id" class="easyui-textbox"  >
					</td>
				</tr>
				<tr height="50%">
					<td class=cont>
				       <div   class="serbut" style="height: 20;padding-top: 3;">
				          <a href="javascript:void(0)"  class="easyui-linkbutton" iconCls="icon-search" onclick="submitForms()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			           </div>
				    </td>
				    <td  class=cont>
				       <div   class="serbut" style="height: 20;padding-top: 3;">
				          <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-empty" onclick="clearForm()" >清空</a>
			           </div>
				    </td>
				</tr>
			</table>
		</form>
	</div>
	<div data-options="region:'center',border:false"  style="overflow: hidden; padding: 0px;" > 
          <table id="dataTable" ></table> 
    </div>
</div>
</body>
</html>