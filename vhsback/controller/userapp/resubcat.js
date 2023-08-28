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

  async getappresubcat(req, res) {
    let subcategory = await appresubcatModel.find({}).sort({ _id: -1 });
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
