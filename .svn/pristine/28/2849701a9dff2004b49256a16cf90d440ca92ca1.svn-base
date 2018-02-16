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
					{field:'batchState',title:'批次状态',width : 100,align : 'center'},
					{field:'batchName', title:'批次名称',width : 100,align : 'center'},
					{field:'campaignFullName',title:'项目',width : 100,align : 'center'},
					{field:'allocationLevel',title:'发放级别',width : 100,align : 'center'},
					{field:'org',title:'创建机构',width : 100,align : 'center'},  //创建机构 （固定写:总公司电销事业部）
					{field:'operator',title:'创建人',width : 100,align : 'center'},//创建人 (关联stuff表)
					{field:'managerCom',title:'拨打机构',width : 100,align : 'center'},
					{field:'saleCom',title:'销售机构',width : 100,align : 'center'},
					{field:'createtime',title:'创建时间',width : 100,align : 'center'},
					{field:'usedata',title:'启用时间',width : 100,align : 'center'},
					{field:'usedays',title:'使用天数',width : 100,align : 'center'},
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
	
   	$('#campaignId').combobox({
		valueField:'campaignId',
		textField:'campaignFullName',
		url:"${basePath}/service/systemDeliver/campaign",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	$('#allocationLevel').combobox({
		valueField:'allocationLevelId',
		textField:'allocationLevelName',
		url:"${basePath}/service/systemDeliver/allocationLevel",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	$('#state').combobox({
		valueField:'stateId',
		textField:'batchesState',
		url:"${basePath}/service/systemDeliver/batchState",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	$('#businessType').combobox({
		valueField:'occupyTypeId',
		textField:'occupyType',
		url:"${basePath}/service/systemDeliver/occupyType",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	
    //初始化创建机构
	$('#user_org').combobox({
		valueField:'managecom',
		textField:'shortName',
		url:'${basePath}/service/systemDeliver/userorglist',
		panelHeight:120,
		requirde:true,
		editable:false,
		onChange:function(managecom){
			$('#staff_id').combobox({
				valueField:'staff_id',
				textField:'staffname',
				url:'${basePath}/service/systemDeliver/stafflist?managecom='+managecom,
				panelHeight:120,
				requirde:true,
				editable:false
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
		
		var url = "${basePath}/service/systemDeliver/detail?freshTime="+new Date().getTime();
		$('#dataTable').datagrid('load',url); //设置好查询参数 reload 一下就可以了
	}
	
	function clearForm(){
	    $("#dataHosForm")[0].reset();
		var url="${basePath}/service/systemDeliver/clear";
		$('#dataTable').datagrid('load',url);
	}
</script>
<title>系统发放结果统计报表</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:19%;padding-top:1%;">
		<form id="dataHosForm"  method="post" style="height: 99%">
			<table style="width:100%; height: 100%" border="solid 0px red"  cellpadding="0" cellspacing="0" class="style1">
				<tr>
					<td style="width:3%" rowspan="3"></td>
					<td class="title">  
						批次状态 
					</td>
					<td>
						<select id="state" name="state" style="width:215px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">
						批次名称
					</td>
					<td>
						<input name="batchName" id="batchName" type="text" style="width:218px;" class="easyui-textbox" />
					</td>
					<td class="title">  
						系统发放条件
					</td>
					<td>
						<select id="businessType" name="businessType" style="width:217px;" class="easyui-combobox" size="2"></select>
					</td>
				</tr>
				<tr>
					<td class="title"> 
						创建机构
					</td>
					<td>
						<select name="user_org" id="user_org" style="width:215px;" class="easyui-combobox"></select>
					</td>
					<td class="title"> 
						创建人
					</td>
					<td>
						<select name="staff_id" id="staff_id" style="width:218px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">
						项目
					</td>
					<td>
						<input id="campaignId"  name="campaignId" style="width:217px;" class="easyui-combobox" >
					</td>
					<td rowspan='2'>
			          <a href="javascript:void(0)" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			          <a href="javascript:void(0)" id = "qkbtn" class="easyui-linkbutton" iconCls="icon-clear" onclick="clearForm()">清空</a>
				    </td>
				</tr>
				<tr>
					<td class="title">
						发放级别
					</td>
					<td>
						<input id="allocationLevel"  name="allocationLevel" style="width:215px;" class="easyui-combobox" >
					</td>
					<td class="title">
						创建时间
					</td>
					<td>
						<input class="easyui-datebox" name="createtimeFrom" id="createtimeFrom" style="width:100px" type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox" name="createtimeTo" id="createtimeTo" style="width:100px"  type="text"/></td>
					<td class="title">
						启用时间
					</td>
					<td>
						<input class="easyui-datebox" name="usedataFrom" id="usedataFrom" style="width:100px"  type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox" name="usedataTo" id="usedataTo" style="width:100px"  type="text"/>
					</td>
				</tr>
			</table>
			</form>
		</div>
	<div data-options="region:'center',border:false"  style="overflow: hidden; padding: 0px;" > 
          <table id="dataTable"></table> 
    </div>
</div>
</body>
</html>