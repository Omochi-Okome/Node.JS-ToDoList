
const {homeItem,removeItem, archive,returnHome,editText} = require("../models/home");
let active = false;
let editActive = true;

exports.getHome = (req,res) => {
  homeItem.fetchAll()
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
    const postItem = req.body.ToDoItem;
    //postItemはある
    console.log(postItem);
    const product = new homeItem({item:postItem});
    product
      .saveProducts()
      .then(() => res.redirect('/'))
      .catch(err => console.log(err));
}

exports.deleteItem = (req, res) => {
  const itemDelete = req.body.itemToDelete;
  console.log(itemDelete)
  const product = new removeItem({itemDelete});
  product.saveArchive();
  removeItem.deleteById(itemDelete)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
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
  product.saveProducts();
  editText.deleteById(originalText);

  console.log(editedText);
  res.redirect('/');
  }

  //以下アーカイブ関連
  exports.viewArchive = (req,res) => {
    const itemDelete = req.body.itemDelete;
    const product = new removeItem(itemDelete);
    product.fetchAll()
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
  // console.log(returnObject);
  const product = new returnHome(returnObject);
  product.saveProducts();
  archive.deleteById(returnObject)
      .then(result => {
        // console.log('Destoyed product');
      })
      .catch(err => console.log(err));
  res.redirect('/archive');
}