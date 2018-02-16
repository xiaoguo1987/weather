package com.domain;

import java.sql.Timestamp;

public class StateFile {

	private int id;
	private String path;//文件的保存路径
	private String state = "0";//文件首次插入的状态
	private Timestamp createt;//文件的创建时间
	private Timestamp startt;//文件的执行开始时间
	private Timestamp endt;//文件的执行结束时间
	private Timestamp lastupdatet;//文件的最后更新时间
	public Timestamp getCreatet() {
		return createt;
	}
	public void setCreatet(Timestamp createt) {
		this.createt = createt;
	}
	public Timestamp getStartt() {
		return startt;
	}
	public void setStartt(Timestamp startt) {
		this.startt = startt;
	}
	public Timestamp getEndt() {
		return endt;
	}
	public void setEndt(Timestamp endt) {
		this.endt = endt;
	}
	public Timestamp getLastupdatet() {
		return lastupdatet;
	}
	public void setLastupdatet(Timestamp lastupdatet) {
		this.lastupdatet = lastupdatet;
	}
	
	@Override
	public String toString() {
		return "StateFile [id=" + id + ", path=" + path + ", state=" + state + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public StateFile() {
		super();
		// TODO Auto-generated constructor stub
	}
}
