import HomePage from '../models/homePageModel.js';

export const getHomePage = async (req, res) => {
  try {
    const content = await HomePage.findOne();
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send({
      message: 'Error fetching homepage data',
      error: error.message,
    });
  }
};

export const updateHomePage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.filename;

    if (!title || !content) {
      return res.status(400).send({
        message: 'Title and content are required',
      });
    }

    const updatedFields = {
      title,
      content,
    };

    if (image) {
      updatedFields.imageUrl = image;
    }

    let homepage = await HomePage.findOne();

    if (!homepage) {
      homepage = await HomePage.create(updatedFields);
    } else {
      await homepage.update(updatedFields);
    }

    res.status(200).send({
      message: 'Homepage updated successfully',
      data: homepage,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error updating homepage',
      error: error.message,
    });
  }
};
