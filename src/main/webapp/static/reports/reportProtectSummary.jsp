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
   		singleSelect : true,
   		rownumbers:true,
   		pagination:true,
   		panelHeight:'auto',
   		fit:true,
   		method : 'post',
   		pageNumber:1,
   		pageSize:15,
   		pageList:[15,25,35,50,100],
   		align:'center',
   		fitColumns:true,
   		idField : 'number',     //此处根据实际情况进行填写
   		columns:[[
					{field:'salemanagecom', title:'管理机构',width : 120,align : 'center'},
					{field:'salecom',title:'销售机构',width : 120,align : 'center'},
					{field:'city_id',title:'城市',width : 120,align : 'center'},
					{field:'protectsum',title:'保护客户总量',width : 120,align : 'center'},
					{field:'jibo_sum', title:'禁拨数量',width : 120,align : 'center'},
					{field:'gaoke_sum',title:'公司内高客数量',width : 120,align : 'center'},
					{field:'mingan_sum',title:'敏感客户数量',width : 120,align : 'center'}
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
	
  //初始化管理机构下拉列表
	$('#salemanagecom').combobox({
		valueField:'managecom',
		textField:'shortName',
		url:'${basePath}/service/prosummary/managelist',
		requirde:true,
		editable:false,
		onChange:function(managecom){
			$('#salecom').combobox({
				valueField:'salecom',
				textField:'name',
				url:'${basePath}/service/prosummary/salecomlist?managecom='+managecom,
				//panelHeight:'auto',
				requirde:true,
				editable:false
			});
			$('#city').combobox({
				valueField:'city',
				textField:'name',
				url:'${basePath}/service/prosummary/citylist?managecom='+managecom,
				//panelHeight:'auto',
				requirde:true,
				editable:false		
			});
			
		}
	});
  //初始化销售机构下拉框
   	$('#salecom').combobox({
		valueField:'salecom',
		textField:'name',
		url:'${basePath}/service/prosummary/salecomlist',
		//panelHeight:'auto',
		requirde:true,
		editable:false
	});
	//初始化城市下拉框
	$('#city').combobox({
		valueField:'city',
		textField:'name',
		url:'${basePath}/service/prosummary/citylist',
		//panelHeight:'auto',
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
		var url = '${basePath}/service/prosummary/summarydetail';
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	} 

	
	function clearForm(){
		$("#dataHosForm")[0].reset();
	}
</script>
<title>保护名单汇总页面</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:14%;padding-top:0.9%">
		<form id="dataHosForm"  method="post">
			<table style="width:100%" border="0" cellpadding="0" cellspacing="1" class="style1">
				<tr>
					<td class="title">
					管理机构:
					</td>
					<td>
					 <input  id="salemanagecom" name="salemanagecom" class="easyui-combobox"  >
					</td>
					<td class="title">
					销售机构:
					</td>
					<td>
					<input id="salecom" name="salecom" class="easyui-combobox"  >
					</td>
					<td class="title">
					城市:
					</td>
					<td>
					<input id="city" name="city" class="easyui-combobox"  >
					</td>
				 </tr>
				 <tr>
					<td class="title">
					纳入保护时间:
					</td>
					<td>
					<input class="easyui-datebox"  name="prostarttime" id="prostarttime" style="width:90px" type="text"/>至:
					<input class="easyui-datebox"  name="proendtime" id="proendtime" style="width:90px" type="text" />
					</td>
					<td class="title">
					禁播时间:
					</td>
					<td>
					<input class="easyui-datebox"  name="banstarttime" id="banstarttime" style="width:90px" type="text"/>至
					<input class="easyui-datebox"  name="banendtime" id="banendtime" style="width:90px" type="text" />
					</td>
					<td  class =cont>
				       <div   class="serbut" style="height: 20;padding-top: 3;">
				          <a href="javascript:void(0)"  class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			           </div>
				    </td>
				    <td  class=cont>
				       <div  class="serbut"   style="height: 20;padding-top: 3;">
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