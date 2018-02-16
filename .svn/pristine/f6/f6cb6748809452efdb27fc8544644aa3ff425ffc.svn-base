package com.service;


import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.domain.Weather;


public interface IWeatherService {
		
		
	 //按照城市名字查询
	 List<Weather> getWeatherByCityName(String cityname);
	 
	 //插入数据
	 void addWeather(Weather weather);
	 
	 //按照时间和名字查询
	 Weather getWeatherByNameAndDate(String cityname,String date);
}
