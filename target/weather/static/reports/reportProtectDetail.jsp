<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<%@ include file="/include.jsp"%> 
<% 
	String staffID = request.getParameter("Staff_ID");   
%>
<c:set var="staffId" value="<%=staffID%>"></c:set>
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
					{field:'cust_new_id',title:'客户编号',width : 120,align : 'center'},
					{field:'mphone',title:'导入保护名单手机号',width : 120,align : 'center'},
					{field:'kv_value',title:'保护名单类类型',width : 120,align : 'center'},
					{field:'starttime',title:'纳入保护时间',width : 150,align : 'center'},
					{field:'expriy_date',title:'保护时间截止日',width : 150,align : 'center'},
					{field:'cphone1',title:'客户联系手机号1',width : 120,align : 'center'},
					{field:'cphone2',title:'客户联系手机号2',width : 120,align : 'center'},
					{field:'cphone3',title:'客户联系手机号3',width : 120,align : 'center'},
					{field:'cphone4',title:'客户联系手机号4',width : 120,align : 'center'},
					{field:'msg',title:'备注',width : 120,align : 'center'},
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

	var staff = "${staffId}";
	var mc = null;
	if (staff==null || staff == 'null' || typeof(staff)=='undefined'){
		mc = '0';
	}
	
	$.ajax({
		   type: "POST",
		   url:  '${basePath}/service/protectlist/managelist?staffId='+staff+'&managecom='+mc,
		   dataType: "json",
		   async:false,
		   success: function(data){
			  //debugger;
			  if(data!=null){
			  	if(data.length==1){
			  		mcom = data[0].managecom;
			  	}else{
			  		mcom = "";
			  	}
			  	
				//初始化销售机构下拉列表
				$('#salecom').combobox({
					valueField:'salecom',
					textField:'name',
					url:'${basePath}/service/protectlist/salecomlist?managecom='+mcom,
					requirde:true,
					editable:false		
				});
			
				//初始化城市下拉列表
				$('#city').combobox({
					valueField:'city',
					textField:'name',
					url:'${basePath}/service/protectlist/citylist?managecom='+mcom,
					requirde:true,
					editable:false
				});
				
				//初始化管理机构下拉列表
				$('#salemanagecom').combobox({
					valueField:'managecom',
					textField:'shortName',
					url:'${basePath}/service/protectlist/managelist?staffId='+staff+'&managecom='+mc,
					requirde:true,
					editable:false,
					onChange:function(managecom){
						$('#salecom').combobox({
							valueField:'salecom',
							textField:'name',
							url:"${basePath}/service/protectlist/salecomlist?managecom="+managecom,
							requirde:true,
							editable:false		
						});
						$('#city').combobox({
							valueField:'city',
							textField:'name',
							url:"${basePath}/service/protectlist/citylist?managecom="+managecom,
							requirde:true,
							editable:false
						});
					}
				});
			  }
		   }
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
		var staff = "${staffId}";
		queryParams['staffId'] = staff;//设置查询参数
		var url = '${basePath}/service/protectlist/detail';
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	} 

	function clearForm(){
		$("#dataHosForm")[0].reset();
	}
	
</script>

<title>保护名单明细页面</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:19%;padding-top:1%;">
		<form id="dataHosForm"  method="post" style="height: 99%">
			<table style="width:100%; height: 100%" border="solid 0px red"  cellpadding="0" cellspacing="0" class="style1">
				<tr>
					<td style="width:5%" rowspan="3"></td>
					<td class="title" >
						 管理机构:
					</td>
					<td id="td1">
						<input id="salemanagecom" name="salemanagecom" class="easyui-combobox" style="width:200px">
					</td>
					<td class="title">
						销售机构:
					</td>
					<td>
						<input id="salecom" name="salecom" class="easyui-combobox"  style="width:200px">
					</td>
					<td class="title">
						城市:
					</td>
					<td>
						<input id="city" name="city" class="easyui-combobox"  style="width:200px" >
					</td>
				</tr>
				<tr>
					<td class="title">
						客户编号:
					</td>
					<td>
						<input class="easyui-textbox" name="custId" id="custId" type="text" style="width:199px;"/>
					</td>
					<td class="title">
						导入保护名单手机号:
					</td>
					<td>
						<input class="easyui-textbox" name="mPhone" id="mPhone" type="text" style="width:199px;"/>
					</td>
					<td class="title">
						客户联系手机号:
					</td>
					<td>
						<input class="easyui-textbox" name="contactPhone" id="contactPhone" type="text" style="width:199px;"/>
					</td>
				</tr>
				<tr>
					<td class="title">
						纳入保护时间:
					</td>
					<td>
						<input class="easyui-datebox"  name="prostarttime" id="prostarttime" style="width:91px" type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox"  name="proendtime" id="proendtime" style="width:91px" type="text" />
					</td>
					<td class="title">
						禁播时间:
					</td>
					<td>
						<input class="easyui-datebox"  name="banstarttime" id="banstarttime" style="width:91px" type="text"/>
						<font class="title">至</font>
						<input class="easyui-datebox"  name="banendtime" id="banendtime" style="width:91px" type="text" />
					</td>
					<td></td>
					<td class =cont align="left">
			          	<a href="javascript:void(0)"  class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">查询</a>
			          		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			          		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			          	<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-empty" onclick="clearForm()" >清空</a>
				    </td>
				</tr>
			</table>
			</form>
		</div>
	 <div data-options="region:'center',border:false"  style="overflow: hidden;" > 
	 	<table id="dataTable" ></table> 
     </div>
	<div id="divDialog"></div>
    <div id="MyPopWindow"></div>
</div>
</body>
</html>