package com.service.impl;


import java.util.Date;
import java.util.List;

import javax.annotation.Resource;


import org.springframework.stereotype.Service;

import com.dao.WeatherMapper;
import com.domain.Weather;
import com.service.IWeatherService;

@Service("weatherService")
public class WeatherServiceImpl implements IWeatherService {
	
	@Resource
	private WeatherMapper weathermapper;
	
	
	@Override
	public void addWeather(Weather weather) {
			weathermapper.addWeather(weather);
	}


	@Override
	public List<Weather> getWeatherByCityName(String cityname) {
		
		return weathermapper.getWeatherByCityName(cityname);
	}


	@Override
	public Weather getWeatherByNameAndDate(String cityname, String date) {
		return weathermapper.getWeatherByNameAndDate(cityname, date);
		
	}

}
