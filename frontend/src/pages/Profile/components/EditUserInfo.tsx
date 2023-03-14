import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateProfile } from "../../../redux/features/user/userServices";
import { Loading } from "../../../components/Loading";

interface Props {
    setEdit: (value: boolean) => void;
}

type FormFields = {
    name: string;
    bio: string;
    phone: string;
    password: string;
};

export const EditUserInfo = ({ setEdit }: Props) => {
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.user);

    const initialValues: FormFields = {
        name: user?.name || "",
        bio: user?.bio || "",
        phone: user?.phone || "",
        password: "",
    };

    const [file, setFile] = useState<File | null>(null);

    const [submitButtonDisabled, setSubmitButtonDisabled] =
        useState<boolean>(true);

    const handleEditClick = (values: FormFields) => {
        const { name, bio, phone, password } = values;

        const formData = new FormData();
        formData.append("file", file as File);
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("phone", phone);
        formData.append("password", password);

        dispatch(updateProfile(formData));
        setFile(null);
    };

    return (
        <>
            <button
                className="mb-10 flex items-center space-x-3 cursor-pointer"
                onClick={() => setEdit(false)}
            >
                <FontAwesomeIcon icon={faAngleLeft} color="#2D9CDB" />
                <p className="" style={{ color: "#2D9CDB" }}>
                    Back
                </p>
            </button>
            <div className="space-y-3 md:border md:px-10 md:py-5 rounded-lg border-gray-600">
                <div className="flex flex-col items-start space-y-2 mb-10">
                    <h2 className="font-medium text-xl text-center">
                        Change Info
                    </h2>
                    <h4 className="font-medium opacity-60">
                        Changes will be reflected to every services
                    </h4>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values: FormFields) => handleEditClick(values)}
                    validate={(values: FormFields) => {
                        const { name, bio, password, phone } = values;
                        if (
                            name === "" &&
                            bio === "" &&
                            password === "" &&
                            phone === ""
                        ) {
                            setSubmitButtonDisabled(true);
                        } else {
                            setSubmitButtonDisabled(false);
                        }
                    }}
                >
                    {({ values }) => (
                        <Form className="flex flex-col space-y-5">
                            <div className="flex items-center space-x-5">
                                {user && user.pictureUrl ? (
                                    <img
                                        className="h-20 w-20 rounded"
                                        src={user.pictureUrl}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faCamera}
                                        size="2x"
                                        className="text-input"
                                    />
                                )}
                                <label className="block cursor-pointer">
                                    <span>CHANGE PHOTO</span>
                                    <input
                                        type="file"
                                        className="opacity-0 pointer-events-none absolute top-0 left-0 w-full h-full"
                                        onChange={(value: any) => {
                                            setFile(
                                                value.target.files?.[0] || null
                                            );
                                            setSubmitButtonDisabled(false);
                                        }}
                                    />
                                    {file && (
                                        <h4 className="text-input italic text-sm">
                                            {file.name}
                                        </h4>
                                    )}
                                </label>
                            </div>
                            <div>
                                <label className="font-medium text-sm">
                                    Name
                                </label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name..."
                                    className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm"
                                    type="text"
                                    value={values.name}
                                />
                            </div>
                            <div>
                                <label className="font-medium text-sm">
                                    Bio
                                </label>
                                <Field
                                    as="textarea"
                                    id="bio"
                                    name="bio"
                                    placeholder="Enter your bio..."
                                    className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm resize-none"
                                    field={{ rows: 4 }}
                                    value={values.bio}
                                />
                            </div>
                            <div>
                                <label className="font-medium text-sm">
                                    Phone
                                </label>
                                <Field
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone..."
                                    className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm"
                                    type="text"
                                    value={values.phone}
                                />
                            </div>
                            <div>
                                <label className="font-medium text-sm">
                                    Password
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="Enter your new password..."
                                    className="mt-1.5 w-full bg-transparent focus:outline-none border border-gray-400 rounded-lg px-4 py-3 text-sm"
                                    type="password"
                                />
                            </div>
                            <button
                                className="py-2 px-10 rounded font-medium bg-gray-600 md:self-start"
                                type="submit"
                                disabled={submitButtonDisabled}
                            >
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
                {isLoading ? (
                    <Loading />
                ) : (
                    error && (
                        <p className="text-sm font-bold text-red-600">
                            {error}
                        </p>
                    )
                )}
            </div>
        </>
    );
};
