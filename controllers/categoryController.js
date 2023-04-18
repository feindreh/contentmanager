exports.index = (req, res) => {
  res.render('index', {
    title: 'Shop Home',
  });
};

exports.category_list = (req, res) => {
  res.send('Implement Category List');
};

exports.category_create_get = (req, res) => {
  res.send('Implement Category Create Get');
};
