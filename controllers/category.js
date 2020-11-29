const Category = require("../models/category");

exports.getCategorybyId = (req, res, next, id ) => {
    Category.findById(id).exec((err, category) => {
            if(err || !category){
                return res.status(400).json({
                    error: "NO category(s) found"
                })
            }
        req.category = category;
        next();
    })
    //check here for any errors
}

exports.createCategory = (req, res) => {
        const category = new Category(req.body)
        category.save((err, category) => {
            if(err){
                res.status(400).json({
                    error: "Unable to update catgeory in DB"
                })
            }

            res.json(category);
        })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "No Categories found"
            })
        }
        return res.json(categories);
    })
}

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Category updation failed"
            })
        }
        res.json(updatedCategory);
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Unable to delete category"
            })
        }

        res.json({
            message: `${category.name} successfully deleted from DB`
        })
    })
}