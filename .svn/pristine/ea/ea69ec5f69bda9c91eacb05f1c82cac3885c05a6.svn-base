package com.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.druid.support.json.JSONUtils;
import com.domain.Weather;
import com.domain.Wresult;
import com.service.IWeatherService;

@Controller
@RequestMapping("/city")
public class WeatherController {
	private static Logger logger = Logger.getLogger(StateFileController.class);
	@Resource(name = "weatherService")
	private IWeatherService weatherService;

	@RequestMapping(method = RequestMethod.POST,value = "find")
	public  String  getWeatherByCityName(HttpServletRequest request) throws UnsupportedEncodingException {
		//request.setCharacterEncoding("UTF-8");
		String cityname = request.getParameter("city_id");
		System.out.println(cityname);
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Weather weather = new Weather();
			List<Weather> list = weatherService.getWeatherByCityName(cityname);
			for (Weather result : list) {
				System.out.println(result);
			}
			request.setAttribute("weather", list);
			//返回map结果集，list为查询结构集合，total为查询结果总数量，用于前台的easyui的分页
			//参考ReportOccupyResultStatisticsControll类的detail的方法
			map.put("rows",  list);
			map.put("total", 2);
			return JSONUtils.toJSONString(list.get(0));
//			return map;
			/*if (weather != null) {
				System.out.println("成功");
				return "success";
			} else {
				return "index";
			}*/
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		

	}

	@RequestMapping(method = RequestMethod.POST, value = "add")
	public void addWeather() {
		try {
			// 参数url化

			String city = java.net.URLEncoder.encode("北京", "utf-8");

			// 拼地址
			String apiUrl = String.format("http://www.sojson.com/open/api/weather/json.shtml?city=%s", city);
			// format(String format, Object... args)
			// 新字符串使用本地语言环境，制定字符串格式和参数生成格式化的新字符串。 %s 字符串类型

			// 开始请求
			URL url = new URL(apiUrl);
			URLConnection open = url.openConnection();
			InputStream input = open.getInputStream();

			// 这里转换为String，带上包名，怕你们引错包
			// IOUtils.toString将缓冲区的内容以utf-8的编码方式以字符串的形式输出
			String result = org.apache.commons.io.IOUtils.toString(input, "utf-8");

			// 输出
			// System.out.println(result);

			// 字符串转成json对象
			JSONObject a = new JSONObject(result);

			// 得到data字段的值数据并继续转换成json对象
			JSONObject b = (JSONObject) a.get("data");

			// 得到Json对象属性列表
			JSONArray c = b.getJSONArray("forecast");

			// for循环遍历得到每一天的数据
			/*
			 * for (int j = 0; j < c.length(); i++) {
			 * System.out.println(c.getJSONObject(j)); }
			 */

			// 根据key得到value并赋值给weather队友的属性
			Weather weather = new Weather();
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String dateNowStr = sdf.format(date);
			weather.setCityname(a.getString("city"));
			weather.setWtime(c.getJSONObject(0).getString("date"));
			weather.setWeather(c.getJSONObject(0).getString("type"));
			weather.setHtem(c.getJSONObject(0).getString("high"));
			weather.setLtem(c.getJSONObject(0).getString("low"));
			weather.setFeel(c.getJSONObject(0).getString("notice"));
			weather.setDate(dateNowStr);
			weatherService.addWeather(weather);
			logger.info("北京天气插入weather表成功");

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("天气插入weather表失败");
		}
	}

	@RequestMapping("get")
	public void getByName(HttpServletRequest request) {
		String cityname = request.getParameter("cityname");
		List<Weather> list = weatherService.getWeatherByCityName(cityname);
		int total = list.size();

		Wresult result = new Wresult();
		result.setRows(list);
		result.setTotal(total);
		System.out.println(result);
	}
	//按照城市名和时间查询并发短信
	@RequestMapping("takeandsend")
	public void getWeatherByNameAndDate() throws ParseException, HttpException, IOException {
		//定义查询条件的城市名和时间
		String cityname = "北京";
		Date d = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String date = sdf.format(d);
		//执行查询方法返回weather
		Weather weather = weatherService.getWeatherByNameAndDate(cityname, date);
		logger.error(weather);
		//然后执行短信发送操作
		HttpClient client = new HttpClient();
		PostMethod post = new PostMethod("http://utf8.api.smschinese.cn"); 
		post.addRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");//在头文件中设置转码
		NameValuePair[] data ={ new NameValuePair("Uid", "admin_sms"),
				new NameValuePair("Key", "41e284b9e7f1d709690c"),
				new NameValuePair("smsMob","15036502441"),
				new NameValuePair("smsText",weather+"")};
		post.setRequestBody(data);

		client.executeMethod(post);
		Header[] headers = post.getResponseHeaders();
		int statusCode = post.getStatusCode();
		System.out.println("statusCode:"+statusCode);
		for(Header h : headers)
		{
		System.out.println(h.toString());
		}
		String result = new String(post.getResponseBodyAsString().getBytes("utf8")); 
		System.out.println(result);
		logger.info(result+"短信返回值");
	}
	
	

}
