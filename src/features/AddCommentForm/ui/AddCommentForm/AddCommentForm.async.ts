import { FC, lazy } from "react";
import lazyLoadingTimeout from "shared/lib/lazyLoadingTimeout/lazyLoadingTimeout";
import { AddCommentFormProps } from "./AddCommentForm";

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => {
    return lazyLoadingTimeout(import("./AddCommentForm"), 1000);
});
