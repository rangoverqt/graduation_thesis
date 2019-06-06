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

function getFilter(req, res){
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
        var idbv  = req.params.idbv;
        client.query("SELECT baiviet.*, chude.ten_cd FROM baiviet INNER JOIN chude ON baiviet.id_chude = chude.id WHERE id_chude = '"+idbv+"' AND da_xem IS NULL",function(err,result){
            
            done();
            if(err){
                // res.end();
                return console.error('Error when running',err);
            }
            else
            // console.log(result.rows);
            var test = result.rows;
            // console.log(test);
            function testreswr(message){ 
                res.write(message, function(err) { 
                    res.end(); 
                });
            }
            var i = 1;
            test.forEach(function(bv){
                
                testreswr('<tr><td>'+ i++ +'</td>');
                testreswr('<td>'+bv.tieude+'</td>');
                testreswr('<td>'+bv.noidung.substring(0, 200)+'...</td>');
                testreswr('<td>'+bv.trichdan+'</td>');
                testreswr('<td>'+bv.keyword+'</td>');
                testreswr('<td>'+bv.created_at+'</td>');
                testreswr('<td>'+bv.ten_cd+'</td>');
                testreswr('<td class="tacvu"><a class="hvr-grow" href="../kdv/'+idkdv+'/baiviet/'+bv.id+'">Xem</a></td></tr>');
            })
        })
    })
})
}


function getFilter1(req, res){
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
        var idbv  = req.params.idbv;
        client.query("SELECT baiviet.*, chude.ten_cd FROM baiviet INNER JOIN chude ON baiviet.id_chude = chude.id WHERE id_chude = '"+idbv+"' AND da_xem IS NOT NULL AND restrict_area IS NULL",function(err,result){
            
            done();
            if(err){
                // res.end();
                return console.error('Error when running',err);
            }
            else
            // console.log(result.rows);
            var test = result.rows;
            // console.log(test);
            function testreswr(message){ 
                res.write(message, function(err) { 
                    res.end(); 
                });
            }
            var i = 1;
            test.forEach(function(bv){
                
                testreswr('<tr><td>'+ i++ +'</td>');
                testreswr('<td>'+bv.tieude+'</td>');
                testreswr('<td>'+bv.noidung.substring(0, 200)+'...</td>');
                testreswr('<td>'+bv.trichdan+'</td>');
                testreswr('<td>'+bv.keyword+'</td>');
                testreswr('<td>'+bv.created_at+'</td>');
                testreswr('<td>'+bv.ten_cd+'</td>');
                testreswr('<td class="tacvu"><a class="hvr-grow" href="../kdv/'+idkdv+'/baiviet/'+bv.id+'">Xem</a></td></tr>');
            })
        })
    })
})
}

function getFilter2(req, res){
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
        var idbv  = req.params.idbv;
        client.query("SELECT baiviet.*, chude.ten_cd, users.ten_dn FROM baiviet INNER JOIN chude ON baiviet.id_chude = chude.id LEFT JOIN users ON baiviet.id_duyetbai = users.id WHERE id_chude = '"+idbv+"' AND restrict_area IS NOT NULL",function(err,result){
            
            done();
            if(err){
                // res.end();
                return console.error('Error when running',err);
            }
            else
            // console.log(result.rows);
            var test = result.rows;
            // console.log(test);
            function testreswr(message){ 
                res.write(message, function(err) { 
                    res.end(); 
                });
            }
            var i = 1;
            test.forEach(function(bv){
                
                testreswr('<tr><td>'+ i++ +'</td>');
                testreswr('<td>'+bv.tieude+'</td>');
                testreswr('<td>'+bv.noidung.substring(0, 200)+'...</td>');
                testreswr('<td>'+bv.trichdan+'</td>');
                testreswr('<td>'+bv.keyword+'</td>');
                testreswr('<td>'+bv.ten_cd+'</td>');
                if(bv.restrict_area == 0) { 
                    testreswr('<td class="thongqua">Thông qua</td>');
                    } else {
                    testreswr('<td class="tuchoi">Từ chối</td>');
                    }
                testreswr('<td>'+bv.ten_dn+'</td>');
                testreswr('<td class="tacvu"><a class="hvr-grow" href="../kdv/'+idkdv+'/baiviet/'+bv.id+'">Xem</a></td></tr>');
            })
        })
    })
})
}

function getmucthu(req, res){
    var loaimucthu = req.params.loaimucthu;
    var idkdv = req.params.idkdv;
    // console.log(loaimucthu);
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    if(loaimucthu == 1){
        pool.connect(function(err, client, done){
            if (err) throw err;
            client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where thungrac is null',function(err, rpbv){
                if(err) throw err;
                done();
                var test = rpbv.rows;
                if(test === undefined || test.length == 0){
                    testreswr("<h5 id='none-post'>Không có thư</h5>")
                }
                else {
                test.forEach(function(rp_bv){
                    if(rp_bv.da_xem == null){
                        testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                        testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_bv.hoten+" </strong></td>");
                        if(rp_bv.loai_rp == 1) { 
                            testreswr('<td class="col-sm-3"><strong>Nội dung không phù hợp</strong></td>');
                            } else if(rp_bv.loai_rp == 2){
                                testreswr('<td class="col-sm-3"><strong>Hình ảnh không phù hợp</strong></td>');
                               }
                               testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){

                                    testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_bv.gansao == 1){
                                   
                                    testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   } 
                                   testreswr('<td class="button"><button  id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                    if(rp_bv.da_xem != null) { 
                        testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                        testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_bv.hoten+'</td>');
                        if(rp_bv.loai_rp == 1) {
                            testreswr('<td class="col-sm-3">Nội dung không phù hợp</td>');
                              } else if(rp_bv.loai_rp == 2){ 
                                testreswr('<td class="col-sm-3">Hình ảnh không phù hợp</td>');
                                }
                                testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_bv.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   }
                                   testreswr('<td class="button"><button  id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>'); 
                          
                      } 
                })
            }
        })
    })
    }
    else if(loaimucthu == 2){
        pool.connect(function(err, client, done){
            if (err) throw err;
            client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where thungrac is null',function(err, rpnd){
                if(err) throw err;
                done();
                var test = rpnd.rows;
                if(test === undefined || test.length == 0){
                    testreswr("<h5 id='none-post'>Không có thư</h5>")
                }
                else {
                test.forEach(function(rp_nd){
                    if(rp_nd.da_xem == null){
                        testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                        testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_nd.user_rp+" </strong></td>");
                        testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                        if(rp_nd.loai_rp == 1){
                            testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                        }
                        else if(rp_nd.loai_rp == 2){
                            testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                        }
                        else if(rp_nd.loai_rp == 3){
                            testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                        }
                        testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_nd.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_nd.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   }  
                                   testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                    else if(rp_nd.da_xem != null){
                        testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                        testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_nd.user_rp+'</td>');
                        testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                        if(rp_nd.loai_rp == 1){
                            testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                        }
                        else if(rp_nd.loai_rp == 2){
                            testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                        }
                        else if(rp_nd.loai_rp == 3){
                            testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                        }
                        testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_nd.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_nd.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   } 
                                   testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                })
            }
            })
        })
    }
    else if(loaimucthu == 3){
        pool.connect(function(err, client, done){
            if (err) throw err;
            client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where thungrac is null',function(err, request){
                if(err) throw err;
                done();
                var test = request.rows;
                if(test === undefined || test.length == 0){
                    testreswr("<h5 id='none-post'>Không có thư</h5>")
                }
                else {
                test.forEach(function(rq){
                    if(rq.da_xem == null){
                        testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                        testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rq.hoten+" </strong></td>");
                        if(rq.loai_rq == 1){
                            testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                        }
                        else if(rq.loai_rq == 2){
                            testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                        }
                        else if(rq.loai_rq == 3){
                            testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                        }
                        testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rq.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rq.gansao == 1){
                                   
                                    testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   } 
                                   testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                    else if(rq.da_xem != null){
                        testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                        testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rq.hoten+'</td>');
                        if(rq.loai_rq == 1){
                            testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                        }
                        else if(rq.loai_rq == 2){
                            testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                        }
                        else if(rq.loai_rq == 3){
                            testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                        }
                        testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rq.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rq.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   } 
                                   testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                })
            }
            })
        })
    }
}

function getGansao_rpbv(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if (err) throw err;
        client.query('update report_bv set gansao = 1 where id = '+rpid+'');
        client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where thungrac is null',function(err, rpbv){
            if(err) throw err;
            done();
            var test = rpbv.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
                test.forEach(function(rp_bv){
                    if(rp_bv.da_xem == null){
                        testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                        testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_bv.hoten+" </strong></td>");
                        if(rp_bv.loai_rp == 1) { 
                            testreswr('<td class="col-sm-3"><strong>Nội dung không phù hợp</strong></td>');
                            } else if(rp_bv.loai_rp == 2){
                                testreswr('<td class="col-sm-3"><strong>Hình ảnh không phù hợp</strong></td>');
                               }
                               testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                               
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_bv.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               }
                               testreswr('<td class="button"><button id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                    if(rp_bv.da_xem != null) { 
                        testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                        testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_bv.hoten+'</td>');
                        if(rp_bv.loai_rp == 1) {
                            testreswr('<td class="col-sm-3">Nội dung không phù hợp</td>');
                              } else if(rp_bv.loai_rp == 2){ 
                                testreswr('<td class="col-sm-3">Hình ảnh không phù hợp</td>');
                                }
                                testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_bv.gansao == 1){
                                   
                                    testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   }
                                   testreswr('<td class="button"><button id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                          
                      } 
            })
        }
        })
    })
}

function getGansao_rpnd(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if (err) throw err;
        client.query('update report_users set gansao = 1 where id='+rpid+'');
        client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where thungrac is null',function(err, rpnd){
            if(err) throw err;
            done();
            var test = rpnd.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
            test.forEach(function(rp_nd){
                if(rp_nd.da_xem == null){
                    testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                    testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_nd.user_rp+" </strong></td>");
                    testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                    if(rp_nd.loai_rp == 1){
                        testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                    }
                    else if(rp_nd.loai_rp == 2){
                        testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                    }
                    else if(rp_nd.loai_rp == 3){
                        testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                    }
                    testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rp_nd.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_nd.gansao == 1){
                               
                                testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               }  
                               testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
                else if(rp_nd.da_xem != null){
                    testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                    testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_nd.user_rp+'</td>');
                    testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                    if(rp_nd.loai_rp == 1){
                        testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                    }
                    else if(rp_nd.loai_rp == 2){
                        testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                    }
                    else if(rp_nd.loai_rp == 3){
                        testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                    }
                    testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rp_nd.gansao == null){
                           
                                testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_nd.gansao == 1){
                               
                                testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
            })
        }
        })
    })
}

function getGansao_rq(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if (err) throw err;
        client.query('update request set gansao = 1 where id = '+rpid+'')
        client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where thungrac is null',function(err, request){
            if(err) throw err;
            done();
            var test = request.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
            test.forEach(function(rq){
                if(rq.da_xem == null){
                    testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                    testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rq.hoten+" </strong></td>");
                    if(rq.loai_rq == 1){
                        testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                    }
                    else if(rq.loai_rq == 2){
                        testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                    }
                    else if(rq.loai_rq == 3){
                        testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                    }
                    testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rq.gansao == null){
                           
                                testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rq.gansao == 1){
                               
                                testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
                else if(rq.da_xem != null){
                    testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                    testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rq.hoten+'</td>');
                    if(rq.loai_rq == 1){
                        testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                    }
                    else if(rq.loai_rq == 2){
                        testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                    }
                    else if(rq.loai_rq == 3){
                        testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                    }
                    testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rq.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rq.gansao == 1){
                               
                                testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
            })
        }
        })
    })
}
function getGosao_rpnd(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if (err) throw err;
        client.query('update report_users set gansao = null where id='+rpid+'');
        client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where thungrac is null',function(err, rpnd){
            if(err) throw err;
            done();
            var test = rpnd.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
            test.forEach(function(rp_nd){
                if(rp_nd.da_xem == null){
                    testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                    testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_nd.user_rp+" </strong></td>");
                    testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                    if(rp_nd.loai_rp == 1){
                        testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                    }
                    else if(rp_nd.loai_rp == 2){
                        testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                    }
                    else if(rp_nd.loai_rp == 3){
                        testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                    }
                    testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rp_nd.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_nd.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               }  
                               testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
                else if(rp_nd.da_xem != null){
                    testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                    testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_nd.user_rp+'</td>');
                    testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                    if(rp_nd.loai_rp == 1){
                        testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                    }
                    else if(rp_nd.loai_rp == 2){
                        testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                    }
                    else if(rp_nd.loai_rp == 3){
                        testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                    }
                    testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rp_nd.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_nd.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
            })
        }
        })
    })
}

function getGosao_rpbv(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if (err) throw err;
        client.query('update report_bv set gansao = null where id = '+rpid+'');
        client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where thungrac is null',function(err, rpbv){
            if(err) throw err;
            done();
            var test = rpbv.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
                test.forEach(function(rp_bv){
                    if(rp_bv.da_xem == null){
                        testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                        testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_bv.hoten+" </strong></td>");
                        if(rp_bv.loai_rp == 1) { 
                            testreswr('<td class="col-sm-3"><strong>Nội dung không phù hợp</strong></td>');
                            } else if(rp_bv.loai_rp == 2){
                                testreswr('<td class="col-sm-3"><strong>Hình ảnh không phù hợp</strong></td>');
                               }
                               testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                               
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_bv.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   }
                                   testreswr('<td class="button"><button id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                    if(rp_bv.da_xem != null) { 
                        testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                        testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_bv.hoten+'</td>');
                        if(rp_bv.loai_rp == 1) {
                            testreswr('<td class="col-sm-3">Nội dung không phù hợp</td>');
                              } else if(rp_bv.loai_rp == 2){ 
                                testreswr('<td class="col-sm-3">Hình ảnh không phù hợp</td>');
                                }
                                testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                                
                                    testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_bv.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   }
                                   testreswr('<td class="button"><button id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                          
                      } 
            })
        }
        })
    })
}

function getGosao_rq(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if (err) throw err;
        client.query('update request set gansao = null where id = '+rpid+'')
        client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where thungrac is null',function(err, request){
            if(err) throw err;
            done();
            var test = request.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
            test.forEach(function(rq){
                if(rq.da_xem == null){
                    testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                    testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rq.hoten+" </strong></td>");
                    if(rq.loai_rq == 1){
                        testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                    }
                    else if(rq.loai_rq == 2){
                        testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                    }
                    else if(rq.loai_rq == 3){
                        testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                    }
                    testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rq.gansao == null){
                           
                                testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rq.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
                else if(rq.da_xem != null){
                    testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                    testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rq.hoten+'</td>');
                    if(rq.loai_rq == 1){
                        testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                    }
                    else if(rq.loai_rq == 2){
                        testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                    }
                    else if(rq.loai_rq == 3){
                        testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                    }
                    testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rq.gansao == null){
                           
                                testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rq.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
            })
        }
        })
    })
}

function getGosao_rpbv_gansao(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set gansao = null where id='+rpid+'');
        done();
    })
}

function getGosao_rpnd_gansao(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set gansao = null where id='+rpid+'');
        done();
    })
}

function getGosao_rq_gansao(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set gansao = null where id='+rpid+'');
        done();
    })
}

function getThungrac_rpbv(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set thungrac = 1 where id = '+rpid+'');
        client.query('SELECT report_bv.*, users.hoten, baiviet.tieude FROM report_bv INNER JOIN users ON report_bv.id_user = users.id LEFT JOIN baiviet ON report_bv.id_baiviet = baiviet.id where thungrac is null',function(err, rpbv){
            if(err) throw err;
            done();
            var test = rpbv.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
                test.forEach(function(rp_bv){
                    if(rp_bv.da_xem == null){
                        testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                        testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_bv.hoten+" </strong></td>");
                        if(rp_bv.loai_rp == 1) { 
                            testreswr('<td class="col-sm-3"><strong>Nội dung không phù hợp</strong></td>');
                            } else if(rp_bv.loai_rp == 2){
                                testreswr('<td class="col-sm-3"><strong>Hình ảnh không phù hợp</strong></td>');
                               }
                               testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                               
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                           
                                testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_bv.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               }
                               testreswr('<td class="button"><button id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                    }
                    if(rp_bv.da_xem != null) { 
                        testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                        testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_bv.hoten+'</td>');
                        if(rp_bv.loai_rp == 1) {
                            testreswr('<td class="col-sm-3">Nội dung không phù hợp</td>');
                              } else if(rp_bv.loai_rp == 2){ 
                                testreswr('<td class="col-sm-3">Hình ảnh không phù hợp</td>');
                                }
                                testreswr('<td>'+rp_bv.chuthich.substring(0, 50)+'...</td><td>-</td>');
                               testreswr('<td>'+rp_bv.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                               testreswr('<td class="button"><button type="button" class="trash-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                               if(rp_bv.gansao == null){
                               
                                    testreswr('<td class="button"><button type="button" class="star-rpbv" id='+rp_bv.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                                   }
                                    if (rp_bv.gansao == 1){
                                    
                                    testreswr('<td class="button"><button type="button" class="stared-rpbv" id='+rp_bv.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                                   }
                                   testreswr('<td class="button"><button id='+rp_bv.id+' type="button" class="xem-rpbv"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                          
                      } 
            })
        }
        })
    })
}

function getThungrac_rpnd(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err
        client.query('update report_users set thungrac = 1 where id = '+rpid+'');
        client.query('select a.hoten as user_rp, b.hoten as user_birp, report_users.* from report_users inner join users a on report_users.id_user = a.id inner join users b on report_users.id_userrp = b.id where thungrac is null',function(err, rpnd){
            if(err) throw err;
            done();
            var test = rpnd.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
            test.forEach(function(rp_nd){
                if(rp_nd.da_xem == null){
                    testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                    testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rp_nd.user_rp+" </strong></td>");
                    testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                    if(rp_nd.loai_rp == 1){
                        testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                    }
                    else if(rp_nd.loai_rp == 2){
                        testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                    }
                    else if(rp_nd.loai_rp == 3){
                        testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                    }
                    testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rp_nd.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_nd.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               }  
                               testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
                else if(rp_nd.da_xem != null){
                    testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                    testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rp_nd.user_rp+'</td>');
                    testreswr('<td><i class="fas fa-ban"></i>       '+rp_nd.user_birp+'</td>');
                    if(rp_nd.loai_rp == 1){
                        testreswr('<td class="col-sm-3"><strong>Lời lẽ thô tục, kích động người khác</strong></td>'); 
                    }
                    else if(rp_nd.loai_rp == 2){
                        testreswr('<td class="col-sm-3"><strong>Truyền tải thông tin sai lệch, không chính xác</strong></td>');
                    }
                    else if(rp_nd.loai_rp == 3){
                        testreswr('<td class="col-sm-3"><strong>SPAM</strong></td>');
                    }
                    testreswr('<td>'+rp_nd.chuthich.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rp_nd.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rp_nd.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rpnd" id='+rp_nd.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rp_nd.gansao == 1){
                               
                                testreswr('<td class="button"><button type="button" class="stared-rpnd" id='+rp_nd.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rp_nd.id+' type="button" class="xem-rpnd"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
            })
        }
        })
    })
}

function getThungrac_rq(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set thungrac = 1 where id = '+rpid+'');
        client.query('select request.*, users.hoten from request inner join users on request.id_user = users.id where thungrac is null',function(err, request){
            if(err) throw err;
            done();
            var test = request.rows;
            if(test === undefined || test.length == 0){
                testreswr("<h5 id='none-post'>Không có thư</h5>")
            }
            else {
            test.forEach(function(rq){
                if(rq.da_xem == null){
                    testreswr("<tr id='chua_xem' class='table-row' data-href='#'>");
                    testreswr("<td class='col-sm-1'><strong><i class='fas fa-user'></i>        "+rq.hoten+" </strong></td>");
                    if(rq.loai_rq == 1){
                        testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                    }
                    else if(rq.loai_rq == 2){
                        testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                    }
                    else if(rq.loai_rq == 3){
                        testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                    }
                    testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rq.gansao == null){
                           
                                testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rq.gansao == 1){
                                
                                testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
                else if(rq.da_xem != null){
                    testreswr('<tr id="da_xem" class="table-row" data-href="#">');
                    testreswr('<td class="col-sm-1"><i class="fas fa-user"></i>       '+rq.hoten+'</td>');
                    if(rq.loai_rq == 1){
                        testreswr('<td class="col-sm-3"><strong>Hỗ trợ tài khoản</strong></td>'); 
                    }
                    else if(rq.loai_rq == 2){
                        testreswr('<td class="col-sm-3"><strong>Góp ý, yêu cầu chủ đề</strong></td>');
                    }
                    else if(rq.loai_rq == 3){
                        testreswr('<td class="col-sm-3"><strong>Xem xét tham gia đội ngũ Coyome</strong></td>');
                    }
                    testreswr('<td>'+rq.noidung.substring(0, 50)+'...</td><td>-</td>');
                           testreswr('<td>'+rq.created_at+'</td><td><i class="fa fa-envelope-open" style="font-size:20px"></i></td>');
                           testreswr('<td class="button"><button type="button" class="trash-rq" id='+rq.id+'><i style="font-size:19px" class="fa fa-trash"></i></button></td>');
                           if(rq.gansao == null){
                            
                                testreswr('<td class="button"><button type="button" class="star-rq" id='+rq.id+'><i style="font-size:19px" class="fas fa-star"></i></button></td>')
                               }
                                if (rq.gansao == 1){
                               
                                testreswr('<td class="button"><button type="button" class="stared-rq" id='+rq.id+'><i style="font-size:19px;color:yellow" class="fas fa-star"></i></button></td>') 
                               } 
                               testreswr('<td class="button"><button id='+rq.id+' type="button" class="xem-rq"><i style="font-size:19px;" class="fas fa-eye"></i></button></td></tr>');
                }
            })
        }
        })
    })
}

function getThungrac_rpbv_thugansao(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set thungrac = 1 where id='+rpid+'');
        done();
    })
}

function getThungrac_rpnd_thugansao(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set thungrac = 1 where id='+rpid+'');
        done();
    })
}

function getThungrac_rq_thugansao(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set thungrac = 1 where id='+rpid+'');
        done();
    })
}

function getHoantac_rpbv(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set thungrac = null where id='+rpid+'');
        done();
    })
}

function getHoantac_rpnd(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set thungrac = null where id='+rpid+'');
        done();
    })
}

function getHoantac_rq(req, res){
    var idkdv = req.params.idkdv;
    var rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set thungrac = null where id='+rpid+'');
        done();
    })
}

function getTest(req, res){
    // console.log(req.body.text_rpbv);
    idkdv = req.params.idkdv;
    id_rpbv = req.body.text_rpbv;
    id_rpnd = req.body.text_rpnd;
    id_rq = req.body.text_rq
    // console.log(req.body.text_rpnd);
    // console.log(req.body.text_rq);
    if(id_rpbv == "empty"){
        console.log('Không có gì để xóa');
    }
    else{
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from report_bv where id in ('+id_rpbv+')');
        done();
    });
    }
    if(id_rpnd == "empty"){
        console.log('Không có gì để xóa');
    }
    else{
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from report_users where id in ('+id_rpnd+')');
        done();
    });
    }
    if(id_rq == "empty"){
        console.log('Không có gì để xóa');
    }
    else{
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from request where id in ('+id_rq+')');
        done();
    });
    }
    res.send('Đã xóa các mục được chọn');
}

function getThungrac_ctbcbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set thungrac = 1 where id='+rpid+'');
        done();
    })
}

function getThungrac_ctbcnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set thungrac = 1 where id='+rpid+'');
        done();
    })
}

function getThungrac_ctrq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set thungrac = 1 where id='+rpid+'');
        done();
    })
}

function getGansao_ctbcbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set gansao = 1 where id ='+rpid+'')
        client.query('select * from report_bv where id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            // console.log(test);
            testreswr('<div class="tool-box">');
                testreswr('<button id='+idkdv+' class="turn-b" type="button"><i style="font-size:19px" class="fas fa-arrow-left"></i></button>');
                if(test.thungrac == null) { 
                testreswr('<button id='+test.id+' class="thungrac" type="button"><i style="font-size:19px" class="fas fa fa-trash"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="dondep" type="button"><i style="font-size:19px" class="fas fa-recycle"></i></button>');
                testreswr('<button id='+test.id+' class="hoantac" type="button"><i style="font-size:19px;" class="fas fa-undo"></i></button>');
                
                } 
                if(test.gansao == null) {
                testreswr('<button id='+test.id+' class="star" type="button"><i style="font-size:19px" class="fas fa-star"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="stared" type="button"><i style="font-size:19px;color: yellow" class="fas fa-star"></i></button>'); 
                } 
                testreswr('<button class="reply" type="button"><i style="font-size:19px;" class="fas fa-reply"></i></button>');
                testreswr('</div>');
            })
    })
}

function getGansao_ctbcnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set gansao = 1 where id ='+rpid+'')
        client.query('select * from report_users where id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            // console.log(test);
            testreswr('<div class="tool-box">');
                testreswr('<button id='+idkdv+' class="turn-b" type="button"><i style="font-size:19px" class="fas fa-arrow-left"></i></button>');
                if(test.thungrac == null) { 
                testreswr('<button id='+test.id+' class="thungrac" type="button"><i style="font-size:19px" class="fas fa fa-trash"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="dondep" type="button"><i style="font-size:19px" class="fas fa-recycle"></i></button>');
                testreswr('<button id='+test.id+' class="hoantac" type="button"><i style="font-size:19px;" class="fas fa-undo"></i></button>');
                
                } 
                if(test.gansao == null) {
                testreswr('<button id='+test.id+' class="star" type="button"><i style="font-size:19px" class="fas fa-star"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="stared" type="button"><i style="font-size:19px;color: yellow" class="fas fa-star"></i></button>'); 
                } 
                testreswr('<button class="reply" type="button"><i style="font-size:19px;" class="fas fa-reply"></i></button>');
                testreswr('</div>');
            })
    })
}

function getGansao_ctrq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set gansao = 1 where id ='+rpid+'')
        client.query('select * from request where id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            // console.log(test);
            testreswr('<div class="tool-box">');
                testreswr('<button id='+idkdv+' class="turn-b" type="button"><i style="font-size:19px" class="fas fa-arrow-left"></i></button>');
                if(test.thungrac == null) { 
                testreswr('<button id='+test.id+' class="thungrac" type="button"><i style="font-size:19px" class="fas fa fa-trash"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="dondep" type="button"><i style="font-size:19px" class="fas fa-recycle"></i></button>');
                testreswr('<button id='+test.id+' class="hoantac" type="button"><i style="font-size:19px;" class="fas fa-undo"></i></button>');
                
                } 
                if(test.gansao == null) {
                testreswr('<button id='+test.id+' class="star" type="button"><i style="font-size:19px" class="fas fa-star"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="stared" type="button"><i style="font-size:19px;color: yellow" class="fas fa-star"></i></button>'); 
                } 
                testreswr('<button class="reply" type="button"><i style="font-size:19px;" class="fas fa-reply"></i></button>');
                testreswr('</div>');
            })
    })
}

function getGosao_ctbcbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set gansao = null where id ='+rpid+'')
        client.query('select * from report_bv where id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            // console.log(test);
            testreswr('<div class="tool-box">');
                testreswr('<button id='+idkdv+' class="turn-b" type="button"><i style="font-size:19px" class="fas fa-arrow-left"></i></button>');
                if(test.thungrac == null) { 
                testreswr('<button id='+test.id+' class="thungrac" type="button"><i style="font-size:19px" class="fas fa fa-trash"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="dondep" type="button"><i style="font-size:19px" class="fas fa-recycle"></i></button>');
                testreswr('<button id='+test.id+' class="hoantac" type="button"><i style="font-size:19px;" class="fas fa-undo"></i></button>');
                } 
                if(test.gansao == null) {
                testreswr('<button id='+test.id+' class="star" type="button"><i style="font-size:19px" class="fas fa-star"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="stared" type="button"><i style="font-size:19px;color: yellow" class="fas fa-star"></i></button>'); 
                } 
                testreswr('<button class="reply" type="button"><i style="font-size:19px;" class="fas fa-reply"></i></button>');
                testreswr('</div>');
            })
    })
}

function getGosao_ctbcnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set gansao = null where id ='+rpid+'')
        client.query('select * from report_users where id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            // console.log(test);
            testreswr('<div class="tool-box">');
                testreswr('<button id='+idkdv+' class="turn-b" type="button"><i style="font-size:19px" class="fas fa-arrow-left"></i></button>');
                if(test.thungrac == null) { 
                testreswr('<button id='+test.id+' class="thungrac" type="button"><i style="font-size:19px" class="fas fa fa-trash"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="dondep" type="button"><i style="font-size:19px" class="fas fa-recycle"></i></button>');
                testreswr('<button id='+test.id+' class="hoantac" type="button"><i style="font-size:19px;" class="fas fa-undo"></i></button>');
                } 
                if(test.gansao == null) {
                testreswr('<button id='+test.id+' class="star" type="button"><i style="font-size:19px" class="fas fa-star"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="stared" type="button"><i style="font-size:19px;color: yellow" class="fas fa-star"></i></button>'); 
                } 
                testreswr('<button class="reply" type="button"><i style="font-size:19px;" class="fas fa-reply"></i></button>');
                testreswr('</div>');
            })
    })
}

function getGosao_ctrq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    function testreswr(message){ 
        res.write(message, function(err) { 
            res.end(); 
        });
    }
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set gansao = null where id ='+rpid+'')
        client.query('select * from request where id = '+rpid+'',function(err, result){
            if(err) throw err;
            done();
            var test = result.rows[0];
            // console.log(test);
            testreswr('<div class="tool-box">');
                testreswr('<button id='+idkdv+' class="turn-b" type="button"><i style="font-size:19px" class="fas fa-arrow-left"></i></button>');
                if(test.thungrac == null) { 
                testreswr('<button id='+test.id+' class="thungrac" type="button"><i style="font-size:19px" class="fas fa fa-trash"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="dondep" type="button"><i style="font-size:19px" class="fas fa-recycle"></i></button>');
                testreswr('<button id='+test.id+' class="hoantac" type="button"><i style="font-size:19px;" class="fas fa-undo"></i></button>');
                } 
                if(test.gansao == null) {
                testreswr('<button id='+test.id+' class="star" type="button"><i style="font-size:19px" class="fas fa-star"></i></button>');
                } else { 
                testreswr('<button id='+test.id+' class="stared" type="button"><i style="font-size:19px;color: yellow" class="fas fa-star"></i></button>'); 
                } 
                testreswr('<button class="reply" type="button"><i style="font-size:19px;" class="fas fa-reply"></i></button>');
                testreswr('</div>');
            })
    })
}

function getXoa_ctbcbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from report_bv where id='+rpid+'');
        done();
    });
}

function getXoa_ctbcnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from report_users where id='+rpid+'');
        done();
    });
}

function getXoa_ctrq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from request where id='+rpid+'');
        done();
    });
}

function getHoantac_ctbcbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_bv set thungrac = null where id='+rpid+'');
        done();
    });
}

function getHoantac_ctbcnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update report_users set thungrac = null where id='+rpid+'');
        done();
    });
}

function getHoantac_ctrq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('update request set thungrac = null where id='+rpid+'');
        done();
    });
}

function getXoareply_rpbv(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpbv where id='+rpid+'');
        done();
    });
}

function getXoareply_rpnd(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpnd where id='+rpid+'');
        done();
    });
}

function getXoareply_rpnd_admin(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpnd_admin where id='+rpid+'');
        done();
    });
}

function getXoareply_rq(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_request where id='+rpid+'');
        done();
    });
}

function getXoareply_rq_admin(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_request_admin where id='+rpid+'');
        done();
    });
}

function getXoareply_rpbv_chitiet(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpbv where id='+rpid+'');
        done();
    });
}

function getXoareply_rpnd_chitiet(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpnd where id='+rpid+'');
        done();
    });
}

function getXoareply_rpnd_chitiet_admin(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_rpnd_admin where id='+rpid+'');
        done();
    });
}

function getXoareply_rq_chitiet_admin(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_request_admin where id='+rpid+'');
        done();
    });
}

function getXoareply_rq_chitiet(req, res){
    idkdv = req.params.idkdv;
    rpid = req.params.rpid;
    pool.connect(function(err, client, done){
        if(err) throw err;
        client.query('delete from reply_request where id='+rpid+'');
        done();
    });
}

module.exports = {
    getFilter: getFilter,
    getFilter1: getFilter1,
    getFilter2: getFilter2,
    getmucthu: getmucthu,
    getGansao_rpbv: getGansao_rpbv,
    getGosao_rpbv: getGosao_rpbv,
    getGansao_rpnd: getGansao_rpnd,
    getGosao_rpnd: getGosao_rpnd,
    getGansao_rq: getGansao_rq,
    getGosao_rq: getGosao_rq,
    getGosao_rpbv_gansao: getGosao_rpbv_gansao,
    getGosao_rpnd_gansao: getGosao_rpnd_gansao,
    getGosao_rq_gansao: getGosao_rq_gansao,
    getThungrac_rpbv: getThungrac_rpbv,
    getThungrac_rpnd: getThungrac_rpnd,
    getThungrac_rq: getThungrac_rq,
    getThungrac_rpbv_thugansao: getThungrac_rpbv_thugansao,
    getThungrac_rpnd_thugansao: getThungrac_rpnd_thugansao,
    getThungrac_rq_thugansao: getThungrac_rq_thugansao,
    getHoantac_rpbv: getHoantac_rpbv,
    getHoantac_rpnd: getHoantac_rpnd,
    getHoantac_rq: getHoantac_rq,
    getTest: getTest,
    getXoa_ctbcbv: getXoa_ctbcbv,
    getGansao_ctbcbv: getGansao_ctbcbv,
    getGosao_ctbcbv: getGosao_ctbcbv,
    getThungrac_ctbcbv: getThungrac_ctbcbv,
    getHoantac_ctbcbv: getHoantac_ctbcbv,
    getXoareply_rpbv: getXoareply_rpbv,
    getXoareply_rpbv_chitiet: getXoareply_rpbv_chitiet,
    getThungrac_ctbcnd: getThungrac_ctbcnd,
    getGansao_ctbcnd: getGansao_ctbcnd,
    getGosao_ctbcnd: getGosao_ctbcnd,
    getXoa_ctbcnd: getXoa_ctbcnd,
    getHoantac_ctbcnd: getHoantac_ctbcnd,
    getXoareply_rpnd: getXoareply_rpnd,
    getXoareply_rpnd_chitiet: getXoareply_rpnd_chitiet,
    getThungrac_ctrq: getThungrac_ctrq,
    getGansao_ctrq: getGansao_ctrq,
    getGosao_ctrq: getGosao_ctrq,
    getXoa_ctrq: getXoa_ctrq,
    getHoantac_ctrq: getHoantac_ctrq,
    getXoareply_rq: getXoareply_rq,
    getXoareply_rq_chitiet: getXoareply_rq_chitiet,
    getXoareply_rpnd_admin: getXoareply_rpnd_admin,
    getXoareply_rpnd_chitiet_admin: getXoareply_rpnd_chitiet_admin,
    getXoareply_rq_admin: getXoareply_rq_admin,
    getXoareply_rq_chitiet_admin: getXoareply_rq_chitiet_admin
}