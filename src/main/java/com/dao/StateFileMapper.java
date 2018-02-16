package com.dao;

import java.util.List;

import com.domain.StateFile;

public interface StateFileMapper {
	public void addStateFile(StateFile statefile);//添加文件到数据库
	public List<StateFile> getStateFileByState(String state);//按照state查找
	public void updateStateFile(StateFile statefile);
}
