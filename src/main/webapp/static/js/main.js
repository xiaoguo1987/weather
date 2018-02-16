var wrapper = {};

//设置
wrapper.settings = {
    homeTabTitle: '我的桌面',
    homeTabUrl: '',
    maxTabCount: 5,
    basePath:basePath()
};

//初始化
wrapper.init = function () {
    //com.ajax({ type: 'GET', url: 'api/sys/menu', success: wrapper.initMenu });
    
    $('.loginOut').click(wrapper.logout);
    $('.changepwd').click(wrapper.changePassword);
    //$('.myconfig').click(wrapper.mysettings);
    $('#notity').jnotifyInizialize({ oneAtTime: true, appendType: 'append' }).css({ 'position': 'absolute', '*top': '2px', 'left': '50%', 'margin': '20px 0px 0px -120px', '*margin': '0px 0px 0px -120px', 'width': '240px', 'z-index': '9999' });
    $('#rightMenu').menu({ onClick: wrapper.rightMenuClick });

    $('#tabs').tabs({
        tools: [{ iconCls: 'icon-arrow_refresh', handler: wrapper.tabRefresh },
                { iconCls: 'icon-screen_full', handler: wrapper.setFullScreen },
                { iconCls: 'panel-tool-close', handler: wrapper.tabClose }],
        onContextMenu: wrapper.tabContextMenu,
        onClose: wrapper.setLocationHash,
        onSelect: wrapper.setLocationHash
    });
    /*
    var themes = {
    		'gray' : '${basePath}/sys/js/easyui/themes/gray/easyui.css',
    		'black' : '${basePath}/sys/js/easyui/themes/black/easyui.css',
    		'bootstrap' : '${basePath}/sys/js/easyui/themes/bootstrap/easyui.css',
    		'default' : '${basePath}/sys/js/easyui/themes/default/easyui.css',
    		'metro' : '${basePath}/sys/js/easyui/themes/metro-blue/easyui.css'
    	};

    	var skins = $('.li-skinitem span').click(function() {
    		var $this = $(this);
    		if($this.hasClass('cs-skin-on')) return;
    		skins.removeClass('cs-skin-on');
    		$this.addClass('cs-skin-on');
    		var skin = $this.attr('rel');
    		$('#swicth-style').attr('href', themes[skin]);
    		setCookie('cs-skin', skin);
    		skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
    	});

    	if(getCookie('cs-skin')) {
    		var skin = getCookie('cs-skin');
    		$('#swicth-style').attr('href', themes[skin]);
    		$this = $('.li-skinitem span[rel='+skin+']');
    		$this.addClass('cs-skin-on');
    		skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
    	}*/
};

//事件
wrapper.tabContextMenu = function (e, title) {
    $('#rightMenu').menu('show', {left: e.pageX,top: e.pageY});
    $('#tabs').tabs('select', title);
    e.preventDefault();
};

wrapper.setLocationHash = function(){
    try {
        var $obj = $('#tabs');
        var src = '', tabs = $obj.data().tabs.tabs;
        var tab = $obj.tabs('getSelected');

        var fnSrc = function (tab) {
            var iframe = tab.find('iframe');
            //return iframe.length ? iframe[0].src.replace(location.host, '').replace('http://', '').replace('.aspx', '') : '';
            return iframe.length ? iframe[0].src.replace(location.host, '').replace('http://', '') : '';
        };

        if (tab) {
            src = fnSrc(tab);
            if (src) window.location.hash = '!' + src;   //如果src没有，就不设置，case在f5刷新时出现
            if (src == wrapper.settings.homeTabUrl) window.location.hash = '';
        }
        else {
            src = fnSrc(tabs[tabs.length - 1]); //关闭tabs时，当前tab为空
            window.location.hash = '!' + src;
        }
    }
    catch (e) { 
    	//console.info(e);
    }
}

wrapper.logout = function () {
    $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function (r) {
        if (r) location.href = wrapper.settings.basePath+'/logout';
    });
};
function goBack(){
	$('#w').dialog('close')
}

wrapper.changePassword = function () {
	$('#w').dialog({
        title: "&nbsp;修改密码",
        iconCls: 'icon-key',
        width: 340,
        height: 250,
        closed: false,    
        cache: false,
        href: wrapper.settings.basePath+'/user/changePwd',    
        modal: true
       // html: "#password-template",
        /*viewModel: function (w) {
            w.find("[name=UserCode]").val("lhs");
            w.find("#pwd_confirm").click(function () { w.dialog('close'); });
            w.find("#pwd_close").click(function () { w.dialog('close'); });
        }*/
    });
};
wrapper.mysettings = function () {
    wrapper.addTab("个人设置", "/sys/config", "icon icon-wrench_orange");
};

wrapper.tabRefresh = function (url) {
    var $tab = $("#tabs");
    var currentTab = $tab.tabs('getSelected');
    var src = $(currentTab.panel('options').content).attr('src');
    var currtab_title = currentTab.panel('options').title;
    //if (typeof src === 'string') src = url;
    if (currtab_title != wrapper.settings.homeTabTitle){
    	$tab.tabs('update', { tab: currentTab, options: { content: wrapper.createFrame(src) } })
    }
};

wrapper.setFullScreen = function () {
    var that = $(this);
    if (that.find('.icon-screen_full').length) {
        that.find('.icon-screen_full').removeClass('icon-screen_full').addClass('icon-screen_actual');
        $('[region=north],[region=west]').panel('close')
        var panels = $('body').data().layout.panels;
        panels.north.length = 0;
        panels.west.length = 0;
        if (panels.expandWest) {
            panels.expandWest.length = 0;
            $(panels.expandWest[0]).panel('close');
        }
        $('body').layout('resize');
    } else if ($(this).find('.icon-screen_actual').length) {
        that.find('.icon-screen_actual').removeClass('icon-screen_actual').addClass('icon-screen_full');
        $('[region=north],[region=west]').panel('open');
        var panels = $('body').data().layout.panels;
        panels.north.length = 1;
        panels.west.length = 1;
        if ($(panels.west[0]).panel('options').collapsed) {
            panels.expandWest.length = 1;
            $(panels.expandWest[0]).panel('open');
        }
        $('body').layout('resize');
    }
};

wrapper.tabClose = function () {
    if (confirm('确认要关闭所有窗口吗？')) 
        wrapper.rightMenuClick({ id: 'closeall' });
};

setInterval(function(){
	 var today = new Date();
	  var years = today.getFullYear();
	  var months = today.getMonth() + 1;
	  var dates = today.getDate();
	  var days = today.getDay();
	  var hours = today.getHours();
	  var minutes = today.getMinutes();
	  var seconds = today.getSeconds();
	 
	  minutes = fixTime(minutes);
	  seconds = fixTime(seconds);
	  
	  if(days == 0){ days = "日"}
	  if(days == 1){ days = "一"}
	  if(days == 2){ days = "二"}
	  if(days == 3){ days = "三"}
	  if(days == 4){ days = "四"}
	  if(days == 5){ days = "五"}
	  if(days == 6){ days = "六"}
	  var the_time = years + "年 " + months + "月 " + dates + "日 " + "星期" + days + " " + hours + ":" + minutes + ":" + seconds;
	  $('#showDate').text(the_time);
},500);
function fixTime(the_time) {
	if (the_time <10) { 
	the_time = "0" + the_time; 
		}
	return the_time; 
}

wrapper.addTab = function (subtitle, url, icon) {
    if (!url|| url == '#') return false;
    var $tab = $('#tabs');
    var tabCount = $tab.tabs('tabs').length;
    var hasTab = $tab.tabs('exists', subtitle);
    if ((tabCount <= wrapper.settings.maxTabCount) || hasTab) 
        wrapper.openTabHandler($tab, hasTab, subtitle, wrapper.settings.basePath+url, icon);
    else
        $.messager.confirm("系统提示", '<b>您当前打开了太多的页面，如果继续打开，会造成程序运行缓慢，无法流畅操作！</b>', function (b) {
            if (b)
                wrapper.openTabHandler($tab, hasTab, subtitle, url, icon);
        });
};

wrapper.tabinit = function(url) {
	var $tab = $("#tabs");
	var currentTab = $tab.tabs('getSelected');
		$tab.tabs('update', {
			tab : currentTab,
			options : {
				content : wrapper.createFrame(url)
			}
		})
};

wrapper.openTabHandler = function ($tab,hasTab, subtitle,url,icon) {
    if (!hasTab) {
        $tab.tabs('add', {title: subtitle,closable: true,icon: icon});
        wrapper.tabinit(url);
    } else {
        $tab.tabs('select', subtitle);
        wrapper.tabRefresh(url);   //选择TAB时刷新页面
    }
    wrapper.setLocationHash();
};

/*
function setWinHeight(obj)
{
	 var win=obj;
	 if (document.getElementById)
	 {
		  if (win && !window.opera)
		  {
		   	if (win.contentDocument && win.contentDocument.body.offsetHeight)
		   	{
		   	 	win.height = win.contentDocument.body.offsetHeight;				   		
		   	}
		   else if(win.Document && win.Document.body.scrollHeight)
			{					   
		    	win.height = win.Document.body.scrollHeight;
			}
		  }
	 }
}
function createFrame(url) {
	var s = '<iframe id="iframeCenter" onload="Javascript:setWinHeight(this);" scrolling="auto" frameborder="0"  src="<%=basePath%>'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}*/

wrapper.createFrame = function (url) {
    return '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>';
}

wrapper.rightMenuClick = function (item) {
    var $tab = $('#tabs');
    var currentTab = $tab.tabs('getSelected');
    var titles = wrapper.getTabTitles($tab);

    switch (item.id) {
        case "refresh":
            var src = $(currentTab.panel('options').content).attr('src');
            var currtab_title = currentTab.panel('options').title;
            if (currtab_title != wrapper.settings.homeTabTitle){
            	$tab.tabs('update', { tab: currentTab, options: { content: wrapper.createFrame(src) } });
            }
            break;
        case "close":
            var currtab_title = currentTab.panel('options').title;
            if (currtab_title != wrapper.settings.homeTabTitle){
            	$tab.tabs('close', currtab_title);
    		}
            break;
        case "closeall":
            $.each(titles, function () {
                if (this != wrapper.settings.homeTabTitle)
                    $tab.tabs('close', this);
            });
            break;
        case "closeother":
            var currtab_title = currentTab.panel('options').title;
            $.each(titles, function () {
                if (this != currtab_title && this != wrapper.settings.homeTabTitle)
                    $tab.tabs('close', this);
            });
            break;
        case "closeright":
            var tabIndex = $tab.tabs('getTabIndex', currentTab);
            if (tabIndex == titles.length - 1) {
            	com.message('warning','亲，后边没有啦 ^@^!!');
                //alert('亲，后边没有啦 ^@^!!');
                return false;
            }
            $.each(titles, function (i) {
                if (i > tabIndex && this != wrapper.settings.homeTabTitle)
                    $tab.tabs('close', this);
            });

            break;
        case "closeleft":
            var tabIndex = $tab.tabs('getTabIndex', currentTab);
            if (tabIndex == 1) {
            	com.message('warning','亲，"我的桌面"没了，怎么办公? ^@^!!');
                //alert('亲，我的桌面都没了，还咋办公。 ^@^!!');
                return false;
            }
            $.each(titles, function (i) {
                if (i < tabIndex && this != wrapper.settings.homeTabTitle)
                    $tab.tabs('close', this);
            });
            break;
        case "exit":
            $('#rightMenu').menu('hide');
            break;
    }
};

wrapper.getTabTitles = function ($tab) {
    var titles = [];
    var tabs = $tab.tabs('tabs');
    $.each(tabs, function () { titles.push($(this).panel('options').title); });
    return titles;
};

function setCookie(name,value) {//两个参数，一个是cookie的名子，一个是值
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {//取cookies函数        
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;
}

//方法
wrapper.initSettings = function (settings) {
    wrapper.settings = $.extend(wrapper.settings, settings);
};
			
$(wrapper.init);



		



