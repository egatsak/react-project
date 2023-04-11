import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    addCommentFormActions,
    addCommentFormReducer,
} from "../../model/slice/addCommentFormSlice";
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";

import styles from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation("translation");
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch]
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || "");
        onCommentTextChange("");
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(styles.addCommentForm, {}, [className])}>
                <Input
                    placeholder={t("Enter comment", { ns: "translation" })}
                    inputId="add-comment-input"
                    value={text || ""}
                    onChange={onCommentTextChange}
                    className={styles.input}
                />
                <Button onClick={onSendHandler}>
                    {t("Submit", { ns: "translation" })}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
