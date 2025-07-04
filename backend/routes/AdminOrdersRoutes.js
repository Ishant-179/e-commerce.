const express = require("express")
const Order = require("../models/Order")
const { protect, admin } = require("../middlewares/authMiddleware")

const router = express.Router();


//@route GET/api/admin/orders
//@desc Get all orders (Admin Only)
//@access Private/Admin

router.get("/", protect, admin, async (req, res) => {
   
    try {
         const order = await Order.find({}).populate("user", "name  email");
         res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

//@route PUT /api/admin/orders/:id
//desc Update order Status
//@access Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = 
            req.body.status === "Delivered"? true : order.isDelivered;
            order.deliveredAt =
            req.body.status === "Delivered"? Date.now(): order.deliveredAt;

            const updateOrder = await order.save()
            res.json(updateOrder);
        } else {
            res.status(404).json({ message: "Order Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : "Server Error" });
    }
})

//@route DELETE /api/admin/orders/:id
//@desc Delete order
//@access Private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
    
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
        await order.deleteOne()
        res.json({ message: "Order Removed" }); 
        } else {
            res.status(404).json({ message: "Order Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
})


module.exports = router;