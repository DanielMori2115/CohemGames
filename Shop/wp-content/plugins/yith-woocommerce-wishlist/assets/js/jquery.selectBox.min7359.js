!function(r){var o=this.SelectBox=function(e,t){if(e instanceof jQuery){if(!(0<e.length))return;e=e[0]}return this.typeTimer=null,this.typeSearch="",this.isMac=navigator.platform.match(/mac/i),t="object"==typeof t?t:{},this.selectElement=e,!(!t.mobile&&navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i))&&"select"===e.tagName.toLowerCase()&&void this.init(t)};o.prototype.version="1.2.0",o.prototype.init=function(t){var e=r(this.selectElement);if(e.data("selectBox-control"))return!1;var s,o=r('<a class="selectBox" />'),a=e.attr("multiple")||1<parseInt(e.attr("size")),n=t||{},l=parseInt(e.prop("tabindex"))||0,i=this;o.width(e.outerWidth()).addClass(e.attr("class")).attr("title",e.attr("title")||"").attr("tabindex",l).css("display","inline-block").bind("focus.selectBox",function(){this!==document.activeElement&&document.body!==document.activeElement&&r(document.activeElement).blur(),o.hasClass("selectBox-active")||(o.addClass("selectBox-active"),e.trigger("focus"))}).bind("blur.selectBox",function(){o.hasClass("selectBox-active")&&(o.removeClass("selectBox-active"),e.trigger("blur"))}),r(window).data("selectBox-bindings")||r(window).data("selectBox-bindings",!0).bind("scroll.selectBox",this.hideMenus).bind("resize.selectBox",this.hideMenus),e.attr("disabled")&&o.addClass("selectBox-disabled"),e.bind("click.selectBox",function(e){o.focus(),e.preventDefault()}),a?(t=this.getOptions("inline"),o.append(t).data("selectBox-options",t).addClass("selectBox-inline selectBox-menuShowing").bind("keydown.selectBox",function(e){i.handleKeyDown(e)}).bind("keypress.selectBox",function(e){i.handleKeyPress(e)}).bind("mousedown.selectBox",function(e){1!==e.which||(r(e.target).is("A.selectBox-inline")&&e.preventDefault(),o.hasClass("selectBox-focus"))||o.focus()}).insertAfter(e),e[0].style.height||(l=e.attr("size")?parseInt(e.attr("size")):5,(a=o.clone().removeAttr("id").css({position:"absolute",top:"-9999em"}).show().appendTo("body")).find(".selectBox-options").html("<li><a> </a></li>"),s=parseInt(a.find(".selectBox-options A:first").html("&nbsp;").outerHeight()),a.remove(),o.height(s*l))):(a=r('<span class="selectBox-label" />'),s=r('<span class="selectBox-arrow" />'),a.attr("class",this.getLabelClass()).text(this.getLabelText()),(t=this.getOptions("dropdown")).appendTo("BODY"),o.data("selectBox-options",t).addClass("selectBox-dropdown").append(a).append(s).bind("mousedown.selectBox",function(e){1===e.which&&(o.hasClass("selectBox-menuShowing")?i.hideMenus():(e.stopPropagation(),t.data("selectBox-down-at-x",e.screenX).data("selectBox-down-at-y",e.screenY),i.showMenu()))}).bind("keydown.selectBox",function(e){i.handleKeyDown(e)}).bind("keypress.selectBox",function(e){i.handleKeyPress(e)}).bind("open.selectBox",function(e,t){t&&!0===t._selectBox||i.showMenu()}).bind("close.selectBox",function(e,t){t&&!0===t._selectBox||i.hideMenus()}).insertAfter(e),l=o.width()-s.outerWidth()-parseInt(a.css("paddingLeft"))||0-parseInt(a.css("paddingRight"))||0,a.width(l)),this.disableSelection(o),e.addClass("selectBox").data("selectBox-control",o).data("selectBox-settings",n).hide()},o.prototype.getOptions=function(e){var t,s=r(this.selectElement),o=this,a=function(e,t){return e.children("OPTION, OPTGROUP").each(function(){var e;r(this).is("OPTION")?0<r(this).length?o.generateOptions(r(this),t):t.append("<li> </li>"):((e=r('<li class="selectBox-optgroup" />')).text(r(this).attr("label")),t.append(e),t=a(r(this),t))}),t};switch(e){case"inline":return t=r('<ul class="selectBox-options" />'),(t=a(s,t)).find("A").bind("mouseover.selectBox",function(e){o.addHover(r(this).parent())}).bind("mouseout.selectBox",function(e){o.removeHover(r(this).parent())}).bind("mousedown.selectBox",function(e){1!==e.which||(e.preventDefault(),s.selectBox("control").hasClass("selectBox-active"))||s.selectBox("control").focus()}).bind("mouseup.selectBox",function(e){1===e.which&&(o.hideMenus(),o.selectOption(r(this).parent(),e))}),this.disableSelection(t),t;case"dropdown":t=r('<ul class="selectBox-dropdown-menu selectBox-options" />'),(t=a(s,t)).data("selectBox-select",s).css("display","none").appendTo("BODY").find("A").bind("mousedown.selectBox",function(e){1===e.which&&(e.preventDefault(),e.screenX===t.data("selectBox-down-at-x"))&&e.screenY===t.data("selectBox-down-at-y")&&(t.removeData("selectBox-down-at-x").removeData("selectBox-down-at-y"),o.hideMenus())}).bind("mouseup.selectBox",function(e){1!==e.which||e.screenX===t.data("selectBox-down-at-x")&&e.screenY===t.data("selectBox-down-at-y")||(t.removeData("selectBox-down-at-x").removeData("selectBox-down-at-y"),o.selectOption(r(this).parent()),o.hideMenus())}).bind("mouseover.selectBox",function(e){o.addHover(r(this).parent())}).bind("mouseout.selectBox",function(e){o.removeHover(r(this).parent())});var n=s.attr("class")||"";if(""!==n)for(var l in n=n.split(" "))t.addClass(n[l]+"-selectBox-dropdown-menu");return this.disableSelection(t),t}},o.prototype.getLabelClass=function(){return("selectBox-label "+(r(this.selectElement).find("OPTION:selected").attr("class")||"")).replace(/\s+$/,"")},o.prototype.getLabelText=function(){return r(this.selectElement).find("OPTION:selected").text()||" "},o.prototype.setLabel=function(){var e=r(this.selectElement).data("selectBox-control");e&&e.find(".selectBox-label").attr("class",this.getLabelClass()).text(this.getLabelText())},o.prototype.destroy=function(){var e=r(this.selectElement),t=e.data("selectBox-control");t&&(t.data("selectBox-options").remove(),t.remove(),e.removeClass("selectBox").removeData("selectBox-control").data("selectBox-control",null).removeData("selectBox-settings").data("selectBox-settings",null).show())},o.prototype.refresh=function(){var e=r(this.selectElement),t=e.data("selectBox-control"),s=t.hasClass("selectBox-dropdown"),t=t.hasClass("selectBox-menuShowing");e.selectBox("options",e.html()),s&&t&&this.showMenu()},o.prototype.showMenu=function(){var t=this,e=r(this.selectElement),s=e.data("selectBox-control"),o=e.data("selectBox-settings"),a=s.data("selectBox-options");if(s.hasClass("selectBox-disabled"))return!1;this.hideMenus();var n=parseInt(s.css("borderBottomWidth"))||0;if(a.width(s.innerWidth()).css({top:s.offset().top+s.outerHeight()-n,left:s.offset().left}),e.triggerHandler("beforeopen"))return!1;var l=function(){e.triggerHandler("open",{_selectBox:!0})};switch(o.menuTransition){case"fade":a.fadeIn(o.menuSpeed,l);break;case"slide":a.slideDown(o.menuSpeed,l);break;default:a.show(o.menuSpeed,l)}o.menuSpeed||l();n=a.find(".selectBox-selected:first");this.keepOptionInView(n,!0),this.addHover(n),s.addClass("selectBox-menuShowing"),r(document).bind("mousedown.selectBox",function(e){1!==e.which||r(e.target).parents().andSelf().hasClass("selectBox-options")||t.hideMenus()})},o.prototype.hideMenus=function(){0!==r(".selectBox-dropdown-menu:visible").length&&(r(document).unbind("mousedown.selectBox"),r(".selectBox-dropdown-menu").each(function(){var e=r(this),t=e.data("selectBox-select"),s=t.data("selectBox-control"),o=t.data("selectBox-settings");if(t.triggerHandler("beforeclose"))return!1;var a=function(){t.triggerHandler("close",{_selectBox:!0})};if(o){switch(o.menuTransition){case"fade":e.fadeOut(o.menuSpeed,a);break;case"slide":e.slideUp(o.menuSpeed,a);break;default:e.hide(o.menuSpeed,a)}o.menuSpeed||a(),s.removeClass("selectBox-menuShowing")}else r(this).hide(),r(this).triggerHandler("close",{_selectBox:!0}),r(this).removeClass("selectBox-menuShowing")}))},o.prototype.selectOption=function(e,t){var s,o=r(this.selectElement),a=(e=r(e),o.data("selectBox-control"));o.data("selectBox-settings");if(a.hasClass("selectBox-disabled"))return!1;if(0===e.length||e.hasClass("selectBox-disabled"))return!1;o.attr("multiple")?t.shiftKey&&a.data("selectBox-last-selected")?(e.toggleClass("selectBox-selected"),s=(s=e.index()>a.data("selectBox-last-selected").index()?e.siblings().slice(a.data("selectBox-last-selected").index(),e.index()):e.siblings().slice(e.index(),a.data("selectBox-last-selected").index())).not(".selectBox-optgroup, .selectBox-disabled"),e.hasClass("selectBox-selected")?s.addClass("selectBox-selected"):s.removeClass("selectBox-selected")):this.isMac&&t.metaKey||!this.isMac&&t.ctrlKey?e.toggleClass("selectBox-selected"):(e.siblings().removeClass("selectBox-selected"),e.addClass("selectBox-selected")):(e.siblings().removeClass("selectBox-selected"),e.addClass("selectBox-selected")),a.hasClass("selectBox-dropdown")&&a.find(".selectBox-label").text(e.text());var n=0,l=[];return o.attr("multiple")?a.find(".selectBox-selected A").each(function(){l[n++]=r(this).attr("rel")}):l=e.find("A").attr("rel"),a.data("selectBox-last-selected",e),o.val()!==l&&(o.val(l),this.setLabel(),o.trigger("change")),!0},o.prototype.addHover=function(e){e=r(e),r(this.selectElement).data("selectBox-control").data("selectBox-options").find(".selectBox-hover").removeClass("selectBox-hover"),e.addClass("selectBox-hover")},o.prototype.getSelectElement=function(){return this.selectElement},o.prototype.removeHover=function(e){e=r(e),r(this.selectElement).data("selectBox-control").data("selectBox-options").find(".selectBox-hover").removeClass("selectBox-hover")},o.prototype.keepOptionInView=function(e,t){var s,o,a;e&&0!==e.length&&(o=(s=r(this.selectElement).data("selectBox-control")).data("selectBox-options"),s=s.hasClass("selectBox-dropdown")?o:o.parent(),o=parseInt(e.offset().top-s.position().top),a=parseInt(o+e.outerHeight()),t?s.scrollTop(e.offset().top-s.offset().top+s.scrollTop()-s.height()/2):(o<0&&s.scrollTop(e.offset().top-s.offset().top+s.scrollTop()),a>s.height()&&s.scrollTop(e.offset().top+e.outerHeight()-s.offset().top+s.scrollTop()-s.height())))},o.prototype.handleKeyDown=function(e){var t=r(this.selectElement),s=t.data("selectBox-control"),o=s.data("selectBox-options"),a=t.data("selectBox-settings"),n=0,l=0;if(!s.hasClass("selectBox-disabled"))switch(e.keyCode){case 8:e.preventDefault(),this.typeSearch="";break;case 9:case 27:this.hideMenus(),this.removeHover();break;case 13:s.hasClass("selectBox-menuShowing")?(this.selectOption(o.find("LI.selectBox-hover:first"),e),s.hasClass("selectBox-dropdown")&&this.hideMenus()):this.showMenu();break;case 38:case 37:if(e.preventDefault(),s.hasClass("selectBox-menuShowing")){for(var i=o.find(".selectBox-hover").prev("LI"),n=o.find("LI:not(.selectBox-optgroup)").length,l=0;(0===i.length||i.hasClass("selectBox-disabled")||i.hasClass("selectBox-optgroup"))&&(0===(i=i.prev("LI")).length&&(i=a.loopOptions?o.find("LI:last"):o.find("LI:first")),!(++l>=n)););this.addHover(i),this.selectOption(i,e),this.keepOptionInView(i)}else this.showMenu();break;case 40:case 39:if(e.preventDefault(),s.hasClass("selectBox-menuShowing")){var c=o.find(".selectBox-hover").next("LI");for(n=o.find("LI:not(.selectBox-optgroup)").length,l=0;(0===c.length||c.hasClass("selectBox-disabled")||c.hasClass("selectBox-optgroup"))&&(0===(c=c.next("LI")).length&&(c=a.loopOptions?o.find("LI:first"):o.find("LI:last")),!(++l>=n)););this.addHover(c),this.selectOption(c,e),this.keepOptionInView(c)}else this.showMenu()}},o.prototype.handleKeyPress=function(e){var t=r(this.selectElement).data("selectBox-control"),s=t.data("selectBox-options");if(!t.hasClass("selectBox-disabled"))switch(e.keyCode){case 9:case 27:case 13:case 38:case 37:case 40:case 39:break;default:t.hasClass("selectBox-menuShowing")||this.showMenu(),e.preventDefault(),clearTimeout(this.typeTimer),this.typeSearch+=String.fromCharCode(e.charCode||e.keyCode),s.find("A").each(function(){if(r(this).text().substr(0,this.typeSearch.length).toLowerCase()===this.typeSearch.toLowerCase())return this.addHover(r(this).parent()),this.selectOption(r(this).parent(),e),this.keepOptionInView(r(this).parent()),!1}),this.typeTimer=setTimeout(function(){this.typeSearch=""},1e3)}},o.prototype.enable=function(){var e=r(this.selectElement),e=(e.prop("disabled",!1),e.data("selectBox-control"));e&&e.removeClass("selectBox-disabled")},o.prototype.disable=function(){var e=r(this.selectElement),e=(e.prop("disabled",!0),e.data("selectBox-control"));e&&e.addClass("selectBox-disabled")},o.prototype.setValue=function(t){var e,s=r(this.selectElement),o=(s.val(t),null===(t=s.val())&&(t=s.children().first().val(),s.val(t)),s.data("selectBox-control"));o&&(e=s.data("selectBox-settings"),o=o.data("selectBox-options"),this.setLabel(),o.find(".selectBox-selected").removeClass("selectBox-selected"),o.find("A").each(function(){if("object"==typeof t)for(var e=0;e<t.length;e++)r(this).attr("rel")==t[e]&&r(this).parent().addClass("selectBox-selected");else r(this).attr("rel")==t&&r(this).parent().addClass("selectBox-selected")}),e.change)&&e.change.call(s)},o.prototype.setOptions=function(e){var t,s=r(this.selectElement),o=s.data("selectBox-control");s.data("selectBox-settings");switch(typeof e){case"string":s.html(e);break;case"object":for(var a in s.html(""),e)if(null!==e[a])if("object"==typeof e[a]){var n,l=r('<optgroup label="'+a+'" />');for(n in e[a])l.append('<option value="'+n+'">'+e[a][n]+"</option>");s.append(l)}else{var i=r('<option value="'+a+'">'+e[a]+"</option>");s.append(i)}}if(o)switch(o.data("selectBox-options").remove(),t=o.hasClass("selectBox-dropdown")?"dropdown":"inline",e=this.getOptions(t),o.data("selectBox-options",e),t){case"inline":o.append(e);break;case"dropdown":this.setLabel(),r("BODY").append(e)}},o.prototype.disableSelection=function(e){r(e).css("MozUserSelect","none").bind("selectstart",function(e){e.preventDefault()})},o.prototype.generateOptions=function(e,t){var s=r("<li />"),o=r("<a />");s.addClass(e.attr("class")),s.data(e.data()),o.attr("rel",e.val()).text(e.text()),s.append(o),e.attr("disabled")&&s.addClass("selectBox-disabled"),e.attr("selected")&&s.addClass("selectBox-selected"),t.append(s)},r.extend(r.fn,{selectBox:function(s,e){var t;switch(s){case"control":return r(this).data("selectBox-control");case"settings":if(!e)return r(this).data("selectBox-settings");r(this).each(function(){r(this).data("selectBox-settings",r.extend(!0,r(this).data("selectBox-settings"),e))});break;case"options":if(undefined===e)return r(this).data("selectBox-control").data("selectBox-options");r(this).each(function(){(t=r(this).data("selectBox"))&&t.setOptions(e)});break;case"value":if(undefined===e)return r(this).val();r(this).each(function(){(t=r(this).data("selectBox"))&&t.setValue(e)});break;case"refresh":r(this).each(function(){(t=r(this).data("selectBox"))&&t.refresh()});break;case"enable":r(this).each(function(){(t=r(this).data("selectBox"))&&t.enable(this)});break;case"disable":r(this).each(function(){(t=r(this).data("selectBox"))&&t.disable()});break;case"destroy":r(this).each(function(){(t=r(this).data("selectBox"))&&(t.destroy(),r(this).data("selectBox",null))});break;case"instance":return r(this).data("selectBox");default:r(this).each(function(e,t){r(t).data("selectBox")||r(t).data("selectBox",new o(t,s))})}return r(this)}})}(jQuery);