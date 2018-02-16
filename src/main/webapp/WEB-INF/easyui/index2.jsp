<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Basic Layout - jQuery EasyUI Demo</title>
	<link rel="stylesheet" type="text/css" href="/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="/easyui/demo/demo.css">
	<script type="text/javascript" src="/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="/easyui/jquery.easyui.min.js"></script>
<title>天气接口</title>

</head>
<body class="easyui-layout">
	<div style="margin: 0;"></div>
		<table align="center" vlign="center" width="700px" height="500px" border="1" cellspacing="0" >
			<tr>
				<td>城市
				<select id="ct" class="easyui-combobox" name="dept" style="width:80px;">   
  	  				<option value="aa">北京</option>   
   					<option>南京</option>   
   	 				<option>上海</option>   
    				<option>杭州</option>   
    				<option>深圳</option>   
				</select> 
				</td>
				
				<td>
					时间
					<input  id="dd"  type= "text" class= "easyui-datebox" required ="required" > </input> 
				</td>
				
				<td><input type="submit()" value="查询"></td>
				
				<td><input type="reset" value="清除"></td>
			</tr>
			
		</table>
	
</body>


</script>
</html>
