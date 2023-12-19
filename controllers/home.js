const fs = require("fs");
const {Product,ss, archive,returnHome,editText} = require("../models/home");
let active = false;
let editActive = true;

exports.getHome = (req,res) => {
  Product.fetchAll()
    .then(products => {
      res.render('../views/home.ejs',{
        data:products,
        active:active,
        editActive:editActive,
      });
    })
    .catch(err => {
      console.log(err);
    });
}

//modelsに移植済み
exports.postItem = (req,res) => {
    //ToDoItemは入力された値
    const postItem = req.body.ToDoItem;
    // console.log(postItem);
    const product = new Product({postItem});
    product.home_save();
    res.redirect('/');
}

exports.deleteItem = (req, res) => {
  const itemDelete = req.body.itemToDelete;
  const product = new ss({itemDelete});
  product.home_delete();
  ss.deleteById(itemDelete)
    .then(result => {
      // console.log('Destoyed product');
    })
    .catch(err => console.log(err));
  res.redirect('/');
};

exports.editButton = (req,res) => {
  active =true;
  editActive = false;
  res.redirect('/');
}

exports.editItem = (req, res) => {
  const editedText = req.body.editedText;
  const originalText = req.body.originalText;
  const product = new editText(editedText);
  product.edit();
  editText.deleteById(originalText);

  console.log(editedText);
  res.redirect('/');
  }

  //以下アーカイブ関連
  exports.viewArchive = (req,res) => {
    ss.fetchAll()
    .then(archive => {
      res.render("../views/archive.ejs",{
      data:archive,
      active:active,
      editActive:editActive,
    })  
  })
  .catch(err => {
      console.log(err);
    });
}

exports.deleteArchive = (req,res) => {
    const archiveDelete = req.body.archiveToDelete;
    archive.deleteById(archiveDelete)
      .then(result => {
        // console.log('Destoyed product');
      })
      .catch(err => console.log(err));
    res.redirect('/archive');
}

exports.returnMain = (req,res) => {
  const returnObject = req.body.returnArchive;
  // returnObjectはお寿司
  // console.log(returnObject);
  const product = new returnHome(returnObject);
  product.home_save();
  archive.deleteById(returnObject)
      .then(result => {
        // console.log('Destoyed product');
      })
      .catch(err => console.log(err));
  res.redirect('/archive');
}