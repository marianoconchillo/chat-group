import { Ring } from "@uiball/loaders";

export const Loading = () => {
    return (
        <div className="flex justify-center my-5">
            <Ring size={40} lineWeight={5} speed={2} color="#2F80ED" />
        </div>
    );
};
