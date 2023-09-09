const categorymodel = require("../model/category");

class Category {
  async addcategory(req, res) {
    let { category } = req.body;
    let file = req.file?.filename;

    let add = new categorymodel({
      category: category,
      categoryImg: file,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Category name added successfully" });
    }
  }

  //edit category
  // async editcategory(req, res) {
  //   let categoryId = req.params.id;
  //   let { category } = req.body;
  //   let file = req.file?.filename;

  //   console.log(file);
  //   const exitaCategory = await categorymodel.findById(categoryId);
  //   if (category) {
  //     exitaCategory.category = category;
  //   }
  //   if (file) {
  //     exitaCategory.categoryImg = file;
  //   }
  //   const data = await exitaCategory.save();
  //   if (data) {
  //     return res.status(200).json({ Success: "updated", data });
  //   } else {
  //     return res.status(403).json({ error: "something went wrong" });
  //   }
  //   // {_id:id},
  //   // {category,file:file}
  //   // );
  //   // if (data) {
  //   //     return res.json({ success: "Updated" });
  //   //   }
  // }

  // async editcategory(req, res) {
  //   let categoryId = req.params.id;
  //   let { category } = req.body;
  //   let file = req.file?.filename;

  //   console.log(file);
  //   let obj = {};
  //   const categoryData = await categorymodel.findOne({ _id: categoryId });
  //   if (!categoryData) {
  //     return res.status(404).json({ error: "Category not found" });
  //   }
  //   if (typeof category !== "undefined") {
  //     obj["category"] = category;
  //   }
  //   if (typeof file !== "undefined") {
  //     obj["file"] = categoryImg;
  //   }
  //   let isData = await categorymodel.findOneAndUpdate(
  //     { _id: categoryId },
  //     { $set: obj },
  //     {
  //       new: true,
  //     }
  //   );
  //   if (isData) {
  //     return res
  //       .status(200)
  //       .json({ message: "Updated successfully", data: isData });
  //   } else {
  //     return res.status(500).json({ status: false, msg: "No such profile" });
  //   }
  // }

  async editcategory(req, res) {
    try {
      const categoryId = req.params.id;
      const { category } = req.body;
      const file = req.file?.filename;
  
      console.log(file);
  
      const existingCategory = await categorymodel.findOne({ _id: categoryId });
  
      if (!existingCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      const updateFields = {}; // Object to store fields to update
  
      if (category !== undefined) {
        updateFields.category = category;
      }
  
      if (file !== undefined) {
        updateFields.categoryImg = file;
      }
  
      const updatedCategory = await categorymodel.findOneAndUpdate(
        { _id: categoryId },
        { $set: updateFields },
        { new: true }
      );
  
      if (updatedCategory) {
        return res.status(200).json({ message: "Updated successfully", data: updatedCategory });
      } else {
        return res.status(500).json({ status: false, msg: "Failed to update category" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, msg: "Internal server error" });
    }
  }
  

  async getcategory(req, res) {
    let category = await categorymodel.find({}).sort({ _id: -1 });
    if (category) {
      return res.json({ category: category });
    }
  }

  async getallcategory(req, res) {
    let category = await categorymodel.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "category",
          foreignField: "category",
          as: "subcategories",
        },
      },
    ]);
    if (category) {
      return res.json({ category: category });
    }
  }

  async postdeletecategory(req, res) {
    let id = req.params.id;
    const data = await categorymodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const categoryController = new Category();
module.exports = categoryController;
