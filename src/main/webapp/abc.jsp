<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>天气接口</title>
</head>
<body>
	<form action="city/find" method="post">
		<table>
			<tr>
				<td id="city" align="center">
					城市
				</td>
				<td>
					<select name="cityname"  style="width:200px;">   
   						 <option>北京</option>   
   						 <option>南京</option>   
				</td>
				<td>
					<input type="submit" value="提交">
					<input type="reset" value="清空">
				</td>
			</tr>
		</table>
	</form>
</body>
</html>