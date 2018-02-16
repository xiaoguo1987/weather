document.documentElement.onkeydown = function(evt)
{
	var b = !!evt, oEvent = evt || window.event;
	if (oEvent.keyCode == 8) 
	{
		var node = b ? oEvent.target : oEvent.srcElement;
		var reg = /^(input|textarea)$/i, regType = /^(text|textarea)$/i;
		if (!reg.test(node.nodeName) || !regType.test(node.type) || node.readOnly || node.disabled) 
		{
			if (b)
			{
				oEvent.stopPropagation();
			}
			else
			{
				oEvent.cancelBubble = true;
				oEvent.keyCode = 0;
				oEvent.returnValue = false;
			}
		}
	}
}



//查询时，初始化页码，将页码初始化为第一页
function comm_initPageNumber(_tableObject)
{
	_tableObject.datagrid('getPager').pagination({
		pageNumber:1
	});
}

/******************有关字符串函数 start*********************************************/

/**
 * 在String对象上添加trim方法
 */
function trim()
{
	//利用正则表达式去除头尾的空格
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
/******************有关字符串函数 end*********************************************/



/******************有关数字函数 start*********************************************/
/**
 * 对输入域是否是整数的校验
 * Example: isInteger("Minim") returns false;isInteger("123") returns true
 * @param strValue 输入数值表达式或字符串表达式
 * @return 布尔值（true--是整数, false--不是整数）
 * XinYQ rewrote on 2006-08-12
 */
function isInteger(sInteger)
{
    var RegChkExp = /^(\+?)(\-?)(\d+)$/;
    return RegChkExp.test(sInteger);
}


/**
 * 对输入域是否是数字的校验
 * Example: isNumeric("Minim") returns false;isNumeric("123.1") returns true
 * @param strValue 输入数值表达式或字符串表达式
 * @return 布尔值（true--是数字, false--不是数字）
 * XinYQ rewrote on 2006-08-12
 */
function isNumeric(sNumer)
{
    var RegChkExp = /^(\+?)(\-?)(\d+)(\.\d+)?$/;
    return RegChkExp.test(sNumer);
}

/**
 * 离开域时的数字校验
 * Example: checkNumber(HTML.Form.Object.Name)
 * @param Field HTML页面的对象名称
 * @return true或产生一个“errorMessage("请输入合法的数字")”
 */
function checkNumber(Field)
{
	var strValue=Field.value;
	
	if(strValue!="" && !isNumeric(strValue))
	{
		errorMessage("请输入合法的数字");
		Field.focus();
		Field.select();
		Field.value='';
		return false;
	}
	return true;
}

/**
* 对输入域按键时的整数校验
* <p><b>Example: </b><p>
* <p>checkInteger(window.event)<p>
* @param Event 按键盘事件
* @return 布尔值（true--按了整数键, false--按了非整数键）
*/
function checkInteger(e)
{
  var charCode=e.keyCode;
  if(charCode>=48 && charCode<=57)
  {
    return true;
  }
  return false;
}

/**
* 对输入域按键时的装订方式的校验(只允许数字和*的录入)
* <p><b>Example: </b><p>
* <p>checkBind(window.event)<p>
* @param Event 按键盘事件
* @return 布尔值（true--符合装订方式, false--不符合装订方式）
*/
function checkBind(e)
{
  var charCode=e.keyCode;
  if(charCode>=48 && charCode<=57 || charCode==42)
  {
    return true;
  }
  return false;
}

/**
* 对输入域按键时的数字校验
* <p><b>Example: </b><p>
* <p>checkNumeric(window.event)<p>
* @param Event 按键盘事件
* @return 布尔值（true--按了数字键, false--按了非数字键）
*/
function checkNumeric(e)
{

  var charCode=e.keyCode;
	if(charCode>31 && (charCode<48 || charCode>57) && charCode!=46)
	{
	return false;
	}
	return true;
}
/**
*判断对象值是否为空
*/
function isEmpty(obj)
{
	if(obj.value == null || obj.value == "")
		return true;
	else
		return false;
}
/******************有关数字函数 end*********************************************/



/******************有关日期函数 start*********************************************/

/*将日期格式化yyyy-MM-dd
 * 
 * */
function formartDateToString(date)
{
	var tempDate=new Date(date);
	var y = tempDate.getFullYear(); 
	var m = tempDate.getMonth() + 1; 
	var d = tempDate.getDate(); 
	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);

}

/**
* 检查年
* <p><b>Example: </b><p>
* <p>checkYear(HTML.Form.Object.Name)<p>
* @param Field HTML页面的对象名称
* @return 产生一个“errorMessage("年份应为4位数字")”
*/
function checkYear(Field)
{
	var strValue=Field.value;
	if(trim(strValue)!="" && !(isInteger(strValue) && strValue.length==4 ) )
	{
	  errorMessage("年份应为4位数字");
		Field.focus();
		Field.select();
	}

}

/**
* 检查月
* <p><b>Example: </b><p>
* <p>checkMonth(HTML.Form.Object.Name)<p>
* @param Field HTML页面的对象名称
* @return 产生一个“errorMessage("月份应为1-12之间的数字")”
*/
function checkMonth(Field)

{
	var strValue=Field.value;
	if(trim(strValue)!="" && !(isInteger(strValue) && eval(strValue)>0 && eval(strValue)<13 ) )
	{
	  errorMessage("月份应为1-12之间的数字");
		Field.focus();
		Field.select();
	}
}

/**
* 检查日
* <p><b>Example: </b><p>
* <p>checkDay(HTML.Form.Object.Name)<p>
* @param Field HTML页面的对象名称
* @return 产生一个“errorMessage("日期应为1-31之间的数字")”
*/
function checkDay(Field)
{
	var strValue=Field.value;
	if(trim(strValue)!="" && !(isInteger(strValue) && eval(strValue)>0 && eval(strValue)<32 ) )
	{
	  errorMessage("日期应为1-31之间的数字");
		Field.focus();
		Field.select();
	}
}

/**
* 检查小时
* <p><b>Example: </b><p>
* <p>checkHour(HTML.Form.Object.Name)<p>
* @param Field HTML页面的对象名称
* @return 产生一个“errorMessage("小时应为0-24之间的数字")”
*/
function checkHour(Field)
{
	var strValue=Field.value;
	if(trim(strValue)!="" && !(isInteger(strValue) && eval(strValue)>=0 && eval(strValue)<=24 ) )
	{
		errorMessage("小时应为0-24之间的数字");
		Field.focus();
		Field.select();
	}
}

/**
* 日期的合法判断
* <p><b>Example: </b><p>
* <p>isLegalDate("2002", "10", "03") returns true<p>
* <p>isLegalDate("Minim", "10", "03") returns false<p>
* @param year 年份字符串
* @param month 月份字符串
* @param day 日期字符串
* @return 布尔值（true--合法日期, false--非法日期）
*/
function isLegalDate(y,m,d)
{
  if(isNaN(parseInt(y,10)) || isNaN(parseInt(m,10)) || isNaN(parseInt(d,10)) )
    return false;
  var dt = new Date(parseInt(y,10),parseInt(m,10)-1,parseInt(d,10));
  if( dt.getYear()==parseInt(y,10) &&
      dt.getMonth()==parseInt(m,10)-1 &&
      dt.getDate()==parseInt(d,10)
    )
    return true;
  else
    return false;
}

/**
* 对输入域是否是日期的校验
* <p><b>Example: </b><p>
* <p>isDate("2002-10-03") returns true<p>
* <p>isDate("2002/10/03") returns false<p>
* @param date 日期字符串,格式必须为“yyyy-mm-dd”
* @return 布尔值（true--合法日期, false--非法日期）
*/
function isDate(sDate)
{
  if(!sDate.match(/^\d{4}\-\d\d?\-\d\d?$/)){return   false;}
  var arr = sDate.replace(/\-0/g,"-").split("-");
  arr=new Array(parseInt(arr[0]),parseInt(arr[1])-1,parseInt(arr[2]));
  var tDate=new Date(arr[0],arr[1],arr[2]);
  return tDate.getFullYear()==arr[0] && tDate.getMonth()==arr[1] && tDate.getDate()==arr[2];
}

/**
 * 比较两个日期字符串
 * Example: compareDate("2002-10-03", "2002-10-03") returns 0;compareDate("2002-10-03", "2001-10-03") returns 1
 * @param date1 日期字符串,格式必须为“yyyy-mm-dd”
 * @param date2 日期字符串,格式必须为“yyyy-mm-dd”
 * @return date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回2
 */
function compareDate(date1,date2){
    var strValue=date1.split("-");
    var date1Temp=new Date(strValue[0],strValue[1]-1,strValue[2]);
    strValue=date2.split("-");
    var date2Temp=new Date(strValue[0],strValue[1]-1,strValue[2]); //lanjun 2007/2/1 js中的月为0~11
    if(date1Temp.getTime()==date2Temp.getTime()){
        return 0;
    }else if(date1Temp.getTime()>date2Temp.getTime()){
        return 1;
    }else{
        return 2;
    }
}
/**
* 计算两个日期的差,返回差的月数(M)或天数(D) (其中天数除2.29这一天)
* <p><b>Example: </b><p>
* <p>dateDiff("2002-10-1", "2002-10-3", "D") returns "2"<p>
* <p>dateDiff("2002-1-1", "2002-10-3", "M") returns "9"<p>
* @param dateStart 减日期
* @param dateEnd 被减日期
* @param MD 标记，“M”为要求返回差的月数；“D”为要求返回差的天数
* @return 返回两个日期差的月数(M)或天数(D)
*/
function dateDiff(dateStart,dateEnd,MD)
{
  if(dateStart==""||dateEnd=="")
  {
  	return false;
  }
  if (typeof(dateStart) == "string") {
    dateStart = getDate(dateStart);
  }

  if (typeof(dateEnd) == "string") {
    dateEnd = getDate(dateEnd);
  }

  var i;
  if(MD=="D") //按天计算差
  {
/*
    var endD = dateEnd.getDate();
    var endM = dateEnd.getMonth();
    var endY = dateEnd.getFullYear();
    var startD = dateStart.getDate();
    var startM = dateStart.getMonth();
    var startY = dateStart.getFullYear();
    var startT=new Date(startY,startM-1,startD);
    var endT=new Date(endY,endM-1,endD);
    var startT=new Date(startY,startM,startD);
    var endT=new Date(endY,endM,endD);
    var diffDay=(endT.valueOf()-startT.valueOf())/86400000;
*/
		//Yangyl 由于修改getDate,需同步修改该函数
		var diffDay=(dateEnd.valueOf()-dateStart.valueOf())/86400000;
    return diffDay;
  }
  else //按月计算差
  {
    var endD = dateEnd.getDate();
    var endM = dateEnd.getMonth();
    var endY = dateEnd.getFullYear();
    var startD = dateStart.getDate();
    var startM = dateStart.getMonth();
    var startY = dateStart.getFullYear();
    
    if(endD>=startD)
    {  
      return (endY-startY)*12 + (endM-startM)+1;
    }
    else
    {
      return (endY-startY)*12 + (endM-startM);
    }
  }
}

/**
* 对输入域是否是日期的校验(日期格式xxxx/xx/xx)，建议修改，与isDate函数合并
* <p><b>Example: </b><p>
* <p>isDateI("2004/10/4") returns true<p>
* <p>isDateI("2004-10-4") returns false<p>
* @param date 格式必须为“YYYY/MM/DD”的日期字符串
* @return 布尔值（true--合法日期, false--非法日期）
*/
function isDateI(date)
{
  var strValue;
  strValue=date.split("/");

  if(strValue.length!=3) return false;
  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;

  var intYear=eval(strValue[0]);
  var intMonth=eval(strValue[1]);
  var intDay=eval(strValue[2]);

  if( intYear<0 || intYear>9999 || intMonth<0 || intMonth>12 || intDay<0 || intDay>31 ) return false;
  return true;
}

/**
* 对输入域是否是日期的校验(日期格式xxxxxxxx)，建议修改，与isDate函数合并
* <p><b>Example: </b><p>
* <p>isDateI("2004104") returns true<p>
* <p>Other returns false<p>
*/
function isDateN(date)
{
  var strValue;
  strValue=new Array();
  strValue[0]=date.substring(0, 4);
  strValue[1]=date.substring(4, 6);
  strValue[2]=date.substring(6, 8);
  if(strValue.length!=3) return false;
  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;

  var intYear=eval(strValue[0]);
  var intMonth=eval(strValue[1]);
  var intDay=eval(strValue[2]);

  if( intYear<0 || intYear>9999 || intMonth<0 || intMonth>12 || intDay<0 || intDay>31 ) return false;
  return true;
}

/**
* 比较两个日期字符串(日期格式xxxx/xx/xx)
* <p><b>Example: </b><p>
* <p>compareDateI("2002/10/03", "2002/10/03") returns 0<p>
* <p>compareDateI("2002/10/03", "2001/10/03") returns 1<p>
* @param date1 日期字符串,格式必须为“yyyy/mm/dd”
* @param date2 日期字符串,格式必须为“yyyy/mm/dd”
* @return date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回2
*/
function compareDateI(date1,date2){
    var strValue=date1.split("/");
    var date1Temp=new Date(strValue[0],strValue[1]-1,strValue[2]);
    strValue=date2.split("/");
    var date2Temp=new Date(strValue[0],strValue[1]-1,strValue[2]); //lanjun 2007/2/1 js中的月为0~11
    if(date1Temp.getTime()==date2Temp.getTime()){
        return 0;
    }else if(date1Temp.getTime()>date2Temp.getTime()){
        return 1;
    }else{
        return 2;
    }
}


/**
*得到当前的系统日期
*splitOp 为分割符，Example：
*splitOp='-' 则日期格式为 年-月-日
*splitOp='/' 则日期格式为 年/月/日
*splitOp='A' 则日期格式为 ****年**月**日 星期*
*splitOp='M' 则日期格式为 ****年**月
*splitOp如果为空，则默认是：'-'
*/
function getCurrentDate(splitOp)
{
	if(splitOp==null || splitOp=='' || splitOp=='undefined' ){
		splitOp='-';
	}
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
	var hours=now.getHours();
	var minutes=now.getMinutes();
	var seconds=now.getSeconds();
	
	if(splitOp=='-' || splitOp=='/'){
		var date = year+splitOp+formatString(month)+splitOp+formatString(day);
		return date;		
	}
	
	if(splitOp=='A'){
		var WeekFormat = ['日','一','二','三','四','五','六']; 	
		var week = '星期' + WeekFormat[now.getDay()]; 
		var date = year+'年'+formatString(month)+'月'+formatString(day) +'日&nbsp;'+week;
		return date;		
	}
	if(splitOp=='M'){
		var date = year+'年'+formatString(month)+'月';
		return date;		
	}	
}

/**
*得到当前的系统日期的前一天
*splitOp 为分割符，Example：
*splitOp='-' 则日期格式为 年-月-日
*splitOp='/' 则日期格式为 年/月/日
*splitOp='A' 则日期格式为 ****年**月**日 星期*
*splitOp如果为空，则默认是：'-'
*/
function getYesterday(splitOp){
	if(splitOp==null || splitOp=='' || splitOp=='undefined' ){
		splitOp='-';
	}
	var now=new Date();
	now.setTime(now.getTime()-24*60*60*1000);
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
	var hours=now.getHours();
	var minutes=now.getMinutes();
	var seconds=now.getSeconds();
	
	if(splitOp=='-' || splitOp=='/'){
		var date = year+splitOp+formatString(month)+splitOp+formatString(day);
		return date;		
	}
	
	if(splitOp=='A'){
		var WeekFormat = ['日','一','二','三','四','五','六']; 	
		var week = '星期' + WeekFormat[now.getDay()]; 
		var date = year+'年'+formatString(month)+'月'+formatString(day) +'日&nbsp;'+week;
		return date;		
	}	
}

/**
*得到当前的系统日期的前num天的字符串
*/
function getLastDay(num){
	if(num==null || num=='' || num=='undefined' ){
		return '';
	}
	var now=new Date();
	var str = "[";
	now.setTime(now.getTime() - num*24*60*60*1000);
	for(i=1;i<=num;i++){
		now.setTime(now.getTime() + 24*60*60*1000);
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var day=now.getDate();		
		str = str + "'"+formatString(month)+'月'+formatString(day) +'日'+"',";
	}
	str = str +"]"
	return str ;
}


function formatString(str)
{
	if(str != null && parseInt(str)< 10)
	{
		str = '0'+str;
	}
	
	return str;
}

/**
* 对输入域是否是满足查询格式的日期的校验(日期格式xxxx/xx/xx)
* <p><b>Example: </b><p>
* <p>isQueryDate(":", "2002/10/03:2002/10/04") returns true<p>
* <p>isQueryDate("", "2001/10/03") returns true<p>
* @param sign 日期区间和单一日期的判断标志,区间内日期不能相等
* @param date 包含日期内容的字符串
* @return 布尔值（true--合法日期, false--非法日期）
*/
function isQueryDate(sign,date)
{
  var strValue;

  //区间的判断
  if (sign==":")
  {
  	strValue=date.split(":");
  	if (strValue.length!=2) return false;
  	if (!isDateI(strValue[0])) return false;
  	if (!isDateI(strValue[1])) return false;
  	if (compareDateI(strValue[0],strValue[1])==1) return false;

	}
	//单一日期的判断
	else
	{
		return isDateI(date);
	}
  return true;
}



/******************有关日期函数 end*********************************************/



/**
* 清空界面上的所有输入栏
* <p><b>Example: </b><p>
* <p>EmptyFormElements()<p>
*/
function emptyFormElements() {
  var formsNum = 0;          //窗口中的FORM数
  var elementsNum = 0;       //FORM中的元素数

  //遍历所有FORM
  for (formsNum=0; formsNum<window.document.forms.length; formsNum++) {
    //遍历FORM中的所有ELEMENT
    for (elementsNum=0; elementsNum<window.document.forms[formsNum].elements.length; elementsNum++) {
  	  if (window.document.forms[formsNum].elements[elementsNum].type == "text") {
  	    window.document.forms[formsNum].elements[elementsNum].value = "";
  	  }
  	}
  }
}

/**
* 以年龄和性别校验身份证号的函数
* 参数，输入的证件号码，出生日期，性别
* 返回  布尔值
*/
function chkIdNo(iIdNo, iBirthday ,iSex)
{
  var tmpStr="";
  var idDate="";
  var tmpInt=0;
  var strReturn = "";

  iIdNo = trim(iIdNo);
  iBirthday = trim(iBirthday);
  iSex = trim(iSex);

  if ((iIdNo.length!=15) && (iIdNo.length!=18))
  {
    strReturn = "输入的身份证号位数错误";
    return strReturn;
  }

  if (!(isDate(iBirthday)))
  {
  	strReturn = "输入的日期格式错误";
    return strReturn;
  }

  //转换日期格式到yy－mm－dd，by Minim
  var arrDate = iBirthday.split("-");
  if (arrDate[1].length == 1) arrDate[1] = "0" + arrDate[1];
  if (arrDate[2].length == 1) arrDate[2] = "0" + arrDate[2];
  iBirthday = arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2];

  if (iSex!="0" && iSex!="1")
  {
  	strReturn = "输入的性别不明确";
    return strReturn;
  }

  if (iIdNo.length==15)
  {
    tmpStr=iIdNo.substring(6,12);
    tmpStr= "19" + tmpStr;
    tmpStr= tmpStr.substring(0,4) + "-" + tmpStr.substring(4,6) + "-" + tmpStr.substring(6)

    if ( iBirthday == tmpStr )
    {
      if (iSex=="0")
      {
      	tmpInt = parseInt(iIdNo.substring(14));
      	tmpInt = tmpInt % 2
      	if (tmpInt==0)
      	{
      	  strReturn = "输入的性别与身份证号的信息不一致";
          return strReturn;
      	}
      }
      else
      {
      	tmpInt = parseInt(iIdNo.substring(14));
      	tmpInt = tmpInt % 2
      	if (tmpInt!=0)
      	{
      	  strReturn = "输入的性别与身份证号的信息不一致";
          return strReturn;
      	}
      }
    }
    else
    {
      strReturn = "输入的生日与身份证号的信息不一致";
      return strReturn;
    }

    return strReturn;
  }

  if (iIdNo.length==18)
  {
  	tmpStr=iIdNo.substring(6,14);
  	tmpStr= tmpStr.substring(0,4) + "-" + tmpStr.substring(4,6) + "-" + tmpStr.substring(6)

    if ( iBirthday == tmpStr )
    {
      if (iSex=="0")
      {
      	tmpInt = parseInt(iIdNo.substring(16,17));
      	tmpInt = tmpInt % 2
      	if (tmpInt==0)
      	{
      	  strReturn = "输入的性别与身份证号的信息不一致";
          return strReturn;
      	}
      }
      else
      {
      	tmpInt = parseInt(iIdNo.substring(16,17));
      	tmpInt = tmpInt % 2
      	if (tmpInt!=0)
      	{
      	  strReturn = "输入的性别与身份证号的信息不一致";
          return strReturn;
      	}
      }
    }
    else
    {
      strReturn = "输入的生日与身份证号的信息不一致";
      return strReturn;
    }

    return strReturn;
  }
}


/**
 * 严格校验身份证号码
 * 兰军 2005-7-2 17:05
 * 公民身份号码是特征组合码，
 * 由十七位数字本体码和一位数字校验码组成。
 * 排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，
 * 三位数字顺序码和一位数字校验码。顺序码的奇数分给男性，偶数分给女性。
 * 校验码是根据前面十七位数字码，按照ISO7064:1983.MOD11-2校验码计算出来的检验码。
 */
function checkIdCard(idCard)
{
	var SystemDate=new Date();
	var year=SystemDate.getFullYear();
	var month=SystemDate.getMonth()+1;
	var day=SystemDate.getDate();
	var yyyy; //年
	var mm; //月
	var dd; //日
	var birthday; //生日
	var sex; //性别
	var id=idCard;
	var id_length=id.length;
	if (id_length==0)
	{
		alert("请输入身份证号码!");
		return false;
	}
	if (id_length!=15 && id_length!=18)
	{
		alert("身份证号长度应为15位或18位！");
		return false;
	}
	if (id_length==15)
	{
		for(var i =0 ;i<id_length;i++)
		{
			if(isNaN(idCard.charAt(i)))
			{
				alert("15位身份证号中不能有字符！");
				return false;
			}
		}
		yyyy="19"+id.substring(6,8);
		mm=id.substring(8,10);
		dd=id.substring(10,12);
		if (mm>12 || mm<=0)
		{
			alert("身份证号月份非法！");
			return false;
		}
		if (dd>31 || dd<=0)
		{
			alert("身份证号日期非法！");
			return false;
		}
		//4,6,9,11月份日期不能超过30
		if((mm==4||mm==6||mm==9||mm==11)&&(dd>30))
		{
			alert("身份证号日期非法！");
			return false;
		}
		//判断2月份
		if(mm==2)
		{
			if(LeapYear(yyyy))
			{
				if(dd>29)
				{
					alert("身份证号日期非法！");
					return false;
				}
			}
			else
			{
				if(dd>28)
				{
					alert("身份证号日期非法！");
					return false;
				}
			}
		}
	}
	else
	{
		for(var i =0 ;i<id_length-1;i++)
		{
			if(isNaN(idCard.charAt(i)))
			{
				alert("身份证号中前17位中不能有字符！");
				return false;
			}
		}
		if(isNaN(idCard.charAt(17))&& idCard.charAt(17) !="X" && idCard.charAt(17) !="x" )
		{
			alert("身份证校验错误，请认真检查！");
			return false;
		}
		if (idCard.indexOf("X") > 0 && idCard.indexOf("X")!=17 || idCard.indexOf("x")>0 && idCard.indexOf("x")!=17)
		{
			alert("身份证中\"X\"输入位置不正确！");
			return false;
		}
		yyyy=id.substring(6,10);
		if (yyyy>year || yyyy<1900)
		{
			alert("身份证号年度非法！");
			return false;
		}
		mm=id.substring(10,12);
		if (mm>12 || mm<=0)
		{
			alert("身份证号月份非法！");
			return false;
		}
		if(yyyy==year&&mm>month)
		{
			alert("身份证号月份非法！");
			return false;
		}
		dd=id.substring(12,14);
		if (dd>31 || dd<=0)
		{
			alert("身份证号日期非法！");
			return false;
		}
		//4,6,9,11月份日期不能超过30
		if((mm==4||mm==6||mm==9||mm==11)&&(dd>30))
		{
			alert("身份证号日期非法！");
			return false;
		}
		//判断2月份
		if(mm==2)
		{
			if(LeapYear(yyyy))
			{
				if(dd>29)
				{
					alert("身份证号日期非法！");
					return false;

				}
			}
			else

			{
				if(dd>28)
				{
					alert("身份证号日期非法！");
					return false;
				}
			}
		}
		if(yyyy==year&&mm==month&&dd>day)
		{
			alert("身份证号日期非法！");
			return false;
		}
		if (id.charAt(17)=="x" || id.charAt(17)=="X")
		{
			if ("x"!=GetVerifyBit(id) && "X"!=GetVerifyBit(id))
			{
				alert("身份证校验错误，请认真检查！");
				return false;
			}
		}
		else
		{
			if (id.charAt(17)!=GetVerifyBit(id))
			{
				alert("身份证校验错误，请认真检查！");
				return false;
			}
		}
	}
	return true;
}

/*****************common start******************************/
//判断是否为null或空
function isNulOrEmpty(prop) {
	if (prop == null || trim(prop) == "")
		return true;
	else 
		return false;
}

//删除输入框前后空格
function trim(str){ 
	str=str+"";
    return str.replace(/(^\s*)|(\s*$)/g,"");
}

function returnFalse(){
	return false;
}

function json2str(o) { 
var arr = []; 
var fmt = function(s) { 
if (typeof s == 'object' && s != null) return json2str(s); 
return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
} 
for (var i in o) arr.push("'" + i + "':" + fmt(o[i])); 
return '{' + arr.join(',') + '}'; 
}

//存入cookie
function setCookie(key,value){ 
		var cookieString=key+"="+value;  
		document.cookie=cookieString; 
} 
//取出cookie	
function getCookie(key){ 
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split(";"); 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		if(arr[0]==key)return arr[1];
	} 
	return ""; 
} 
/*****************common end******************************/
