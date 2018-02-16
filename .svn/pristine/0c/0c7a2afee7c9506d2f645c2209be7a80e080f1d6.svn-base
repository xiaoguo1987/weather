package com.util;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.LoggerFactory;


public class XMLUtils {

	private static String name = StringUtils.EMPTY;
	private static String value = StringUtils.EMPTY;
	public static final Logger logger = (Logger) LoggerFactory.getLogger(XMLUtils.class);
	/**
	 * 通过配置文件获取数据源连接属性
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, String> getConnectionParamMap(){
		
		HashMap<String,String> map = new HashMap<String, String>();
		SAXReader reader = new SAXReader();
		String file = "src/test/resources/META-INF/app_config/context/context-biz.xml";
		int count = 0;
		
		try {
			Document document = reader.read(new File(file));
			Element rootElement = document.getRootElement();
			Iterator<Element> it = rootElement.elementIterator();
			while (it.hasNext()) {
				Element childElement = it.next();
				List<Attribute> attributes = childElement.attributes();
				for (Attribute attribute : attributes) {
					if ("id".equals(attribute.getName()) && "dataSource".equals(attribute.getValue())) {
						Iterator<Element> it2 = childElement.elementIterator();
						while (it2.hasNext()) {
							Element element = it2.next();
							List<Attribute> attributes2 = element.attributes();
							for (Attribute attribute2 : attributes2) {
								if ("name".equals(attribute2.getName())) {
									name = attribute2.getValue();
								}
								if ("value".equals(attribute2.getName())) {
									value = attribute2.getValue();
								}
								if (StringUtils.isNotEmpty(name) && StringUtils.isNotEmpty(value)) {
									map.put(name, value);
									name = StringUtils.EMPTY;
									value = StringUtils.EMPTY;
								}
							}
						}
						count++;
						break;
					}
				}
				if (count>0) {
					break;
				}
			}
			
		} catch (DocumentException e) {
			logger.info("获取文件【"+file+"】异常", e);
		}
		
		return map;
	}
}
