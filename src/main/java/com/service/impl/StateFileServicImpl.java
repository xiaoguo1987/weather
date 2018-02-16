package com.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.StateFileMapper;
import com.domain.StateFile;
import com.service.StateFileService;
@Service("stateFileService")
public class StateFileServicImpl implements StateFileService {
	@Resource
	private StateFileMapper statefilemapper;
	@Override
	public void addStateFile(StateFile statefile) {
		statefilemapper.addStateFile(statefile);

	}
	@Override
	public List<StateFile> getStateFileByState(String state) {
		
		return statefilemapper.getStateFileByState(state);
	}
	@Override
	public void updateStateFile(StateFile statefile) {
		
		statefilemapper.updateStateFile(statefile);
	}
	

}
