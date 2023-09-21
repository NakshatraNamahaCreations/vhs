const appresubcatModel = require("../../model/userapp/resubcat");

class appsubcat {
  async addappresubcat(req, res) {
    let { subcategory, sub_subcategory } = req.body;
    let file = req.files[0]?.filename;
  
      let add = new appresubcatModel({
        subcategory: subcategory,
        sub_subcategory: sub_subcategory,

        resubcatimg: file,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "subcategory name added successfully" });
      }
    
  }

  //edit user   
  async editappresubcat(req, res) {
    let id = req.params.id;
    let { subcategory, sub_subcategory } = req.body;

    let data = await appresubcatModel.findOneAndUpdate(
      { _id: id },
      { subcategory, sub_subcategory }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

async editSubcategoryList(req, res) {
  try {
    const id = req.params.id;
    let { subcategory, sub_subcategory } = req.body;
    const file = req.file?.filename;
    const existingCategory = await appresubcatModel.findOne({ _id: id });

    if (!existingCategory) {
      return res.status(404).json({ error: "No such a record" });
    }
    existingCategory.subcategory =
      subcategory || existingCategory.subcategory;
    existingCategory.sub_subcategory =
      sub_subcategory || existingCategory.sub_subcategory;

    if (file) {
      existingCategory.resubcatimg = file;
    }
    const updatedCategory = await appresubcatModel.findOneAndUpdate(
      { _id: id },
      existingCategory,
      { new: true }
    );

    if (updatedCategory) {
      return res
        .status(200)
        .json({ message: "Updated successfully", data: updatedCategory });
    } else {
      return res
        .status(500)
        .json({ status: false, msg: "Failed to update category" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
}



  async getappresubcat(req, res) {
    let subcategory = await appresubcatModel.find({});
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postappresubcat(req, res) {
    let { subcategory } = req.body;
    

    let data = await appresubcatModel
      .find({ subcategory })
      .sort({ _id: -1 });

    if (data) {
      return res.json({ subcategory: data });
    }
  }

  async deleteappresubcat(req, res) {
    let id = req.params.id;
    let data = await appresubcatModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const appresubcatcontroller = new appsubcat();
module.exports = appresubcatcontroller;
