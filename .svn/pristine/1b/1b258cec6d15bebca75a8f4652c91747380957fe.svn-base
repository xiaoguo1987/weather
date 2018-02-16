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
   		idField : 'number',     //此处根据实际情况进行填写
   		columns:[[
					{field:'batchId',title:'批次号', width : 100,align : 'center'},
					{field:'batchName',title:'批次名称',width : 100,align : 'center'},
					{field:'dmCifCustId', title:'客户号',width : 100,align : 'center'},
					{field:'phone',title:'手机号',width : 100,align : 'center'}, 
					{field:'deliverResult',title:'发放结果', width : 100, align : 'center'},
					{field:'occupyFlag', title:'是否占位', width : 100, align : 'center'}
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
	
   	$('#state').combobox({
		valueField:'stateId',
		textField:'batchesState',
		url:"${basePath}/service/deliverBatchDetail/batchState",
		panelHeight:120,
		requirde:true,
		editable:false
	});
	
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
		var url="${basePath}/service/deliverBatchDetail/detail?freshtime=" + new Date().getTime();
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	}
	
	function clearForm(){
		$("#dataHosForm")[0].reset();
		var url="${basePath}/service/deliverBatchDetail/clear";
		$('#dataTable').datagrid('load',url);
	}
</script>
<title>发放批次明细报表</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:9%;padding-top:1%;" >
		<form id="dataHosForm"  method="post">
			<table style="width:100%" border="0" cellpadding="0" cellspacing="0" class="style1">
				<tr>
					<td style="width:10%"></td>
					<td class="title">  
						发放结果 
					</td>
					<td class="cont">
						<select id="state" name="state" style="width:220px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">
						批次名称
					</td>
					<td class="cont">
						<input class="easyui-textbox" name="batchName" id="batchName" type="text" style="width:250px;"/>
					</td>
					<td class =cont>
				       <div align="left"  class="serbut" style="height: 15px; padding-top: 0;">
				          <a href="javascript:void(0)" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				          <a href="javascript:void(0)" id = "qkbtn" class="easyui-linkbutton" iconCls="icon-clear" onclick="clearForm()">清空</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			           </div>
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