import { useEffect } from "preact/hooks";
import { type MediaOptions } from "../utils/types";
import { transitionViewIfSupported } from "../utils/utilityFunctions";

export const useCommentOption = ({
  setComments,
  setOptions,
  options,
  setEdit,
  edit,
  setInputComment,
  content,
  id
}: MediaOptions) => {
  const handleDelete = () => {
    transitionViewIfSupported(() => {
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      setOptions({ active: false });
      setEdit({ active: false });
      setInputComment("");
    });
  };

  const handleOptions = () => {
    transitionViewIfSupported(() => {
      setOptions({
        active: options.id === id ? !options.active : true,
        id
      });

      if (edit.active) {
        setInputComment(content);
        setEdit((prev) => ({ active: prev.active, id }));
      }
    });
  };

  const handleEdit = () => {
    transitionViewIfSupported(() => {
      setEdit({
        active: !edit.active,
        id
      });
    });
  };

  useEffect(() => {
    if (edit.id === id) setInputComment(!edit.active ? "" : content);
  }, [edit]);

  return { handleDelete, handleEdit, handleOptions };
};
