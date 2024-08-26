import { useContext, useEffect } from "preact/hooks";
import { CommentActionsContext } from "../components/mediaModal/ProviderComment";
import { CommentActions } from "../utils/enums";
import { type MediaOptions } from "../utils/types";
import { transitionViewIfSupported } from "../utils/utilityFunctions";

export const useCommentOption = ({
  setOptions,
  options,
  setEdit,
  edit,
  setInputComment,
  content,
  id
}: MediaOptions) => {
  const actions = useContext(CommentActionsContext);

  const handleDelete = () => {
    transitionViewIfSupported(() => {
      if (actions) actions({ type: CommentActions.DELETE, others: { id } });
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
