
exports.cookieChecker = (req, res,next)=>{
    var id = req.params.id;
    var vote = req.params.vote;
    req.session.cookie.path = `/vote/${id}/choice/${vote}`

    if(req.session.page_views){
       req.session.page_views++;
        if (req.session.page_views > 1) {
            res.render('voted')
        }else{
            res.render('voted')
        }
        
    } else {
       req.session.page_views = 1;
       if (req.session.page_views > 1) {
        res.render('voted')
    }else{
        next();
    }
       

    }
  }

