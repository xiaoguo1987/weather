package com.domain;

import java.util.List;

public class Wresult {
	private int total;
	private List<?> rows;
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public List<?> getRows() {
		return rows;
	}
	public void setRows(List<?> rows) {
		this.rows = rows;
	}
	@Override
	public String toString() {
		return "Wresult [total=" + total + ", rows=" + rows + "]";
	}
	
	
}
