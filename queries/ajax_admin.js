var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
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

function getFilter_nd(req, res){
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        var idloaind = req.params.idloaind;
        client.query('SELECT users.id,users.ten_dn,users.hoten,users.created_at, gr_users.ten_gr, (SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id) AS tong_bv,(SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area is not null) AS daxet, (SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area = 0) AS thongqua,(SELECT COUNT(*) FROM baiviet WHERE baiviet.id_user = users.id AND restrict_area = 1) AS tuchoi FROM users inner join gr_users on users.id_gr = gr_users.id WHERE id_gr = '+idloaind+'',function(err, result){
            if(err) throw err;
            done();
            
            var test = result.rows;
            var i = 1;
            test.forEach(function(data){
                testreswr('<tr><td style="text-align: center">'+ i++ +'</td>');
                        testreswr('<td>'+ data.ten_dn +'</td>');
                                testreswr('<td>'+ data.hoten +'</td>');
                                testreswr('<td style="text-align: center">'+ data.tong_bv +'</td>');
                        if(data.daxet == 0) { 
                                testreswr('<td>0</td><td>Chưa có bài được xét</td>');
                                 } else { 
                                testreswr('<td style="text-align: center">'+ data.daxet +'</td>');
                                testreswr('<td style="text-align: center"><strong style="color: red">'+ data.thongqua/data.daxet +'</strong></td>');
                                         } 
                                testreswr('<td>'+ data.ten_gr +'</td>');
                                testreswr('<td>'+ data.created_at +'</td>');
                                testreswr('<td><button id="'+ data.id +'" class="xem_chitiet" type="button"><i style="font-size: 19px" class="fas fa-eye"></i></button></td>');
                                if(data.ten_gr == 'Admin'){
                                testreswr('<td><button id="'+ data.id +'" class="xoa" type="button"><i style="font-size: 19px" class="fa fa-trash"></i></button></td></tr>');
                            }
                            })
        })
    })
}

function getFilter_nd_bv(req, res){
    var idnd = req.params.idnd;
    var loaidg = req.params.loaidg;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select baiviet.*, chude.ten_cd from baiviet inner join chude on baiviet.id_chude = chude.id where baiviet.id_user = '+idnd+' and restrict_area ='+loaidg+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows;
            var n = 1;
            test.forEach(function(data){ 
                    testreswr('<tr><td style="text-align: center">'+ n++ +'</td>');
                    testreswr('<td>'+ data.tieude +'</td><td>'+ data.noidung.substring(0,20) +'...</td>');
                    testreswr('<td>'+ data.trichdan +'</td><td>'+ data.keyword +'</td>');
                    testreswr('<td>'+ data.ten_cd +'</td>');
                        if(data.restrict_area == 0) { 
                            testreswr('<td style="text-align: center;background-color: yellowgreen"><strong style="color: white">Thông qua</strong></td>');
                                } else { 
                            testreswr('<td style="text-align: center;background-color: tomato"><strong style="color: white">Từ chối</strong></td>');
                                    } 
                            testreswr('<td>'+ data.created_at.toDateString() +'</td>');
                            testreswr('<td style="text-align: center"><button id="'+ data.id +'" type="button"><i style="font-size: 15px" class="fas fa-eye"></i></button></td>');
                            testreswr('<td style="text-align: center"><button id="'+ data.id +'" type="button"><i style="font-size: 15px" class="fa fa-trash"></i></button></td></tr>');
                                    })
        })
    })
}

function getXoand_chitiet(req, res){
    var id_nd = req.params.idnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from users where id = '+id_nd+'')
        done();
    })
}

function loc_danhgia(req, res){
    var danhgia = req.params.danhgia;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select a.hoten as nguoidang, b.hoten as duyetbai,chude.ten_cd, baiviet.* from baiviet inner join users a on baiviet.id_user = a.id inner join users b on baiviet.id_duyetbai = b.id left join chude on baiviet.id_chude = chude.id where restrict_area ='+danhgia+'',function(err, loc){
            if(err) throw err;
            var locdanhgia = loc.rows;
            done();
            var n = 1;
            locdanhgia.forEach(function(data){ 
            testreswr('<tr><td style="text-align: center">'+ n++ +'</td>');
            testreswr('<td>'+ data.tieude +'</td><td>'+ data.noidung.substring(0,100) +'...</td>');
            testreswr('<td>'+ data.nguoidang +'</td><td>'+ data.ten_cd +'</td>');
            testreswr('<td>'+ data.created_at +'</td>')
            if(data.restrict_area == 0) { 
            testreswr('<td style="text-align: center;background-color:forestgreen;color:white"><strong>Thông qua</strong></td>');
                } else {
            testreswr('<td style="text-align: center;background-color: red;color:white"><strong>Từ chối</strong></td>');
                } 
            testreswr('<td>'+ data.duyetbai +'</td>');
            testreswr('<td><button id="'+ data.id +'" class="xem_bv" type="button"><i style="font-size: 19px" class="fas fa-eye"></i></button></td>')
            testreswr('<td><button id="'+ data.id +'"class="xoa_bv" type="button"><i style="font-size: 19px" class="fa fa-trash"></i></button></td></tr>');
            }) 
    })
})
}

function loc_chude(req, res){
    var idcd = req.params.idcd;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select baiviet.*, users.hoten, chude.ten_cd from baiviet inner join users on baiviet.id_user = users.id left join chude on baiviet.id_chude = chude.id where restrict_area is null and id_chude ='+idcd+'',function(err, loc_cd){
            if(err) throw err;
            var loccd = loc_cd.rows;
            done();
            var n = 1;
            loccd.forEach(function(data){
            testreswr('<tr><td style="text-align: center">'+ n++ +'</td>');
            testreswr('<td>'+ data.tieude +'</td><td>'+ data.noidung.substring(0,100) +'</td>');
            testreswr('<td>'+ data.hoten +'</td><td style="text-align: center">'+ data.ten_cd +'</td>');
            testreswr('<td>'+ data.created_at +'</td><td>'+ data.keyword +'</td><td>'+ data.trichdan +'</td>');
            testreswr('<td><button id="'+ data.id +'"class="xem_bv" type="button"><i style="font-size: 19px" class="fas fa-eye"></i></button></td></tr>');
 }) 
        })
    })
}

function xoa_bv(req, res){
    var idbv = req.params.idbv;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from baiviet where id ='+idbv+'');
        done();
    })
}

function getTamhoan_cd(req, res){
    var idcd = req.params.idcd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update chude set trangthai = 1 where id = '+idcd+'');
        done();
    });
}

function getBoTamhoan_cd(req, res){
    var idcd = req.params.idcd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update chude set trangthai = null where id = '+idcd+'');
        done();
    });
}

function getLoc_pq(req, res){
    var idnd = req.params.idnd;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select users.*, gr_users.ten_gr from users inner join gr_users on users.id_gr = gr_users.id where users.id_gr = '+idnd+'',function(err, user){
            if(err) throw err;
            var user_loc = user.rows;
            done();
            var n = 1; 
            user_loc.forEach(function(data){ 
                if(data.id_gr != 2) { 
testreswr('<tr><td>'+ n++ +'</td><td>'+ data.hoten +'</td>');
testreswr('<td>'+ data.ten_dn +'</td><td>'+ data.ngaysinh.toDateString() +'</td>');
testreswr('<td>'+ data.ten_gr +'</td>')
                if(data.trangthai == 2){ 
testreswr('<td><i style="font-size: 19px" class="fas fa-star"></i></td>')
                } else { 
testreswr('<td></td>')
                    } 
testreswr('<td><button id='+ data.id +' class="phanquyen" type="button"><strong>Phân quyền</strong></button></td><td hidden></td></tr>');
                    } 
 })
})
    })
}

function showForm_pq(req, res){
    var idnd = req.params.idnd;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select users.*,users.id as id_nd, gr_users.* from users inner join gr_users on users.id_gr = gr_users.id where users.id = '+idnd+'',function(err,result){
            if(err) throw err;
            var users = result.rows[0];
            client.query('select decu.*, a.hoten as duocdecu, b.hoten as ngdecu from decu inner join users a on decu.id_user = a.id left join users b on decu.id_user = b.id where decu.id_user = '+idnd+'',function(err, decu){
                if(err) throw err;
                var de_cu = decu.rows[0];
            done();
            testreswr('<input id="test_idnd" value='+users.id_nd+' hidden>');
            testreswr('<h5><strong><i class="fas fa-level-up-alt"></i> Phân quyền cho người dùng</strong></h5>');
            testreswr('<div class="col-sm-2" style="margin-top: 10px">');
            testreswr('<img src="/img/'+users.avatar+'" style="object-fit: cover;width:100px;height:100px;border-radius: 50%"></div>');
            testreswr('<div class="col-sm-4" style="margin-top: 10px">');
            testreswr('<p><strong><i class="fas fa-user"></i> Họ tên: </strong>'+users.hoten+'</p>');
            testreswr('<p><strong><i class="fas fa-sign-in-alt"></i> Tên đăng nhập: </strong>'+users.ten_dn+'</p>');
            testreswr('<p><strong><i class="fas fa-birthday-cake"></i> Ngày sinh:  </strong>'+users.ngaysinh.toDateString() +'</p>');
            testreswr('<p><strong><i class="far fa-handshake"></i> Tham gia Coyome vào </strong><i>'+users.created_at+'</i></p></div>');
            testreswr('<div class="col-sm-6"><p><strong><i class="fas fa-suitcase"></i> Chức vụ hiện tại: </strong>'+users.ten_gr+'</p>');
            if(users.trangthai != 2){
            testreswr('<p><strong><i class="fas fa-star"></i> Được đề cử: Không </strong></p>');
        } else if(users.trangthai == 2){
            testreswr('<p><strong><i class="fas fa-star"></i> Được đề cử bởi  </strong>'+de_cu.ngdecu+'</p>');
        }
            testreswr('<select id="chon_pq" class="form-control">');
            testreswr('<option value='+users.id_gr+'>'+users.ten_gr+'</option>');
            if(users.id_gr == 4){
            testreswr('<option value="5">Chuyên viết bài</option>');
            testreswr('<option value="6">Người dùng</option></select>');
        }
        else if(users.id_gr == 5){
            testreswr('<option value="4">Kiểm duyệt viên</option>');
            testreswr('<option value="6">Người dùng</option></select>');
        }
        else if(users.id_gr == 6){
            testreswr('<option value="4">Kiểm duyệt viên</option>');
            testreswr('<option value="5">Chuyên viết bài</option></select>');
        }
            testreswr('<button type="button" style = "margin-top: 10px" class="dongy"><i class="fas fa-check"></i> Xác nhận</button>');
            testreswr('<button type="button" style = "margin-top: 10px" class="huybo"><i class="fas fa-ban"></i> Hủy bỏ</button></div>');
            
        })
    });
})
}

function phanquyen_ngdung(req, res){
    var idcv = req.params.idcv;
    var idnd = req.params.idnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        done();
        client.query('update users set id_gr = '+idcv+' where id = '+idnd+'');
    })
}

function xoa_rpnd(req, res){
    var idrpnd = req.params.idrpnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpnd_admin where id = '+idrpnd+'');
        done();
    })
}

function xoa_rq(req, res){
    var idrq = req.params.idrq;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_request_admin where id = '+idrq+'');
        done();
    })
}

function ban_nd(req, res){
    var idnd = req.params.idnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update users set trangthai = 1 where id = '+idnd+'');
        done();
    })
}

function goban_nd(req, res){
    var idnd = req.params.idnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update users set trangthai = null where id = '+idnd+'');
        done();
    })
}

function bo_decu(req, res){
    var idnd = req.params.idnd;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update users set trangthai = null where id ='+idnd+'');
        client.query('delete from decu where id_user = '+idnd+'');
    })
}

module.exports = {
    getFilter_nd:  getFilter_nd,
    getFilter_nd_bv: getFilter_nd_bv,
    getXoand_chitiet: getXoand_chitiet,
    loc_danhgia: loc_danhgia,
    loc_chude: loc_chude,
    xoa_bv: xoa_bv,
    getTamhoan_cd: getTamhoan_cd,
    getBoTamhoan_cd: getBoTamhoan_cd,
    getLoc_pq: getLoc_pq,
    showForm_pq: showForm_pq,
    phanquyen_ngdung: phanquyen_ngdung,
    xoa_rpnd: xoa_rpnd,
    xoa_rq: xoa_rq,
    ban_nd: ban_nd,
    goban_nd: goban_nd,
    bo_decu: bo_decu
}