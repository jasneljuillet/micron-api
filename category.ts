
import { micron } from '@yotie/micron';
// const Category = require('../../database/helpers/category.js');
export const saveCategory = micron(
  async ({ req, ok, error, notFound, badRequest }) => {
    let data = req.body;
    const jwt = await jwt.verify(
      req.token,
      "niouz-secret",
      (error, authData) => {
        if (err) {
          error({ Token: "Need a valid token" });
        } else if (req.file) {
          let tmp_path = req.file.path;
          let target_path =
            req.file.destination + Date.now() + req.file.originalname;
          const fs = fs.rename(tmp_path, target_path, (error) => {
            if (error) {
              error({ response: "can't save" });
            } else {
              data.category_image =
                "https://niouz.com/api/v1/path?category_image=" +
                target_path.substring(21);
              Category.saveCategory(data, (result) => {
                if (result) {
                  ok({ result });
                } else {
                  notFound({ result: "can't save new category" });
                }
              });
            }
          });
        } else {
          data.category_image =
            "http://165.227.69.230:3000/api/v1/path?default_image=default.jpg";
          Category.saveCategory(data, (result) => {
            if (result) {
              ok({ result });
            } else {
              badRequest({ result: "can't save new category_image" });
            }
          });
        }
      }
    );
  }
);

//delete category
export const deleteCategor = micron(
  async ({ req, ok, error, notFound }) => {
    let cat_id = req.params.cat_id;
    const jwt = await jwt.verify(req.token, "niouz-secret", (err, authData) => {
      if (err) {
        error({ Token: "Need a valid token" });
      } else {
        const deleteCategor = Category.deleteCategory(
          cat_id,
          (result, authData) => {
            if (result) {
              ok({ message: "category deleted", deleted_cat: result });
            } else if (err !== null) {
              notFound({ result: "Category not found" });
            } else {
              error({ result: "something went wrong" });
            }
          }
        );
      }
    });
  }
);
// get category
export const getCategory = micron(async ({ ok, error }) => {
  const category = await Category.getCategory((result) => {
    if (result) {
      ok({ result });
    } else {
      error({ message: "can't fetch category from the server retry" });
    }
  });
});
// update category
export const updateCategory = micron(async ({req, ok, error}) => {
  let data = await req.body;
  Category.updateCategory(data, (result) => {
    if (result) {
      ok({ result });
    } else {
      error({ message: "Error can't update" });
    }
  });
});
