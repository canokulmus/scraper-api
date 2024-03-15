'use strict'

const Food = require('../models/food')
const Vitamin = require("../models/vitamin")
const Category = require("../models/category")
const Cousine = require('../models/cousine')
const UserFood = require('../models/userFood')
const { stringToObjectId } = require('../helpers/stringToObjectId')

module.exports = {
    createVitamin: (req, res, next) => {
        const { name } = req.body
        if (name) {
            Vitamin.create({ ...req.body, created: Date.now() }, (err, vitamin) => {
                if (err) {
                    next(err)
                } else {
                    res.json({
                        code: 200,
                        data: vitamin
                    })
                }
            })
        } else {
            res.json({
                code: 200,
                message: "Vitamin adı gerekli."
            })
        }
    },

    updateVitamin: (req, res, next) => {
        const { id } = req.body
        if (id) {
            Vitamin.findByIdAndUpdate(id, { ...req.body }, { new: true })
                .exec((err, vitamin) => {
                    if (err) {
                        next(err)
                    } else {
                        res.json({
                            code: 200,
                            data: vitamin
                        })
                    }
                })
        } else {
            res.json({
                code: 403,
                message: "Vitamin bilgileri gerekli"
            })
        }
    },

    getVitamins: async (req, res, next) => {
        try {
            let vitamins = await Vitamin.aggregate([
                {
                    $sort: { name: 1 }
                },
                {
                    $facet: {
                        count: [
                            {
                                $count: 'count'
                            }
                        ],
                        data: [
                            { $sort: { name: 1 } },
                        ]
                    }
                },
            ])
            let count = vitamins.length > 0 ? (vitamins[0].count.length > 0 ? vitamins[0].count[0].count : 0) : 0
            vitamins = vitamins.length > 0 ? vitamins[0].data : []

            res.json({
                code: 200,
                total: count,
                data: vitamins,
            })

        } catch (err) {
            next(err)
        }
    },

    createCousine: (req, res, next) => {
        const { name } = req.body
        if (name) {
            Cousine.create({ ...req.body, created: Date.now() }, (err, cousine) => {
                if (err) {
                    next(err)
                } else {
                    res.json({
                        code: 200,
                        data: cousine
                    })
                }
            })
        } else {
            res.json({
                code: 200,
                message: "Mutfak adı gerekli."
            })
        }
    },

    updateCousine: (req, res, next) => {
        const { id } = req.body
        if (id) {
            Cousine.findByIdAndUpdate(id, { ...req.body }, { new: true })
                .exec((err, cousine) => {
                    if (err) {
                        next(err)
                    } else {
                        res.json({
                            code: 200,
                            data: cousine
                        })
                    }
                })
        } else {
            res.json({
                code: 403,
                message: "Mutfak bilgileri gerekli"
            })
        }
    },

    getCousines: async (req, res, next) => {
        try {
            let cousines = await Cousine.aggregate([
                {
                    $sort: { name: 1 }
                },
                {
                    $facet: {
                        count: [
                            {
                                $count: 'count'
                            }
                        ],
                        data: [
                            { $sort: { name: 1 } },
                        ]
                    }
                },
            ])
            let count = cousines.length > 0 ? (cousines[0].count.length > 0 ? cousines[0].count[0].count : 0) : 0
            cousines = cousines.length > 0 ? cousines[0].data : []

            res.json({
                code: 200,
                total: count,
                data: cousines,
            })

        } catch (err) {
            next(err)
        }
    },

    createCategory: (req, res, next) => {
        const { name } = req.body
        if (name) {
            Category.create({ ...req.body, created: Date.now() }, (err, category) => {
                if (err) {
                    next(err)
                } else {
                    res.json({
                        code: 200,
                        data: category
                    })
                }
            })
        } else {
            res.json({
                code: 200,
                message: "Kategori adı gerekli."
            })
        }
    },

    updateCategory: (req, res, next) => {
        const { id } = req.body
        if (id) {
            Category.findByIdAndUpdate(id, { ...req.body }, { new: true })
                .exec((err, category) => {
                    if (err) {
                        next(err)
                    } else {
                        res.json({
                            code: 200,
                            data: category
                        })
                    }
                })
        } else {
            res.json({
                code: 403,
                message: "Kategori bilgileri gerekli"
            })
        }
    },

    getCategories: async (req, res, next) => {
        const { isSimple, isMultiple, isMeal } = req.body
        let andArray = [{ isActive: true }]

        if (isSimple) {
            andArray = [
                ...andArray,
                { isSimple: true }
            ]
        }

        if (isMultiple) {
            andArray = [
                ...andArray,
                { isMultiple: true }
            ]
        }

        if (isMeal) {
            andArray = [
                ...andArray,
                { isMeal: true }
            ]
        }

        let qq = { $and: andArray }

        try {
            let categories = await Category.aggregate([
                {
                    $match: qq
                },
                {
                    $sort: { name: 1 }
                },
                {
                    $facet: {
                        count: [
                            {
                                $count: 'count'
                            }
                        ],
                        data: [
                            { $sort: { name: 1 } },
                        ]
                    }
                },
            ])
            let count = categories.length > 0 ? (categories[0].count.length > 0 ? categories[0].count[0].count : 0) : 0
            categories = categories.length > 0 ? categories[0].data : []

            res.json({
                code: 200,
                total: count,
                data: categories,
            })

        } catch (err) {
            next(err)
        }
    },

    createFood: (req, res, next) => {
        const { name } = req.body
        if (name) {
            Food.create(req.body, (err, food) => {
                if (err) {
                    next(err)
                } else {
                    res.json({
                        code: 200,
                        data: food
                    })
                }
            })
        } else {
            res.json({
                code: 403,
                message: "Besin adı gerekli."
            })
        }
    },

    updateFood: (req, res, next) => {
        const { id } = req.body
        if (id) {
            Food.findByIdAndUpdate(id, { ...req.body }, { new: true })
                .exec((err, food) => {
                    if (err) {
                        next(err)
                    } else {
                        res.json({
                            code: 200,
                            data: food
                        })
                    }
                })
        } else {
            res.json({
                code: 403,
                message: "Besin bilgileri gerekli"
            })
        }
    },

    getMultipleFoodsBySimpleGradient: async (req, res, next) => {

        const { id } = req.body;

        let foods = await Food.aggregate([

            { $match: { foods: stringToObjectId(id) } }

        ])

        res.json({
            code: 200,
            data: foods,
        })

    },

    getFoodsByIdArray: async (req, res, next) => {

        let { ids } = req.body;

        if (ids === null) {
            res.json({
                code: 200,
                data: [],
            })

        } else {

            ids = ids.map(id => stringToObjectId(id))

            let foods = await Food.aggregate([
                { $match: { _id: { $in: ids } } }
            ])

            res.json({
                code: 200,
                data: foods,
            })
        }

    },

    getFood: async (req, res, next) => {
        const { id, url, customer } = req.body
        if (id || url) {

            let query = {}
            if (id) {
                query = { _id: stringToObjectId(id) }
            }
            if (url) {
                query = { url }
            }
            try {
                let aggs = [Food.aggregate([
                    {
                        $match: query
                    },
                    {
                        $lookup: {
                            from: "foods",
                            foreignField: "_id",
                            localField: "foods",
                            as: "foods"
                        }
                    },
                    {
                        $lookup: {
                            from: "nutritionists",
                            foreignField: "_id",
                            localField: "nutritionist",
                            as: "nutritionist"
                        }
                    },
                    {
                        $unwind: {
                            path: "$nutritionist",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                ])]

                if (customer && id) {
                    aggs = [
                        ...aggs,
                        UserFood.aggregate([
                            {
                                $match: { customer: stringToObjectId(customer), food: stringToObjectId(id) }
                            },
                            {
                                $project: { _id: 1, isFavorite: 1 }
                            }
                        ])
                    ]
                }

                let ress = await Promise.all(aggs)

                let food = ress.length > 0 ? ress[0] : []
                let isFavorite = ress.length > 1 ? (ress[1][0] ? ({ bool: ress[1][0].isFavorite || null, id: ress[1][0]._id || null }) : null) : null
                res.json({
                    code: 200,
                    isFavorite,
                    data: food.length > 0 ? food[0] : {},
                })
            } catch (err) {
                next(err)
            }
        } else {
            res.json({ code: 403 })
        }
    },

    getFoods: async (req, res, next) => {

        const skip = req.body.skip ? parseInt(req.body.skip) : 0
        const limit = req.body.limit ? parseInt(req.body.limit) : 20

        const { isSimple, isMultiple, isMeal, query, categories, cousine, nutritionist, vitamins, sort, sortBy, cousines, gradientsi, minPrice, maxPrice } = req.body
        let andArray = [{ isActive: true }]

        if (isSimple) {
            andArray = [
                ...andArray,
                { isSimple: true }
            ]
        }

        if (isMultiple) {
            andArray = [
                ...andArray,
                { isMultiple: true }
            ]
        }

        if (isMeal) {
            andArray = [
                ...andArray,
                { isMeal: true }
            ]
        }

        if (categories && categories.length > 0) {

            let catOrArray = [{ categories: stringToObjectId(categories[0]) }]

            for (let i = 1; i < categories.length; i++) {
                catOrArray = [
                    ...catOrArray,
                    { categories: stringToObjectId(categories[i]) }
                ]
            }

            andArray = [
                ...andArray,
                { $or: catOrArray }
            ]

        }


        if (gradients && gradients.length > 0) {

            let gradAndArray = [{ foods: stringToObjectId(gradients[0]) }]

            for (let i = 1; i < gradients.length; i++) {
                gradAndArray = [
                    ...gradAndArray,
                    { foods: stringToObjectId(gradients[i]) }
                ]
            }

            andArray = [
                ...andArray,
                { $and: gradAndArray }
            ]

        }



        if (cousines && cousines.length > 0) {

            let cousOrArray = [{ cousines: cousines[0] }]
            for (let i = 1; i < cousines.length; i++) {
                cousOrArray = [
                    ...cousOrArray,
                    { cousines: cousines[i] }
                ]
            }
            andArray = [
                ...andArray,
                { $or: cousOrArray }
            ]
        }


        if (vitamins && vitamins.length > 0) {
            let vitAndArray = [{ [vitamins[0]]: { $gte: 0 } }]

            for (let i = 1; i < vitamins.length; i++) {
                vitAndArray = [
                    ...vitAndArray,
                    { [vitamins[i]]: { $gte: 0 } }
                ]
            }

            andArray = [
                ...andArray,
                { $and: vitAndArray }
            ]

        }

        if (cousine) {
            andArray = [
                ...andArray,
                { cousines: cousine }
            ]
        }

        if (nutritionist) {
            andArray = [
                ...andArray,
                { nutritionist: stringToObjectId(nutritionist) }
            ]
        }

        if (query) {
            let qqq = query.replace(" ", "[\\s]")
            andArray = [
                ...andArray,
                { name: { "$regex": qqq, "$options": "i,x,s" } },
            ]
        }

        let sortq = { name: 1 }

        if (sort && sortBy) {
            sortq = { [sortBy]: sort }
        }

        let qq = { $and: andArray }

        try {

            let foods = await Food.aggregate([

                {
                    $match: qq
                },
                {
                    $lookup: {
                        from: "foods",
                        localField: "foods",
                        foreignField: "_id",
                        as: "foods",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    energy: 1,
                                    fat: 1,
                                    protein: 1,
                                    carbonhydrate: 1,
                                }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categories",
                        foreignField: "_id",
                        as: "categories",
                        pipeline: [
                            { $project: { name: 1 } }
                        ]
                    }
                },
                {
                    $facet: {
                        count: [
                            {
                                $count: 'count'
                            }
                        ],
                        data: [
                            { $sort: sortq },
                            { $skip: skip },
                            { $limit: limit },
                        ]
                    }
                },
            ])
            let count = foods.length > 0 ? (foods[0].count.length > 0 ? foods[0].count[0].count : 0) : 0
            foods = foods.length > 0 ? foods[0].data : []

            res.json({
                code: 200,
                total: count,
                data: foods,
            })

        } catch (err) {
            next(err)
        }
    },

    addPhoto: (req, res, next) => {
        const { id } = req.body
        if (id) {
            try {
                Food.findById(id)
                    .exec((err, pro) => {
                        if (err) {
                            next(err)
                        } else {
                            let newPhotos = []
                            let plusPhotos = []
                            for (let i = 0; i < req.files.length; i++) {
                                plusPhotos = [
                                    ...plusPhotos,
                                    req.files[i].location
                                ]
                            }
                            newPhotos = [...pro.images, ...plusPhotos]
                            Food.findByIdAndUpdate(id, { images: newPhotos }, { new: true })
                                .exec((err2, prod) => {
                                    if (err2) {
                                        next(err2)
                                    } else {
                                        res.json({
                                            "code": 200,
                                            "data": prod
                                        })
                                    }
                                })
                        }
                    })
            } catch (err) {
                next(err)
            }
        } else {
            res.json({
                "code": 403,
                "message": "Besin Id'si gerekli."
            })
        }
    },
}