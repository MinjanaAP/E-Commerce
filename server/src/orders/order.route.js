const express = require('express');
const router = express.Router();
const Order = require('./orders.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sendTrackingNumber = require("../utils/sendTrackingNumber")

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
    const { products} = req.body; // Extract `products` and `userId` from the request body
    try {
        // Map products to Stripe line items
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(product.price * 100), // Convert price to cents
            },
            quantity: product.quantity,
        }));
        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/cancel',
        });
        res.json({ id: session.id, message: 'Order created successfully' });
    } catch (error) {
        console.error("Error creating checkout session", error);
        res.status(500).send({ message: "Failed to create checkout session" });
    }
});

// Confirm payment
router.post('/confirm-payment', async (req, res) => {
    const { session_id } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items', 'payment_intent'],
        });

        const paymentIntentId = session.payment_intent.id;
        let order = await Order.findOne({ orderId: paymentIntentId });

        if (!order) {
            const lineItems = session.line_items.data.map((item) => ({
                productId: item.price.product, // Ensure Stripe product ID matches the database
                quantity: item.quantity,
            }));

            const amount = session.amount_total / 100; // Convert amount to dollars
            order = new Order({
                orderId: paymentIntentId,
                amount,
                products: lineItems,
                email: session.customer_details.email, // Retrieve email from session
                status: session.payment_status === "paid" ? 'pending' : 'failed',
            });
            await order.save(); // Save the order
             sendTrackingNumber(session.customer_details.name,session.customer_details.email,order._id);
             
        }

        res.json({ message: "Payment confirmed and order updated", order });
    } catch (error) {
        console.error("Error confirming payment:", error);
        res.status(500).json({ error: "Failed to confirm payment" });
    }
});

//get order by email
router.get('/:email', async(req,res)=>{
    const email = req.params.email;
    if(!email){
        return res.status(400).send({message: "email is required"});
    }
    try {
        const orders = await Order.find({email: email});

        if(orders.length === 0 || !orders){
            return res.status(400).send({orders:0, message: "no orders found for this email"});
        }
        res.status(200).send({orders});
    } catch (error) {
        console.error("Error fetching orders by email",email);
        res.status(500).send({message:"failed to fetch orders by email"})
    }
});

//get order by id
router.get('/order/:id', async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).send({message: "order not found"})
        }
        res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching orders by email",email);
        res.status(500).send({message:"failed to fetch orders by email"})
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (orders.length === 0) {
            return res.status(404).send({ message: "No orders found", orders: [] });
        }

        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching all orders", error);
        res.status(500).send({ message: "Failed to fetch all orders" });
    }
});

// Update order status
router.patch("/update-order-status/:id", async (req, res) => {
    const { id } = req.params; // Extract order ID from URL parameters
    const { status } = req.body; 
    if (!status) {
        return res.status(400).send({ message: "Status is required" });
    }
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, updatedAt: new Date(),},
            {new: true,runValidators: true,}
        );
        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error updating order status", error);
        res.status(500).send({ message: "Failed to update order status" });
    }
});

// Delete order
router.delete('/delete-order/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order deleted successfully",
            order: deletedOrder,
        });
    } catch (error) {
        console.error("Error deleting order", error);
        res.status(500).send({ message: "Failed to delete order" });
    }
});


module.exports = router;
