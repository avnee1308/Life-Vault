const express = require('express');
const path = require('path');
const Service = require("../models/service.model");

module.exports.createService = async (req, res) => 
{
    try 
    {
        const service = await Service.create(
        {
            ...req.body,
            owner: req.user._id
        });
        return res.status(201).json(
        {
            message: "Service created successfully.",
            service
        });
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.getAllServices = async (req, res) => 
{
    try 
    {
        const services = await Service.find(
        {
            owner: req.user._id
        }).sort({ dueDate: 1 });
        return res.status(200).json(services);
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.getServiceById = async (req, res) => 
{
    try 
    {
        const service = await Service.findOne(
        {
            _id: req.params.id,
            owner: req.user._id
        });
        if (!service) 
        {
            return res.status(404).json(
            {
                message: "Service not found."
            });
        }
        return res.status(200).json(
            {
                service
            }
        );
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message,
            err
        });
    }
};

module.exports.updateService = async (req, res) => 
{
    try 
    {
        const service = await Service.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!service) 
        {
            return res.status(404).json(
            {
                message: "Service not found."
            });
        }
        return res.status(200).json(
        {
            message: "Service updated successfully.",
            service
        });
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.deleteService = async (req, res) => 
{
    try 
    {
        const service = await Service.findOneAndDelete(
        {
            _id: req.params.id,
            owner: req.user._id
        });
        if (!service) 
        {
            return res.status(404).json(
            {
                message: "Service not found."
            });
        }
        return res.status(200).json(
        {
            message: "Service deleted successfully."
        });
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.markServiceAsPaid = async (req, res) => 
{
    try 
    {
        const service = await Service.findOne(
        {
            _id: req.params.id,
            owner: req.user._id
        });
        if (!service) 
        {
            return res.status(404).json(
            {
                message: "Service not found."
            });
        }
        service.paymentHistory.push(req.body);
        await service.save();
        return res.status(200).json(
        {
            message: "Payment added successfully.",
            service
        });
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.getUpcomingServices = async (req, res) => 
{
    try 
    {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        const services = await Service.find(
        {
            owner: req.user._id,
            dueDate:{
                        $gte: today,
                        $lte: nextWeek
                    },
            status: "Active"
        }).sort({ dueDate: 1 });
        return res.status(200).json(services);
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.getOverdueServices = async (req, res) => 
{
    try 
    {
        const services = await Service.find(
        {
            owner: req.user._id,
            dueDate:{
                        $lt: new Date()
                    },
            status: "Active"
        }).sort({ dueDate: 1 });
        return res.status(200).json(services);
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.getMonthlyExpense = async (req, res) => 
{
    try 
    {
        const services = await Service.find(
        {
            owner: req.user._id,
            status: "Active"
        });
        const total = services.reduce((sum, service) => 
        {
            return sum + (service.expectedAmount || 0);
        }, 0);
        return res.status(200).json(
        {
            monthlyExpense: total
        });
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};

module.exports.getAnalytics = async (req, res) => 
{
    try {
        const services = await Service.find(
        {
            owner: req.user._id
        });
        const analytics = 
        {
            totalServices: services.length,

            activeServices: services.filter(
                s => s.status === "Active"
            ).length,

            pausedServices: services.filter(
                s => s.status === "Paused"
            ).length,

            cancelledServices: services.filter(
                s => s.status === "Cancelled"
            ).length,

            monthlyExpense: services.reduce(
                (sum, s) => sum + (s.expectedAmount || 0),
                0
            ),

            totalPayments: services.reduce(
                (sum, s) => sum + s.paymentHistory.length,
                0
            )
        };
        return res.status(200).json(analytics);
    } 
    catch (err) 
    {
        return res.status(500).json(
        {
            message: err.message
        });
    }
};