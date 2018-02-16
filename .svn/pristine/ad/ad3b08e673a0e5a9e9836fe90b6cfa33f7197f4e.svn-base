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
   		singleSelect:false,
   		rownumbers:true,
   		pagination:true,
   		collapsible:false,
   		panelHeight:'auto',
   		fit:true,
   		//url:"${basePath}/service/protectlist/detail",
   		method:'post',
   		pageNumber:1,
   		pageSize:15,
   		pageList:[15,25,35,50,100],
   		align:'center',
   		fitColumns:true,
   		idField : 'number',     //此处根据实际情况进行填写
   		columns:[[
	                {field:'interfacemode', title:'接口方式',width : 120,align : 'center'},
					{field:'job_id',title:'任务号',width : 120,align : 'center'},
          			{field:'source_id',title:'数据来源',width : 120,align : 'center'},
					{field:'subsource_id', title:'数据子来源',width : 120,align : 'center'},
					{field:'user_org',title:'创建机构',width : 150,align : 'center'},
					{field:'user_id',title:'创建人',width : 120,align : 'center'},
					{field:'createtime',title:'创建时间',width : 160,align : 'center'},
					{field:'importtime',title:'导入时间',width : 160,align : 'center'},
					{field:'mergermode',title:'归并方式',width : 100,align : 'center'},
					{field:'totalnum',title:'数据总量',width : 80,align : 'center'},
					{field:'succnum',title:'成功总量',width : 80,align : 'center'},
					{field:'newnum',title:'新增数量',width : 80,align : 'center'},
					{field:'mergernum',title:'归并数量',width : 80,align : 'center'}
				]],
		rowStyler: function(index,row){
			if(row.status=='2'){
				return 'color:#ff9999;';
			}else{
				if ((index % 2)!=0){
					return 'background-color:#B2DAFC;';
				}	
			}
		}
        
	}).datagrid("columnMoving");  
    
  //初始化数据来源下拉列表
	$('#source_id').combobox({
		valueField:'source_id',
		textField:'source_name',
		url:'${basePath}/service/importresult/datasourcelist',
		//panelHeight:'auto',
		requirde:true,
		editable:false,
		//value:'请选择',
		onChange:function(source_id){
			$('#subsource_id').combobox({
				valueField:'subsource_id',
				textField:'subsource_name',
				url:'${basePath}/service/importresult/datasubsourcelist?source_id='+source_id,
				requirde:true,
				editable:false
				//value:'请选择'		
			});
		}
	});
  
  //初始化数据子来源
	$('#subsource_id').combobox({
		valueField:'subsource_id',
		textField:'subsource_name',
		url:'${basePath}/service/importresult/datasubsourcelist',
		requirde:true,
		editable:false
		//value:'请选择'		
	});
	//初始化创建机构
	$('#user_org').combobox({
		valueField:'managecom',
		textField:'shortName',
		url:'${basePath}/service/importresult/userorglist',
		requirde:true,
		editable:false,
		//value:'请选择'
		onChange:function(managecom){
			$('#staff_id').combobox({
				valueField:'staff_id',
				textField:'staffname',
				url:'${basePath}/service/importresult/stafflist?managecom='+managecom,
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
		//panelHeight:'auto',
		requirde:true,
		editable:false
		//value:'请选择'		
	});
  
	//初始化归并方式信息
	$('#kv_key').combobox({
		valueField:'kv_key',
		textField:'kv_value',
		url:'${basePath}/service/importresult/datamergelist',
		//panelHeight:'auto',
		requirde:true,
		editable:false
		//value:'请选择'		
	});
})

	
	
</script>
<script type="text/javascript">

	//表格查询
	 function submitForms() {
		//查询参数直接添加在queryParams中
		var queryParams = $('#dataTable').datagrid('options').queryParams;
		var fields = $('#dataHosForm').serializeArray(); //自动序列化表单元素为JSON对象
		$.each(fields, function(i, field) {
			queryParams[field.name] = field.value; //设置查询参数
	
		});
		var url = '${basePath}/service/importresult/importlist';
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	} 

	function clearForm(){
		$("#dataHosForm")[0].reset();
	}
</script>
<title>导入结果统计页面</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:16%;padding-top:1%">
		<form id="dataHosForm"  method="post">
			<table style="width:100%" border="0" cellpadding="1" cellspacing="1" class="style1">
				<tr>
					<td class="title">
					数据来源:
					</td>
					<td>
					 <input  id="source_id" name="source_id" class="easyui-combobox"  >
					</td>
					<td  class="title">
					数据子来源:
					</td>
					<td>
					<input id="subsource_id" name="subsource_id"  class="easyui-combobox"  style="width:200px">
					</td>
					<td class="title">
					创建机构:
					</td>
					<td colspan = '2'>
					<input id="user_org" name="user_org"   class="easyui-combobox"  >
					</td>
					<td class="title">
					创建人:
					</td>
					<td>
					<input id="staff_id" name="staff_id" class="easyui-combobox" style="width:200px">
					</td>
				</tr>
				<tr>
					<td class="title">
					归并方式:
					</td>
					<td>
					<input id="kv_key" name="kv_key" class="easyui-combobox" >
					</td>
					<td class="title">
					创建时间:
					</td>
					<td>
					<input class="easyui-datebox"  name="createstarttime" id="createstarttime" style="width:90px" type="text"/>至:
					<input class="easyui-datebox"  name="createndtime" id="createndtime" style="width:90px" type="text" />
					</td>
					<td class="title">
					实际导入时间:
					</td>
					<td>
					<input class="easyui-datebox"  name="importstarttime" id="importstarttime" style="width:90px" type="text"/>至
					<input class="easyui-datebox"  name="importendtime" id="importendtime" style="width:90px" type="text" />
					</td>
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
	<div  data-options="region:'center',border:false"  style="overflow: hidden;" > 
	          <table id="dataTable" >
	          </table> 
    </div>
	<div id="divDialog"></div>
   <div id="MyPopWindow"></div>
</div>
</body>
</html>