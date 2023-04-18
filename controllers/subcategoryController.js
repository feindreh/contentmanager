const SubCategory = require('../models/subcategory');

exports.subcategory_list = async (req, res) => {
  const subCats = await SubCategory.find({});
  res.render('subcategory_list', { list: subCats, title: 'Sub-Category List' });
};

exports.subcategory_create_get = (req, res) => {
  res.send('Implement subcategory Create Get');
};
