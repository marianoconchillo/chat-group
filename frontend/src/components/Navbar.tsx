import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
    click: boolean;
    setClick: (value: boolean) => void;
}

export const Navbar = ({ click, setClick }: Props) => {
    return (
        <div className="h-16 px-5 shadow flex items-center justify-between">
            <div className="flex items-center space-x-5">
                <FontAwesomeIcon
                    icon={faBars}
                    className="cursor-pointer"
                    onClick={() => setClick(!click)}
                />
                <p className="font-medium tracking-wide">WELCOME</p>
            </div>
            {click && (
                <FontAwesomeIcon
                    icon={faXmark}
                    className="cursor-pointer bg-backgroundDark py-1.5 px-2 rounded-lg"
                    onClick={() => setClick(!click)}
                />
            )}
        </div>
    );
};
