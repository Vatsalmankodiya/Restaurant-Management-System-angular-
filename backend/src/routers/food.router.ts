import { Router } from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';
const router = Router();

router.get(
  '/seed',
  asyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send('Seed is already done!');
      return;
    }

    await FoodModel.create(sample_foods);
    res.send('Seed Is Done!');
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

router.get(
  '/search/:searchTerm',
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  '/tags',
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  '/tag/:tagName',
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  })
);

router.get(
  '/:foodId',
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  })
);

router.post(
  '/add',
  asyncHandler(async (req, res) => {
    console.log("Received data:", req.body); // 🔍 Add this

    const {
      name,
      price,
      discription,
      tags,
      favorite = false,
      imageUrl,
      cookTime,
      stars,
      origins
    } = req.body;

    const food = new FoodModel({
      name,
      price,
      discription,
      tags,
      favorite,
      imageUrl,
      cookTime,
      stars,
      origins
    });

    try {
      const savedFood = await food.save();
      res.status(201).send(savedFood);
    } catch (error) {
      console.error("Error saving food:", error); // 🔍 Log full error
      res.status(400).send({ message: 'Error adding food', error });
    }
  })
);

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedFood = await FoodModel.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await FoodModel.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(updatedFood);
  } catch (err) {
    res.status(500).json({ message: 'Error updating food' });
  }
});


export default router;
