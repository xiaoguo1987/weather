package com.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.domain.StateFile;
import com.domain.Weather;
import com.service.IWeatherService;
import com.service.StateFileService;

@Controller
public class StateFileController {
	// 相关日志操作
	private static Logger logger = Logger.getLogger(StateFileController.class);
	// 引入相关的service
	@Resource(name = "stateFileService")
	private StateFileService statefileservice;
	// 读取excal文件里面的天气并导入数据库的weatherservice
	@Resource(name = "weatherService")
	private IWeatherService weatherService;
	String excelpath = "D:\\filedata\\excel";
	String txtpath = "D:\\filedata\\txt";
	String linuxexcelpath = "/usr/files/weatherfile/excel";
	String linuxtxtpath = "/usr/files/weatherfile/txt";
	String realpath;

	@RequestMapping("addFile")
	@ResponseBody
	public String addFile(@RequestParam("files") MultipartFile[] files, HttpServletRequest request) {
		try {
			logger.info("--------开始导入文件----------");
			logger.info("--------svn提交历史记录测试----------");
			request.setCharacterEncoding("UTF-8");

			// 判断file数组不能为空并且长度大于0
			if (files != null && files.length > 0) {
				// 循环获取file数组中得文件
				for (int i = 0; i < files.length; i++) {
					MultipartFile file = files[i];
					System.out.println(files.length + "---");
					// 得到文件的保存路径 将上传的文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全
					String path = request.getSession().getServletContext().getRealPath("/WEB-INF/upload");

					// 得到文件的名字
					String filename = file.getOriginalFilename();// System.out.println(filename);
					//文件名字格式转为utf-8
					String fileName = new String(filename.getBytes(), "UTF-8");
					// 获得文件格式
					String fileExtName = fileName.substring(fileName.lastIndexOf(".") + 1);
					logger.info("上传的文件的扩展名是：" + fileExtName);
					if (fileExtName.equals("txt")) {
						File dir = new File(linuxtxtpath, filename);
						if (!dir.exists()) {
							dir.mkdirs();
							logger.warn("文件不存在创建");
						}
						realpath = dir.getAbsolutePath();
						System.out.println(realpath);
						// MultipartFile自带的解析方法
						file.transferTo(dir);
						logger.info("文件上传并复制到指定位置了");
						StateFile statefile = new StateFile();
						statefile.setPath(realpath);
						System.out.println(statefile);
						logger.info("准备添加文件到数据库statefile");
						statefileservice.addStateFile(statefile);
						logger.info("添加文件到数据库statefile完成");
						// statefileservice.updateStateFile(statefile);

					} else if (fileExtName.equals("xlsx")) {
						File direxcal = new File(linuxexcelpath, filename);
						if (!direxcal.exists()) {
							direxcal.mkdirs();
							logger.warn("文件不存在创建");
						}
						// MultipartFile自带的解析方法
						// 真正的地址
						realpath = direxcal.getAbsolutePath();
						System.out.println(realpath);
						file.transferTo(direxcal);
						StateFile statefile = new StateFile();
						statefile.setPath(realpath);
						statefileservice.addStateFile(statefile);
						// sstatefileservice.updateStateFile(statefile);
					}
				}
			}
			return "success";
		} catch (Exception e) {
			logger.error("添加文件到数据库statefile失败");
			return "error";
		}

	}

	// 定时任务跑的写入数据库的方法

	public void stateFiletime() throws InterruptedException {
		// 根据state查找为0的文件并返回其路径
		// 定义路径变量获得其后缀名
		logger.info("开始");
		String Suffixpath;
		List<StateFile> list = statefileservice.getStateFileByState("0");
		logger.info("get0没问题");
		for (int i = 0; i < list.size(); i++) {
			StateFile statefile = list.get(i);
			logger.info("path" + statefile.getPath());
			// 修改原来为0的状态为1并重新导入数据库表示正在进行
			statefile.setState("1");
			logger.info("准备 statefile表状态0变1");
			statefileservice.updateStateFile(statefile);
			System.out.println("完成状态0变1");
			String path = statefile.getPath();
			// 获得后缀名
			Suffixpath = path.substring(path.lastIndexOf(".") + 1);
			// 如果后缀是xls或者xlsx则执行excalUtil解析方法
			if (Suffixpath.equals("xlsx")) {
				List<Weather> wexcallist = excalUtil(path, statefile.getId());
				logger.info("准备 将状态为1的excel文件数据添加weather数据库");
				for (int j = 0; j < wexcallist.size(); j++) {
					// 将weatherlist中的weather添加进数据库
					weatherService.addWeather(wexcallist.get(j));
				}
				logger.info("完成 将状态为1的excel文件数据添加weather数据库");

				// 执行玩添加文件后修改其状态为2表示完成
				statefile.setState("2");
				logger.info("准备 将状态为2的文件数据添加weather数据库");
				statefileservice.updateStateFile(statefile);
				logger.info("完成 将状态为2的文件数据添加weather数据库");
			} else if (Suffixpath.equals("txt")) {
				List<Weather> wtxtlist = txtUtil(path, statefile.getId());
				logger.info("准备 将状态为1的txt文件数据添加weather数据库");
				for (int j = 0; j < wtxtlist.size(); j++) {
					weatherService.addWeather(wtxtlist.get(j));
				}
				logger.info("完成 将状态为1的txt文件数据添加weather数据库");
				logger.info("准备 将状态为2的txt文件数据添加weather数据库");
				statefile.setState("2");
				statefileservice.updateStateFile(statefile);
				logger.info("完成 将状态为2的txt文件数据添加weather数据库");
			}
		}
	}

	public List<Weather> excalUtil(String path, int taskid) {
		// 创建对工作簿的引用

		XSSFWorkbook workbook;
		// 创建返回值list集合
		List<Weather> list = new ArrayList<>();
		try {
			workbook = new XSSFWorkbook(new FileInputStream(path));
			// 在excel中对第一张工作表的缺省索引是0
			XSSFSheet sheet = workbook.getSheetAt(0);
			// XSSFSheet sheet = workbook.getSheet("Sheet1");
			// 获取Excel文件的行数
			int rows = sheet.getPhysicalNumberOfRows();
			// 遍历行 第一行标题略过
			for (int i = 1; i < rows; i++) {
				// 创建Weather对象
				Weather weather = new Weather();
				XSSFRow row = sheet.getRow(i);
				if (row != null) {
					// 获得所有的列数
					int cells = row.getPhysicalNumberOfCells();
					// 遍历列 第一列id 去掉
					for (int j = 0; j < cells; j++) {
						XSSFCell cell = row.getCell(j);
						if (cell != null) {
							if (j == 0) {// 第一列不读
							} else if (j == 1) {
								weather.setCityname(cell.getStringCellValue());// 城市名
							} else if (j == 2) {
								row.getCell(j).setCellType(Cell.CELL_TYPE_STRING);
								weather.setWeather(cell.getStringCellValue());// 天气类型
							} else if (j == 3) {
								row.getCell(j).setCellType(Cell.CELL_TYPE_STRING);
								weather.setHtem(cell.getStringCellValue());// 高温
							} else if (j == 4) {
								row.getCell(j).setCellType(Cell.CELL_TYPE_STRING);
								weather.setLtem(cell.getStringCellValue());// 低温
							} else if (j == 5) {
								row.getCell(j).setCellType(Cell.CELL_TYPE_STRING);
								weather.setFeel(cell.getStringCellValue());// 舒适度
							}
						}
						weather.setTaskid(taskid);
					}
				}
				list.add(weather);
			}

		} catch (FileNotFoundException e) {
			logger.error("文件异常");
			e.printStackTrace();
			;
		} catch (IOException e) {
			logger.error("IO异常");
			e.printStackTrace();
		}
		return list;
	}

	public List<Weather> txtUtil(String path, int taskid) {
		// 定义需要返回的集合 接受weather
		List<Weather> list = new ArrayList<>();
		try {
			// 构造一个BufferedReader类来读取文件
			InputStreamReader read = new InputStreamReader(new FileInputStream(new File(path)));
			System.out.println(read.getEncoding());
			BufferedReader br = new BufferedReader(new FileReader(new File(path)));
			String line = "";
			line = br.readLine();
			// 跳过第一行
			line = br.readLine();
			while (line != null) {
				// 定义weather用来保存数据
				Weather weather = new Weather();
				// 按照空格分开 1 String的split方法支持正则表达式；
				// 2 正则表达式\s表示匹配任何空白字符，+表示匹配一次或多次。
				String[] str = line.split(",");
				weather.setCityname(str[1]);
				weather.setWeather(str[2]);
				weather.setHtem(str[3]);
				weather.setLtem(str[4]);
				weather.setFeel(str[5]);
				weather.setTaskid(taskid);
				list.add(weather);
				line = br.readLine(); // 一次读入一行数据
			}
			read.close();
			br.close();
		} catch (FileNotFoundException e) {
			logger.error("文件异常");
			e.printStackTrace();
		} catch (IOException e) {
			logger.error("IO异常");
			e.printStackTrace();
		}
		return list;
	}
}
