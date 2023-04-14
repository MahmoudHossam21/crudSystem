import noteModel from "../../../../DB/model/Note.model.js";
import userModel from "../../../../DB/model/User.model.js";

export const getNoteModule = async (req, res, next) => {
  const notes = await noteModel.find({}).select("-createdAt").populate({
    path: "userId",
    select: "userName",
  });
  return res.json({ message: "Note module", notes });
};

export const addNote = async (req, res, next) => {
  try {
    const { productName, ProductCategory, ProductDesc, productPrice , userId } =
      req.body;
    const note = await noteModel.create({
      productName,
      ProductCategory,
      ProductDesc,
      productPrice,
      userId: req.user._id,
      
    });
    return res.json({ message: "Done", note });
  } catch (error) {
    return res.json({ message: "Catch error", stack: error.stack });
  }
};
export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  const { productName, ProductCategory, ProductDesc, productPrice } = req.body;
  // console.log({ title, description });
  const note = await noteModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { productName, ProductCategory, ProductDesc, productPrice },
    { new: true }
  );
  return note
    ? res.json({ message: "Done", note })
    : res.json({ message: "In-Valid Data " });
};
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  console.log({ id });
  const note = await noteModel.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });
  return note
    ? res.json({ message: "Done", note })
    : res.json({ message: "In-Valid Data " });
};
