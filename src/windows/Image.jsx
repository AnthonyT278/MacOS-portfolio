import windowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
            </div>

            <div className="p-5 bg-white flex justify-center items-center h-full">
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className="max-w-full max-h-[80vh] object-contain rounded" />
                ) : (
                    <p>No image available</p>
                )}
            </div>
        </>
    );
};

const ImageWindow = windowWrapper(Image, "imgfile");

export default ImageWindow;
