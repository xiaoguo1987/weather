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
  //初始化服务url
	$('#url').combobox({
		valueField:'service_uri',
		textField:'service_desc',
		url:'${basePath}/service/defservice/deflist',
		requirde:true,
		editable:true
	});
})
</script>
<script type="text/javascript">
	//创建xmlHttpRequest
	function creatxmlObj(){
		var xmlHttpRequest;
		
		try{
			xmlHttpRequest= new XMLHttpRequest();
		}catch(e){
			try{
				xmlHttpRequest= new ActiceXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{
					xmlHttpRequest= new ActiceXObject("Microsoft.XMLHTTP");
				}catch(e){
					alert("你的浏览器不支持AJAX");
					return false;
				}
			}
		}
		
		return xmlHttpRequest;
	}
	//提交
	function submitForm() {
		var xmlHttpRequest = creatxmlObj();
		
		var url=$("#url").combobox("getValue");
		var param=dataHosForm.res.value;
		xmlHttpRequest.open("post",url,true);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.setRequestHeader('Access-Control-Allow-Origin','*');
		
		xmlHttpRequest.onreadystatechange=function(){
			if(xmlHttpRequest.readyState==4 && xmlHttpRequest.status == 200){
				
				var data =xmlHttpRequest.responseText;
				$("#req").val(data);
			}
		};
		xmlHttpRequest.send(param);
		
	}
	//清空
	function clearForm(){
		$("#dataHosForm")[0].reset();
		$("#req").val(null);
	}
</script>
<title>测试报文程序</title>
</head>
<body>
<div class="easyui-layout" data-options="fit : true,border : false" >
		<div  data-options="region:'north'" style="height:50%;padding-top:1%;" >
		<form id="dataHosForm"  method="post">
			<table id="table1" style="width:100%" align="center" border="1" cellpadding="1" cellspacing="1" >
				<tr>
					<td class="title">
						服务名称：
					</td>
					<td >
						<input  id="url" name="url" class="easyui-combobox"  style="width:300px"/>
					</td>
				</tr>
				<tr>	
					<td colspan="2"  class="title">
						报文内容：
					</td>
				</tr>
				<tr>
					<td colspan="2" >
						<textarea  id="res" name="res" class="easyui-validatebox" required="true" style="width:100%;height:170px;">
						
						</textarea>
					</td>
				</tr>
				<tr>
					<td class =cont >
				          <a href="#" id = "qybtn" class="easyui-linkbutton" iconCls="icon-search" onclick="submitForm()">提交</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				    </td>
				    <td  class=cont>
				          <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-empty" onclick="clearForm()" >清空</a>
				    </td>
				</tr>
			</table>
			</form>
		</div>
	<div data-options="region:'center',border:false"  style="overflow: hidden; padding-top: 0;" > 
          <table id="table2" style="width:100%" align="center" >
          		<tr>	
					<td colspan="2" class="title">
						返回报文内容：
					</td>
				</tr>
          		<tr>
          			<td>
					<textarea  id="req" name="req" class="easyui-validatebox" required="true" style="width:100%;height:200px;">
						
						</textarea>
					</td>
				</tr>
          </table> 
    </div>
</div>
</body>
</html>