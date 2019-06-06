var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var express = require('express');
var router = express.Router();
var kdv = require('../queries/kdv');
var ajax = require('../queries/ajax');

/* GET users listing. */
router.get('/:idkdv', kdv.getModDB);
//get post details
router.get('/:idkdv/baiviet/:idbv', kdv.getBv_KDV);
router.post('/:idkdv/duyet_thongqua/:idbv', urlencodedParser, kdv.post_approve);
router.post('/:idkdv/duyet_tuchoi/:idbv', urlencodedParser, kdv.post_decline);
//get mailbox db
router.get('/:idkdv/hopthu', kdv.getMailbox);
router.get('/:idkdv/thugansao', kdv.getMailGansao);
router.get('/:idkdv/thungrac',kdv.getMailThungrac);
router.get('/:idkdv/thudagui',kdv.getMailThudagui);
router.get('/:idkdv/thuguiad',kdv.getMailThuguiad);
//get chitiet rpbv
router.get('/:idkdv/bcbv/:idprbv',kdv.getChitietrpbv);
router.get('/:idkdv/bcnd/:idprbv',kdv.getChitietrpnd);
router.get('/:idkdv/yc/:idprbv',kdv.getChitietrq);
//post reply
router.post('/:idkdv/reply_rpbv/:rpid',urlencodedParser, kdv.post_reply_rpbv);
router.post('/:idkdv/reply_rpnd/:rpid',urlencodedParser, kdv.post_reply_rpnd);
router.post('/:idkdv/reply_rq/:rpid',urlencodedParser, kdv.post_reply_rq);

router.post('/:idkdv/reply_rpnd_admin/:rpid',urlencodedParser, kdv.post_reply_rpnd_admin);
router.post('/:idkdv/reply_rq_admin/:rpid',urlencodedParser, kdv.post_reply_rq_admin);
//get chitiet reply
router.get('/:idkdv/xemreply_rpbv/:rpid',kdv.getChitietReply_rpbv);
router.get('/:idkdv/xemreply_rpnd/:rpid',kdv.getChitietReply_rpnd);
router.get('/:idkdv/xemreply_rpnd_admin/:rpid',kdv.getChitietReply_rpnd_admin);
router.get('/:idkdv/xemreply_rq/:rpid',kdv.getChitietReply_rq);
router.get('/:idkdv/xemreply_rq_admin/:rpid',kdv.getChitietReply_rq_admin);
//ajax filter
router.get('/ajax/:idkdv/filter/:idbv', ajax.getFilter);
router.get('/ajax/:idkdv/filter1/:idbv', ajax.getFilter1);
router.get('/ajax/:idkdv/filter2/:idbv',ajax.getFilter2);
//ajax get mucthu
router.get('/ajax/:idkdv/loaimucthu/:loaimucthu',ajax.getmucthu);
router.get('/ajax/:idkdv/gansao_rpbv/:rpid',ajax.getGansao_rpbv);
router.get('/ajax/:idkdv/gosao_rpbv/:rpid',ajax.getGosao_rpbv);
router.get('/ajax/:idkdv/gansao_rpnd/:rpid',ajax.getGansao_rpnd);
router.get('/ajax/:idkdv/gosao_rpnd/:rpid',ajax.getGosao_rpnd);
router.get('/ajax/:idkdv/gansao_rq/:rpid',ajax.getGansao_rq);
router.get('/ajax/:idkdv/gosao_rq/:rpid',ajax.getGosao_rq);
router.get('/ajax/:idkdv/gosao_rpbv_gansao/:rpid',ajax.getGosao_rpbv_gansao);
router.get('/ajax/:idkdv/gosao_rpnd_gansao/:rpid',ajax.getGosao_rpnd_gansao);
router.get('/ajax/:idkdv/gosao_rq_gansao/:rpid',ajax.getGosao_rq_gansao);
router.get('/ajax/:idkdv/thungrac_rpbv/:rpid',ajax.getThungrac_rpbv);
router.get('/ajax/:idkdv/thungrac_rpnd/:rpid',ajax.getThungrac_rpnd);
router.get('/ajax/:idkdv/thungrac_rq/:rpid',ajax.getThungrac_rq)
router.get('/ajax/:idkdv/thungrac_rpbv_thugansao/:rpid',ajax.getThungrac_rpbv_thugansao);
router.get('/ajax/:idkdv/thungrac_rpnd_thugansao/:rpid',ajax.getThungrac_rpnd_thugansao);
router.get('/ajax/:idkdv/thungrac_rq_thugansao/:rpid',ajax.getThungrac_rq_thugansao);
router.get('/ajax/:idkdv/hoantac_rpbv/:rpid',ajax.getHoantac_rpbv);
router.get('/ajax/:idkdv/hoantac_rpnd/:rpid',ajax.getHoantac_rpnd);
router.get('/ajax/:idkdv/hoantac_rq/:rpid',ajax.getHoantac_rq);
router.post('/ajax/:idkdv/test',ajax.getTest);
//ajax get chitiet
router.get('/ajax/:idkdv/thungrac_ctbcbv/:rpid',ajax.getThungrac_ctbcbv);
router.get('/ajax/:idkdv/thungrac_ctbcnd/:rpid',ajax.getThungrac_ctbcnd);
router.get('/ajax/:idkdv/thungrac_ctrq/:rpid',ajax.getThungrac_ctrq);

router.get('/ajax/:idkdv/gansao_ctbcbv/:rpid',ajax.getGansao_ctbcbv);
router.get('/ajax/:idkdv/gansao_ctbcnd/:rpid',ajax.getGansao_ctbcnd);
router.get('/ajax/:idkdv/gansao_ctrq/:rpid',ajax.getGansao_ctrq);

router.get('/ajax/:idkdv/gosao_ctbcbv/:rpid',ajax.getGosao_ctbcbv);
router.get('/ajax/:idkdv/gosao_ctbcnd/:rpid',ajax.getGosao_ctbcnd);
router.get('/ajax/:idkdv/gosao_ctrq/:rpid',ajax.getGosao_ctrq);

router.get('/ajax/:idkdv/xoa_ctbcbv/:rpid',ajax.getXoa_ctbcbv);
router.get('/ajax/:idkdv/xoa_ctbcnd/:rpid',ajax.getXoa_ctbcnd);
router.get('/ajax/:idkdv/xoa_ctrq/:rpid',ajax.getXoa_ctrq);

router.get('/ajax/:idkdv/hoantac_ctbcbv/:rpid',ajax.getHoantac_ctbcbv);
router.get('/ajax/:idkdv/hoantac_ctbcnd/:rpid',ajax.getHoantac_ctbcnd);
router.get('/ajax/:idkdv/hoantac_ctrq/:rpid',ajax.getHoantac_ctrq);
//ajax thu tra loi
router.get('/ajax/:idkdv/xoareply_rpbv/:rpid',ajax.getXoareply_rpbv);
router.get('/ajax/:idkdv/xoareply_rpnd/:rpid',ajax.getXoareply_rpnd);
router.get('/ajax/:idkdv/xoareply_rpnd_admin/:rpid',ajax.getXoareply_rpnd_admin);
router.get('/ajax/:idkdv/xoareply_rq/:rpid',ajax.getXoareply_rq);
router.get('/ajax/:idkdv/xoareply_rq_admin/:rpid',ajax.getXoareply_rq_admin);

router.get('/ajax/:idkdv/xoareply_rpbv_chitiet/:rpid',ajax.getXoareply_rpbv_chitiet);
router.get('/ajax/:idkdv/xoareply_rpnd_chitiet/:rpid',ajax.getXoareply_rpnd_chitiet);
router.get('/ajax/:idkdv/xoareply_rq_chitiet/:rpid',ajax.getXoareply_rq_chitiet);
router.get('/ajax/:idkdv/xoareply_rpnd_chitiet_admin/:rpid',ajax.getXoareply_rpnd_chitiet_admin);
router.get('/ajax/:idkdv/xoareply_rq_chitiet_admin/:rpid',ajax.getXoareply_rq_chitiet_admin);
module.exports = router;
