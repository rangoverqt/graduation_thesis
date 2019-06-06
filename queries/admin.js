var bodyParser = require('body-parser');
var passport = require("passport");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuidv4');
const LocalStrategy = require('passport-local').Strategy;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var session = require('express-session');
var pg = require('pg');
var config = {
    user: 'postgres',
    database: 'coyome_db',
    password: '123',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config)

function getLoginform(req, res){
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
        }
        else{
    res.render('admin-login.ejs',{title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
    
}
};


function getDB_admin(req, res){
    if(req.isAuthenticated()){
        pool.connect(function(err, client, done){
            if(err) throw err;
            client.query('SELECT users.id,users.ten_dn,users.hoten,users.created_at,users.avatar, users.trangthai, gr_users.ten_gr, (SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id) AS tong_bv,(SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area is not null) AS daxet, (SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area = 0) AS thongqua,(SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area = 1) AS tuchoi FROM users inner join gr_users on users.id_gr = gr_users.id',function(err, result){
                if(err) throw err;
                
                var test = result.rows;
                client.query('select * from gr_users',function(err, result1){
                var test1 = result1.rows;
                client.query('select (select count(*) from users where id_gr = 2) as admin, (select count(*) from users where id_gr = 4) as kdv, (select count(*) from users where id_gr = 5) as cvb, (select count(*) from users where id_gr = 6) as thanhvien from users limit 1',function(err,thongso){
                    if(err) throw err;
                    var thong_so = thongso.rows[0];
                    done();
        var tt_ad = {
            id: req.user.id,
            hoten: req.user.hoten,
            ten_dn: req.user.ten_dn
        };
    res.render('admin-db.ejs',{TT_ND: test, LOAIND: test1, THONGSO: thong_so, TT_AD: tt_ad});
    console.log(req.user);
    // console.log(test);
})
})
})
})
    }
    else{
        res.redirect('/admin/login',);
    }
}

function getChitiet_nd(req, res){
    if(req.isAuthenticated()){
    var id_nd = req.params.idnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('SELECT users.*, gr_users.ten_gr, (SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id) AS tong_bv,(SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area is not null) AS daxet, (SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area = 0) AS thongqua,(SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area = 1) AS tuchoi FROM users inner join gr_users on users.id_gr = gr_users.id where users.id = '+id_nd+'',function(err, result){
        if(err) throw err;
        var test = result.rows[0];
        client.query('select (select count(*) from baiviet where baiviet.id_user = users.id and baiviet.id_chude = 2) as anime,(select count(*) from baiviet where baiviet.id_user = users.id and baiviet.id_chude = 3) as history,(select count(*) from baiviet where baiviet.id_user = users.id and baiviet.id_chude = 4) as music from users where users.id = '+id_nd+'',function(err,thongso){
        if(err) throw err;
        var thongso_bv = thongso.rows[0];
        client.query('select baiviet.*, chude.ten_cd from baiviet inner join chude on baiviet.id_chude = chude.id where baiviet.id_user = '+id_nd+' and restrict_area is not null',function(err, baiviet){
        if(err) throw err;
        var bv_nd = baiviet.rows;
        client.query('select luotvote.*, baiviet.tieude, baiviet.noidung from luotvote inner join baiviet on luotvote.id_baiviet = baiviet.id where luotvote.id_user = '+id_nd+'',function(err,vote){
        if(err) throw err;
        var vote_bv = vote.rows;
        client.query('select luotcmt.*, baiviet.tieude from luotcmt inner join baiviet on luotcmt.id_baiviet = baiviet.id where luotcmt.id_user = '+id_nd+'',function(err, cmt){
            if(err) throw err;
            var cmt_bv = cmt.rows;
            client.query('select luotcmt_cmt.*, luotcmt.noidung as noidung_cmt from luotcmt_cmt inner join luotcmt on luotcmt_cmt.id_luotcmt = luotcmt.id where luotcmt_cmt.id_user = '+id_nd+'',function(err, cmt_cmt){
            if(err) throw err;
            var cmt_cmt_bv = cmt_cmt.rows;
            client.query('select folow_chude.*, chude.ten_cd, chude.wall_pic from folow_chude inner join chude on folow_chude.id_chude = chude.id where folow_chude.id_user = '+id_nd+'',function(err, fl_cd){
                if(err) throw err;
                var fl_cd_bv = fl_cd.rows;
                client.query('select folow_users.created_at, users.hoten from folow_users inner join users on folow_users.id_userfl = users.id where folow_users.id_user = '+id_nd+'',function(err, fl_nd){
                if(err) throw err;
                var fl_nd_bv = fl_nd.rows;
                client.query('select connect_users.created_at, users.id, users.hoten, users.avatar from connect_users inner join users on connect_users.id_usercon2 = users.id where connect_users.id_usercon1 = '+id_nd+'',function(err, connd){    
                if(err) throw err;
                var con_nd = connd.rows;
                client.query('select (select count(*) from baiviet where id_user = '+id_nd+') as baidang, (select count(*) from luotvote where id_user = '+id_nd+') as luotvote,(select count(*) from luotcmt where id_user = '+id_nd+') as luotcmt,(select count(*) from luotcmt_cmt where id_user = '+id_nd+') as luotcmt_cmt,(select count(*) from folow_chude where id_user = '+id_nd+') as folow_chude,(select count(*) from folow_users where id_user = '+id_nd+') as folow_users,(select count(*) from report_users where id_userrp = '+id_nd+') as birp,(select count(*) from report_bv inner join baiviet on report_bv.id_baiviet = baiviet.id where baiviet.id_user = '+id_nd+') as rp_bv from users where id = '+id_nd+'',function(err, thongso){
                    if(err) throw err;
                    var thongso_nd = thongso.rows[0];
                    client.query('select * from baiviet where id_duyetbai = '+id_nd+'',function(err, duyet_bai){
                    if(err) throw err;
                    var duyetbai = duyet_bai.rows;
                    client.query('select (select count(*) from reply_rpbv where id_user = '+id_nd+') as rpbv,(select count(*) from reply_rpnd where id_user = '+id_nd+') as rpnd, (select count(*) from reply_request where id_user = '+id_nd+') as req, (select count(*) from reply_rpnd_admin where id_user = '+id_nd+') as rpnd_admin, (select count(*) from reply_request_admin where id_user = '+id_nd+') as req_admin from users where id = '+id_nd+'',function(err, thurep){
                        if(err) throw err;
                        var rep_thu = thurep.rows[0];
                        done();
                        var tt_ad = {
                            id: req.user.id,
                            hoten: req.user.hoten,
                            ten_dn: req.user.ten_dn
                        };
            // console.log(vote_bv);
        res.render('xemchitiet_nd_admin.ejs',{TT_ND: test, BAIVIET: bv_nd, VOTE: vote_bv, THONGSO: thongso_bv, CMT: cmt_bv, CMT_CMT: cmt_cmt_bv, CHUDE: fl_cd_bv, FLND: fl_nd_bv, CON_ND: con_nd, THONGSO_ND: thongso_nd, DUYETBAI: duyetbai,THUREP: rep_thu, TT_AD: tt_ad});
    })
})
})
})
})
})
})
})
})
})
})
})
})
}
else{
    res.redirect('/admin/login',);
}
}

function getLogout(req, res){
console.log(req.isAuthenticated());
 req.logout();
 console.log(req.isAuthenticated());
 req.flash('success', 'Logged out. See you soon!');
 res.redirect('/admin/login');
}

function getBaivietDB(req, res){
    if(req.isAuthenticated()){
    pool.connect(function(err,client,done){
        if(err) throw err;
        client.query('select a.hoten as nguoidang, b.hoten as duyetbai,chude.ten_cd, baiviet.* from baiviet inner join users a on baiviet.id_user = a.id inner join users b on baiviet.id_duyetbai = b.id left join chude on baiviet.id_chude = chude.id',function(err, bai_viet){
            if(err) throw err;
            var baiviet = bai_viet.rows;
            client.query('select (select count(*) from baiviet where da_xem is not null and restrict_area is null) as daxem,(select count(*) from baiviet where da_xem is null) as chuaxem,(select count(*) from baiviet where restrict_area is null) as chuaduyet, (select count(*) from baiviet where restrict_area = 0) as thongqua, (select count(*) from baiviet where restrict_area = 1) as tuchoi from baiviet limit 1',function(err, thongso_bv){
            if(err) throw err;
                var thongsobv = thongso_bv.rows[0];
                client.query('select baiviet.*, users.hoten, chude.ten_cd from baiviet inner join users on baiviet.id_user = users.id left join chude on baiviet.id_chude = chude.id where restrict_area is null',function(err,bv_chuaxem){
                if(err) throw err;
                var bvchuaxem = bv_chuaxem.rows;
                client.query('select * from chude',function(err, chu_de){    
                if(err) throw err;
                var chude = chu_de.rows;
                client.query('select (select count(*) from baiviet where id_chude = 2) as bv_anime, (select count(*) from baiviet where id_chude = 3) as bv_history, (select count(*) from baiviet where id_chude = 4) as bv_music from baiviet limit 1',function(err, bv_cd){
                    if(err) throw err;
                    var bvcd = bv_cd.rows[0];
                    done()
            res.render('admin-bvdb.ejs',{BAIVIET: baiviet, THONGSO_BV: thongsobv, BAIVIET_CX: bvchuaxem, CHUDE: chude, THONGSO_BVCD: bvcd});
        })
    })
    })
})
    })
})
}
else{
    res.redirect('/admin/login',);
}  
}

function getBaiviet_chitiet(req, res){
    if(req.isAuthenticated()){
    var idbv = req.params.idbv;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select baiviet.*, users.hoten,users.avatar,users.id as id_nguoidang, chude.ten_cd from baiviet inner join users on baiviet.id_user = users.id left join chude on baiviet.id_chude = chude.id where baiviet.id ='+idbv+'',function(err, bai_viet){
            if(err) throw err;
            var baiviet = bai_viet.rows[0];
            client.query('select * from lydo_dec where id_baiviet = '+idbv+'',function(err, lydo_dec){
            if(err) throw err;
            var lydodec = lydo_dec.rows[0];
            client.query('select * from users where id = '+baiviet.id_duyetbai+'',function(err, duyet_bai){
              if(err) throw err;
                var duyetbai = duyet_bai.rows[0];
                client.query('select luotvote.*,users.hoten from luotvote inner join users on luotvote.id_user = users.id where luotvote.id_baiviet='+idbv+'',function(err, luotvote){
                if(err) throw err;
                var luot_vote = luotvote.rows;
                client.query('select luotcmt.*,users.hoten from luotcmt inner join users on luotcmt.id_user = users.id where luotcmt.id_baiviet = '+idbv+'',function(err, luot_cmt){
                    if(err) throw err;
                    var luotcmt = luot_cmt.rows;
                    client.query('select report_bv.*,users.hoten from report_bv inner join users on report_bv.id_user = users.id where report_bv.id_baiviet = '+idbv+'',function(err,luot_rp){
                    if(err) throw err;
                    var luotrp = luot_rp.rows;
                    client.query('select (select count(*) from luotvote where id_baiviet = '+idbv+' and loaivote = 0) as voteup, (select count(*) from luotvote where id_baiviet = '+idbv+' and loaivote = 1) as votedown, (select count(*) from luotcmt where id_baiviet = '+idbv+') as cmt, (select count(*) from report_bv where id_baiviet = '+idbv+') as rpbv from baiviet limit 1',function(err, thong_so){
                        var thongso = thong_so.rows[0];
                        done();
            res.render('xemchitiet_baiviet_admin.ejs', {BAIVIET: baiviet, LYDODEC: lydodec, DUYETBAI: duyetbai, LUOTVOTE: luot_vote, LUOTCMT: luotcmt, LUOTRP: luotrp, THONGSO: thongso});
})
})
})
})
})
})
})
})
}
else{
    res.redirect('/admin/login',);
}  
}

function getChude_db(req, res){
    if(req.isAuthenticated()){
    pool.connect(function(err, client, done){
    if(err) throw err;
        client.query('select chude.*, (select count(*) from baiviet where baiviet.id_chude = chude.id) as sobv,(select count(*) from folow_chude where folow_chude.id_chude = chude.id) as folow  from chude',function(err, chude){
        if(err) throw err;
        var chu_de = chude.rows;
        client.query('select (select count(*) from baiviet where id_chude = 2) as anime, (select count(*) from baiviet where id_chude = 3) as history, (select count(*) from baiviet where id_chude = 4) as music,(select count(*) from baiviet) as tong from baiviet limit 1',function(err,cd_bv){
        if(err) throw err;
            var cdbv = cd_bv.rows[0];
            done();
            res.render('admin-cddb.ejs',{CHUDE: chu_de, CDBV: cdbv});
        })
    })
})
}
else{
    res.redirect('/admin/login',);
} 
}

function getChitiet_cd(req, res){
    if(req.isAuthenticated()){
    var idcd = req.params.idcd;
    pool.connect(function(err, client, done){
    if(err) throw err;
    client.query('select * from chude where id = '+idcd+'',function(err,chude){
        if(err) throw err;
        chu_de = chude.rows[0];
        client.query('select (select count(*) from baiviet) as tong,(select count(*) from baiviet where id_chude = '+idcd+') as bvcd from baiviet limit 1',function(err,thongso_bv){
        if(err) throw err;
        var thongsobv = thongso_bv.rows[0];
        client.query('select baiviet.*, users.hoten from baiviet inner join users on baiviet.id_user = users.id where id_chude = '+idcd+'',function(err, baiviet){
            if(err) throw err;
            var bai_viet = baiviet.rows;
            client.query('select (select count(*) from folow_chude) as tong, (select count(*) from folow_chude where id_chude = '+idcd+') as flcd from folow_chude limit 1',function(err, fl_cd){
            var flcd = fl_cd.rows[0];
            client.query('select folow_chude.*, users.hoten from folow_chude inner join users on folow_chude.id_user = users.id where id_chude ='+idcd+'',function(err, folow_cd){
                if(err) throw err;
                var folowcd = folow_cd.rows;
                done();
        res.render('xemchitiet_chude_admin.ejs', {CHUDE: chu_de, THONGSOBV: thongsobv, BAIVIET: bai_viet, FLCD: flcd, FOLOWCD: folowcd});
    })
})
})
})
    })
})
}
else{
    res.redirect('/admin/login',);
} 
}

function postDoianh(req, res){
    console.log(req.files);
    var idcd = req.params.idcd;
    if (!req.files)
		return res.status(400).send('No files were uploaded.');
        
		var file = req.files.uploaded_image;
		var img_name= file.name;
 
	  	if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/img/'+file.name, function(err) {
                             
	              if (err)
 
                    return res.status(500).send(err);
                    pool.connect(function(err, client, done){
                        if(err) throw err;
                        client.query("update chude set wall_pic = '"+img_name+"' where id = "+idcd+"");
                        if(err) throw err;
                            done();
                        res.redirect('../xemchitiet_chude/'+idcd);
                    
                    });
});
          } else {
            res.render('xemchitiet_chude_admin.ejs');
          }
        }

function post_doimota(req, res){
    idcd = req.params.idcd;
    mota = req.body.mota;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query("update chude set mota = '"+mota+"' where id = "+idcd+"");
        if(err) throw err;
        done();
        res.redirect('../xemchitiet_chude/'+idcd);
    })
}

function getPhanquyen_db(req, res){
    if(req.isAuthenticated()){
    pool.connect(function(err, client, done){
    if(err) throw err;
    client.query('select users.*, gr_users.ten_gr from users inner join gr_users on users.id_gr = gr_users.id',function(err, users){
        if(err) throw err;
        var user = users.rows;
        client.query('select decu.*, a.hoten as duocdecu, a.id as idduocdecu, b.hoten as ngdecu from decu inner join users a on decu.id_user = a.id left join users b on decu.id_admin = b.id',function(err, de_cu){
        if(err) throw err;
        var decu = de_cu.rows;
        client.query('select * from gr_users',function(err, loai_nd){
            if(err) throw err;
            var loaind = loai_nd.rows;
            done();
        res.render('admin-pqdb.ejs',{USER: user, DECU: decu, LOAIND: loaind});
    })
})
    })
})
}
else{
    res.redirect('/admin/login',);
} 
}

function getHopthu(req, res){
    if(req.isAuthenticated()){
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select reply_rpnd_admin.*, users.hoten from reply_rpnd_admin inner join users on reply_rpnd_admin.id_user = users.id',function(err, hopthu_rpnd){
        if(err) throw err;
        var thurpnd = hopthu_rpnd.rows;
        client.query('select reply_request_admin.*, users.hoten from reply_request_admin inner join users on reply_request_admin.id_user = users.id',function(err, hopthu_rq){
        if(err) throw err;
        var thurq = hopthu_rq.rows;
        client.query('select (select count(*) from reply_rpnd_admin) as thurpnd, (select count(*) from reply_request_admin) as thurq from reply_rpnd_admin limit 1',function(err, thong_so){
            if(err) throw err;
            var thongso = thong_so.rows[0];
            client.query('select (select count(*) from reply_rpnd_admin where daxem is not null) as thurpnd_daxem, (select count(*) from reply_request_admin where daxem is not null) as thurq_daxem from reply_rpnd_admin limit 1',function(err, thongso_daxem){
            if(err) throw err;
            var thongsodaxem = thongso_daxem.rows[0];
                done();
            res.render('admin-hopthu.ejs',{RPND: thurpnd, RQ: thurq, THONGSO: thongso, THONGSO_DX: thongsodaxem});
    })
})
})
})
})
}
else{
    res.redirect('/admin/login',);
} 
}

function getXemchitiet_rpnd(req, res){
    if(req.isAuthenticated()){
    var idrpnd = req.params.idrpnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update reply_rpnd_admin set daxem = 1 where id = '+idrpnd+'');
        client.query('select reply_rpnd_admin.*,reply_rpnd_admin.id as idrp, users.* from reply_rpnd_admin inner join users on reply_rpnd_admin.id_user = users.id where reply_rpnd_admin.id = '+idrpnd+'',function(err, rep){
            if(err) throw err;
            var reply = rep.rows[0];
            client.query('select report_users.*, a.hoten as ngrp, a.id as idngrp, a.avatar as avangrp, b.hoten as ngbirp, b.id as idngbirp, b.avatar as avangbirp from report_users inner join users a on report_users.id_user = a.id left join users b on report_users.id_userrp = b.id where report_users.id = '+reply.id_rpnd+'',function(err, rpnd){
            if(err) throw err;
            var rp_nd = rpnd.rows[0];
                done();
            res.render('xemchitiet_rpnd_admin.ejs',{REP:reply, RPND: rp_nd});
    });
})
})
}
else{
    res.redirect('/admin/login',);
} 
}

function getXemchitiet_rq(req, res){
    if(req.isAuthenticated()){
    var idrq = req.params.idrq;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update reply_request_admin set daxem = 1 where id = '+idrq+'');
        client.query('select reply_request_admin.*,reply_request_admin.id as idrq, users.* from reply_request_admin inner join users on reply_request_admin.id_user = users.id where reply_request_admin.id = '+idrq+'',function(err, rep){
            if(err) throw err;
            var reply = rep.rows[0];
            client.query('select request.*, users.hoten, users.avatar, users.id as iduser from request inner join users on request.id_user = users.id where request.id = '+reply.id_rq+'',function(err,rq){
                if(err) throw err;
            var rq_nd = rq.rows[0];
            done();
            res.render('xemchitiet_rq_admin.ejs',{REP:reply, RQ: rq_nd});
    })
})
})
}
else{
    res.redirect('/admin/login',);
} 
}

function post_decu(req, res){
    idnd = req.params.idnd;
    vitri = req.body.vitri;
    admin = req.body.admin;
    // console.log(vitri);
    console.log(admin);
    console.log(idnd);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update users set trangthai = 2 where id = '+idnd+'');
        client.query('insert into decu(vitri, id_user, id_admin) values ('+vitri+','+idnd+','+admin+')',function(err, result){
        if(err) throw err;
            done();
        res.redirect('../xemchitiet/'+idnd);
    });
    })
}

module.exports = {
    getLoginform: getLoginform,
    getDB_admin: getDB_admin,
    getLogout: getLogout,
    getChitiet_nd: getChitiet_nd,
    getBaivietDB: getBaivietDB,
    getBaiviet_chitiet: getBaiviet_chitiet,
    getChude_db: getChude_db,
    getChitiet_cd: getChitiet_cd,
    postDoianh: postDoianh,
    post_doimota: post_doimota,
    getPhanquyen_db: getPhanquyen_db,
    getHopthu: getHopthu,
    getXemchitiet_rpnd: getXemchitiet_rpnd,
    getXemchitiet_rq: getXemchitiet_rq,
    post_decu: post_decu
}