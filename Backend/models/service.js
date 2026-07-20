const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema(
{
    amount:
    {
        type: Number,
        required: true,
        min: 0
    },

    paidOn:
    {
        type: Date,
        required: true
    },

    paymentMethod:
    {
        type: String,
        enum:
        [
            "Cash",
            "UPI",
            "Credit Card",
            "Debit Card",
            "Net Banking",
            "Wallet",
            "Auto Pay",
            "Other"
        ],
        default: "UPI"
    },

    transactionId:
    {
        type: String,
        default: ""
    },

    notes:
    {
        type: String,
        default: ""
    }
},
{ _id: false });

const ServiceSchema = new mongoose.Schema(
{
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name:
    {
        type: String,
        required: true,
        trim: true
    },

    category:
    {
        type: String,
        required: true,
        enum:
        [
            "Electricity",
            "Water",
            "Gas",
            "Internet",
            "Mobile Recharge",
            "Landline",
            "DTH",

            "Netflix",
            "Amazon Prime",
            "Disney+",
            "JioHotstar",
            "Sony LIV",
            "Zee5",
            "Spotify",
            "Apple Music",
            "YouTube Premium",
            "Google One",
            "iCloud",

            "Insurance",
            "Health Insurance",
            "Vehicle Insurance",
            "Life Insurance",

            "Loan EMI",
            "Credit Card",

            "Gym",
            "Maintenance",
            
            "Other"
        ]
    },

    provider:
    {
        type: String,
        trim: true,
        default: ""
    },

    accountNumber:
    {
        type: String,
        trim: true,
        default: ""
    },

    billingCycle:
    {
        type: String,
        enum:
        [
            "Weekly",
            "Monthly",
            "Quarterly",
            "Half-Yearly",
            "Yearly",
            "One Time"
        ],
        default: "Monthly"
    },

    expectedAmount:
    {
        type: Number,
        default: 0,
        min: 0
    },

    dueDate:
    {
        type: Date,
        required: true
    },

    nextDueDate:
    {
        type: Date
    },

    autoPay:
    {
        type: Boolean,
        default: false
    },

    reminderDaysBefore:
    {
        type: Number,
        default: 3,
        min: 0
    },

    status:
    {
        type: String,
        enum:
        [
            "Active",
            "Paused",
            "Cancelled"
        ],
        default: "Active"
    },

    paymentHistory:
    {
        type: [PaymentSchema],
        default: []
    },

    attachments:
    [
        {
            type: Schema.Types.ObjectId,
            ref: "Document"
        }
    ],

    notes:
    {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Service", ServiceSchema);