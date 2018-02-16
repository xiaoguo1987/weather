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
					{field:'yearMonth', title:'统计日期',width : 100,align : 'center',rowspan:2},
					{field:'saleManageCom', title:'机构',width : 100,align : 'center',rowspan:2},
					{field:'cityName',title:'城市',width : 100,align : 'center',rowspan:2},
					{field:'', title:'证件客户数量',width : 100,align : 'center',colspan:4},
					{field:'', title:'准客户数量',width : 100,align : 'center', colspan:4},
					{field:'', title:'潜在客户数量',width : 100,align : 'center', colspan:4},
					{field:'', title:'类客户数量',width : 100,align : 'center', colspan:4}
				],[
					{field:'totalNum_1',title:'总量',width : 100,align : 'center'},
					{field:'increaseNum1_1',title:'近1个月新增',width : 100,align : 'center'},
					{field:'increaseNum6_1',title:'近6个月新增',width : 100,align : 'center'},
					{field:'increaseNum12_1',title:'近12个月新增',width : 100,align : 'center'},
					{field:'totalNum_2',title:'总量',width : 100,align : 'center'},
					{field:'increaseNum1_2',title:'近1个月新增',width : 100,align : 'center'},
					{field:'increaseNum6_2',title:'近6个月新增',width : 100,align : 'center'},
					{field:'increaseNum12_2',title:'近12个月新增',width : 100,align : 'center'},
					{field:'totalNum_3',title:'总量',width : 100,align : 'center'},
					{field:'increaseNum1_3',title:'近1个月新增',width : 100,align : 'center'},
					{field:'increaseNum6_3',title:'近6个月新增',width : 100,align : 'center'},
					{field:'increaseNum12_3',title:'近12个月新增',width : 100,align : 'center'},
					{field:'totalNum_4',title:'总量',width : 100, align : 'center'},
					{field:'increaseNum1_4',title:'近1个月新增',width : 100,align : 'center'},
					{field:'increaseNum6_4',title:'近6个月新增',width : 100,align : 'center'},
					{field:'increaseNum12_4',title:'近12个月新增',width : 100,align : 'center'}
				   ]
   				],
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
	
   	$('#manageCom').combobox({
		valueField:'managecom',
		textField:'shortName',
		url:"${basePath}/service/cifBasicInfo/saleManageCom",
		panelHeight:120,
		requirde:true,
		editable:false,
		onChange:function(managecom){
			$('#city').combobox({
				valueField:'city',
				textField:'name',
				url:"${basePath}/service/cifBasicInfo/city?managecom="+managecom,
				panelHeight:120,
				requirde:true,
				editable:false
			}); 	
		}
	});
   	
   	$('#year').combobox({
   		url:"${basePath}/service/custNumberStatistics/year",    
   	    valueField:'valueYear',    
   	    textField:'textYear',
   	 	panelHeight:120,
		requirde:true,
		editable:false
   	});
   	
   	$('#month').combobox({
   		url:"${basePath}/service/custNumberStatistics/month",    
   	    valueField:'valueMonth',    
   	    textField:'textMonth',
   	 	panelHeight:120,
		requirde:true,
		editable:false
   	});
	
});
</script>
<script type="text/javascript">
	//判断年月是否为空
	function checkForm(){
		
	   	var year1 = $('#year').combobox('getText');
	   	var month1 = $('#month').combobox('getText');
		
		if(year1=="" || year1=="null" || year1==null){
			if(month1!="" && month1!="null" && month1!=null){
				alert('请选择年份！');
			}else{
				submitForm();
			}
		}else{
			if(month1=="" || month1=="null" || month1==null){
				alert('请选择月份！');
			}else{
				submitForm();
			}
		}
	}
	//表格查询
	function submitForm() {
		//查询参数直接添加在queryParams中
		var queryParams = $('#dataTable').datagrid('options').queryParams;
		var fields = $('#dataHosForm').serializeArray(); //自动序列化表单元素为JSON对象
		$.each(fields, function(i, field) {
			queryParams[field.name] = field.value; //设置查询参数
		});
		var url="${basePath}/service/custNumberStatistics/detail?freshtime=" + new Date().getTime();
		$('#dataTable').datagrid('reload',url); //设置好查询参数 reload 一下就可以了
	}
	
	function clearForm(){
		$("#manageCom").combobox('setValue','');
		$("#city").combobox('setValue','');
		$("#year").combobox('setValue','');
		$("#month").combobox('setValue','');
		var url="${basePath}/service/cifBasicInfo/clear";
		$('#dataTable').datagrid('load',url);
	}
</script>
<title>客户数量统计报表</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:9%;padding-top:1%;" >
		<form id="dataHosForm"  method="post">
			<table style="width:100%" border="0" cellpadding="0" cellspacing="0" class="style1">
				<tr>
					<td style="width:5%"></td>
					<td class="title">
						机构
					</td>
					<td class="cont">
						<select id="manageCom" name="salemanagecom" style="width:151px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">
						城市
					</td>
					<td class="cont">
						<select id="city" name="city" style="width:151px;" class="easyui-combobox" ></select>
					</td>
					<td class="title">
						年份
					</td>
					<td class=cont>
						<select class="easyui-combobox" name="year" id="year" style="width:151px"></select>
					</td>
				   	<td class="title">
						月份
					</td>
					<td class=cont>
						<select class="easyui-combobox" name="month" id="month" style="width:151px"></select>
					</td>
					<td class =cont colspan="2">
				       <div align="center"  class="serbut" style="height: 15px; padding-top: 0;">
				          <a href="javascript:void(0)" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="checkForm()">查询</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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