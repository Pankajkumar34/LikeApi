const express = require('express')
const router = express.Router()
const LikeSchema = require('../Model/LikesSchema')
// const post = require('../Model/post')
const bcrypt=require('bcrypt')

router.post('/postLike', async (req, res) => {
    const { userId, Photo } = req.body
  
    try {
        if (!(userId && Photo)) {
            res.status(404).json({ status: false, msg: "provide value" })
        } else {
            const data = await LikeSchema.create({ ...req.body })
            res.status(200).json({ data, msg: "successfylly" })
        }
    } catch (error) {
        res.status(500).json({ status: false, error: error.message })
    }
})
router.get('/get', async (req, res) => {
    const data = await LikeSchema.find()
    res.status(200).json({ data })
})

router.put('/Like/:id', async (req, res) => {
    const post = await LikeSchema.findById(req.params.id);

    const checkId = await LikeSchema.findOne({ userId: req.body.userLikeId });
console.log(checkId)
    if (!checkId) {
        return res.status(404).json({ msg: "Please log in" });
    }
    

    const check = post.likes.some((user) => {
        return user.userLikeId === req.body.userLikeId;
    });

    if (!check) {
        post.likes.push({ userLikeId: req.body.userLikeId });
        await post.save();
        res.status(200).json({ msg: "Liked successfully" });
    } else {
        res.status(200).json({ msg: "Already liked" });
    }


})


router.put('/disLike/:id', async (req, res) => {
    const post = await LikeSchema.findById(req.params.id)
    const check = post.likes.some((user) => {
        return user.userLikeId === req.body.userLikeId
    })
    if (check) {
        const unlike = post.likes.filter((item) => {
            return item.userLikeId !== req.body.userLikeId;
        });

        post.likes = unlike; // Update the likes array

        await post.save(); // Save the updated post

        res.status(200).json({ msg: "Unliked successfully" });
    } else {
        res.status(400).json({ msg: "User has not liked this post" });
    }





})

module.exports = router


