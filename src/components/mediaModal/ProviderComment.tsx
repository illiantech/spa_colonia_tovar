import { createContext, type ComponentChildren } from "preact";
import { useReducer, type Dispatch } from "preact/hooks";
import { CommentActions } from "../../utils/enums";
import type { Action, CommentData } from "../../utils/types";

interface Props {
  children: ComponentChildren;
  initialComments: CommentData[];
}

export const CommentsContext = createContext<CommentData[]>([]);
export const CommentActionsContext = createContext<Dispatch<Action>>(
  ({}) => {}
);

export const PorviderComment = ({ children, initialComments }: Props) => {
  const [comments, actions] = useReducer(commentActions, initialComments);

  return (
    <CommentsContext.Provider value={comments}>
      <CommentActionsContext.Provider value={actions}>
        {children}
      </CommentActionsContext.Provider>
    </CommentsContext.Provider>
  );
};

const commentActions = (comments: CommentData[], actions: Action) => {
  const { add, others, type } = actions;

  switch (type) {
    case CommentActions.ADD: {
      if (add) return [...comments, add];
    }

    case CommentActions.UPDATE: {
      return comments.map((comment) =>
        comment.id === others?.id ? { ...comment, ...others } : comment
      );
    }

    case CommentActions.DELETE: {
      return comments.filter((comment) => comment.id !== others?.id);
    }

    default: {
      throw Error("Unknown action: " + actions.type);
    }
  }
};
