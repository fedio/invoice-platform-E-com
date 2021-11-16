const router = require("express").Router();
const verifyToken = require ("../middlewares/verifyToken");
const invoiceControllers = require ("../controllers/invoice.controllers");
router.get('/',verifyToken, invoiceControllers.getInvoices);
router.post("/", verifyToken , invoiceControllers.createInvoice);
module.exports = router;