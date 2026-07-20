const express = require("express");
const router = express.Router();

const verifyTokenAndAuthenticateUser = require("../middlewares/auth.middleware");

const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    markServiceAsPaid,
    getUpcomingServices,
    getOverdueServices,
    getMonthlyExpense,
    getAnalytics
} = require("../controllers/service.controller");



router.post("/create",verifyTokenAndAuthenticateUser,createService);

router.get("/all",verifyTokenAndAuthenticateUser,getAllServices);

router.get("/:id",verifyTokenAndAuthenticateUser,getServiceById);

router.patch("/update/:id",verifyTokenAndAuthenticateUser,updateService);

router.delete("/delete/:id",verifyTokenAndAuthenticateUser,deleteService);

router.patch("/mark-paid/:id",verifyTokenAndAuthenticateUser,markServiceAsPaid);

router.get("/upcoming",verifyTokenAndAuthenticateUser,getUpcomingServices);

router.get("/overdue",verifyTokenAndAuthenticateUser,getOverdueServices);

router.get("/monthly-expense",verifyTokenAndAuthenticateUser,getMonthlyExpense);

router.get("/analytics",verifyTokenAndAuthenticateUser,getAnalytics);

module.exports = router;