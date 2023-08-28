const appsubcatModel = require("../../model/userapp/subcat");

class appsubcat {
    async addappsubcat(req, res) {
        let { subcategory, category, videolink } = req.body;
        let subcatImgFile = req.files.find((file) => file.fieldname === 'subcatimg');
        let subcatVideoFile = req.files.find((file) => file.fieldname === 'subcatvideo');
      
        if (!category || !subcategory || !subcatImgFile || !subcatVideoFile) {
          return res.status(500).json({ error: 'Fields must not be empty' });
        } else {
          let add = new appsubcatModel({
            subcategory: subcategory,
            category: category,
            videolink: videolink,
            subcatimg: subcatImgFile.filename,
            subcatvideo: subcatVideoFile.filename,
          });
      
          try {
            let savedSubcategory = await add.save();
            if (savedSubcategory) {
              return res.json({ success: 'Subcategory added successfully' });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to add subcategory' });
          }
        }
      }
      

    //edit user
    async editappsubcat(req, res) {
      let id = req.params.id;
      let { subcategory, category, videolink } = req.body;
  
      let data = await appsubcatModel.findOneAndUpdate(
        { _id: id },
        { subcategory, category, videolink }
      );
      if (data) {
        return res.json({ success: "Updated" });
      }
    }
  
  async getappsubcat(req, res) {
    let subcategory = await appsubcatModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postappsubcat(req, res) {
    let { category} = req.body;
    console.log(category);
    
    let subcategory = await appsubcatModel
      .find({ category })
      .sort({ _id: -1 });

    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async deleteappsubcat(req, res) {
    let id = req.params.id;
    let data = await appsubcatModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const appsubcatcontroller = new appsubcat();
module.exports = appsubcatcontroller;
