package com.dao;


import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.domain.Weather;


public interface WeatherMapper {
	//按照城市名字查询
	public List<Weather> getWeatherByCityName(@Param("cityname") String cityName);
	//插入数据
	public void  addWeather(Weather weather);
	//按照时间和名字查询
	Weather getWeatherByNameAndDate(String cityName,String date);
}
