function ImageMonitor() {
    var imgArray = [];
    return {
        createImage: function (src) {
            return typeof imgArray[src] !== 'undefined' ? imgArray[src] : (imgArray[src] = new Image(), imgArray[src].src = src, imgArray[src]);
        },
        loadImage: function (arr, callback) {
            for (var i = 0, l = arr.length; i < l; i++) {
                var img = arr[i];
                imgArray[img] = new Image();
                imgArray[img].onload = function () {
                    if (i === l - 1 && typeof callback === 'function') {
                        callback();
                    }
                };
                imgArray[img].src = img;
            }
        }
    };
}
var im = new ImageMonitor();

var offsetLeft = 0;

function Plan(canvas, options){
    var o = {
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        hp: 1,
        score: 0,
        image: '',
        boomimage: '',
        speed: 1,
        survival: true,
        dietime: 0
    };
    this.o = $.extend(o, options);
    this.ctx = canvas;
    this.init();
}
Plan.prototype.init = function () {
    var _this = this;
    var bg = new Image();
    _this.bg = bg;
    bg.src = _this.o.image;
    var boombg = new Image();
    _this.boombg = boombg;
    boombg.src = _this.o.boomimage;
};
Plan.prototype.paint = function () {
    var _this = this;
    if(!_this.o.survival){
        _this.ctx.drawImage(_this.boombg, _this.o.x, _this.o.y, _this.o.w, _this.o.h);
    }else{
        _this.ctx.drawImage(_this.bg, _this.o.x, _this.o.y, _this.o.w, _this.o.h);
    }
};
Plan.prototype.move = function (x, y) {
    var _this = this;
    if(!_this.o.survival){
        return false;
    }
    _this.o.x = x - offsetLeft - _this.o.w/2;
    _this.o.y = y - _this.o.h/2;
    if(_this.o.x<0){
        _this.o.x = 0;
    }
    if(_this.o.x>_this.ctx.canvas.clientWidth-_this.o.w){
        _this.o.x = _this.ctx.canvas.clientWidth-_this.o.w;
    }
    if(_this.o.y<0){
        _this.o.y = 0;
    }
    if(_this.o.y>_this.ctx.canvas.clientHeight - _this.o.h){
        _this.o.y =_this.ctx.canvas.clientHeight - _this.o.h;
    }
};
Plan.prototype.control = function () {
    var _this = this;
    var stage = $('.gamewrap');
    var move = false;
    stage.on('touchstart', function(event){
        var x = event.changedTouches[0].clientX - offsetLeft,
        y = event.changedTouches[0].clientY;
        if(x > _this.o.x  && x < _this.o.x + _this.o.w && y < _this.o.y + _this.o.h && y >_this.o.y){
            move = true;
        }
    }).on('touchmove', function(event){
        if(move){
            _this.move(event.changedTouches[0].clientX,event.changedTouches[0].clientY);
        }
        event.preventDefault();
    }).on('touchend', function(event){
        move = false;
    });
};
Plan.prototype.coord = function () {
    var _this = this;
    return {x:_this.o.x,y:_this.o.y,w:_this.o.w,h:_this.o.h};
};
Plan.prototype.dead = function () {
    this.o.survival = false;
};
Plan.prototype.survival = function () {
    return this.o.survival;
};
/*
创建子弹类
 */
function Bullet(canvas, options){
    var o = {
        w: 6,
        h: 14,
        x: 0,
        y: 0,
        attach: 1,
        image: 'img/bullet1.png',
        show: true
    };
    this.o = $.extend(o, options);
    this.ctx = canvas;
    this.init();
}
Bullet.prototype.init = function () {
    var _this = this;
    if($('#dfjBulletbg').length > 0){
        _this.bg = $('#dfjBulletbg');
        return false;
    }
    var bg = new Image();
    _this.bg = bg;
    bg.src = _this.o.image;
    bg.id = 'dfjBulletbg';
};
Bullet.prototype.paint = function () {
    var _this = this;
    if(!_this.o.show){
        return false;
    }
    _this.ctx.drawImage(_this.bg, _this.o.x, _this.o.y, _this.o.w, _this.o.h);
};
Bullet.prototype.move = function () {
    var _this = this;
    _this.o.y -= 20;
    if(!_this.o.show){
        return false;
    }
    if(_this.o.y < 0){
        _this.o.show = false;
        return false;
    }
    _this.paint();
};
Bullet.prototype.isshow = function () {
    return this.o.show;
};
Bullet.prototype.hide = function () {
    this.o.show = false;
};
Bullet.prototype.coord = function () {
    var _this = this;
    return {x:_this.o.x,y:_this.o.y,w:_this.o.w,h:_this.o.h};
};
//创建敌机
function EnemyPlan(canvas, options){
    var o = {
        w: 0,
        h: 0,
        hp: 1,
        image: '',
        boomimage: '',
        speed: 1,
        ratio: 1,
        survival: true,
        type: 1,
        score: 1,
        dietime: 0
    };
    this.ctx = canvas;
    this.o = $.extend(o, options);
    var randomx = parseInt(Math.random()*(this.ctx.canvas.clientWidth - this.o.w));
    this.o.x = randomx;
    this.o.y = -this.o.h;
    this.init();
}
EnemyPlan.prototype.init = function () {
    var _this = this;
    var bg = new Image();
    _this.bg = bg;
    bg.src = _this.o.image;
};
EnemyPlan.prototype.paint = function () {
    var _this = this;
    if(!_this.o.survival){
        return false;
    }
    _this.ctx.drawImage(_this.bg, _this.o.x, _this.o.y, _this.o.w, _this.o.h);
};
EnemyPlan.prototype.move = function () {
    var _this = this;
    if(!_this.o.survival){
        return false;
    }
    _this.o.y += _this.o.speed*_this.o.ratio;
    
    if(_this.o.y > _this.ctx.canvas.clientHeight){
        _this.dead();
        return false;
    }
    _this.paint();
};
EnemyPlan.prototype.drop = function () {
    this.o.hp--;
    if(this.o.hp < 1){
        this.o.survival = false;
    }
};
EnemyPlan.prototype.dead = function () {
    this.o.survival = false;
};
EnemyPlan.prototype.survival = function () {
    return this.o.survival;
};
EnemyPlan.prototype.coord = function () {
    var _this = this;
    return {x:_this.o.x,y:_this.o.y,w:_this.o.w,h:_this.o.h};
};
EnemyPlan.prototype.score = function () {
    return this.o.score;
};
EnemyPlan.prototype.getType = function () {
    return this.o.type;
};

function Gamedfj(options) {
    var o = {
        id: 'dfj',
        w: 320,
        h: 568,
        bgurl:'img/bg.png',
        bgWidth: 320,
        bgHeight: 568,
        time: 0,
        timmer: null,
        bgSpeed: 2,
        bgloop: 0,
        score: 0,
        bulletList: [],
        enemyPlanList: [],
        bgDistance: 0,
        flag: true
    };
    this.o = $.extend(o, options);
    var ww = $(window).width() > 360 ? 360 : $(window).width();
    var wh = $(window).height() > 640 ? 640 : $(window).height();
    $('#'+this.o.id).attr('width',ww);
    $('#'+this.o.id).attr('height',wh);
    $('.gamewrap').width(ww);
    $('.gamewrap').height(wh);
    this.o.bgWidth = ww;
    this.o.bgHeight = wh;
    offsetLeft = document.getElementById('gamewrap').offsetLeft;
    this.eventType = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    };
}
Gamedfj.prototype.init = function () {
    var _this = this;
    var canvas = document.getElementById(_this.o.id);
    _this.ctx = canvas.getContext('2d');

    //绘制背景
    var bg = new Image();
    _this.bg = bg;
    bg.onload = function () {
        _this.ctx.drawImage(bg, 0, 0, _this.o.bgWidth, _this.o.bgHeight);
    };
    bg.src = _this.o.bgurl;

    //绘制本方飞机
    _this.myplan = new Plan(_this.ctx,{
        w: 66,
        h: 80,
        x: _this.o.bgWidth/2-33,
        y:  _this.o.bgHeight - 90,
        hp: 1,
        score: 0,
        image: 'img/myplan.gif',
        boomimage: 'img/myplanboom.gif',
        speed: 1,
        survival: true,
        dietime: 0
    });
    _this.myplan.control();
    _this.markcount = 0;
};
Gamedfj.prototype.rollBg = function(){
    var _this = this;
    if(_this.o.bgDistance>=_this.o.bgHeight){
        _this.o.bgloop = 0;
    }
    _this.o.bgDistance = ++_this.o.bgloop * _this.o.bgSpeed;
    _this.ctx.drawImage(_this.bg, 0, _this.o.bgDistance-_this.o.bgHeight, _this.o.bgWidth, _this.o.bgHeight);
    _this.ctx.drawImage(_this.bg, 0, _this.o.bgDistance, _this.o.bgWidth, _this.o.bgHeight);
};
Gamedfj.prototype.addScore = function(score){
    this.o.score += parseInt(score);
    $('#score').text('分数：' + this.o.score);
};
Gamedfj.prototype.main = function(){
    var _this = this;
    _this.markcount++;
    _this.ctx.clearRect(0, 0, _this.bgWidth, _this.bgHeight);
    _this.rollBg(_this.ctx);
    _this.myplan.paint();
    
    if(_this.markcount%8===0 && _this.myplan.survival()){
        _this.o.bulletList.push(new Bullet(_this.ctx, {
            x: _this.myplan.coord().x + 8,
            y: _this.myplan.coord().y + 27
        }));
        _this.o.bulletList.push(new Bullet(_this.ctx, {
            x: _this.myplan.coord().x + 53,
            y: _this.myplan.coord().y + 27
        }));
    }
    if(_this.myplan.survival()){
        var bulletslen=_this.o.bulletList.length;
        for(var i=0;i<bulletslen;i++){
            _this.o.bulletList[i].move();
            if(!_this.o.bulletList[i].isshow()){
                _this.o.bulletList.splice(i,1);
                bulletslen--;
            }
        }
    }
    var speed = parseInt(_this.o.score/60) + 1;
    speed = speed > 5 ? 5 : speed;
    if(_this.markcount%30===0){
        _this.o.enemyPlanList.push(new EnemyPlan(_this.ctx,{
            w: 34,
            h: 24,
            hp: 1,
            image: 'img/enemy1_fly_1.png',
            boomimage: 'img/myplanboom.gif',
            speed: speed
        }));
    }else if(_this.markcount%100 === 0 && _this.o.score > 50){
        _this.o.enemyPlanList.push(new EnemyPlan(_this.ctx,{
            w: 46,
            h: 60,
            hp: 7,
            image: 'img/enemy3_fly_1.png',
            boomimage: 'img/myplanboom.gif',
            speed: speed,
            ratio: 0.8,
            score: 3
        }));
    }else if(_this.markcount%310 === 0 && _this.o.score > 150){
        _this.o.enemyPlanList.push(new EnemyPlan(_this.ctx,{
            w: 110,
            h: 164,
            hp: 30,
            image: 'img/enemy2_fly_1.png',
            boomimage: 'img/myplanboom.gif',
            speed: speed,
            ratio: 0.5,
            score: 10
        }));
    }
    
    var enemyPlanlen=_this.o.enemyPlanList.length;
    for(var i=0;i<enemyPlanlen;i++){
        var enemyPlan = _this.o.enemyPlanList[i];
        enemyPlan.move();
        
        if(enemyPlan.coord().x + 5 < _this.myplan.coord().x + _this.myplan.coord().w && enemyPlan.coord().x + enemyPlan.coord().w - 5 > _this.myplan.coord().x && enemyPlan.coord().y + 5 < _this.myplan.coord().y + _this.myplan.coord().h && enemyPlan.coord().y + enemyPlan.coord().h - 5 > _this.myplan.coord().y){
            _this.myplan.dead();
        }
        
        for(var bi=0;bi<bulletslen;bi++){
            var bullet = _this.o.bulletList[bi];
            if(enemyPlan.coord().x < bullet.coord().x + bullet.coord().w && enemyPlan.coord().x + enemyPlan.coord().w > bullet.coord().x && enemyPlan.coord().y + enemyPlan.coord().h - 5 > bullet.coord().y){
                enemyPlan.drop();
                if(!enemyPlan.survival()){
                    _this.addScore(enemyPlan.score());
                    _this.o.enemyPlanList.splice(i,1);
                    enemyPlanlen--;
                }
                bullet.hide();
                _this.o.bulletList.splice(bi,1);
                bulletslen--;
            }
        }
    }
};
Gamedfj.prototype.run = function(){
    var _this = this;
    if(_this.o.flag){
        _this.main();
    }
    if(_this.myplan.survival()){
        _this.o.timmer = setTimeout(function(){
            _this.run();
        }, Math.round(1000/60));
    }else{
        _this.main();
        alert('gg');
    }
};
Gamedfj.prototype.pause = function(){
    this.o.flag = !this.o.flag;
};

$(function(){
    var game = new Gamedfj();
    game.init();
    $('#start').one('click', function(){
       $(this).closest('.sbg').hide();
       game.run();
    });
});