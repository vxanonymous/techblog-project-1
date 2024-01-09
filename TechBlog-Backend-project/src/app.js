const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { authValidator } = require("./services/auth");
const Blog = require('./models/Blog');
const User = require("./models/User");
const upload = require('./middleware/upload');
const jwt_decode = require('jwt-decode');
const { ObjectId } = require('mongodb');
const { response } = require("express");

require('dotenv').config();

const app = express();

app.use(express.json());
let gfs;

const corsOption = {
  "origin": "*",
  "methods": "GET,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
};

app.use(cors(corsOption));

//healthcheck
app.get("/", async (request, response) => {
  response.send("OK!");
});

// routes Users: login
app.post("/service/users/login", async (request, response) => {
  const data = await User.findOne({ "email": request.body.email });

  if (!data) return response.status(422).send({ 'code': 422, 'message': 'Email is not correct!' });

  const checkPassword = await bcrypt.compare(request.body.password, data.password);
  if (!checkPassword) return response.status(423).send({ 'code': 423, 'message': 'Password is not correct!' });

  const payload = {
    id: data.id,
    username: data.username,
    email: data.email,
    role: data.role
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY); //default alg: HS256
  return response.send(token);
});

// routes User: signup
app.post("/service/users/register", async (request, response) => {
  const { error } = authValidator(request.body);
  if (error) return response.status(422).send(error.details[0].message);

  const data = await User.findOne({ "email": request.body.email });

  if (data) {
    return response.status(302).send({
      code: "D0001",
      message: "The email is duplicated."
    });
  } else {
    const salt = await bcrypt.genSalt(4);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
      email: request.body.email,
      password: hashPassword,
      username: request.body.username,
      role: 'USER'
    });

    try {
      const result = await user.save();
      await response.status(200).json(result);
    } catch (err) {
      response.status(400).send(err);
    }
  }
});

app.get("/service/users/:id", async (request, response) => {
  const data = await User.findOne({_id: request.params.id});
  const userInfo = {
    id: data.id,
    username: data.username,
    email: data.email,
    role: data.role
  }
  await response.send(userInfo);
});

app.post("service/users/update/:id", async (request, response) => {
  const set = request.body;
  try {
    const result = await User.updateOne(
      {
      _id: request.params.id
      },
      {
        $set: {
          set
        }
      }
    );
    return response.status(200).send(result);
  } catch (err) {
    return response.status(400).send(err);
  }
});

// routes Blog: get all
app.get("/service/blogs/all", async (request, response) => {
  const data = await Blog.find().populate(
    {path: 'author', select: 'username'}
  );
  await response.send(data);
});

//get recent blog: top 5
app.get("/service/blog/recent", async (request, response) => {
  const data = await Blog.find().sort({date: 'descending'}).limit(5);
  await response.send(data);
});

//getPublishedBlogs
app.get("/service/blog/pulished", async (request, response) => {
  const data = await Blog.find({'status': 'PUBLISHED'}).populate(
    {path: 'author', select: '_id email username role date'}
  );

  await response.send(data);
});

app.get("/service/blog/published", async (request, response) => {
  const page = request.query.page;
  const data = await Blog.find().skip(page * 10).limit(10).sort({date: 1});
  const totalBlogs = await Blog.count();
  data.push(
    {
      total: totalBlogs,
      currentPage: page
    }
  )
  response.status(200).send(data);
});

app.get("/service/blogs/:id", async (request, response) => {
  const data = await Blog.findOne({_id: request.params.id});
  await response.send(data);
});

app.get("/service/blogs/user/:userId", async (request, response) => {
  const data = await Blog.find({author: ObjectId(request.params.userId)}).populate(
    {path: 'author', select: 'username'}
  );
  await response.send(data);
});

//routes Blog: create a blog
app.post("/service/blogs/insert", async (request, response) => {
  const token = request.headers.authorization;
  let userObject = null;
  try {
    userObject = jwt_decode(token);
  } catch (err) {
    return response.status(403).send("PERMISSION_DENIED");
  }

  if (userObject == null) {
    return response.status(403).send("PERMISSION_DENIED");
  }

  const user = await User.findOne({
    _id: userObject.id
  });

  if (user != null) {
    const blog = new Blog(
      {
        title: request.body.title,
        author: user._id,
        content: request.body.content,
        thumbnail: request.body.thumbnail,
        tags: request.body.tags
      }
    );
  
    try {
      const result = await blog.save();
      await response.status(200).json(result);
    } catch (err) {
      return response.status(400).send(err);
    }

  } else {
    response.status(403).send("PERMISSION_DENIED");
  }
});

//update blog
app.post("/service/blogs/update/:id", async (request, response) => {
  const set = request.body;
  const token = request.headers.authorization;

  try {
    const userObject = jwt_decode(token);
    if (userObject == null) {
      return response.status(403).send("PERMISSION_DENIED");
    }

    const user = await User.findOne({_id: userObject.id});
    if (user != null) {
      const result = await Blog.updateOne(
        { _id: request.params.id }, { $set: set }
      );

      return response.status(200).send(result);
    } else {
      return response.status(403).send("PERMISSION_DENIED");
    }
  } catch (e) {
    response.status(400).send(e);
  }
});

//delete blog
app.get("/service/blogs/delete/:id", async (request, response) => {
  const token = request.headers.authorization;

  try {
    const userObject = jwt_decode(token);
    if (userObject == null) {
      return response.status(403).send("PERMISSION_DENIED");
    }

    const result = await Blog.deleteOne({_id: request.params.id});

    return response.status(200).send(result);
  } catch (err) {
    return response.status(400).send(err);
  }
});

//admin routes
app.post("/admin/blogs/approve/", async (request, response) => {

});

app.post("/admin/blogs/reject/", async (request, response) => {

});

//image route
app.post("/file/image/upload", upload.single('file'), async (request, response) => {
  if (request.file === undefined) {
    return response.send('Invalid request!');
  } else {
    const imgUrl = `https://app-tech-blogs-backend.herokuapp.com/file/image/${request.file.filename}`;
    return response.send({url: imgUrl});
  }
});

app.get("/file/image/:filename", async (request, response) => {
  try {
    let m = await gfs.find({filename: request.params.filename});
    let isContain = false;
    let n = await m.forEach(doc => {
      if (doc.filename == request.params.filename) {
        isContain = true;
      }
    });

    if (isContain) {
      const readStream = gfs.openDownloadStreamByName(request.params.filename);
      readStream.pipe(response);
    } else {
      response.send("Image not found!")
    }
  } catch (error) {
    console.log(error)
    response.send("Image not found!")
  }
});

app.get("/service/tags", async (request, response) => {
  const data = await Blog.distinct("tags");
  response.send(data);
});

let db = null;
async function startServer() {
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.oxwca.mongodb.net/techblog?retryWrites=true&w=majority`;

  const connection = mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('DB Connected')
  );
  mongoose.connection.once("open", function () {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'images'});
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Listening on port ${process.env.PORT || 3000}!`);
}

startServer();