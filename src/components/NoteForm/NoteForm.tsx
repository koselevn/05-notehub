import { Formik, Form, Field, ErrorMessage } from 'formik'
import css from './NoteForm.module.css'
import * as Yup from "yup";
import type { FormValues } from '../../types/note';
import { createNote } from '../../services/noteService';

interface NoteFormProps {
    onClose: (type: boolean) => void
}

const Schema = Yup.object().shape({
    title: Yup.string().min(2, "Name must be at least 3 characters").max(50, "Title is too long. Max 50").required("This required input"),
    content: Yup.string().max(500, "Content is too long. Max 500"),
    tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], "Select a valid tag").required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
    async function AddNote(values: FormValues) {
        await createNote(values)
        onClose(false)
    }

    return (
        <Formik initialValues={{ title: '', content: '', tag: 'Todo' }} onSubmit={AddNote} validationSchema={Schema}>
            <Form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <Field id="title" type="text" name="title" className={css.input} />
                <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
                />
                <ErrorMessage name="content" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <Field as="select" id="tag" name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
                <button onClick={() => onClose(false)} type="button" className={css.cancelButton}>
                Cancel
                </button>
                <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                >
                Create note
                </button>
            </div>
            </Form>
        </Formik>
    )
}