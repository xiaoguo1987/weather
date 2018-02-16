/// <reference path="utils.js" />
/**
* 模块名：共通脚本
* 程序名: 通用方法common.js
* Copyright(c) 2014-2015 qlan
**/
var bsc = {};

//设置根目录完整地址
bsc.settings = {
    basePath:basePath()
};

//获取项目根目录完整地址
function basePath(){
		var curWwwPath=window.document.location.href;
		var pathName=window.document.location.pathname;
		var pos=curWwwPath.indexOf(pathName);
		var localhostPath=curWwwPath.substring(0,pos);
		var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		return (localhostPath+projectName);
};

var com = {};
com.vm = {};
//格式化时间
com.formatDate = function(value) {
    return utils.formatDate(value, 'yyyy-MM-dd');
};
com.formatDateString = function(value) {
    return utils.formatDate(value, 'yyyyMMdd');
};

com.formatTime = function (value) {
    return utils.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
};


//格式化金额
com.formatMoney = function (value) {
    var sign = value < 0 ? '-' : '';
    return sign + utils.formatNumber(Math.abs(value), '#,##0.00');
};

//格式化checkbox
com.formatCheckbox = function (value) {
    var checked = (value || 'false').toString() == 'true';
    return utils.formatString('<img value={0} src="/Content/images/{1}"/>', checked, checked ? "checkmark.gif" : "checknomark.gif");
};

//弹messagee
com.message = function (type, message, title, callback) {
    switch (type) {
        case "success":
            if (parent == window) return alert(message);
            parent.$('#notity').jnotifyAddMessage({ text: message, permanent: false });
            break;
        case "error":
            if (parent == window) return alert(message);
            parent.$.messager.alert(title, message);
            break;
        case "warning":
            if (parent == window) return alert(message);
            parent.$('#notity').jnotifyAddMessage({ text: message, permanent: false, type: 'warning' });
            break;
        case "information":
            parent.$.messager.show({
                title: title,//'消息',
                msg: message
                //,showType: 'show'
            });
            break;
        case "confirm":
            return parent.$.messager.confirm(title, message, callback);
    }

    if (callback) callback();
    return null;
};

com.messageif = function (condition, type, message, callback) {
    if (condition) 
        com.message(type, message, callback);
};

com.openTab = function () {
    parent.wrapper.addTab.apply(this,arguments);
};

com.setLocationHashId = function (id) {
    var hash = parent.location.hash.split('/');
    hash[hash.length-1] = id;
    parent.location.hash = hash.join('/');
};

com.ajax = function (options) {
    options = $.extend({
        showLoading:true
    }, options);

    var ajaxDefaults = {
        type: 'POST',
        dataType: 'json',
        error: function (e) {
            var msg = e.responseText;
            var ret = msg.match(/^{\"Message\":\"(.*)\",\"ExceptionMessage\":\"(.*)\",\"ExceptionType\":.*/);
            if (ret != null) {
                msg = (ret[1] + ret[2]).replace(/\\"/g, '"').replace(/\\r\\n/g, '<br/>').replace(/dbo\./g, '');
            }
            else {
                try{msg = $(msg).text()||msg;}
                catch(ex){}
            }
           
            com.message('error', msg);
        }
    };

    if (options.showLoading) {
        ajaxDefaults.beforeSend = $.showLoading;
        ajaxDefaults.complete = $.hideLoading;
    }

    $.ajax($.extend(ajaxDefaults, options));
};

com.query = function (element) {
    var query = $;
    if ($(document).find(element).length == 0 && element!=document) {
        if ($(parent.document).find(element)) {
            query = parent.$;
        }
    }
    return query;
};

com.dialog = function (opts) {
    var query = parent.$, fnClose = opts.onClose;
    opts = query.extend({
        title: 'My Dialog',
        width: 400,
        height: 220,
        closed: false,
        cache: false,
        modal: true,
        html: '',
        url: ''
    }, opts);

    opts.onClose = function () {
        if (query.isFunction(fnClose)) fnClose();
        query(this).dialog('destroy');
    };
     
  /*  if (query.isFunction(opts.html))
        opts.html = utils.functionComment(opts.html);
    else if (/^\#.*\-template$/.test(opts.html))
        opts.html = $(opts.html).html();
 */
    var win = query('<div></div>').appendTo('body');//.html(opts.html);
    if (opts.url) 
        query.ajax({async: false,url: opts.url,success: function (d) { win.empty().html(d); }});

    win.dialog(opts);
   /* query.parser.onComplete = function () {
        if ("undefined" === typeof ko)
            opts.viewModel(win);
        else
            ko.applyBindings(new opts.viewModel(win), win[0]);

        query.parser.onComplete = query.noop;
    };*/
    //query.parser.parse(win);
    return win;
};


function btnAccessControl(reqMenuId) {
	alert(reqMenuId);
	$.post('/menu/btnAccess', {
		reqMenuId : reqMenuId
	}, function(data) {
		if (data.result == 'true' || data.result == true) {
			// 控制按钮能否点击
		} else {
			// 取得按钮控制信息出错
		}
	});
}

function btnCheck (url,toolbar) {
	$.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        success: function (data) {
            if(data.result == 'true' || data.result == true) {
            	for (i=0; i<toolbar.length; i++) {
                    if (toolbar[i] == '-') {
                        continue;
                    } else {
                    	for (j=0;j<data.nohavedBtn.length; j++) {
                            if (toolbar[i].text == data.nohavedBtn[j]) {
                                $("#"+toolbar[i].id).linkbutton('disable');
                            }
                    	}
                    }
                }
            }
        }
      });
}

$.extend($.fn.datagrid.methods,{  
    columnMoving: function(jq){  
        return jq.each(function(){  
            var target = this;  
            var cells = $(this).datagrid('getPanel').find('div.datagrid-header td[field]');  
            cells.draggable({  
                revert:true,  
                cursor:'pointer',  
                edge:5,  
                proxy:function(source){  
                    var p = $('<div class="tree-node-proxy tree-dnd-no" style="position:absolute;border:1px solid #ff0000"/>').appendTo('body');  
                    p.html($(source).text());  
                    p.hide();  
                    return p;  
                },  
                onBeforeDrag:function(e){  
                    e.data.startLeft = $(this).offset().left;  
                    e.data.startTop = $(this).offset().top;  
                },  
                onStartDrag: function(){  
                    $(this).draggable('proxy').css({  
                        left:-10000,  
                        top:-10000  
                    });  
                },  
                onDrag:function(e){  
                    $(this).draggable('proxy').show().css({  
                        left:e.pageX+15,  
                        top:e.pageY+15  
                    });  
                    return false;  
                }  
            }).droppable({  
                accept:'td[field]',  
                onDragOver:function(e,source){  
                    $(source).draggable('proxy').removeClass('tree-dnd-no').addClass('tree-dnd-yes');  
                    $(this).css('border-left','1px solid #ff0000');  
                },  
                onDragLeave:function(e,source){  
                    $(source).draggable('proxy').removeClass('tree-dnd-yes').addClass('tree-dnd-no');  
                    $(this).css('border-left',0);  
                },  
                onDrop:function(e,source){  
                    $(this).css('border-left',0);  
                    var fromField = $(source).attr('field');  
                    var toField = $(this).attr('field');  
                    setTimeout(function(){  
                        swapField(fromField,toField);  
                        $(target).datagrid();  
                        $(target).datagrid('columnMoving');  
                    },0);  
                }  
            });  
              
            // swap Field to another location  
            function swapField(from,to){  
                var columns = $(target).datagrid('options').columns;  
                var cc = columns[0];  
                _swap(from,to);  
                function _swap(fromfiled,tofiled){  
                    var fromtemp;  
                    var totemp;  
                    var fromindex = 0;  
                    var toindex = 0;  
                    for(var i=0; i<cc.length; i++){  
                        if (cc[i].field == fromfiled){  
                            fromindex = i;  
                            fromtemp = cc[i];  
                        }  
                        if(cc[i].field == tofiled){  
                            toindex = i;  
                            totemp = cc[i];  
                        }  
                    }  
                    cc.splice(fromindex,1,totemp);  
                    cc.splice(toindex,1,fromtemp);  
                }  
            }  
        });  
    }  
});  


$.ajaxSetup({
	contentType:"application/x-www-form-urlencoded;charset=utf-8",
	complete:function(XMLHttpRequest,textStatus){
		var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");//通过XMLHttpRequest取得相应头
		if(sessionstatus=="timeout"){
			top.location.replace("${rootPath}/login");
			return;
		}
	}
});


/**
 * 防止panel/window/dialog组件超出浏览器边界
 * 
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	var right = l + width;
	var buttom = t + height;
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

/**
 * 扩展easyui的validator插件rules，支持更多类型验证
 */
$.extend($.fn.validatebox.defaults.rules, {
			minLength : { // 判断最小长度
				validator : function(value, param) {
					return value.length >= param[0];
				},
				message : '最少输入 {0} 个字符'
			},
			length : { // 长度
				validator : function(value, param) {
					var len = $.trim(value).length;
					return len >= param[0] && len <= param[1];
				},
				message : "输入内容长度必须介于{0}和{1}之间"
			},
			phone : {// 验证电话号码
				validator : function(value) {
					return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
				},
				message : '格式不正确,请使用下面格式:020-88888888'
			},
			mobile : {// 验证手机号码
				validator : function(value) {
					return /^(13|15|18)\d{9}$/i.test(value);
				},
				message : '手机号码格式不正确'
			},
			phoneAndMobile : {// 电话号码或手机号码
				validator : function(value) {
					return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value) || /^(13|15|18)\d{9}$/i.test(value);
				},
				message : '电话号码或手机号码格式不正确'
			},
			idcard : {// 验证身份证
				validator : function(value) {
					//return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value) || /^\d{18}(\d{2}[A-Za-z0-9])?$/i.test(value);
					return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value);
				},
				message : '输入的身份证号长度不对，或者号码不符合规定！15位号码全为数字，18位号码末位可以为数字或X'
			},
			intOrFloat : {// 验证整数或小数
				validator : function(value) {
					return /^\d+(\.\d+)?$/i.test(value);
				},
				message : '请输入数字，并确保格式正确'
			},
			currency : {// 验证货币
				validator : function(value) {
					return /^\d+(\.\d+)?$/i.test(value);
				},
				message : '货币格式不正确'
			},
			qq : {// 验证QQ,从10000开始
				validator : function(value) {
					return /^[1-9]\d{4,9}$/i.test(value);
				},
				message : 'QQ号码格式不正确'
			},
			integer : {// 验证整数
				validator : function(value) {
					return /^[+]?[1-9]+\d*$/i.test(value);
				},
				message : '请输入整数'
			},
			chinese : {// 验证中文
				validator : function(value) {
					return /^[\u0391-\uFFE5]+$/i.test(value);
				},
				message : '请输入中文'
			},
			chineseAndLength : {// 验证中文及长度
				validator : function(value) {
					var len = $.trim(value).length;
					if (len >= param[0] && len <= param[1]) {
						return /^[\u0391-\uFFE5]+$/i.test(value);
					}
				},
				message : '请输入中文'
			},
			english : {// 验证英语
				validator : function(value) {
					return /^[A-Za-z]+$/i.test(value);
				},
				message : '请输入英文'
			},
			englishAndLength : {// 验证英语及长度
				validator : function(value, param) {
					var len = $.trim(value).length;
					if (len >= param[0] && len <= param[1]) {
						return /^[A-Za-z]+$/i.test(value);
					}
				},
				message : '请输入英文'
			},
			englishUpperCase : {// 验证英语大写
				validator : function(value) {
					return /^[A-Z]+$/.test(value);
				},
				message : '请输入大写英文'
			},
			unnormal : {// 验证是否包含空格和非法字符
				validator : function(value) {
					// 验证是否包含空格和非法字符
					return !/[(\ )(\|)(\&)(\;)(\$)(\%)(\@)(\')(\")(\<)(\>)(\()(\))(\+)(\\n)(\\r)(\,)(\)]+/i.test(value);
					/*if(value.trim() == null || value.trim() == "" ) {
						return false;
					} else {
						return true;
					}*/
				},
				message : '输入值不能为空和包含其他非法字符'
			},
			username : {// 验证用户名
				validator : function(value) {
					return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
				},
				message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
			},
			faxno : {// 验证传真
				validator : function(value) {
					return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
				},
				message : '传真号码不正确'
			},
			zip : {// 验证邮政编码
				validator : function(value) {
					return /^[1-9]\d{5}$/i.test(value);
				},
				message : '邮政编码格式不正确'
			},
			ip : {// 验证IP地址
				validator : function(value) {
					return /d+.d+.d+.d+/i.test(value);
				},
				message : 'IP地址格式不正确'
			},
			name : {// 验证姓名，可以是中文或英文
				validator : function(value) {
					return /^[\u0391-\uFFE5]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
				},
				message : '请输入姓名'
			},
			engOrChinese : {// 可以是中文或英文
				validator : function(value) {
					return /^[\u0391-\uFFE5]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
				},
				message : '请输入中文'
			},
			engOrChineseAndLength : {// 可以是中文或英文
				validator : function(value) {
					var len = $.trim(value).length;
					if (len >= param[0] && len <= param[1]) {
						return /^[\u0391-\uFFE5]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
					}
				},
				message : '请输入中文或英文'
			},
			carNo : {
				validator : function(value) {
					return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value);
				},
				message : '车牌号码无效（例：粤B12350）'
			},
			carenergin : {
				validator : function(value) {
					return /^[a-zA-Z0-9]{16}$/.test(value);
				},
				message : '发动机型号无效(例：FG6H012345654584)'
			},
			same : {
				validator : function(value, param) {
					if ($("#" + param[0]).val() != "" && value != "") {
						return $("#" + param[0]).val() == value;
					} else {
						return true;
					}
				},
				message : '两次输入的密码不一致!'
			}
});


// base64加密开始
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
                + "wxyz0123456789+/" + "=";

function encode64(input) {

        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                        enc4 = 64;
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                                + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
}
// base64加密结束