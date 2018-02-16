package abc;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import org.junit.Test;
import org.json.JSONArray;
import org.json.JSONObject;



public class data {
	@Test
	public  void json() throws Exception{
		//参数url化
		String city = java.net.URLEncoder.encode("北京", "utf-8");
		
		//拼地址
		String apiUrl = String.format("http://www.sojson.com/open/api/weather/json.shtml?city=%s",city);
		//format(String format, Object... args) 新字符串使用本地语言环境，制定字符串格式和参数生成格式化的新字符串。  %s 字符串类型
		
		//开始请求
		URL url= new URL(apiUrl);
		URLConnection open = url.openConnection();
		InputStream input = open.getInputStream();
		
		//这里转换为String，带上包名，怕你们引错包
		//IOUtils.toString将缓冲区的内容以utf-8的编码方式以字符串的形式输出 
		String result = org.apache.commons.io.IOUtils.toString(input,"utf-8");
		
		//输出
		//System.out.println(result);
		
		//字符串转成json对象
	    JSONObject a = new JSONObject(result);
	    
	    //得到data字段的值数据并继续转换成json对象
	    JSONObject b = (JSONObject) a.get("data");
	    
	    //得到Json对象属性列表
	    JSONArray c = b.getJSONArray("forecast");
	    
	    System.out.println(a.get("city"));
	    System.out.println("---------------------------------");
	    
	    //for循环遍历
	    for(int i = 0;i < c.length();i++){
	    	System.out.println(c.getJSONObject(i).get("date"));
	    }
	}
}
