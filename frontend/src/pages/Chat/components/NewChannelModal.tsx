import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { validateNewChannel } from "../../../utils/validateForm";

interface Props {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

export type FormFieldsNewChannel = {
    name: string;
    description: string;
};

export const NewChannelModal = ({ showModal, setShowModal }: Props) => {
    const initialValues: FormFieldsNewChannel = {
        name: "",
        description: "",
    };

    return (
        <AnimatePresence mode="wait">
            {showModal && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full z-0 bg-backgroundVeryDark bg-opacity-30"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div className="absolute w-5/6 p-10 bg-backgroundDark rounded-lg left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 md:w-3/5 lg:w-2/5">
                        <h4 className="font-medium mb-5">NEW CHANNEL</h4>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={() => console.log("HOLA")}
                            validate={(values: FormFieldsNewChannel) => {
                                return validateNewChannel(values);
                            }}
                        >
                            {({ errors }) => (
                                <Form className="flex flex-col space-y-5">
                                    <Field
                                        name="name"
                                        id="name"
                                        placeholder="Channel name"
                                        className="w-full bg-backgroundLight p-2.5 focus:outline-none rounded-lg text-sm resize-none"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component={() => (
                                            <p className="text-sm italic text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    />
                                    <Field
                                        name="description"
                                        id="description"
                                        as="textarea"
                                        placeholder="Channel description"
                                        className="w-full bg-backgroundLight p-2.5  focus:outline-none rounded-lg text-sm resize-none"
                                        field={{ rows: 4 }}
                                    />
                                    <div className="flex space-x-3 justify-center md:justify-end">
                                        <button
                                            className="py-1.5 px-6 rounded-md font-medium bg-red-500"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="py-1.5 px-6 rounded-md font-medium bg-backgroundBlue"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
