const express     = require ('express'),
      bodyParser  = require ('body-parser'),
      mongoose    = require ('mongoose'),
      override    = require ('method-override'),
      Project     = require ('./models/projects'),
      Task        = require ('./models/tasks'),

      app         = express();


mongoose.connect ('mongodb://localhost/project_manager_app');

//APP CONFIG
app.set ('view engine', 'ejs');
app.use (express.static('public'));
app.use (bodyParser.urlencoded({extended: true}));
app.use (override('_method'));

//ROUTES

//INDEX
app.get ('/', function(req, res){
  res.redirect ('/projects');
});

app.get ('/projects', function(req, res){
  Project.find({}, function (err, projects){
    if(err){
      console.log(err);
    } else {
      res.render ('./pages/projects/projects', {projects: projects});
    }
  });
});

//CREATE
app.post ('/projects', function(req, res){
	Project.create(req.body.project, function (err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect ('/projects');
		}
	});
});

//NEW FORM
app.get ('/projects/new', function (req, res){
  res.render ('./pages/projects/newProject');
});

//SHOW
app.get ('/projects/:id', function (req,res){
  Project.findById (req.params.id).populate ('tasks').exec (function (err, foundProject){
    if (err){
      res.redirect ('/');
    } else {
      res.render ('./pages/projects/showProject', {project: foundProject})
    }
  });
});

//EDIT FORM
app.get ('/projects/:id/edit', function (req, res){
  Project.findById(req.params.id, function (err, foundProject){
    if (err){
      res.redirect('/');
    } else {
      res.render ('./pages/projects/editProject', {project: foundProject})
    }
  });
});

//UPDATE
app.put ('/projects/:id', function (req, res){
  Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject){
    if (err){
      res.redirect ('/');
    } else {
      res.redirect ('/projects/' + req.params.id);
    }
  });
});

//DELETE
app.delete ('/projects/:id', function (req, res){
  Project.findByIdAndDelete (req.params.id, req.body.project, function (err, deletedPost){
    if (err){
      res.send('You Done messed up A-A-Ron!!!!');
    } else {
      res.redirect ('/');
    }
  });
});

//===============================================
//Tasks
//===============================================

app.get ('/projects/:id/tasks/new', function(req, res){
	Project.findById (req.params.id, function (err, foundId){
		if (err){
			console.log (err)
		} else {
			res.render ('./pages/tasks/newTask', {project: foundId});
		}
	});
});

app.post ('/projects/:id/tasks', function (req,res){
	Project.findById (req.params.id, function (err, project){
		if (err){
			console.log(err);
    } else {
      const newTask = req.body.task;
			Task.create (newTask, function (err, newTask){
				if (err){
					console.log(err);
					res.redirect ('/projects');
				} else {
					project.tasks.push(newTask);
					project.save();
					res.redirect ('/projects/' + project._id);
				}
			});
		}
	});
});



app.listen(3000, function(){
  console.log('App Started!');
});