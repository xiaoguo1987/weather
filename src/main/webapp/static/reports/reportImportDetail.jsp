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
   		method:'post',
   		pageNumber:1,
   		pageSize:15,
   		pageList:[15,25,35,50,100],
   		align:'center',
   		fitColumns:true,
   		idField : 'number',     //此处根据实际情况进行填写
   		columns:[[
	                {field:'cust_id', title:'客户编号',width : 120,align : 'center'},
					{field:'mphone',title:'手机号',width : 120,align : 'center'},
          			{field:'idno',title:'证件号',width : 120,align : 'center'},
					{field:'importresult', title:'导入结果',width : 160,align : 'center'}
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
		var url = '${basePath}/service/importdetail/detaillist';
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	}; 

	function clearForm(){
		$("#dataHosForm")[0].reset();
	}
</script>
<title>导入批次明细页面</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:10%;padding-top:0.8%" >
		<form id="dataHosForm"  method="post" >
			<table style="width:100%" border="0"  cellpadding="0" cellspacing="0" class="style1">
				<tr align="center">
					<td style="width:5%"></td>
					<td class="title">
					任务号:
					</td>
					<td class="cont">
					 <input  id="job_id" name="job_id" style="width:90px;" class="easyui-textbox" >
					</td>
					<td class="title">
					申请号:
					</td>
					<td class="cont">
					 <input  id="apply_id" name="apply_id" style="width:191px;" class="easyui-textbox" >
					</td>
					<td class="title">
					导入结果:
					</td>
					<td class="cont">
					<select  id="state" name="state" style="width:191px;" class="easyui-combobox"  >
                        <option value=""> </option>                      
                        <option value="1">替换</option>
                        <option value="2">覆盖</option>
                        <option value="3">补充</option>
                        <option value="4">忽略</option>
                        <option value="5">新增</option>
                        <option value="6">失败</option>
               		</select>
					</td>
					<td class =cont colspan="2" >
						<div align="left"  class="serbut" style="height: 15px; padding-top: 0;">
				          <a href="javascript:void(0)"  class="easyui-linkbutton" iconCls="icon-search" onclick="submitForms()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				   		  <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-clear" onclick="clearForm()" >清空</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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