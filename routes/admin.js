var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var express = require('express');
var router = express.Router();
var admin = require('../queries/admin');
var ajax = require('../queries/ajax_admin');
var passport = require("passport");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuidv4');
const LocalStrategy = require('passport-local').Strategy;

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


/* GET admin login form */
router.get('/login', admin.getLoginform);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
    }));
    pool.connect(function(err, client, done){
        if(err) throw err;
        // done()
    passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
 
        loginAttempt();
        async function loginAttempt() {
        
        try{
        var currentAccountsData =  JSON.stringify(
            
            client.query('SELECT id, "hoten", "ten_dn", "password", "id_gr" FROM "users" WHERE "ten_dn"=$1 AND "id_gr"=$2', [username,2], function(err, result) {
        
        if(err) {
        return done(err)
        } 
        if(result.rows[0] == null){
        req.flash('danger', "Oops. Incorrect login details.");
        return done(null, false);
        }
        else{
        bcrypt.compare(password, result.rows[0].password, function(err, check) {
        if (err){
        console.log('Error while checking password');
        return done();
        }
        else if (check){
        return done(null, {id: result.rows[0].id, ten_dn: result.rows[0].ten_dn, hoten: result.rows[0].hoten});
        }
        else{
        req.flash('danger', "Oops. Incorrect login details.");
        return done(null, false);
        }
        });
        }
        })
    
        )
    
        }
        
        catch(e){throw (e);}
        };
        
       }
       ))
       passport.serializeUser(function(user, done) {
        done(null, user);
        // console.log(user);
       });
       passport.deserializeUser(function(user, done) {
        done(null, user);
        // console.log(user);
       });
    })
//logout
router.get('/logout',admin.getLogout);
//after login
router.get('/dashboard',admin.getDB_admin);
router.get('/xemchitiet/:idnd',admin.getChitiet_nd);
router.get('/baiviet_nd',admin.getBaivietDB);
router.get('/xemchitiet_baiviet/:idbv',admin.getBaiviet_chitiet);
router.get('/chude_db',admin.getChude_db);
router.get('/xemchitiet_chude/:idcd',admin.getChitiet_cd);
router.get('/phanquyen_db/',admin.getPhanquyen_db);
router.get('/hopthu',admin.getHopthu);
router.get('/xemchitiet_rpnd/:idrpnd',admin.getXemchitiet_rpnd);
router.get('/xemchitiet_rq/:idrq',admin.getXemchitiet_rq);
//Post chude
router.post('/thayanh_cd/:idcd',admin.postDoianh);
router.post('/thaydoi_mota/:idcd',admin.post_doimota);
//Post decu
router.post('/post_decu/:idnd',admin.post_decu);
//ajax
router.get('/ajax_admin/filter/:idloaind', ajax.getFilter_nd);
router.get('/ajax_admin/:idnd/filter_nd_bv/:loaidg',ajax.getFilter_nd_bv);
router.get('/ajax_admin/xoand_chitiet/:idnd',ajax.getXoand_chitiet);
router.get('/ajax_admin/loc_danhgia/:danhgia',ajax.loc_danhgia);
router.get('/ajax_admin/loc_chude/:idcd',ajax.loc_chude);
router.get('/ajax_admin/xoa_bv/:idbv',ajax.xoa_bv);
router.get('/ajax_admin/tamhoan_cd/:idcd',ajax.getTamhoan_cd);
router.get('/ajax_admin/botamhoan_cd/:idcd',ajax.getBoTamhoan_cd);
router.get('/ajax_admin/loc_phanquyen/:idnd',ajax.getLoc_pq);
router.get('/ajax_admin/show_formpq/:idnd',ajax.showForm_pq);
router.get('/ajax_admin/:idcv/phanquyen_ngdung/:idnd',ajax.phanquyen_ngdung);
router.get('/ajax_admin/xoa_rpnd/:idrpnd',ajax.xoa_rpnd);
router.get('/ajax_admin/xoa_rq/:idrq',ajax.xoa_rq);
router.get('/ajax_admin/ban_chitiet/:idnd',ajax.ban_nd);
router.get('/ajax_admin/goban_chitiet/:idnd',ajax.goban_nd);
router.get('/ajax_admin/bo_decu/:idnd',ajax.bo_decu);
module.exports = router;