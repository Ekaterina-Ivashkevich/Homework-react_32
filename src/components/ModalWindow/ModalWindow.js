import {Button, Dialog, IconButton, Input, TextField} from "@material-ui/core";
import "../ModalWindow/ModalWindow.scss";
import {Close} from "@material-ui/icons";
import Logger from "../../constants/utils/Logger";

const ModalWindow = ({isModalWindowOpened,
                         setIsModalWindowOpened,
                         something,
                         setSomething,
                         inputChangeSomething,
                         setDisabledBtn}) => {

    function close () {
        setIsModalWindowOpened (false);
        setDisabledBtn(true);
    }

    function clearInput() {
        setSomething("");
        setIsModalWindowOpened (false);
        setDisabledBtn(true);
    }

    function saveSomething() {
        localStorage.setItem("something", JSON.stringify(something));
        setIsModalWindowOpened (false);
        setDisabledBtn(false);
    }

    return (

        <Dialog open={isModalWindowOpened} className="modal" onClose={close}>
            <div className="modal__box">
                <IconButton className="modal__icon" size="small" onClick={clearInput}> <Close /></IconButton>
                <div className="modal__text">
                    <TextField
                        label="Edit something"
                        type="text"
                        size={"small"}
                        value={something}
                        onChange={inputChangeSomething}
                        variant="outlined"
                    />
                </div>
                <div className="modal__actions">
                    <Button color="primary" variant="outlined" onClick={clearInput}>Cansel</Button>
                    <Button color="primary" variant="contained" onClick={saveSomething}>Save</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalWindow;