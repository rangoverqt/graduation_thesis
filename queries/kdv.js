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

//GET moderator dashboard
function getModDB(req, res){
    pool.connect(function(err, client, done){
        if(err){
            return console.error('Something went wrong',err);
        }
        var id  = req.params.idkdv;
    client.query("SELECT * FROM users WHERE id ='"+id+"'",function(err,check){
        if(err){
            res.end();
            return console.error('Error when running',err);
        }
        // console.log(check.rows[0]);
        var checking = check.rows[0];
        if(checking.id_gr != 4){
            res.send(`You don't have permision access this page`);
        }
        else
        client.query('SELECT baiviet.*, chude.ten_cd, users.hoten FROM baiviet INNER JOIN chude ON baiviet.id_chude = chude.id LEFT JOIN users ON baiviet.id_duyetbai = users.id',function(err, result){
        
            done();
    
            if(err){
                res.end();
                return console.error('Error when running',err);
            }
            // console.log(result.rows);
            client.query('SELECT baiviet.da_xem, baiviet.restrict_area, chude.* FROM baiviet INNER JOIN chude ON baiviet.id_chude = chude.id',function(err, duparr){
            // console.log(duparr.rows);
            
            let test = duparr.rows.filter(duparr => duparr.da_xem == 1 && duparr.restrict_area == null);
            let test1 = duparr.rows.filter(duparr => duparr.da_xem == null);
            let test2 = duparr.rows.filter(duparr => duparr.da_xem == 1 && duparr.restrict_area != null);
            // console.log(test);
            // console.log(test1);
            // const arr = duparr.rows;
            function getUnique(arr, comp) {

                const unique = arr
                     .map(e => e[comp])
              
                   // store the keys of the unique objects
                  .map((e, i, final) => final.indexOf(e) === i && i)
              
                  // eliminate the dead keys & store unique objects
                  .filter(e => arr[e]).map(e => arr[e]);
              
                 return unique;
              }
              
            //   console.log(getUnique(arr,'id'));
              var filter = getUnique(test,'id');
              var filter1 = getUnique(test1,'id');
              var filter2 = getUnique(test2,'id');
            //   console.log(filter);
            //   console.log(filter1);
            // console.log(filter2);
            res.render("kdv_db.ejs", {LOP:result, CHECK:checking, FILT:filter1, FILT1:filter, FILT2:filter2});
        })
        })
    })
    })
}

//get mailbox db
function getMailbox(req, res){
    pool.connect(function(err, client, done){
        if(err) throw err;
        var id  = req.params.idkdv;
        client.query("SELECT * FROM users WHERE id ='"+id+"'",function(err,check){
            if(err) throw err;
            var checking = check.rows[0];
            client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where thungrac is null',function(err, rpbv){
            done()
            if(err) throw err;
    res.render('mailbox.ejs', {RPBV: rpbv, CHECK:checking});
})
    })
})
}

//get mailbox gansao
function getMailGansao(req, res){
    pool.connect(function(err, client, done){
        if(err) throw err;
        done();
        var id  = req.params.idkdv;
        client.query("SELECT * FROM users WHERE id ='"+id+"'",function(err,check){
            if(err) throw err;
            var checking = check.rows[0];
            client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where gansao is not null and thungrac is null',function(err, rpbv){
                if(err) throw err;
                client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where gansao is not null and thungrac is null',function(err, rpnd){
                    if(err) throw err;
                    client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where gansao is not null and thungrac is null',function(err, request){
                        if(err) throw err;
                       
                        res.render('mailbox-gansao.ejs',{RQ:request, RPND:rpnd, RPBV:rpbv, CHECK:checking});
                    })
                })
            })
        })
    })
}

//get mailbox thungrac
function getMailThungrac(req, res){
    pool.connect(function(err, client, done){
        if(err) throw err;
        done();
        var id  = req.params.idkdv;
        client.query("SELECT * FROM users WHERE id ='"+id+"'",function(err,check){
            if(err) throw err;
            var checking = check.rows[0];
            client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where thungrac is not null',function(err, rpbv){
                if(err) throw err;
                // var arr = [];
                // rpbv.rows.forEach(function(rp_bv){
                //    arr.push(rp_bv.id); 
                // });
                // console.log(arr);
                client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where thungrac is not null',function(err, rpnd){
                    if(err) throw err;
                    client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where thungrac is not null',function(err, request){
                        if(err) throw err;

                        res.render('mailbox-thungrac.ejs',{RQ:request, RPND:rpnd, RPBV:rpbv, CHECK:checking});
                    })
                })
            })
        })
    })
}

function getMailThudagui(req, res){
    pool.connect(function(err, client, done){
        if(err) throw err;
        var idkdv = req.params.idkdv;
        client.query('select reply_rpbv.*,users.hoten, report_bv.chuthich from reply_rpbv inner join users on reply_rpbv.id_user = users.id left join report_bv on reply_rpbv.id_rpbv = report_bv.id where reply_rpbv.id_user = '+idkdv+'',function(err, result){
            if(err) throw err;
            
            var test = result.rows;
            client.query('select reply_rpnd.*,users.hoten,report_users.chuthich from reply_rpnd inner join users on reply_rpnd.id_user = users.id left join report_users on reply_rpnd.id_rpnd = report_users.id where reply_rpnd.id_user = '+idkdv+'',function(err, result1){
            if(err) throw err;
            var test1 = result1.rows;
            client.query('select reply_request.*,users.hoten,request.noidung from reply_request inner join users on reply_request.id_user = users.id left join request on reply_request.id_rq = request.id where reply_request.id_user = '+idkdv+'',function(err, result2){
                if(err) throw err;
                done();
                var test2 = result2.rows;
            res.render('mailbox-thudagui.ejs',{IDKDV: idkdv, REPRPBV: test, REPRPND: test1, REPRQ: test2});
        })
    })
        })
    })
}

function getMailThuguiad(req, res){
    pool.connect(function(err, client, done){
        if(err) throw err;
        var idkdv = req.params.idkdv;
            client.query('select reply_rpnd_admin.*,users.hoten,report_users.chuthich from reply_rpnd_admin inner join users on reply_rpnd_admin.id_user = users.id left join report_users on reply_rpnd_admin.id_rpnd = report_users.id where reply_rpnd_admin.id_user = '+idkdv+'',function(err, result1){
            if(err) throw err;
            var test1 = result1.rows;
            client.query('select reply_request_admin.*,users.hoten,request.noidung from reply_request_admin inner join users on reply_request_admin.id_user = users.id left join request on reply_request_admin.id_rq = request.id where reply_request_admin.id_user = '+idkdv+'',function(err, result2){
                if(err) throw err;
                done();
                var test2 = result2.rows;
            res.render('mailbox-thuguiad.ejs',{IDKDV: idkdv, REPRPND: test1, REPRQ: test2});
        })
        })
    })
}

function getChitietrpbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.idprbv;
    // console.log(rpid);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select report_bv.*, users.hoten from report_bv inner join users on report_bv.id_user = users.id where report_bv.id = '+rpid+'',function(err,result){
            if(err) throw err;
            rpbv = result.rows[0];
            client.query('select reply_rpbv.*, users.hoten from reply_rpbv inner join users on reply_rpbv.id_user = users.id where id_rpbv = '+rpid+'',function(err, testing){
                if(err) throw err;
                var check = testing.rows;
            client.query('select baiviet.*, chude.ten_cd, users.hoten from baiviet inner join chude on baiviet.id_chude = chude.id left join users on baiviet.id_user = users.id where baiviet.id = '+rpbv.id_baiviet+'', function(err, data){
            if(err) throw err;
                done();
                // console.log(check);
                
                
            res.render('chitiet_rpbv.ejs',{IDKDV: idkdv, RPBV: rpbv, BAIVIET: data.rows[0], THUREP: check});
        })
        })
        })
    })
}

function getChitietrpnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.idprbv;
    // console.log(rpid);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where report_users.id ='+rpid+'',function(err, result){
            if(err) throw err;
            rpnd = result.rows[0];
            client.query('select reply_rpnd.*, users.hoten from reply_rpnd inner join users on reply_rpnd.id_user = users.id where id_rpnd = '+rpid+'',function(err, testing){
                if(err) throw err;
                var check = testing.rows;
                client.query('select baiviet.*, chude.ten_cd, users.hoten from baiviet inner join chude on baiviet.id_chude = chude.id left join users on baiviet.id_user = users.id where baiviet.id_user = '+rpnd.id_userrp+'', function(err, data){
                    if(err) throw err;
                    client.query('select reply_rpnd_admin.*, users.hoten from reply_rpnd_admin inner join users on reply_rpnd_admin.id_user = users.id where id_rpnd = '+rpid+'',function(err, admin){
                        if(err) throw err;
                        done();
                        var ad = admin.rows;
                        // console.log(data.rows);
            res.render('chitiet_rpnd.ejs',{IDKDV: idkdv, RPBV: rpnd, BAIVIET: data.rows, THUREP: check, THUGUI: ad});
        })
    })
    })
})
    })
}

function getChitietrq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.idprbv;
    // console.log(rpid);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id  where request.id ='+rpid+'',function(err, result){
            if(err) throw err;
            rpnd = result.rows[0];
            client.query('select reply_request.*, users.hoten from reply_request inner join users on reply_request.id_user = users.id where id_rq = '+rpid+'',function(err, testing){
                if(err) throw err;
                var check = testing.rows;
                client.query('select baiviet.*, chude.ten_cd, users.hoten from baiviet inner join chude on baiviet.id_chude = chude.id left join users on baiviet.id_user = users.id where baiviet.id_user = '+rpnd.id_user+'', function(err, data){
                    if(err) throw err;

                    client.query('select reply_request_admin.*, users.hoten from reply_request_admin inner join users on reply_request_admin.id_user = users.id where id_rq = '+rpid+'',function(err, admin){
                        if(err) throw err;
                        
                        done();
                        var ad = admin.rows
                        // console.log(data.rows);
            res.render('chitiet_rq.ejs',{IDKDV: idkdv, RPBV: rpnd, BAIVIET: data.rows, THUREP: check, THUGUI: ad});
        })
    })
    })
})
    })
}

function getChitietReply_rpbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select reply_rpbv.*, users.hoten from reply_rpbv inner join users on reply_rpbv.id_user = users.id where reply_rpbv.id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            client.query('select report_bv.*, users.hoten, baiviet.tieude from report_bv inner join users on report_bv.id_user = users.id left join baiviet on report_bv.id_baiviet = baiviet.id where report_bv.id = '+test.id_rpbv+'',function(err,data){
            if(err) throw err;
            var test1 = data.rows[0];
            client.query('select reply_rpbv.*, users.hoten from reply_rpbv inner join users on reply_rpbv.id_user = users.id where id_rpbv='+test1.id+'',function(err,data1){
                if(err) throw err;
                var test2 = data1.rows;
                res.render('chitiet_reply_rpbv.ejs',{IDKDV: idkdv,THUREP: test, RPBV: test1, THUREP_DC: test2});
        })
    })
        })
    })
}

function getChitietReply_rpnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select reply_rpnd.*, users.hoten from reply_rpnd inner join users on reply_rpnd.id_user = users.id where reply_rpnd.id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where report_users.id = '+test.id_rpnd+'',function(err,data){
            if(err) throw err;
            var test1 = data.rows[0];
            client.query('select reply_rpnd.*, users.hoten from reply_rpnd inner join users on reply_rpnd.id_user = users.id where id_rpnd='+test1.id+'',function(err,data1){
                if(err) throw err;
                var test2 = data1.rows;
                res.render('chitiet_reply_rpnd.ejs',{IDKDV: idkdv,THUREP: test, RPBV: test1, THUREP_DC: test2});
        })
    })
        })
    })
}

function getChitietReply_rpnd_admin(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select reply_rpnd_admin.*, users.hoten from reply_rpnd_admin inner join users on reply_rpnd_admin.id_user = users.id where reply_rpnd_admin.id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where report_users.id = '+test.id_rpnd+'',function(err,data){
            if(err) throw err;
            var test1 = data.rows[0];
            client.query('select reply_rpnd_admin.*, users.hoten from reply_rpnd_admin inner join users on reply_rpnd_admin.id_user = users.id where id_rpnd='+test1.id+'',function(err,data1){
                if(err) throw err;
                var test2 = data1.rows;
                res.render('chitiet_reply_rpnd_admin.ejs',{IDKDV: idkdv,THUREP: test, RPBV: test1, THUREP_DC: test2});
        })
    })
        })
    })
}

function getChitietReply_rq_admin(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select reply_request_admin.*, users.hoten from reply_request_admin inner join users on reply_request_admin.id_user = users.id where reply_request_admin.id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            client.query('select request.*,users.hoten from request inner join users on request.id_user = users.id where request.id = '+test.id_rq+'',function(err,data){
            if(err) throw err;
            var test1 = data.rows[0];
            client.query('select reply_request_admin.*, users.hoten from reply_request_admin inner join users on reply_request_admin.id_user = users.id where id_rq='+test1.id+'',function(err,data1){
                if(err) throw err;
                var test2 = data1.rows;
                res.render('chitiet_reply_rq_admin.ejs',{IDKDV: idkdv,THUREP: test, RPBV: test1, THUREP_DC: test2});
        })
    })
        })
    })
}

function getChitietReply_rq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('select reply_request.*, users.hoten from reply_request inner join users on reply_request.id_user = users.id where reply_request.id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where request.id = '+test.id_rq+'',function(err,data){
            if(err) throw err;
            var test1 = data.rows[0];
            client.query('select reply_request.*, users.hoten from reply_request inner join users on reply_request.id_user = users.id where id_rq='+test1.id+'',function(err,data1){
                if(err) throw err;
                var test2 = data1.rows;
                res.render('chitiet_reply_rq.ejs',{IDKDV: idkdv,THUREP: test, RPBV: test1, THUREP_DC: test2});
        })
    })
        })
    })
}

//GET Post Details
function getBv_KDV(req, res){
    pool.connect(function(err, client, done){
        if(err){
            return console.error('Something went wrong',err);
        }
        var idkdv  = req.params.idkdv;
        client.query("SELECT * FROM users WHERE id ='"+idkdv+"'",function(err,check){
            if(err){
                res.end();
                return console.error('Error when running',err);
            }
            // console.log(check.rows[0]);
            var checking = check.rows[0];
            if(checking.id_gr != 4){
                res.send(`You don't have permision access this page`);
            }
            else
            var idbv = req.params.idbv;
            client.query("SELECT baiviet.*, chude.ten_cd, users.hoten FROM baiviet INNER JOIN chude ON baiviet.id_chude = chude.id LEFT JOIN users ON baiviet.id_user = users.id  WHERE baiviet.id = '"+idbv+"' ",function(err, result){
                if(result.rows[0].restrict_area == null){
                    client.query("UPDATE baiviet SET da_xem = 1 WHERE id = '"+idbv+"'");
                }
                else{

                }
            client.query("SELECT users.hoten FROM baiviet INNER JOIN users ON baiviet.id_duyetbai = users.id  WHERE baiviet.id = '"+idbv+"'",function(err, result1){
            client.query("SELECT * FROM lydo_dec WHERE id_baiviet = '"+idbv+"'",function(err,ly_dec){
            done();

            if(err){
                res.end();
                return console.error('Error running',err);
            }
            // console.log(result1.rows[0]);
            // console.log(result.rows[0]);
            res.render("kdv_xembv.ejs", {XBV:result.rows[0], CHECK:checking, KDV:result1.rows[0], LDD:ly_dec.rows[0]});
        })
    })
    })
    })
})
}

function post_approve(req, res){
    pool.connect(function(err, client, done){
        if(err){
            return console.error('Something went wrong',err);
        }
        var idkdv  = req.params.idkdv;
        client.query("SELECT * FROM users WHERE id ='"+idkdv+"'",function(err,check){
            if(err){
                res.end();
                return console.error('Error when running',err);
            }
            // console.log(check.rows[0]);
            var checking = check.rows[0];
            if(checking.id_gr != 4){
                res.send(`You don't have permision access this page`);
            }
            else
            var idbv = req.params.idbv;
            var approve = parseInt(req.body.txt_approve);
            // console.log(approve);
            client.query("UPDATE baiviet SET id_duyetbai = '"+idkdv+"', restrict_area = '"+approve+"' WHERE id = '"+idbv+"'",function(err, result){
                done();
    
                if(err){
                    res.end();
                    return console.error('Error running',err);
                }
                // console.log(result.rows[0]);
                // res.send('processing in here');
                res.redirect("/kdv/"+idkdv+"");
            })
        })
    })
}

function post_decline(req, res){
    pool.connect(function(err, client, done){
        if(err){
            return console.error('Something went wrong',err);
        }
        var idkdv  = req.params.idkdv;
        client.query("SELECT * FROM users WHERE id ='"+idkdv+"'",function(err,check){
            if(err){
                res.end();
                return console.error('Error when running',err);
            }
            // console.log(check.rows[0]);
            var checking = check.rows[0];
            if(checking.id_gr != 4){
                res.send(`You don't have permision access this page`);
            }
            else
            var idbv = req.params.idbv;
            var decline = parseInt(req.body.txt_decline);
            var ld_1 = parseInt(req.body.ld_1);
            var ld_2 = parseInt(req.body.ld_2);
            var ld_3 = parseInt(req.body.ld_3);
            var ld_4 = parseInt(req.body.ld_4);
            var ld_5 = parseInt(req.body.ld_5);
            var ld_khac = req.body.ld_khac;
            
            if(ld_1 == 1){
                var ld_1_test = ld_1;
            }
            else{
                var ld_1_test = 0;
            }

            if(ld_2 == 1){
                var ld_2_test = ld_2;
            }
            else{
                var ld_2_test = 0;
            }

            if(ld_3 == 1){
                var ld_3_test = ld_3;
            }
            else{
                var ld_3_test = 0;
            }

            if(ld_4 == 1){
                var ld_4_test = ld_4;
            }
            else{
                var ld_4_test = 0;
            }

            if(ld_5 == 1){
                var ld_5_test = ld_5;
            }
            else{
                var ld_5_test = 0;
            }

            if(ld_khac != undefined){
                var ld_khac_test = ld_khac;
            }
            else{
                var ld_khac_test = null;
            }
        // if(ld_khac != null){
        //     console.log('have values'+ ld_khac);
        // }
        // else{
        //     console.log('have nothing');
        // }
            // console.log(approve);
            client.query("UPDATE baiviet SET id_duyetbai = '"+idkdv+"', restrict_area = '"+decline+"' WHERE id = '"+idbv+"'",function(err, result){
                client.query('delete from lydo_dec where id_baiviet = '+idbv+'');
                client.query("INSERT INTO lydo_dec(id_baiviet, ld_1, ld_2, ld_3, ld_4, ld_5, ld_khac) VALUES('"+idbv+"','"+ld_1_test+"','"+ld_2_test+"','"+ld_3_test+"','"+ld_4_test+"','"+ld_5_test+"','"+ld_khac_test+"')",function(err,result1){

                done();
    
                if(err){
                    res.end();
                    return console.error('Error running',err);
                }
                // console.log(result.rows[0]);
                // res.send('processing in here');
                res.redirect("/kdv/"+idkdv+"");
            })
            })
        })
    })
}

function post_reply_rpbv(req, res){
    // console.log(req.body); 
    
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    var noidung = req.body.editor_content;
    var tieude = req.body.tieude;
    console.log(noidung);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query("insert into reply_rpbv (id_user,id_rpbv,noidung,tieude) values ("+idkdv+","+rpid+",'"+noidung+"','"+tieude+"')",function(err, result){
            if(err) throw err;
            done();
            res.redirect("/kdv/"+idkdv+"/bcbv/"+rpid);
        })
    })
}

function post_reply_rpnd(req, res){
    // console.log(req.body); 
    
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    var noidung = req.body.editor_content;
    var tieude = req.body.tieude;
    console.log(noidung);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query("insert into reply_rpnd (id_user,id_rpnd,noidung,tieude) values ("+idkdv+","+rpid+",'"+noidung+"','"+tieude+"')",function(err, result){
            if(err) throw err;
            done();
            res.redirect("/kdv/"+idkdv+"/bcnd/"+rpid);
        })
    })
}

function post_reply_rpnd_admin(req, res){
    // console.log(req.body); 
    
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    var noidung = req.body.editor_content;
    var tieude = req.body.tieude;
    console.log(noidung);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query("insert into reply_rpnd_admin (id_user,id_rpnd,noidung,tieude) values ("+idkdv+","+rpid+",'"+noidung+"','"+tieude+"')",function(err, result){
            if(err) throw err;
            done();
            res.redirect("/kdv/"+idkdv+"/bcnd/"+rpid);
        })
    })
}

function post_reply_rq_admin(req, res){
    // console.log(req.body); 
    
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    var noidung = req.body.editor_content;
    var tieude = req.body.tieude;
    console.log(noidung);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query("insert into reply_request_admin (id_user,id_rq,noidung,tieude) values ("+idkdv+","+rpid+",'"+noidung+"','"+tieude+"')",function(err, result){
            if(err) throw err;
            done();
            res.redirect("/kdv/"+idkdv+"/yc/"+rpid);
        })
    })
}

function post_reply_rq(req, res){
    // console.log(req.body); 
    
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    var noidung = req.body.editor_content;
    var tieude = req.body.tieude;
    console.log(noidung);
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query("insert into reply_request (id_user,id_rq,noidung,tieude) values ("+idkdv+","+rpid+",'"+noidung+"','"+tieude+"')",function(err, result){
            if(err) throw err;
            done();
            res.redirect("/kdv/"+idkdv+"/yc/"+rpid);
        })
    })
}

module.exports = {
    getModDB: getModDB,
    getBv_KDV: getBv_KDV,
    post_approve: post_approve,
    post_decline: post_decline,
    getMailbox: getMailbox,
    getMailGansao: getMailGansao,
    getMailThungrac: getMailThungrac,
    getChitietrpbv: getChitietrpbv,
    post_reply_rpbv: post_reply_rpbv,
    getChitietReply_rpbv: getChitietReply_rpbv,
    getChitietrpnd: getChitietrpnd,
    post_reply_rpnd: post_reply_rpnd,
    getChitietReply_rpnd: getChitietReply_rpnd,
    getChitietrq: getChitietrq,
    post_reply_rq: post_reply_rq,
    getChitietReply_rq: getChitietReply_rq,
    getMailThudagui: getMailThudagui,
    post_reply_rpnd_admin: post_reply_rpnd_admin,
    getChitietReply_rpnd_admin: getChitietReply_rpnd_admin,
    post_reply_rq_admin: post_reply_rq_admin,
    getChitietReply_rq_admin: getChitietReply_rq_admin,
    getMailThuguiad: getMailThuguiad
}