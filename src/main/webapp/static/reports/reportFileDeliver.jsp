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
				    {field:'interfaceType', title:'接口方式',width : 100,align : 'center'},
					{field:'batchId',title:'批次号',width : 100,align : 'center'},
					{field:'batchName', title:'批次名称',width : 100,align : 'center'},
					{field:'purpose',title:'用途',width : 100,align : 'center'},  //创建机构 （固定写:总公司电销事业部）
					{field:'org',title:'创建机构',width : 100,align : 'center'},  //创建机构 （固定写:总公司电销事业部）
					{field:'operator',title:'创建人',width : 100,align : 'center'},//创建人 (关联stuff表)
					{field:'createtime',title:'创建时间',width : 100,align : 'center'},
					{field:'fileType',title:'文件类型',width : 100,align : 'center'},
					{field:'deliverNumber',title:'发放数量',width : 110,align : 'center'},
					{field:'successNumber',title:'成功数量',width : 110,align : 'center'}
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
		url:"${basePath}/service/fileDeliver/batchState",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	$('#businessType').combobox({
		valueField:'occupyTypeId',
		textField:'occupyType',
		url:"${basePath}/service/fileDeliver/occupyType",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	$('#purpose').combobox({
		valueField:'purposeId',
		textField:'purpose',
		url:"${basePath}/service/fileDeliver/purpose",
		panelHeight:120,
		requirde:true,
		editable:false
	});
	
    //初始化创建机构
	$('#user_org').combobox({
		valueField:'managecom',
		textField:'shortName',
		url:'${basePath}/service/fileDeliver/userorglist',
		panelHeight:120,
		requirde:true,
		editable:false,
		//value:'请选择'
		onChange:function(managecom){
			$('#staff_id').combobox({
				valueField:'staff_id',
				textField:'staffname',
				url:'${basePath}/service/fileDeliver/stafflist?managecom='+managecom,
				panelHeight:120,
				requirde:true,
				editable:false
				//value:'请选择'		
			});
		}
	});
    
	//初始化用户表
	$('#staff_id').combobox({
		valueField:'staff_id',
		textField:'staffname',
		url:'${basePath}/service/importresult/stafflist',
		panelHeight:120,
		requirde:true,
		editable:false
		//value:'请选择'		
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
		var url="${basePath}/service/fileDeliver/detail?freshtime=" + new Date().getTime();
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	}
	
	function clearForm(){
		$("#dataHosForm")[0].reset();
		var url="${basePath}/service/fileDeliver/clear";
		$('#dataTable').datagrid('load',url);
	}
</script>
<title>文件发放结果统计报表</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:14%;padding-top:1%;" >
		<form id="dataHosForm"  method="post" style="height: 100%">
			<table style="width:100%;height: 100%;" border="0" cellpadding="0" cellspacing="0" class="style1">
				<tr height="50%">
					<td style="width:2%" rowspan='2'></td>
					<td class="title"> 
						创建机构
					</td>
					<td>
						<select name="user_org" id="user_org" style="width:191px;" class="easyui-combobox"></select>
					</td>
					<td class="title"> 
						创建人
					</td>
					<td>
						<select name="staff_id" id="staff_id" style="width:191px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">  
						文件发放条件
					</td>
					<td>
						<select id="businessType" name="businessType" style="width:191px;" class="easyui-combobox" size="2"></select>
					</td>
				   	<td class="title">
						创建时间
					</td>
					<td>
						<input class="easyui-datebox" name="createtimeFrom" id="createtimeFrom" style="width:100px" type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox" name="createtimeTo" id="createtimeTo" style="width:100px" type="text"/>
					</td>
				</tr>
				<tr height="50%">
					<td class="title">  
						批次状态 
					</td>
					<td>
						<select id="state" name="state" style="width:191px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">
						批次名称
					</td>
					<td>
						<input class="easyui-textbox" name="batchName" id="batchName" type="text" style="width:191px;"/>
					</td>
					<td class="title">
						用途
					</td>
					<td>
						<select id="purpose"  name="purpose" style="width:191px;" class="easyui-combobox" ></select>
					</td>
					<td></td>
					<td colspan="2" align="left">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			          <a href="javascript:void(0)" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			          <a href="javascript:void(0)" id = "qkbtn" class="easyui-linkbutton" iconCls="icon-clear" onclick="clearForm()">清空</a>
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