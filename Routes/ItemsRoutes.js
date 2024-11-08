const express = require("express");
const router = express.Router();
const Items = require("../Modules/Items");
const { body, validationResult } = require("express-validator");






//post todo items

router.post("/todo/create",
  [
    body("tittle")
    .notEmpty()
    .isString()
    .withMessage("tittle is required!"),
  ], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error });
    }
    try {
      const { tittle, description,inStock } = req.body;
      const newitems = new Items({
        tittle, description,inStock 
      });
  
      const saveitems = await newitems.save();
      res.status(201).json(saveitems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//   get all items
router.get("/todo/get" , async (req,res)=>{
    try {
        const items = await Items.find();
    
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

})

//Update items
router.put("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { tittle, description,inStock } = req.body;
  
      const updateditems = await Items.findByIdAndUpdate(
        { _id: id },
        { tittle, description,inStock},
        { new: true }
      );
  
      if (!updateditems) {
        return res.status(404).json({ error: "items not found SORRY :(" });
      }
      return res.status(200).json(updateditems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  //get items by id
router.get("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;


      const item = await Items.findOne({ _id: id });
  
      if (!item) {
        return res.status(404).json({ error: "Inccorrect id :(" });
      }
  
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // delete item
  router.delete("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteditems = await Items.findByIdAndDelete({ _id: id });
  
      if (!deleteditems) {
        return res.status(404).json({ error: "item not found :(" });
      }
      return res.status(200).json({ success: "item deleted successfully :)" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;