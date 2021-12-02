const multerErrorController = (err, req, res, next) => {
    if (err) {
        return res
                .render('reports/insertReport', { 
                    title: 'Error',
                    error: err
                });
    } else {
      next();
    }
  };

  module.exports = multerErrorController;