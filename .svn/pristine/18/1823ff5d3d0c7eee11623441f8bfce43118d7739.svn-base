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
					{field:'batchId',title:'批次号',width : 100,align : 'center'},
					{field:'dmCifCustId', title:'客户号',width : 100,align : 'center'},
					{field:'phone',title:'手机号',width : 100,align : 'center'},
					{field:'occupyType',title:'占位类型',width : 100,align : 'center'},
					{field:'batchName',title:'占位批次',width : 100,align : 'center'},
					{field:'occupyStartTime',title:'占位开始时间',width : 100,align : 'center'},  //创建机构 （固定写:总公司电销事业部）
					{field:'occupyEndTime',title:'占位结束时间',width : 100,align : 'center'},//创建人 (关联stuff表)
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
	
   	$('#occupyType').combobox({
		valueField:'occupyTypeId',
		textField:'occupyType',
		url:"${basePath}/service/occupyDetail/occupyType",
		panelHeight:120,
		requirde:true,
		editable:false
	});
   	
  //初始化创建机构
	$('#user_org').combobox({
		valueField:'managecom',
		textField:'shortName',
		url:'${basePath}/service/occupyDetail/userorglist',
		panelHeight:120,
		requirde:true,
		editable:false,
		//value:'请选择'
		onChange:function(managecom){
			$('#staff_id').combobox({
				valueField:'staff_id',
				textField:'staffname',
				url:'${basePath}/service/occupyDetail/stafflist?managecom='+managecom,
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
	function submitForm() {
		$('#batchName').validatebox({
			required:true,
			missingMessage:'请输入批次名称',
			tipPosition:'right'
		});
		
		$('#batchName').validatebox('validate');
		var flag = $('#batchName').validatebox('isValid');
		if(flag){
			var queryParams = $('#dataTable').datagrid('options').queryParams;
			var fields = $('#dataHosForm').serializeArray(); //自动序列化表单元素为JSON对象
			$.each(fields, function(i, field) {
				queryParams[field.name] = field.value; //设置查询参数
			});
			var url="${basePath}/service/occupyDetail/detail?freshtime="+new Date().getTime();
			$('#dataTable').datagrid('load',url);
		}else{
			alert('请输入批次名称');
		}
	}
	
	function clearForm(){
		$("#dataHosForm")[0].reset();
		var url="${basePath}/service/occupyDetail/clear";
		$('#dataTable').datagrid('load',url);
	}
</script>
<title>占位明细报表</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
	<div  data-options="region:'north'" style="height:15%;padding-top: 1%;">
		<form id="dataHosForm"  method="post" style="height:100%;">
			<table style="width:100%;height:94%;" cellpadding="0px" cellspacing="0px">
				<tr height="50%">
					<td style="width:3%" rowspan='2'></td>
					<td class="title"> 
						占位类型
					</td>
					<td>
						<select id="occupyType" name="occupyType" style="width:191px;" class="easyui-combobox" ></select>
					</td>
					<td class="title"> 
						批次名称<span style="color:red;font-size: large;">*</span>
					</td>
					<td >
						<input class="easyui-validatebox"  name="batchName" id="batchName" type="text" style="width:190px;" />
					</td>
					<td class="title"> 
						占位开始时间
					</td>
					<td>
						<input class="easyui-datebox" name="occupyStartTimeFrom" id="occupyStartTimeFrom" style="width:100px" type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox" name="occupyStartTimeTo" id="occupyStartTimeTo" style="width:100px"  type="text"/>
					</td>
				</tr>
				<tr height="50%">
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
						<select name="staff_id" id="staff_id" style="width:194px;" class="easyui-combobox" ></select>
					</td>
					<td class="title"> 
						占位结束时间
					</td>
					<td>
						<input class="easyui-datebox" name="occupyEndTimeFrom" id="occupyEndTimeFrom" style="width:100px"  type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox" name="occupyEndTimeTo" id="occupyEndTimeTo" style="width:100px"  type="text"/>
					</td>
					<td valign="middle">
			          <a href="javascript:void(0)" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			          <a href="javascript:void(0)" id = "qkbtn" class="easyui-linkbutton"  iconCls="icon-clear" onclick="clearForm()">清空</a>
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