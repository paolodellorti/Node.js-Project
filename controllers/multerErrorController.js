const uploadImageErrorController = (err, req, res, next) => {
    if (err) {
        return res
                .render('reports/insertReport', { 
                    title: 'Insert a new report',
                    error: err
                })
    } else {
      next()
    }
  }

  module.exports = uploadImageErrorController