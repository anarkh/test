/* 
 * Created by chenyangli on 2016-8-10.
 */
"use strict";
(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('lottery', function() {
    var box = require("ui/box");
    var auth = require("util/auth");
    var cookie = require("util/cookie");
    var token = require("api/token");
    var support = require("util/support");
    var Lottery = function(options) {
        var u = navigator.userAgent;
        this.o = $.extend({
            id: "",
            wrapid: "lottery",
            sleep: 1,
            defaultprize: 0,
            circle: true,
            islogin: false,
            immediately: false,
            data: {
                platform: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 6 : 5
            },
            success: function() {},
            error: function() {},
            complete: function() {}
        }, options);
        this.id = this.o.id;
        var pp = $("#" + this.o.wrapid).find(".prize");
        if (this.o.circle) {
            var temp = pp[4];
            pp[4] = pp[3];
            pp[3] = temp;
            temp = pp[4];
            pp[4] = pp[7];
            pp[7] = temp;
            temp = pp[5];
            pp[5] = pp[6];
            pp[6] = temp;
        }
        this.prizes = pp;
        this.count = this.prizes.length;
        this.num = 0;
        this.previous = 0;
        this.defaultprize = this.o.defaultprize;
        //默认停止礼包位置
        this.prize = this.o.defaultprize;
        //停止礼包位置
        this.alertmsg = "谢谢参与";
        this.res = {};
    };
    Lottery.prototype.setPrize = function(prize) {
        this.prize = prize;
    };
    Lottery.prototype.start = function() {
        var me = this;
        if (!auth.isLLogin() && cookie("openid") === null && this.o.islogin) {
            alert("请登录");
            return false;
        }
        if (!me.interval) {
            me.endtime = new Date().getTime() + 3e3;
            me.draw();
            if (me.o.immediately) {
                return false;
            }
            me.interval = setInterval(function() {
                $(me.prizes[me.previous]).removeClass("here");
                var i = me.num % me.count;
                me.previous = i;
                $(me.prizes[i]).addClass("here");
                me.num++;
            }, me.o.sleep * 50);
        }
    };
    Lottery.prototype.stop = function() {
        var me = this;
        if (!!me.interval) {
            clearInterval(me.interval);
            me.interval = null;
            var value = me.prize - me.previous > 2 ? me.prize - me.previous : me.prize - me.previous + 9;
            var step = value / 6;
            me.slow(me.o.sleep, step);
        }
    };
    Lottery.prototype.setData = function(data) {
        this.data = $.extend(this.o.data, data);
    };
    Lottery.prototype.slow = function(sleep, step) {
        var me = this;
        sleep = sleep + step;
        setTimeout(function() {
            $(me.prizes[me.previous]).removeClass("here");
            var i = me.num % me.count;
            me.previous = i;
            $(me.prizes[i]).addClass("here");
            me.num++;
            if (i !== me.prize) {
                me.slow(sleep, step);
            } else {
                me.setPrize(me.defaultprize);
                setTimeout(function() {
                    me.result();
                }, sleep * 50);
            }
        }, sleep * 50);
    };
    Lottery.prototype.result = function() {
        var me = this;
        try {
            if (1 == me.res.code && "1" == me.res.type) {
                var giftTipHtml = [];
                giftTipHtml.push('<div class="gift-tip">');
                giftTipHtml.push('<div class="gift-tip-hd">恭喜你抽中' + me.res.name + ":</div>");
                giftTipHtml.push('<div class="gift-tip-cdk"><input readonly="readonly" type="text"  value="'+ me.res.cdkey + '" /></div>');
                giftTipHtml.push('<div class="gift-tip-bd"><em>' + me.res.msg + '</em></div>');
                giftTipHtml.push('</div">');
                box({
                    text: giftTipHtml.join(""),
                    addClass: "gift-tip",
                    buttons: [ {
                        text: "关&nbsp;闭"
                    }, {
                        text: "福利箱",
                        addClass: "blue",
                        click: function() {
                            if (support.os.ios) {
                                window.location.href = "http://" + location.hostname + "/m/qqnews/myinfo.htm?type=fulixiang";
                            } else {
                                window.location.href = "http://" + location.hostname + "/m/tn/myinfo.htm?type=fulixiang";
                            }
                            return false;
                        }
                    } ]
                });
            } else if (1 === me.res.code && "3" === me.res.type) {
                if (me.res.name.indexOf("Q币") > -1) {
                    box({
                        text: "恭喜获得" + me.res.name + "！</br>活动结束后Q币将发放到您参与活动的QQ帐号中",
                        buttons: [ {
                            text: "确定",
                            addClass: "blue"
                        } ]
                    });
                } else {
                    box({
                        text: "恭喜获得" + me.res.name + "！</br>请尽快填写发货地址",
                        buttons: [ {
                            text: "去填写",
                            addClass: "blue",
                            click: function() {
                                this.close();
                                window.location.href = "http://" + location.hostname + "/m/act/address.htm";
                                return false;
                            }
                        } ]
                    });
                }
            } else if (1 === me.res.code && "7" === me.res.type) {
                box({
                    text: me.res.name + "</br>礼包已经发到账号中！",
                    buttons: [ {
                        text: "关&nbsp;闭"
                    } ]
                });
            } else {
                box({
                    text: me.alertmsg,
                    buttons: [ {
                        text: "关&nbsp;闭"
                    } ]
                });
            }
        } catch (e) {
            box({
                text: me.alertmsg,
                buttons: [ {
                    text: "关&nbsp;闭"
                } ]
            });
        }
        me.alertmsg = "谢谢参与";
        cookie("lottery" + me.o.id, 1);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        var dtstatdate = year + "" + month + "" + day;
        cookie("lottery" + me.o.id + dtstatdate, 1);
        me.o.complete();
    };
    Lottery.prototype.draw = function() {
        var me = this;
        var data = $.extend({
            lotteryId: me.id,
            token: token(),
            veritfy: 0,
            platform: 5,
            r: new Date().getTime()
        }, this.o.data);
        $.ajax({
            url: "//iwan.qq.com/lottery/draw",
            type: "post",
            data: data,
            dataType: "json",
            success: function(res) {
                me.o.success();
                //                        var res.code;//是否中奖
                //                        var res.goodsId;//中奖id
                //                        var res.type;//1 cdkey,2 实物,5 cdkey
                //                        var res.msg;//返回没有中奖信息
                //                        var res.name;//返回中奖物品名字
                me.res = res;
                if (1 === res.code) {
                    var goodindex = me.prizes.index($("#" + res.goodsId));
                    goodindex = goodindex > -1 ? goodindex : me.prize;
                    me.setPrize(goodindex);
                }
                me.alertmsg = res.msg;
                if (me.o.immediately) {
                    me.result();
                    return false;
                }
                var nowtime = new Date().getTime();
                if (nowtime > me.endtime) {
                    me.stop();
                } else {
                    setTimeout(function() {
                        me.stop();
                    }, me.endtime - nowtime);
                }
            },
            error: function() {
                me.o.error();
                setTimeout(function() {
                    me.stop();
                }, 2e3);
            }
        });
    };
	return Lottery;
}));